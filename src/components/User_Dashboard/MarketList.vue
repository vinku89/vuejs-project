<template>
  <v-app>
     <TopMenu/>
    <v-content>
      <v-container>
        <v-col cols="12" xl="10" offset-xl="1">
          <h4 class="font-weight-bold mb-4 mt-5">Market</h4>
          <v-col cols="12" class="p-0">
            <div class="purple_bg p-2 mb-8">
              <v-row>
                <v-col cols="12" sm="7">
                    <img src="../../assets/images/trading_icon.png" height="100" class="float-left ml-3">
                    <div class="ml-5 float-left">
                      <h6 class="font-weight-bold text-uppercase mt-4">Total Trading</h6>
                     <!-- <h2 class="font-weight-bold" v-if= "isHistorycal=true">${{historicalMarketData["total_activeTradingTotalAmt"]}} <span class="font-weight-normal f20">USD</span></h2> -->
                     <h2 class="font-weight-bold" v-if="marketapiKey == 'historicaldata'">${{addCommas(totValumehAmt,2)}} <span class="font-weight-normal f20">USD</span></h2>
                     <h2 class="font-weight-bold" v-else>${{allMarketData["total_activeTradingTotalAmt"]}} <span class="font-weight-normal f20">USD</span></h2>
                     </div>
                </v-col>
                <v-col cols="12" sm="5">
                   <!-- <h2 class="font-weight-bold mt-10" v-if= isHistorycal>{{historicalMarketData["btcTotalAmt"]}} <span class="font-weight-normal f20">BTC</span></h2> -->
                   <h2 class="font-weight-bold mt-10" v-if="marketapiKey == 'historicaldata'">{{addCommas(totvalumeOfBtcAmt,8)}} <span class="font-weight-normal f20">BTC</span></h2>
                   <h2 class="font-weight-bold mt-10" v-else>{{allMarketData["btcTotalAmt"]}} <span class="font-weight-normal f20">BTC</span></h2>
                </v-col>
              </v-row>
            </div>

            <template>
              <v-card class="trading_tabs">

                <v-tabs
                    background-color="transparent"
                    grow
                >
                  <v-tab v-on:click="activeData">
                    ACTIVE TRADING
                  </v-tab>
                  <v-tab v-on:click="historicalData">
                    HISTORICAL DATA
                  </v-tab >

            <!-- Active Trading -->
                  <v-tab-item class="mt-6">
                    <v-card flat>
                      <h5 class="font-weight-bold mb-6">Active Trading</h5>
                      <template>
                      <v-card class="market_subtabs">
                        <v-tabs
                           background-color="transparent"
                        >
                          <v-tab v-on:click="marketApical('all')">
                            All Markets
                          </v-tab>
                          <v-tab  v-on:click="marketApical('btc')">
                            BTC Markets
                          </v-tab>
                          <v-tab v-on:click="marketApical('eth')">
                            ETH Markets   
                          </v-tab>
                           <v-tab v-on:click="marketApical('evr')">
                            EVR Markets
                          </v-tab>
                           <v-tab v-on:click="marketApical('ltc')">
                            LTC Markets
                          </v-tab>
                           <v-tab v-on:click="marketApical('usdt')">
                            USDT Markets
                          </v-tab>

                        <!-- All Markets -->
                          <v-tab-item class="market_table mt-8">
                            <v-card flat>
                              <template>
                                <v-simple-table >
                                    <template v-slot:default >
                                        <thead>
                                            <tr>
                                                <th class="text-left pl-4 font-weight-normal">S.NO</th>
                                                <th class="text-left font-weight-normal">Currency</th>
                                                <th class="text-left font-weight-normal">Pair</th>
                                                <th class="text-right font-weight-normal">Current Price</th>
                                                <th class="text-right font-weight-normal">High</th>
                                                <th class="text-right font-weight-normal">Low</th>
                                                <th class="text-right font-weight-normal">Volume</th>
                                                <th class="text-left font-weight-normal">Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          <tr  v-for='(index , i) in allMarketData["active_tading"]' :key='i'>
                                            <td class="text-left pl-4">{{i+1}}</td>
                                            <td class="text-left selected_crypto_wrp">
                                              <img v-bind:src="`${adminUrl}/coin_listing_images/${index.coin_image}`" class="float-left mr-2" width="20">
                                              {{index.coin_name}}({{index.coin_symbol}})
                                            </td>
                                            <td class="text-left green_txt">{{index.market_symbol.replace('_' , "/")}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.currentPrice}}</td>
                                            <td class="text-right">$ {{index.price_high_24h}}</td>
                                            <td class="text-right">$ {{index.price_low_24h}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.valumeAmt}}</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                          <!--<tr>
                                            <td class="text-left pl-4">2</td>
                                            <td class="text-left">
                                              <img src="../../assets/images/currency_eth.png" class="float-left mr-2" width="20">
                                              Ethereum (ETH)
                                            </td>
                                            <td class="text-left green_txt"><strong>ETH</strong>/USD</td>
                                            <td class="text-right font-weight-bold">$ 229.80</td>
                                            <td class="text-right">$ 228.50</td>
                                            <td class="text-right">$ 227.01</td>
                                            <td class="text-right font-weight-bold">$ 1,462,285,600</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                          <tr>
                                              <td class="text-left pl-4">2</td>
                                              <td class="text-left">
                                                <img src="../../assets/images/currency_ltc.png" class="float-left mr-2" width="20">
                                                Litecoin (LTC)
                                              </td>
                                              <td class="text-left green_txt"><strong>BCH</strong>/USD</td>
                                              <td class="text-right font-weight-bold">$ 229.80</td>
                                              <td class="text-right">$ 228.50</td>
                                              <td class="text-right">$ 227.01</td>
                                              <td class="text-right font-weight-bold">$ 1,462,285,600</td>
                                              <td class="text-left">Recently</td>
                                          </tr>
                                           <tr>
                                              <td class="text-left pl-4">2</td>
                                              <td class="text-left">
                                                <img src="../../assets/images/currency_evr.png" class="float-left mr-2" width="20">
                                                Everus (EVR)
                                              </td>
                                              <td class="text-left green_txt"><strong>BCH</strong>/USD</td>
                                              <td class="text-right font-weight-bold">$ 229.80</td>
                                              <td class="text-right">$ 228.50</td>
                                              <td class="text-right">$ 227.01</td>
                                              <td class="text-right font-weight-bold">$ 1,462,285,600</td>
                                              <td class="text-left">Recently</td>
                                          </tr> -->
                                          <tr>
                                              <td class="text-left pl-4">&nbsp;</td>
                                              <td class="text-left">
                                               &nbsp;
                                              </td>
                                              <td class="text-left green_txt"> &nbsp;</td>
                                              <td class="text-right font-weight-bold"> &nbsp;</td>
                                              
                                              <td class="text-right">Total:</td>
                                              <td class="text-right font-weight-bold" colspan="2">$ {{allMarketData['total_sum_volume']}}</td>
                                              <td class="text-left"> &nbsp;</td>
                                          </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>

                            </v-card>
                          </v-tab-item>
                        <!-- BTC Markets   -->
                          <v-tab-item class="market_table mt-8">
                            <v-card flat>
                               <template>
                                  <v-simple-table >
                                      <template v-slot:default >
                                          <thead>
                                              <tr>
                                                  <th class="text-left pl-4 font-weight-normal">Rank</th>
                                                  <th class="text-left font-weight-normal">Currency</th>
                                                  <th class="text-left font-weight-normal">Pair</th>
                                                  <th class="text-right font-weight-normal">Current Price</th>
                                                  <th class="text-right font-weight-normal">High</th>
                                                  <th class="text-right font-weight-normal">Low</th>
                                                  <th class="text-right font-weight-normal">Volume</th>
                                                  <th class="text-left font-weight-normal">Update</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                            
                                          <tr  v-for='(index , i) in allMarketData["active_tading"]' :key='i'>
                                            <td class="text-left pl-4">{{i+1}}</td>
                                            <td class="text-left selected_crypto_wrp">
                                              <img v-bind:src="`${adminUrl}/coin_listing_images/${index.coin_image}`" class="float-left mr-2" width="20">
                                              {{index.coin_name}}({{index.coin_symbol}})
                                            </td>
                                            <td class="text-left green_txt">{{index.market_symbol.replace('_' , "/")}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.currentPrice}}</td>
                                            <td class="text-right">$ {{index.price_high_24h}}</td>
                                            <td class="text-right">$ {{index.price_low_24h}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.valumeAmt}}</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                            <tr>
                                              <td class="text-left pl-4">&nbsp;</td>
                                              <td class="text-left">
                                               &nbsp;
                                              </td>
                                              <td class="text-left green_txt"> &nbsp;</td>
                                              <td class="text-right font-weight-bold"> &nbsp;</td>
                                              
                                              <td class="text-right">Total:</td>
                                              <td class="text-right font-weight-bold" colspan="2">$ {{allMarketData['total_sum_volume']}}</td>
                                              <td class="text-left"> &nbsp;</td>
                                          </tr>
                                          </tbody>
                                      </template>
                                  </v-simple-table>
                                </template>
                            </v-card>
                          </v-tab-item>

                        <!-- ETH Markets  -->
                          <v-tab-item class="market_table mt-8">
                            <v-card flat>
                                <template>
                                <v-simple-table >
                                    <template v-slot:default >
                                        <thead>
                                            <tr>
                                                <th class="text-left pl-4 font-weight-normal">Rank</th>
                                                <th class="text-left font-weight-normal">Currency</th>
                                                <th class="text-left font-weight-normal">Pair</th>
                                                <th class="text-right font-weight-normal">Current Price</th>
                                                <th class="text-right font-weight-normal">High</th>
                                                <th class="text-right font-weight-normal">Low</th>
                                                <th class="text-right font-weight-normal">Volume</th>
                                                <th class="text-left font-weight-normal">Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                       
                                          <tr  v-for='(index , i) in allMarketData["active_tading"]' :key='i'>
                                            <td class="text-left pl-4">{{i+1}}</td>
                                            <td class="text-left selected_crypto_wrp">
                                              <img v-bind:src="`${adminUrl}/coin_listing_images/${index.coin_image}`" class="float-left mr-2" width="20">
                                              {{index.coin_name}}({{index.coin_symbol}})
                                            </td>
                                            <td class="text-left green_txt">{{index.market_symbol.replace('_' , "/")}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.currentPrice}}</td>
                                            <td class="text-right">$ {{index.price_high_24h}}</td>
                                            <td class="text-right">$ {{index.price_low_24h}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.valumeAmt}}</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                           <tr>
                                              <td class="text-left pl-4">&nbsp;</td>
                                              <td class="text-left">
                                               &nbsp;
                                              </td>
                                              <td class="text-left green_txt"> &nbsp;</td>
                                              <td class="text-right font-weight-bold"> &nbsp;</td>
                                              
                                              <td class="text-right">Total:</td>
                                              <td class="text-right font-weight-bold" colspan="2">$ {{allMarketData['total_sum_volume']}}</td>
                                              <td class="text-left"> &nbsp;</td>
                                          </tr>
                                         <!-- <tr>
                                            <td class="text-left pl-4">2</td>
                                            <td class="text-left">
                                              <img src="../../assets/images/currency_eth.png" class="float-left mr-2" width="20">
                                              Ethereum (ETH)
                                            </td>
                                            <td class="text-left green_txt"><strong>ETH</strong>/USD</td>
                                            <td class="text-right font-weight-bold">$ 229.80</td>
                                            <td class="text-right">$ 228.50</td>
                                            <td class="text-right">$ 227.01</td>
                                            <td class="text-right font-weight-bold">$ 1,462,285,600</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                          <tr>
                                            <td class="text-left pl-4">2</td>
                                            <td class="text-left">
                                              <img src="../../assets/images/currency_eth.png" class="float-left mr-2" width="20">
                                              Ethereum (ETH)
                                            </td>
                                            <td class="text-left green_txt"><strong>ETH</strong>/USD</td>
                                            <td class="text-right font-weight-bold">$ 229.80</td>
                                            <td class="text-right">$ 228.50</td>
                                            <td class="text-right">$ 227.01</td>
                                            <td class="text-right font-weight-bold">$ 1,462,285,600</td>
                                            <td class="text-left">Recently</td>
                                          </tr> -->
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            </v-card>
                          </v-tab-item>
                         <!-- EVR Markets  -->
                          <v-tab-item class="market_table mt-8">
                            <v-card flat>
                                <template>
                                <v-simple-table >
                                    <template v-slot:default >
                                        <thead>
                                            <tr>
                                                <th class="text-left pl-4 font-weight-normal">Rank</th>
                                                <th class="text-left font-weight-normal">Currency</th>
                                                <th class="text-left font-weight-normal">Pair</th>
                                                <th class="text-right font-weight-normal">Current Price</th>
                                                <th class="text-right font-weight-normal">High</th>
                                                <th class="text-right font-weight-normal">Low</th>
                                                <th class="text-right font-weight-normal">Volume</th>
                                                <th class="text-left font-weight-normal">Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                       
                                          <tr  v-for='(index , i) in allMarketData["active_tading"]' :key='i'>
                                            <td class="text-left pl-4">{{i+1}}</td>
                                            <td class="text-left selected_crypto_wrp">
                                              <img v-bind:src="`${adminUrl}/coin_listing_images/${index.coin_image}`" class="float-left mr-2" width="20">
                                              {{index.coin_name}}({{index.coin_symbol}})
                                            </td>
                                            <td class="text-left green_txt">{{index.market_symbol.replace('_' , "/")}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.currentPrice}}</td>
                                            <td class="text-right">$ {{index.price_high_24h}}</td>
                                            <td class="text-right">$ {{index.price_low_24h}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.valumeAmt}}</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                         <tr>
                                              <td class="text-left pl-4">&nbsp;</td>
                                              <td class="text-left">
                                               &nbsp;
                                              </td>
                                              <td class="text-left green_txt"> &nbsp;</td>
                                              <td class="text-right font-weight-bold"> &nbsp;</td>
                                              
                                              <td class="text-right">Total:</td>
                                              <td class="text-right font-weight-bold" colspan="2">$ {{allMarketData['total_sum_volume']}}</td>
                                              <td class="text-left"> &nbsp;</td>
                                          </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            </v-card>
                          </v-tab-item>
                        <!-- LTC Markets  -->
                          <v-tab-item class="market_table mt-8">
                            <v-card flat>
                                <template>
                                <v-simple-table >
                                    <template v-slot:default >
                                        <thead>
                                          
                                            <tr>
                                                <th class="text-left pl-4 font-weight-normal">Rank</th>
                                                <th class="text-left font-weight-normal">Currency</th>
                                                <th class="text-left font-weight-normal">Pair</th>
                                                <th class="text-right font-weight-normal">Current Price</th>
                                                <th class="text-right font-weight-normal">High</th>
                                                <th class="text-right font-weight-normal">Low</th>
                                                <th class="text-right font-weight-normal">Volume</th>
                                                <th class="text-left font-weight-normal">Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                       
                                          <tr  v-for='(index , i) in allMarketData["active_tading"]' :key='i'>
                                            <td class="text-left pl-4">{{i+1}}</td>
                                            <td class="text-left selected_crypto_wrp">
                                              <img v-bind:src="`${adminUrl}/coin_listing_images/${index.coin_image}`" class="float-left mr-2" width="20">
                                              {{index.coin_name}}({{index.coin_symbol}})
                                            </td>
                                            <td class="text-left green_txt">{{index.market_symbol.replace('_' , "/")}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.currentPrice}}</td>
                                            <td class="text-right">$ {{index.price_high_24h}}</td>
                                            <td class="text-right">$ {{index.price_low_24h}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.valumeAmt}}</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                           <tr>
                                              <td class="text-left pl-4">&nbsp;</td>
                                              <td class="text-left">
                                               &nbsp;
                                              </td>
                                              <td class="text-left green_txt"> &nbsp;</td>
                                              <td class="text-right font-weight-bold"> &nbsp;</td>
                                              
                                              <td class="text-right">Total:</td>
                                              <td class="text-right font-weight-bold" colspan="2">$ {{allMarketData['total_sum_volume']}}</td>
                                              <td class="text-left"> &nbsp;</td>
                                          </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            </v-card>
                          </v-tab-item>

                        <!-- USDT Markets -->
                           <v-tab-item class="market_table mt-8">
                            <v-card flat>
                                <template>
                                <v-simple-table >
                                    <template v-slot:default >
                                        <thead>
                                            <tr>
                                                <th class="text-left pl-4 font-weight-normal">Rank</th>
                                                <th class="text-left font-weight-normal">Currency</th>
                                                <th class="text-left font-weight-normal">Pair</th>
                                                <th class="text-right font-weight-normal">Current Price</th>
                                                <th class="text-right font-weight-normal">High</th>
                                                <th class="text-right font-weight-normal">Low</th>
                                                <th class="text-right font-weight-normal">Volume</th>
                                                <th class="text-left font-weight-normal">Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          
                                          <tr  v-for='(index , i) in allMarketData["active_tading"]' :key='i'>
                                            <td class="text-left pl-4">{{i+1}}</td>
                                            <td class="text-left selected_crypto_wrp">
                                              <img v-bind:src="`${adminUrl}/coin_listing_images/${index.coin_image}`" class="float-left mr-2" width="20">
                                              {{index.coin_name}}({{index.coin_symbol}})
                                            </td>
                                            <td class="text-left green_txt">{{index.market_symbol.replace('_' , "/")}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.currentPrice}}</td>
                                            <td class="text-right">$ {{index.price_high_24h}}</td>
                                            <td class="text-right">$ {{index.price_low_24h}}</td>
                                            <td class="text-right font-weight-bold">$ {{index.valumeAmt}}</td>
                                            <td class="text-left">Recently</td>
                                          </tr>
                                 <tr>
                                              <td class="text-left pl-4">&nbsp;</td>
                                              <td class="text-left">
                                               &nbsp;
                                              </td>
                                              <td class="text-left green_txt"> &nbsp;</td>
                                              <td class="text-right font-weight-bold"> &nbsp;</td>
                                              
                                              <td class="text-right">Total:</td>
                                              <td class="text-right font-weight-bold" colspan="2">$ {{allMarketData['total_sum_volume']}}</td>
                                              <td class="text-left"> &nbsp;</td>
                                          </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            </v-card>
                          </v-tab-item>
                        </v-tabs>
                      </v-card>
               </template>
                    </v-card>
                  </v-tab-item>
                  
                  <!--Historical Data-->
                  <v-tab-item class="market_table mt-6">
                    <v-card flat>
                      <h5 class="font-weight-bold mb-6">Historical Data</h5>
                          <template>
                                      <v-simple-table >
                                          <template v-slot:default >
                                              <thead>
                                                  <tr>
                                                      <th class="text-left font-weight-normal pl-4">DATE</th>
                                                      <th class="text-right font-weight-normal">TOTAL TRADING VOLUME (USD)</th>
                                                      <th class="text-right font-weight-normal">TRADING VOLUME (BTC)</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                              <tr  v-for='(index , i) in allMarketData["active_tading"]' :key='i'>
                                                <td class="text-left pl-4">{{index.DateOnl}}</td>
                                                <td v-if="index.valumehAmt" class="text-right font-weight-bold">$ {{index.valumehAmt}}</td>
                                                <td class="text-right ">{{index.valumeOfBtcAmt}}</td>
                                              </tr>


                                            <!--  <tr >
                                                <td class="text-left pl-4">2010/03/10</td>
                                                <td class="text-right font-weight-bold">$ 10000</td>
                                                <td class="text-right ">23.123123123</td>
                                              </tr>

                                              <tr >
                                                <td class="text-left pl-4">2010/03/10</td>
                                                <td class="text-right font-weight-bold">$ 10000</td>
                                                <td class="text-right ">23.123123123</td>
                                              </tr> -->

                                              </tbody>
                                          </template>
                                      </v-simple-table>
                            </template>
                    </v-card>
                  </v-tab-item>

                </v-tabs>
              </v-card>
            </template>
          </v-col>
        </v-col>
      </v-container>
    </v-content>
        <v-overlay :value="overlay" style="z-index:205">
          <!-- <v-img src="../../assets/images/loader.png" width="60" height="60"></v-img>-->
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

  </v-app>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
import TopMenu from '../User_Dashboard/TopMenu';
import NProgress from 'nprogress';

export default {
  name: 'Market',
  components: {
    TopMenu,
  },

  data: () => ({
     
allMarketData:[] ,
historicalMarketData:[],
overlay: false,
 absolute: true,
 isHistorycal:false,
 marketapiKey: ''

  }),
  
  
created() {
            this.adminUrl = process.env.VUE_APP_ADMIN_URL
            this.marketApical('all')
           // this.marketApicalHistoricaldata('historicaldata')
           // this.myResult = this.$route.path.split("/");
           },
        methods: {



            marketApical: function (e) {
            //  console.log(''+e);

              if (e!= "historicaldata")
              {
                this.isHistorycal = false
              this.marketapiKey = e
              } 
              else {
               this.isHistorycal = true 
              }
                var self = this;
                //let auth_token = this.$store.getters.authToken;
                let bodyFormData = {
                    "currency_Type": e
                }
              
                self.overlay = true
              NProgress.start()
                //if (auth_token) {

                    const URL = process.env.VUE_APP_API_URL + "marketCurrncyList";
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
                            NProgress.done()
                            
                self.overlay = false
                            self.allMarketData = response.data.Result;
                            if(e == "historicaldata"){
                              self.marketapiKey = e
                               let res = response.data.Result && response.data.Result['active_tading'] ? response.data.Result['active_tading'] : {};
                               
                               let totValumehAmt = 0;
                               let totvalumeOfBtcAmt = 0;
                               let objData = Object.values(res);
                               for(let data of objData) {
                                  totValumehAmt += parseFloat(data.valumehAmt)
                                  totvalumeOfBtcAmt += parseFloat(data.valumeOfBtcAmt)
                                }
                                self.totValumehAmt = totValumehAmt;
                                self.totvalumeOfBtcAmt = totvalumeOfBtcAmt;
                            }
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
                        .catch(function () {
                            //handle error
                        });
                // } else {
                //     window.location.href = "/";
                // }

            }
            ,
            
            activeData(value) {
                console.log(value)
                this.marketApical(this.marketapiKey)
                
            },

            historicalData(value) {
                console.log(value)
                this.marketApical('historicaldata')
               
            },
            addCommas: function(x, num) {
              x = x || 0;
              x = Number(x);
              var n = x.toFixed(num);
              var parts = n.toString().split(".");
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return parts.join(".");
          },
            // marketApicalHistoricaldata: function (e) {
            //     var self = this;
            //     let auth_token = this.$store.getters.authToken;
            //     let bodyFormData = {
            //         "currency_Type": e
            //     }
            //     NProgress.start()
            //     if (auth_token) {

            //         const URL = "https://sureshapi.brexily.com/api/marketCurrncyList";
            //         axios({
            //                 method: 'post',
            //                 url: URL,
            //                 headers: {
            //                     "accept": "application/json",
            //                     "Authorization": "Bearer " + auth_token
            //                 },
            //                 data: qs.stringify(bodyFormData)
            //             })
            //             .then(function (response) {
            //                 //handle success 
            //                 NProgress.done()
            //                 //self.historicalMarketData = response.data.Result;
            //      this.allMarketData = response.data.Result;
            //                 // if (response.data.Result.Twofa_status == 'D' && response.data.Result.first_name ==
            //                 //     "") {
            //                 //     self.dialog = true
            //                 // } else if (response.data.Result.Twofa_status == 'A' && response.data.Result
            //                 //     .first_name == "") {
            //                 //     self.$router.push("/Profile");
            //                 // } else if (response.data.Result.Twofa_status == 'A') {
            //                 //     self.dialog = false
            //                 // } else {
            //                 //     self.dialog = false
            //                 // }
            //             })
            //             .catch(function () {
            //                 //handle error
            //             });
            //     } else {
            //         window.location.href = "/";
            //     }

            // }
        },
        mounted: function () {
         setInterval(() => {
                  //location.reload();
                  console.log('Reloading '+this.marketapiKey);

                // console.log(value);
                if (this.isHistorycal)
                {

                this.marketApical("historicaldata")
                }
                else{
                   this.marketApical(this.marketapiKey)
                }
                }, 300000); 
        }
};

  // setInterval(function() {
  //                 location.reload();
  //               }, 300000); 
</script>
