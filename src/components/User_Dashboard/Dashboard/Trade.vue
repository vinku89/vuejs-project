<template>
    <v-app class="">
        <TopBar :userInfo="loggedUserInfo" :iswtmActive="true" />
       <!-- <v-navigation-drawer hide-overlay permanent fixed clipped app class="frame-pt trade_brrt h-100">
            <CoinList v-on:childToParentBS="onChildClickBS" />
        </v-navigation-drawer>-->

        <v-content class="frame-pt">
        <v-col cols="12" class="p-0">
            <div style="position:relative">
                <!-- Middle scetion -->
                <div class="middle_wrp">

                    <div class="col-12 p-0">
                        <v-row>
                            <v-col cols="12" xl="5" class="pb-0">
                                <div class="selected_crypto_wrp">
                                    <img v-bind:src="`${adminUrl}/coin_listing_images/${exchageData.coin_image}`"
                                        v-bind:alt="exchageData.coin_image">
                                    <div class="selected_crypto position-relative">
                                        <h5>{{exchageData.coin_name}}</h5>
                                      <v-icon v-on:click="coinInfoREfresh" class="coinInfo_icon triger"  @click.stop="coinInfoModal = true">mdi-information-outline</v-icon>
                                        <h6><span class="green_txt">{{exchageData.pair_currency}}</span> -
                                            <span>{{exchageData.base_currency}}</span></h6>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" xl="7" class="pt-2 pb-0">
                                <ul class="selected_coinInfo_wrp">
                                    <li>
                                        <h5 v-if="exchageData.coinhistoryArr">
                                            ${{exchageData.coinhistoryArr.coin_price_dollar}}</h5>
                                        <h5 v-else>0.00</h5>
                                    </li>
                                    <li>
                                        <p>Change</p>
                                        <p class="font-weight-bold red_txt"
                                            v-if="exchageData.coinhistoryArr && exchageData.coinhistoryArr.coin_change_price.includes('-') == true && exchageData.coinhistoryArr.coin_change_price != '-0.00'">
                                            {{exchageData.coinhistoryArr.coin_change_price}}%</p>
                                        <p class="font-weight-bold green_txt"
                                            v-else-if="exchageData.coinhistoryArr && exchageData.coinhistoryArr.coin_change_price.includes('-') == false ">
                                            {{exchageData.coinhistoryArr.coin_change_price}}%</p>
                                        <p class="font-weight-bold green_txt" v-else>0.00%</p>
                                    </li>
                                    <li>
                                        <p>High</p>
                                        <p class="font-weight-bold" v-if="exchageData.coinhistoryArr">
                                            {{exchageData.coinhistoryArr.price_high_24h}}</p>
                                        <p class="font-weight-bold" v-else>0.00</p>
                                    </li>
                                    <li>
                                        <p>Low</p>
                                        <p class="font-weight-bold" v-if="exchageData.coinhistoryArr">
                                            {{exchageData.coinhistoryArr.price_low_24h}}</p>
                                        <p class="font-weight-bold" v-else>0.00</p>
                                    </li>
                                </ul>

                            </v-col>
                        </v-row>
                    </div>
                    <div class="middle_content_scroll">
                        <v-col cols="12" class="pt-0 pb-2">
                            <div class="volume px-3">
                                 <div class="v_text">Volume:
                                    <div class="font-weight-bold d-inline-block" v-if="exchageData.coinhistoryArr">
                                        <span class="green_txt">{{exchageData.coinhistoryArr.coin_total_volume}}</span> / <span>{{exchageData.coinhistoryArr.basecurrency_total_volume}}</span>
                                    </div> 
                                    <div class="font-weight-bold d-inline-block" v-else>
                                        <span class="green_txt">0.00 {{exchageData.pair_currency}}</span> / <span>0.00 {{exchageData.base_currency}}</span>
                                    </div> 
                                </div>
                            </div>
                        </v-col>
                        <div>
                            <!-- Chart view -->
                            <Chart />
                            <!-- Buy Sell-->
                            <BuySell v-on:childToParent="onChildClick" :key="componentKeyBS"
                                :exchageTotalData="exchageData" :userInfo="loggedUserInfo" />
                            <!-- Buy Sell Orders -->
                            <BuySellOrders v-on:childToParent="ordersClick" />
                            <!-- Order List -->
                            <OrderList v-on:childToParent="onChildClick" />
                            <!-- Order History -->
                            <OrderHistory />
                        </div>
                    </div>                    
                </div>
                <!-- Trade History section -->
                <div class="tradeHistory_col">
          
                    <!-- <div class="carousel_slider p-3">
                        <template>
                            <v-carousel 
                            :show-arrows="false" 
                            cycle
                            height="390"
                            width="300"
                            hide-delimiter-background>                                
                                    <v-carousel-item 
                                    v-for="(item,i) in items" :key="i">
                                        <a :href="item.asrc" target="_blank">
                                            <v-row  align="center" justify="center">
                                                <v-img :src="item.src"></v-img>
                                            </v-row>
                                        </a>
                                    </v-carousel-item>                                
                            </v-carousel>
                        </template>
                    </div> -->
                    <div class="coinlist_div">
                        <CoinList v-on:childToParentBS="onChildClickBS" />
                    </div>
                    <div class="tradehistory_div">
                        <TradeHistory /> 
                    </div>
                </div>
            </div>
            </v-col>

                    <!-- Attention modal popup -->
                    <template>
                        <v-row justify="center" class="float-left mr-5">
                            <v-dialog v-model="dialog" persistent max-width="600px">
                                <v-card justify="center" class="text-center white-bg"
                                    style="border: solid 1px #22E627;">
                                    
                                    <v-card-text class="p-5 black-txt">
                                    <div class="scrolling_wrp" v-bar>
                                        <div>
                                            <img src="../../../assets/images/attention-popup-icon.png" alt="">

                                            <h4 class="headline font-weight-bold my-2">Attention!!</h4>
                                            <!-- <h5 class="subtitle-1 font-weight-bold my-2">You have successfully
                                                registered for
                                                Brexily. </h5> -->
                                            <p class="mb-0">
                                               Dear user, we highly recommend enabling 2FA 
                                            </p>
                                            <p>
                                               for your own security.
                                            </p>
                                            <!-- <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="success" class="w-100" @click="gotoSecurity">Enable 2FA
                                                </v-btn>
                                            </v-card-actions> -->
                                            
                                                <v-btn-toggle class="mt-4 w-100" borderless>
                                                    <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="dialog = false">
                                                        <span class="hidden-sm-and-down">Cancel</span>
                                                    </v-btn>

                                                    <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :href="`/Security`">
                                                        <span class="hidden-sm-and-down">Enable 2FA</span>
                                                    </v-btn>
                                                </v-btn-toggle>
                                        </div>
                                    </div>
                                    </v-card-text>
                                        <v-card-actions class="close_btn_wrp">
                                            <v-icon class="black-txt" @click="dialog = false">mdi-close</v-icon>
                                        </v-card-actions>
                                   
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </template>
        </v-content>
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
          <template>
               <v-row justify="center ">
                <v-dialog v-model="coinInfoModal" persistent max-width="500px" content-class="coinInfo_modal">
                      <v-card class="coinInfo_modal">
                             <v-card-title>
                                <h6 class="text-left black_txt font-weight-bold mt-4">Coin Information - <span class="purple_txt">{{newCoinInfo[0]['coin_name']}} <span>( {{newCoinInfo[0]['coin_symbol']}} )</span></span></h6>
                            </v-card-title>
                      
                            <v-card-text>
                             <v-container class="p-0">
                                    <!-- <div class="triger_close"  @click.stop="coinInfoModal = false">X</div> -->
                                 
                                  
                                        <h5 class="text-uppercase text-left font-weight-bold">
                                        <span>
                                            <!-- {{exchageTotalData.pair_currency} -->
                                        </span>
                                        </h5>
                                        

                                        <table class="table table-bordered">
                                                <tbody>
                                                        <tr>
                                                            <td class="border-right-0" width="50">
                                                                <img v-bind:src="`${adminUrl}/coin_listing_images/${newCoinInfo[0]['coin_image']}`"  width="50"> 
                                                </td>
                                                            <td class="border-left-0 px-0">
                                                                <h6 class="blue_txt font-weight-bold mb-0">{{newCoinInfo[0]['coin_name']}} <span>{{newCoinInfo[0]['coin_symbol']}}</span></h6>
                                                                <!--green_txt classs name-->
                                                                <p v-if= "newCoinInfo['24hrsBackVal'] >= 0" class="mb-2">{{newCoinInfo[0]['coin_price']}} USD <span  class="green_txt">({{newCoinInfo['24hrsBackVal']}}%)</span></p>
                                                                <p class="mb-1" v-else>{{newCoinInfo[0]['coin_price']}} USD <span class="red_txt">({{newCoinInfo['24hrsBackVal']}}%)</span></p>
                                                                <div class="vol_bg font-weight-bold f15" v-if!= "newCoinInfo['coin_valume_amt'] == ''"> <span class="font-weight-normal f12">VOL :</span> 
                                                                    {{newCoinInfo['coin_valume_amt']}} <span class="f12">USD</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                            <tr>
                                                    <td class="text-center p-0 purple_bg " colspan="3">
                                                        <table class="table mb-0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="border-top-0 border-left-0 " style="border-color:#625075">
                                                                        <p class="color-white text-center mb-1">Change</p>
                                                                        <h6 class="text-center font-weight-bold red_txt mb-1" v-if="exchageData.coinhistoryArr && exchageData.coinhistoryArr.coin_change_price.includes('-') == true">{{exchageData.coinhistoryArr.coin_change_price}}%</h6>
                                                                        <h6 class="text-center font-weight-bold green_txt mb-1" v-else-if="exchageData.coinhistoryArr && exchageData.coinhistoryArr.coin_change_price.includes('-') == false">{{exchageData.coinhistoryArr.coin_change_price}}%</h6>
                                                                        <h6 class="text-center font-weight-bold green_txt mb-1" v-else>0.00%</h6>
                                                                    </td>
                                                                    <td class="border-top-0" style="border-color:#625075">
                                                                        <p class="color-white text-center mb-1">High</p>
                                                                        <h6 class="text-center font-weight-bold color-white mb-1" v-if="exchageData.coinhistoryArr">{{exchageData.coinhistoryArr.price_high_24h}}</h6>
                                                                        <h6 class="text-center font-weight-bold color-white mb-1" v-else>0.00</h6>
                                                                    </td>
                                                                    <td class="border-top-0 border-right-0" style="border-color:#625075">
                                                                        <p class="color-white text-center mb-1">Low</p>
                                                                        <h6 class="text-center font-weight-bold color-white mb-1" v-if="exchageData.coinhistoryArr">{{exchageData.coinhistoryArr.price_low_24h}}</h6>
                                                                        <h6 class="text-center font-weight-bold color-white mb-1" v-else>0.00</h6>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                
                                                </tr>
                                                        <!-- <tr>
                                                            <td colspan="2" class="text-center">
                                                                <h6>VOLUME</h6>
                                                                <h6 v-if!= "newCoinInfo['coin_valume_amt'] == ''">{{newCoinInfo['coin_valume_amt']}} <span class="f12">USD</span></h6>
                                                            </td>
                                                        </tr> -->
                                                    </tbody>
                                        </table>

                                        
                                        <div class="coin_description_wrp">
                                            <p> {{ newCoinInfo[0]['coin_description'] }}</p>
                                        </div>
                                        

                                        
                                        
                                        <v-row>
                                            <v-col cols="6">
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['website_url'] != null">
                                                <span class="coinInfo_modal_icons icon1"></span>
                                                <a v-bind:href="newCoinInfo['links']['website_url']" class="widget" target="_blank">Website <span></span></a>
                                            </div>
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['explorer_link'] != null">
                                                <span class="coinInfo_modal_icons icon2"></span>
                                                <a v-bind:href="newCoinInfo['links']['explorer_link']" class="widget" target="_blank">Explorer</a>
                                            </div>
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['bitcoinTalk'] != null">
                                                <span class="coinInfo_modal_icons icon3"></span>
                                                <a v-bind:href="newCoinInfo['links']['bitcoinTalk']" class="widget" target="_blank">BitcoinTalk</a>
                                            </div>
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['github'] != null">
                                                <span class="coinInfo_modal_icons icon4"></span>
                                                <a v-bind:href="newCoinInfo['links']['github']" class="widget" target="_blank">GitHub</a>
                                            </div>
                                            </v-col>
                                            <v-col cols="6">
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['reddit'] != null">
                                                <span class="coinInfo_modal_icons icon5"></span>
                                                <a v-bind:href="newCoinInfo['links']['reddit']"  class="widget" target="_blank">Reddit</a>
                                            </div>
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['coin_market_cap'] != null">
                                                <span class="coinInfo_modal_icons icon6"></span>
                                                <a v-bind:href="newCoinInfo['links']['coin_market_cap']"  class="widget" target="_blank">CoinMarketCap</a>
                                            </div>
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['coin_gecko'] != null">
                                            <span class="coinInfo_modal_icons icon7"></span>
                                                <a v-bind:href="newCoinInfo['links']['coin_gecko']" class="widget" target="_blank">CoinGecko</a>
                                            </div>
                                            <div class="coin_social_info" v-if="newCoinInfo['links']['discord'] != null">
                                                <span class="coinInfo_modal_icons icon8"></span>
                                            <a v-bind:href="newCoinInfo['links']['discord']" class="widget" target="_blank">Discord</a>
                                            </div>
                                            </v-col>
                                        </v-row>
                                        <h5 class="text-left font-weight-bold" v-if="newCoinInfo['links']['facebook'] || newCoinInfo['links']['twitter'] || newCoinInfo['links']['telegram'] || newCoinInfo['links']['youtube']">Social Media</h5>
                                        <div class="text-left">
                                            <a v-if="newCoinInfo['links']['facebook'] != null" v-bind:href="newCoinInfo['links']['facebook']" class="coinInfo_modal_icons fb mr-3" target="_blank"></a>
                                            <a v-if="newCoinInfo['links']['twitter'] != null" v-bind:href="newCoinInfo['links']['twitter']" class="coinInfo_modal_icons tw mr-3" target="_blank"></a>
                                            <a v-if="newCoinInfo['links']['telegram'] != null" v-bind:href="newCoinInfo['links']['telegram']" class="coinInfo_modal_icons tg mr-3" target="_blank"></a>
                                            <a v-if="newCoinInfo['links']['youtube'] != null" v-bind:href="newCoinInfo['links']['youtube']" class="coinInfo_modal_icons yt mr-3" target="_blank"></a>
                                            <!--<a href="" class="coinInfo_modal_icons fb mr-3"></a>
                                            <a href="" class="coinInfo_modal_icons tw mr-3"></a>
                                            <a href="" class="coinInfo_modal_icons tg mr-3"></a>
                                            <a href="" class="coinInfo_modal_icons yt mr-3"></a> -->
                                        </div>
                                   
                               
                             </v-container>
                            </v-card-text>
                                  <v-card-actions class="close_btn_wrp">
                                    <v-icon class="black-txt" @click="coinInfoModal = false">mdi-close</v-icon>
                                </v-card-actions>
                    
                      </v-card>
                </v-dialog>
               </v-row>
        </template>
        <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
            {{ snackbar_text }}

            <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
            <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
                Close
            </v-btn> -->
        </v-snackbar>
    </v-app>
</template>

<script>
    import $ from 'jquery';
    import Vue from 'vue';
    import axios from 'axios'
    import qs from 'qs'
    import TopBar from '../../User_Dashboard/TopBar';
    import CoinList from '../../User_Dashboard/Dashboard/CoinList';
    import TradeHistory from '../../User_Dashboard/Dashboard/TradeHistory';
    import Chart from '../../User_Dashboard/Dashboard/TVChartContainer';
    import BuySell from '../../User_Dashboard/Dashboard/BuySell';
    import BuySellOrders from '../../User_Dashboard/Dashboard/BuySellOrders';
    import OrderList from '../../User_Dashboard/Dashboard/OrderList';
    import OrderHistory from '../../User_Dashboard/Dashboard/OrderHistory';
    import NProgress from 'nprogress';
    window.Pusher = require('pusher-js');
    import Echo from 'laravel-echo'
    export default {
        name: 'Trade',
        components: {
            TopBar,
            CoinList,
            TradeHistory,
            Chart,
            BuySell,
            BuySellOrders,
            OrderList,
            OrderHistory,
        },

        data: () => ({
            snackbar: false,
            snackbar_text: "",
            vertical: true,
            timeout: 6000,
            color: "yellow",
            x: 'right',
            y: 'top',
            market_symbol: '',
            last_market_symbol: '',
            adminUrl: '',
            componentKey: 0,
            componentKeyBS: 0,
            overlay: false,
            coinInfoModal: false,
            absolute: true,
            exchageData: [],
            testval: '',
            dialog: false,
            loggedUserInfo: [],
            paircurrency: '',
            coinInfo: [],
            newCoinInfo:[],
            items: [{
                    src: '/adds/brexily-ads-01.jpg',
                    asrc: 'https://brexily.com/#uniquefeatures'
                },
                {
                    src: '/adds/brexily-ads-02.jpg',
                    asrc: ''
                },
                {
                    src: '/adds/brexily-ads-03.jpg',
                    asrc: ''
                },
                {
                    src: '/adds/brexily-ads-04.jpg',
                    asrc: 'https://brexily.com/tokenlisting/'
                },
                {
                    src: '/adds/brexily-ads-05.jpg',
                    asrc: 'https://trullion.org/'
                }
            ],
            showArrows: false,
            hideDelimiters: true,
            cycle: true,
            interval: 3000,
        }),
        created() {
            this.adminUrl = process.env.VUE_APP_ADMIN_URL
            this.getUserInfo()
            this.myResult = this.$route.path.split("/");
            this.getExchangeData(this.myResult[2]);
            window.sockets = {};
                        //this.paircurrency = this.$route.path.split("/")[2].split("_")[0];
                        this.paircurrency = this.$route.path.split("/")[2];
            this.coinInfoData(this.paircurrency)
            //this.gotoSecurity()

        },
        watch: {
            $route(to) {

                this.last_market_symbol = this.market_symbol
                this.market_symbol = to.path.split("/")[2];
                this.getExchangeData(this.market_symbol)
            this.paircurrency = this.$route.path.split("/")[2];
            this.coinInfoData(this.paircurrency)

                window.sockets.old.leave("GetExchange_"+this.last_market_symbol);
               
                window.Echo.channel('GetExchange_'+this.market_symbol)
                .listen('GetExchangeEvent', (e) => {
                    if (e.message.market_symbol == this.market_symbol) {
                        this.exchageData.coinhistoryArr = e.message.Result.coinhistoryArr;
                    }
                });

                window.sockets.old = window.Echo;
                
            }
        },
        mounted: function () {

            
        
            // let google_2fa_key = localStorage.getItem('google_2fa_key');//this.$store.getters.google_2fa_key
            // let Token2fa_validation_initial = localStorage.getItem('Token2fa_validation_initial');//this.$store.getters.Token2fa_validation_initial
            // let first_name = localStorage.getItem('first_name');//this.$store.getters.first_name
            // if(google_2fa_key == "" && Token2fa_validation_initial == 'D'){
            //     this.dialog = true
            // }else if(google_2fa_key && Token2fa_validation_initial == 'D'){
            //     this.$router.push("/Security");
            // }else if(first_name == ""){
            //         this.$router.push("/Profile");
            //     }
            
            this.market_symbol = this.$route.path.split("/")[2];
            this.websocketConnection()
            
               $(document).ready(function () {
                $(".triger_open").hide();
                $(".triger").click(function () {
                $(".triger_open").show();
                $('body').addClass('body_scroll');
                });
                $(".triger_close").click(function () {
                $(".triger_open").hide();
                $('body').removeClass('body_scroll');
                });
            });
        },
        beforeDestroy: function(){
            window.sockets.old.leave("GetExchange_"+this.market_symbol);
            window.Echo.disconnect();
            },
        methods: {
            websocketConnection(){
                let auth_token = this.$store.getters.authToken;
                        window.Echo = new Echo({
                        broadcaster: 'pusher',
                        key: process.env.VUE_APP_PUSHER_KEY,
                        wsHost: process.env.VUE_APP_WEBSOCKET_HOST,
                        wssPort: process.env.VUE_APP_WEBSOCKET_PORT,
                        disableStats: true,
                        enabledTransports: ['ws', 'wss'],
                        cluster: 'mt1',
                        authEndpoint: process.env.VUE_APP_AUTH_ENDPOINT,
                        "apiOriginAllow": {
                            "allowCors" : true,
                            "allowOrigin" : process.env.VUE_APP_AUTH_ENDPOINT,
                            "allowMethods" : "GET, POST",
                            "allowHeaders" : "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
                            },
                        auth: {
                            headers: {
                            "accept": "application/json",
                            'Access-Control-Allow-Origin': '*',
                            "Authorization": "Bearer " + auth_token
                            }
                        }
                        });

                        window.Echo.channel('GetExchange_'+this.market_symbol)
                            .listen('GetExchangeEvent', (e) => {
                                if (e.message.market_symbol == this.market_symbol) {
                                    this.exchageData.coinhistoryArr = e.message.Result.coinhistoryArr;
                                }
                            });
                        window.sockets.old = window.Echo;
                },
            coinInfoData: function (e) {
                var self = this;
                self.overlay = true
                let auth_token = this.$store.getters.authToken;
                let bodyFormData = {
                    "short_name": e
                }
                if (auth_token) {

                    const URL = process.env.VUE_APP_API_URL + "coinInfo";
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
                            self.overlay = false
                            self.newCoinInfo =  response.data.Result
                        })
                        .catch(function () {
                            //handle error
                        });
                } else {
                    window.location.href = "/";
                }

            },


            getUserInfo: function () {
                var self = this;
                let auth_token = this.$store.getters.authToken;
                NProgress.start()
                if (auth_token) {

                    const URL = process.env.VUE_APP_API_URL + "userDetails";
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done()
                            self.loggedUserInfo = response.data.Result;
                            // if (response.data.Result.Twofa_status == 'D') {
                            //     self.dialog = true
                            // }
                            // if (response.data.Result.Twofa_status == 'D' && response.data.Result.first_name ==
                            //     "") {
                            //     self.dialog = true
                            // } else if (response.data.Result.Twofa_status == 'A' && response.data.Result
                            //     .first_name == "") {
                            //     self.$router.push("/Profile");
                            // } else if (response.data.Result.Twofa_status == 'A') {
                            //     self.dialog = false
                            // } else {
                            //     self.dialog = false
                            // }
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
            getExchangeData: function (e) {
                var self = this;
                $('body').css('overflow','hidden')
                self.overlay = true
                let auth_token = this.$store.getters.authToken;
                let bodyFormData = {
                    "market": e
                }
                if (auth_token) {

                    const URL = process.env.VUE_APP_API_URL + "getExchange";
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
                            $('body').css('overflow','')
                            self.overlay = false
                            self.exchageData = response.data.Result
                        })
                        .catch(function (err) {
                            $('body').css('overflow','')
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
                            else if(err.response.data.Result == 'Invalid Market Symbol'){
                                
                                self.$router.push("/404");
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
            gotoSecurity: function () {
                //var self = this;
                let auth_token = this.$store.getters.authToken;

                if (auth_token) {

                    const URL = process.env.VUE_APP_API_URL + "add-2FA-authentication";
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                        })
                        .then(function (response) {
                            //handle success 
                            localStorage.setItem('google_2fa_key', response.data.Result.google_secreate_key)
                            //self.$store.commit('getters',{'google_2fa_key': response.data.Result.google_secreate_key})
                           //setTimeout(() => {
                           //self.$router.push('/Security')
                           // }, 2000)
                        })
                        .catch(function () {
                            //handle error
                            window.location.href = "/";
                        });
                } else {
                    window.location.href = "/";
                }

            },
            onChildClick(value) {
                console.log(value)
                this.componentKey += 1;
                this.myResult = this.$route.path.split("/");
                this.getExchangeData(this.myResult[2])
            },
            onChildClickBS(value) {
                console.log(value)
                this.componentKeyBS += 1;
            }, 
            coinInfoREfresh(value) {
                console.log(value)
                
                this.paircurrency = this.$route.path.split("/")[2];
                this.coinInfoData(this.paircurrency)
                
            },
            ordersClick(value){
               Vue.set(this.exchageData, 'ord_price', value.price)
               Vue.set(this.exchageData, 'ord_amount', value.amount)
                this.componentKeyBS += 1;
            }
        }
    };
</script>

<style lang="css" scoped>
    @import "../../../assets/css/dashboard.css";
</style>
