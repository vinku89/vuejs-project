<template>
 <div class="mb-2 col-12 pt-0 px-0">
  <h3 class="white_txt f18 font-weight-bold">Order List</h3>
   <div class="wrapper_bg" v-bind:class="{ ttl_records: isActive }">
            <template>
            <v-data-table 
            :headers="headers" 
            :items="desserts" 
            :hide-default-footer="true" 
            :fixed-header="true"
            :items-per-page="10000" 
            class="elevation-1 orderList_scroll orderList_wrp" v-bar>
            <template v-slot:[`item.bid_type`]="{ item }">
              <v-chip v-if="item.bid_type == 'SELL'" class="circle_dot dot_red"></v-chip>
              <v-chip v-else class="circle_dot dot_green"></v-chip>
            </template>
            <template v-slot:[`item.cancel`]="{ item }">
              <v-btn color="blue-grey" x-small dark v-on:click.once="cancelOrder(item.id)">Cancel</v-btn>
            </template>
                <div class="orderList_table">
                  
                </div>
            </v-data-table>
           </template>
        </div>
      <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
          <div class="ctn">
        <div class="txt">{{snackbar_text}}</div>
      </div>
      <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
          <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
              Close
          </v-btn> -->
      </v-snackbar>
 </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
window.Pusher = require('pusher-js');
//import Echo from 'laravel-echo'
export default {
  name: 'OrderList',
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
          value: 'amount',
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
          text: 'Action',
          value: 'cancel',
          sortable: false,
        },
      ],
      desserts: [],
      snackbar: false,
      snackbar_text: "",
      vertical: true,
      timeout: 6000,
      color: "yellow",
      x: 'right',
      y: 'top',
       
       
    }),
    watch: {
        $route(to) {
            this.loadData()
            this.last_market_symbol = this.market_symbol
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
            //Order List websockets listerner
            window.sockets.old5.leave('OrdersList_'+this.last_market_symbol+"_"+user_id)
            window.Echo.private('OrdersList_'+this.market_symbol+"_"+user_id)
            .listen('OrdersListEvent', (e) => {
                if(e.message.market_symbol == this.market_symbol){
                  this.desserts = e.message.Result;
                }
            });
             window.sockets.old5 = window.Echo;
        }
    },
    beforeDestroy: function(){
      let user_id = this.$store.getters.loggedUserId;
      window.sockets.old5.leave('OrdersList_'+this.market_symbol+"_"+user_id)
      //window.sockets.old5.disconnect();
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
        //Order List websockets listerner
        window.Echo.private('OrdersList_'+this.market_symbol+"_"+user_id)
        .listen('OrdersListEvent', (e) => {
            if(e.message.market_symbol == this.market_symbol){
              this.desserts = e.message.Result;
            }
        });
         window.sockets.old5 = window.Echo;
    },
    methods: {
      cancelOrder(id){
        var self = this;
            let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2],
                "order_id": id
            }
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "order_cancel";
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
                        self.snackbar_text = response.data.Result
                        self.snackbar = true
                        //self.ordersList()
                        //self.$emit('childToParent', "Success")                         
                    })
                    .catch(function (err) {
                        //handle error
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
      getColor(trade) {
        if (trade == "SELL") return 'red'
        else return 'green'
      },
        async loadData() {
            this.desserts = await this.ordersList()
        },
        async ordersList() {
            var self = this;
            self.isActive = false;
            let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2]
            }
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "ordersList";
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
                        self.desserts = response.data.Result
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
