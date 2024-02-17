---
title: Tonic实现桌面端
date: 2023-04-06
tags: [tauri,rust]
authors: carlos
keywords: [tauri,rust]
description: Tonic实现桌面端
slug: Tonic implements desktop end
---

<!-- truncate -->

## 客户端
### 创建tauri应用

```rust
yarn create tauri-app

Tauri官网提供了多种创建项目的方式，其他方式有npm，cargo等

创建项目时，前端选择React + Vite.
```

### 初始化桌面端的Menu
Windows、MacOs和Linux的Menu不一样，有的Menu在别的系统中无法使用，所以需要自己指定每个系统的Menu。

```rust
fn init_menus() -> Menu {
    let submenu_gear = Submenu::new(
        "Gear",
        Menu::new()
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Zoom)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::CloseWindow)
            .add_native_item(MenuItem::Quit),
    );
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");

    #[cfg(target_os = "macos")]
        let close =
        CustomMenuItem::new("close".to_string(), "Close").native_image(NativeImage::UserGuest);
    #[cfg(target_os = "macos")]
        let submenu_customer = Submenu::new("Customer", Menu::new().add_item(close).add_item(quit));
    #[cfg(target_os = "windows")]
        let submenu_customer = Submenu::new("Customer", Menu::new().add_item(quit));
    let menus = Menu::new()
        .add_submenu(submenu_gear)
        .add_submenu(submenu_customer);
    menus
}
```

### React前端调用后端Rust
要创建一个命令，只需添加一个函数，并使用` #[tauri::command] `注释:

```rust
#[tauri::command]
fn my_custom_command(invoke_message: String) {
  println!("I was invoked from JS, with this message: {}", invoke_message);
}
在Rust的main函数中指定该函数:

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![my_custom_command])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
```

在React前端就可以调用这个函数

```rust
import { invoke } from '@tauri-apps/api/tauri'

invoke('my_custom_command', { invokeMessage: 'Hello!' })
```

`invoke` 函数返回一个用返回值解析的 promise
如果Rust的函数返回了一个错误，在`Promise`的`Response`中可以拿到错误信息。

```rust
invoke('my_custom_command').then((message) => console.log(message))
```

### Rust主动发送事件给React前端

创建`State`结构体，内部保存一个`AppHandle<Wry>`，在tauri创建的时候，将`app_handle`保存到结构体中，同时由tauri管理。

```rust
///创建一个状态管理State 用于发送消息事件
#[derive(Debug,Clone)]
pub struct MessageState {
    pub handle: AppHandle<Wry>,
}

impl MessageState {
    pub fn new(handle: AppHandle<Wry>) -> Self {
        Self { handle }
    }
}

tauri::Builder::default()
        .setup( |app| {
            let callback_app_handle = app.app_handle();
            let message_state = MessageState::new(callback_app_handle);
            app.manage(message_state);
            Ok(())
        })
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => std::process::exit(0),
            "close" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
        .manage(message_sender)
        .invoke_handler(tauri::generate_handler![
            get_message
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
```

主动发起事件调用:

```rust
React端：

listen('greet', (event: any) => {
    // event.payload 才是实际的结构体
    console.log(event.payload);
}).then();
```

Rust端：

```rust
在要发送事件函数参数中添加 MessageState

#[tauri::command]
pub async fn index_receive_message(message_sender:State<'_,MessageState>) -> Result<(),()>{
    message_state.handle.emit_all("greet","12345").unwrap();
    Ok(())
}
```

### 集成tonic客户端
添加依赖：

```rust
cargo add tonic

toml:
    tonic = "0.8"
```

编写proto文件

```rust
syntax = "proto3";

package test;

message LoginRequest {
    //手机号码
    string phone = 1;
    //验证码
    string capt = 2;
}

message Token {
    string token = 1;
    string refreshToken = 2;
}

service ChatService {
    //登录
    rpc Login(LoginRequest) returns (Token) {}
}
```

编写build.rs 将proto文件转为Rust代码

```rust
///指定生成的位置为pb 使用type_attribute为struct添加额外的derive
fn main() {
    tauri_build::build();
    tonic_build::configure()
        .out_dir("src/pb")
        .type_attribute(".","#[derive(serde::Serialize)]")
        .compile(&["./chat.proto"], &["./"])
        .unwrap();
}
```

编写客户端代码，并且在请求的时候携带token

```rust
pub struct Client {
    connect: ChatServiceClient<InterceptedService<Channel, AuthInterceptor>>,
}

pub struct AuthInterceptor;

impl Interceptor for AuthInterceptor {
    fn call(&mut self, mut request: Request<()>) -> std::result::Result<Request<()>, Status> {
        let token:Guard<Arc<Token>> =  <TOKEN as Access<Arc<Token>>>::load(&TOKEN);

        if token.user_id.len() > 0 {
            let user_id = MetadataValue::try_from(token.user_id.as_str()).unwrap();
            request.metadata_mut().insert("token", user_id);
        }
        Ok(request)
    }
}
```

自定义一个AuthInterceptor，并且为他实现Interceptor，这样就可以在ChatServiceClient中使用AuthInterceptor类型了。

```rust
/// 初始化客户端，后续就可以使用Client发起gprc调用
impl Client {
    pub async fn new() -> Self {
        let channel = Channel::from_static("http://127.0.0.1:10086")
            .connect()
            .await
            .expect("connect 10086 error");

        let client = ChatServiceClient::with_interceptor(channel, AuthInterceptor);

        Self {
            connect: client,
        }
    }
}
```

## 服务端

### 创建Rust Tonic应用
#### 初始化项目

```rust
cargo new tonic-live

cargo add tonic ...

toml:
[dependencies]
anyhow = "1"
async-trait = "0.1"
prost = "0.11"
tokio = {version = "1",features = ["full"]}
tonic = "0.8"
chrono = "0.4"

futures = "0.3"
tokio-stream = "0.1.10"
dashmap = "5.4.0"
tracing = "0.1" # 日志处理
tracing-subscriber = "0.3" # 日志处理
redis = "0.22"
base64 ="0.13"
ring = "0.16.20"
serde = { version = "1.0", features = ["derive"] }
urlencoding = "2.1.2"
state = "0.5.3"
rbs = { version = "0.1"} 
rbatis = { version = "4.0" }
rbdc-pg={version="0.1"}
arc-swap = "1"
lazy_static = "1.4.0"
rand = "0.8.5"
serde_json = "1.0.93"
```

编写proto文件

```rust
syntax = "proto3";

package test;

message LoginRequest {
    //手机号码
    string phone = 1;
    //验证码
    string capt = 2;
}

message Token {
    string token = 1;
    string refreshToken = 2;
}

service ChatService {
    //登录
    rpc Login(LoginRequest) returns (Token) {}
}
```

编写build.rs 将proto文件转为Rust代码

```rust
///指定生成的位置为pb 使用type_attribute为struct添加额外的derive
fn main() {
    tauri_build::build();
    tonic_build::configure()
        .out_dir("src/pb")
        .type_attribute(".","#[derive(serde::Serialize)]")
        .compile(&["./chat.proto"], &["./"])
        .unwrap();
}
```

2.编写服务端代码

```rust
pub struct Chat;

type ChatMessageResult<T> = Result<Response<T>, Status>;

#[async_trait]
impl ChatService for Chat {
    async fn login(&self, request: Request<LoginRequest>) -> ChatMessageResult<Token> {
        //使用rbatis作为orm，redis作为reids客户端...
    }
}
```
