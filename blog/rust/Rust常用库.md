---
slug: Rust-Common-Libraries
title: Rust常用库
date: 2024-03-26
authors: carlos
description: Rust常用库
tags: [Rust]
keywords: [Rust,Libraries]
---

## Rust patterns

*提供了一系列代码设计模式，帮助Rust开发者高效解决常见编程问题。*

*   **bitflags**: 通过宏定义创建能代表一组位标志的安全类型，常用于表示一组布尔值。
*   **thiserror**: 一个便捷的库，用于为Rust中的错误类型派生 Error 实现，简化错误处理。
*   **miette**: 强调用户体验的库，提供了美观的错误报告和高级诊断功能。
*   **itertools**: 提供了一系列额外的迭代器适配器、方法和宏，扩展了Rust标准库中的迭代器功能。
*   **once\_cell**: 提供了全局和本地懒加载变量的支持，允许单次初始化后的不可变访问。
*   **eyre**: 提供了一种高度灵活的错误处理和报告方式，允许开发者定义错误报告的样式和上下文。
*   **ordered**-**float**: 提供了浮点数封装器，使得不稳定的浮点数可以被完全排序，从而在集合类型等场合中使用。
*   **bytes**: 专注于字节序列操作的库，用于简化字节切片（如网络缓冲）的处理。
*   **indoc**: 一个宏，用于在源代码中嵌入经过适当缩进处理的多行字符串字面量，增强可读性。
*   **volatile**: 提供了对原始指针的封装，允许更安全的对内存进行易失（volatile）读写操作。
*   **dyn**-**hash**: 提供了可以操作动态（dyn）类型对象的 Hash 特征，用于构建能够接受任何实现了该特征的对象的通用哈希集合。
*   **glib**: Rust语言中GLib库的绑定，使得开发者可以在Rust中使用GLib及相关库提供的底层操作和结构。
*   **const-type-layout**: 通过派生宏相对于原生Rust类型描述（TypeLayout），实现了类型布局信息的常量表示，有利于在编译时检查结构体布局。
*   **rustler**: 一个允许Rust代码以外部函数接口的形式集成到Erlang虚拟机的框架。
*   **rustrix**: 专注于线性代数，特别是矩阵运算，提供了运算宏和基本函数来操作矩阵。
*   **cel-interpreter**: 实现了通用表达式语言（CEL）的解释器，用于执行CEL表达式，常见于策略和规则引擎。

## 网络编程（Network programming）

*例如FTP、HTTP、SSH或更低级别的TCP或UDP等网络协议。*

*   **socket2**：对网络套接字进行高度可配置的处理，使得底层网络编程更加灵活。
*   **ipnet**：提供用于处理网络地址和子网的数据类型，便于实现IP网络计算。
*   **rustls-native-certs**：允许rustls使用平台本地的证书存储，以支持TLS加密通信。
*   **native-tls**：提供一个跨平台的TLS API，封装各个操作系统的本地TLS实现。
*   **async-graphql**：一个强大、类型安全的GraphQL服务器实现，支持异步处理。
*   **tower**：提供网络服务构建的抽象层和中间件，旨在简化构造和组合网络服务。
*   **aws-sdk-s3**：亚马逊简单存储服务（Amazon S3）的官方AWS SDK客户端，用于Rust。
*   **quinn**：基于Rust的QUIC(快速UDP互联网连接)协议实现，支持高效可靠的传输。
*   **port\_check**：用于检查本地端口是否可用或远程端口的连通性。
*   **rqbit**：用Rust编写的bittorrent客户端和服务器，功能丰富且高效。
*   **tokio-modbus**：一个异步的Modbus库，基于Tokio运行时，适合构建实时通信应用。
*   **cidr\_calc**：方便计算CIDR（无类别域间路由选择）相关子网和IP地址范围的库。
*   **azure\_devops\_rust\_api**：用于访问Azure DevOps服务的Rust API库，允许集成和自动化工作流。

## 数据结构（Data structures）

*为特定目的实现的Rust数据结构。*

*   **hashbrown**：一种高效的哈希表实现，基于Google的SwissTable设计，提供快速的查找、插入和删除操作。
*   **bitvec**：让你能够以单个比特为单位操作内存，用于创建紧凑的位数组和位字段。
*   **phf**：静态生成的完美哈希函数库，允许在编译时创建高效的查找表。
*   **indexmap**：保证插入顺序的哈希表映射和集合，结合了快速插入和快速迭代的优势。
*   **half**：提供半精度浮点数(f16和bf16)的Rust实现，适用于精简的浮点计算。
*   **num**：收集了各种数字类型和相关特征（Trait），包括整数、浮点数、有理数和大整数等。
*   **ropey**：为编辑和其他文本操作而设计的Rust文本绳索数据结构，提供高性能。
*   **priority-queue**：实现了优先队列数据结构，基于二叉堆算法，支持动态元素优先级变化。
*   **smallvec**：实现小容量优化的向量，在堆栈上存储少量元素以避免堆分配。
*   **fixedbitset**：简单且高效的位集合实现，用于处理固定大小的比特集合。
*   **yrs**：基于Yjs CRDT算法的Rust实现，支持同步合作编辑等功能需求。
*   **char-list**：提供了类似于字符串但持久（immutable）的特性的字符列表集合。
*   **kbs-types**：定义了可序列化和反序列化的Rust类型，主要用于KBS系统。
*   **any-range**：支持Rust标准库中各种Range类型的枚举，赋予更大的灵活性解析和操作范围。
*   **more\_collections**：提供了一系列额外的集合类型，补充标准库中的collections模块。
*   **xot**：一款功能全面的Rust XML处理库，支持构建和操作XML树结构。
*   **bao-tree**：结合BLAKE3哈希算法，提供可以逐块校验而不是一次性校验整个流的功能。

## 算法

*包括哈希、排序和搜索等核心算法。*

*   **rand**：用于Rust语言的综合随机数生成库，包括各种随机数生成器以及随机性功能和分布。
*   **crc**：提供CRC（循环冗余校验）算法的实现，适用于多种CRC标准和位宽。
*   **fastrand**：以性能为主要目标设计的随机数生成器。
*   **strsim**：包含多种算法来计算和比较字符串的相似度和距离。
*   **twox-hash**：高性能的哈希算法库，基于XXHash算法，适用于快速数据指纹或哈希表的场景。
*   **bytecount**：高效计算字节流中某个特定字节的出现次数或字符串中UTF-8字符的数量。
*   **xxhash-rust**：提供xxHash算法的纯Rust实现，用于高速哈希计算。
*   **rustfft**：一个采用Rust编写的快速傅里叶变换（FFT）库，致力于性能和易用性。
*   **ndarray-slice**：基于ndarray库，提供了对数组进行切片和相关操作的功能。
*   **metaheuristics-nature**：聚集了基于自然过程启发的各类元启发式优化算法，如遗传算法、蚁群算法等。
*   **rand\_simple**：一个简单且功能有限的随机数生成器，适用于较不复杂的随机数生成需求。
*   **hasty**：提供对系统级BLAS（基础线性代数子程序）库的接口，以实现高效的线性代数计算。
*   **dfp-number-sys**：为Intel® 十进制浮点数学库（libdfp）提供绑定，支持十进制浮点数学运算。
*   **wyrand**：是一个简单快速的非加密伪随机数生成器，旨在提供高性能和良好的随机性。

## 开发工具

*测试、调试、代码检查、性能分析、自动完成、格式化等开发工具。*

*   **git2**：提供对libgit2的绑定，允许在Rust中直接与Git仓库进行交互，执行克隆、拉取、推送等操作。
*   **pretty\_assertions**：改进Rust的assert\_eq!和assert\_ne!宏输出，使比较失败时的结果更加可读和美观。
*   **assert-json-diff**：使比较JSON文档更加直观，当断言失败时，显示两个JSON值之间的差异。
*   **kube**：用于与Kubernetes API交云集的Rust客户端，支持构建异步控制器和操作器。
*   **fake**：一个用于生成各种虚假数据的库，如姓名、地址、电话号码等，用于测试和样本生成。
*   **embed-resource**：一个Cargo构建工具，帮助将静态资源如文件和目录打包到最终的Rust可执行文件中。
*   **duct**：用于构建和管理子进程管道的库，有助于编写简洁的进程间通信代码。
*   **include\_dir**：一个宏库，用来嵌入整个目录的内容到你的Rust程序中，使得这些内容成为编译时资源。
*   **irust**：一个跨平台的交互式Rust解释器，它提供了类似REPL的环境来测试和评估Rust代码片段。
*   **gitui**：一个高速、终端用户界面，提供了直观且易用的界面来执行git操作。
*   **gostd**：尝试在Rust中重新实现Go语言的标准库，以学习和比较这两门语言。
*   **qk**：一个快速启动新Rust项目的命令行工具，帮助设置和创建新的项目结构。
*   **precious**：代码质量分析工具，聚合了多种代码分析工具的结果，以提供统一的视图。
*   **deno\_lint**：由Deno项目使用的静态代码分析工具，用于检查并提升Rust代码的质量。
*   **soldeer**：Solidity语言的包管理和构建工具，旨在与智能合约开发流程集成。
*   **streamdal**-**protos**：为Rust生成的protobuf文件集合，主要与streamdal或类似服务端组件进行数据交换。

## 调试

*分类描述：通过日志、追踪或断言了解代码的内部运行情况。*

*   **log**：轻量级的Rust日志门面（facade），为Rust提供统一的日志抽象层。
*   **env\_logger**：为log库提供环境变量配置的日志处理实现。
*   **tracing**：提供结构化的日志记录、错误处理、以及性能分析工具的Rust库。
*   **opentelemetry**：提供了一套API、SDK和相关工具用于收集应用遥测数据如跟踪、度量和日志。
*   **prometheus**：用于Rust程序的监控和度量数据收集的库。
*   **tracing-opentelemetry**：为tracing库提供与OpenTelemetry协议的集成支持。
*   **backtrace**：用于在Rust程序中生成和处理调用栈跟踪信息的库。
*   **iced-x86**：提供了高性能且功能齐全的x86 (16/32/64位) 指令集反汇编能力。
*   **flexi\_logger**：一个功能丰富且可定制的日志记录器，支持文件输出、控制台输出和其他各种日志记录策略。
*   **cadence**：提供高性能的Statsd协议支持用于统计和度量数据收集。
*   **forensic-adb**：是一个基于Tokio异步I/O框架构建的Android Debug Bridge (adb)客户端库。
*   **tracing-axiom**：集成到Axiom云服务的tracing层，允许发送和查看Rust应用的跟踪数据。
*   **minidump-writer**：为了生成与Breakpad兼容的minidumps而从Breakpad minidump\_writer库中重写的Rust库。

## 构建工具（Build Utils）

*用于构建脚本和其他构建时步骤的实用工具。*

*   **pkg-config**：提供从Cargo构建脚本调用pkg-config命令的功能，帮助处理C语言库的编译和链接。
*   **cc**：用于在Cargo的构建脚本中处理C语言族（C/C++/Objective-C）源代码的编译。
*   **cmake**：为构建脚本提供调用cmake命令的能力，以构建需要此系统的本地库依赖。
*   **vergen**：当构建Cargo项目时，通过build.rs脚本动态地生成代码版本信息。
*   **system-deps**：用于自动寻找和使用系统级别的库依赖项，简化构建过程。
*   **shadow-rs**：用于在Rust项目编译时嵌入版本信息、构建时间等元数据。
*   **vcpkg**：允许在Cargo构建过程中通过vcpkg管理系统查找和使用C/C++库。
*   **built**：收集当前构建的元数据如版本号、构建时间，可以嵌入到Rust项目中。
*   **cargo-platform**：提供工具和库用于解析和使用Cargo关于目标平台的specifications。
*   **mc-sgx-sdk-tools**：提供辅助工具用于构建运行在Intel SGX安全隔离区的Rust应用。
*   **cargo**：Rust的官方包管理工具，用于项目的构建、运行、测试和依赖管理。
*   **cxx-build**：生成和集成由cxx crate指定的C++绑定的构建工具。
*   **pargit**：用于提供和Git工作流相关的一系列操作和工具。
*   **garden-tools**：为维护和管理多个Git仓库提供的集合工具。
*   **aya-rustc-llvm-proxy**：一个库，允许将Rust编译器的LLVM调用代理到Rust自身提供的共享库。

## 测试（Testing）

*验证您的代码的正确性。*

*   **trybuild**：用于编写检查编译器错误消息的测试，有助于测试rust代码的编译失败场景。
*   **proptest**：提供基于属性的测试框架，自动生成输入数据并根据属性进行测试，支持失败用例的简化。
*   **insta**：用于捕获和对比Rust测试用例结果的快照，以便进行回归测试。
*   **test-case**：提供一个宏，为单个测试函数生成多个测试用例，每个用例用不同的参数调用该函数。
*   **rstest**：一个测试框架，允许使用fixtures来创建可重用的测试输入和配置，支持参数化测试。
*   **assert\_fs**：测试库，提供文件系统的断言和工具，用于验证在测试过程中文件操作的结果。
*   **arbitrary**：一个为libfuzzer等工具提供无结构化输入到结构化数据转换的特性的库。
*   **serial\_test**：提供一个属性宏，用于确保测试会顺序执行，从而避免并发相关的问题。
*   **testcontainers-modules**：Testcontainers库社区模块的集合，用于在Rust中进行容器化测试。
*   **mockable**：提供了在Rust测试中用于替代依赖组件的模拟对象的工具。
*   **bintest**：专门用来测试使用Cargo的二进制(crate)项目产生的可执行文件的工具。
*   **proptest-state-machine**：扩展proptest库以支持状态机模式的测试，有助于模拟更复杂的场景。
*   **arrow-integration-test**：用于测试Apache Arrow实现的库，支持Arrow JSON格式的集成测试数据。

## 外部功能接口（FFI）

*与其他语言的接口。包括绑定生成器和有用的语言构造。*

*   **pyo3**：提供绑定，允许Rust代码将功能暴露给Python，或从Rust调用Python代码。
*   **napi**：用于创建Rust与Node.js N-API之间的绑定，以编写高性能的Node.js插件。
*   **bindgen**：自动化工具，用于生成Rust中的C或C++代码的外部函数接口（FFI）绑定。
*   **numpy**：一个rust库，提供对NumPy C-API的绑定，通过PyO3使Rust与Python的NumPy数组交互。
*   **cbindgen**：生成C语言绑定的工具，可以通过Rust代码生成C头文件，用于C与Rust代码之间的互操作。
*   **jni**：允许Rust代码与Java Native Interface (JNI) 相互操作，可用于编写Android或任何Java平台应用的原生模块。
*   **cxx**：提供安全的双向Rust与C++互操作的库。
*   **uniffi**：一个生成器，用于创建跨多种语言通用的FFI接口层，允许Rust代码与其他语言交互。
*   **emacs**：允许创建可在GNU Emacs中加载的动态模块。
*   **zits**：用于在Rust中为Holochain zome代码生成TypeScript绑定的工具。
*   **cxx-gen**：一个代码生成器，基于cxx crate提供C++代码绑定，使得在高级别的工具集成中使用变得更容易。
*   **maturin**：一个命令行工具，用于构建和发布使用Python绑定的Rust crate，如通过pyo3或rust-cpython。
*   **opencv-binding-generator**：自动生成绑定，用于将Rust代码与OpenCV库进行互操作。
*   **rustler\_sys**：提供绑定，允许在Rust中使用C NIF API来创建用于Erlang虚拟机的本地实现的插件（NIF模块）。
*   **cxxbridge-cmd**：作为cxx crate的一部分，提供了一个命令行工具来为非Cargo构建的环境生成C++绑定代码。
*   **flutter\_rust\_bridge**：用于Flutter/Dart和Rust之间通信的桥接代码生成器，专注于内存安全和易用性。

## Cargo 插件

*扩展 Cargo 功能的子命令。*

*   **cargo\_metadata**：提供了程序化访问cargo metadata命令产生的JSON输出的库。
*   **cargo-sort**：一个 Cargo 子命令，用于检查 Cargo.toml 文件的依赖项是否已经按字母顺序排序。
*   **cargo-deb**：Cargo 子命令，简化了将Rust项目打包成Debian软件包格式(.deb)的过程。
*   **cargo-hack**：一个Cargo子命令，它为Cargo工具添加了额外的、有用的命令行选项和功能。
*   **cargo-make**：是一个Rust项目的强大任务运行器和构建工具，用于定义和运行复杂的工作流程。
*   **cargo-outdated**：Cargo 子命令，用于检查项目的Cargo.lock或Cargo.toml文件中列出的依赖项是否有新版本可用。
*   **flamegraph**：Cargo 子命令，用于方便地为Rust程序创建性能火焰图。
*   **cargo-wasi**：Cargo 子命令，简化了构建目标是wasm32-wasi的WebAssembly应用程序的过程。
*   **cargo-c**：一个辅助工具，用于协助生产和安装可以被C程序调用的Rust库。
*   cargo-bundle-licenses：一个Cargo插件，用于收集并捆绑项目依赖项中的许可证信息。
*   **cargo-dist**：提供Rust应用打包成各种可交付格式的工具。
*   **cargo-aur**：Cargo 子命令，用于帮助将Rust项目打包并发布到Arch Linux用户存储库（AUR）中。

## 性能分析

*分析代码的性能表现*

*   **criterion**：为 Rust 提供强大的统计性能基准测试的库，用于准确测量代码性能变化。
*   **pprof**：提供性能分析工具，用于分析Rust程序的CPU使用和内存分配。
*   **profiling**：一个轻量级接口，简化了在Rust程序中集成多种性能分析工具的过程。
*   **divan**：专注于提供用户友好和实用统计输出的Rust基准测试库。
*   **inferno**：用于生成火焰图的工具集，是Brendan Gregg的FlameGraph工具的Rust语言移植版。
*   **puffin**：专为游戏开发设计的Rust性能分析器，集成易用的图形界面。
*   **tracing-chrome**：提供了一个为tracing日志框架输出可以在Chrome浏览器跟踪视图查看的数据的组件。
*   **iai-callgrind**：提供高精度的基准测试，用于测量Rust代码的性能及其在调用图中的行为。
*   **hdfs-native**：一个在Rust中实现的原生HDFS(Hadoop分布式文件系统)客户端库。
*   **rd-hashd**：为 resctl-demo (资源控制演示项目) 提供的延迟敏感的模拟工作负载。
*   **datadog-statsd**：用于发送统计信息到Datadog平台的Rust语言dogstatsd客户端实现。
*   **resctl-bench**：一个基准测试工具，用于根据真实场景测试整体系统资源控制的效果。
*   **peekbufread**：Rust库，为std::io::Read特性实现了支持检查点和预览的缓冲读取器。
*   **mq-workload-generator**：工具用来生成测试Apache RocketMQ和Apache Kafka中间件性能的工作负载。

## 过程宏

*使用过程宏扩展 Rust 语言。*

*   **derive\_more**：提供额外的派生宏，简化了常见派生特性，如Clone, Eq, PartialEq等的实现过程。
*   **proc-macro-error**：提供过程宏中错误报告的辅助工具，使错误处理更加友好和易于定位问题。
*   **strum**：提供一系列宏，用于枚举类型与字符串之间的转换以及其他枚举相关的工具。
*   **proc-macro-crate**：帮助过程宏定位本身所在的crate，解决宏内部引用宏定义所在的crate时的路径问题。
*   **proc-macro2**：代替编译器内建的proc\_macro库，提供更稳定且全面的 API 用于构建过程宏。
*   **syn**：用于解析Rust代码的库，常用于编写自定义过程宏。
*   **quote**：用于引用Rust代码并生成过程宏中的代码片段。
*   **unicode-ident**：用于检测字符是否符合Unicode XID标准，通常用于确定字符是否可以作为合法的源码标识符。
*   **r2r**：提供了Rust异步编程风格的Robot Operating System (ROS 2) 绑定，无需关心底层实现细节。
*   **napi-derive-backend**：napi 库的一部分，处理过程宏代码生成的后端逻辑。
*   **simpl\_cache**：一个简单易用的缓存数据结构的实现库。
*   **int-enum**：为枚举类型派生trait来实现与整数类型间的相互转换。
*   **derive-adhoc**：一个允许高效编写自定义derive宏的工具库。

## 网络编程

*为 Web 创建应用程序。*

*   **tonic**：提供一个Rust的gRPC框架，是基于Tokio提供异步I/O的高性能服务端与客户端实现。
*   **jsonwebtoken**：Rust中用于编码和解码JSON Web Tokens（JWT）的库，特色是强类型和易用性。
*   **h2**：Rust中的HTTP/2 协议的客户端和服务器实现，完全异步且性能高效。
*   **web-sys**：提供Rust绑定所有Web APIs 的库，这些API通过WebIDL自动生成。
*   **http**：一个提供HTTP请求和响应的类型的Rust库，作为基本的HTTP元素的抽象。
*   **mockito**：一个用于Rust，可以模拟HTTP请求和设置预期响应的库，常用于测试。
*   **tower-http**：基于Tower服务抽象的HTTP中间件和实用工具集合，适用于构建客户端和服务器。
*   **mime**：Rust库，用于表示和解析MIME类型，提供强类型接口。
*   **sourcemap**：用于解析和处理JavaScript源码映射的Rust库。
*   **sendgrid**：用于从Rust应用中向SendGrid发送邮件的非官方库。
*   **tame-index**：用于访问本地和Git上的Cargo注册索引的库，支持私有和公共索引。
*   **quick-js-dtp**：一个包装了QuickJS JavaScript引擎的Rust库，包括日期解析器的改进。
*   **richard**：一个用Rust编写的模块化的聊天机器人框架。
*   **flipkart\_scraper**：一个Rust库，用于爬取Flipkart电子商务平台的产品细节和信息。
*   **qcs-api-client-openapi**：根据QCS（量子计算服务）OpenAPI规范自动生成的Rust客户端库。

## HTTP 服务器

*   **axum**：构建在Tokio和hyper之上的现代网络框架，强调安全性、简洁性和高性能。
*   **tiny\_http**：提供简单且低级别的HTTP服务器功能，允许细粒度控制响应处理。
*   **warp**：基于Filter组合构建的Rust Web服务器框架，通过这种方式提供API的声明和组合。
*   **actix-web**：基于Actix系统，是一个异步、模块化且功能丰富的Web框架，注重速度和简洁性。
*   **lambda\_runtime**：提供库和宏来编写可以部署到AWS Lambda上的Rust函数。
*   **actix-cors**：用于在Actix-web框架中处理CORS规则的中间件。
*   **hyper-rustls**：将Rustls（一个纯Rust实现的TLS工具包）与Hyper结合，以支持HTTPS。
*   **lambda\_http**：支持AWS Lambda上的HTTP事件，如那些来自应用负载均衡器或API网关。
*   **mollysocket**：一个库，用于与实现UnifiedPush规范的推送服务协商和接收通知。
*   **deadnews-template-rust**：用作新Rust项目的起点的模板，提供了标准的项目结构和配置。
*   **trillium-testing**：旨在帮助开发者为Trillium Web框架编写测试的库。
*   **firewall**：提供一层抽象，允许Rust应用程序轻松地处理例如连接过滤和拒绝的网络策略。

## HTTP 客户端

*   **ureq**：一个简单，安全，并拥有最小运行时的HTTP客户端库，它阻塞而不使用异步Rust特性。
*   **reqwest**：一个简单易用的，基于异步Rust特性的HTTP客户端，支持多种HTTP请求和自定义中间件。
*   **hyper**：提供低级别HTTP功能，支持异步Rust，可作为HTTP客户端和服务器的构建块。
*   **octocrab**：面向GitHub REST API v3的客户端库，提供流畅的接口和可扩展性。
*   **curl**：为libcurl提供Rust语言绑定，libcurl是一个成熟且功能强大的HTTP客户端库。
*   **reqwest-middleware**：为reqwest构建的中间件系统，使得在reqwest的请求响应流程中添加自定义逻辑变得简单。
*   **minreq**：设计轻量，尽量减少依赖的简单HTTP客户端，适用于需要极小体积的应用。
*   **h3**：基于quinn（Rust语言的QUIC协议实现）的HTTP/3协议客户端和服务器侧实现。
*   **attohttpc**：致力于减少不必要复杂性的HTTP客户端库，易于上手。
*   **modio**：面向[http://mod.io](https://link.zhihu.com/?target=http%3A//mod.io)服务的API客户端，用于交互式游戏内容管理。
*   **solaredge**：提供了solaredge光伏设备监控系统API的客户端实现。
*   **dbl-rs**：为top.gg（原[http://discordbots.org](https://link.zhihu.com/?target=http%3A//discordbots.org)）提供的Rust API绑定，用于与其平台进行交云。
*   **rest-json-client**：封装了发送HTTP JSON请求的复杂性，提供简单的调用方式。
*   **monoio-http**：为支持异步runtime monoio提供的HTTP客户端和服务器实现。
*   **malwaredb-client**：一个客户端库，用于与在线恶意软件数据库MalwareDB交云。

## WebSocket

*   **tokio-tungstenite**：为Tungstenite WebSocket库提供的Tokio异步runtime支持，使其能够在Tokio生态中使用WebSocket。
*   **async-tungstenite**：允许在任何异步runtime上运行的Tungstenite WebSocket库的异步接口。
*   **ws\_stream\_wasm**：使WebAssembly项目中使用WebSockets变得简单，提供适用于浏览器环境的封装。
*   **tungstenite**：一个简单易用的Rust实现的WebSocket库，不依赖于特定的异步runtime。
*   **headless\_chrome**：一个用于通过程序控制Chrome或Chromium浏览器进行自动化操作的库。
*   **rust\_socketio**：一个为Rust提供的[http://socket.io](https://link.zhihu.com/?target=http%3A//socket.io)协议客户端实现，支持与[http://socket.io](https://link.zhihu.com/?target=http%3A//socket.io)服务器进行实时通信。
*   **fastwebsockets**：一个高性能且符合WebSocket标准（RFC 6455）的服务器端WebSocket实现。
*   **soketto**：是一个低层次的WebSocket库，用于处理WebSocket连接的握手和帧协议。
*   **opentalk-janus-client**：针对WebRTC服务器Janus的客户端库，专门用于OpenTalk项目中的WebRTC通信。
*   **irelia**：一个封装了League of Legends游戏API的Rust库，方便访问和交互游戏数据。

## 编码数据

*将数据从一种格式编码和/或解码为另一种格式。*

*   **base64**：提供用于对字节数据进行Base64编码和解码的功能，允许在Rust代码中进行Base64转换。
*   **serde\_with**：提供扩展给serde库的自定义de/serialization函数，允许更灵活地处理特殊数据类型或复杂的序列化逻辑。
*   **bincode**：一种基于二进制的高效序列化和反序列化库，适用于Rust语言。
*   **prost**：一个Protocol Buffers（被广泛使用的跨语言的结构数据序列化格式）的Rust实现。
*   **encoding\_rs**：Mozilla开发的编码库，主要用于Firefox，实现了在Web中广泛使用的字符编码。
*   **protobuf**：Rust版本的Google Protocol Buffers，一个灵活的数据序列化工具，广泛用于远程过程调用和数据交换。
*   **erased**-serde：提供类型擦除的序列化特征的库，允许在不知道具体类型的情况下对数据进行序列化和反序列化。
*   **serde-wasm-bindgen**：整合了serde和wasm-bindgen，用以在WebAssembly绑定中使用Serde序列化和反序列化。
*   **bs58**：实现Base58编码和解码的库，常用于比特币和其他加密货币中。
*   **rkyv**：专注性能，为Rust提供无需序列化和反序列化即可读取的二进制格式。
*   **cookie-factory**：一个编写序列化代码的库，受到了Rust的解析库nom的启发。
*   **serde\_json\_lenient**：支持从格式宽松的JSON数据进行反序列化的库。
*   **cbor-data**：CBOR（Concise Binary Object Representation）序列化和反序列化的实现，用于高效的二进制数据交换。
*   **recoord**：提供简化不同坐标系统之间转换的库，比如将地理位置从一种投影转换到另一种。

## WebAssembly

*   **instant**：提供了一个时间测量库，它在WebAssembly环境中与std::time::Instant兼容，但也在非WASM环境下工作。
*   **wasmi**：是一个独立的WebAssembly（WASM）模块的纯Rust解释器，用于执行WASM代码。
*   **rhai**：一个小巧快速的嵌入式脚本语言，适用于Rust项目中需要脚本支持的地方。
*   **console\_log**：一个日志前端，它将log crate的日志消息转发到浏览器的控制台中。
*   **wit-component**：处理WIT(WebAssembly Interface Types)文件和WebAssembly组件的Rust工具。
*   **wit-parser**：用于解析WebAssembly Interface Types(WIT)文件的库，允许在Rust中操作文件内容。
*   **js-sys**：提供Rust绑定到JavaScript的全局对象和函数的WebAssembly绑定。
*   **ts-rs**：一个库，可以根据Rust结构体和枚举类型自动生成对应的TypeScript类型定义。
*   **awsm\_web**：旨在让与WebAssembly工作变得更加简单，提供了一系列便利的封装和工具函数。
*   **async-timer**：为Rust异步编程提供的定时器库，提供单次或重复触发的定时器功能。
*   **js-component-bindgen**：将Rust编译成WebAssembly并生成JavaScript组件的工具，简化了WebAssembly模块在前端项目中的集成。
*   **wasmtime-runtime**：是Wasmtime WebAssembly运行时所使用的核心库，支持WebAssembly模块的执行。
*   **wasmtime-cranelift**：整合Wasmtime运行时和Cranelift代码生成器的工具，用于编译WebAssembly字节码为本地机器码。

## Cryptography

*旨在保护数据安全的算法。*

*   **rustls**：一个安全的TLS库，完全用Rust实现，不依赖于本地TLS库，提供TLS协议的通信。
*   **blake3**：一个快速的加密哈希函数，提供了并行计算的优势。
*   **curve25519-dalek**：基于Rust语言实现的椭圆曲线库，专门用于Curve25519算法的群操作。
*   **openssl**：为OpenSSL提供FFI（外部函数接口）绑定，使Rust代码可以使用OpenSSL的加密功能。
*   **secp256k1**：为secp256k1比特币椭圆曲线提供绑定的库，包括数字签名算法。
*   **sha1**：提供SHA-1加密哈希算法的Rust实现。
*   **signature**：一个定义加密签名应具备特性的库，支持多种加密签名算法如ECDSA和Ed25519。
*   **rustls-pemfile**：一个简单的在Rust中解析PEM格式文件（如TLS证书和密钥）的库。
*   **rustls-pki-types**：定义了rustls证书相关的公共类型和特性，用于PKI（公钥基础设施）。
*   **rufendec**：一个文件加密和解密的工具，用于保护文件内容的安全。
*   **xrc\_cli**：一个多线程处理文件加密/解密操作的命令行工具。
*   **dco3\_crypto**：DRACOON的加密库，在Rust中实现对称和非对称加密方法。
*   **cloudproof**：由Cosmian提供的一个用于数据隐私保护和安全多方计算的高级加密库。
*   **russh**：一个用Rust编写的SSH协议实现，包含客户端和服务器功能的库。

## Parser

*解析数据格式或语言的工具。*

*   **nom**：Rust中的解析库，它使用宏来构建出高性能、零拷贝的解析器组合子。
*   **uuid**：Rust中用于生成和解析通用唯一识别码（UUID）的库。
*   **quick-xml**：快速、灵活的XML处理库，支持读取和写入XML文档。
*   **semver**：用于解析和比较遵循语义化版本控制规范（SemVer）的版本号。
*   **url**：解析、构造和序列化URL的库，遵循WHATWG的URL标准。
*   **xml-rs**：一个简单易用的XML解析器，完全用Rust编写。
*   **sqlparser**：一个可扩展的SQL解析器，支持解析各种SQL方言，包括ANSI SQL:2011。
*   **syntect**：用于代码和其他文本进行语法高亮显示的库。
*   **html5ever**：一个高性能的HTML5解析库，能以接近浏览器的方式解析错误格式的HTML文档。
*   **simd-json**：利用simd指令集优化的JSON解析库，基于C++simdjson库。
*   **markup5ever**：作为xml5ever和html5ever共享的底层库，包含HTML和XML解析的通用代码。
*   **xml5ever**：一个高性能的推送式XML解析库，可以作为HTML5解析的底层。
*   **ada-url**：提供快速且WHATWG标准兼容的URL解析。
*   **pest\_fmt**：基于pest库的格式化工具，用于美化或格式化pest语法规则。
*   **kalk**：数学表达式解析和求值库，支持自定义函数。
*   **cargo-util-schemas**：用于Cargo配置文件和其他相关结构的反序列化模式。
*   **svgrtypes**：用于解析和操作SVG文档类型的Rust库。

## 异步Asynchronous

*使用futures、promises、等待或事件化等技术的异步程序流。*

*   **tokio**: 一个Rust编程语言的异步运行时，专门设计用于开发高效率的网络服务。它基于Rust的异步IO功能构建，并实现了事件循环和任务调度。
*   **tokio-rustls**: 一个结合了Rust的异步网络库tokio和Rustls TLS库的项目。它允许开发者在tokio程序中使用基于Rustls的TLS功能。
*   **rdkafka**: 是Apache Kafka客户端库librdkafka的Rust接口封装。提供高性能生产者和消费者用于Rust语言的操作Kafka集群。
*   **mio**: 是一个轻量级的异步IO库，专注于非阻塞的I/O实现。它为建立自定义的事件循环提供了底层的构建块。
*   **mlua**: 是一个Rust接口的Lua绑定库，允许对Lua代码进行高级的和安全的操作，支持Lua 5.4/5.3/5.2和5版本。
*   **async-process**: 一个提供异步接口的Rust库，用于启动和管理子进程。
*   **async-compat**: 提供了一个适配器层，允许在tokio和使用futures库的代码之间轻松进行转换。
*   **bb8**: 是一个基于tokio的异步数据库连接池，灵感来源于同步连接池r2d2。
*   **futures-rustls**: 该库结合了futures库和Rustls，为基于futures的异步Rust代码提供TLS/SSL流的支持。
*   **async-shutdown**: 提供了一套用于异步应用的优雅关闭机制，有助于正确处理清理和资源释放。
*   **openraft**: 是一个高级的Rust Raft协议实现，可以用在需要分布式共识的场景中，例如分布式数据库、分布式系统等。
*   **remoc**: 这个库旨在提供Rust语言中远程对象和通道的多路复用和透明的序列化/反序列化。
*   **automerge**: 是一种用于构建本地和分布式应用程序的数据结构（CRDTs），它允许多个用户同时对数据进行更改和合并。
*   **monoio**: 是一个基于Linux io\_uring的纯Rust异步运行时，专注于提供更高的I/O性能和吞吐量。
*   **nodecraft**: 该项目听起来像是分布式系统构建的工具，但无法提供更准确的描述，因为它不是一个广为人知的项目或库。
*   **screeps-async**: 是为了游戏Screeps设计的异步Rust运行时环境，该游戏是一个用于编程AI来控制游戏单位的MMO RTS游戏。这使得玩家可以在游戏中使用Rust编程语言。

## 并发编程

*实现并发和并行计算的类库（crate）。*

*   **parking\_lot**：提供更紧凑和高效的互斥锁和其他同步原语。
*   **spin**：提供自旋锁等基于忙等待的同步原语。
*   **rayon**：一个数据并行计算库，允许你轻松地将计算转化为并行工作。
*   **dashmap**：提供一个快速且多线程安全的HashMap实现。
*   **flume**：高性能的多生产者，单消费者(MPSC)通道实现。
*   **threadpool**：用于创建线程池，可用于并行任务执行的管理。
*   **thread\_local**：允许线程私有的变量存储，避免锁的使用。
*   **crossbeam**：包含数据结构和并发工具，用于编写多线程Rust代码。
*   **pueue**：一个命令行工具，可以用来排队执行长时间运行的shell命令，并管理它们的执行。
*   **messaging\_thread\_pool**：一个用于创建管理消息传递的类型化线程池的库。
*   **omango**：是一个库，但当前知识库中没有预存信息，保留原描述。
*   **melodium**：是一个专注项目，但当前知识库中没有预存信息，保留原描述。
*   **parseq**：提供并行和顺序迭代器，以优化集合的处理。
*   **vlock**：是一个库，但当前知识库中没有预存信息，保留原描述。
*   **gix-actor**：一个库，用于识别和处理与git相关的actor信息。
*   **asyncgit**：一个库，它允许你在异步环境中使用git2-rs库，以非阻塞方式与git仓库交互。

## 解析工具

*底层工具和解析器生成器。*

*   **pest**：一个优雅的解析器生成库，用于构建基于规则的解析器，具有简洁的语法。
*   **logos**：一个用于创建极其快速的Rust词法分析器的库。
*   **combine**：功能强大的解析库，可以在任何类型的输入流上应用，并支持无拷贝操作。
*   **chumsky**：一个对开发者友好的解析器构建库，特别关注于错误报告和恢复。
*   **lalrpop**：一个易于使用的LR(1)解析器生成器，主要用于编译器开发。
*   **pom**：基于PEG（解析表达式文法）的解析器组合子库，使用Rust操作符重载方便地定义解析规则，无需宏。
*   **pest\_meta**：处理pest定义的语法，并提供解析器和验证器。
*   y**ap**：一个轻量级，并且没有依赖的解析库，但当前知识库中没有预存信息，保留原描述。
*   **yggdrasil**-**rt**：是一个库，但当前知识库中没有预存信息，保留原描述。
*   **derive-finite-automaton**：一个过程宏，帮助生成有限状态自动机。
*   **parol\_runtime**：是’parol’解析器生成器所生成的解析器的运行时支持库。
*   **ruly2**：一个可以基于上下文无关的文法规则生成解析器的库。
*   **binator**：一个可以用于构建复杂解析逻辑的解析器组合子库。
*   **chainchomp**：自称为Rust中最强固的小型解析器组合子库。
*   **parcours**：一个提供唯一结果的解析器组合子库。
*   **pest\_vm**：是pest解析器框架的虚拟机部分，执行pest语法。

## 文本处理

*处理以文本形式表达的人类语言的复杂性。*

*   **regex**：强大的正则表达式库，提供高性能的模式匹配和相关功能。
*   **textwrap**：用于对文本进行自动换行、缩进，以及删除不必要的空白字符。
*   **unicode-segmentation**：处理Unicode文本，按照图形簇、单词和句子边界进行分割。
*   **fancy-regex**：支持回溯等高级正则表达式功能的库。
*   **similar**：一个对文本和二进制文件执行差异对比的库。
*   **const\_format**：在编译时对字符串进行格式化的工具。
*   **unicode-xid**：用于检查字符是否符合XID\_Start或XID\_Continue属性的库。
*   **ascii**：处理纯ASCII字符、字符串的轻量级库，提供一些常用的ASCII相关操作。
*   **zhconv**：用于转换繁体字和简体字，以及处理不同地区中文之间的相互转换。
*   **ncase**：库名可能涉及用于大小写转换和样式强制的功能，但没有更多信息。
*   **quranize**：将音译文本编码为古兰经文本格式的库。
*   **simple-string-patterns**：简化字符串中的匹配、分割和提取模式的操作。
*   **mdbook-numthm**：为mdbook工具提供的预处理器，自动为定理、引理等元素编号。

## 命令行界面

*参数解析器、行编辑或输出着色与格式化。*

*   **colored**：用于在Rust终端输出中轻松添加颜色和风格的库。
*   **rustyline**：为Rust提供类似readline的行编辑功能和历史功能，基于Antirez’s Linenoise实现。
*   **crossterm**：一个提供通用的接口来操作各种终端功能的跨平台库。
*   **codespan-reporting**：生成带有代码高亮和注释的诊断信息，便于在文本编程语言开发中展示错误。
*   **clap**：一个功能丰富的命令行参数解析库，易于使用且性能出色。
*   **prettytable-rs**：一个在Rust终端中生成和打印美观表格的库。
*   **nu-ansi-term**：用于在ANSI兼容终端上操作颜色和样式（如粗体、下划线）的库。
*   **owo-colors**：一个零分配的库，用于在终端输出中添加颜色，强调简单性和性能。
*   **bpaf**：一个命令行参数解析器，它使用解析器组合子来提供灵活的参数解析策略。
*   **inquire**：一个用于在终端创建交互式用户输入提示的库。
*   **cling**：是一个库，但当前知识库中没有预存信息，保留原描述。
*   **colog**：看起来是一个简单的日志格式化库，当前没有更多信息。
*   **miniarg**：一个为资源受限环境设计的最小化命令行参数解析器，支持no-std和no-alloc环境。
*   **mvgfahrinfo**：可能是一个用于获取慕尼黑公共交通实时发车信息的库，当前没有更多信息。
*   **alacritty\_config**：一个用于操作和管理Alacritty终端仿真器配置的Rust库。

## 日期和时间

*处理第四维度。*

*   **chrono**：一个功能丰富的日期和时间处理库，支持时区和格式化。
*   **chrono-tz**：为chrono库提供时区支持，基于全世界的IANA时区数据库。
*   **httpdate**：用于解析和格式化HTTP日期标头的Rust库。
*   **iana-time-zone**：一个用于获取当前系统IANA时区名称的库。
*   **hifitime**：一个用于高精度日期和时间计算的库，保留原描述。
*   **cron**：用于解析cron语法的解析器和用于时间表达式的库。
*   **humantime**：用于解析和格式化std::time::{Duration, SystemTime}的库，具有人类友好的接口。
*   **coarsetime**：一个为速度优化而设计的时间和持续时间操作库。
*   **speedate**：一个用于快速而简单的日期和时间解析的库。
*   **utcnow**：一个可以在没有标准库支持的环境中获取当前Unix时间戳的库。
*   **zone-detect**：ZoneDetect C库的Rust绑定，用于地理位置上的时区检测。
*   **radio\_datetime\_utils**：为无线电时间信号解码设备提供日期和时间结构的实用工具库。
*   **gostd\_time**：可能是为带有time包功能的Golang标准库提供Rust实现的库，但当前缺乏详细信息。
*   **easy\_time**：易于使用的时间操作库，旨在使在Rust中处理时间更加简单。

## 数据库接口

*与数据库管理系统进行接口交云操作。*

*   **sqlx**：一个异步、无需ORM的SQL查询库，支持静态查询验证和多个数据库后端。
*   **redis**：为Rust编程语言提供的Redis数据库的客户端驱动程序。
*   **diesel**：一个安全且可扩展的ORM和查询构建器，专为PostgreSQL、MySQL和SQLite设计。
*   **rusqlite**：SQLite数据库的高级Rust封装，提供方便的访问功能。
*   **webpki-roots**：包含Mozilla维护的CA根证书，用于webpki，可用于TLS认证。
*   **mongodb**：Rust的官方MongoDB驱动程序，提供异步操作数据库功能。
*   **libsqlite3-sys**：为libsqlite3数据库引擎提供低级（unsafe）绑定的库。
*   **sea-query**：一个数据库独立的SQL查询生成器，支持MySQL、Postgres和SQLite。
*   **couch\_rs**：用于访问和操纵CouchDB的Rust库。
*   **sqlite-hashes**：为SQLite提供了支持聚合的哈希函数，如MD5等。
*   **malwaredb**：管理恶意软件和良性软件数据集的库，但缺乏详细信息。
*   **rusty-sidekiq**：提供Rust中的sidekiq兼容服务器和客户端实现，使用tokio异步运行时。
*   **spin-sdk**：Spin的Rust SDK，简化了使用Rust构建和部署Spin组件的过程。
*   **typeql**：可能是一个为Rust设计的查询语言库，但缺乏详细信息。
*   **charybdis\_parser**：Charybdis ORM使用的解析器库，可能用于解析SQL查询目的，但具体细节不详。

## 数据库实现

*用Rust实现的数据库管理系统。*

*   **tantivy**：一个快速、全文搜索引擎库，使用Rust编写，便于构建自己的搜索引擎。
*   **redb**：为嵌入式使用情况设计的高性能Rust数据库。
*   **sonic-server**：一个快速、轻量、无模式的搜索后端，旨在替代Elasticsearch等更重的方案。
*   **indicium**：适用于在内存中处理集合和键值存储搜索的Rust库。
*   **dittolive-ditto**：Ditto是一个对等的、能够在不同平台间同步数据的跨平台数据库。
*   **persy**：提供单一文件存储的事务性持久引擎，支持索引和复合事务。
*   **oxigraph**：一个实现了SPARQL查询语言的RDF数据库和工具集合，用于处理关联数据。
*   **marble**：一个Rust写的磁盘上对象存储库，具备自动垃圾回收功能。
*   **surrealdb-core-beta**：surrealdb-core crate的测试版，是SurrealDB数据库的核心组件。
*   **worterbuch**：可能是一个消息代理与数据库功能结合的库，但当前缺乏详细信息。
*   **rustdb**：一个Rust编写的SQL数据库，适合学习和小项目使用。
*   **seekstorm**：可能是搜索引擎库和多租户搜索服务器的合集，但当前没有更多信息。
*   **airomem**：受Prevayler系统和@jarekratajski工作的启发，提供简单的持久性解决方案的Rust库。
*   **polars-ffi**：Polars数据科学库的跨语言接口（FFI），允许从其他编程语言访问Polars功能。

缓存\\

*   **cached**：一个用于Rust的缓存库，提供易用的函数记忆化功能，通常用来加速重复计算的场景。
*   **string\_cache**：为Rust提供的字符串缓存库，池化常用字符串以节省内存和提高性能。
*   **moka**：一个受Java Caffeine项目启发的高性能、并发缓存库适用于Rust。
*   **lru**：一个提供最近最少使用（LRU）缓存算法实现的Rust库。
*   **ustr**：一个高效且对外部函数接口（FFI）友好的Rust字符串内联库。
*   **quick\_cache**：一个轻量级、高性能的并发缓存实现。
*   **lru\_time\_cache**：使用LRU缓存算法的库，有加入了元素的有效期。
*   **http-cache-semantics**：用于实现符合RFC 7234的HTTP缓存规则，处理HTTP头以做出缓存决策。
*   **concread**：面向Rust并发读取场景的数据结构库。
*   **hashlru**：一个简单的LRU缓存实现，使用哈希表提供快速查找。
*   **razel**：一个用于带有缓存的数据处理和命令执行管道的Rust工具。
*   **s3-fifo**：专门为Amazon S3服务设计的高效FIFO缓存实现。
*   **build-clean**：一个用于清理磁盘上所有构建缓存的工具，有助于清理编译过程中产生的临时文件。
*   **assets\_manager**：一个方便加载、缓存和管理外部资源（如游戏资源）的Rust库。

## 压缩

*   **flate2**：Rust中提供DEFLATE算法压缩和解压缩功能的库。
*   **tar**：用于在Rust中读写tar归档文件的库。
*   **brotli**：一个支持高压缩率的压缩和解压缩库，基于Brotli算法。
*   **miniz\_oxide**：一个纯Rust实现的DEFLATE压缩和解压缩库。
*   **lz4\_flex**：宣称为Rust中最快的LZ4压缩实现，致力于安全而高效的数据压缩。
*   **zstd**：Rust绑定到zstd（Zstandard）压缩库。
*   **log4rs**：一个高度可配置的日志记录库，支持多种日志目的地。
*   **parquet**：Rust语言中的Apache Parquet格式读写实现。
*   **laz**：Laszip算法的Rust移植，专门用于压缩和解压LAS点云数据格式。
*   **crabz**：一个专注于提高压缩效率的并行压缩库。
*   **libz-sys**：提供对系统级zlib库的绑定的Rust crate。
*   **sn-releases**：一个库，用于下载并解压safe\_network仓库发布的二进制文件。
*   **pco**：对数字序列提供良好压缩效果的Rust库，但当前没有更多信息。
*   **thc**：一个针对H3（一种六边形地理索引系统）单元索引定制压缩方案的库。
*   **fqkit**：一个跨平台的Rust程序，用于快速操作fastq文件，这是一种用于存储生物信息测序数据的格式。
*   **gdeflate**：压缩和解压GDeflate格式的Rust库。
*   **sux**：在Rust中实现的简洁和压缩数据结构的纯Rust库。
*   **fst-native**：一个Rust实现的FST（一种音频数据格式）波形格式读取器。
*   **rc-zip**：一个与I/O操作无关，纯Rust实现的ZIP文件格式解析和构建库。
*   **tsz-compress**：一个专门为时间序列数据设计的压缩库，采用Delta-delta和Delta编码技术。

## 文件系统

*处理文件和文件系统的类库（crate）。*

*   **tempfile**：用于在Rust中安全地创建临时文件和目录的库。
*   **directories**：提供平台特定的数据、配置和缓存文件夹的路径。
*   **camino**：Rust库，提供用于处理文件路径的UTF-8 API。
*   **notify**：一个实现文件系统修改通知的跨平台库，支持多种操作系统。
*   **glob**：用于基于Unix shell样式模式的文件路径匹配的库。
*   **which**：一个用于发现系统中命令位置的库，类似于Unix的"which"命令。
*   **fs\_extra**：提供标准库std::fs和std::io之外的额外文件系统操作功能，如递归复制和移动文件。
*   **mime\_guess**：通过给定的文件扩展名推断可能的MIME类型。
*   **trash**：一个将文件和目录移动到回收站而不是直接删除的库。
*   **temp-dir**：用于管理Rust中带有清理功能的临时目录。
*   **c2patool**：一个用于展示和创建C2PA（一种内容验证标准）清单的工具。
*   **trasher**：一个命令行工具，用垃圾箱系统代替使用’rm’和’del’命令删除文件。
*   **super\_speedy\_syslog\_searcher**：一个用于快速搜索和合并指定日期时间范围内日志信息的工具。
*   **simple-disk-benchmark**：一个简单的磁盘性能基准测试工具。

## 操作系统

*绑定到特定操作系统 API 的库。*

*   **sysinfo**：一个用于获取系统信息、CPU、内存使用情况、网络信息或者列出当前的进程等的库。
*   **getrandom**：为Rust提供的一个简单的跨平台API，用于获取随机数。
*   **libc**：提供Rust绑定到本地C库（例如libc）的一个底层（unsafe）接口。
*   **whoami**：一个用于检索当前用户和环境信息（如用户名、主机名）的库。
*   **signal-hook**：用于处理Unix信号的Rust库。
*   **ctrlc**：提供简单的方法来处理用户输入Ctrl-C（中断信号）的Rust库。
*   **os\_info**：一个侦测当前操作系统类型和版本的库。
*   **errno**：访问errno变量的跨平台Rust库。
*   **redox\_syscall**：为Redox操作系统提供低级（unsafe）系统调用的Rust库。
*   **mid**：一个生成基于系统硬件信息的唯一机器ID或哈希的库。
*   **memprocfs**：专注于物理内存分析的Rust框架。
*   **brt**：一个在Rust中实现类似于顶部（btop）功能的系统监控工具。
*   **nc**：提供对底层系统调用直接访问的Rust库。
*   **riot-sys**：为RIOT操作系统（轻量级、适用于物联网的操作系统）提供Rust FFI绑定的库。
*   **httm**：一个命令行工具，用于查看在ZFS和btrfs文件系统上的快照文件版本。
*   **rattler\_virtual\_packages**：处理Conda虚拟包和它们之间依赖性检测的库。
*   **rattler**：一个自动化安装Conda环境的Rust库或工具。

## 硬件支持

*与特定的CPU或其他硬件特性进行接口交云操作。*

*   **num\_cpus**：一个用于确定运行当前进程的机器上有多少个CPU核心的Rust库。
*   **serialport**：提供对串行端口的编程访问的跨平台Rust库，用于与通过串口连接的设备进行通信。
*   **crc32fast**：一个使用SIMD指令集加速的CRC32（循环冗余校验码）计算库，能够快速处理大量数据。
*   **blake2b\_simd**：一个用Rust编写的BLAKE2b哈希函数实现，利用SIMD指令进行优化以提高性能。
*   **rusb**：提供Rust应用程序访问USB设备的能力，允许执行USB通信。
*   **hidapi**：对hidapi C库的Rust封装，提供对HID（人机接口设备）的访问。
*   **raw-cpuid**：一个用Rust编写的库，它允许解析和提取x86 CPU的CPUID信息。
*   **riscv**：Rust库，用于在RISC-V架构上进行低级访问和操作。
*   **mc-sgx-trts**：对英特尔软件保护扩展（Intel SGX）的Trusted Runtime System库（sgx\_trts）的Rust封装。
*   **mc-sgx-capable**：为判断系统是否支持Intel SGX以及是否有使能SGX的Rust封装。
*   **libarc2**：ArC TWO™算法的低级接口Rust库，用于存取和鉴权操作。
*   **autd3-firmware-emulator**：为AUTD3（声压传输设备）提供固件仿真的Rust库。
*   **mc-sgx-tservice**：针对英特尔SGX安全服务(enclave)的信任服务库(sgx\_tservice)的Rust封装。

## 嵌入式开发

*用于嵌入式设备或没有操作系统的设备。*

*   **portable-atomic**：在Rust中提供跨多种平台兼容的原子类型，并支持128位原子操作。
*   **postcard**：轻量级、zero-allocation序列化器，支持no\_std环境，与serde兼容。
*   **embedded-hal**：一套为嵌入式设备（如微控制器）定义的硬件抽象层接口标准，用于促进库和驱动程序的跨硬件可重用性。
*   **brotli-decompressor**：一个实现了Brotli解压缩算法的库，并特别注意避免使用标准库接口，以便在no\_std环境中使用。
*   **embedded-graphics**：针对具有有限资源的微控制器环境中小型硬件屏幕的显示库。
*   **fixed**：在Rust中提供定点数支持的库。
*   **critical-section**：为抽象系统关键区域（中断禁用代码块）的操作提供跨平台的支持。
*   **smoltcp**：为嵌入式系统设计的独立、可配置、易于使用的TCP/IP协议栈。
*   **uefi**：用于编写UEFI应用程序的库，专注于类型安全和易用性。
*   **tinyrlibc**：为no\_std和裸机目标提供的小型、不完整的C标准库替代品。
*   **sbat**：一个用于UEFI安全启动高级态（Secure Boot Advanced Targeting, SBAT）的no\_std Rust库。
*   **gd32e1**：为GD32E1系列微控制器提供的支持库，这是一系列ARM Cortex-M微控制器。
*   **stm32\_i2s\_v12x**：用于STM32微控制器，通过SPI外设实现I2S（Inter-IC Sound）通信的驱动程序。

## 内存管理

*分配、内存映射、垃圾回收、引用计数或接口到外部的内存管理器。*

*   **bumpalo**：一个快速的堆分配器（竞技场分配器），设计用于在单个内存块上快速分配和释放对象。
*   **slab**：预先分配存储空间并管理统一数据类型集合的内存分配器。
*   **arc-swap**：一个用于在Rust中原子性地交换Arc（原子引用计数类型）的库。
*   **jemallocator**：一个使用jemalloc内存分配器的Rust库，用于提供性能优化的内存分配。
*   **sharded-slab**：一个无锁的并发slab内存分配器，允许并发访问而无需互斥锁。
*   **tikv-jemallocator**：特别针对TiKV键值数据库定制的jemalloc分配器。
*   **arcstr**：提供零成本（无分配）的Arc（原子引用计数）字符串类型的库，优化了常见字符串操作的内存使用。
*   **heapless**：适用于嵌入式系统的无堆内存分配，其中不使用动态内存分配。
*   **recycle\_vec**：一个库，它提供Vec回收其后盾分配（内存块）的能力，可以提高内存重用效率。
*   **lazy-st**：一个为单线程环境设计的库，用于创建惰性计算值，避免重复计算。
*   **slabbin**：一个高效的板材分配器，提供对象的稳定地址，减少重分配次数。
*   **peakmem-alloc**：一个分配器包装器，用于测量内存使用的峰值，有助于识别内存高消耗点。
*   **vm-memory**：提供访问虚拟机物理内存的安全抽象，适合虚拟化环境中的内存操作。
*   **stak-primitive**：可能是一个用于执行栈分配原始操作的Rust库，但当前缺乏详细信息。

## 编程语言

*   **rustc-demangle**：用于解码和去除Rust编译器产生的符号名称的 “修饰” 或 “扭曲” 的库。
*   **ariadne**：为CLI（命令行界面）提供美观、丰富多彩的诊断和错误报告信息的库。
*   **tree-sitter**：提供对高性能Tree-sitter解析库的Rust绑定，用于构建语法和代码分析器。
*   **rustc-hash**：Rust编译器使用的快速非加密哈希算法的Rust实现。
*   **boa\_engine**：Boa是一个JavaScript引擎，实现了解析器和执行器，完全用Rust编写。
*   **apollo-parser**：一个遵循GraphQL规范的解析器，用于构建GraphQL查询和模式分析工具。
*   **llvm-sys**：Rust FFI绑定，用于访问LLVM编译器工具链的C API。
*   **ra\_ap\_syntax**：一个保留了注释和空白的Rust语言解析器，常用于代码分析和工具集成。
*   **annotate-snippets**：创建格式化的代码片段注释和错误显示的Rust库。
*   **mers**：一个拥有动态类型但支持类型检查的编程语言，但缺乏更多信息。
*   **cxxbridge-flags**：用于支持cxx包的编译器标志，通常是一个编译器配置（实现细节）库。
*   **adana-script**：用于配置命令行工具和基本脚本的命名空间别名的库。

## 数值格式化 (Value formatting)

*分类描述：为用户显示的数值进行格式化，可能需要适应不同的语言和地区。*

*   arrow：Apache Arrow项目
*   humansize：便于表示大小的可配置库
*   bytesize：人性化的字节表示库
*   prettyplease：一个最小化的syn语法树美化打印者
*   itoa：快速的整数基本类型转字符串转换
*   hex-literal：将十六进制字符串转换为数组的宏
*   faster-hex：快速的十六进制编码
*   strfmt：动态字符串格式化
*   num2words：将数字如42转换为文字如forty-two
*   ryu-js：快速的浮点数转字符串转换，符合ECMAScript标准
*   crud-pretty-struct：结构体的漂亮显示
*   a1\_notation：用于从A1电子表格记法转换和转入的包
*   crud-tidy-viewer：CLI生成器，API的数组美化打印者
*   lash：lambda表达式的交互式shell

## 模板引擎 (Template engine)

*结合模板和数据以产生文档，通常强调文本处理。*

*   handlebars：在Rust中实现的模板引擎
*   minijinja：具有最小依赖的用于Rust的强大模板引擎
*   tera：基于Jinja2/Django模板的模板引擎
*   askama：Rust中的类型安全的、编译时的类似Jinja的模板
*   liquid：Rust的模板语言
*   tinytemplate：轻量级模板引擎
*   tpnote：极简主义的笔记记录：保存和编辑你的…
*   hayagriva：处理参考资料：文献数据库管理…
*   mrml：MJML渲染器
*   acorns：从跟踪票据生成AsciiDoc发布说明文档
*   html\_compile：用于生成HTML字符串的模板引擎…
*   aiken-project：Aiken项目工具
*   onefetch-ascii：在终端显示彩色的ascii艺术
*   minijinja-embed：为MiniJinja提供的模板嵌入支持

## 科学 (Science)

*科学类别涉及到数学、物理以及其他科学领域中问题的解决方案。*

*   uom：单位测量库（Units of Measurement），用于Rust中的类型安全的单位转换和表达。
*   git-commitgraph：一个提供对Git的commit-graph文件的只读访问的库，commit-graph是一个优化Git性能的文件格式。
*   aelhometta：需要更多详细信息来提供准确描述。
*   splashsurf：一个用于从流体动力学（SPH）仿真的粒子数据进行表面重构的命令行工具。
*   rapier2d：一个用Rust编写的二维物理仿真引擎，适用于游戏和交互式应用。
*   feos：一个状态方程和经典等热力学函数框架，需要更多信息来提供详细描述。
*   picovoice：Rust SDK包装了Picovoice平台，支持端到端语音识别与语音激活。
*   average：一个为迭代计算提供便捷方法的统计库，能够处理基本统计量如均值、方差等。
*   dynast：一个工具，用于识别并处理量子场论中Feynman图的拓扑结构。
*   gosh-model：可能与化学模拟相关的库，但需要更多信息。
*   gosh-adaptor：为化学模型提供适配器，具体细节不明。
*   roqoqo\_for\_braket\_devices：为Amazon Web Services（AWS）的量子计算服务Braket提供roqoqo（一个设备无关的量子计算构建库）界面的库。
*   gmt\_dos-clients\_windloads：可能与GMT（Giant Magellan Telescope）的DOS（Data and Operations System）风载荷客户端有关的库，但需要更多信息来确认。

## 数学 (Math)

*数学类别适于解决数学和逻辑问题。*

*   rust\_decimal：为Rust提供十进制数的支持，以便精确的数值计算，避免浮点数的问题。
*   bigdecimal：支持任意精度计算的十进制库，非常适合要求高精度的金融应用。
*   nalgebra：一个广泛线性代数库，用于Rust编程，支持各种数学操作和转换。
*   euclid：一个几何图形和变换的库，提供了一组通用的几何类型。
*   num-rational：实现了有理数并在Rust中提供数值运算。
*   matrixmultiply：一个库，用于执行单精度（f32）和双精度（f64）矩阵的通用矩阵乘法。
*   ruint：用于Rust的自定义、宽位宽的无符号整型的类型。
*   statrs：为Rust编程语言提供统计函数、分布和其它实用的统计计算方法。
*   hexasphere：可用于在球面上生成和布局六边形瓦片（例如行星渲染）。
*   plotpy：允许使用Python的Matplotlib来自Rust代码绘制图形的库。
*   kalker：支持变量、用户自定义函数和单位的科学计算器。
*   temp-converter：一个用于在摄氏度、华氏度等不同温度单位之间转换的终端应用。
*   series：提供Laurent级数的单变量实现，是一种表示各种数学函数的工具。
*   fj-viewer：一个正在开发的b-rep（boundary representation）CAD内核的早期版本。
*   biconnected-components：一个用于识别图中的双连通分量（biconnected components）的算法实现库。

## 可视化

*分类描述：数据视图方式，例如绘图或图形化。*

*   tabled：一个允许Rust开发者轻松创建和打印格式化表格的库，支持多种风格和布局。
*   prodash：提供丰富的仪表板显示，用于跟踪和展示异步任务的进度。
*   plotly：基于JavaScript库Plotly.js，为Rust提供绘图功能。
*   tokei：一个统计代码行数（包括注释、空行等）的命令行工具，提供快速统计。
*   poloto：一个专注于2D绘图的库，输出SVG格式，并允许使用CSS进行样式定制。
*   plotters：一个数据可视化库，用于创建各种复杂的数据图表。
*   rerun：用于记录和可视化图像、点云等数据的工具库。
*   urdf-viz：一个可视化URDF（统一机器人描述格式）文件的工具，用于机器人模型。
*   gnuplot：为Gnuplot创建图表的Rust控制器，允许在Rust中生成和操控Gnuplot绘图。
*   forceatlas2：一个为n维数据提供快速力导向图形布局算法的库。
*   krates：一个用于生成货物元数据（cargo metadata）中crate关系图的库。
*   autd3-link-visualizer：为AUTD3（声压传输设备）提供的输出可视化工具。
*   star-history：用来展示GitHub用户或仓库星标历史变化的图表工具。
*   genominicus：一个用于创建基因树图的工具库，支持基因组间关系的可视化表示。
*   rust\_dot：一个为Graphviz DOT语言提供的轻量级Rust实现，用于生成和处理DOT文件。

## 机器学习 (Machine learning)

*   mosec：在云中有效地服务模型。
*   safetensors：旨在比普通数据格式更安全的函数读取和写入 safetensors。（需要进一步详细信息）
*   ort：ONNX Runtime 1.17 的安全 Rust 封装。
*   candle-core：极简主义的 ML 框架。
*   rust-bert：即用型的 NLP 管道和语言模型。
*   rstats：统计、信息度量、数据分析。
*   lance：一种列式数据格式，旨在比传统格式快 100 倍。（需要进一步详细信息）
*   torch-sys：为 PyTorch C++ api (libtorch) 提供低级 FFI 绑定。
*   langchain-rust：用 Rust 实现的 LangChain，有助于简化…编写。（需要进一步详细信息）
*   scandir：快速目录扫描器。
*   pllm：便携式 LLM（大规模语言模型）。
*   rgwml：在使用 Rust 进行 ML 时减少认知负荷。
*   llm-weaver：用任何 LLM 管理长对话。
*   oaapi：OpenAI API 的非官方 Rust 客户端。
*   hdbscan：纯 Rust 实现的聚类算法。
*   mlflow\_rs：与 MLflow 进行实验跟踪的客户端库。
*   web-rwkv：基于 WebGPU 的纯 RWKV 语言模型实现。

## 地理空间 (Geospatial)

*涉及GIS、地图以及地球上的相关内容。*

*   geos：GEOS C API的Rust绑定。
*   google\_maps：非官方Google Maps平台客户端库…
*   d3\_geo\_rs：D3/d3-geo的端口。
*   geodesy：进行大地测量转换和数据流实验的平台。
*   flatgeobuf：Rust的FlatGeobuf。
*   geozero：零拷贝读写WKT/WKB…中的地理空间数据。（需进一步详细信息）
*   kml：Rust的KML支持。
*   proj：PROJ最新稳定版本的高级Rust绑定。
*   geohash：Rust的Geohash实现。
*   versatiles：用于转换、检查和服务…的工具箱。（需进一步详细信息）
*   contour：计算等值环和等值多边形（使用…
*   tzf-rs：快速将经度、纬度转换为时区名称。
*   osm-io：读写OSM数据。
*   berlin-core：识别位置并用UN-LOCODE标记它们…
*   japanese-address-parser：解析日本地址。

## 命令行实用程序 (Command line utilities)

*运行于命令行的应用程序。*

*   bat：一个有翅膀的cat(1)克隆。
*   zoxide：你的终端中更智能的cd命令。
*   lsd：带有很多漂亮颜色和其他一些东西的ls命令。
*   fd-find：一个简单、快速且用户友好的find替代方案。
*   coreutils：\~ GNU coreutils（已更新）；实现为通用的（跨平台）…
*   names：拥有适合用于容器的名称的随机名称生成器。
*   emplace：命令行工具，用于在多台机器上镜像已安装的软件。
*   sarif-fmt：在终端中查看（漂亮打印）SARIF文件。
*   pacman-repo-builder：从收藏品…构建自定义的pacman仓库。（需进一步详细信息）
*   search-cli：Cli程序，在浏览器中搜索参数单词。
*   stu：使用ratatui在Rust中编写的AWS S3 TUI应用程序。
*   chwp：从命令行界面更改壁纸。
*   scafalra：scafalra(sca)是一个用于管理模板的命令行接口工具。
*   git-mob-tool：CLI应用程序，可以帮助用户自动添加共同作者…
*   nix-your-shell：一个nix和nix-shell包装器，适用于除了bash之外的壳。
*   jobcan-cli：操作Jobcan的命令行工具。

## 邮件

*发送、接收、格式化和解析邮件。*

*   lettre：电子邮件客户端
*   email\_address：提供一个符合RFC的EmailAddress新类型的实现
*   imap：Rust的IMAP客户端
*   mailchecker：跨语言的临时（一次性/丢弃）…
*   aws-sdk-ses：Amazon简单邮件服务的AWS SDK
*   vsmtp-mail-parser：下一代MTA。安全、更快、更环保
*   gix-mailmap：gitoxide项目用于解析mailmap文件
*   mail-builder：Rust的电子邮件构建库
*   spamassassin-milter：使用SpamAssassin进行垃圾邮件过滤的Milter
*   commit-email：提醒您使用正确的电子邮件地址提交
*   tempmail：简化临时电子邮件的管理和交云…
*   mailboxvalidator：使用MailboxValidator API的Rust电子邮件验证包

## No standard 无标准库

*不依赖Rust标准库的类库。*

heck ：大小写转换类库\
libm ：纯Rust实现的数学库\
target-lexicon ：用于编译器及相关工具的目标平台实用工具\
assert\_matches ：断言一个值匹配某个模式\
petname ：生成人类可读的随机名称，可用性…\
const\_panic ：支持格式化的const panic\
colorous ：从d3-scale-chromatic移植的专业色彩方案\
hash32 ：32位哈希算法\
mc-sgx-util ：被SGX类库共享使用的工具集\
constgebra ：常量线性代数\
rawbytes ：将任意大小的值视为&\[u8]来查看/访问\
riot-wrappers ：为RIOT操作系统提供的Rust API包装器\
cranelift-module ：支持使用Cranelift链接函数和数据\
cranelift-entity ：使用实体引用作为映射键的数据结构

## 认证

*帮助确认身份的过程。*

keyring ：跨平台的密码/凭证管理类库\
aws-config ：AWS SDK配置和凭证提供者实现\
argon2 ：Argon2密码哈希算法的纯Rust实现\
oauth2 ：一个可扩展的、强类型的OAuth2实现\
rpassword ：控制台应用程序中读取密码\
casbin ：支持ACL等访问控制模型的授权类库\
scrypt ：基于密码的密钥派生函数\
aws-sdk-sts ：用于AWS安全令牌服务的AWSSDK\
vaultrs ：Hashicorp Vault API的异步Rust客户端类库\
tame-oauth ：一个非常简单的oauth 2.0类库\
rs-firebase-admin-sdk ：Rust的Firebase Admin SDK\
winauth ：Rust中的Windows认证（NTLMv2）\
dco3 ：Rust中的DRACOON异步API包装器\
vaultier ：从Hashicorp Vault写入和读取秘密\
cargo-credential ：协助编写Cargo凭证辅助工具

## 配置管理

*应用程序的配置管理。*

config ：Rust应用程序的分层配置系统\
dotenvy ：dotenv类库的一个维护良好的分支\
figment ：如此无忧无虑的配置库，简直不真实\
envy ：将环境变量反序列化到类型安全的结构体\
rust-ini ：Rust中用于解析Ini配置文件的类库\
cedar-policy ：Cedar是一个用于定义权限策略的语言…\
cargo-config2 ：加载和解析Cargo配置\
etcetera ：不带偏见的获取配置的类库…\
nccl ：最小化配置文件格式和类库\
rmuxinator ：tmux项目配置实用程序\
gostd\_settings ：读写属性配置文件的工具。是一个用于读写属性配置…\
stak-configuration ：Stak Scheme配置\
aws-sdk-finspace ：AWS SDK，用于FinSpace用户环境管理服务

## 图形数据格式 (Gfx data formats)

*加载和解析用于2D/3D渲染的数据，如3D模型或动画。*

*   gltf：glTF 2.0模型加载器
*   fontdb：具有类似CSS查询能力的内存中字体数据库
*   kcl-lib：KittyCAD语言实现和工具
*   swash：字体内省分析、复杂文本构形和字符渲染
*   tween：用于游戏的补间动画库
*   ab\_glyph\_rasterizer：线条、二次及三次贝塞尔曲线的填充光栅化
*   obj-rs：Wavefront obj格式解析器，用于Rust编程语言
*   poppler-rs：poppler-glib的高层次（安全）绑定
*   nobject-rs：使用Nom编写的wavefront Obj/Mtl文件解析器
*   kittycad-modeling-cmds：KittyCAD建模API中的命令
*   notoize：提示你需要哪款Noto字体堆栈
*   image\_dds：将图像转换到压缩的DDS格式及其反向转换
*   bevy\_gaussian\_splatting：bevy高斯模糊渲染管线插件

## 渲染引擎 (Rendering engine)

*在屏幕上进行渲染的高层次解决方案。*

*   meshopt：网格优化器的Rust ffi绑定和符合惯用性的封装
*   vk-mem：AMD的ffi绑定和符合惯用性的封装
*   intel\_tex\_2：Intel ISPC纹理压缩的Rust绑定
*   screen-13：采用QBasic精神的Vulkan渲染引擎
*   rs\_pbrt：用Rust进行的基于物理的渲染(PBR)
*   all-is-cubes：递归体素游戏引擎，可用于体素光线追踪
*   crystal\_ball：用Rust编写的路径追踪库
*   sugarloaf：旨在多平台使用的Rio渲染引擎
*   galileo：跨平台通用地图渲染引擎
*   simple-pixels：创建窗口并在上面绘制像素
*   pax-core：Pax的核心共享运行时和渲染引擎
*   piet-cosmic-text：基于cosmic-text的piet文本布局引擎
*   all-is-cubes-gpu：为all-is-cubes库提供的可选GPU渲染实现

## 图形用户界面 (GUI)

*创建图形用户界面。*

*   winit：跨平台的窗口创建库
*   ratatui：关于制作终端用户界面的库
*   egui：可以在网页和原生应用上运行的即时模式GUI
*   taffy：灵活的UI布局库
*   notify-rust：显示桌面通知（支持linux, bsd, mac）
*   raw-window-handle：Rust窗口应用程序的互操作性库
*   softbuffer：跨平台的软件缓冲区
*   iced：受Elm启发的跨平台GUI库
*   fltkrs-richdisplay：基于fltk-rs的富文本组件，支持增强的样式组合，支持图文混排…
*   leftwm-layouts：用于基于列表的动态平铺窗口管理器的可自定义布局
*   wry：跨平台的WebView渲染库
*   applin：为Applin™服务器驱动的UI框架后端库
*   nwg\_ui：在native-windows-gui之上构建的GUI库
*   hyprland-per-window-layout：Hyprland Wayland合成器的每个窗口的键盘布局（语言）

## 游戏开发

*用于创建游戏的Crates。*

\
bevy：一个令人耳目一新的简单数据驱动的游戏引擎和应用程序框架\
glam：用于游戏和图形的快速3D数学库\
bevy\_egui：用于Bevy集成Egui的插件\
tobj：精神上类似于tinyobjloader的轻量级OBJ加载器\
bevy-inspector-egui：bevy游戏引擎的检视器插件\
leafwing-input-manager：Bevy游戏引擎的强大直接状态输入管理器\
ggez：用于制作2D游戏的轻量级游戏框架，摩擦最小……\
gilrs：Rust的游戏输入库\
virtual\_joystick：Bevy虚拟摇杆，适用于移动游戏\
cardpack：通用纸牌游戏牌组\
rollo：基于Rust的多人游戏框架\
gamie：经典小游戏的抽象层\
bevy\_health\_bar3d：以广告牌着色器实现的bevy血量条\
vpin：虚拟弹球生态系统

## Unix API

*分类描述: 绑定到特定 Unix API 的库。*

*   **rustix**：对 POSIX/Unix/Linux/Winsock 类似系统调用的安全 Rust 绑定。
*   **nix**：对 \*nix API 的 Rust 友好绑定。
*   **zbus**：用于 D-Bus 通信的 API。
*   **dbus**：绑定到 D-Bus，这是常见的总线系统。
*   **arboard**：处理操作系统剪贴板的图像和文本。
*   **procfs**：与 linux procfs 伪文件系统的接口。
*   **pango**：Pango 库的 Rust 绑定。
*   **shell-words**：根据 UNIX shell 的解析规则处理命令行。
*   **timerfd**：与 Linux 内核的 timerfd API 接口。
*   **waybar-module-pacman-updates**：用于 Arch 的 waybar 模块，显示系统可用更新。
*   **corrator**：验证在 docker 容器内部使用的应用程序版本。
*   **bpf-linker**：BPF 静态链接器。
*   **r2d2-alpm**：用于管理 ALPM 连接的 R2D2 资源池。
*   **clamav-client**：带有可选 Tokio 和 async-std 支持的 ClamAV 客户端库。
*   **ktls-recvmsg**：从 nix 库中提取出来的部分内容。

## Windows API

*绑定到特定 Windows API 的库。*

*   **windows**：Windows 的 Rust 实现。
*   **winreg**：对 MS Windows 注册表 API 的 Rust 绑定。
*   **clipboard-win**：与 Windows 剪贴板交互的方法。
*   **wild**：在 Windows 上扩展命令行参数的 Glob（通配符）。
*   **native-windows-gui**：用于 Microsoft Windows 桌面开发原生 GUI 应用的库。
*   **winapi**：Windows API 的所有原始 FFI 绑定。
*   **windows-sys**：Windows。
*   **wmi**：Rust 的 WMI 库。
*   **uiautomation**：Windows 的 UI 自动化框架。
*   **ioslice**：无需 std 的 I/O 分片，仍是可选的。
*   **windows-ext**：windows-rs 的扩展，提供更多功能。
*   **grob**：尤其适用于 Windows API 调用的可增长缓冲区。
*   **dotnetdll**：读写 .NET 元数据文件的框架。
*   **webview2-com**：WebView2 COM API 的 Rust 绑定。
*   **shawl**：为任意命令提供的 Windows 服务包装器。

## macOS 和 iOS API

*绑定到苹果特定 API 的库。*

*   **objc**：为 Rust 提供的 Objective-C 运行时绑定和封装。
*   **core-foundation**：macOS 的 Core Foundation 绑定。
*   **cocoa**：macOS 的 Cocoa 绑定。
*   **core-text**：Core Text 框架的绑定。
*   **swift-bridge**：生成用于 Rust 和 Swift 安全互操作的 FFI 绑定。
*   **block2**：苹果的 C 语言扩展块。
*   **kb-remap**：协助重新映射 macOS 键盘按键。
*   **objc2**：Objective-C 接口和运行时绑定。
*   **fse\_dump**：转储 mac 上的 fseventsd 条目。
*   **system-configuration**：macOS 的 SystemConfiguration 框架绑定。
*   **ceviche**：Rust 守护进程/服务包装器。
*   **ash-molten**：使用 Ash 在 Mac 上提供 Vulkan 的 MoltenVK 静态链接。
*   **check-macos-updates**：用于检查 macOS 是否具有 Nagios 兼容插件的更新。

## 多媒体

*用于音频、视频和图像处理或渲染引擎。*

\
exr ：无需不安全代码即可读写 OpenEXR 文件\
gstreamer-editing-services ：GStreamer 编辑服务的 Rust 绑定\
spectrum-analyzer ：易于使用且快速的 no\_std 库（支持 alloc）\
souvlaki ：跨平台的媒体按键和元数据处理库\
nokhwa ：简单易用的跨平台 Rust 网络摄像头捕获库\
smrec ：极简的多轨音频录音机\
deltae ：在 CIE Lab 色彩空间中计算两种颜色之间的 Delta E\
riff ：读写 RIFF 格式文件\
stream-download ：将流式内容下载到本地文件缓存\
four-cc ：提供便利表示的 Newtype 封装\
gstreamer-editing-services-sys ：libges-1.0 的 FFI 绑定\
glide ：基于 GStreamer 和 GTK 的跨平台媒体播放器

## 图像

*处理或制作图像。*\
\
palette ：以正确性为重点，转换和管理颜色\
fast\_image\_resize ：使用 SIMD 指令快速调整图像大小\
jpeg-decoder ：JPEG 解码器\
cairo-rs ：Cairo 库的 Rust 绑定\
png ：纯 Rust 中的 PNG 解码和编码库\
image ：图像处理库。提供基本的图像处理功能\
kamadak-exif ：纯 Rust 编写的 Exif 解析库\
lcms2 ：ICC 颜色配置文件处理。Little CMS 的 Rust 包装器\
imageproc ：图像处理操作\
opencv ：OpenCV 的 Rust 绑定\
image-compare ：基于 image crate 的图像比较库\
pixcil ：像素艺术编辑器\
typst-ts-core ：Typst.ts 的核心功能\
usvgr-text-layout ：SVG 文本布局实现

## 音频

*分类描述：录制、输出或处理音频。*

\
cpal ：纯 Rust 的低级跨平台音频 I/O 库\
rodio ：音频播放库\
hound ：wav 编码和解码库\
spotify\_player ：具有完整功能的终端 Spotify 播放器\
kira ：游戏用的富有表现力的音频库\
rubato ：面向音频数据的异步重采样库\
id3 ：读写 ID3 元数据\
libpulse-binding ：PulseAudio libpulse 库的语言绑定\
mpd-discord-rpc ：显示您当前播放的歌曲/专辑\
midi\_fundsp ：支持实时 MIDI 合成器软件的创建\
mixxc ：极简主义音量混合器\
megra\_rs ：使用马尔可夫链的实时编码语言\
mp3lame-encoder ：mp3lame 编码器的高级绑定\
xmrsplayer ：安全的声音追踪器音乐播放器\
libfmod ：用于 Rust 应用程序集成 FMOD 引擎的包装器

## 视频

*分类描述：录制、输出或处理视频。*\
\
rav1e ：最快且最安全的 AV1 编码器\
webrtc ：WebRTC API 的纯 Rust 实现\
openh264 ：OpenH264 的习惯性绑定\
ffmpeg-next ：安全的 FFmpeg 包装器（FFmpeg 4 兼容的 ffmpeg crate 分支）\
ab-av1 ：使用快速 VMAF 采样进行 AV1 编码\
dash-mpd ：解析、序列化、下载 MPD 清单\
gifski ：基于 pngquant 的 GIF 制作器，用于生成高质量动态 GIF\
m3u8-rs ：解析 m3u8 文件（Apple 的 HTTP 直播流（HLS）协议）\
rusty\_ytdl ：Youtube 视频搜索和下载器\
rfc6381-codec ：解析和生成 codec-string 值的解析器和生成器\
mp4ra-rust ：类型和相关常量表示 MP4 注册机构\
avirus ：用于目的如故障艺术等操作 AVI 文件\
video-rs ：基于 ffmpeg 的高级视频工具包\
gst-plugin-togglerecord ：GStreamer 切换录制插件

## 渲染

*实时或离线渲染 2D 或 3D 图形，通常在 GPU 上。*

\
tiny-skia ：Rust 移植的小型 Skia 子集\
encase ：数据布局到 GPU 缓冲区的机制\
inlyne ：引入 Inlyne，一个受 GPU 支持但无浏览器的…\
glyph\_brush ：使用 ab\_glyph 的快速缓存文字渲染库\
vello ：实验性的 GPU 计算中心 2D 渲染器\
three-d ：2D/3D 渲染器 - 简化绘制\
sdl2 ：Rust 的 SDL2 绑定\
flo\_curves ：操作贝塞尔曲线\
rustic-zen ：用于创造艺术性渲染的 Photon-Garden 光线追踪器\
rasterize ：小型 2D 渲染库\
bevy-single-variable-function-mesh ：2D 或 3D 网格（bevy::render::mesh::Mesh）…\
smaa ：使用 SMAA 的后处理抗锯齿\
pdf2pwg ：使用 pdfium 将 PDF 渲染成 A4 页面内容并转换为 PWG/URF\
dessin ：为 PDF、SVG 构建复杂绘图

## 图形 API

*直接访问硬件或操作系统的渲染能力。*\
\
wgpu ：WebGPU API 包装器\
ash ：Vulkan 的 Rust 绑定\
core-graphics ：macOS Core Graphics 的绑定\
naga\_oil ：使用 naga IR 组合和操作着色器\
x11rb ：X11 的 Rust 绑定\
alacritty ：快速的跨平台 OpenGL 终端仿真器\
vulkano ：Vulkan 图形 API 的安全包装器\
metal ：Metal 的 Rust 绑定\
font-kit ：跨平台字体加载库\
surf\_n\_term ：Posix 终端渲染库\
spirq ：图形的轻量级 SPIR-V 查询工具\
plotters-cairo ：Plotters Cairo 后端\
gtk4\_glium ：将 Gtk4 和 Glium 一起使用\
fidget ：用于复杂闭合式隐式表面的基础设施\
svgr ：SVG 渲染库\
blade-egui ：Blade 的 egui 集成\
surfman ：跨平台的 GPU 表面管理低级工具包

## 国际化（i18n）

*和本地化（l10n）。为各种语言和地区开发软件。*\
\
num-format：生成数字的字符串表示…\
language-tags：Rust中的语言标签\
rust-i18n：使用Rust代码生成加载YAML文件的I18n…\
whatlang：Rust的快速轻量级语言识别库\
icu\_collator：按照语言相关惯例比较字符串的API\
sys-locale：获取活动系统地域设置的小型轻量级库\
rust\_icu\_uenum：Unicode的ICU4C库的原生绑定\
icu：Unicode的国际组件\
icu\_locid：管理Unicode语言和地区标识符的API\
boa\_icu\_provider：Boa JavaScript引擎的ICU4X数据提供方\
rust\_iso3166：ISO 3166-1（表示国家的代码……\
i18n\_provider\_sqlite3-rizzen-yazston：Internationalisation项目的i18n\_provider\_sqlite3 crate

## 游戏

*娱乐和休闲。使用Rust实现的游戏和模组。*

\
oxyromon：ROM整理器\
ferium：用于管理Minecraft模组的快速CLI程序…\
steamlocate：定位Steam游戏安装目录（以及Steam本身！）\
shticker\_book\_unwritten：Toontown Rewritten MMORPG的最小CLI启动器\
cargo-screeps：用于将Rust WASM代码部署到Screeps游戏服务器的构建工具\
rosu-pp：所有模式的osu!难度和pp计算\
retro：游戏目录管理\
riven：Riot Games API库\
piston\_mix\_economy：在MMO世界中混合调整经济的研究项目\
tmaze：跨平台迷宫求解游戏，完全用Rust编写，适用于终端\
discord-rpc-helper：根据运行的Proton游戏自动设置Discord活动\
wooting-rgb：Wooting RGB SDK Rust库

## 仿真器

*运行在宿主计算机上原生不可用的软件或游戏。*

kvm-ioctls：对KVM ioctls的安全封装\
qemu：QEMU二进制安装器\
jailer：在生产中启动Firecracker的进程…\
mizu：精确的gameboy(DMG)和gameboy color仿真器…\
polkavm：基于RISC-V的快速安全虚拟机\
agb：Game Boy Advance开发\
tetanes：Rust编写且支持SDL2和WebAssembly的NES仿真器\
miden-vm：Miden虚拟机\
peppi：Slippi重放文件的解析器\
ncvm：脚本虚拟机。开发中！！！\
netsblox-vm：运行NetsBlox代码，带有可选的原生扩展\
femtos：基于飞秒的时间表示…\
qemu-plugin：QEMU插件API的高级绑定\
risc0-tools：RISC Zero开发工具\
librashader-presets：各种情况的RetroArch着色器\
risc0-binfmt：RISC Zero二进制格式crate

## 仿真

*为某些活动建模或构建模型，例如模拟网络协议。*

bender：硬件项目的依赖管理工具\
asynchronix：用于系统仿真的高性能异步计算框架\
particular：用Rust编写的N-body仿真库……\
physx：Nvidia PhysX的高级Rust接口\
qoqo-qryd：qoqo量子计算工具包的QRyd后端\
gmt\_dos-actors：Giant Magellan Telescope动态光学仿真Actor Model\
rems：时域有限差分（FDTD）电磁仿真器\
quantr：轻松创建、模拟和打印量子电路\
dubins\_paths：计算Dubin’s路径的Rust代码\
rs-event-emitter：为rust模拟promise实现\
spacerocks：太阳系计算软件\
carla：Carla仿真器的Rust客户端库\
madsim-rdkafka：madsim上的rdkafka仿真器\
autd3-link-simulator：autd-simulator的链接

## 文本编辑器

*文本编辑应用程序。*

lsp-types：与语言服务器互动的类型…\
lsp-server：通用LSP服务器脚手架\
tui-textarea：为ratatui和tui-rs设计的强大文本编辑器小部件。多行。\
tower-lsp：基于Tower的语言服务器协议实现\
tree-sitter-rust：tree-sitter的Rust语法\
neocmakelsp：cmake的Lsp\
tree-sitter-swift：tree-sitter解析库的swift语法\
git-interactive-rebase-tool：用于git交互式变基的全功能终端序列编辑器\
neophyte：WebGPU渲染的Neovim GUI\
tree-sitter-md：tree-sitter的Markdown语法

## 辅助技术

*辅助技术*

atk：ATK库的Rust绑定\
kayle\_cli：用于网页辅助功能审核的kayle CLI\
atspi：基于zbus的纯粹的Rust，AT-SPI2协议实现\
a11ywatch\_cli：A11yWatch网页辅助功能CLI\
mathcat：数学能力辅助技术（‘从MathML到语音和盲文’）\
bevy\_a11y：Bevy引擎的辅助功能支持\
serialize\_with\_bson：使用bson DateTime序列化\
msedge-tts：MSEdge阅读功能API的包装…\
afrim：afrim输入法核心库\
accesskit\_macos：AccessKit UI辅助功能基础设施：macOS适配器\
accessibility-rs：Rust的网页辅助功能引擎\
sem-reg：语义处理某些Windows注册表二进制值…\
accesskit\_consumer：AccessKit消费者库（内部）

## 金融

*使用实际货币的支付、会计、交易*

RustQuant：量化金融\
investments：管理您的投资\
iso\_currency：ISO 4217货币代码\
mpesa：Rust的M-PESA API包装\
lfest：为……的杠杆化永续期货交易所\
databento：官方Databento客户端库\
trade\_aggregation：将交易聚合到用户定义的蜡烛…\
abacus-rs：用于简化的纯文本cli会计工具\
twelvedata：Twelve Data API客户端\
tindi：股市技术图表指标\
trading212：与Trading212 API互动\
quickfix：快速修复C++库的高级绑定\
debot-position-manager：管理交易位置的函数

## 生物学

*生物信息学*

needletail：FASTX解析和k-mer方法\
simpleaf：使使用alevin-fry更加简单的框架\
rasusa：随机进行读取降低到指定覆盖度\
finch：min-wise独立排列局部…\
sgcount：快速灵活的sgRNA计数器\
noodles：生物信息学I/O库\
rust-htslib：HTSlib绑定和高级Rust API…\
light\_phylogeny：系统发育的方法和功能\
minimap2：libminimap2的绑定\
fakit：fasta文件操作程序\
sprocket：Workflow Description Language文件的包管理器

## 机器人学

*机器人学与车辆工程*

*   optimization\_engine：纯Rust框架，用于嵌入式非凸优化问题。该框架特别适用于低功耗设备和嵌入式系统，允许开发者执行高效的数值优化。
*   zenoh-plugin-dds：Zenoh插件，用于ROS2和通用的DDS（数据分布服务）。此插件能够将Zenoh系统与DDS生态系统集成，让开发者能在ROS2环境中使用Zenoh的高性能网络通信。
*   rsruckig：Ruckig运动规划库的Rust实现。该库提供实时时间最优轨迹规划功能，适用于工业机器人和自动化系统。
*   opencv-ros-camera：用于摄影测量的OpenCV/ROS相机的几何模型。通过这个库，开发者可以方便地在OpenCV和ROS中处理相机模型，以进行图像处理和分析。
*   dimas：用于分布式多智能体系统的框架。DIMAS旨在提供一个简单的接口，用于构建和模拟分布式算法，适用于多个领域，包括机器人协调和智能交通系统。
*   zenoh-plugin-ros2dds：Zenoh插件，用于ROS 2和通用的DDS。类似于zenoh-plugin-dds，这个插件也是为在ROS2和DDS中使用Zenoh提供支持的工具。
*   roslibrust：用于与ROS的rosbridge\_server进行通信的接口。这个库使得Rust程序可以轻松接入ROS生态系统，实现ROS之间的信息交换和通信。
*   rosrust：ROS客户端库的纯Rust实现。rosrust旨在为Rust开发者提供与ROS系统交互的高效、类型安全的方法，无需依赖原生ROS库。

