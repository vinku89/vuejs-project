<template>
<div class="col-12 pb-0">
    <v-row>
        <v-col cols="12" lg="6" class="pl-0 py-0">
            <div class="buy_col clearfix">
                <h4 class="float-left font-weight-bold"><span class="green_txt">Buy</span> <span>{{exchageTotalData.pair_currency}}</span></h4>
                <div class="available_bal">
                    <p>Available: <span class="white_txt font-weight-bold">{{exchageTotalData.balance_to.toLocaleString('en',{maximumFractionDigits: 8})}} {{exchageTotalData.base_currency}}</span></p>
                </div>
            </div>
            <div class="col-12 clearfix">
                <v-form ref="form" v-model="valid">
                    <!--Amount -->
                    <v-row class="form_field_row txt_field_brdr">
                        <v-col cols="12" sm="4" class="pl-0 py-0">
                            <p class="mt-2">Amount</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="px-0 py-0">
                            <v-text-field outlined label="0.00000000" v-keyup="updTotBuyAmt()" v-on:blur="isBlur(1)" id="buyamountid" single-line required v-model="buyamount" :rules="buyamountRules" hide-details="auto"></v-text-field>
                            <span class="crypto_name ">{{exchageTotalData.pair_currency}}</span>
                        </v-col>
                    </v-row>
                    <!-- Price -->
                    <v-row class="form_field_row txt_field_brdr">
                        <v-col cols="12" sm="4" class="pl-0 py-0">
                            <p class="mt-2">Price</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="pr-0 py-0  pl-0">
                            <v-text-field outlined label="0.00000000" single-line required v-model="buyprice" v-on:blur="isBlur(2)" id="buypriceid" :rules="buypriceRules" hide-details="auto"></v-text-field>
                            <span class="crypto_name ">{{exchageTotalData.base_currency}}</span>
                        </v-col>
                    </v-row>
                    <!--Fee -->
                    <!-- <v-row class="form_field_row txt_field_bg">
                        <v-col cols="12" xl="4" class="pl-0 py-0">
                            <p class="mt-2">Fee(%)</p>
                        </v-col>
                        <v-col cols="12" xl="8" class="pr-0 py-0 pl-0">
                            <v-text-field outlined :label="`${exchageTotalData.fee_to}`" single-line readonly hide-details></v-text-field>
                            <span class="crypto_name">{{exchageTotalData.base_currency}}</span>
                        </v-col>
                    </v-row> -->
                    <!--Amount -->
                    <v-row class="form_field_row txt_field_bg mb-0">
                        <v-col cols="12" sm="4" class="pl-0 py-0">
                            <p class="mt-2" v-if="exchageTotalData.fee_to == 0">Total<br />Fee( 0.00% )</p>
                            <p class="mt-2" v-else>Total<br />Fee( {{exchageTotalData.fee_to.toLocaleString('en',{maximumFractionDigits: 2})}}% )</p>
                        </v-col>
                        <v-col cols="12" sm="8" class="pr-0 py-0 pl-0">
                            <v-text-field outlined label="0.00000000" single-line v-model="tot_buyamt" hide-details readonly></v-text-field>
                            <span class="crypto_name">{{exchageTotalData.base_currency}}</span>
                        </v-col>
                    </v-row>
                    <v-row v-show="buyerr">
                        <v-col class="px-0 col-8 offset-4 text-center">
                            <div class="alert_div">
                                <v-alert dense outlined type="error" class="alert_txt mb-0">
                                {{ buyerrorMsg }}
                            </v-alert> 
                            </div>
                               
                        </v-col>                        
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" class="pl-0 py-0">&nbsp;</v-col>
                        <v-col cols="12" sm="8" class="pr-0 py-0 pl-0 but_btn">
                            <v-btn large color="success" v-on:click="validate" class="w-100">BUY {{exchageTotalData.pair_currency}}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </div>
        </v-col>
        <v-col cols="12" lg="6" class="pr-0 py-0">
            <div class="buy_col clearfix">
                <h4 class="float-left font-weight-bold"><span class="red_txt">Sell</span> <span>{{exchageTotalData.pair_currency}}</span></h4>
                <div class="available_bal">
                    <p>Available: <span class="white_txt font-weight-bold">{{exchageTotalData.balance_from.toLocaleString('en',{maximumFractionDigits: 8})}} {{exchageTotalData.pair_currency}}</span></p>
                </div>
            </div>
            <div class="col-12 clearfix">
              <v-form ref="form1" v-model="valid1">
                <!--Amount -->
                <v-row class="form_field_row sell_txt_field_brdr">
                    <v-col cols="12" sm="4" class="pl-0 py-0">
                        <p class="mt-2">Amount</p>
                    </v-col>
                    <v-col cols="12" sm="8" class="pr-0 py-0 pl-0">
                        <v-text-field outlined label="0.00000000" v-keyup="updTotSellAmt()" v-on:blur="isBlur1(1)" id="sellamountid" single-line required v-model="sellamount" :rules="sellamountRules" hide-details="auto"></v-text-field>
                        <span class="crypto_name ">{{exchageTotalData.pair_currency}}</span>
                    </v-col>
                </v-row>
                <!-- Price -->
                <v-row class="form_field_row sell_txt_field_brdr">
                    <v-col cols="12" sm="4" class="pl-0 py-0">
                        <p class="mt-2">Price</p>
                    </v-col>
                    <v-col cols="12" sm="8" class="pr-0 py-0 pl-0">
                        <v-text-field outlined label="0.00000000" single-line required v-model="sellprice" v-on:blur="isBlur1(2)" id="sellpriceid" :rules="sellpriceRules" hide-details="auto"></v-text-field>
                        <span class="crypto_name ">{{exchageTotalData.base_currency}}</span>
                    </v-col>
                </v-row>
                <!--Fee -->
                <!-- <v-row class="form_field_row txt_field_bg">
                    <v-col cols="12" xl="4" class="pl-0 py-0">
                        <p class="mt-2">Fee (%)</p>
                    </v-col>
                    <v-col cols="12" xl="8" class="pr-0 py-0 pl-0">
                        <v-text-field outlined :label="`${exchageTotalData.fee_from}`" single-line readonly hide-details></v-text-field>
                        <span class="crypto_name">{{exchageTotalData.base_currency}}</span>
                    </v-col>
                </v-row> -->
                <!--Amount -->
                <v-row class="form_field_row txt_field_bg mb-0">
                    <v-col cols="12" sm="4" class="pl-0 py-0">
                        <p class="mt-2" v-if="exchageTotalData.fee_from == 0">Total<br />Fee( 0.00% )</p>
                        <p class="mt-2" v-else>Total<br />Fee( {{exchageTotalData.fee_from.toLocaleString('en',{maximumFractionDigits: 2})}}% )</p>
                    </v-col>
                    <v-col cols="12" sm="8" class="pr-0 py-0 pl-0">
                        <v-text-field outlined label="0.00000000" v-model="tot_sellamt" single-line  hide-details readonly></v-text-field>
                        <span class="crypto_name">{{exchageTotalData.base_currency}}</span>
                    </v-col>
                </v-row>
                <v-row v-show="sellerr">
                     <v-col class="px-0 col-8 offset-4 text-center">
                            <div class="alert_div">
                                <v-alert dense outlined type="error" class="alert_txt mb-0">
                                  {{ sellerrorMsg }}
                            </v-alert> 
                            </div>
                               
                        </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="4" class="pl-0 py-0">&nbsp;</v-col>
                    <v-col cols="12" sm="8" class="pr-0 py-0 pl-0">
                        <v-btn large color="error" @click="validate1" class="w-100">SELL {{exchageTotalData.pair_currency}}</v-btn>
                    </v-col>
                </v-row>
              </v-form>
            </div>
        </v-col>

        <!-- Attention modal popup -->
        <template>
            <v-row justify="center" class="float-left mr-5">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                        <v-card-text class="p-5 black-txt">
                            <v-container>
                                <h4 class="headline font-weight-bold my-2"><span class="green_txt">BUY</span> {{exchageTotalData.pair_currency}}</h4>
                                <h5 class="subtitle-1 font-weight-bold my-2">Are you sure you want to buy? </h5>
                                <p>
                                    {{buyamount | nf_eight_dec}} {{exchageTotalData.pair_currency}} = {{buyprice | nf_eight_dec}} {{exchageTotalData.base_currency}}
                                </p>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red" class="w-50" @click="dialog = false">Cancel</v-btn>
                                    <v-btn color="success" class="w-50" :loading="loading1" :disabled="loading1" v-on:click = "buy_save">Confirm</v-btn>
                                </v-card-actions>
                            </v-container>

                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
        <!-- Attention modal popup -->
        <template>
            <v-row justify="center" class="float-left mr-5">
                <v-dialog v-model="dialog1" persistent max-width="600px">
                    <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                        <v-card-text class="p-5 black-txt">
                            <v-container>
                                <h4 class="headline font-weight-bold my-2"><span class="red_txt">SELL</span> {{exchageTotalData.pair_currency}}</h4>
                                <h5 class="subtitle-1 font-weight-bold my-2">Are you sure you want to sell? </h5>
                                <p>
                                    {{sellamount | nf_eight_dec}} {{exchageTotalData.pair_currency}} = {{sellprice | nf_eight_dec}} {{exchageTotalData.base_currency}}
                                </p>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red" class="w-50" @click="dialog1 = false">Cancel</v-btn>
                                    <v-btn color="success" class="w-50" :loading="loading" :disabled="loading" @click="sell_save">Confirm</v-btn>
                                </v-card-actions>
                            </v-container>

                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <!-- Insufficient modal popup -->
        <template>
            <v-row justify="center" class="float-left mr-5">
                <v-dialog v-model="insufModal" persistent max-width="600px">
                    <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                        <v-card-text class="p-5 black-txt">
                            <v-container>
                                <h4 class="headline font-weight-bold my-2"><span class="green_txt">BUY</span> {{exchageTotalData.pair_currency}}</h4>
                                <!-- <h5 class="subtitle-1 font-weight-bold my-2">Are you sure you want to buy? </h5> -->
                                <p>
                                    Insufficient Balance
                                </p>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red" class="w-50" @click="insufModal = false">Ok</v-btn>
                                    <!-- <v-btn color="success" class="w-50" :loading="loading1" :disabled="loading1" v-on:click = "buy_save">Confirm</v-btn> -->
                                </v-card-actions>
                            </v-container>

                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
    </v-row>
    <!-- <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        <div class="ctn">
      <div class="title mb-1" >Created</div>
      <div class="txt">{{snackbar_text}}</div>
    </div>
        <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn>
    </v-snackbar> -->

    <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        <div class="ctn d-flex align-item-center">
            <div>
                <v-icon class="snak_chek">mdi-check-circle</v-icon>
            </div>
            
            <div>
                <div class="title mb-1" >Created</div>
                <div class="txt">{{snackbar_text}}</div>
            </div>
            
        </div>
         <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>

    <template>
        <v-dialog v-model="dialog51" persistent max-width="500px">
        <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
            <v-card-text class="pb-0">
            <v-container class="black_txt pb-0 text-center">
                <h4 class="text-center font-weight-bold mt-2">Request Status</h4>
                <div class="mt-4 text-center">  
                    <img src="../../../assets/images/request-status-icon.png" alt="" width="64" class="py-4">              
                <p>
                    Kindly take a note that you are <strong>required to complete the KYC verification</strong> process to enable Trade/Deposit/Withdraw/Internal Transfer request.
                </p>
                </div>
            </v-container>
            </v-card-text>
            <v-card-actions class="pb-5">
            <v-card-actions class="close_btn_wrp">
                <v-icon class="black-txt" @click="dialog51 = false">mdi-close</v-icon>
            </v-card-actions>

            <v-spacer></v-spacer>                    
            <v-btn-toggle class="mt-4 w-100 btngroup_div mb-0">
                <v-btn value="left" class="grey accent-4 w-50 px-7 py-2" @click="dialog51 = false">
                <span class="hidden-sm-and-down">Close </span>
                </v-btn>
                <v-btn :href="`/Verification`" value="right" class="green darken-1 w-50 px-7 py-2">
                <span class="hidden-sm-and-down">Proceed with KYC</span>
                </v-btn>
            </v-btn-toggle>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </template>
    <v-snackbar v-model="snackbar1" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_text }}

         <v-icon @click="snackbar1 = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar1 = false" style="color: #000;">
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
    name: 'BuySell',
    components: {},
    props: {
        userInfo: {},
        exchageTotalData: {},
        testvalue: String
    },
    data: () => ({
        dialog51: false,
        market_symbol: '',
        last_market_symbol: '',
        loading: false,
        loading1: false,
        sellerr: false,
        sellerrorMsg: '',
        buyerr: false,
        buyerrorMsg: '',
        dialog: false,
        insufModal: false,
        valid: true,
        buyprice: '',
        buypriceRules: [
            v => !!v || 'Price is required',
            //v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Price should be greater than 0',
            //v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid price',
            //v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        buyamount: '',
        buyamountRules: [
            v => !!v || 'Amount is required',
            //v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
            //v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
           // v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        dialog1: false,
        valid1: true,
        sellprice: '',
        sellpriceRules: [
            v => !!v || 'Price is required',
            //v => /^(?=.*[1-9])\d*(?:\.\d{1,8})?$/.test(v) || 'Please enter valid amount',
            // v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid price',
            // v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        sellamount: '',
        sellamountRules: [
            v => !!v || 'Amount is required',
            //v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
            // v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
            // v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        snackbar: false,
        snackbar1: false,
        snackbar_text: "",
        vertical: true,
        timeout: 6000,
        color: "yellow",
        x: 'right',
        y: 'top',
        //tot_buyamt: '',
        //tot_sellamt: ''
    }),
    watch: {
        
        $route(to) {
            this.last_market_symbol = this.market_symbol
            this.market_symbol = to.path.split("/")[2];
            this.$refs.form.reset();
            this.$refs.form1.reset();   
            this.buyerr = false
            this.buyerrorMsg = "";
            this.sellerr = false
            this.sellerrorMsg = ""      

            let user_id = this.$store.getters.loggedUserId;
            // let auth_token = this.$store.getters.authToken;
            // window.Echo = new Echo({
            // broadcaster: 'pusher',
            // key: process.env.VUE_APP_PUSHER_KEY,
            // wsHost: process.env.VUE_APP_WEBSOCKET_HOST,
            // wssPort: process.env.VUE_APP_WEBSOCKET_PORT,
            // disableStats: true,
            // cluster: 'mt1',
            // authEndpoint: process.env.VUE_APP_AUTH_ENDPOINT,
            // "apiOriginAllow": {
            //     "allowCors" : true,
            //     "allowOrigin" : process.env.VUE_APP_AUTH_ENDPOINT,
            //     "allowMethods" : "GET, POST",
            //     "allowHeaders" : "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
            //     },
            // auth: {
            //     headers: {
            //     "accept": "application/json",
            //     'Access-Control-Allow-Origin': '*',
            //     "Authorization": "Bearer " + auth_token
            //     }
            // }
            // });
            //balance update websocket listener
             window.sockets.old3.leave('Balance_'+this.last_market_symbol+"_"+user_id)
            window.Echo.private('Balance_'+this.market_symbol+"_"+user_id)
            .listen('BalanceEvent', (e) => {
                if(e.message.market_symbol == this.market_symbol){
                this.exchageTotalData.balance_from = e.message.Result.balance_from;
                this.exchageTotalData.balance_to = e.message.Result.balance_to;
                }
            });   
            window.sockets.old3 = window.Echo;
        }
        
    },
    beforeDestroy: function(){
        let user_id = this.$store.getters.loggedUserId;
        window.sockets.old3.leave('Balance_'+this.market_symbol+"_"+user_id)
        //window.sockets.old3.disconnect();
    },
    mounted() {
        function setInputFilter(textbox, inputFilter) {
            ["input", "focus","keypress", "keyup","blur", "submit","button", "mousedown", "mouseup", "select","forminput","formchange","haschange","invalid"].forEach(function(event) {
    textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;        
            } 
            else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);                 
            } 
            else {
                    this.value = '';
            }
            
            });
        });
    }
    setTimeout(function(){
        setInputFilter(document.getElementById("buyamountid"), function(value) {   
    return /^-?\d*[.]?\d{0,8}$/.test(value); });
    setInputFilter(document.getElementById("buypriceid"), function(value) {
    return /^-?\d*[.]?\d{0,8}$/.test(value); });
    setInputFilter(document.getElementById("sellamountid"), function(value) {
    return /^-?\d*[.]?\d{0,8}$/.test(value); });
    setInputFilter(document.getElementById("sellpriceid"), function(value) {
    return /^-?\d*[.]?\d{0,8}$/.test(value); });
    },2000); 

        if(this.exchageTotalData.ord_amount){
            this.buyamount = this.exchageTotalData.ord_amount
            this.buyprice = this.exchageTotalData.ord_price
            this.sellamount = this.exchageTotalData.ord_amount
            this.sellprice = this.exchageTotalData.ord_price
        }        

        this.market_symbol = this.$route.path.split("/")[2];
        this.buyerr = false
        this.buyerrorMsg = "";

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
        //balance update websocket listener
        window.Echo.private('Balance_'+this.market_symbol+"_"+user_id)
        .listen('BalanceEvent', (e) => {
            if(e.message.market_symbol == this.market_symbol){
            this.exchageTotalData.balance_from = e.message.Result.balance_from;
            this.exchageTotalData.balance_to = e.message.Result.balance_to;
            }
        });
        window.sockets.old3 = window.Echo;
    },
    computed: {
      rules() {
        return { 
          buyamount: [
            { message: 'Amount greater than zero' },
          ]
        }
      }
    },
    methods: {
        checkSpaces: function(type, event) {
            event.preventDefault();
            let amt = event.clipboardData.getData('text')
            let bamt = amt.replace(/\s/g,"")
            let amount = bamt.replace(/,/g, '')
            if(type == 1){                
                this.buyamount = amount
            }else if(type == 2){
                this.buyprice = amount
            }else if(type == 3){
                this.sellamount = amount
            }else if(type == 4){
                this.sellprice = amount
            }
        },
        isNumber: function(evt,type) {
            var amt = 1;
            if(type == 1){
                amt = this.buyamount                
            }else if(type == 2){
                amt = this.buyprice
            }else if(type == 3){
                amt = this.sellamount
            }else if(type == 4){
                amt = this.sellprice
            }
            
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else if (charCode === 46 && amt.split('.').length === 2) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        isBlur: function(type) {            
            if(type == 1){
                let newStr = this.buyamount
                let bamt = newStr.replace(/[^0-9.]+/g, "");
                
                if(bamt.split('.').length == 2 ){
                    var trimmedString = bamt.split('.')[1]
                    if(bamt.split('.')[1].length > 8){
                        trimmedString = bamt.split('.')[1].substring(0, 8);
                    }else{
                        trimmedString = bamt.split('.')[1]
                    }
                    this.buyamount = bamt.split('.')[0]+"."+trimmedString
                }else{
                    this.buyamount = bamt
                }
                
            }else{
                let newStr1 = this.buyprice
                let bprice = newStr1.replace(/[^0-9.]+/g, ""); 
                
                if(bprice.length >0 ){
                    if(bprice.split('.').length == 2 ){
                        var trimmedString1 = bprice.split('.')[1]
                        if(bprice.split('.')[1].length > 8){
                            trimmedString1 = bprice.split('.')[1].substring(0, 8);
                        }else{
                            trimmedString1 = bprice.split('.')[1]
                        }
                        this.buyprice = bprice.split('.')[0]+"."+trimmedString1
                    }else{
                        this.buyprice = bprice
                    }
                }else{
                    this.buyprice = ""
                }
            }            
        },
        updTotBuyAmt() {
            if(this.buyamount){
                let newStr = this.buyamount
                let bamt = newStr.replace(/[^0-9.]+/g, "");
                if(bamt.split('.').length == 2 ){
                    var trimmedString = bamt.split('.')[1]
                    if(bamt.split('.')[1].length > 8){
                        trimmedString = bamt.split('.')[1].substring(0, 8);
                    }else{
                        trimmedString = bamt.split('.')[1]
                    }
                    this.buyamount = bamt.split('.')[0]+"."+trimmedString
                }else{
                    this.buyamount = bamt
                }
            }else{
                this.tot_buyamt = '0.00000000'
            }
            if(this.buyprice){
                 let newStr1 = this.buyprice
                let bprice = newStr1.replace(/[^0-9.]+/g, ""); 
                    
                if(bprice.split('.').length == 2 ){
                    var trimmedString1 = bprice.split('.')[1]
                    if(bprice.split('.')[1].length > 8){
                        trimmedString1 = bprice.split('.')[1].substring(0, 8);
                    }else{
                        trimmedString1 = bprice.split('.')[1]
                    }
                    this.buyprice = bprice.split('.')[0]+"."+trimmedString1
                }else{
                    this.buyprice = bprice
                    }
            }else{
                this.tot_buyamt = '0.00000000'
            }
            let ba = this.buyamount//.replace(/[^0-9.]+/g, "");
            let bp = this.buyprice//.replace(/[^0-9.]+/g, "");
                if(bp && ba){
                    //let fee = bp*ba*this.exchageTotalData.fee_to/100
                    this.tot_buyamt = this.$options.filters.nf_eight_dec(bp*ba)
                }else{
                    this.tot_buyamt = '0.00000000'
                }     
                    
        },
        tot_buyamt() {
            //let fee = this.buyprice*this.buyamount*this.exchageTotalData.fee_to/100
            return this.$options.filters.nf_eight_dec(this.buyprice*this.buyamount)
        },
        isBlur1: function(type) {
            if(type == 1){
                let newStr = this.sellamount
                let samt = newStr.replace(/[^0-9.]+/g, "");
                // if(samt.length == 0){
                //     this.sellamount = "0.00000000"
                // }else{
                    if(samt.split('.').length == 2 ){
                        var trimmedString2 = samt.split('.')[1]
                        if(samt.split('.')[1].length > 8){
                            trimmedString2 = samt.split('.')[1].substring(0, 8);
                        }else{
                            trimmedString2 = samt.split('.')[1]
                        }
                        this.sellamount = samt.split('.')[0]+"."+trimmedString2
                    }else{
                        this.sellamount = samt
                    }
               // }
            }else{
                let newStr1 = this.sellprice
                let sprice = newStr1.replace(/[^0-9.]+/g, ""); 
                // if(sprice.length == 0){
                //     this.sellprice = "0.00000000"
                // }else{
                    if(sprice.split('.').length == 2 ){
                        var trimmedString3 = sprice.split('.')[1]
                        if(sprice.split('.')[1].length > 8){
                            trimmedString3 = sprice.split('.')[1].substring(0, 8);
                        }else{
                            trimmedString3 = sprice.split('.')[1]
                        }
                        this.sellprice = sprice.split('.')[0]+"."+trimmedString3
                    }else{
                        this.sellprice = sprice
                    }
               // }
            }            
        },
        updTotSellAmt() {
             if(this.sellamount){
                let newStr = this.sellamount
                let samt = newStr.replace(/[^0-9.]+/g, "");
                
                    if(samt.split('.').length == 2 ){
                        var trimmedString2 = samt.split('.')[1]
                        if(samt.split('.')[1].length > 8){
                            trimmedString2 = samt.split('.')[1].substring(0, 8);
                        }else{
                            trimmedString2 = samt.split('.')[1]
                        }
                        this.sellamount = samt.split('.')[0]+"."+trimmedString2
                    }else{
                        this.sellamount = samt
                    }
            }else{
                this.tot_sellamt = '0.00000000'
            } 
            if(this.sellprice){
                let newStr1 = this.sellprice
                let sprice = newStr1.replace(/[^0-9.]+/g, ""); 
                    
                if(sprice.split('.').length == 2 ){
                    var trimmedString3 = sprice.split('.')[1]
                    if(sprice.split('.')[1].length > 8){
                        trimmedString3 = sprice.split('.')[1].substring(0, 8);
                    }else{
                        trimmedString3 = sprice.split('.')[1]
                    }
                    this.sellprice = sprice.split('.')[0]+"."+trimmedString3
                }else{
                    this.sellprice = sprice
                }
            }else{
                this.tot_sellamt = '0.00000000'
            } 
                let sa = this.sellamount//.replace(/[^0-9.]+/g, "");
                let sp = this.sellprice//.replace(/[^0-9.]+/g, "");
                if(sp && sa){
                    //let fee = sp*this.exchageTotalData.fee_from/100
                    this.tot_sellamt = this.$options.filters.nf_eight_dec(sp*sa)
                }else{
                    this.tot_sellamt = '0.00000000'
                }   
                     
        },
        tot_sellamt() {
            //let fee = this.sellprice*this.exchageTotalData.fee_from/100
            return this.$options.filters.nf_eight_dec(this.sellprice*this.sellamount)
        },
        validate() {            
            // if(this.userInfo.kyc_status == 0){
            //         this.dialog51 = true
            //     }
            // else 
            if (this.buyamount > 0 &&  this.buyprice > 0) {
            //else if (this.$refs.form.validate()) {
                let buyamt = this.buyamount.replace(/[^0-9.]+/g, "");
                this.buyamount = buyamt;
                let buyprc = this.buyprice.replace(/[^0-9.]+/g, "");
                this.buyprice = buyprc
                var wallet_balance = 0
                let payment_mode = this.userInfo.payment_fee_mode
                if(payment_mode == 1){
                    let fee_calc = this.tot_buyamt*this.exchageTotalData.fee_to/100
                    let fee_amount = fee_calc*this.exchageTotalData.bc_usd_price/this.exchageTotalData.evr_usd_price
                   
                   if(fee_amount > this.exchageTotalData.evr_balance){
                        this.buyerr = true
                        this.buyerrorMsg = "Insufficient Fee In EVR Wallet"
                        wallet_balance = 0
                    }else{
                        wallet_balance = 1
                    }
                }else{
                    let fee = this.buyprice*this.buyamount*this.exchageTotalData.fee_to/100                    
                    let fee_calc = this.buyprice*this.buyamount+fee
                    if(fee_calc > this.exchageTotalData.balance_to){
                        this.buyerr = true
                        this.buyerrorMsg = "Insufficient Balance"
                        wallet_balance = 0
                    }else{
                        wallet_balance = 1
                    }
                }               
                
                if(this.tot_buyamt > this.exchageTotalData.balance_to){
                    this.buyerr = true
                    //this.insufModal = true
                    this.buyerrorMsg = "Insufficient Balance"
                }else if( wallet_balance == 1){
                    if(buyamt && buyprc){
                        this.buyerr = false
                        this.buyerrorMsg = ""
                        this.dialog = true
                    }                   
                }
            }
            else if (this.buyamount == "" &&  this.buyprice == "") {
                this.buyamount = null   
                this.buyprice = null   
            } 
            else if (this.buyamount == "") {
                this.buyamount = null    
            } 
            else if (this.buyprice == "") { 
                this.buyprice = null   
            } 
            else{
                this.buyamount = null   
                this.buyprice = null
            }
        },
        validate1() {
            // if(this.userInfo.kyc_status == 0){
            //     this.dialog51 = true
            // }
            // else 
            if (this.sellamount > 0 &&  this.sellprice > 0) {
            //else if (this.$refs.form1.validate()) {   
                let sellamt = this.sellamount.replace(/[^0-9.]+/g, "");
                this.sellamount = sellamt;
                let sellprc = this.sellprice.replace(/[^0-9.]+/g, "");
                this.sellprice = sellprc

                var wallet_balance = 0
                let payment_mode = this.userInfo.payment_fee_mode
                if(payment_mode == 1){
                    let fee_calc = this.sellprice*this.sellamount*this.exchageTotalData.fee_from/100
                    let fee_amount = fee_calc*this.exchageTotalData.bc_usd_price/this.exchageTotalData.evr_usd_price
                   
                   if(fee_amount > this.exchageTotalData.evr_balance){
                        this.sellerr = true
                        this.sellerrorMsg = "Insufficient Fee In EVR Wallet"
                        wallet_balance = 0
                    }else{
                        wallet_balance = 1
                    }
                }else{
                    wallet_balance = 1
                }
                if(this.sellamount > this.exchageTotalData.balance_from){
                    this.sellerr = true
                    this.sellerrorMsg = "Insufficient Balance"
                }else if(wallet_balance == 1){
                    if(sellamt && sellprc){
                        this.sellerr = false
                        this.sellerrorMsg = ""
                        this.dialog1 = true
                    }
                }
            }
            else if (this.sellamount == "" &&  this.sellprice == "") {
                this.sellamount = null   
                this.sellprice = null   
            } 
            else if (this.sellamount == "") {
                this.sellamount = null    
            } 
            else if (this.sellprice == "") { 
                this.sellprice = null   
            } 
            else{
                this.sellamount = null   
                this.sellprice = null
            }
        },
        buy_save() {
            this.loading1 = true;
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2],
                "buypricing": this.buyprice,
                "buyamount" : this.buyamount
            }
            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "buy";
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
                        self.dialog = false
                        if (response.data.Success == true) {
                            setTimeout(function(){
                                self.$refs.form.reset();
                                //self.tot_buyamt = self.exchageTotalData.fee_to/100; 
                                self.loading1 = false;
                            },500);                                           
                            self.snackbar_text = "New order has been added to queue."
                            self.snackbar = true
                            self.$emit('childToParent', "Success") 
                        }else{
                            self.loading1 = false;
                            self.buyerr = true
                            self.buyerrorMsg = response.data.Result
                        }                                              
                    })
                    .catch(function (err) {
                       if(err.response.data.Result == 'User is blocked'){
                            self.snackbar_text = "Your account has been deactivated."
                            self.snackbar1 = true
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
                            self.snackbar1 = true
                            setTimeout(() => {
                            window.location.href = "/";
                            },2000)
                        }
                    });
            } else {
                window.location.href = "/";
            }
        },
        sell_save() {
            this.loading = true;
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let market_symbol = this.$route.path.split("/");
            let bodyFormData = {
                "market": market_symbol[2],
                "sellpricing": this.sellprice,
                "sellamount" : this.sellamount
            }
            if (auth_token) {
                
                const URL = process.env.VUE_APP_API_URL + "sell";
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
                        self.dialog1 = false
                        if (response.data.Success == true) {
                            setTimeout(function(){
                                self.$refs.form1.reset();
                                //self.tot_sellamt = self.exchageTotalData.fee_from/100;  
                                self.loading = false;
                            },500);                          
                            self.snackbar_text = "New order has been added to queue."
                            self.snackbar = true
                            self.$emit('childToParent', "Success") 
                        }else{
                            self.loading = false;
                            self.sellerr = true
                            self.sellerrorMsg = response.data.Result
                        }                                              
                    })
                    .catch(function (err) {
                        //handle error
                        if(err.response.data.Result == 'User is blocked'){
                            self.snackbar_text = "Your account has been deactivated."
                            self.snackbar1 = true
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
                            self.snackbar1 = true
                            setTimeout(() => {
                            window.location.href = "/";
                            },2000)
                        }
                    });
            } else {
                window.location.href = "/";
            }
        }
    }
};
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {

    background-color: #b6bcb5 !important;

}
</style>