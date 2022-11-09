import Vue from 'nativescript-vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'
import '@nativescript/canvas-polyfill';
import Canvas from '@nativescript/canvas/vue';

Vue.use( Canvas );
Vue.use(RadSideDrawer)

import App from './components/App'

Vue.config.silent = !__DEV__

new Vue({
  render: h => h(App)
}).$start()
