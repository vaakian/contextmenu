import { h } from 'vue'
import Theme from 'vitepress/theme'
import '../style/vars.css'
import 'uno.css'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(''),
    })
  },
}
