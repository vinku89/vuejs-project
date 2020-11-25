<template>
<div class="col-12 pb-0">
    <v-row>
        <v-col cols="12" lg="6" class="pl-0 py-0">
            <div class="buy_col clearfix">
                <h4 class="float-left font-weight-bold"><span class="green_txt">Buy</span> <span>{{exchageTotalData.pair_currency}}</span></h4>
                <div class="available_bal">
                    
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
                        <v-col cols="12" sm="4" class="pl-0">
                            <p class="mt-2" v-if="exchageTotalData.fee_to == 0">Total</p>
                            <p class="mt-2" v-else>Total</p>
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
                        
                        <v-col cols="12" sm="4" class="pl-0 py-0 small_res">&nbsp;</v-col>
                         <!-- Small resolution display hide button -->
                        <v-col cols="12" sm="8" class="w-loginBtn pr-0 py-0 pl-0 small_res_hide">
                            <v-btn large color="success" @click="validate" class="w-100  custom-transform-class text-none">
                                <strong class="mr-1">Login</strong> or <strong class="mx-1">Register Now</strong>  to trade
                            </v-btn>
                        </v-col>

                        <!-- Small resolution display block button -->
                        <v-col class="small_res_block px-0" cols="12">
                            <v-btn large color="success" @click="validate" class="w-100  custom-transform-class text-none">
                                <strong class="mr-1">Login</strong> or <strong class="mx-1">Register Now</strong>  to trade
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </div>
        </v-col>
        <v-col cols="12" lg="6" class="pr-0 py-0">
            <div class="buy_col clearfix">
                <h4 class="float-left font-weight-bold"><span class="red_txt">Sell</span> <span>{{exchageTotalData.pair_currency}}</span></h4>
                <div class="available_bal">
                    
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
                    <v-col cols="12" sm="4" class="pl-0 ">
                        <p class="mt-2" v-if="exchageTotalData.fee_from == 0">Total<br />
                        <!-- Fee( 0.00% ) -->
                        </p>
                        <p class="mt-2" v-else>Total<br />
                        <!-- Fee( {{exchageTotalData.fee_from.toLocaleString('en',{maximumFractionDigits: 2})}}% ) -->
                        </p>
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
                    <v-col cols="12" sm="4" class="pl-0 py-0 small_res">&nbsp;</v-col>
                    <v-col cols="12" sm="8" class="w-loginBtn pr-0 py-0 pl-0 small_res_hide">
                        <v-btn large color="error" @click="validate1" class="w-100 custom-transform-class text-none">
                        <strong class="mr-1">Login</strong> or <strong class="mx-1">Register Now</strong>  to trade
                        </v-btn>
                    </v-col>

                      <!-- Small resolution display block button -->
                        <v-col class="small_res_block px-0" cols="12">
                            <v-btn large color="error" @click="validate1" class="w-100  custom-transform-class text-none">
                                <strong class="mr-1">Login</strong> or <strong class="mx-1">Register Now</strong>  to trade
                            </v-btn>
                        </v-col>
                </v-row>
              </v-form>
            </div>
        </v-col>

    </v-row>
    <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        
        <div class="ctn d-flex align-item-center">
            <div>
                <v-icon class="snak_chek">mdi-check-circle</v-icon>
            </div>
            <div class="title mb-1" >Created</div>
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
export default {
    name: 'BuySellWallet',
    components: {},
    props: {
        userInfo: {},
        exchageTotalData: {},
        testvalue: String
    },
    data: () => ({
        market_symbol: '',
        loading: false,
        loading1: false,
        sellerr: false,
        sellerrorMsg: '',
        buyerr: false,
        buyerrorMsg: '',
        valid: true,
        buyprice: '',
        buypriceRules: [
            v => !!v || 'Price is required',
            // v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Price should be greater than 0',
            // v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid price',
            // v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        buyamount: '',
        buyamountRules: [
            v => !!v || 'Amount is required',
            // v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
            // v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
            // v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        valid1: true,
        sellprice: '',
        sellpriceRules: [
            v => !!v || 'Price is required',
            //  v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Price should be greater than 0',
            // v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid price',
            // v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        sellamount: '',
        sellamountRules: [
            v => !!v || 'Amount is required',
            //  v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
            // v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
            // v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
        ],
        snackbar: false,
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
            this.market_symbol = to.path.split("/")[2];
            this.$refs.form.reset();
            this.$refs.form1.reset();   
            this.buyerr = false
            this.buyerrorMsg = "";
            this.sellerr = false
            this.sellerrorMsg = ""         
        }
        
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
            this.$router.push("/login");
        },
        validate1() {
            this.$router.push("/login");
        },
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