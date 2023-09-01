import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
// @ts-ignore :D
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)

app.use(router)
app.use(VueLazyload, {
  preLoad: 1,
  attempt: 10
})
app.use(VueVirtualScroller)

app.mount('#app')
