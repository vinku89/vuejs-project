<template>
         <v-container>
             <v-col class="black_txt text-center">
                 <img src="../../../assets/images/e-wallet-reload.png" alt="" class="mb-2">
                 <h3 class="font-weight-bold text-center text-uppercase mb-10">E-Wallet reload</h3>
            </v-col>

            <v-col  >
              <v-row class="mb-6">
                  <v-col cols="12" md="4" class="pt-2 position-relative text-center">
                    <h5 class="black_txt mb-4 text-left"><sup class="red_txt">*</sup>Please choose payment option</h5>
                    <cool-select
                        v-model="mobileReload"
                        :items="items"
                        :placeholder="mobileReload ? '' : 'Select mobileReloadOption'"
                        item-value="name"
                        item-text="name"
                        class="mblrld_select"
                        >
                        <!-- slot for each item in the menu -->
                        <template slot="item" slot-scope="{ item: mobileReloadOption }">
                            <div style="display: flex; align-items: center;">
                            <img :src="getFlag(mobileReloadOption.brandSimbel)" class="cryptoLogo">

                            <div>
                                
                                <h3>{{ mobileReloadOption.name }}</h3>
                                <p>{{ mobileReloadOption.cryptoBal }}</p>
                                <p>{{ mobileReloadOption.usdBal }}</p>
                            </div>
                            </div>
                        </template>
                        <!-- slot for the selected item (in the text field) -->
                        <template slot="selection" slot-scope="{ item: mobileReloadOption }">
                            <img :src="getFlag(mobileReloadOption.brandSimbel)" class="cryptoLogo">

                            <div>
                            <h3>{{ mobileReloadOption.name }}</h3>
                                <p>{{ mobileReloadOption.cryptoBal }}</p>
                                <p>{{ mobileReloadOption.usdBal }}</p>
                            </div>
                        </template>
                    </cool-select>
                    <v-icon class="custm_menuarrow">mdi-menu-down</v-icon>
                    <div class="error_msg w-100">
                        Pleasen choose payment option
                    </div>
                     <a href=""><img src="../../../assets/images/discount_img.png" alt=""></a>
                     
                  </v-col>
                  <v-col cols="12" md="4" class="pt-2 position-relative text-center">
                    <h5 class="black_txt mb-4 text-left"><sup class="red_txt">*</sup>Please choose your operator</h5>
                    <cool-select
                        v-model="operator"
                        :items="operatorItems"
                        :placeholder="operator ? '' : 'Select operatorOption'"
                        item-value="name"
                        item-text="name"
                        class="mblrld_select"
                        >
                        <!-- slot for each item in the menu -->
                        <template slot="item" slot-scope="{ item: operatorOption }">
                            <div style="display: flex; align-items: center;">
                            <img :src="getOperator(operatorOption.brandSimbel)" class="cryptoLogo">

                            <div>
                                
                                <h3>{{ operatorOption.name }}</h3>
                                <p>{{ operatorOption.cryptoBal }}</p>
                                <p>{{ operatorOption.usdBal }}</p>
                            </div>
                            </div>
                        </template>
                        <!-- slot for the selected item (in the text field) -->
                        <template slot="selection" slot-scope="{ item: operatorOption }">
                            <img :src="getOperator(operatorOption.brandSimbel)" class="cryptoLogo">

                            <div>
                            <h3>{{ operatorOption.name }}</h3>
                                <p>{{ operatorOption.cryptoBal }}</p>
                                <p>{{ operatorOption.usdBal }}</p>
                            </div>
                        </template>
                    </cool-select>
                    <v-icon class="custm_menuarrow">mdi-menu-down</v-icon>
                    <div class="error_msg w-100">
                        Pleasen choose operator option
                    </div>
                  </v-col>


                  <v-col cols="12" md="4">
                    <h5 class="black_txt mb-4"><sup class="red_txt">*</sup>Your account number</h5>
                    <div class="position-relative">
                      <v-text-field
                        outlined
                        single-line
                        label="account number"
                        class="account_no"
                        hide-details
                      ></v-text-field>
                      <div class="error_msg w-100 " style="top:3px">
                        Pleasen enter account number
                      </div>
                    </div>
                  </v-col>
               
              </v-row>
              <v-col cols="12" md="4" offset-md="4" class="mb-7">
                <h5 class="black_txt text-center mb-4"><sup class="red_txt">*</sup>Amount payment</h5>
                <div class="position-relative">
                      <v-text-field
                        outlined
                        single-line
                        label="0.00"
                        class="account_no placeholder_p"
                        hide-details
                        type="number"
                      ></v-text-field>
                      <div class="cntry_cury_simbl">MYR</div>
                      <div class="error_msg w-100 " style="top:3px">
                        Pleasen enter amount payment
                      </div>
                    </div>
              </v-col>


       

             <h5 class="black_txt mb-3 text-center">Please confirm your payment</h5>
             <v-col class="confirm_payment_bg mb-7">
               <v-row>
                 <v-col cols="12" md="5" class="text-right">
                   <v-col class="confirm_div1"> 
                     <div class="coinInfo">
                       <p class="mb-0 text-uppercase">you are exchanging</p>
                       <h3 class="mb-0 dark_green_txt font-weight-bold">1,178.42407165 EVR</h3>
                       <p class="mb-0">$ 11.71 USD</p>
                     </div>
                     <img src="../../../assets/images/ever-card.png" alt="">
                   </v-col>
                 </v-col>
                 <v-col cols="12" md="2" class="text-center arrow_wrap">
                   <v-icon class="arrowIcon">mdi-arrow-right-circle-outline</v-icon>
                 </v-col>
                 <v-col cols="12" md="5">
                    <v-col class="confirm_div2">
                      <img src="../../../assets/images/ever-card.png" alt=""> 
                      <div class="coinInfo">
                        <p class="mb-0 text-uppercase">pay utilitilies payment</p>
                        <h3 class="mb-0 dark_green_txt font-weight-bold">50.00 EVR</h3>
                        <p class="mb-0">$ 11.71 USD</p>
                      </div>
                     
                   </v-col>
                 </v-col>
               </v-row>
             </v-col>

             <v-col class="payment_calc_wrp">
                 <table class="table">
                  <tbody>
                    <tr>
                      <td class="font-weight-bold">GrabPay E-Wallet</td>
                      <td class="text-right">50.00 MYR</td>
                    </tr>
                    
                     <tr>
                      <td>Account Number</td>
                      <td class="text-right">7628817266-A</td>
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
                       <td class="text-right">1,178.42407165 EVR</td>
                    </tr>
                    <tr>
                      <td>Blockchain Fee</td>
                       <td class="text-right">+ 70.0000000 EVR</td>
                    </tr>
                    <tr>
                      <td colspan="2" >&nbsp;</td>
                    </tr>
                    <tr>
                      <td colspan="2" class="border-bottom"></td>
                    </tr>
                    <tr>
                      <td colspan="2" class="text-right font-weight-bold">1248.42407165 EVR</td>
                    </tr>
                    <tr>
                      <td colspan="2" >&nbsp;</td>
                    </tr>
                     <tr style="background-color:#F8E71C">
                      <td class="p-3">Discount (<strong>5%</strong>)</td>
                      <td class="text-right p-3">-62.42129358 EVR</td>
                    </tr>
                     <tr>
                      <td colspan="2" class="border-bottom"></td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="f25 font-weight-bold">Total</td>
                      <td class="text-right f25 font-weight-bold">1186.42407165 EVR</td>
                    </tr>
                      <tr>
                      <td colspan="2" class="border-bottom"></td>
                    </tr>
                  </tbody>
                </table>
                <div class="position-relative text-center mt-9">
                  <v-textarea
                    v-model="TransactionNotes"
                    auto-grow
                    autofocus
                    label="Transaction Notes"
                    rows="1"
                    class="transactionNotes"
                  ></v-textarea>
                  <!-- errorTxt class -->
                  <p class="text-right black_txt" style="margin-top:-10px"> <sup class="red_txt">*</sup>Add a purpose of the transaction</p>
                  <div class="error_msg top_minus">
                    Please enter purpose of the transaction
                  </div>
                </div>

                <v-row class="mt-5">
                  <v-col>
                     <v-btn class="w-100 cancelBt" depressed x-large dark>CANCEL</v-btn>
                  </v-col>
                  <v-col>
                     <v-btn x-large color="success" dark class="w-100" depressed @click="payment2fa = true">CONFIRM</v-btn>
                  </v-col>
                </v-row>
             </v-col>
            </v-col>

            <!-- Payment confirmation 2FA -->
            <template>
              <v-row justify="center">
                <v-dialog v-model="payment2fa" persistent max-width="500" content-class="confirmation2fa">
                  <v-card class="text-center">
                    <h4 class="text-center font-weight-bold mb-8">Payment Confirmation</h4>
                    <img src="../../../assets/images/google-2fa.png" alt="" class="mb-4">
                   
                    <h5 class="font-weight-bold mb-4">Two-Factor Google Aunthenticator</h5>
                     <div id="form" class="mb-5 position-relative">
                      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                      <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                       <div class="error_msg">
                    Please enter valid verification code
                  </div>
                    </div>

                    <p class="mb-10">Enter the 2-step verification code provided by Google Aunthenticator app</p>

                      <v-card-actions class="close_btn_wrp ">
                          <v-icon class="black_txt" @click="payment2fa = false">mdi-close</v-icon>
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
                    

                    <p class="mb-0 f18">You have successfull sent</p>
                    <p class="mb-0 font-weight-bold f18">1,745.98765432 EVR / 50 MYR</p>
                    <p class="mb-7 f18">for mobile reload</p>

                      <v-card-actions class="close_btn_wrp ">
                          <v-icon class="black_txt" @click="paymentCompleted = false">mdi-close</v-icon>
                      </v-card-actions>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" class="w-100"  @click="paymentCompleted = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>


         </v-container>


</template>

<script>
import { CoolSelect } from "vue-cool-select";
import $ from "jquery";
export default {
     el: '#myapp',
     name: 'EwalletReload',
     components: {
        CoolSelect
     },
  data: () => ({
     payment2fa: false,
     paymentCompleted: false,
      mobileReload: "All Crypto",
      operator: "All Operators",
        items: [
              {
                name:'Everus ',
                cryptoBal:'0.00657 EVR',
                usdBal:'0.00657 USD',
                brandSimbel:'EVR',
              },
              {
                name:'Bitcoin ',
                cryptoBal:'0.00657 BTC',
                usdBal:'0.00657 USD',
                brandSimbel:'BTC',
              },
              {
                name:'Ethereum ',
                cryptoBal:'0.00657 ETH',
                usdBal:'0.00657 USD',
                brandSimbel:'ETH',
              }
        ],
        operatorItems: [
              {
                name:'GrabPay ',
                brandSimbel:'grabpay',
              },
              {
                name:'Boost ',
                brandSimbel:'boost',
              },
              {
                name:"Touch 'n Go eWallet",
                brandSimbel:'touchewallet',
              },
              {
                name:"BigPay",
                brandSimbel:'bigpay',
              },
              {
                name:"Alipay",
                brandSimbel:'alipay',
              }
        ],
  mounted: function(){
    $(function() {
  'use strict';

  var body = $('body');

  function goToNextInput(e) {
    var key = e.which,
      t = $(e.target),
      sib = t.next('input');

    if (key != 9 && (key < 48 || key > 57)) {
      e.preventDefault();
      return false;
    }

    if (key === 9) {
      return true;
    }

    if (!sib || !sib.length) {
      sib = body.find('input').eq(0);
    }
    sib.select().focus();
  }

  function onKeyDown(e) {
    var key = e.which;

    if (key === 9 || (key >= 48 && key <= 57)) {
      return true;
    }
    e.preventDefault();
    return false;
  }
  function onFocus(e) {
    $(e.target).select();
  }
  body.on('keyup', 'input', goToNextInput);
  body.on('keydown', 'input', onKeyDown);
  body.on('click', 'input', onFocus);

})
  }



  }),
  methods: {
    // gets a flag picture
    getFlag(mobileReload_crypto) {
      try {
        return require(`../../../assets/images/crypto/${mobileReload_crypto.toLowerCase()}.png`);
      } catch (e) {
        return require("../../../assets/images/crypto/undefined.svg");
      } 
    },
   getOperator(mobileReload_operator) {
      try {
        return require(`../../../assets/images/operator/${mobileReload_operator.toLowerCase()}.png`);
      } catch (e) {
        return require("../../../assets/images/operator/undefined.svg");
      } 
    }
  },



};
</script>

<style lang="css" scoped>
@import "../../../../node_modules/vue-cool-select/dist/themes/material-design.css";
</style>
