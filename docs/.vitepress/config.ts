import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@contextmenu',
  description: 'Customize your contextmenu the simplest way',
  markdown: {
    theme: 'github-dark',
  },
  cleanUrls: 'without-subfolders',
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
          { text: 'API', link: '/guide/api' },
          { text: 'Theme', link: '/guide/theme' },
        ],
      },
      {
        text: 'Vue',
        items: [
          { text: 'Installation', link: '/vue/' },
          { text: 'Component', link: '/vue/component' },
          { text: 'Hook', link: '/vue/hook' },
          { text: 'Directive', link: '/vue/directive' },
          { text: 'Advanced', link: '/vue/advanced' },
        ],
      },
      {
        text: 'React',
        items: [
          { text: 'Installation', link: '/react/#installation' },
          { text: 'Component', link: '/react/#component-usage' },
          { text: 'Hook', link: '/react/#hook-usage' },
          { text: 'Advanced', link: '/react/advanced' },
        ],
      },
    ],
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          { text: 'core', link: '/guide/' },
          { text: 'Vue', link: '/vue/' },
          { text: 'React', link: '/react/' },
        ],
      },
    ],
  },
})
