<template>
<div class="col-12 pt-0 pl-0">
    <v-row class="buy_sell_orders">
        <v-col cols="12" lg="6" class="py-0">
            <h3 class="white_txt font-weight-bold">
                Buy Orders <span class="ttl_txt">TTL: 
                    <strong class="white_txt" v-if="ttl_bo == 0">0.00 {{basecurrency}}</strong>
                    <strong class="white_txt" v-else>{{ttl_bo}} {{basecurrency}}</strong></span>
            </h3>
            <div class="wrapper_bg" v-bind:class="{ ttl_records: isActive }">
                <template>
                    <v-data-table :headers="headers" :items="desserts" :hide-default-footer="true" :fixed-header="true" :items-per-page="10000" class="elevation-1 buysellorder_scroll buyorder_wrp" v-bar>
                        <!-- <div class="buysellorder_table"> -->
                            <template slot="item" slot-scope="props">
                                <tr @click="bindBuyOrderVal(props.item)">
                                    <td>{{ props.item.bid_price }}</td>
                                    <td class="text-right">{{ props.item.total_qty }}</td>
                                    <td class="text-right">{{ props.item.total_price }}</td>
                                </tr>
                            </template>
                        <!-- </div> -->
                    </v-data-table>
                </template>
            </div>
        </v-col>

        <v-col cols="12" lg="6" class="pr-0 py-0">
            <h3 class="white_txt font-weight-bold">Sell Orders
                 <span class="ttl_txt">TTL: <strong class="white_txt" v-if="ttl_so == 0">0.00 {{paircurrency}}</strong><strong class="white_txt" v-else>{{ttl_so}} {{paircurrency}}</strong></span>
            </h3>
            <div class="wrapper_bg" v-bind:class="{ ttl_records: isActive1 }">
                <template>
                    <v-data-table :headers="sellHheaders" :items="sellDesserts" :hide-default-footer="true" :fixed-header="true" :items-per-page="10000" class="elevation-1 buysellorder_scroll2 sellorder_wrp" v-bar>
                        <!-- <div class="buysellorder_table"> -->
                            <template slot="item" slot-scope="props">
                                <tr @click="bindSellOrderVal(props.item)">
                                    <td>{{ props.item.bid_price }}</td>
                                    <td class="text-right">{{ props.item.total_qty }}</td>
                                    <td class="text-right">{{ props.item.total_price }}</td>
                                </tr>
                            </template>
                        <!-- </div> -->
                    </v-data-table>
                </template>
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
window.Pusher = require('pusher-js');
export default {
    name: 'BuySellOrders',
    components: {},
    data: () => ({
        market_symbol: '',
        last_market_symbol: '',
        isActive: false,
        isActive1: false,
        basecurrency: '',
        paircurrency: '',
        buyOrdersList: [],
        sellOrdersList: [],
        headers: [],
        desserts: [],
        sellHheaders: [],
        sellDesserts: [],
        ttl_bo: 0,
        ttl_so: 0,
    }),
    watch: {
        $route(to) {
            this.last_market_symbol = this.market_symbol
            this.loadData()
            //this.buy_orders();
            //this.sell_orders();
            this.market_symbol = to.path.split("/")[2];
            this.basecurrency = to.path.split("/")[2].split("_")[1];
            this.paircurrency = to.path.split("/")[2].split("_")[0];
            this.headers = [{
                        text: 'Price',
                        align: 'left',
                        sortable: false,
                        value: 'bid_price',
                    },
                    {
                        text: this.paircurrency,
                        value: 'total_qty',
                        sortable: false,
                        align: 'right'
                    },
                    {
                        text: this.basecurrency,
                        value: 'total_price',
                        sortable: false,
                        align: 'right'
                    },
                ];
            this.sellHheaders = [{
                    text: 'Price',
                    align: 'left',
                    sortable: false,
                    value: 'bid_price',
                },
                {
                    text: this.paircurrency,
                    value: 'total_qty',
                    sortable: false,
                    align: 'right'
                },
                {
                    text: this.basecurrency,
                    value: 'total_price',
                    sortable: false,
                    align: 'right'
                },
            ];

            window.sockets.old1.leave('BuyOrdersChannel_'+this.last_market_symbol)
            window.sockets.old1.leave('DemoChannel_'+this.last_market_symbol)

            window.Echo.channel('BuyOrdersChannel_'+this.market_symbol)
            .listen('BuyordersEvent', (e) => {
                if(e.message.market_symbol == this.market_symbol){
                    this.desserts = e.message.Result;
                    let ttl = 0;
                    Object.keys(this.desserts).forEach(value => {
                        let tot = this.desserts[value].total_price.replace(/,/g, '')
                        ttl = ttl+parseFloat(tot);
                    })
                    this.ttl_bo = ttl.toLocaleString('en',{maximumFractionDigits: 8});
                }                        
            });
            
             //Sell Orders websocket listener
            window.Echo.channel("DemoChannel_"+this.market_symbol)
            .listen('WebsocketDemoEvent', (e) => {
                if(e.message.market_symbol == this.market_symbol){
                    this.sellDesserts = e.message.Result;
                    let ttl = 0;
                    Object.keys(this.sellDesserts).forEach(value => {
                        let tot = this.sellDesserts[value].total_qty.replace(/,/g, '')
                        ttl = ttl+parseFloat(tot);
                    })
                    this.ttl_so = ttl.toLocaleString('en',{maximumFractionDigits: 8});
                }
            });

            window.sockets.old1 = window.Echo;
        }
    },    
    beforeDestroy: function(){
        window.sockets.old1.leave('BuyOrdersChannel_'+this.market_symbol)
        window.sockets.old1.leave('DemoChannel_'+this.market_symbol)
        //window.Echo.disconnect();
    },
    mounted: function () {
        this.loadData()
        this.market_symbol = this.$route.path.split("/")[2];
        this.basecurrency = this.$route.path.split("/")[2].split("_")[1];
        this.paircurrency = this.$route.path.split("/")[2].split("_")[0];
        this.headers = [{
                    text: 'Price',
                    align: 'left',
                    sortable: false,
                    value: 'bid_price',
                },
                {
                    text: this.paircurrency,
                    value: 'total_qty',
                    sortable: false,
                    align: 'right'
                },
                {
                    text: this.basecurrency,
                    value: 'total_price',
                    sortable: false,
                    align: 'right'
                },
            ],
            this.sellHheaders = [{
                    text: 'Price',
                    align: 'left',
                    sortable: false,
                    value: 'bid_price',
                },
                {
                    text: this.paircurrency,
                    value: 'total_qty',
                    sortable: false,
                    align: 'right'
                },
                {
                    text: this.basecurrency,
                    value: 'total_price',
                    sortable: false,
                    align: 'right'
                },
            ]

        //Buy Orders websocket listener
        window.Echo.channel('BuyOrdersChannel_'+this.market_symbol)
        .listen('BuyordersEvent', (e) => {
            if(e.message.market_symbol == this.market_symbol){
                this.desserts = e.message.Result;
                let ttl = 0;
                Object.keys(this.desserts).forEach(value => {
                    let tot = this.desserts[value].total_price.replace(/,/g, '')
                    ttl = ttl+parseFloat(tot);
                })
                this.ttl_bo = ttl.toLocaleString('en',{maximumFractionDigits: 8});
            }                        
        });
        
        //Sell Orders websocket listener
        window.Echo.channel("DemoChannel_"+this.market_symbol)
        .listen('WebsocketDemoEvent', (e) => {
            if(e.message.market_symbol == this.market_symbol){
                this.sellDesserts = e.message.Result;
                let ttl = 0;
                Object.keys(this.sellDesserts).forEach(value => {
                    let tot = this.sellDesserts[value].total_qty.replace(/,/g, '')
                    ttl = ttl+parseFloat(tot);
                })
                this.ttl_so = ttl.toLocaleString('en',{maximumFractionDigits: 8});
            }
        });
        window.sockets.old1 = window.Echo;
    },
    methods: {        
        bindBuyOrderVal(data) {
            let ordamt = 0;
             let index = this.desserts.map(function(e) { return e; }).indexOf(data);
             for (let i = 0; i <= index; i++) {
                    let qty = this.desserts[i].total_qty.replace(/,/g, '')
                    ordamt += parseFloat(qty)
                }
            var orderval = {price:data.bid_price.replace(/,/g, ''), amount:ordamt.toFixed(8)};
            this.$emit('childToParent', orderval) 
        },
        bindSellOrderVal(data) {            
            let ordamt = 0;
             let index = this.sellDesserts.map(function(e) { return e; }).indexOf(data);
             for (let i = 0; i <= index; i++) {
                    let qty = this.sellDesserts[i].total_qty.replace(/,/g, '')
                    ordamt += parseFloat(qty)
                }
            var orderval = {price:data.bid_price.replace(/,/g, ''), amount:ordamt.toFixed(8)};
            this.$emit('childToParent', orderval) 
        },
        async loadData() {
            this.desserts = await this.buy_orders()
            this.sellDesserts = await this.sell_orders()
        },
        async buy_orders() {
            var self = this;
            self.isActive = false;
            //let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2]
            }
            //if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "buy_orders";
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
                        self.desserts = response.data.Result
                        let ttl = 0;
                        Object.keys(self.desserts).forEach(value => {
                            let tot = self.desserts[value].total_price.replace(/,/g, '')
                            ttl = ttl+parseFloat(tot);
                        })
                        self.ttl_bo = ttl.toLocaleString('en',{maximumFractionDigits: 8});

                        if(self.desserts.length > 25){
                          self.isActive = true;
                        }
                    })
                    .catch(function () {
                        //handle error
                    });
            // } else {
            //     window.location.href = "/";
            // }
        },
        async sell_orders() {
            var self = this;
            self.isActive1 = false;
            //let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2]
            }
           // if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "sell_orders";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                           // "Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(bodyFormData)
                    })
                    .then(function (response) {
                        //handle success 
                        self.sellDesserts = response.data.Result
                        let ttl = 0;
                        Object.keys(self.sellDesserts).forEach(value => {
                            let tot = self.sellDesserts[value].total_qty.replace(/,/g, '')
                            ttl = ttl+parseFloat(tot);
                        })
                        self.ttl_so = ttl.toLocaleString('en',{maximumFractionDigits: 8});

                          if(self.sellDesserts.length > 25){
                          self.isActive1 = true;
                        }
                    })
                    .catch(function () {
                        //handle error
                    });
            //} else {
            //     window.location.href = "/";
            // }
        },
    }
};
</script>
