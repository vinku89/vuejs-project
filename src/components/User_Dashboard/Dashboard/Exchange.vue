<template>
    <v-app class="frame-pt">
        <TopMenu />
        <!--<v-navigation-drawer hide-overlay permanent fixed clipped app class="frame-pt trade_brrt h-100">
            <BcpcListing v-on:childToParentBS="onChildClickBS" />
        </v-navigation-drawer>-->

        <v-content class="pt-0">
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
                                            v-if="exchageData.coinhistoryArr && exchageData.coinhistoryArr.coin_change_price.includes('-') == true">
                                            {{exchageData.coinhistoryArr.coin_change_price}}%</p>
                                        <p class="font-weight-bold green_txt"
                                            v-else-if="exchageData.coinhistoryArr && exchageData.coinhistoryArr.coin_change_price.includes('-') == false">
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
                                 <div class="f14">Volume:
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
                            <BuySellWallet :exchageTotalData="exchageData" :key="componentKeyBS" />
                            <!-- Buy Sell Orders -->
                            <BuySellOrders v-on:childToParent="ordersClick"/>
                            <!-- Order List -->
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
                        <BcpcListing v-on:childToParentBS="onChildClickBS" />
                    </div>
                    <div class="tradehistory_div">
                        <TradeHistory /> 
                    </div>

                </div>
            </div>
            </v-col>

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
    </v-app>
</template>

<script>
    import $ from 'jquery';
    import Vue from 'vue';
    import axios from 'axios'
    import qs from 'qs'
    import TopMenu from '../../User_Dashboard/TopMenu';
    import BcpcListing from '../../User_Dashboard/Dashboard/BcpcListing';
    import TradeHistory from '../../User_Dashboard/Dashboard/TradeHistory';
    import Chart from '../../User_Dashboard/Dashboard/TVChartContainer';
    import BuySellWallet from '../../User_Dashboard/Dashboard/BuySellWallet';
    import BuySellOrders from '../../User_Dashboard/Dashboard/BuySellOrders';
    window.Pusher = require('pusher-js');
    //import Echo from 'laravel-echo'
    export default {
        name: 'Exchange',
        components: {
            TopMenu,
            BcpcListing,
            TradeHistory,
            Chart,
            BuySellWallet,
            BuySellOrders,
        },

        data: () => ({
            market_symbol: '',
            last_market_symbol: '',
            adminUrl: '',
            componentKey: 0,
            componentKeyBS: 0,
             coinInfoModal: false,
            overlay: false,
            absolute: true,
            exchageData: [],
            testval: '',
            loggedUserInfo: [],
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
            this.myResult = this.$route.path.split("/");
            this.getExchangeData(this.myResult[2]);
              this.paircurrency = this.$route.path.split("/")[2];
            this.coinInfoData(this.paircurrency)
            window.sockets = {};
        },
        watch: {
            $route(to) {

                this.last_market_symbol = this.market_symbol
                this.market_symbol = to.path.split("/")[2];
                this.getExchangeData(this.market_symbol)

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
        beforeDestroy: function(){
            window.sockets.old.leave("GetExchange_"+this.last_market_symbol);
            window.Echo.disconnect();
        },
        mounted: function () {
            
            this.market_symbol = this.$route.path.split("/")[2];
            this.websocketConnection()
        },
        methods: {
            websocketConnection(){

                        // window.Echo = new Echo({
                        //   broadcaster: 'pusher',
                        //   key: process.env.VUE_APP_PUSHER_KEY,
                        //   wsHost: process.env.VUE_APP_WEBSOCKET_HOST,
                        //   wssPort: process.env.VUE_APP_WEBSOCKET_PORT,
                        //   disableStats: true
                        // });

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
                //let auth_token = this.$store.getters.authToken;
                let bodyFormData = {
                    "short_name": e
                }
               // if (auth_token) {

                   const URL = process.env.VUE_APP_API_URL + "coinInfo";
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
                            self.overlay = false
                            self.newCoinInfo =  response.data.Result
                        })
                        .catch(function () {
                            //handle error
                        });
              //  } else {
                //    window.location.href = "/";
                //}

            },

            getExchangeData: function (e) {
                var self = this;
                $('body').css('overflow','hidden')
                self.overlay = true
               // let auth_token = this.$store.getters.authToken;
                let bodyFormData = {
                    "market": e
                }
               // if (auth_token) {

                    const URL = process.env.VUE_APP_API_URL + "getExchangeDetails";
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
                            $('body').css('overflow','')
                            self.overlay = false
                            self.exchageData = response.data.Result
                        })
                        .catch(function () {
                            window.location.href = "/";
                        });
                // } else {
                //     window.location.href = "/";
                // }

            },
            onChildClick(value) {
                console.log(value)
                this.componentKey += 1;
                this.myResult = this.$route.path.split("/");
                //this.getExchangeData(this.myResult[2])
            },
            onChildClickBS(value) {
                console.log(value)
                this.componentKeyBS += 1;
            },
            ordersClick(value){
               Vue.set(this.exchageData, 'ord_price', value.price)
               Vue.set(this.exchageData, 'ord_amount', value.amount)
                this.componentKeyBS += 1;
            },
            coinInfoREfresh(value) {
                console.log(value)
                
                this.paircurrency = this.$route.path.split("/")[2];
                this.coinInfoData(this.paircurrency)
                
            }
        }
    };
</script>

<style lang="css" scoped>
    @import "../../../assets/css/dashboard.css";
</style>
