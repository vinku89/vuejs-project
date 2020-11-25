<template>
  <div class="w-100 trade_wrp_height">
    <template>
      <div class="trade_wrp_height2 pr-1 pt-4">
        <h5 class="font-weight-bold">Trade History <div class="subText">( Last 100 trades <span class="green_txt">{{this.paircurrency}}</span> - <span>{{this.basecurrency}}</span> )</div></h5>
        <template>
          <v-data-table 
          :headers="headers" 
          :items="tradeHistory" 
          :hide-default-footer="true" 
          :fixed-header="true"
          :items-per-page="10000" 
          class="elevation-1 trade_history vuebar-element" v-bar>
            <template v-slot:[`item.type`]="{ item }">
            <v-chip :text-color="getColor(item.type)">{{ item.type }}</v-chip>
            </template>
            <template v-slot:[`item.price`]="{ item }">
            <v-chip :text-color="getColor(item.type)">{{ item.price }}</v-chip>
            </template>
            <template v-slot:[`item.amount`]="{ item }">
            <v-chip :text-color="getColor(item.type)">{{ item.amount }}</v-chip>
            </template>
          </v-data-table>
        </template>
      </div>
    </template>
    <v-overlay style="z-index:205" :value="overlay">
           <!-- <v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img>-->
            <div>
          <div class="multi-spinner-container">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                  <div class="multi-spinner">
                    <div class="multi-spinner">
                      <div class="multi-spinner">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </v-overlay>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
window.Pusher = require('pusher-js');
  export default {
    name: 'TradeHistory',
    components: {},

    data: () => ({
      overlay: false,
      absolute: true,
      market_symbol: '',
      last_market_symbol: '',
      basecurrency: '',
      paircurrency: '',
      headers: [],
      tradeHistory: [],       
       
    }),
    watch: {
        $route(to) {
          this.last_market_symbol = this.market_symbol
            this.loadData()
            this.market_symbol = to.path.split("/")[2];
            this.basecurrency = to.path.split("/")[2].split("_")[1];
            this.paircurrency = to.path.split("/")[2].split("_")[0];
            this.headers = [{
          text: 'Time',
          align: 'left',
          sortable: false,
          value: 'date',
        },
        {
          text: '',
          value: 'type',
          sortable: false,
        },
        {
          text: 'Price('+this.basecurrency+')',
          value: 'price',
          sortable: false,
          align: 'right'
        },
        {
          text: 'Amount('+this.paircurrency+')',
          value: 'amount',
          sortable: false,
          align: 'right'
        }
      ]
        //Trade history websocket listener
        window.sockets.old6.leave('TradeHistoryChannel_'+this.last_market_symbol)
        window.Echo.channel("TradeHistoryChannel_"+this.market_symbol)
        .listen('TradeHistoryEvent', (e) => {
            if(e.message.market_symbol == this.market_symbol){
              let resmsg = e.message.Result;
              Object.keys(resmsg).forEach(value=>{
                this.tradeHistory.unshift(resmsg[value])
                })
            }
        });
        window.sockets.old6 = window.Echo;
        }
    },
    beforeDestroy: function(){
        window.sockets.old6.leave('TradeHistoryChannel_'+this.market_symbol)
        //window.Echo.disconnect();
    },
    mounted: function () {
        this.loadData()
        this.market_symbol = this.$route.path.split("/")[2];
        this.basecurrency = this.$route.path.split("/")[2].split("_")[1];
        this.paircurrency = this.$route.path.split("/")[2].split("_")[0];
        this.headers = [{
          text: 'Time',
          align: 'left',
          sortable: false,
          value: 'date',
        },
        {
          text: '',
          value: 'type',
          sortable: false,
        },
        {
          text: 'Price('+this.basecurrency+')',
          value: 'price',
          sortable: false,
          align: 'right'
        },
        {
          text: 'Amount('+this.paircurrency+')',
          value: 'amount',
          sortable: false,
          align: 'right'
        }
      ]
      //Trade history websocket listener
      window.Echo.channel("TradeHistoryChannel_"+this.market_symbol)
      .listen('TradeHistoryEvent', (e) => {
          if(e.message.market_symbol == this.market_symbol){
            let resmsg = e.message.Result;
            Object.keys(resmsg).forEach(value=>{
              this.tradeHistory.unshift(resmsg[value])
              })
          }
      });
      window.sockets.old6 = window.Echo;
    },
    methods: {
      getColor(trade) {
        if (trade == "SELL") return 'red'
        else return 'green'
      },
      async loadData() {
            this.tradeHistory = await this.trading_history()
        },
        async trading_history() {
            var self = this;
            self.overlay = true
            //let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2]
            }
           // if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "tradehistory";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            //"Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(bodyFormData)
                    })
                    .then(function (response) {
                        //handle success 
                        self.tradeHistory = response.data.Result
                        self.overlay = false
                    })
                    .catch(function () {
                        //handle error
                    });
            // } else {
            //     window.location.href = "/";
            // }
        },
    },
  };
</script>
