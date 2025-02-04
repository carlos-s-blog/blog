export type Social = {
  github?: string
  // twitter?: string
  // juejin?: string
  qq?: string
  wx?: string
  // cloudmusic?: string
  // zhihu?: string
  email?: string
  // discord?: string
}

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
}

const social: Social = {
  github: 'https://github.com/Clamber-L',
  // twitter: 'https://twitter.com/kuizuo',
  // juejin: 'https://juejin.cn/user/1565318510545901',
  qq: 'https://println-g1-carlos.oss-cn-qingdao.aliyuncs.com/upload/IMG_3677.JPG',
  wx: 'https://println-g1-carlos.oss-cn-qingdao.aliyuncs.com/upload/IMG_3678.JPG',
  // zhihu: 'https://www.zhihu.com/people/kuizuo',
  // cloudmusic: 'https://music.163.com/#/user/home?id=1333010742',
  email: 'mailto:println_g1@163.com',
  // discord: 'https://discord.gg/M8cVcjDxkz',
}

const socialSet: Record<keyof Social, SocialValue> = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  // juejin: {
  //   href: social.juejin,
  //   title: '掘金',
  //   icon: 'simple-icons:juejin',
  //   color: '#1E81FF',
  // },
  // twitter: {
  //   href: social.twitter,
  //   title: 'Twitter',
  //   icon: 'ri:twitter-line',
  //   color: '#1da1f2',
  // },
  // discord: {
  //   href: social.discord,
  //   title: 'Discord',
  //   icon: 'ri:discord-line',
  //   color: '#5A65F6',
  // },
  qq: {
    href: social.qq,
    title: 'QQ',
    icon: 'ri:qq-line',
    color: '#1296db',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  // zhihu: {
  //   href: social.zhihu,
  //   title: '知乎',
  //   icon: 'ri:zhihu-line',
  //   color: '#1772F6',
  // },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  },
  // cloudmusic: {
  //   href: social.cloudmusic,
  //   title: '网易云',
  //   icon: 'ri:netease-cloud-music-line',
  //   color: '#C20C0C',
  // },
}

export default socialSet
