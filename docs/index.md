---
layout: home
sidebar: false

title: contextmenu
titleTemplate: Customize your context menu

hero:
  name: "@contextmenu"
  text: Customize your context menu
  tagline: A lightning weight library that helps you to customize your context menu.
  image:
    src: https://developer.apple.com/design/human-interface-guidelines/images/intro/components/context-menu-intro_2x.png
    alt: "@contextmenu"
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Features
      link: /guide/features
    - theme: alt
      text: View on GitHub
      link: https://github.com/vaakian/contextmenu

features:
  - title: Multi-framework support
    details: Support Vue(2&3) / React / Angular / Solid / Preact and more coming soon...
    icon: 🔨
  - title: Customizable
    details:  Use opted-in UI component or handle everything style yourself.
    icon: 🎨
  - title: Fully tree-shakeable
    details: Only bundles what you need.
    icon: 🎄
  - title: Type strong
    details: Fully written in TypeScript, everything is typed.
    icon: 💪
---

<script>

const fn = () => {
  if (typeof window === 'undefined') return
    setTimeout(() => {
      const clip = document.getElementsByClassName('clip')[0]
      console.log(clip)
      clip.innerHTML = '<span style="-webkit-text-fill-color: #ccc;">@</span>context<span style="-webkit-text-fill-color: #4ca5c8f2">menu</span>'
    })
}

fn()
</script>