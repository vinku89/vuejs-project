<template>


<v-content class="p-0">
  <div v-show="earncryptoSubscription">
    <v-content v-if="totalRecords > 0" class="p-0">

      
        <v-row>
            <v-col>
                <h5 class="font-weight-bold mb-6 text-uppercase mr-auto">EARN CRYPTO Trading</h5> 
            </v-col>  
            <v-spacer></v-spacer>
            <v-col class="text-right">
                  <v-btn x-large color="success" class="font-weight-bold ml-auto" dark  @click="joinNewPack()" >join new package</v-btn>
            </v-col>
        </v-row>



        <v-row>

          <!-- All Status -->
            <v-col>
              <v-select 
              v-model="selectedStatus"
              :items="getEarnCrptoHistoryInfo['earncrypto_status']"
              item-value='id'
              item-text='status'
              return-object
              @change="getEarnCrptoHistory('status')"
                label="All Status"
                outlined
                single-line
                :menu-props="{ bottom: true, offsetY: true }"
                class="remove_legend"
              ></v-select>
            </v-col>

            <!-- All Packages -->
            <v-col>
               <v-select
               v-model="selectedPackage"
                :items="getEarnCrptoHistoryInfo['earnCrypto_package_list']"
              item-value='id'
              item-text='dollar'
              return-object
              @change="getEarnCrptoHistory('package')"
                label="All Package"
                outlined
                single-line
                :menu-props="{ bottom: true, offsetY: true }"
                class="remove_legend"
              ></v-select>
            </v-col>
            <!-- All Crypto -->
          
            <v-col class="position-relative earnCrypto_selecwrp">
              <v-select 
              v-model="selectedCryptoCoin"
              :items="getEarnCrptoHistoryInfo['cryptoList']"
              item-value='coin_symbol'
              item-text='coin_name'
              return-object
              @change="getEarnCrptoHistory('crypto')"
              label="All Crypto"
              outlined
              single-line
              :menu-props="{ bottom: true, offsetY: true }"
              class="remove_legend"
              >
              <template slot="item" slot-scope="{ item: cryptoCoin }">
                  <div style="display: flex; align-items: center;">
                    <img v-if="cryptoCoin.coin_symbol" :src="getFlag(cryptoCoin.coin_image)" class="country-flag">
                    <div>
                      <b>{{ cryptoCoin.coin_name }}</b>
                    </div>
                  </div>
                </template>
            </v-select>
            </v-col>
             <!-- All lock in Period -->
            <v-col>
                   <v-select
                   v-model="slectedLockingPeroid"
                    :items="getEarnCrptoHistoryInfo['earncrypto_lockperiod']"
                    item-value='months'
                    item-text='text'
                    return-object
                  @change="getEarnCrptoHistory('lockperiod')"
                    label="All Lock In Period"
                    outlined
                    :menu-props="{ bottom: true, offsetY: true }"
                    class="remove_legend"
                    single-line
                  ></v-select>
            </v-col>
        </v-row>

<div class="user-earn-table">
  <table class="fold-table table">
    <thead>
      <tr>
        <th width="60">No</th>
        <th>Date Joined</th>
        <th class=" text-right pd-right45">Trading Package in USD</th>
        <th class="text-right pr-6">Trading In Crypto</th>
        <th>Lock in Period</th>
        <th>Status</th>
        <th width="60">&nbsp;</th>
      </tr>
    </thead>
  <tbody v-if='getEarnCrptoHistoryInfo["earnCryptoHistory"].length == 0'>
      <tr><td class="text-center" colspan=7>No Records Found</td></tr>
  </tbody>
  <!-- Withdrawan -->
 <tbody v-for='(index , i) in getEarnCrptoHistoryInfo["earnCryptoHistory"]' :key='i'>
      <tr class="view" :class="`expandrow_${i}`" v-if="index.status > 2" @click="earncryptrow(i)">
        <td>{{i+1}}</td>
        <td>{{index.joinDate}}</td>
        <td class="green_txt text-right pd-right45">${{addCommas(index.package_amount_usd,2)}} USD</td>
        <td class=" text-right">{{addCommas(index.tradingInCripto ,8)}}  <img   v-bind:src="`${adminUrl}coin_listing_images/${index.coin_image}`" alt="" width="25" class="mr-2 "></td>
        <td>{{index.locking_period_months}} Months</td>
        <td v-if="index.status == 1">
        <v-btn v-if="getEarnCrptoHistoryInfo['earncrypto_enable_before_tenure'].value == 'N'" small color="grey" dark>{{index.lockingPeriodDate}}</v-btn>
        <v-btn v-if="getEarnCrptoHistoryInfo['earncrypto_enable_before_tenure'].value == 'Y'" small color="warning" dark @click="checking(i)">{{index.lockingPeriodDate}}</v-btn>
        <!-- <v-btn small color="warning" dark @click="checking(i)">{{index.lockingPeriodDate}}</v-btn> -->
        </td>
        <td v-else-if="index.status == 2">
        <v-btn small color="purple" dark @click="widthdrawModal = true">Withdraw</v-btn>
        </td>
        <td v-else-if="index.status == 3"><v-btn small color="grey" dark>Withdrawn</v-btn></td>
        <td v-else-if="index.status == 4"><v-btn small color="error" dark>Terminated</v-btn></td>
        <td>&nbsp;</td>
      </tr>
        <tr v-else>
        <td>{{i+1}}</td>
        <td>{{index.joinDate}}</td>
        <td class="green_txt text-right pd-right45">${{addCommas(index.package_amount_usd,2)}} USD</td>
        <td class=" text-right">{{addCommas(index.tradingInCripto,8)}}  <img  v-bind:src="`${adminUrl}coin_listing_images/${index.coin_image}`" alt="" width="25" class="mr-2"></td>
        <td>{{index.locking_period_months}} Months</td>
        <td v-if="index.status == 1">
         <v-btn v-if="getEarnCrptoHistoryInfo['earncrypto_enable_before_tenure'].value == 'N'" small color="grey" dark>{{index.lockingPeriodDate}}</v-btn>
        <v-btn v-if="getEarnCrptoHistoryInfo['earncrypto_enable_before_tenure'].value == 'Y'" small color="warning" dark @click="checking(i)">{{index.lockingPeriodDate}}</v-btn>
        
        <!-- <v-btn small color="warning" dark @click="checking(i)">{{index.lockingPeriodDate}}</v-btn> -->
        </td>
        <td v-else-if="index.status == 2">
        <v-btn small color="purple" dark @click="checking(i)">Withdraw</v-btn>
        </td>
        <td v-else-if="index.status == 3"><v-btn small color="grey" dark >Withdrawn</v-btn></td>
        <td v-else-if="index.status == 4"><v-btn small color="error" dark >Terminated</v-btn></td>
        <td>&nbsp;</td>
      </tr>
      <tr class="fold" :class="`expandrow_${i}`" v-if="index.status > 2">
        <td colspan="7">
          <div class="fold-content">
          
            <table class="inner_table">
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td :width="250" v-if="index.status == 3" >Withdrawal Date</td>
                          <td :width="250" v-if="index.status == 4" >Terminated Date</td>
                          <td>:</td>
                          <td>{{index.withdrawdate}}</td>
                        </tr>
                        <tr>
                          <td v-if="index.status == 3" >Withdrawal ID</td>
                          <td v-else-if="index.status == 4" >Terminated ID</td>
                         
                          <td>:</td>
                          <td>{{index.withdraw_id}}</td>
                        </tr>
                        <tr>
                          <td colspan="3">&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan="3" class="font-weight-bold">Package</td>
                        </tr>
                        <tr>
                          <td>Package Withdrawn</td>
                          <td>:</td>
                          <td>${{addCommas( index.package_amount_usd ,2)}} USD</td>
                        </tr>
                        <tr>
                          <td>Amount Withdrawn</td>
                          <td>:</td>
                          <td class="green_txt">{{addCommas(index.tradingInCripto,8)}} {{index.package_crypto_type}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                      <table>
                      <tbody>
                          <tr>
                          <td colspan="3" class="font-weight-bold">Earnings</td>
                        </tr>
                        <!-- <tr>
                          <td :width="250">Earning Payouts</td>
                          <td>:</td>
                          <td>${{addCommas(index.payout_amount_usd,8)}} USD</td>
                        </tr> -->
                        <tr>
                          <td>Amount Earning Payouts</td>
                          <td>:</td>
                          <td class="green_txt">{{addCommas(index.payout_amount_crypto ,8)}} {{index.payout_crypto_type}}</td>
                        </tr>
                         <tr v-if="index.penalty_amount_crypto > 0">
                          <td>Penalty Charges</td>
                          <td>:</td>
                          <td class="red_txt">{{addCommas(index.penalty_amount_crypto,8)}} {{index.package_crypto_type}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>          
          </div>
        </td>
      </tr>
 </tbody>
<!-- <tbody>     
  <tr class="view">
        <td>3</td>
        <td>12/01/2019</td>
        <td class="green_txt text-right">$500.00 USD</td>
        <td class=" text-right">2.22935616 ETH</td>
        <td>6 Months</td>
        <td><v-btn small color="error" dark :width="150">Terminated</v-btn></td>
        <td>&nbsp;</td>
      </tr>
      <tr class="fold">
        <td colspan="7">
          <div class="fold-content">
          
            <table class="inner_table">
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td :width="250">Terminated Date</td>
                          <td>:</td>
                          <td>28/01/2020</td>
                        </tr>
                        <tr>
                          <td>Terminated ID</td>
                          <td>:</td>
                          <td>TMDC2188271</td>
                        </tr>
                        <tr>
                          <td colspan="3">&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan="3" class="font-weight-bold">Package</td>
                        </tr>
                        <tr>
                          <td>Package Withdrawn</td>
                          <td>:</td>
                          <td>$500.00 USD</td>
                        </tr>
                        <tr>
                          <td>Amount Withdrawn</td>
                          <td>:</td>
                          <td class="green_txt">1.313301113 ETH</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                      <table>
                      <tbody>
                          <tr>
                          <td colspan="3" class="font-weight-bold">Earnings</td>
                        </tr>
                        <tr>
                          <td :width="250">Earning Payouts</td>
                          <td>:</td>
                          <td>$71.32 USD</td>
                        </tr>
                        <tr>
                          <td>Amount Earning Payouts</td>
                          <td>:</td>
                          <td class="green_txt">0.0126364 BTC</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>          
          </div>
        </td>
      </tr>
</tbody>     -->


    
   <!-- Withdrawan 2 -->
 <!-- <tbody>
      <tr class="view" >
        <td>4</td>
        <td>9/04/2020</td>
        <td class="green_txt text-right">$1,000.00 USD</td>
        <td class=" text-right">0.02 BTC</td>
        <td>18 Months</td>
        <td><v-btn small color="grey" dark :width="150">Withdrawn</v-btn></td>
        <td>&nbsp;</td>
      </tr>
      <tr class="fold">
        <td colspan="7">
          <div class="fold-content">
          
            <table class="inner_table">
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <tr  >
                          <td :width="250">Withdrawal Date</td>
                          <td>:</td>
                          <td>12/04/2020</td>
                        </tr>
                        <tr>
                          <td>Withdrawal ID</td>
                          <td>:</td>
                          <td>EBTC2965665</td>
                        </tr>
                        <tr>
                          <td colspan="3">&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan="3" class="font-weight-bold">Package</td>
                        </tr>
                        <tr>
                          <td>Package Withdrawn</td>
                          <td>:</td>
                          <td>$1,000.00 USD</td>
                        </tr>
                        <tr>
                          <td>Amount Withdrawn</td>
                          <td>:</td>
                          <td class="green_txt">0.95 BTC</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                      <table>
                      <tbody>
                          <tr>
                          <td colspan="3" class="font-weight-bold">Earnings</td>
                        </tr>
                        <tr>
                          <td :width="250">Earning Payouts</td>
                          <td>:</td>
                          <td>$125.55 USD</td>
                        </tr>
                        <tr>
                          <td :width="250">&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>0.026 BTC</td>
                        </tr>
                        <tr>
                          <td>Penalty Charges</td>
                          <td>:</td>
                          <td class="red_txt">0.021 BTC</td>
                        </tr>
                        <tr>
                          <td>Amount Earning Payouts</td>
                          <td>:</td>
                          <td class="green_txt">0.03 BTC</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>          
          </div>
        </td>
      </tr>
</tbody>
<tbody> -->
    <!-- Terminated -->
 <!--      <tr class="view">
        <td>3</td>
        <td>12/01/2019</td>
        <td class="green_txt text-right">$500.00 USD</td>
        <td class=" text-right">2.22935616 ETH</td>
        <td>6 Months</td>
        <td><v-btn small color="error" dark :width="150">Terminated</v-btn></td>
        <td>&nbsp;</td>
      </tr>
      <tr class="fold">
        <td colspan="7">
          <div class="fold-content">
          
            <table class="inner_table">
              <tbody>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td :width="250">Terminated Date</td>
                          <td>:</td>
                          <td>28/01/2020</td>
                        </tr>
                        <tr>
                          <td>Terminated ID</td>
                          <td>:</td>
                          <td>TMDC2188271</td>
                        </tr>
                        <tr>
                          <td colspan="3">&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan="3" class="font-weight-bold">Package</td>
                        </tr>
                        <tr>
                          <td>Package Withdrawn</td>
                          <td>:</td>
                          <td>$500.00 USD</td>
                        </tr>
                        <tr>
                          <td>Amount Withdrawn</td>
                          <td>:</td>
                          <td class="green_txt">1.313301113 ETH</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                      <table>
                      <tbody>
                          <tr>
                          <td colspan="3" class="font-weight-bold">Earnings</td>
                        </tr>
                        <tr>
                          <td :width="250">Earning Payouts</td>
                          <td>:</td>
                          <td>$71.32 USD</td>
                        </tr>
                        <tr>
                          <td>Amount Earning Payouts</td>
                          <td>:</td>
                          <td class="green_txt">0.0126364 BTC</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>          
          </div>
        </td>
      </tr>
</tbody>    
  --->

    
  
  </table>
</div>


<v-row class="justify-center">
  <v-btn color="success" large class="font-weight-bold" @click="joinNewPack()">
    JOIN NEW PACKAGE
  </v-btn>
</v-row>


  <!-- Withdraw Insufficient Balance -->
    <template>
       <v-dialog
          v-model="insufficientBalModal" persistent
          max-width="500"
        >
          <v-card class="white-bg black_txt" style="border:solid 1px #22E627">
            <h3 class="font-weight-bold text-center pb-3 pt-8">Confirm Withdrawal</h3>
            <div class="px-10">
            <v-col class="modal_pkg_error_bg mb-3">
              <p class="red_txt mb-0">We are sorry as we are not able to process your withdrawal request at this point due to insufficient balance for the penalty deduction</p>
            </v-col>
             <v-col class="modal_pkg_bg mb-3">
              <h5 class="font-weight-bold">Package</h5>
               <h3 class="font-weight-bold greenDark_txt text-right">{{this.dilogboxdata.package_amount_crypto}} {{this.dilogboxdata.package_crypto_type}}</h3>
               <h5 class=" text-right">${{this.dilogboxdata.package_amount_usd}} USD</h5>
            </v-col>
            </div>

             <v-card-actions class="close_btn_wrp">
                <v-icon class="black-txt" @click="insufficientBalModal = false">mdi-close</v-icon>
            </v-card-actions>

            <v-card-actions class="justify-center px-10 mb-5">
              <v-btn-toggle class="mt-4 w-100" borderless>
                  <v-btn value="right" class="green darken-1 w-100 px-7 py-2" @click="insufficientBalModal = false ">
                      <span class="hidden-sm-and-down">Close</span>
                  </v-btn>
              </v-btn-toggle>
              </v-card-actions>
          </v-card>
        </v-dialog>
    </template> 
  <!--Withdraw Insufficient Balance -->


  <!-- Withdraw - Popup Confirmation -->
    <template>
       <v-dialog
          v-model="widthdrawModal" persistent
          max-width="500"
        >
          <v-card class="white-bg black_txt" style="border:solid 1px #22E627">
            <h3 class="font-weight-bold text-center pb-3 pt-8">Confirm Withdrawal</h3>

            <p v-if="this.dilogboxdata.status != 1" class="text-center"> Are you sure want to withdrawal this package?</p>
            

            <div class="px-10">
            <v-col v-if="this.dilogboxdata.status == 1" class="modal_pkg_error_bg mb-3">
              <p class="red_txt mb-0">Please note that there will be a penalty charged upon your termination request. Please refer to the terms and conditions for more information.</p>
            </v-col>
            <v-col class="modal_pkg_bg mb-3">
              <h5 class="font-weight-bold">Package</h5>
              
               <h3 class="font-weight-bold greenDark_txt text-right">{{addCommas(this.dilogboxdata.tradingInCripto,8)}} {{this.dilogboxdata.package_crypto_type}}</h3>
               <h5 class=" text-right">${{addCommas(this.dilogboxdata.package_amount_usd , 2)}} USD</h5>
            </v-col>
             <v-col class="modal_pkg_bg mb-3">
              <h5 class="font-weight-bold">Earnings</h5>
               <h3 class="font-weight-bold greenDark_txt text-right">{{addCommas(this.dilogboxdata.payout_amount_crypto,8)}} {{this.dilogboxdata.payout_crypto_type}}</h3>
               <h5 class=" text-right">${{addCommas(this.dilogboxdata.payout_amount_usd, 8)}} USD</h5>
            </v-col>
            <v-col class="modal_pkg_bg mb-3" v-if="this.dilogboxdata.status == 1">
              <h5 class="font-weight-bold">Penalty</h5>
              <h3 class="font-weight-bold red_txt text-right">{{addCommas((this.dilogboxdata.tradingInCripto*this.dilogboxdata.penalty_percent)/100,8)}} {{this.dilogboxdata.package_crypto_type}}</h3>
              <h5 class=" text-right"></h5>
            </v-col>
            </div>

              <v-card-actions class="close_btn_wrp">
                  <v-icon class="black-txt" @click="widthdrawModal = false">mdi-close</v-icon>
              </v-card-actions>

            <v-card-actions class="justify-center px-10 mb-5">
              <v-btn-toggle class="mt-4 w-100" borderless>
                  <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="widthdrawModal = false">
                      <span class="hidden-sm-and-down">Cancel</span>
                  </v-btn>

                  <v-btn value="right" class="green darken-1 w-50 px-7 py-2" @click="withdrawalAmount" :disabled="withdrawAmt">
                      <span class="hidden-sm-and-down">Yes, proceed</span>
                  </v-btn>
              </v-btn-toggle>
              </v-card-actions>
          </v-card>
        </v-dialog>
    </template> 
  <!-- End Withdraw - Popup Confirmation -->


  <!-- Withdraw - Confirm -->
    <template>
       <v-dialog
          v-model="confirmWithdrawModal" persistent
          max-width="500"
         
        >
          <v-card class="white-bg black_txt" style="border:solid 1px #22E627">
            <h3 class="font-weight-bold text-center pb-3 pt-8">Confirm Withdrawal</h3>
            
            <v-flex class="text-center mb-8">
              <img src="../../../assets/images/img34.png" alt="" width="90">
            </v-flex>

            <div class="px-10">
               <p class="text-center"> Your withdrawal will be processed immediately and will be added to your main wallet</p>
            </div>

            <v-card-actions class="close_btn_wrp">
                <v-icon class="black-txt" @click="confirmWithdrawModal = false">mdi-close</v-icon>
            </v-card-actions>

            <v-card-actions class="justify-center px-10 mb-5">
              <v-btn-toggle class="mt-4 w-100" borderless>
               

                  <v-btn value="right" class="green darken-1 w-100 px-7 py-2" @click="confirmWithdrawModal = false">
                      <span class="hidden-sm-and-down">Done</span>
                  </v-btn>
              </v-btn-toggle>
              </v-card-actions>
          </v-card>
        </v-dialog>
    </template> 
  <!-- End Withdraw - Confirm -->


      </v-content>
      <v-content v-if="totalRecords == 0" class="p-0">

  <!-- Unsubscribe section -->
  <div class="uns-package-bg">
            <div class="uns-pag-mid-content">
              <h3 class="font-weight-bold text-uppercase">opportunity to earn</h3>
              <h1 class="font-weight-bold text-uppercase f60">daily return in</h1>
              <div class="d-inline-block">
                  <img src="../../../assets/images/all/tether.png" alt="" class="float-left">
                  <h1 class="font-weight-black float-left usdt_txt">USDT</h1>
              </div>
              <p class="text-center mb-1">Choose your subscription package</p>
              <p class="text-center">Starting from USD ${{minimumPackageAmount}} onwards</p>

              <div class="text-center mt-10">
                <div class="d-inline-block">
                  <v-btn x-large color="success" class="font-weight-bold" dark @click="joinNewPack()">join new package</v-btn>
                </div>
              </div>
            </div>
        </div>
  <!-- End Unsubscribe section -->

      </v-content>
  </div>
  <v-overlay :value="overlay" style="z-index:205;">
        <!--<v-img src="../../assets/images/loader.png" width="60" height="60"></v-img>-->
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
</v-content>

</template>
<script>
// import { CoolSelect } from "vue-cool-select";
import $ from 'jquery';
import NProgress from 'nprogress';
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'EarnBTCSubscribedPackage',
  components: {
    //CoolSelect
  },
  data: () => ({
    prvid: '',
     adminUrl:'',
    earncryptoSubscription: false,
    overlay: false,
    absolute: true,
    singleExpand: false,
    widthdrawModal: false,
    insufficientBalModal: false,
    confirmWithdrawModal: false,
    selectedCryptoCoin: "All Crypto",
     getEarnCrptoHistoryInfo: [],
     getEarnJoinPackageInfo: [],
     selectedStatus: null ,
     selectedPackage:null,
     slectedLockingPeroid:null,
     dilogboxdata:[],
     totalActiveTrading: 0,
     totalEarnProfit: 0,
     withdrawAmt: false,
    items: [
           {
            name:'All Crypto ',
            inBTC:'0.00657 BTC',
            cryptoCode:'',
          },
           {
            name:'Bitcoin',
            cryptoCode:'BTC',
          },
          {
            name:'Ethereum',
            cryptoCode:'ETH',
          }
    ],
    status: [
      'Active', 
      'Withdraw', 
      'Withdrawn', 
    ],
    packages: [
      '$500.00 USD', 
      '$1,000.00 USD', 
      '$2,000.00 USD', 
      '$3,000.00 USD', 
      '$5,000.00 USD', 
      '$10,000.00 USD', 
    ],
    period: [
      '6 Months', 
      '12 Months', 
      '18 Months',  
    ],
    totalRecords: 0,
    minimumPackageAmount: 25

  }),
  
  
created() {

this.getEarnCrptoHistory();


},
  methods: {
    earncryptrow: function(id){
      
      var rid = "expandrow_"+id     
      $('.fold-table tr.'+rid).toggleClass("open");
     if(this.prvid === ""){
       //
     }else if(this.prvid != id) {
       var rowid = "expandrow_"+this.prvid
       $('.fold-table tr.'+rowid).removeClass("open");
     }
     this.prvid = id     
    },
    joinNewPack: function(){ 
      this.$emit('childToParentJN', "Success")
    },
    addCommas: function(x, num) {
            x = x || 0;
            x = Number(x);
            var n = x.toFixed(num);
            var parts = n.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },
      checking: function(e)
      {
        console.log(e)
       this.dilogboxdata = this.getEarnCrptoHistoryInfo["earnCryptoHistory"][e];

       if(this.dilogboxdata && this.dilogboxdata.status == "1") {
         let penalty = (this.dilogboxdata.package_amount_crypto*this.dilogboxdata.penalty_percent/100);
         if(this.dilogboxdata.package_amount_crypto - penalty < 0) {
           this.insufficientBalModal = true;
         } else {
           this.widthdrawModal = true
         }
       } else if(this.dilogboxdata && this.dilogboxdata.status == '2') {
           this.widthdrawModal = true
       }
      },

    withdrawalAmount: function () {
          this.withdrawAmt = true
          var self = this;
          var withDrawalID = this.dilogboxdata.withdraw_id
          let auth_token = this.$store.getters.authToken;
          NProgress.start();
          let bodyFormData = {
                              "earnTransaction_id": withDrawalID,
                           
                             }
                if(auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "earnWithdrawalAmount";
                    
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                            ,
                            data: qs.stringify(bodyFormData),
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done();                            
                            console.log(response);
                            self.confirmWithdrawModal = true;
                           
                            self.widthdrawModal = false;
                            self.getEarnCrptoHistory(true);
                            self.withdrawAmt = false;
                            
                        })
                        .catch(function (err) {
                         self.withdrawAmt = false
                          console.log(err);
                            if(err && err.response && err.response.data && err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
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


       getEarnCrptoHistory: function () {
         this.overlay = true
         document.body.classList.remove("selectdropwn");
           var statusID = (this.selectedStatus && this.selectedStatus.id>0) ? this.selectedStatus.id: '';
            var packageID = (this.selectedPackage && this.selectedPackage.id>0) ? this.selectedPackage.id: '';
            var lockingPeriodID = (this.slectedLockingPeroid && this.slectedLockingPeroid.months>0) ? this.slectedLockingPeroid.months: '';
            var crypto =  (this.selectedCryptoCoin && this.selectedCryptoCoin.coin_symbol)? this.selectedCryptoCoin.coin_symbol:'';
         
         var self = this;
                let auth_token = this.$store.getters.authToken;
                NProgress.start()
          let bodyFormData = {
                              "status_id": statusID,
                              "package_id":packageID,
                              "lockingPerod_id":lockingPeriodID,
                              "crypto":crypto
                             }
                if(auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "getEarnCryptoHistory";
                    
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                            ,
                            data: qs.stringify(bodyFormData),
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done()
                            self.overlay = false
                            self.earncryptoSubscription = true
                            self.getEarnCrptoHistoryInfo = response.data.Result;

                            
                            self.totalActiveTrading = self.getEarnCrptoHistoryInfo['totalActiveTrading'] || 0;
                            self.totalEarnProfit = self.getEarnCrptoHistoryInfo['totalEarnProfit'] || 0;
                            self.totalRecords = self.getEarnCrptoHistoryInfo['totalRecords'];
                            self.$emit('updateAmount', self.totalActiveTrading, self.totalEarnProfit);

                            if(self.getEarnCrptoHistoryInfo && self.getEarnCrptoHistoryInfo['earncrypto_status']){
                              self.getEarnCrptoHistoryInfo['earncrypto_status'].unshift({'status':'All Status', 'id': 0});
                            }
                            
                            if(self.getEarnCrptoHistoryInfo && self.getEarnCrptoHistoryInfo['earncrypto_lockperiod']){
                              self.getEarnCrptoHistoryInfo['earncrypto_lockperiod'].unshift({'months':'All lock in period', 'id': 0});
                              for(let lockData of self.getEarnCrptoHistoryInfo['earncrypto_lockperiod']) {
                                if(lockData.id == 0) {
                                  lockData.text = 'All lock in period';
                                } else if(lockData.months == 1) {
                                  lockData.text = lockData.months+ ' Month';
                                } else {
                                  lockData.text = lockData.months+ ' Months';
                                }
                              }
                            }
                            
                            if(self.getEarnCrptoHistoryInfo && self.getEarnCrptoHistoryInfo['earnCrypto_package_list']){
                              self.getEarnCrptoHistoryInfo['earnCrypto_package_list'].unshift({'package_amount':'All Packages', 'id': 0});
                              let m=0;
                              for(let pkg of self.getEarnCrptoHistoryInfo['earnCrypto_package_list']) {
                                if(m == 1) {
                                  self.minimumPackageAmount = pkg.package_amount;
                                }
                                if(pkg.id > 0)
                                {
                                  pkg.dollar = '$'+pkg.package_amount+' USD';
                                }
                                else{
                                    pkg.dollar = pkg.package_amount;
                                }
                                m++;
                              }
                            }
                            
                            
                        })
                        .catch(function (err) {
                          self.overlay = false
                           document.body.classList.add("selectdropwn");
                            if(err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
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


  // gets a flag picture
    getFlag(cryptocurrency) {
      try {
         return (`${this.adminUrl}/coin_listing_images/${cryptocurrency}`);
       // return require(`../../../assets/images/crypto/${cryptocurrency.toLowerCase()}.png`);
      } catch (e) {
        return require("../../../assets/images/crypto/undefined.svg");
      } 
    }


  },

	mounted() {
     this.adminUrl = process.env.VUE_APP_ADMIN_URL    

     
        //     $(function(){

        //   console.log("Mounted");
      
        //     $(".fold-table").click(function() {
        //       alert("test");
        //       $(this).toggleClass("open").next(".fold").toggleClass("open");
        //     });
        // });

        $(document).on('click','.remove_legend',function(ev) {
          ev.stopPropagation(); 
          document.body.classList.add("selectdropwn");
        });

        $(document).on('click','body',function() {
          document.body.classList.remove("selectdropwn");
        });

  }

};
</script>

<style lang="css" scoped>
@import "../../../../node_modules/vue-cool-select/dist/themes/material-design.css";
</style>