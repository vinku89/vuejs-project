<template>
<v-app>
    <TopBar :userInfo="loggedUserInfo" :iswtmActive="true"/>
    <v-content>
        <v-container fluid class="h-100">
            <div> <h4 class="smallres_welcometxt">Welcome to <strong>Brexily</strong></h4>
                <v-col cols="12">
                   
                    <!-- <div class="divl"></div> -->
                    <div class="clearfix userinfo_pannel">
                        <!-- Welcome Text -->
                        <v-col class="custom_col1 res_div5 below1499">
                            <h4 class="welcometxt">Welcome to <strong>Brexily</strong></h4>
                        </v-col>

                        <!-- User login details -->
                        <v-col class="custom_col2 res_div4 green_br_left">
                            <v-col class="d-flex align-item-center p-0">
                                <div class="userphoto">
                                    <div class="img">
                                        <img src="../../../assets/images/user_photo.png" alt="" class="img-fluid">
                                    </div>
                                    <!-- <a class="camera_btn">
                                        <v-icon>mdi-camera</v-icon>
                                    </a> -->
                                </div>
                                <v-col class="userLogin_details">
                                    <h5 class="green_txt font-weight-bold">
                                        <!-- <span>rah</span>
                                        <span>***</span> -->
                                        <span>{{user_email}}</span>
                                    </h5>
                                    <p class="white_txt mb-0">
                                        User ID:
                                        <span class="font-weight-bold">{{loggedUserInfo.ref_code}}</span>
                                    </p>
                                    <p class="mb-0">
                                        Last login:
                                        <span>{{loggedUserInfo.lastLoginDate}} |</span>
                                        <span>IP : {{loggedUserInfo.ip}}</span>
                                    </p>
                                </v-col>
                            </v-col>
                        </v-col>

                        <!--Community Levels -->
                        <v-col class="custom_col3 res_div3 green_br_left">
                            <v-col class="d-flex align-item-center p-0">
                                <img src="../../../assets/images/green_c-manager.png" alt="" class="img-fluid">
                                <div class="camunity_m_wrp ">
                                    <h6 class="white_txt font-weight-bold mb-2">Commission Levels</h6>
                                    <h5 class="font-weight-bold green_txt position-relative mb-0">{{loggedUserInfo.userRole}}</h5>
                                    <p>Daily Earn up to <strong>{{loggedUserInfo.userCPercent}}%</strong> with your community</p>
                                </div>
                            </v-col>
                        </v-col>

                        <!-- Monthly Ranks -->
                        <v-col class="custom_col4 res_div green_br_left">
                            <img src="../../../assets/images/ranks.png" alt="" class="img-fluid float-left">
                            <div class="monthly_rank">
                                <h6 class="white_txt font-weight-bold mb-0">Monthly Trading Rank</h6>                                
                                <h1 class="green_txt font-weight-bold mb-0 f45" v-if="loggedUserInfo.rank">{{loggedUserInfo.rank}}</h1>
                                <h1 class="green_txt font-weight-bold mb-0 pt-2 f30" v-else>n/a</h1>
                            </div>
                        </v-col>

                        <!-- Levels -->
                        <v-col class="custom_col5 res_div2 green_br_left pt-0">
                            <ul class="lev_Group clearfix">
                                <li>
                                    <p>24h Withdrawal Limit</p>
                                    <h6>2 BTC</h6>
                                </li>
                                <li>
                                    <p>24h Withdrawal Limit</p>
                                    <h6>100 BTC</h6>
                                </li>
                                <li>
                                    <p>24h Withdrawal Limit</p>
                                    <h6>Contact Us</h6>
                                </li>
                            </ul>
                            <ul class="progressbar">
                                <li class="active">
                                    <v-icon class="activeIcon">mdi-check-circle</v-icon>
                                    <v-icon class="inactiveIcon">mdi-checkbox-blank-circle</v-icon>
                                </li>
                                <li v-if="loggedUserInfo.kyc_status == 1" class="active">
                                    <v-icon class="activeIcon">mdi-check-circle</v-icon>
                                    <v-icon class="inactiveIcon">mdi-checkbox-blank-circle</v-icon>
                                </li>
                                <li v-else >
                                    <v-icon class="activeIcon">mdi-check-circle</v-icon>
                                    <v-icon class="inactiveIcon">mdi-checkbox-blank-circle</v-icon>
                                </li>
                                <li>
                                    <v-icon class="activeIcon">mdi-check-circle</v-icon>
                                    <v-icon class="inactiveIcon">mdi-checkbox-blank-circle</v-icon>
                                </li>
                            </ul>
                            <ul class="lev_Group clearfix mb-0">
                                <li>
                                    <p>Level 1</p>
                                </li>
                                <li>
                                    <p>Level 2</p>
                                </li>
                                <li>
                                    <p>Level 3</p>
                                </li>
                            </ul>

                        </v-col>
                    </div>
                </v-col>
                
                <v-col class="py-0 pr-0 lightPanel">
                    <!-- Left Panel -->
                    <v-col class="py-0">
                        <v-row>
                            <v-col class="pl-0 pr-2 pt-0">
                                <!-- Total Asset -->
                                <div class="curved_div wave_blue">
                                    <v-icon class="waveicon1">mdi-currency-usd</v-icon>
                                    <p class="bluet">Total Asset</p>
                                    <h5>$ <strong>{{loggedUserInfo.totalAssert}}</strong> USD</h5>
                                    <p>{{loggedUserInfo.totalAssertBtc}} BTC</p>
                                </div>
                            </v-col>
                            <!-- Main Account -->
                            <v-col class="px-2 pt-0">
                                <div class="curved_div wave_red">
                                    <v-icon class="waveicon2">mdi-wallet-outline</v-icon>
                                    <p class="redt">Main Account</p>
                                    <h5>$ <strong>{{loggedUserInfo.mainBalaces}}</strong> USD</h5>
                                    <p>{{loggedUserInfo.mainBalacesBtc}} BTC</p>
                                </div>
                            </v-col>
                            <!-- Trading Account -->
                            <v-col class="px-2 pt-0">
                                <div class="curved_div wave_orange">
                                    <v-icon class="waveicon3">mdi-login-variant</v-icon>
                                    <p class="oranget">Trading Account</p>
                                    <h5>$ <strong>{{loggedUserInfo.tradingBlance}}</strong> USD</h5>
                                    <p>{{loggedUserInfo.tradingBlanceBtc}} BTC</p>
                                </div>
                            </v-col>
                            <!-- In Order -->
                            <v-col class="pl-2 pr-0 pt-0">
                                <div class="curved_div wave_purple">
                                    <v-icon class="waveicon4">mdi-swap-horizontal</v-icon>
                                    <p class="purplet">In Order</p>
                                    <h5>$ <strong>{{loggedUserInfo.inOrderBlance}}</strong> USD</h5>
                                    <p>{{loggedUserInfo.inOrderBlanceBtc}} BTC</p>
                                </div>
                            </v-col>

                        </v-row>

                        <v-row class=" row-eq-height">
                            <v-col md="6" cols="12" class="pl-0 pr-2 pt-0">
                                <h4 class="table_heading green_title dark_br_bottom">
                                    Rewards Wallet
                                </h4>
                            <div class="rewardstable_bg">
                                 <table class="mb-0 table white_txt table_font rewardTable">
                                     <thead>
                                    <tr>
                                        <th class="font-weight-bold border-top-0 f14 py-2">Incentive</th>
                                        <th class="font-weight-bold text-center border-top-0 f14  py-2">Currencies</th>
                                        <th class="font-weight-bold text-right border-top-0 f14 py-2">Quantity</th>
                                        <th class="font-weight-bold text-right border-top-0 f14 py-2">Used</th>
                                        <th class="font-weight-bold text-right border-top-0 f14 py-2">Balance</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr v-for='(index , i) in rewardsRecordsInfo["rewards"]' :key='i'>
                                            <td class=" border-top-0">{{index.name}}</td>
                                            <td class="text-center border-top-0"><img class="d-inline-block" v-bind:src="`${adminUrl}coin_listing_images/${index.coin_image}`" height="25" width="25"></td>
                                            <td class="text-right border-top-0">{{addCommas(index.total_qty,2)}}</td>
                                            <td class="text-right border-top-0">{{addCommas(index.used,2)}}</td>
                                            <td class="text-right border-top-0">{{addCommas(index.balance,2)}}</td>
                                        </tr>
                                       <!-- <tr>
                                            <td class=" border-top-0">Deposit</td>
                                            <td class="text-center border-top-0"><img class="d-inline-block" src="../../../assets/images/all/bitcoin.png" height="25" width="25"></td>
                                            <td class="text-right border-top-0">30</td>
                                            <td class="text-right border-top-0">15</td>
                                            <td class="text-right border-top-0">15</td>
                                        </tr> -->
                                        
                                    </tbody>
                                </table>
                            </div>
                               
                               
                            </v-col>
                            <v-col md="6" cols="12" class=" pl-2 pr-0 pt-0">
                                <h4 class="table_heading purple_title purple_br_bottom">
                                    Latest 5 Days Commission Report
                                </h4>
                                <div class="cd_purple_bg px-2 table_wrp l5d_comm">
                                    <template>
                                        <v-data-table 
                                        :headers="headers" 
                                        :items="last5communicationReporInfo" 
                                        hide-default-footer 
                                        :fixed-header="true"
                                        class="elevation-0 table_1 row_space table_font " >
                                        </v-data-table>
                                    </template>
                                </div>
                            </v-col>
                        </v-row>
                    
                
                        <v-row class="row-eq-height">
                            <v-col cols="12" lg="6" class="pl-0 pr-2 pt-0">
                                <div class="cd_purple_bg mb-3">
                                    <h4 class="cd_heading">Account Security</h4>
                                    <v-col cols="12" class="py-0">
                                        <v-row class="row row-eq-height ac_security">
                                            <v-col class="text-center box_border">
                                                <p class="white_txt cd_txt">Enable 2FA</p>
                                               

                                                 <span v-if="loggedUserInfo.Twofa_status == 'D'" class="red_txt ">
                                                    <v-icon class=" red_txt">mdi-close-circle</v-icon>
                                                    Disabled
                                                </span>
                                                <span v-else class="green_txt ">
                                                    <v-icon class="green_txt">mdi-check-circle</v-icon>
                                                    Active
                                                </span>
                                            </v-col>
                                            <v-col class="text-center box_border">
                                                <p class="white_txt cd_txt">Identity Verification</p>
                                                <span  v-if="loggedUserInfo.kyc_status == 1" class="green_txt ">
                                                    <v-icon class="green_txt">mdi-check-circle</v-icon>
                                                    Verified
                                                </span>
                                                 <span  v-else class="red_txt ">
                                                    <v-icon class="red_txt">mdi-close-circle</v-icon>
                                                    Unverified
                                                </span>
                                            </v-col>
                                            <v-col class="text-center box_border">
                                                <p class="white_txt cd_txt">Turn-on Security Setting</p>
                                                <v-btn :href="`/Security`" color="success" dark class="btn_height">
                                                    Enable
                                                </v-btn>
                                            </v-col>
                                            <v-col class="text-center box_border">
                                                <p class="white_txt cd_txt">Turn-on Withdrawal Whitelist</p>
                                                 <v-btn color="success" dark disabled>
                                                    Enable
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                </div>
                                 <div class="cd_purple_bg ">
                                    <h4 class="cd_heading">Your Trading Fees</h4>
                                    <v-col cols="12" class="py-0 trading_fees">
                                        <v-row class="row row-eq-height">
                                            <v-col cols="3" class="text-center box_border">
                                                <p class="white_txt cd_txt2">Maker</p>
                                                <h3 class="white_txt resTxt">{{updated_maker_fee}}%</h3>
                                            </v-col>
                                            <v-col  cols="3"  class="text-center box_border">
                                                <p class="white_txt cd_txt2">Taker</p>
                                               <h3 class="white_txt resTxt">{{updated_taker_fee}}%</h3>
                                            </v-col>
                                            <v-col cols="6"  class="text-center box_border dark_blue_bg">
                                                <p class="white_txt cd_txt2">Using EVR to pay for fees ( 50% discount )</p>
                                                <v-switch
                                                    v-model="fee_mode"
                                                    v-on:change="check($event)"
                                                    color="success"
                                                    value="success"
                                                    hide-details
                                                    class="d-inline-block mt-0 pt-0"
                                                    ></v-switch>
                                            </v-col>
                                            
                                        </v-row>
                                    </v-col>

                                </div>
                            </v-col>

                            <v-col cols="12" lg="6" class="pl-2 pr-0 pt-0">
                                 <h4 class="table_heading purple_title purple_br_bottom">
                                    Open Trades (Top-50)
                                </h4>
                                <div class="open_trades cd_purple_bg pt-3 px-2 table_wrp2 opentraders_table" v-bind:class="{ ttl_records: isActive }">
                                    <template>
                                        <v-data-table 
                                            :headers="tradeheaders" 
                                            :items="this.openTradeReportInfo" 
                                            hide-default-footer 
                                            disable-pagination
                                            :fixed-header="true"
                                            class="elevation-0 table_1 row_space table_font table_scroll" v-bar>
                                        </v-data-table>
                                    </template>
                                </div>
                            </v-col>
                        </v-row>
                    
                        </v-col>
                    </v-col>
                    <!--End  Left Panel -->


                    <!-- RIght Pannel -->
                    <v-col class="rightPanel pt-0">
                        <v-col class="p-0">
                            <img src="../../../assets/images/prize-banner.png" alt="" class="img-fluid mb-4">
                            <div class="position-relative mb-3"  style="margin-top:-10px" >
                            <a :href="`/Referral`">
                                <img src="../../../assets/images/invite-friend.png" alt="" class="img-fluid">
                                <span class="earn_commision">{{loggedUserInfo.userCPercent}}%</span>
                            </a>
                            </div>
                        </v-col>

                        <v-col class="cd_purple_bg top10_table_wrap">
                                 <h4 class="table_heading">
                                    Top 10 Individual performance
                                </h4>
                                     <table class="w-100 table_font top10_table">
                                          <thead>
                                        <tr>
                                            <th class="text-left cd_table_heading" style="width:50px;">Rank</th>
                                            <th class="text-left cd_table_heading">User Referral</th>
                                            <th class="text-right cd_table_heading">Trading Volume</th>
                                            <th class="text-right cd_table_heading pr-5">Rewards</th>
                                        </tr>
                                    </thead>
                                    <tbody  v-if='getTop10IndividualPerformanceInfo && getTop10IndividualPerformanceInfo["top10RecIndividual"] && getTop10IndividualPerformanceInfo["top10RecIndividual"].length > 0' >
                                         <tr v-for='(index , i) in getTop10IndividualPerformanceInfo["top10RecIndividual"]' :key='i'>
                                            <td class="font-weight-bold text-left" style="width:50px;">{{ index.rank }}</td>
                                            <td class="text-left">{{ index.ref_code?index.ref_code:'-' }}</td>
                                            <td class="text-right">$ {{ addCommas(index.min_trade_volume,2) }}</td>
                                            <td class="text-right">{{ index.reward }} <img v-bind:src="`${adminUrl}/coin_listing_images/1584173712_usdt.png`"  alt="" width="25"></td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td class="text-center" colspan="4" > No data found                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                               
                        </v-col>
                    </v-col>
             

            </div>
        </v-container>
    </v-content>
     <!-- Attention modal popup -->
     <template>
        <v-row justify="center" class="float-left">
            <v-dialog v-model="feeMode_modal" persistent max-width="500px">
                <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                    <v-card-text class="p-5 black-txt">
                        <v-container>
                            <img alt="Alert" src="../../../assets/images/danger-popup-icon.png" width="100" class="img-fluid" />
                            <h4 class="headline font-weight-bold my-2">Are you sure?</h4>
                            <h5 class="subtitle-1 my-2">You want to pay fee with <strong>{{fee_mode_text}}</strong></h5>

                            <v-card-actions class="close_btn_wrp">
                                <v-icon class="black-txt" v-on:click="cancelPopup">mdi-close</v-icon>
                            </v-card-actions>

                            <v-btn-toggle class="mt-4" borderless>
                                <v-btn value="left" class="red accent-4 w-50 px-7 py-2" v-on:click="cancelPopup">
                                    <span class="hidden-sm-and-down">Cancel</span>
                                </v-btn>

                                <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :loading="loading" :disabled="loading" v-on:click ="setPaymentFee">
                                    <span class="hidden-sm-and-down">Yes, proceed</span>
                                </v-btn>
                            </v-btn-toggle>
                        </v-container>

                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </template>

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
                                    <!-- <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="dialog = false">
                                        <span class="hidden-sm-and-down">Cancel</span>
                                    </v-btn> -->

                                    <v-btn class="green darken-1 w-100 px-7 py-2" :href="`/Security`">
                                        <span class="hidden-sm-and-down">Enable 2FA</span>
                                    </v-btn>
                                </v-btn-toggle>
                        </div>
                    </div>
                    </v-card-text>
                        <v-card-actions class="close_btn_wrp">
                            <!-- <v-icon class="black-txt" @click="dialog = false">mdi-close</v-icon> -->
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
    <v-overlay style="z-index:205" :value="overlay">
        <!--<v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img>-->
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
import TopBar from '../TopBar';
import NProgress from 'nprogress';
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'Dashboard',
    components: {
        TopBar,
    },
 data: () => ({
            overlay: false,
            absolute: true,
            dialog: false,
            snackbar_text: "",
            vertical: true,
            timeout: 6000,
            color: "yellow",
            x: 'right',
            y: 'top',
            loading: false,
            fee_mode2: '',
            feeMode_modal: false,
            fee_mode_text: '',
            adminUrl: '',
            loggedUserInfo: [],
            getTop10IndividualPerformanceInfo:[  ],
            last5communicationReporInfo:[],
            openTradeReportInfo:[],
            rewardsRecordsInfo:[],
        fee_mode: null,//['success'],
        updated_maker_fee: '',
        updated_taker_fee: '',
        isActive: false,
        user_email: '',
        headers: [
           
            {
                text: 'Trade Date',
                align: 'start',
                value: 'payout_date',
                sortable: false,
            },
            {
                text: 'Total Trading',
                value: 'total_trade',
                align: 'right',
                sortable: false,
            },
            {
                text: 'Commission',
                value: 'commission_amount',
                align: 'right',
                sortable: false,
            },
            {
                text: 'Details',
                value: 'details',
                align: 'end',
                sortable: false,
            }
        ],
        desserts: [{
                payout_date: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },
            {
                datetime: '15-09-2020 12:34:01',
                trading: 0.056325,
                commission: 0.000125,
                Details: "Trading commission",
            },


        ],
    
     tradeheaders: [
         
        
         {
                text: 'Date & Time',
                align: 'start',
                value: 'trade_date',
                sortable: false,
            },
            {
                text: 'Pair',
                value: 'pair',
                align: 'start',
                sortable: false,
            },
            {
                text: 'Amount',
                value: 'amount',
                align: 'end',
                sortable: false,
            },
            {
                text: 'Price',
                value: 'price',
                align: 'end',
                sortable: false,
            },
            {
                text: 'Type',
                value: 'type',
                align: 'end',
                sortable: false,
            },
            // {
            //     text: 'Status',
            //     value: 'status',
            //     align: 'end',
            //     sortable: false,
            // }
        ],
        tradeDet: [{
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            },
            {
                datetime: '15-09-2020 12:34:01',
                pair: 'ETH/BTC',
                amount: 0.56325,
                price: 0.000125,
                balance:10/50,
                status:'In Order'
            }

        ],
 
    }),


           created() {
            this.getUserInfo()
  this.getTop10IndividualPerformanceData();
  this.last5DaysCommunicationReport();
  this.getOpenTradesForIndividivalUser();
this.rewadrsWallet()

},
    mounted() {    
        this.adminUrl = process.env.VUE_APP_ADMIN_URL      
    },
    methods:{
        addCommas: function(x, num) {
            x = x || 0;
            x = Number(x);
            var n = x.toFixed(num);
            var parts = n.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },
        check: function(e) {
            var fee_mode_txt;
            if(e == 'success'){
                fee_mode_txt = 'EVR'
            }else{
                fee_mode_txt = 'Base Currency'
            }
             this.fee_mode_text = fee_mode_txt
                this.feeMode_modal = true
        },
         cancelPopup: function(){
                 
                if(this.fee_mode == 'success'){
                    this.fee_mode = null
                }else{
                    this.fee_mode = 'success'
                }
                this.feeMode_modal = false
            },
        setPaymentFee: function(){
                //this.loading = true;
                var self = this;
                var fee_mode1;
                if (this.fee_mode == "success") {
                    fee_mode1 = 'evr'
                } else {
                    fee_mode1 = 'baseCurrency'
                }
                let auth_token = this.$store.getters.authToken;
                if (auth_token) {
                    const apiUrl = process.env.VUE_APP_API_URL + 'setPaymentFeeMode';
                    let bodyFormData = {
                        "payment_fee_mode": fee_mode1
                    }
                    axios({
                            method: 'post',
                            url: apiUrl,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            },
                            data: qs.stringify(bodyFormData),
                        })
                        .then(function (response) {
                            //handle success 
                            //self.getUserInfo()
                                self.feeMode_modal = false;
                                
                                setTimeout(function(){
                                    self.loading = false;
                                },500);
                                self.snackbar_text = response.data.Result
                                self.updated_maker_fee = response.data.makerFees || '0.12';
                                self.updated_taker_fee = response.data.takerFees || '0.12';
                                self.snackbar = true
                        })
                        .catch(function (err) {
                            //handle error
                            if(err.response.data.Result == 'User is blocked'){
                                self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }else{
                                window.location.href = "/";
                            }                        
                        });
                } else {
                    window.location.href = "/";
                }
            },
           rewadrsWallet: function () {
                var self = this;
                let auth_token = this.$store.getters.authToken;
                NProgress.start()
                if (auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "walletRewards";
                    
                    axios({
                            method: 'get',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done()
                            self.rewardsRecordsInfo = response.data.Result;
                            
                        })
                        .catch(function (err) {
                            if(err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }else{
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

    
         getOpenTradesForIndividivalUser: function () {
                var self = this;
                    self.isActive = false;
                let auth_token = this.$store.getters.authToken;
                NProgress.start()
                if (auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "getOpenTradesForIndividivalUser";
                    
                    axios({
                            method: 'get',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done()
                            //self.openTradeReportInfo = response.data.Result;
                            let res = response.data.Result;
                            let data = Object.values(res);
                            for(let res of data){
                                for(let record of res){
                                    record.pair = record.pair.replace('_',' / ')
                                }
                            }
                            self.openTradeReportInfo = data[0]
                            if(data[0].length > 8){
                                self.isActive = true;
                                }
                        })
                        .catch(function (err) {
                            if(err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }else{
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

    
          getTop10IndividualPerformanceData: function () {
                var self = this;
                let auth_token = this.$store.getters.authToken;
                NProgress.start()
                if (auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "getTop10IndividualPerformanceData";
                    
                    axios({
                            method: 'get',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done()
                            self.getTop10IndividualPerformanceInfo = response.data.Result;
                            
                        })
                        .catch(function (err) {
                            if(err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }else{
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

    
          last5DaysCommunicationReport: function () {
                var self = this;
                let auth_token = this.$store.getters.authToken;
                NProgress.start()
                if (auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "Last5DaysCommitionUser";
                    
                    axios({
                            method: 'get',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done();
                            let res = response.data.Result['Last5DaysCommition'];
                            let data = Object.values(res);
                            for(let res of data){
                                res.total_trade = self.addCommas(res.total_trade,2);
                                res.commission_amount = self.addCommas(res.commission_amount,8);
                            }
                            // if(response.data.Result && res.length < 5 ) {
                            //     let count = res.length;
                            //     for(let i=0; i<5-count; i++) {
                            //         res.push({payout_date:'',total_trade:'',commission_amount:'',details:''});
                            //     }
                            // }
                            
                            self.last5communicationReporInfo = res;
                            
                        })
                        .catch(function (err) {
                            if(err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }else{
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

    
            getUserInfo: function () {
                this.overlay = true
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
                            self.overlay = false
                            self.loggedUserInfo = response.data.Result;
                            //let twofa_popup_show = localStorage.getItem('twofa_popup_show')                            
                            //if (response.data.Result.Twofa_status == 'D' && twofa_popup_show == null) {
                            if (response.data.Result.Twofa_status == 'D') {
                                self.dialog = true
                            }
                           //localStorage.setItem('twofa_popup_show', 'done')
                            if (self.loggedUserInfo.payment_fee_mode == 1) {
                                    self.fee_mode = "success";
                                    self.updated_maker_fee = self.loggedUserInfo.EVR_maker_fee || '0.12';
                                    self.updated_taker_fee = self.loggedUserInfo.EVR_taker_fee || '0.12';
                                } else if (self.loggedUserInfo.payment_fee_mode == 0) {
                                    self.fee_mode=null;
                                    self.updated_maker_fee = self.loggedUserInfo.All_bc_maker_fee || '0.12';
                                    self.updated_taker_fee = self.loggedUserInfo.All_bc_taker_fee || '0.12';
                                } else {
                                    self.fee_mode=null;
                                    self.updated_maker_fee = self.loggedUserInfo.All_bc_maker_fee || '0.12';
                                    self.updated_taker_fee = self.loggedUserInfo.All_bc_taker_fee || '0.12';
                                }
                                let email = self.loggedUserInfo.email;
                                self.user_email = email.substr(0,3)+"***"+email.substr(email.lastIndexOf('@'), email.length);
                        })
                        .catch(function (err) {
                            if(err.response.data.Result == 'User is blocked'){
                                self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }else{
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
