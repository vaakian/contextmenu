# Theme

Import built-in themes in your project entry:
  - `main.ts` or `main.js` for Vue
  - `main.tsx` or `main.jsx` in React
```js{4}
import { createApp } from 'vue'
import App from './App.vue'
// import built-in theme
import '@contextmenu/core/theme/default.css'

createApp(App).mount('#app')
```

Available themes:
- `default.css`: including dark & light style and automatically switching according to the system theme.
- MORE (:TODO)

# Customize theme

## CSS variables
Override the variables to adjust the style of your menu element.

:TODO

## Online design & preview
Design & preview menu element style online, auto generated css theme file.

:TODO
