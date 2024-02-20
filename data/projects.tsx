export const projects: Project[] = [
  // personal
  {
    title: 'carlos的个人网站',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://project.carloslee.work',
    source: 'https://github.com/carlos-s-blog/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'personal',
  },
  {
    title: 'Ts全栈开发脚手架',
    description: '基于Nestjs后端、React18中后台、Nextjs SSR创建的开发脚手架',
    preview: '/img/project/monoapp.png',
    website: 'https://github.com/CarlosLees/monoapp',
    source: 'https://github.com/CarlosLees/monoapp',
    tags: ['opensource', 'design', 'large'],
    type: 'personal',
  },
  {
    title: '阿里云oss快速上传',
    description: '基于Tauri快速实现的上传工具，方便在书写Markdown时快速插入图片',
    preview: '/img/project/download.webp',
    website: 'https://github.com/CarlosLees/oss-client.git',
    source: 'https://github.com/CarlosLees/oss-client.git',
    tags: ['opensource', 'favorite', 'personal'],
    type: 'personal',
  },
  {
    title: '前端示例代码库',
    description: '📦 整理前端样式和功能的实现代码，可以用来寻找灵感或直接使用示例中的代码',
    preview: '/img/project/example-website.png',
    website: 'https://example.kuizuo.cn',
    source: 'https://github.com/kuizuo/example',
    tags: ['opensource', 'design'],
    type: 'personal',
  },
  // commerce
  {
    title: '某侦探解密app',
    description: '基于SpringCloud,Mysql,K8s开发的大型游戏,社交app',
    preview: '/img/project/master.jpg',
    tags: ['design', 'large', 'product'],
    website: '',
    type: 'commerce',
  },
  {
    title: '某养老项目',
    description: '基于Nestjs,Mysql,SqlServer等开发的养老项目',
    preview: '/img/project/elderly.jpg',
    website: '',
    tags: ['design', 'large', 'product'],
    type: 'commerce',
  },
  {
    title: '某地铁项目管理系统',
    description: '基于SpringCloud,Mysql,Redis等开发的地铁管理项目',
    preview: '/img/project/metro.jpg',
    website: '',
    tags: ['design', 'large', 'product'],
    type: 'commerce',
  },
  // other https://www.v2ex.com/?r=a1013711853
  {
    title: 'rust-wasm-md5',
    description: '🦀 Rust + WebAssembly 实现的 MD5 加密',
    website: 'https://github.com/CarlosLees/rust-wasm-md5',
    tags: ['opensource'],
    type: 'other',
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

export const projectTypeMap = {
  web: '网站',
  app: '应用',
  commerce: '商业项目',
  personal: '个人',
  toy: '玩具',
  other: '其他',
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
