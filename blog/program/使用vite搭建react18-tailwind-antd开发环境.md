---
title: 使用vite搭建react18+tailwind+antd开发环境
date: 2023-04-06
tags: [React,Vite,Tailwind,Antd]
authors: carlos
keywords: [React,Vite,Tailwind,Antd]
description: 使用vite搭建react18+tailwind+antd开发环境
---

<!-- truncate -->
## 创建应用

```javascript
pnpm create vite
reactplus # 这里随便取一个应用名称，另外可能出现卡主的现象，但是你按下键盘上任意一个字符就会出现"Project name"，输入你要创建的项目文件夹名称即可，然后按下回车键
# 这一步选择React，按下回车键
# 这一步选择Typescript, 注意不要选择"Typescript-swc"，实测使用swc，后面会有问题，按下回车键
cd reactplus #进入应用目录
pnpm i # 安装依赖
pnpm dev # 启动应用，启动后会提示访问地址，点击打开地址链接
```

## 环境配置

### 使用CommonJs
默认vite使用了ESM模块，为了支持我们的eslint,stylint等配置文件，我们需要把它改成Commonjs模块
或者可以把`eslintrc.js`等文件改成.cjs后缀
只要把`package.json`中的`"type": "module"`,删除即可

### TypeScript
```javascript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "declaration": true,
    "removeComments": true,
    "experimentalDecorators": true,
    "alwaysStrict": true,
    "sourceMap": true,
    "incremental": true,
    "noUnusedLocals": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "pretty": true,
    "noImplicitAny": true,
    "importsNotUsedAsValues": "remove"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Prettier

```javascript
pnpm add prettier -D
```

新增`.pretterrc.cjs`以添加prettier配置
```javascript
// .prettierrc.js
/** @format */
module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    proseWrap: 'never',
    endOfLine: 'auto',
    semi: true,
    tabWidth: 4,
    vueIndentScriptAndStyle: true,
    htmlWhitespaceSensitivity: 'strict',
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
        {
            files: 'document.ejs',
            options: {
                parser: 'html',
            },
        },
    ],
};
```

新增`.prettierignore`到根目录来配置需要让prettier忽略的文件

```javascript
/dist
/node_modules
**/*.svg
**/*.md
**/*.svg
**/*.ejs
**/*.html
**/*.png
**/*.toml
.dockerignore
.DS_Store
.eslintignore
docker
.editorconfig
Dockerfile*
.gitignore
.prettierignore
LICENSE
.eslintcache
*.lock
yarn-error.log
.umi
.umi-production
.umi-test
```

### Eslint

使用`airbnb`的编码风格来编写代码，为了支持`eslint+prettier`来统一代码风格，需要安装以下依赖
其中`eslint-plugin-prettier`与`eslint-config-prettier`用于整合prettier，以防止规则冲突.

```javascript
pnpm add jest \
      eslint \
      eslint-config-airbnb \
      eslint-config-airbnb-typescript \
      eslint-config-prettier \
      eslint-plugin-import \
      eslint-plugin-jest \
      eslint-plugin-jsx-a11y \
      eslint-plugin-prettier \
      eslint-plugin-react \
      eslint-plugin-react-hooks \
      eslint-plugin-unused-imports \
      @typescript-eslint/eslint-plugin \
      @typescript-eslint/parser -D
```
新增`tsconfig.eslint.json`文件用于设置在eslint在格式化代码时需要额外包含的文件.

```javascript
{
  "extends": "./tsconfig.json",
  "include": [
    "./src",
    "./test",
    "./typings",
    "./build",
    "./mock",
    "**.js",
    "**.ts"
  ],
  "exclude": ["node_modules"]
}
```
新增`.eslintrc.js`用于设置eslint的配置。
● 在parserOptions中启用了jsx
● 在env中增加了es6和browser
● extends中把airbnb的airbnb-base和airbnb-typescript/base的base给去掉了，因为base是不支持react的不完整版
● 增加了airbnb/hooks，以支持react
● 同时在ruls中添加了一些常用的react与jsx-a11y的规则配置
```javascript
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // 指定ESLint可以解析JSX语法
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
        // React启用jsx
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        es6: true,
        browser: true,
        jest: true,
        node: true,
    },
    plugins: ['@typescript-eslint', 'jest', 'prettier', 'import', 'unused-imports'],
    extends: [
        // airbnb规范
        // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
        'airbnb',
        // 兼容typescript的airbnb规范
        // https://github.com/iamturns/eslint-config-airbnb-typescript
        'airbnb-typescript',
        // react hooks的airbnb规范
        'airbnb/hooks',

        // typescript的eslint插件
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        // jest测试插件
        // https://github.com/jest-community/eslint-plugin-jest
        'plugin:jest/recommended',

        // 使用prettier格式化代码
        // https://github.com/prettier/eslint-config-prettier#readme
        'prettier',
        // 整合typescript-eslint与prettier
        // https://github.com/prettier/eslint-plugin-prettier
        'plugin:prettier/recommended',
    ],
    rules: {
        /* ********************************** ES6+ ********************************** */
        'no-console': 0,
        'no-var-requires': 0,
        'no-restricted-syntax': 0,
        'no-continue': 0,
        'no-await-in-loop': 0,
        'no-return-await': 0,
        'no-multi-assign': 0,
        'no-param-reassign': [2, { props: false }],
        'max-classes-per-file': 0,
        'class-methods-use-this': 0,
        'guard-for-in': 0,
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'no-lonely-if': 0,
        'no-bitwise': ['error', { allow: ['~'] }],

        /* ********************************** Module Import ********************************** */

        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'import/no-dynamic-require': 0,
        'import/no-absolute-path': 0,
        'import/extensions': 0,

        // 一部分文件在导入devDependencies的依赖时不报错
        'import/no-extraneous-dependencies': [
            1,
            {
                devDependencies: [
                    '**/*.test.{ts,js}',
                    '**/*.spec.{ts,js}',
                    'build/**/*.{ts,js}',
                    'mock/**/*.{ts,js}',
                    '**.{ts,js}',
                ],
            },
        ],
        // 模块导入顺序规则
        'import/order': [
            1,
            {
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                'newlines-between': 'always-and-inside-groups',
                warnOnUnassignedImports: true,
            },
        ],
        // 自动删除未使用的导入
        // https://github.com/sweepline/eslint-plugin-unused-imports
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 0,
        'unused-imports/no-unused-imports': 1,
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],

        /* ********************************** Typescript ********************************** */
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-unnecessary-type-assertion': 0,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/no-for-in-array': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-argument': 0,

        /* ********************************** React and Hooks ********************************** */
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
        'react/jsx-no-useless-fragment': 0,
        'react/display-name': 0,
        'react/button-has-type': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'react/destructuring-assignment': 0,
        'react/static-property-placement': 0,
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
        ],
        'react-hooks/exhaustive-deps': 0,

        /* ********************************** jax-a11y ********************************** */
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
    },

    settings: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json'],
    },
};
```
新增`.eslintignore`到根目录来配置需要让eslint忽略的文件
```javascript
dist
node_modules
pnpm-lock.yaml
docker
Dockerfile*
LICENSE
yarn-error.log
.history
.vscode
.docusaurus
.dockerignore
.DS_Store
.eslintignore
.editorconfig
.gitignore
.prettierignore
.eslintcache
*.lock
**/*.svg
**/*.md
**/*.svg
**/*.ejs
**/*.html
**/*.png
**/*.toml
```

### Stylelint

sylelint用于定制和统一css代码的风格,安装以下依赖.

```javascript
pnpm add stylelint \
      stylelint-config-css-modules \
      stylelint-config-recess-order \
      stylelint-config-standard \
      stylelint-prettier -D
```

新增stylint.config.js以配置stylelint
```javascript
module.exports = {
    // customSyntax: 'postcss-less',
    extends: [
        // 'stylelint-config-recommended-scss',
        'stylelint-config-standard',
        'stylelint-config-css-modules',
        'stylelint-config-recess-order',
        'stylelint-prettier/recommended',
    ],
    rules: {
        'selector-type-no-unknown': null,
        'selector-class-pattern': null,
        'custom-property-pattern': null,
        'no-duplicate-selectors': null, // 取消禁止重复定义,这样可以在css module中单独定义变量
        'block-no-empty': null, // 禁止出现空块
        'declaration-empty-line-before': 'never',
        'declaration-block-no-duplicate-properties': true, // 在声明的块中中禁止出现重复的属性
        'declaration-block-no-redundant-longhand-properties': true, // 禁止使用可以缩写却不缩写的属性
        'shorthand-property-no-redundant-values': true, // 禁止在简写属性中使用冗余值
        'color-hex-length': 'short', // 指定十六进制颜色是否使用缩写
        'comment-no-empty': true, // 禁止空注释
        'font-family-name-quotes': 'always-unless-keyword', // 指定字体名称是否需要使用引号引起来 | 期待每一个不是关键字的字体名都使用引号引起来
        // 'font-weight-notation': 'numeric', // 要求使用数字或命名的 (可能的情况下) font-weight 值
        'function-url-quotes': 'always', // 要求或禁止 url 使用引号
        'property-no-vendor-prefix': true, // 禁止属性使用浏览器引擎前缀
        'value-no-vendor-prefix': true, // 禁止给值添加浏览器引擎前缀
        'selector-no-vendor-prefix': true, // 禁止使用浏览器引擎前缀
        'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['layer', 'apply', 'screen', 'define-mixin', 'mixin'],
            },
        ],

        'property-no-unknown': [
            true,
            {
                ignoreProperties: [
                    // CSS Modules composition
                    // https://github.com/css-modules/css-modules#composition
                    'composes',
                ],
            },
        ],

        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: [
                    // CSS Modules :global scope
                    // https://github.com/css-modules/css-modules#exceptions
                    'global',
                    'local',
                ],
            },
        ],
        'rule-empty-line-before': [
            // 要求或禁止在规则声明之前有空行
            'always-multi-line',
            {
                except: ['first-nested'],
                ignore: ['after-comment'],
            },
        ],
        'at-rule-empty-line-before': [
            // 要求或禁止在 at 规则之前有空行
            'always',
            {
                except: ['blockless-after-same-name-blockless', 'first-nested'],
                ignore: ['after-comment'],
            },
        ],
        'comment-empty-line-before': [
            // 要求或禁止在注释之前有空行
            'always',
            {
                except: ['first-nested'],
                ignore: ['stylelint-commands'],
            },
        ],
    },
};
```
新增`.stylelintignore`到根目录来配置需要让stylint忽略的文件

### Vite
为了后续方便地编写其它vite配置，我们先建立一个专门用于vite构建配置的目录:`build`，然后在里面写vite配置.配置一下`tsconfig.node.json`，在`include`中添加`build`，以便ts能解析到build目录中的文件.

```javascript
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts","./build"]
}
```
添加一下`deepmerge`这个库用于深度合并对象

```javascript
pnpm add deepmerge
```
编写一个用于获取某个目录的绝对路径的函数
```javascript
// build/utils.ts
export const pathResolve = (dir: string) => resolve(__dirname, '../', dir);
```
编写一个vite自定义配置生成函数的类型，isBuild为是否处于构建环境中（即生产环境）
```javascript
// build/types.ts
export type Configure = (params: ConfigEnv, isBuild: boolean) => UserConfig;
```

**编写配置构建函数**
● 该函数接收两个参数，params参数用于接收vite默认的环境参数
● configure参数用于接收一个自定义的配置生成函数，是可选的
其逻辑为先设置定一些预定义的配置，比如路径别名，然后如果有自定义的配置生成函数传入，则生成自定义的配置，然后没有，把自定义配置设置成控对象，最后合并并覆盖预定义配置，然后返回最终的配置
在此处我们添加了以下配置
● 路径别名，作用是可以使用@/为前缀来便捷的导入模块，所以需要分别配置vite和typescript
● 使用camelCaseOnly(即驼峰命名法：如containerMain)来定义CSS MODULES的类名
● 加载默认的react插件

```javascript
// build/index.ts
export const createConfig = (params: ConfigEnv, configure?: Configure): UserConfig => {
    const isBuild = params.command === 'build';
    return merge<UserConfig>(
        {
            resolve: {
                alias: {
                    '@': pathResolve('src'),
                },
            },
            css: {
                modules: {
                    localsConvention: 'camelCaseOnly',
                },
            },
            plugins: createPlugins(isBuild),
        },
        typeof configure === 'function' ? configure(params, isBuild) : {},
        {
            arrayMerge: (_d, s, _o) => Array.from(new Set([..._d, ...s])),
        },
    );
};
```

编写一个插件创建函数，用于放置所有的vite插件
```javascript
// build/plugins.ts
export function createPlugins(isBuild: boolean) {
    const vitePlugins: (PluginOption | PluginOption[])[] = [react()];
    return vitePlugins;
}
```

最后在`vite.config.ts`中构建配置
```javascript
// vite.config.ts
import { createConfig } from './build';

export default defineConfig((params: ConfigEnv): UserConfig => {
    const config = createConfig(params);
    return config;
});
```

最后在`tsconfig.json`添加上别名，根路径以及编译路径
的配置

```javascript
// tsconfig.json
{
    "compilerOptions": {
        ...
        "outDir": "./dist",
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 样式与组件库

#### 支持Tailwind

安装依赖

```javascript
pnpm add tailwindcss postcss autoprefixer postcss-import postcss-mixins postcss-nested postcss-nesting -D
```

生成配置
```javascript
pnpx tailwindcss init -p
```
可以看到生成了两个配置文件，分别为`postcss.config.js`与`tailwind.config.js`
首先修改一下`postcss.config.js`，增加一些插件，它们的作用如下
● postcss-import: 可以让一个css文件导入其它css文件
● postcss-nesting: 可以编写postcss-nesting规范的嵌套css
● tailwindcss/nesting: 可以编写scss规范的嵌套css
● autoprefixer: 自动为css样式添加浏览器适配前缀
● postcss-mixins: 编写css样板代码，使一段css代码供多个地方使用.
```javascript
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        'postcss-mixins': {},
    },
};
```

接下来修改一下`tailwind.config.js`

1.为所有`tailwind`的类添加tw-标识

2.手动切换暗黑模式

3.在`index.html`以及通过`glob`匹配的`./src/**/*.{js,ts,jsx,tsx}`这些文件中,`tailwind`才会生效

4.并通过theme.screens自定义一下响应式屏幕界点(为了通用性，我们与bootstrap一致)


```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'tw-',
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1400px',
        },
        extend: {},
    },
    plugins: [],
};
```

创建一个`styles/tailwind`目录，用于放置tailwind的自定义扩展样式
三个文件`base.css`,`components.css`,`utilities.css`分别用于
● 添加自定义tailwind基础层样式,一般用于覆盖一些tailwind中默认的基础样式
● 添加自定义tailwind组件层样式,一般无特殊需求可以用react组件抽象而不是在这里定义css类
● 添加自定义tailwindg工具层样式,可以在这里添加一些tailwind中不存在的一些样式类
需要注意的是这些文件中
● 如果要引用tailwind自带的值或tailwind.config.js的theme中配置的值,可以通过 @apply指令或theme函数获取
● 在@layer中添加的样式如果在程序中没有用到会在编译后被清除,如果需要强制存在于编译后的样式表,请在@layer外定义
它们的内容如下
```javascript
/* src/styles/tailwind/base.css */
@layer base {
}
/* src/styles/tailwind/components.css */
@layer components {
}
/* src/styles/tailwind/utilities.css */
@layer utilities {
}
```

新建一个`app.css`文件用于放置全局样式，并在这个文件里测试一下tailwind的引用.
```javascript
/* src/styles/app.css */
html,
body,
#root {
    @apply tw-bg-white tw-h-[100vh] tw-w-full tw-flex;
}
```

然后创建一个入口样式文件index.css来引用这些样式文件
**注意引用顺序**

```javascript
@import url('tailwindcss/base.css');
@import url('./tailwind/base.css');
@import url('tailwindcss/components.css');
@import url('./tailwind/components.css');
@import url('tailwindcss/utilities.css');
@import url('./tailwind/utilities.css');
@import url('./app.css');
```
直接删除掉src目录下的`index.css`以及`App.css`，然后在`main.tsx`中导入`@/styles/index.css`
```javascript
// src/main.tsx
import '@/styles/index.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
```

然后更改一下App.tsx的代码
```javascript
// src/App.tsx
const App = () => {
    return (
        <div className="tw-w-full tw-bg-yellow-300 tw-flex tw-items-center tw-justify-center">
            <div className="tw-shadow-md tw-p-5 tw-bg-black tw-text-center tw-text-white tw-text-lg">
                按钮</span>
            </div>
        </div>
    );
};
export default App;
```

#### Antd
安装依赖
因为antd的时间组件依赖于dayjs，所以需要安装dayjs

```javascript
pnpm add antd @ant-design/cssinjs dayjs
```

引入Antd的样式
```javascript
// src/main.tsx
import 'antd/dist/reset.css';
...
```
为了防止tailwind与antd产生样式冲突，需要修改一下tailwind的配置
```javascript
// tailwind.config.js
...
    corePlugins: {
        preflight: false,
    },
    plugins: [],
};
```
包装应用的时候需要使用`StyleProvider`取消Antd的降权（同样是为了防止tailwind与antd产生样式冲突），并且在`ConfigProvider`中把背景取消，然后换个紧凑皮肤`theme.defaultAlgorithm`，代码变成这样
```javascript
// src/App.tsx
import { Button, ConfigProvider, theme } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';


const App = () => {
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#00B96B',
                },
                components: {
                    Layout: {
                        colorBgBody: '',
                    },
                },
            }}
        >
            <StyleProvider hashPriority="high">
                <div>
                    <div>
                       
                        <Button
                            type="primary"
                     className="!tw-bg-lime-400 !tw-text-emerald-900"
                        >
                            点此打开
                        </Button>
                    </div>
                </div>
            </StyleProvider>
        </ConfigProvider>
    );
};
```