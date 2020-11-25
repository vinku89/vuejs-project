<template>
<div class="chart_wrap">
<div class="TVChartContainer" :id="containerId"  />
</div>
</template>

<script>
import $ from 'jquery';
import { widget } from '../../../charting_library.min.js';
import datafeed from '../../../datafeed.js';
//import ohlcv from './ohlcv.json';
function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
export default {
  name: 'TVChartContainer',
  props: {
    symbol: {
      default: 'Brexily:EVR/BTC',
      type: String,
    },
    interval: {
      default: '60',
      type: String,
    },
    containerId: {
      default: 'tv_chart_container',
      type: String,
    },
    //datafeedUrl: {
    //  default: datafeed,//new window.Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
    //  type: Object,
    //},
    libraryPath: {
      default: '/charting_library/',
      type: String,
    },
    // chartsStorageUrl: {
    //   default: 'https://saveload.tradingview.com',
    //   type: String,
    // },
    // chartsStorageApiVersion: {
    //   default: '1.1',
    //   type: String,
    // },
    clientId: {
      default: 'tradingview.com',
      type: String,
    },
    userId: {
      default: 'public_user_id',
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: true,
      type: Boolean,
    },
    studiesOverrides: {
      type: Object,
    }
  },
  tvWidget: null,
  data: () => ({
      market_symbol: '',
  }),
  watch: {
        $route(to) {
          let ms = to.path.split("/")[2];
          this.market_symbol = ms.replace('_','/');//ms.split("_")[1]+'/'+ms.split("_")[0];//
          this.graphData();
        }
    },
  mounted() {
    let ms = this.$route.path.split("/")[2];
    this.market_symbol = ms.replace('_','/');//ms.split("_")[1]+'/'+ms.split("_")[0];//
    this.graphData();
    $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 5) {
        $(".TVChartContainer").addClass("position");
    } else {
        $(".TVChartContainer").removeClass("position");
    }
  });
  },
  methods: {
    graphData(){
    const widgetOptions = {
      // width:650,
      // height:350,
      symbol: 'Brexily:'+this.market_symbol,
      theme: 'dark',
      time_frames: [],
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: datafeed,
      interval: this.interval,
      container_id: this.containerId,
      library_path: this.libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['timeframes_toolbar','use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      //charts_storage_url: this.chartsStorageUrl,
      //charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: this.userId,
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      studies_overrides: this.studiesOverrides,
    };
    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;
    //this.tvWidget = tvWidget.activeChart().priceFormatter().format(123);
    // tvWidget.onChartReady(() => {
    //   tvWidget.headerReady().then(() => {
    //     const button = tvWidget.createButton();
    //     button.setAttribute('title', 'Click to show a notification popup');
    //     button.classList.add('apply-common-tooltip');
    //     button.addEventListener('click', () => tvWidget.showNoticeDialog({
    //         title: 'Notification',
    //         body: 'TradingView Charting Library API works correctly',
    //         callback: () => {
    //           // eslint-disable-next-line no-console
    //           console.log('Noticed!');
    //         },
    //       }));
    //     button.innerHTML = 'Check API';
    //   });
    // });
    }
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.TVChartContainer {
  height: 395px;//calc(100vh - 80px);
}
.ui-draggable[data-dialog-type="series-properties-dialog"]{
  height: 317px !important;
  overflow: overlay !important;
}
.TVChartContainer .properties-tabs .main-properties{
  height: 153px !important;
}

.TVChartContainer .main-properties{
  height: 150px !important;
  overflow: scroll !important;
}
</style>