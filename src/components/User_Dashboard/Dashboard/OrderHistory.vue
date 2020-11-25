<template>
 <div class=" col-12 py-0 px-0">
  <h3 class="white_txt f18 font-weight-bold">Order History</h3>
   <div class="wrapper_bg" v-bind:class="{ ttl_records: isActive }">
            <template>
            <v-data-table 
            :headers="headers" 
            :items="desserts" 
            :hide-default-footer="true" 
            :fixed-header="true"
            :items-per-page="10000" 
            class="elevation-1 orderHistory_scroll orderHistory_wrp" v-bar >
            <template v-slot:[`item.bid_type`]="{ item }">
              <v-chip v-if="item.bid_type == 'SELL'" class="circle_dot dot_red"></v-chip>
              <v-chip v-else class="circle_dot dot_green"></v-chip>
            </template>
                <div class="orderHistory_table"></div>
            </v-data-table>
           </template>
        </div>

 </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
window.Pusher = require('pusher-js');
//import Echo from 'laravel-echo'
export default {
  name: 'OrderHistory',
  components: {
  },

    data: () => ({
      market_symbol: '',
      last_market_symbol: '',
      isActive: false,
      headers: [{
          text: '',
          sortable: false,
          value:'bid_type'
        },
        {
          text: 'Date & Time',
          align: 'left',
          sortable: false,
          value:'order_date'
        },
        {
          text: 'Pair',
          value: 'pair',
          sortable: false,
          align: 'left'
        },
        {
          text: 'Amount',
          value: 'price',
          sortable: false,
          align: 'right'
        },
        {
          text: 'Price',
          value: 'bid_price',
          sortable: false,
          align: 'right'
        },
        {
          text: 'Fee',
          value: 'fee',
          sortable: false,
          align: 'right'
        },
        {
          text: 'Tot Amt',
          value: 'balance',
          sortable: false,
          align: 'right'
        },
        {
          text: 'Status',
          value: 'status',
          sortable: false,
          align: 'right'
        },
        {
          text: '',
          value: 'action',
          sortable: false,
        },
      ],
      desserts: [],      
       
    }),
    watch: {
        $route(to) {
          this.last_market_symbol = this.market_symbol
            this.loadData()
            this.market_symbol = to.path.split("/")[2];
            let user_id = this.$store.getters.loggedUserId;
        // let auth_token = this.$store.getters.authToken;
        // window.Echo = new Echo({
        //   broadcaster: 'pusher',
        //   key: process.env.VUE_APP_PUSHER_KEY,
        //   wsHost: process.env.VUE_APP_WEBSOCKET_HOST,
        //   wssPort: process.env.VUE_APP_WEBSOCKET_PORT,
        //   disableStats: true,
        //   cluster: 'mt1',
        //   authEndpoint: process.env.VUE_APP_AUTH_ENDPOINT,
        //   "apiOriginAllow": {
        //       "allowCors" : true,
        //       "allowOrigin" : process.env.VUE_APP_AUTH_ENDPOINT,
        //       "allowMethods" : "GET, POST",
        //       "allowHeaders" : "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
        //     },
        //   auth: {
        //     headers: {
        //       "accept": "application/json",
        //       'Access-Control-Allow-Origin': '*',
        //       "Authorization": "Bearer " + auth_token
        //     }
        //   }
        // });
            //Order History websocket listerner
            window.sockets.old4.leave('OrdersHistory_'+this.last_market_symbol+"_"+user_id)
            window.Echo.private("OrdersHistory_"+this.market_symbol+"_"+user_id)
            .listen('OrdersHistoryEvent', (e) => {
                if(e.message.market_symbol == this.market_symbol ){
                  let resmsg = e.message.Result;
                Object.keys(resmsg).forEach(value=>{
                  resmsg[value].fee = resmsg[value].fee || '0.00'
                  this.desserts.unshift(resmsg[value])
                  })
                }
            });
            window.sockets.old4 = window.Echo;
        }
    },
    beforeDestroy: function(){
      let user_id = this.$store.getters.loggedUserId;
      window.sockets.old4.leave('OrdersHistory_'+this.market_symbol+"_"+user_id)
      //window.sockets.old4.disconnect();
    },
    mounted: function () {
        this.loadData()
        this.market_symbol = this.$route.path.split("/")[2];
        let user_id = this.$store.getters.loggedUserId; 
        // let auth_token = this.$store.getters.authToken;
        // window.Echo = new Echo({
        //   broadcaster: 'pusher',
        //   key: process.env.VUE_APP_PUSHER_KEY,
        //   wsHost: process.env.VUE_APP_WEBSOCKET_HOST,
        //   wssPort: process.env.VUE_APP_WEBSOCKET_PORT,
        //   disableStats: true,
        //   cluster: 'mt1',
        //   authEndpoint: process.env.VUE_APP_AUTH_ENDPOINT,
        //   "apiOriginAllow": {
        //       "allowCors" : true,
        //       "allowOrigin" : process.env.VUE_APP_AUTH_ENDPOINT,
        //       "allowMethods" : "GET, POST",
        //       "allowHeaders" : "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
        //     },
        //   auth: {
        //     headers: {
        //       "accept": "application/json",
        //       'Access-Control-Allow-Origin': '*',
        //       "Authorization": "Bearer " + auth_token
        //     }
        //   }
        // });
        //Order History websocket listerner
        window.Echo.private("OrdersHistory_"+this.market_symbol+"_"+user_id)
        .listen('OrdersHistoryEvent', (e) => {
            if(e.message.market_symbol == this.market_symbol ){
              let resmsg = e.message.Result;
            Object.keys(resmsg).forEach(value=>{
              resmsg[value].fee = resmsg[value].fee || '0.00'
              this.desserts.unshift(resmsg[value])
              })
            }
        });
        window.sockets.old4 = window.Echo;
    },
    methods: {
        getColor(trade) {
          if (trade == "SELL") return 'red'
          else return 'green'
        },
        async loadData() {
            this.desserts = await this.ordersHistory()
        },
        async ordersHistory() {
            var self = this;
            self.isActive = false;
            let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2]
            }
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "ordersHistory";
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
                        let data = response.data.Result
                        //self.desserts = response.data.Result
                        for(let res of data){
                          res.fee = res.fee || "0.00";
                        }
                        self.desserts = data ;
                        if(self.desserts.length > 25){
                          self.isActive = true;
                        }
                    })
                    .catch(function (err) {
                        if(err.response.data.Result == 'User is blocked'){
                                self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }
                            else if(err.response.data.Result == 'Twofa Status Inactive'){
                                self.snackbar_text = "Please Activate Two-Factor Authentication."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/Security";
                                },2000)
                            }
                            else{
                                self.snackbar_text = "Server busy, please try after sometime."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }
                    });
            } else {
                window.location.href = "/";
            }
        },
    }
};
</script>
