import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import VueRouter from 'vue-router';
import carousel from 'vue-owl-carousel2';
import bootstrap from '../src/assets/css/bootstrap.css';
import VueScrollTo from 'vue-scrollto';
import Axios from 'axios'
import store from './store.js'
import filters from './filters.js'
//import TradingView from './charting_library.min.js'
import VueTelInput from 'vue-tel-input'
import SocialSharing from 'vue-social-sharing'
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
 import browserDetect from "vue-browser-detect-plugin";
import NProgress from 'nprogress';
import Vuebar from 'vuebar';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import stockInit from 'highcharts/modules/stock';
import nodatatodisplay from 'highcharts/modules/no-data-to-display';
import darkUnica from "highcharts/themes/dark-unica";
import IdleVue from 'idle-vue'

const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 6000, // 10 minutes
  startAtIdle: false
});
darkUnica(Highcharts);
nodatatodisplay(Highcharts);
stockInit(Highcharts)


//import LightweightCharts from 'lightweight-charts';

import momentmini from 'moment-mini'
import datepicker from 'daterangepicker'
import daterangepicker from '../src/assets/css/daterangepicker.css';

// import tracer from 'dd-trace';
// tracer.init({ 
//   analytics: true,
//   logInjection: true
//  }); 

import Echo from 'laravel-echo';
// import VTooltip from 'v-tooltip';
// Vue.use(VTooltip);
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKET_HOST,
  wssPort: process.env.VUE_APP_WEBSOCKET_PORT,
  disableStats: true,
  enabledTransports: ['ws', 'wss']
});

Vue.use(browserDetect);
Vue.filter('numFormat', numFormat(numeral));

// import Datafeed from './datafeed.js';
// window.tvWidget = new TradingView.widget({
//   symbol: 'Bitfinex:BTC/USD', // default symbol
//   interval: '1D', // default interval
//   fullscreen: true, // displays the chart in the fullscreen mode
//   container_id: 'tv_chart_container',
//   datafeed: Datafeed,
//   library_path: '../charting_library_clonned_data/charting_library/',
// });

import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
Vue.config.productionTip = false;
Vue.use(VueTelInput)
Vue.use(VueRouter);
Vue.use(SocialSharing);
Vue.use(Vuebar);
Vue.use(NProgress);
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
  icons: {
    iconfont: 'mdi'
  }
})

new Vue({
  vuetify,
  momentmini,
  datepicker,
  daterangepicker,
  router,
  store,
  filters,
  carousel,
  bootstrap,
  VueScrollTo, 
  NProgress,
  HighchartsVue,
  Highcharts,
  //tracer,
  //LightweightCharts,
  render: h => h(App)
}).$mount('#app')