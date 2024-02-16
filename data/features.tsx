import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import Translate, { translate } from '@docusaurus/Translate'

export type FeatureItem = {
  title: string
  text: JSX.Element
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: 'Java开发工程师',
    }),
    text: (
      <Translate>
        目前工作中用到的主要技术栈。没有看不懂的代码，只有不想看的代码。
      </Translate>
    ),
    Svg: WebDeveloperSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: 'TypeScript 全栈工程师',
    }),
    text: (
      <Translate>
        作为一名 TypeScript 全栈工程师，秉着能用 TS 绝不用 JS
        的原则，为项目提供类型安全的保障，提高代码质量和开发效率。
      </Translate>
    ),
    Svg: SpiderSvg,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '技术爱好者',
    }),
    text: (
      <Translate>
        正在努力学习新的技术，新的框架，积极参与开源社区。
      </Translate>
    ),
    Svg: OpenSourceSvg,
  },
]

export default FEATURES
