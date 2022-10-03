import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@contextmenu',
  description: 'Customize your contextmenu the simplest way',
  markdown: {
    theme: 'github-dark',
  },
  themeConfig: {
    siteTitle: '@contextmenu',
    algolia: {
      appId: '',
      apiKey: '',
      indexName: 'contextmenu',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vaakian/contextmenu' },
    ],
    localeLinks: {
      text: 'English',
      items: [
        { text: '简体中文', link: '#' },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT vaakian',
    },
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get started', link: '/guide/' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'API', link: '/guide/API' },
        ],
      },
      {
        text: 'Vue',
        items: [
          { text: 'Install', link: '/vue/#installation' },
          { text: 'Component', link: '/vue/#component-usage' },
          { text: 'Hook', link: '/vue/#hook-usage' },
        ],
      },
      {
        text: 'React',
        items: [
          { text: 'Install', link: '/react/#installation' },
          { text: 'Component', link: '/react/#component-usage' },
          { text: 'Hook', link: '/react/#hook-usage' },
        ],
      },
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
  },
})
