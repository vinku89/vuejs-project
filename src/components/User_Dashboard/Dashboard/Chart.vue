<template>
    <div class="chartcss">
    <highcharts :constructor-type="'stockChart'" :options="stockData" class="map"></highcharts>
    </div>
</template>

<script>

import axios from 'axios'
import qs from 'qs'
import {Chart} from 'highcharts-vue'
//import chartdata from './ohlcv.json';
export default {
  name: 'Chart',
  props: {
    msg: String
  },
  components: {
    highcharts: Chart ,
  },

  data: () => ({
    ohlc: [],
    volume: [],
    stockData: {
        chart: {
            backgroundColor:'#483a58',
            height: '300px'
        },
        plotOptions: {
        candlestick: {
                    downcolor: 'green',
                    upColor: 'red'
                }
        },
        rangeSelector: {
            buttons: [{
                    type: 'day',
                    count: 1,
                    text: '1D'
                }, {
                    type: 'day',
                    count: 5,
                    text: '1W'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1M'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3M'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6M'
                }, {
                    type: 'ytd',
                    text: 'YTD'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1Y'
                }, {
                    type: 'all',
                    text: 'MAX'
                }
                ],
            selected: 1,
            inputEnabled: false
        },
        // title: {
        //     text: 'AAPL Historical'
        // },
        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            // title: {
            //     text: 'OHLC'
            // },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
            }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
            }],

            tooltip: {
            split: true
            },
            scrollbar: {
                enabled: false
            },
            lang: {
                noData: 'No data to display'
            },
            series: [{
            type: 'candlestick',
            name: 'AAPL',
            data: '',
            }, {
            type: 'column',
            name: 'Volume',
            data: '',
            yAxis: 1,
            }]
    },
   }),

  mounted: function () {
     // console.log(chartdata)
    //   chartdata.forEach((value) => {
    //     this.ohlc.push([
    //         value[0], // the date
    //         value[1], // open
    //         value[2], // high
    //         value[3], // low
    //         value[4] // close
    //     ]);
    //     this.volume.push([
    //         value[0], // the date
    //         value[5] // the volume
    //     ]);
    // });

    // this.stockData.series = [{
    //     type: 'candlestick',
    //     id: 'aapl-ohlc',
    //     name: 'Stock Price',
    //     data: this.ohlc
    // }, {
    //     type: 'column',
    //     id: 'aapl-volume',
    //     name: 'Volume',
    //     data: this.volume,
    //     yAxis: 1
    // }] 
    this.loadData();
  },
  methods: {
        async loadData() {
            await this.getChartData()
        },
        async getChartData() {
            var self = this;
            this.ohlc = [];
            this.volume= [];
            let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market_symbol": market_symbol[2]
            }
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "graph_data";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(bodyFormData)
                    })
                    .then(function (response) {
                        //handle success 
                        let desserts = response.data.Result
                        desserts.forEach((value) => {
                            self.ohlc.push([
                                value[0], // the date
                                value[1], // open
                                value[2], // high
                                value[3], // low
                                value[4] // close
                            ]);
                            self.volume.push([
                                value[0], // the date
                                value[5] // the volume
                            ]);
                        });

                        self.stockData.series = [{
                            type: 'candlestick',
                            name: 'Stock Price',
                            data: self.ohlc
                        }, {
                            type: 'column',
                            name: 'Volume',
                            data: self.volume,
                            yAxis: 1
                        }] 
                    })
                    .catch(function () {
                        //handle error
                    });
            } else {
                window.location.href = "/";
            }
        },
  },
  watch: {
        $route() {
            this.loadData()
        }
  },
};
</script>
 <style scoped>
.chartcss {
  min-height: 160px;
}
 </style>