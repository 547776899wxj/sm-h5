import Vue from 'vue'
import App from './App'
import util from './common/util'
import tui  from './common/webview.js'
import request from 'common/request/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$util = util
Vue.prototype.$tui = tui
Vue.prototype.$request = request

const app = new Vue({
    ...App
})
app.$mount()
