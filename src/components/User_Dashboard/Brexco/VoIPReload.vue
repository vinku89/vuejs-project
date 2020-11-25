<template>


       
         <v-container class="mbl_Bspace pt-0">
             <v-col class="black_txt text-center pt-0" v-show="serviceChildType">
                 <!-- <img src="../../../assets/images/mbl-reload.png" alt="" class="mb-2"> -->
                 <img :src="`${app_url}brexco_images/${serviceData.service_logo}`" class="service-image"/>
                 <h3 class="font-weight-bold text-center text-uppercase mb-6 small_device_title">voIP</h3>

                 <h5>Please select voIP option</h5>

             </v-col>

            <v-col v-show="operatorSel" >
              <v-row class="mb-6">
                  <v-col cols="12" md="4" class="pt-2 position-relative">
                    <h5 class="black_txt mb-4"><sup class="red_txt">*</sup>Please choose payment option</h5>
                    <cool-select
                        v-model="voIPReload"
                        :items="cryptoPaymentsList"
                        :placeholder="voIPReload ? '' : cryptoplaceholder"
                        item-value="crypto_symbol"
                        item-text="crypto_name"
                         class="mblrld_select" 
                        :class="[cryptoclass,cryptoerrclass]"
                        >
                        <!-- slot for each item in the menu -->
                        <template slot="item" slot-scope="{ item: voIPReloadOption }">
                            <div v-on:click="selCrypto()" style="display: flex; align-items: center;" v-if="voIPReloadOption.crypto_name!=''">
                            <img  v-bind:src="`${adminUrl}/coin_listing_images/${voIPReloadOption.coin_image}`" class="cryptoLogo">

                            <div>
                                
                                <h3>{{ voIPReloadOption.crypto_name }}</h3>
                                <p>{{ voIPReloadOption.balance }}</p>
                                <p>{{ voIPReloadOption.usd_balance }}</p>
                            </div>
                            </div>
                            <div v-if="voIPReloadOption.crypto_name==''">{{ voIPReloadOption.crypto_symbol }}</div>
                        </template>
                        <!-- slot for the selected item (in the text field) -->
                        <template slot="selection" slot-scope="{ item: voIPReloadOption }">
                            <img v-if="voIPReloadOption.crypto_name!=''" v-bind:src="`${adminUrl}/coin_listing_images/${voIPReloadOption.coin_image}`" class="cryptoLogo">

                            <div>
                            <h3>{{ voIPReloadOption.crypto_name }}</h3>
                                <p>{{ voIPReloadOption.balance }}</p>
                                <p>{{ voIPReloadOption.usd_balance }}</p>
                            </div>
                        </template>
                    </cool-select>
                    <v-icon class="custm_menuarrow">mdi-menu-down</v-icon>
                    <div class="error_msg w-100" v-show="isselcrypto">
                        Please choose payment option
                    </div>
                    <div class="error_msg w-100" v-show="paymentOption">
                        Insufficient crypto balance. Please choose another payment option
                    </div>
                    <img src="../../../assets/images/discount_img.png" alt="" class="img-fluid">
                  </v-col>

                   <v-col cols="12" md="4" class="pt-2 position-relative">
                    <h5 class="black_txt mb-4"><sup class="red_txt">*</sup>Please choose your voIP Operator</h5>
                    <cool-select
                        v-model="operator"
                        :items="operatorsList"
                        :placeholder="operator ? '' : 'Select voIP Operator'"
                        item-value="operator_id"
                        item-text="operator_name"
                        class="mblrld_select"
                        :class="[operatorclass,operatorerrclass]"
                        >
                        <!-- slot for each item in the menu -->
                        <template slot="item" slot-scope="{ item: operatorsList }">
                            <div @change="getOperatorSel(operatorsList)" style="display: flex; align-items: center;" v-if="operatorsList.operator_name!=''">
                            <img v-if="operatorsList.operator_id!=''" :src="getOperator(operatorsList.operator_id)" style="height:30px" class="cryptoLogo" @error="imageUrlAlt">

                            <div>
                                
                                <h3 v-if="operatorsList.operator_name!=''">{{ operatorsList.operator_name }}</h3>
                                <h3 v-if="operatorsList.operator_name==''">{{ operatorsList.operator_text }}</h3>
                                
                            </div>
                            </div>
                            <div v-if="operatorsList.operator_name==''">{{ operatorsList.operator_text }}</div>
                        </template>
                        <!-- slot for the selected item (in the text field) -->
                        <template slot="selection" slot-scope="{ item: operatorsList }">
                           <img v-if="operatorsList.operator_id!=''" :src="getOperator(operatorsList.operator_id)" class="cryptoLogo"  @error="imageUrlAlt"> 

                            <div>
                            <h3>{{ operatorsList.operator_name }}</h3>
                               
                            </div>
                        </template>
                    </cool-select>
                    <v-icon class="custm_menuarrow">mdi-menu-down</v-icon>
                    <div class="error_msg w-100" v-show="isseloperator">
                        Please choose operator option
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h5 class="black_txt mb-4 text-center"><sup class="red_txt">*</sup>Your mobile number</h5>
                    <div class="position-relative d-inline-block" :class="mblnumselclass">
                      <v-text-field
                        @paste="checkNumber($event)"
                        outlined
                        single-line
                        class="mbl_no"
                        placeholder="MOBILE NUMBER"
                        hide-details
                        @keypress="isNumber($event)"
                        v-model="accountNumber"
                        maxLength="15"
                        v-on:keyup="getAttributeLength"
                        :class="mblnoError"
                      ></v-text-field>
                      <span class="enter_btn">
                        <img v-show="mobilefieldact" src="../../../assets/images/inactive-no.png" alt="">
                        <img v-show="!mobilefieldact" src="../../../assets/images/active-no.png" alt="" v-on:click="getProducts()">
                      </span>
                      <span class="countryCode"> <input outlined single-line readonly v-model="countryCode" style="width:62px"/></span>
                      <div class="error_msg w-100 " style="top:3px" v-show="haveaccountNumber">
                        {{mbl_err_txt}}
                      </div>
                    </div>
                  </v-col>
                 
              </v-row>
            </v-col>
            <v-col v-show="products_block">
           

              <h5 class="black_txt mb-4 text-center">Please choose available amount for selected operator</h5>

              <v-col md="10" offset-md="1">
                <v-row>
                   
                   <v-col  cols="12" xl="4" lg="6" md="6" sm="6" v-for="product in products" :key="product.product_id">
                     <div class="avl_amt" v-on:click="showTransactionForm(product)">
                       <h2>{{product.product_name}}</h2>
                     </div>
                   </v-col>
                   
                </v-row>
              </v-col>

          </v-col>
            <div  v-show="confirm_block" id="confirm_block_div">
             <h5 class="black_txt mb-3 text-center">Please confirm your payment</h5>
             <v-col class="confirm_payment_bg mb-7">
               <v-row>
                 <v-col cols="12" md="5" class="text-right">
                   <v-col class="confirm_div1"> 
                     <div class="coinInfo">
                       <p class="mb-0 text-uppercase">you are exchanging</p>
                       <h3 class="mb-0 dark_green_txt font-weight-bold">{{ crypto_amount}}</h3>
                       <p class="mb-0">$ {{usd_amount}} USD</p>
                     </div>
                     <img :src="crypto_image" alt="" style="width:50px">
                   </v-col>
                 </v-col>
                 <v-col cols="12" md="2" class="text-center arrow_wrap">
                   <v-icon class="arrowIcon">mdi-arrow-right-circle-outline</v-icon>
                 </v-col>
                 <v-col cols="12" md="5">
                    <v-col class="confirm_div2">
                      <div class="oparator_logo">
                        <img :src="`https://operator-logo.dtone.com/logo-${operator}-1.png`" alt="" @error="imageUrlAlt">
                      </div>
                       
                      <div class="coinInfo">
                        <p class="mb-0 text-uppercase">pay utilities payment</p>
                        <h3 class="mb-0 dark_green_txt font-weight-bold">{{product_amount}}</h3>
                        <p class="mb-0">$ {{usd_amount}} USD</p>
                      </div>
                     
                   </v-col>
                 </v-col>
               </v-row>
             </v-col>

             <v-col class="payment_calc_wrp">
                <table class="table">
                  <tbody>
                    <tr>
                      <td class="font-weight-bold">{{sel_operator_name}}</td>
                      <td class="text-right">{{product_amount}}</td>
                    </tr>
                    
                     <tr>
                      <td>Mobile Number</td>
                      <td class="text-right">{{countryCode}} {{accountNumber}}</td>
                    </tr>
                    <tr>
                      <td colspan="2" >&nbsp;</td>
                    </tr>
                    <tr>
                      <td colspan="2" class="border-bottom"></td>
                    </tr>
                    <tr>
                      <td colspan="2" >&nbsp;</td>
                    </tr>
                     <tr>
                      <td>Currencies</td>
                       <td class="text-right">{{ crypto_amount}}</td>
                    </tr>
                    <tr style="background-color:#F8E71C">
                      <td class="p-3">Discount (<strong>{{discount_perc}}%</strong>)</td>
                      <td class="text-right p-3">- {{discount}}</td>
                    </tr>
                    
                    <tr>
                      <td colspan="2" >&nbsp;</td>
                    </tr>
                    <tr>
                      <td colspan="2" class="border-bottom"></td>
                    </tr>
                    <tr>
                      <td colspan="2" class="text-right font-weight-bold">{{amount_with_fee}}</td>
                    </tr>
                    <tr>
                      <td colspan="2" >&nbsp;</td>
                    </tr>
                     <tr>
                      <td>Blockchain Fee</td>
                       <td class="text-right">+ {{blockchain_fee}}</td>
                    </tr>
                     <tr>
                      <td colspan="2" class="border-bottom"></td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="f25 font-weight-bold">Total</td>
                      <td class="text-right f25 font-weight-bold">{{total_amount}}</td>
                    </tr>
                      <tr>
                      <td colspan="2" class="border-bottom"></td>
                    </tr>
                  </tbody>
                </table>
                <div class="position-relative text-center" style="margin-top:60px">
                  <v-textarea
                    v-model="TransactionNotes"
                    auto-grow
                    autofocus
                    label="Transaction Notes"
                    rows="1"
                    class="transactionNotes"
                    maxLength="250"
                    
                  ></v-textarea>
                  <!-- errorTxt class -->
                  <p class="text-right black_txt" style="margin-top:-10px"> Add a purpose of the transaction</p>
                  <!-- <div class="error_msg top_minus" v-show="emptyNote">
                    Please enter purpose of the transaction
                  </div> -->
                </div>

                <v-row class="mt-5">
                  <v-col>
                     <v-btn class="w-100 cancelBt" depressed x-large dark v-on:click="cancelTrans()">CANCEL</v-btn>
                  </v-col>
                  <v-col>
                     <v-btn x-large color="success" dark class="w-100" depressed :disabled="confirmbtn" @click="check2fa()">CONFIRM</v-btn>
                  </v-col>
                </v-row>
             </v-col>
         </div>

            <!-- Payment confirmation 2FA -->
            <template>
              <v-row justify="center">
                <v-dialog v-model="payment2fa" persistent max-width="500" content-class="confirmation2fa">
                  <v-card class="text-center">
                    <h4 class="text-center font-weight-bold mb-8">Payment Confirmation</h4>
                    <img src="../../../assets/images/google-2fa.png" alt="" class="mb-4">
                   
                    <h5 class="font-weight-bold mb-4">Two-Factor Google Aunthenticator</h5>
                     <div id="twofa_wrp" class="mb-5 position-relative">
                        <input class="ti_tfa" type="text" @keypress="is2faNumber($event)" v-model="titfa1" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                        <input class="ti_tfa" type="text" @keypress="is2faNumber($event)" v-model="titfa2" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                        <input class="ti_tfa" type="text" @keypress="is2faNumber($event)" v-model="titfa3" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                        <input class="ti_tfa" type="text" @keypress="is2faNumber($event)" v-model="titfa4" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                        <input class="ti_tfa" type="text" @keypress="is2faNumber($event)" v-model="titfa5" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                        <input class="ti_tfa" type="text" @keypress="is2faNumber($event)" v-on:keyup="submitTransaction($event)" v-model="titfa6" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                       <div class="error_msg error_position" v-show="titwofa_err">
                        Please enter valid verification code
                      </div>
                    </div>

                    <p class="mb-10">Enter the 2-step verification code provided by Google Aunthenticator app</p>

                      <v-card-actions class="close_btn_wrp " v-on:click="payment2fa = false">
                          <v-icon class="black_txt" v-on:click="payment2fa = false">mdi-close</v-icon>
                      </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>

             <!-- Payment confirmation succeefull -->
            <template>
              <v-row justify="center">
                <v-dialog v-model="paymentCompleted" persistent max-width="500" content-class="confirmation2fa">
                  <v-card class="text-center">
                    <h4 class="text-center font-weight-bold mb-8">Transaction Completed</h4>
                    <v-icon class="green_txt" style="font-size: 65px;">mdi-check-circle</v-icon>
                   
                    <h4 class="font-weight-bold mb-6">Success!</h4>
                    

                    <p class="mb-0 f18">You have successfully sent</p>
                    <p class="mb-0 font-weight-bold f18">{{total_amount}} / {{product_amount}}</p>
                    <p class="mb-7 f18">for voIP</p>

                      <v-card-actions class="close_btn_wrp ">
                          <v-icon class="black_txt" @click="close_success_popup()">mdi-close</v-icon>
                      </v-card-actions>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" class="w-100"  @click="close_success_popup()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
            <template>
              <v-row justify="center">
                <v-dialog v-model="paymentFailure" persistent max-width="500" content-class="confirmation2fa">
                  <v-card class="text-center">
                    <h4 class="text-center font-weight-bold mb-8">Transaction Failure</h4>
                    <!-- <v-icon class="green_txt" style="font-size: 65px;">mdi-check-circle</v-icon> -->
                   
                  <v-icon class="red_txt" style="font-size: 65px;">mdi-close-circle</v-icon>

                    <p class="mb-0 f18">{{transfailuretext}}, please contact support team.</p>
                    
                      <v-card-actions class="close_btn_wrp ">
                          <v-icon class="black_txt" @click="close_success_popup()">mdi-close</v-icon>
                      </v-card-actions>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" class="w-100"  @click="close_success_popup()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
     <v-overlay  :value="overlay" style="z-index:205;">
        <!-- <v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img> -->
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
    <v-snackbar class="mbl_reload_noti" v-model="snackbar" color="yellow" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snakbar_date }}<br>
        <p class="mt-2 mb-0">{{ snakbar_text }}</p>

        <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>
         </v-container>


</template>

<script>
import axios from 'axios';
import { CoolSelect } from "vue-cool-select";
import $ from "jquery";
import qs from 'qs';
export default {
     el: '#myapp',
     name: 'voIPReload',
     components: {
        CoolSelect
     },
     props: {
       serviceData: {},
       countryCode:{},
       operatorsList:{},
       selCountry:{}
       //refreshdata:{}
      
    },
  data: () => ({
    cryptoplaceholder:'CHOOSE PAYMENT OPTION',
    cryptoerrclass:"",
    mblnoError:"",
    operatorerrclass:"",
    mblnumselclass:"",
    cryptoclass:"",
    operatorclass:"",
    mobilefieldact:true,
    transfailuretext:"Your transaction has been failed",
    snackbar:false,
    snackbar_date:"",
    snackbar_text: "",
    mbl_err_txt:"Please enter mobile number",
    haveaccountNumber:false,
    isselcrypto:false,
    isseloperator:false,
    confirmbtn:false,
    
    overlay:false,
    paymentOption:false,
    titwofa_err:false,
    titfa1: '',
    titfa2: '',
    titfa3: '',
    titfa4: '',
    titfa5: '',
    titfa6: '',
    isActive: false,
    //emptyNote:false,
    serviceChildType:true,
    products_block:false,
    amount_with_fee:'',
    discount_perc:0,
    discount:0,
    total_amount:'',
    blockchain_fee:'',
    product_amount:'',
    usd_amount:'',
    crypto_image:'',
    TransactionNotes:'',
    accountNumber:'',
     adminUrl: '',
      app_url:'',
      countryCode:"+602",
      cryptos:[],
     payment2fa: false,
     operatorSel:true,
     paymentCompleted: false,
     paymentFailure:false,
      prepaid: false,
      postpaid: false,
      myr50: true,
      voIPReload: "",
      inputNumber:0,
      products:[],
      operator: "",
      cryptoPaymentsList: [],
        operatorItems: [],
        productclass:'avl-amt',
        crypto_amount:'',
        sel_operator_name:"",
        confirm_block:false,
        is_enabled_twofa:true,
        sel_product:'',
        vertical: true,
            timeout: 6000,
            color: "yellow",
        x: 'right',
        y: 'top',
  }),
  mounted: function(){
  ///alert(this.selCountry);
this.app_url=process.env.VUE_APP_NAME;
this.cryptoPaymentsListMethod();
this.adminUrl = process.env.VUE_APP_ADMIN_URL;
this.serviceChildType=true;
this.operatorSel=true;
this.voIPReload='';
this.products_block=false;
this.confirm_block=false;
this.operator='';
this.accountNumber='';
this.prepaid=false;
this.postpaid=false;

//alert(this.refreshdata);
$(function () {
        'use strict';
        var body = $('body');
        function goToNextInput(e) {
            this.titwofa_err=false;
            var target = e.srcElement || e.target;                
            var maxLength = parseInt(target.attributes["maxlength"].value, 6);
            var myLength = target.value.length;
            if (myLength >= maxLength) {
                var next = target;
                if (next == null)
                {                        
                    return false;                                              
                }
                if (next.tagName.toLowerCase() === "input") {
                    $(target).addClass("tfa_active_cls");
                    target.nextElementSibling.focus()
                    return false;
                }
            }
            // Move to previous field if empty (user pressed backspace)
            else if (myLength === 0) {
                this.titwofa_err = false;
                var previous = target;
                if (previous == null)
                {
                    return false;
                }
                if (previous.tagName.toLowerCase() === "input") {
                    target.previousElementSibling.focus(); 
                    return false;
                }
            }
        
        }
        //body.on('keyup', '.ga_tfa', goToNextInput);
        body.on('keyup', '.ti_tfa', goToNextInput);
    })
  },

  watch:{
    voIPReload:function(val){
      //console.log(val);
      this.paymentOption=false;
      if(val=='Choose Payment Option' || val=="" || val==null){
        this.cryptoerrclass="cryptofeilderr";
        this.isselcrypto=true;
        this.operator='';
        this.accountNumber='';
        this.mobilefieldact=true;
         this.cryptoclass="";
      }else{
        this.cryptoclass="selectInput";
        this.cryptoerrclass="";
        this.isselcrypto=false;
      }
      this.products_block=false;
      this.confirm_block=false;
    },
    operator:function(val){
      //console.log(val);
      if(val=='Choose Payment Option' || val=="" || val==null){
        this.operatorerrclass="opError";
        this.isseloperator=true;
        this.operatorclass="";
          this.accountNumber='';
        this.mobilefieldact=true;
      }else{
        this.operatorclass="selectInput";
        this.operatorerrclass="";
        this.isseloperator=false;
      }
      this.products_block=false;
      this.confirm_block=false;
    }
  },

  
  methods: {
    close_success_popup:function(){
      this.paymentCompleted=false;
      this.$router.go();
    },
    submitTransaction: function (evt) {
      evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ( charCode == 13) {
            evt.preventDefault();
        }else{
          var maxlength = event.target.getAttribute('maxlength');
          let verifyCode = this.titfa6
          if (maxlength == verifyCode.length) {
              this.callTransaction();
          }
        }
        
    },
    callTransaction: function(){
      //this.$emit('parentLoader', "open");
      
      var self= this;
      self.overlay=true;
      let auth_token = this.$store.getters.authToken;
      let two_fa = this.titfa1+this.titfa2+this.titfa3+this.titfa4+this.titfa5+this.titfa6
      let bodyFormData = {
          "country": this.selCountry,
          "service": self.serviceData.portal_service_id,
          "crypto" : this.voIPReload,
          "operator": this.operator,
          "account_number":this.accountNumber,
          "mobile_number":this.accountNumber,
          "product":this.sel_product,
          "two_fa" : two_fa,
          "transaction_note":this.TransactionNotes,
          "country_code":this.countryCode
      }
      if (auth_token) {
          const URL = process.env.VUE_APP_API_URL + "brexcoTransaction";
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
              //self.$emit('parentLoader', "close");
              //self.$emit('childSnack', response.data.Result);
              self.snakbar_date = response.data.snakbar_date;
              self.snakbar_text = response.data.snakbar_text;
            self.snackbar = true;
              self.confirmbtn=false;
              self.overlay=false;
              //console.log(response);
              self.payment2fa=false;
              self.paymentCompleted=true;
              
          })
          .catch(function (err) {
            self.overlay=false;
            self.confirmbtn=false;
              if(err.response.data.response_code == 1){
                //alert(err.response.data.Result);
                  //self.loading1 = false;
                  self.titwofa_err = true
              }else if(err.response.data.response_code == 2 || err.response.data.response_code == 3){
                //alert(err.response.data.Result);
                  //self.loading1 = false;
                  self.cryptoerrclass="cryptofeilderr";
                  self.payment2fa=false;
                  self.confirm_block=false;
                  self.products_block=false;
                  self.paymentOption=true;
                  self.titwofa_err = true;
              }else{
                  self.transfailuretext=err.response.data.Result;
                  self.paymentFailure=true;
                  self.payment2fa=false;
                  
              }
              
              
          });
      }
    },
    cancelTrans: function(){
       this.serviceChildType=false;
       this.voIPReload='';
       this.products_block=false;
       this.confirm_block=false;
       this.operator='';
       this.accountNumber='';
       this.operatorSel=false;
      this.$emit('childToParent', "Success");
      $("html, body").animate({ scrollTop: 0 }, 1000);
    },
    selCrypto: function(){
      //alert();
      this.products_block=false;
      this.confirm_block=false;
      this.operator='';
      this.accountNumber='';
      this.mobilefieldact=true;
      this.cryptoclass="selectInput";
      this.mblnumselclass="";
    },
    getOperatorSel: function(selOperator){
      //alert(selOperator.operator_name);
      //console.log('operator Data'+selOperator.operator_name);
      if(selOperator.operator_name!=''){
        this.sel_operator_name= selOperator.operator_name;
      }else{
        this.sel_operator_name= selOperator.operator_text;
      }
      //this.sel_operator_name=selOperator.operator_name;
      this.products_block=false;
      this.confirm_block=false;
      this.accountNumber='';
      this.mobilefieldact=true;
      this.mblnumselclass="";
      this.operatorclass="selectInput";
    },
    showTransactionForm: function(product){
      //console.log(product.gift_card_name);
      
      var elems = document.querySelectorAll(".avl_amt");

      [].forEach.call(elems, function(el) {
          el.classList.remove("active_amt");
      });
      event.target.classList.add('active_amt');
      event.target.parentNode.classList.add('active_amt');
      var self= this;
      self.sel_product=product.product_id;
      self.sel_operator_name=product.gift_card_name;
      self.TransactionNotes="";
      let auth_token = this.$store.getters.authToken;
      if (auth_token) {
          const URL = process.env.VUE_APP_API_URL + "getBrexcoConfirmDet/"+self.voIPReload+"/"+product.amount+"/"+product.currency_type;
          axios({
              method: 'get',
              url: URL,
              headers: {
                  "accept": "application/json",
                  "Authorization": "Bearer " + auth_token
              }
          })
          .then(function (response) {
            console.log(response);
            self.confirm_block=true;
            self.crypto_amount=response.data.Result.crypto_amount+" "+self.voIPReload;
            self.blockchain_fee=response.data.Result.blockchain_fee+" "+self.voIPReload;
            self.product_amount=response.data.Result.amount+" "+product.currency_type;
            self.discount_perc=response.data.Result.discount_perc;
            self.discount=response.data.Result.discount+" "+self.voIPReload;
            self.total_amount=response.data.Result.amount_with_fee+" "+self.voIPReload;
            self.amount_with_fee=response.data.Result.amount_with_discount+" "+self.voIPReload;
            self.usd_amount=response.data.Result.usd_amount;
            self.crypto_image=self.adminUrl+"/coin_listing_images/"+response.data.Result.crypto_image;
              //self.products = response.data.Result;
            if(response.data.Result.is_enabled_twofa=='A'){
              self.is_enabled_twofa=true;
            }else{
              self.is_enabled_twofa=false;
            }
            // setTimeout(function(){
            //   $('html, body').animate({ 'scrollTop' : $("#confirm_block_div").offset().top }, 1000);
            // },1000);
          })
          .catch(function () {
              self.snackbar_err_text = "Server busy, please try after sometime."
              self.snackbar_err = true
              setTimeout(() => {
              //window.location.href = "/";
              },2000)
              
          });
      }
    },
    check2fa: function(){
      
       if(this.is_enabled_twofa){
          this.payment2fa=true;
        }else{
          this.confirmbtn=true;
          this.callTransaction();
        }
     
      // else{
      //    this.emptyNote=true;
      // }
      
    },
    checkNumber:function(evt) {
      evt.preventDefault();
      //alert(evt);
      let amt = evt.clipboardData.getData('text');
            let bamt = amt.replace(/\s/g,"");
            let mnum = bamt.replace(/,/g, '');
      this.accountNumber = mnum.replace(/[^0-9]/g, '');
      //alert(this.accountNumber);
      if(this.accountNumber.length>15){
        this.accountNumber=this.accountNumber.substring(0,15);
      }
    },
    isNumber: function(evt) {
        if(this.accountNumber.length>=15){
          evt.preventDefault();
        }
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();
        } else if (charCode === 46) {
            evt.preventDefault();
        } else {
            return true;
        }
    },
    is2faNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();
        } else {
            if(charCode==13){
              evt.preventDefault();
            }else{
              return true;
            }
            
        }
    },
    getAttributeLength: function(){
       var elems = document.querySelectorAll(".avl_amt");

      [].forEach.call(elems, function(el) {
          el.classList.remove("active_amt");
      });
      //var maxlength = event.target.getAttribute('maxlength');            
      let accountNumber = this.accountNumber    
      this.products_block=false;
      this.confirm_block=false;
      if(accountNumber=="" || accountNumber==0){
        this.mblnoError="mblnoErrorclass";
        this.haveaccountNumber=true;
      }else{
        this.mblnoError="";
        this.haveaccountNumber=false;
      }
     if(this.voIPReload==null || this.voIPReload=="" || this.voIPReload=='Choose Payment Option'){
       this.cryptoerrclass="cryptofeilderr";
        this.isselcrypto=true;
        this.cryptoclass="";
      }
     if(this.operator=="" || this.operator==null ){
       this.operatorerrclass="opError";
          this.operatorclass="";
        this.isseloperator=true;
      } 
      this.mobilefieldact=true;
      this.mblnumselclass="";
      
       if(this.voIPReload!="" && this.voIPReload!=null && this.operator!='' && this.operator!=null ){
        
        if(accountNumber>0){
          this.mblnoError="";
          this.haveaccountNumber=false;
          //if (maxlength == accountNumber.length) {
            
           // this.getProducts();
          //}
          this.mblnumselclass="selmblnumber";
          this.mobilefieldact=false;
        }else{
              this.mbl_err_txt="Please enter valid mobile number";      
            }
        
      }
      
    },
    // getTransactionLength: function(){
    //   this.emptyNote=false;
      
    //   if (this.TransactionNotes.trim()=='') {
    //       this.emptyNote=true;
    //   }
    // },
    getProducts: function(){
      var self= this;
      self.overlay=true;
      let auth_token = this.$store.getters.authToken;
      if (auth_token) {
          const URL = process.env.VUE_APP_API_URL + "getBrexcoProducts/"+self.selCountry+"/"+self.serviceData.portal_service_id+"/"+self.operator;
          axios({
              method: 'get',
              url: URL,
              headers: {
                  "accept": "application/json",
                  "Authorization": "Bearer " + auth_token
              }
          })
          .then(function (response) {
              self.overlay=false;
              self.products = response.data.Result;
              self.products_block=true;
          })
          .catch(function () {
              self.snackbar_err_text = "Server busy, please try after sometime."
              self.snackbar_err = true
              setTimeout(() => {
              //window.location.href = "/";
              },2000)
              
          });
      }
    },
    imageUrlAlt(event) {
        event.target.src = this.app_url+"brexco_images/undefined.svg";
    },
    // gets a flag pictur
    getFlag(voIPReload_crypto,adminUrl) {
      try {
        //alert();
        return require(`${adminUrl}/coin_listing_images/${voIPReload_crypto.toLowerCase()}`);
      } catch (e) {
        return require("../../../assets/images/crypto/undefined.svg");
      } 
    },
   getOperator(voIPReload_operator) {
      try {
        return `https://operator-logo.dtone.com/logo-${voIPReload_operator}-1.png`;
      } catch (e) {
        return require("../../../assets/images/crypto/undefined.svg");
      } 
    },
    showOperator(reloadOption){
      this.voIPReload='';
      this.products_block=false;
      this.confirm_block=false;
      this.operator='';
      this.accountNumber='';
      this.operatorSel=true;
      if(reloadOption=='prepaid'){
        this.prepaid=true;
        this.postpaid=false;
        this.operatorSel=true;
      }else if(reloadOption=='postpaid'){
        this.prepaid=false;
         this.postpaid=true;
         this.operatorSel=true;
      }
    },
    cryptoPaymentsListMethod(){
      //alert();
       var self= this;
        let auth_token = this.$store.getters.authToken;
        if (auth_token) {
            const URL = process.env.VUE_APP_API_URL + "getBrexcoCryptos";
            axios({
                method: 'get',
                url: URL,
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer " + auth_token
                }
            })
            .then(function (response) {
              if(response.data.Result[0].crypto_symbol==""){
                self.cryptoplaceholder="NO PAYMENT OPTIONS";
              }
                self.cryptoPaymentsList = response.data.Result;
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
        }
    }
  },



};
</script>

<style lang="css" scoped>
@import "../../../../node_modules/vue-cool-select/dist/themes/material-design.css";
</style>
