<template>
<v-app class="h-100">
    <TopBar :userInfo="loggedUserInfo" :iswtmActive="true" />
    <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_text }}
        

        <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>
    <v-container fluid fill-height v-show="norecords" class="h-100 frame-pt">
        <v-layout class="h-100">
            <v-flex class="h-100">                
                <v-col cols="12" class="pb-0 d-none">
                        <v-row>
                        <v-col cols="6">
                            <v-flex class="ttl_earning_divBg clearfix pl-5">
                                    <img src="../../assets/images/wallet-ballance-icon.png" height="100" class="float-left ml-3">
                                <div class="ml-5 float-left">
                                        <h6 class="font-weight-bold text-uppercase mt-4">wallet balance</h6>
                                        <h2 class="font-weight-bold">${{totalUsdAmount}} <span class="font-weight-normal f20">USD</span></h2>
                                </div>
                            </v-flex>
                        </v-col>
                        <v-col cols="6">
                            <v-col cols="12" class="p-0 text-right mb-3 mt-2">
                                 <div class="wallet_search_field d-inline-block">
                                    <v-text-field v-model="walletname" v-on:keyup="getWalletListBack($event)" flat hide-details label="Search" outlined>
                                    </v-text-field>
                                    <v-btn v-on:click="getWalletSearch" class="search_data">
                                     <v-icon>mdi-magnify</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col cols="12" class="p-0 text-right">
                                <div class="custom_swich d-inline-block">
                                <v-switch value="balance" v-model="hideZeroBalance" v-on:change="balSorting($event)" label="Hide zero balance" class="mt-2"></v-switch>
                            </div>
                            </v-col>
                        </v-col>
                    </v-row>                        
                </v-col>


                   <v-col cols="12" class="pb-0">
                   <v-row>
                        <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                <div>
                                <h6 class="text-uppercase mb-1 lite_purple_txt f14">customer email</h6>
                                <h5 class="white_text f20">{{loggedUserInfo.email}}</h5>
                                </div>
                            </v-col>
                        </v-col>
                         <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                  <div>
                                    <h6 class="text-uppercase mb-1 lite_purple_txt f14">customer Name</h6>
                                    <h5 class="white_text f20" v-if="loggedUserInfo.first_name">{{loggedUserInfo.first_name+" "+loggedUserInfo.last_name}}</h5>
                                    <h5 class="white_text f20" v-else>-</h5>
                                </div>
                            </v-col>
                        </v-col>
                         <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                  <div>
                                    <h6 class="text-uppercase mb-1 lite_purple_txt f14">date of join</h6>
                                    <h5 class="white_text f20">{{loggedUserInfo.created_at}}</h5>
                                  </div>
                            </v-col>
                        </v-col>
                        <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                  <div>
                                 <h6 class="text-uppercase mb-1 lite_purple_txt f14">KYC status</h6>
                                <v-btn small color="success" class="mt-1" v-if="loggedUserInfo.kyc_status == 1">Active</v-btn>
                                <v-btn small color="error" class="mt-1" v-else>Inactive</v-btn>
                                </div>
                            </v-col>
                        </v-col>
                   </v-row>
                <v-row>
                        <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                  <div>
                                <h6 class="text-uppercase mb-1 lite_purple_txt f14">Total assets (usd)</h6>
                                <h5 class="white_text f20">${{totalUsdAmount}} USD</h5>
                                </div>
                            </v-col>
                        </v-col>
                         <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                  <div>
                                 <h6 class="text-uppercase mb-1 lite_purple_txt f14">main account (usd)</h6>
                                <h5 class="white_text f20">${{totalMainAccountAmount}} USD</h5>
                                </div>
                            </v-col>
                        </v-col>
                         <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                  <div>
                                 <h6 class="text-uppercase mb-1 lite_purple_txt f14">trading account (usd)</h6>
                                <h5 class="white_text f20">${{totalTradeAccountAmount}} USD</h5>
                                </div>
                            </v-col>
                        </v-col>
                        <v-col cols="12" xl="3" class="py-1 px-1">
                            <v-col class="wallet_col_div">
                                <div>
                                 <h6 class="text-uppercase mb-1 lite_purple_txt f14">in orders (usd)</h6>
                                <h5 class="white_text f20">${{totalInordersUsd}} USD</h5>
                                </div>
                            </v-col>
                        </v-col>
                   </v-row>
                        <v-col cols="6" class="ml-auto text-right">
                            <div class="d-inline-block text-right mb-3 mt-2">
                                 <div class="wallet_search_field">
                                    <v-text-field v-model="walletname" v-on:keyup="getWalletListBack($event)" flat hide-details label="Search" outlined>
                                    </v-text-field>
                                    <v-btn v-on:click="getWalletSearch" class="search_data">
                                     <v-icon>mdi-magnify</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                            <div class="text-right d-inline-block ml-3">
                                <div class="custom_swich">
                                <v-switch value="balance" 
                                color="success"  v-model="hideZeroBalance" v-on:change="balSorting($event)" label="Hide zero balance" class="mt-2"></v-switch>
                            </div>
                            </div>
                    
                        </v-col>
                 
                    
                </v-col>
                <!-- <v-col class="py-0">
                    <v-row>
                        <v-col md="4">
                            <div class="wallet_search_field">
                                <v-text-field v-model="walletname" flat hide-details label="Search" outlined append-icon="mdi-magnify" v-on:keyup="getWalletSearch">
                                </v-text-field>
                            </div>
                        </v-col>
                        <v-col md="4" class="ml-auto">
                            <div class="custom_swich float-right">
                                <v-switch value="balance" v-model="hideZeroBalance" v-on:change="balSorting($event)" label="Hide zero balance" class="mt-2"></v-switch>
                            </div>
                        </v-col>
                    </v-row>
                </v-col> -->
                <v-col cols="12" class="wallet_table pt-0"  id="infinity_scroll" >
                    <template>
                        <v-simple-table class="walle-list" >
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Currency</th>
                                        <th class="text-left">Exchange</th>
                                        <th class="text-left">Status</th>
                                        <th class="text-right">Main Account</th>
                                        <th class="text-left">Tradings Account</th>
                                        <th class="text-right">In Orders</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Bitcoin -->
                                    <tr v-if="walletsList.length == 0" >
                                        <td colspan="6" class="no_record">No records found!</td>
                                    </tr>
                                    <tr v-else v-for="wallets in walletsList" v-bind:key="wallets.id">
                                        <td>
                                            <!-- <img :src="wallets.wallet_img" alt="Bitcoin" class="crpt_lis"> -->
                                            <img :src="`${adminUrl}/coin_listing_images/${wallets.wallet_image}`" class="crpt_lis">

                                            {{ wallets.wallet_name }}
                                        </td>
                                        <td>
                                            <!-- <v-btn class="button1 w-blue" :class="wallets.advance == 0 ? 'disable_btn' : ''">Advance {{wallets.advance_perc}}%</v-btn>
                                            <v-btn class="button1 w-yellow" :class="wallets.staking == 0 ? 'disable_btn' : ''">Staking</v-btn> -->
                                            <v-btn class="button1 w-yellow" v-if="wallets.earncrypto == 1" :href="`/EarnCrypto`">
                                                Earn Crypto
                                            </v-btn>
                                            <v-btn class="button1 w-yellow disable_btn" v-else>
                                                Earn Crypto
                                            </v-btn>
                                            <div class="vertical-line"></div>
                                            <v-btn class="button1 w-green" @click="deposit(wallets.wallet_symbol,wallets.is_erc20)" v-if="wallets.deposit == 1">
                                                Deposit
                                                <v-icon class="ml-1">mdi-arrow-down-box</v-icon>
                                            </v-btn>
                                            <v-btn class="button1 w-green disable_btn" v-else>
                                                Deposit
                                                <v-icon class="ml-1">mdi-arrow-down-box</v-icon>
                                            </v-btn>
                                            <v-btn class="button1 w-red" v-if="wallets.withdraw == 1" @click="withdraw(wallets.wallet_symbol,wallets.withdrawal_fee,wallets.wallet_usd_value,wallets.main_balance, wallets.minimum_withdrawal_amt,wallets.is_erc20)">
                                                Withdraw
                                                <v-icon class="ml-1">mdi-arrow-up-box</v-icon>
                                            </v-btn>
                                            <v-btn class="button1 w-red disable_btn" v-else>
                                                Withdraw
                                                <v-icon class="ml-1">mdi-arrow-up-box</v-icon>
                                            </v-btn>
                                            <v-btn class="button1 w-orange" v-if="wallets.transfer_internally == 1" @click="transferInternally(wallets.wallet_symbol,wallets.wallet_usd_value,wallets.main_balance)">
                                                Transfer Internally
                                                <v-icon class="ml-1">mdi-swap-horizontal-bold</v-icon>
                                            </v-btn>
                                            <v-btn class="button1 w-orange disable_btn" v-else>
                                                Transfer Internally
                                                <v-icon class="ml-1">mdi-swap-horizontal-bold</v-icon>
                                            </v-btn>                                            
                                        </td>
                                        <td>
                                            <span class="status_icon_wrp float-left" :class="wallets.coin_status.status_symbol == 'M' ? 'red_circle' : wallets.coin_status.status_symbol == 'C' ? 'orange_circle' : 'green_circle'">
                                                <v-icon>mdi-checkbox-blank-circle</v-icon>
                                            </span>
                                            <v-tooltip right>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <a
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    class="ml-3 line_height25"
                                                    >{{wallets.coin_status.status_symbol}}</a>
                                                </template>
                                                <span>{{wallets.coin_status.status_text}}</span>
                                                </v-tooltip>
                                        </td>
                                        <td class="text-right main_ac">
                                            {{wallets.main_balance}}
                                            <v-icon class="ml-2" :class="wallets.main_balance != 0.00 && wallets.coin_status.status_symbol != 'C' ? 'active' : ''" :disabled="wallets.main_balance != 0.00 && wallets.coin_status.status_symbol != 'C' ? false : true" @click="transferToTradeAcc(wallets.wallet_symbol,wallets.wallet_usd_value,wallets.main_balance,wallets.trading_balance)">mdi-chevron-right</v-icon>
                                            <!-- <v-icon class="ml-2" v-else>mdi-chevron-right</v-icon> -->
                                        </td>
                                        <td class="main_ac">
                                            <v-icon class="mr-2" :class="wallets.trading_balance != 0.00 && wallets.coin_status.status_symbol != 'C' ? 'active' : ''" :disabled="wallets.trading_balance != 0.00 && wallets.coin_status.status_symbol != 'C' ? false : true" @click="transferToMainAcc(wallets.wallet_symbol,wallets.wallet_usd_value,wallets.main_balance,wallets.trading_balance)">mdi-chevron-left</v-icon>
                                            <!-- <v-icon class="mr-2" v-else>mdi-chevron-left</v-icon> -->
                                            {{wallets.trading_balance}}
                                        </td>
                                        <td class="text-right">{{wallets.in_orders}}</td>
                                    </tr>
                                    <!-- Bitcoin end-->

                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>

                <!-- Attention modal popup -->
                <template>
                    <v-row justify="center" class="float-left mr-5">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                            <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                                <v-card-text class="p-5 black-txt">
                                    <v-container>
                                        <img src="../../assets/images/attention-popup-icon.png" alt="">

                                        <h4 class="headline font-weight-bold my-2">Attention!!</h4>
                                        <h5 class="subtitle-1 font-weight-bold my-2">You have successfully registered for
                                            Brexily. </h5>
                                        <p>
                                            To get your welcome reward and for the safety of your wallet, kindly activate the 2FA for login
                                            security purposes.
                                        </p>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="success" class="w-100" @click="gotoSecurity">Enable 2FA</v-btn>
                                        </v-card-actions>
                                    </v-container>

                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-row>
                </template>

                <!-- Congratulation modal popup -->
                <template>
                    <v-row justify="center" class="float-left">
                        <v-dialog v-model="dialog2" persistent max-width="600px">
                            <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                                <v-card-text class="p-5 black-txt">
                                    <v-container>
                                        <img src="../../assets/images/congratulation-modal-img.png" alt="">

                                        <h4 class="headline font-weight-bold mb-2 mt-4 text-uppercase">Congratulations</h4>
                                        <h5 class="subtitle-1 font-weight-bold my-2">A welcome reward has been credited to your
                                            account. </h5>
                                        <p>
                                            Invite your friends using your referral code and earn exclusive rewards!
                                        </p>
                                        <v-card-actions class="close_btn_wrp black-txt">
                                            <v-icon class="black-txt" @click="dialog2 = false">mdi-close</v-icon>
                                        </v-card-actions>
                                    </v-container>

                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-row>
                </template>

            </v-flex>
        </v-layout>
    </v-container>
 <!-- Transfer trading account modal popup -->
          <template>
              <v-dialog v-model="dialog3" persistent max-width="600px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                    <v-form ref="form4" v-model="valid">
                  <v-card-text>
                    <v-container class="black_txt">
                      <h4 class="text-center font-weight-bold">Transfer {{withdraw_walletsybl}} to Trading Account</h4>
                      <div class="modal_inner_wrp" style="width: 450px;">
                        <div class="form-group surfex_wrap mb-1">
                          <v-col cols="12" class="clearfix px-0">
                            <p class="font-weight-bold f18 float-left mb-0">Main Account</p>
                            <p class="font-weight-bold f18 float-right mb-0">
                              <span>$</span>{{mtot_amt_in_usd}}
                              <span>USD</span>
                            </p>
                          </v-col>
                          <v-text-field 
                          label="Outlined" 
                          v-model="mtot_amt"
                          v-keyup="mtotupdUsdAmt()"
                          single-line 
                          outlined 
                          class="currncy_input" 
                          placeholder="0.00"
                          required :rules="mtotamtRules"
                          @keypress="isNumberVal($event,3)"
                          @paste="checkPaste(3,$event)"
                          >
                          </v-text-field>                          
                          <a class="maximum_currency_lable" @click="getMtoTMaxAmt">Max</a>
                          <span class="float-right f18">Balance:
                            {{withdraw_walletbal}}
                            <span>{{withdraw_walletsybl}}</span>
                          </span>
                        </div>
                        <div class="deposit_error_msg mt-8" v-show="mtot_amount_err_div">
                            {{mtot_amount_err}}
                        </div>
                      </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-card-actions class="close_btn_wrp">
                      <v-icon class="black-txt" @click="dialog3 = false">mdi-close</v-icon>
                    </v-card-actions>                    
                    <v-spacer></v-spacer>                    
                    <v-btn-toggle class="w-100 btngroup_div">
                      <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="dialog3 = false">
                        <span class="hidden-sm-and-down">Cancel</span>
                      </v-btn>
                      <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :loading="loading1" :disabled="loading1" @click="transfertoTradeAccount">
                        <span class="hidden-sm-and-down">Transfer</span>
                      </v-btn>
                    </v-btn-toggle>
                    <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                  </v-card-actions>
                    </v-form>
                </v-card>
              </v-dialog>
          </template>

          <!-- Congratulation modal popup for Transfer to Trade account -->
          <template>
                <v-dialog v-model="dialog31" persistent max-width="500px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                    <v-card-text class="pb-0">
                    <v-container class="black_txt pb-0 text-center">
                        <img src="../../assets/images/tick-mark.png" alt="" class="mb-3 mt-4">
                        <h4 class="text-center font-weight-bold mt-2">Transfer {{withdraw_walletsybl}} to Trading Account</h4>
                        <div class="mt-4 text-center">             
                        <p class="font-weight-bold">Confirmation of Your Transfer</p>               
                        <p>Transfer {{withdraw_walletsybl}} to Trading Account completed successfully.</p>
                        </div>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-card-actions class="close_btn_wrp">
                        <v-icon class="black-txt" @click="dialog31 = false">mdi-close</v-icon>
                    </v-card-actions>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </template>

     <!-- Transfer Main account modal popup -->
          <template>
              <v-dialog v-model="transftomainacc_model" persistent max-width="600px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                    <v-form ref="form5" v-model="valid">
                  <v-card-text>
                    <v-container class="black_txt">
                      <h4 class="text-center font-weight-bold">Transfer {{withdraw_walletsybl}} to Main Account</h4>
                      <div class="modal_inner_wrp" style="width: 450px;">
                        <div class="form-group surfex_wrap mb-1">
                          <v-col cols="12" class="clearfix px-0">
                            <p class="font-weight-bold f18 float-left mb-0">Trading Account</p>
                            <p class="font-weight-bold f18 float-right mb-0">
                              <span>$</span>{{ttom_amt_in_usd}}
                              <span>USD</span>
                            </p>
                          </v-col>
                          <v-text-field 
                          label="Outlined" 
                          v-model="ttom_amt"
                          v-keyup="amttoUsdTtoM()"
                          single-line 
                          outlined 
                          class="currncy_input" 
                          placeholder="0.00"
                          required :rules="ttomamtRules"
                          @keypress="isNumberVal($event,4)"
                          @paste="checkPaste(4,$event)"
                          >
                          </v-text-field>
                          <a class="maximum_currency_lable" @click="getTtoMMaxAmt">Max</a>
                          <span class="float-right f18">Balance:
                            {{withdraw_tradewalletbal}}
                            <span>{{withdraw_walletsybl}}</span>
                          </span>
                        </div>
                        <div class="deposit_error_msg mt-8" v-show="ttom_amount_err_div">
                          {{ttom_amount_err}}
                        </div>
                      </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-card-actions class="close_btn_wrp">
                      <v-icon class="black-txt" @click="transftomainacc_model = false">mdi-close</v-icon>
                    </v-card-actions>
                    <div>
                        {{tradeaccToMainaccErr}}
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn-toggle class="w-100 btngroup_div">
                      <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="transftomainacc_model = false">
                        <span class="hidden-sm-and-down">Cancel</span>
                      </v-btn>
                      <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :loading="loading1" :disabled="loading1" @click="transfertoMainAccount">
                        <span class="hidden-sm-and-down">Transfer</span>
                      </v-btn>
                    </v-btn-toggle>
                    <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                  </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
          </template>

           <!-- Congratulation modal popup for Transfer to Trade account -->
           <template>
                <v-dialog v-model="transftomainacc_model1" persistent max-width="500px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                    <v-card-text class="pb-0">
                    <v-container class="black_txt pb-0 text-center">
                        <img src="../../assets/images/tick-mark.png" alt="" class="mb-3 mt-4">
                        <h4 class="text-center font-weight-bold mt-2">Transfer {{withdraw_walletsybl}} to Main Account</h4>
                        <div class="mt-4 text-center">             
                        <p class="font-weight-bold">Confirmation of Your Transfer</p>               
                        <p>Transfer {{withdraw_walletsybl}} to Main Account completed successfully.</p>
                        </div>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-card-actions class="close_btn_wrp">
                        <v-icon class="black-txt" @click="transftomainacc_model1 = false">mdi-close</v-icon>
                    </v-card-actions>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </template>

        <!-- Deposit modal popup -->
          <template>
              <v-dialog v-model="dialog4" persistent max-width="800px" content-class="dialog4_scroll">
                <v-card class="modal-white-bg" style="border: solid 1px #22E627;">
                    <v-form ref="form6" v-model="valid">
                  <v-card-text>
                    <v-container class="black_txt p-0">
                      <h4 class="text-center font-weight-bold">Deposit {{withdraw_walletsybl}}</h4>
                      <div class="modal_inner_wrp mt-4">
                        <p>Open up your wallet mobile app and scan the following QR code. If your wallet not support QR codes, enter the following address.</p>
                        <v-row>
                          <v-col cols="12" xl="4">
                            <img :src="wallet_qr_code" style="width:275px;" class="img-fluid">
                          </v-col>
                          <v-col cols="12" xl="8">
                            <div class="deposit_error_msg mb-5" v-if="is_erc == 1">
                            Send only supported ERC20 tokens to this deposit address. Sending any other coin or token to this address may result in the loss of your deposit.
                            </div>
                            <div class="deposit_error_msg mb-5" v-else>
                                Send only {{withdraw_walletsybl}} to this deposit address. Sending any other coin or token to this address may result in the loss of your deposit.
                            </div>
                            <div class="form-group">
                            <v-text-field label="Outlined" single-line outlined class="f14" v-model="crypto_wallet_addr" readonly>
                            </v-text-field>

                            <a class="copy_link"
                            v-clipboard:copy="crypto_wallet_addr"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">Copy</a>
                          <!-- <textarea v-model='copiedText'></textarea> -->
                        </div>

                          </v-col>
                        </v-row>
                      </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <div class="close_btn_wrp">
                      <v-icon class="black-txt" @click="dialog4 = false">mdi-close</v-icon>
                    </div>
                    <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                  </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
          </template>
          <!-- modal popup for Deposit error messages -->
                <template>
                    <v-dialog v-model="dialog41" persistent max-width="600px">
                    <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                        <v-card-text class="pb-0">
                        <v-container class="black_txt pb-0">
                            <h4 class="text-center font-weight-bold">Deposit {{withdraw_walletsybl}}</h4>
                            <div class="modal_inner_wrp text-center" style="width: 450px;">
                            <!-- <p class="font-weight-bold">Confirmation of Your Transfer</p> -->
                            <p>Server busy, please try after sometime.</p>
                            </div>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-card-actions class="close_btn_wrp">
                            <v-icon class="black-txt" @click="dialog41 = false">mdi-close</v-icon>
                        </v-card-actions>
                        <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </template>
          <!-- KYC status modal popup for withdarwal -->
          <template>
                <v-dialog v-model="dialog51" persistent max-width="500px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                    <v-card-text class="pb-0">
                    <v-container class="black_txt pb-0 text-center">
                        <h4 class="text-center font-weight-bold mt-2">Request Status</h4>
                        <div class="mt-4 text-center">  
                          <img src="../../assets/images/request-status-icon.png" alt="" width="64" class="py-4">              
                        <p>
                            Kindly take a note that you are <strong>required to complete the KYC verification</strong> process to enable Trade/Deposit/Withdraw/Internal Transfer request.
                        </p>
                        </div>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-card-actions class="close_btn_wrp">
                        <v-icon class="black-txt" @click="dialog51 = false">mdi-close</v-icon>
                    </v-card-actions>

                    <v-spacer></v-spacer>                    
                    <v-btn-toggle class="w-100 btngroup_div mb-0">
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
                
        <!-- Withdraw modal popup -->
          <template>
            <v-dialog v-model="dialog5" persistent max-width="600px" content-class="modal_scroll">
              <v-card class="modal-white-bg pb-5 h-100" style="border: solid 1px #22E627;">
                <div class="scrolling_wrp" v-bar>
                <v-form ref="form" v-model="valid">
                <v-card-text class="pb-0">
                  <v-container class="black_txt pb-0">
                    <h4 class="text-center font-weight-bold">Withdrawal {{withdraw_walletsybl}}</h4>
                    <h5 class="text-center font-weight-bold mt-2 green_txt f25">{{withdraw_walletbal}}</h5>
                    <div class="modal_inner_wrp" style="width: 450px;">
                        <div class="deposit_error_msg mb-5" v-if="is_erc == 1">
                        Send only to supported ERC20 token address. Sending to any other coin or token may result in the loss of your withdrawal.
                        </div>
                        <div class="deposit_error_msg mb-5" v-else>
                            Send only to {{withdraw_walletsybl}} address. Sending to any other coin or token may result in the loss of your withdrawal.
                        </div>
                      <p>Please enter the amount and address below to withdraw</p>
                      <div class="form-group surfex_wrap mb-0">
                        <v-col cols="12" class="clearfix px-0">
                          <p class="font-weight-bold f18 float-left mb-0">Amount ({{withdraw_walletsybl}})</p>
                          <p class="f18 float-right mb-0 font-weight-bold">
                            <span>$</span>{{withdraw_amt_in_usd}}
                            <span>USD</span>
                          </p>
                        </v-col>
                        <v-text-field v-model="wtamt" label="Outlined" single-line outlined class="currncy_input" placeholder="0.00"
                        required :rules="wtamtRules" @keyup="updTotNetAmt" @keypress="isNumberVal($event,1)" @paste="checkPaste(1,$event)">
                        </v-text-field>
                        <a class="maximum_currency_lable" @click="getMaxAmt">Max</a>
                        <!-- <span class="float-right f18">Balance:
                          {{withdraw_walletbal}}
                          <span>{{withdraw_walletsybl}}</span>
                        </span> -->
                        <span class="float-right f18 mt-2">Fee:
                          {{withdraw_walletfee}}
                          <span>{{withdraw_walletsybl}}</span>
                        </span>
                      </div>
                      <div class="deposit_error_msg mt-8" v-show="wtd_amount_err_div">
                          {{wtd_amount_err}}
                      </div>
                      <div class="form-group bg_input">
                        <v-col cols="12" class="clearfix px-0">
                          <p class="font-weight-bold f18 float-left mb-0">Net Total ({{withdraw_walletsybl}})</p>
                        </v-col>
                        <v-text-field label="Outlined" v-model="getNetAmt" single-line outlined class="currncy_input" placeholder="0.00"
                          hide-details readonly>
                        </v-text-field>
                      </div>
                    </div>
                    <div class="model_middle_bg">
                      <div class="modal_inner_wrp" style="width: 450px;">
                        <div class="form-group addressSelect">
                          <v-col cols="12" class="clearfix px-0">
                            <p class="font-weight-bold f18 float-left mb-0">Withdrawal Wallet Address ({{withdraw_walletsybl}})</p>
                          </v-col>
                          <v-text-field class="address_input" hide-details v-model="walletAddr" v-on:focus="addressFocus" v-on:keyup="searchAddr" @keypress="checkAddr($event)" placeholder="Enter your wallet address" single-line outlined required :rules="walletAddrRules">
                        </v-text-field>
                        <ul class="w-address-list" v-show="listofwallets">
                            <li v-for="(item,i) in addressItems" :key="i" v-on:click="bindAddress(item)"><p class="mb-0 font-weight-bold">{{ item.label }}</p><p class="mb-0 f13">{{ item.address }}</p></li>
                        </ul>
                        </div>
                        <v-switch label="Save Wallet Address" color="success" value="success" hide-details
                          class="mt-0 wallet_add-swich" v-model="walletAddress" v-on:change="savewalletAddress($event)"></v-switch>
                        <div class="form-group" v-show="walletAddress">
                          <v-col cols="12" class="clearfix px-0">
                            <p class="font-weight-bold f18 float-left mb-0"><span class="red_txt">*</span> Label</p>
                          </v-col>
                          <v-text-field v-model="walletLabel" :required="IsRequired" label="Outlined" single-line outlined class="address_input"
                            placeholder="Enter Label" hide-details="auto">
                          </v-text-field>
                        </div>

                      </div>
                        
                    </div>
                    <div class="deposit_error_msg mt-2" v-show="wtd_address_err_div">
                            {{wtd_address_err}}
                        </div>
                    <div class="modal_inner_wrp mt-4" style="width: 450px;">
                      <div class="form-group">
                        <v-col cols="12" class="clearfix px-0 pt-0">
                          <p class="font-weight-bold f18 float-left mb-0 "><span class="red_txt">*</span> Description
                          </p>
                        </v-col>
                        <v-text-field label="Outlined" v-model="wtDescription" single-line outlined class=""
                        required :rules="descRules" hide-details="auto" @keypress="checkSpaces($event)" v-on:focus="descFocus" placeholder="Description">
                        </v-text-field>
                      </div>
                    </div>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-card-actions class="close_btn_wrp">
                    <v-icon class="black-txt" @click="dialog5 = false">mdi-close</v-icon>
                  </v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn-toggle class="w-100 btngroup_div">
                    <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="dialog5 = false">
                      <span class="hidden-sm-and-down">Cancel</span>
                    </v-btn>
                    <v-btn value="right" class="green darken-1 w-50 px-7 py-2" @click="withdraw_2fa" >
                      <span class="hidden-sm-and-down">Submit</span>
                    </v-btn>
                  </v-btn-toggle>
                  <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                </v-card-actions>
                </v-form>
                </div>
              </v-card>
            </v-dialog>
          </template>

    <!-- Withdraw after submited modal popup -->
          <template>
            <v-dialog v-model="dialog6" persistent max-width="600px" class="wthdrawmodal">
              <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                <v-card-text class="pb-0">
                  <v-container class="black_txt pb-0">
                    <h4 class="text-center font-weight-bold ">Withdrawal {{withdraw_walletsybl}}</h4>
                    <div class="modal_inner_wrp" style="width: 450px;">
                      <p class="mb-1">Wallet Address:</p>
                      <p class="font-weight-bold mb-3">{{walletAddr}}</p>
                      <p class="mb-1">Description:</p>
                      <p class="font-weight-bold mb-8">{{wtDescription}}</p>

                      <table class="w-100">
                        <tbody>
                          <tr>
                            <td class="pb-1">Amount:</td>
                            <td class="pb-1" align="right">{{dispwtamt}} {{withdraw_walletsybl}}</td>
                          </tr>
                          <tr>
                            <td class="custom_brddr_bottom pb-2">Fees:</td>
                            <td class="custom_brddr_bottom pb-2" align="right">{{withdraw_walletfee}} {{withdraw_walletsybl}}</td>
                          </tr>
                          <tr><td colspan="2" height="20">&nbsp;</td></tr>
                          <tr>
                            <td class="font-weight-bold">Net Total:</td>
                            <td align="right" class="f25 font-weight-bold">{{getNetAmt}} {{withdraw_walletsybl}} </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="text-center mt-12" v-if="loggedUserInfo.withdraw_tfa_status == 'A'">
                          <img src="../../assets/images/icon-2fa.png" alt="" width="60">
                          <p class="font-weight-bold f18 my-4">Two-Factor Google Authenticator</p>
                        <div class="wt_twofa" id="twofa_wrp">
                           
                          <input class="ga_tfa" type="text" @keypress="isNumber($event)" v-model="tfa1" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                          <input class="ga_tfa" type="text" @keypress="isNumber($event)" v-model="tfa2" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                          <input class="ga_tfa" type="text" @keypress="isNumber($event)" v-model="tfa3" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                          <input class="ga_tfa" type="text" @keypress="isNumber($event)" v-model="tfa4" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                           <input class="ga_tfa" type="text" @keypress="isNumber($event)" v-model="tfa5" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                          <input class="ga_tfa" type="text" @keypress="isNumber($event)" v-on:keyup="getAttributeLength" v-model="tfa6" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                          <div class="val_div arrow-top" v-show="twofa_err">
                              Please enter valid verification code
                          </div>
                        </div>
                        <p class="f13">Enter the 2-step verification code provided by Google Authenticator app</p>
                      </div>
                      <div class="text-center mt-12" v-else>
                        <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :loading="loading1" :disabled="loading1" @click="withdrawRequest" >
                          <span class="hidden-sm-and-down">Submit</span>
                        </v-btn>
                      </div>
                    </div>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-card-actions class="close_btn_wrp">
                    <v-icon class="black-txt" @click="dialog6 = false">mdi-close</v-icon>
                  </v-card-actions>
                  <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        
      <!-- Confirm Withdraw  modal popup -->
      <template>
            <v-dialog v-model="dialog7" persistent max-width="500px">
            <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                <v-card-text class="pb-0">
                <v-container class="black_txt pb-0 text-center">
                    <img src="../../assets/images/tick-mark.png" alt="" class="mb-3 mt-4">
                    <h4 class="text-center font-weight-bold mt-2">Withdrawal {{withdraw_walletsybl}}</h4>
                    <div class="mt-4 text-center">             
                    <p class="font-weight-bold">Confirm Your Withdrawal</p>               
                    <p>We've sent an email verification to confirm your withdrawal. Please click the link in that email to continue.</p>
                    </div>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-card-actions class="close_btn_wrp">
                    <v-icon class="black-txt" @click="dialog7 = false">mdi-close</v-icon>
                </v-card-actions>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </template>
            <!-- Transfer trading account modal popup -->
          <template>
              <v-dialog v-model="dialog8" persistent max-width="600px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                <v-form ref="form2" v-model="valid">
                  <v-card-text>
                    <v-container class="black_txt pb-0">
                      <h4 class="text-center font-weight-bold">Transfer {{withdraw_walletsybl}}</h4>
                      <div class="modal_inner_wrp" style="width: 450px;">
                        <p>Transfer {{withdraw_walletsybl}} to another BREXILY user account</p>
                        <div class="deposit_error_msg mb-4">
                          Transfer any coin or token to other BREXILY account may result in the depreciation from your main account
                        </div>
                        <div class="form-group mb-9 surfex_wrap mb-0">
                          <v-col cols="12" class="clearfix px-0">
                            <p class="font-weight-bold f18 float-left mb-0">Main Account</p>
                            <p class="f18 float-right mb-0 font-weight-bold">
                              <span>$</span>{{transfer_amt_in_usd}}
                              <span>USD</span>
                            </p>
                          </v-col>
                          <v-text-field 
                          label="Outlined" 
                          v-model="transfintly_amt"
                          v-keyup="updUsdAmt()"
                          single-line 
                          outlined 
                          :rules="trnsfinterlamtRules"
                          required
                          hide-details="auto"
                          class="currncy_input" 
                          placeholder="0.00"
                           @keypress="isNumberVal($event,2)"
                           @paste="checkPaste(2,$event)"
                          >
                          </v-text-field>
                          <a class="maximum_currency_lable" @click="getTIMaxAmt">Max</a>
                          <span class="float-right f18 mt-2">Balance:
                            {{withdraw_walletbal}}
                            <span>{{withdraw_walletsybl}}</span>
                          </span>
                         
                        </div>
                        <div class="deposit_error_msg mt-8" v-show="ti_amount_err_div">
                            {{ti_amount_err}}
                        </div>
                         <div class="form-group email_verify_msg mb-0">
                          <v-col cols="12" class="clearfix px-0">
                            <p class="font-weight-bold f18 float-left mb-0">Verify user receiving this transfer</p>
                          </v-col>
                           <!-- <v-form v-model="valid" class="email_verify_div"> -->
                          <v-text-field 
                          v-model="receiver_emailid"
                          v-on:focus="receiver_emailid_focus"
                          label="Outlined" 
                          single-line 
                          outlined 
                          :rules="emailRules"
                          required
                          placeholder="Email ID">
                          </v-text-field>
                             <a 
                              class="verify_link" @click="verifyEmail"
                            >Verify</a>
                            <div class="val_div arrow-top" v-show="emailverify_err">
                                {{verifyemailErrorMessage}}
                            </div>
                           <!-- </v-form> -->
                        </div>
                      </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions class="pt-0">
                    <v-card-actions class="close_btn_wrp">
                      <v-icon class="black-txt" @click="dialog8 = false">mdi-close</v-icon>
                    </v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn-toggle class="w-100 btngroup_div">
                      <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="dialog8 = false">
                        <span class="hidden-sm-and-down">Cancel</span>
                      </v-btn>
                      <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :disabled="verifyEmailStatus" @click="transfer_coin">
                        <span class="hidden-sm-and-down">Submit</span>
                      </v-btn>
                    </v-btn-toggle>
                    <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                  </v-card-actions>
                    </v-form>
                </v-card>
              </v-dialog>
          </template>
        <!-- Confirm transfer  modal popup -->
          <template>
              <v-dialog v-model="dialog9" persistent max-width="600px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                    <v-form ref="form3" v-model="valid">
                  <v-card-text class="pb-0">
                    <v-container class="black_txt pb-0">
                      <h4 class="text-center font-weight-bold">Transfer {{withdraw_walletsybl}}</h4>
                      <div class="modal_inner_wrp" style="width: 450px;">
                  

                        <table class="w-100">
                          <tbody>
                            
                            <tr>
                              <td>Amount:</td>
                              <td align="right" class="f25 font-weight-bold">{{disptransfintly_amt}} {{withdraw_walletsybl}} </td>
                            </tr>
                            <tr>
                              <td height="20">&nbsp;</td>
                            </tr>
                            <tr>
                              <td>BREXILY User:</td>
                              <td align="right" class="f18 font-weight-bold">{{receiver_emailid}}</td>
                            </tr>
                            <tr>
                              <td>&nbsp;</td>
                              <td align="right" class="f16">{{receiver_name}}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="text-center mt-12" v-if="loggedUserInfo.transferto_user_tfa_status == 'A'">
                            <img src="../../assets/images/icon-2fa.png" alt="" width="60">
                            <p class="font-weight-bold f18 my-4">Two-Factor Google Authenticator</p>

                          <div id="twofa_wrp">
                            <input class="ti_tfa" type="text" @keypress="isNumber($event)" v-model="titfa1" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                            <input class="ti_tfa" type="text" @keypress="isNumber($event)" v-model="titfa2" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                            <input class="ti_tfa" type="text" @keypress="isNumber($event)" v-model="titfa3" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                            <input class="ti_tfa" type="text" @keypress="isNumber($event)" v-model="titfa4" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                            <input class="ti_tfa" type="text" @keypress="isNumber($event)" v-model="titfa5" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                            <input class="ti_tfa" type="text" @keypress="isNumber($event)" v-on:keyup="transfInternally" v-model="titfa6" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" v-bind:class="{ active: isActive }"/>
                          
                            <div class="val_div arrow-top" v-show="titwofa_err">
                                Please enter valid verification code
                            </div>
                          </div>
                          <p class="f13">Enter the 2-step verification code provided by Google Authenticator app</p>
                        </div>
                        <div class="text-center mt-12" v-else>
                            <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :loading="loading1" :disabled="loading1" @click="savetransferInternally" >
                            <span class="hidden-sm-and-down">Submit</span>
                            </v-btn>
                        </div>
                      </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-card-actions class="close_btn_wrp">
                      <v-icon class="black-txt" @click="dialog9 = false">mdi-close</v-icon>
                    </v-card-actions>
                    <!-- <v-btn color="blue darken-1" text @click="dialog3 = false">Close</v-btn> -->
                  </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
          </template>
          <!-- Confirm transfer internally  modal popup -->
          <template>
                <v-dialog v-model="dialog10" persistent max-width="500px">
                <v-card class="modal-white-bg pb-5" style="border: solid 1px #22E627;">
                    <v-card-text class="pb-0">
                    <v-container class="black_txt pb-0 text-center">
                        <img src="../../assets/images/tick-mark.png" alt="" class="mb-3 mt-4">
                        <h4 class="text-center font-weight-bold mt-2">Transfer {{withdraw_walletsybl}}</h4>
                        <div class="mt-4 text-center">             
                        <p class="font-weight-bold">Confirm Your Transfer Internally</p>               
                        <p>{{transferInternallyMsg}}</p>
                        </div>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-card-actions class="close_btn_wrp">
                        <v-icon class="black-txt" @click="dialog10 = false">mdi-close</v-icon>
                    </v-card-actions>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </template>         

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
    <v-overlay :value="overlay1" style="z-index:205;">
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
</v-app>
</template>

<script>
import axios from 'axios';
import qs from 'qs'
import $ from 'jquery';
import TopBar from '../User_Dashboard/TopBar';
//import shareMedia from '../User_Dashboard/shareMedia'
//import wallets from "../User_Dashboard/wallets.json";
export default {
    name: 'Wallets',
    components: {
        TopBar,
        //shareMedia,
    },
    props: {
        verfdTwofa: String
    },
    data: () => ({
        scrollcnt: 0,
        is_erc: 0,
        walletAddr: '',
        testwallett: '',
        loading: false,
        loading1: false,
        twofa_err: false,
        titwofa_err: false,
        isActive: false,
        overlay: false,
        overlay1: false,
        absolute: true,
        norecords: false,
        adminUrl: '',
        mode: '',
        hideZeroBalance: null,
        walletname: '',
        totalUsdAmount: '',
        totalMainAccountAmount: '',
        totalTradeAccountAmount: '',
        totalInordersUsd: '',
        walletsList: [],
        allwalletsList: [],
        searchwalletsList: [],
        loggedUserInfo: [],
        referralInfo: [],
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog31: false,
        transftomainacc_model: false,
        transftomainacc_model1: false,
        tradeaccToMainaccErr: '',
        dialog4: false,
        dialog41: false,
        dialog5: false,
        dialog51: false,
        dialog6: false,
        dialog7: false,
        verifyEmailStatus: true,
        dialog8: false,
        dialog9: false,
        dialog10: false,
        transferInternallyMsg: '',
         walletAddress: false,
         IsRequired: false,
        refCode: '',
        refCodeLink: '',
        snackbar: false,
        snackbar_text: "",
        vertical: true,
        timeout: 6000,
        color: "yellow",
        x: 'right',
        y: 'top',
        hostname: '',
        wallet_qr_code: '',
        copiedText: '',
        crypto_wallet_addr: '',
         addressItems: [],
         addressList: [],
         listofwallets: false,
      withdraw_walletsybl: '',
      withdraw_walletfee: '',
      withdraw_walletprice: '',
      withdraw_amt_in_usd: 0.00,
      transfer_amt_in_usd: 0.00,
      withdraw_walletbal: '',
      minimum_withdrawal_amt: 0,
      withdraw_tradewalletbal: '',      
      valid: true,
      wtamt: '',
      dispwtamt: 0,
      wtamtRules: [
                v => !!v || 'Amount is required',
                //v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
                v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
                v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
            ],
      wtd_address: '',
      wtDescription: '',
      walletAddrRules: [
                v => !!v || 'Withdrawal Wallet Address is required',                
      ],
    //   savewalletAddrRules: [
    //             v => !!v || 'Save Wallet Address Label is required',
    //   ],
      descRules: [
                v => !!v || 'Description is required',
                v => /^.{8,}$/.test(v) || 'Minimum 8 characters'
      ],
      walletLabel: '',
      wtd_two_fa: '',
       wtTwofaRules: [
                v => !!v || '2-step verification code is required',
      ],
      getNetAmt: 0,
      //tfa_code: '',
      tfa1: '',
      tfa2: '',
      tfa3: '',
      tfa4: '',
      tfa5: '',
      tfa6: '',
      titfa1: '',
      titfa2: '',
      titfa3: '',
      titfa4: '',
      titfa5: '',
      titfa6: '',
      wtd_amount_err_div: false,
      wtd_amount_err: '',
      wtd_address_err_div: false,
      wtd_address_err: '',
      ti_amount_err_div: false,
      ti_amount_err: '',
      ttom_amount_err_div: false,
      ttom_amount_err: '',
      mtot_amount_err_div: false,
      mtot_amount_err: '',
      transfintly_amt: '',
      disptransfintly_amt:0,
      verifyemailErrorMessage: '',
      emailverify_err: false,
      receiver_emailid: '',
      receiver_name: '',
      ttom_amt_in_usd: 0.00,
      mtot_amt_in_usd: 0.00,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'Enter valid email id',
      ],
      trnsfinterlamtRules: [
                v => !!v || 'Amount is required',
                //v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
                v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
                v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
            ],
        ttom_amt:'',
        ttomamtRules: [
                v => !!v || 'Amount is required',
                //v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
                v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
                v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
            ],
        mtot_amt:'',        
        mtotamtRules: [
                v => !!v || 'Amount is required',
                //v => /^\s*(?=.*[1-9])\d*(?:\.\d{0,9})?\s*$/.test(v) || 'Amount should be greater than 0',
                v => /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(v) || 'Please enter valid amount',
                v => /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,8})?$/.test(v) || 'Allow 8 decimals',
            ],
            
    }),
    created() {
        this.getUserInfo()
        //this.getReferralInfo()
        this.hostname = window.location.origin
        // let verfdTwofa = localStorage.getItem('verfdTwofa')
        // if (verfdTwofa == 'V') {
        //     this.dialog2 = true
        //     localStorage.removeItem('verfdTwofa')
        // }
    },
    methods: {
        checkPaste: function(type, event) {
            event.preventDefault();
            let amt = event.clipboardData.getData('text')
            let bamt = amt.replace(/\s/g,"")
            let amount = bamt.replace(/,/g, '')
            if(type == 1){                
                this.wtamt = amount
            }else if(type == 2){
                this.transfintly_amt = amount
            }else if(type == 3){
                this.mtot_amt = amount
            }else if(type == 4){
                this.ttom_amt = amount
            }
        },
        checkSpaces: function(evt){
             evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            console.log(charCode);
             let wsRegex = /^\s*\s*$/;
             this.wtDescription = this.wtDescription.replace(wsRegex, '');
        },
        descFocus: function(){
            this.walletAddr = this.walletAddr.split(" ").join("");
        },
        checkAddr: function(evt){
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode == 32) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        searchAddr: function(){
            this.listofwallets=true
            let walletAddr = this.walletAddr;
            if (walletAddr != "") {
                this.addressItems = this.addressList.filter(function (e) {                    
                    let name = e.label;
                    return name.toLowerCase().includes(walletAddr.toLowerCase());
                });                
                if(this.addressItems.length == 0){
                    this.listofwallets=false
                }else{
                    this.listofwallets=true
                }
            } else {
                if(this.addressList.length == 0){
                    this.listofwallets=false
                    this.addressItems = this.addressList
                }else{
                    this.addressItems = this.addressList
                }                
            }
        },
        addressFocus: function(){
            this.wtd_address_err_div = false
            if(this.addressItems.length == 0){
                this.listofwallets=false
            }else{
                this.listofwallets=true
            }      
        },
        disbAddrList: function(){
            this.listofwallets=false    
        },        
      getWalletList: function () {
            this.overlay = true
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let bodyFormData = {
                "search": '',
                "page": this.scrollcnt 
            }
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "walletlist";
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
                        self.norecords = true
                        // self.totalUsdAmount = response.data.Result.totalAssetsUsd
                        // self.totalMainAccountAmount = response.data.Result.total_main_account_bal
                        // self.totalTradeAccountAmount = response.data.Result.total_trade_account_bal
                        // self.totalInordersUsd = response.data.Result.totalInordersUsd
                        let resmsg = response.data.Result.wallets_list
                        Object.keys(resmsg).forEach(value => {
                            self.allwalletsList.push(resmsg[value]);
                        });
                        self.walletsList = self.allwalletsList
                        self.scrollcnt = self.scrollcnt +1;
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
        searchWalletList: function (seachKey) {
            this.overlay = true
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let bodyFormData = {
                "search": seachKey,
                "page": 0 
            }
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "walletlist";
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
                        self.norecords = true
                        //self.totalUsdAmount = response.data.Result.totalUsdAmount
                        //let resmsg = response.data.Result.wallets_list
                        // Object.keys(resmsg).forEach(value => {
                        //     self.walletsList.push(resmsg[value]);
                        //     self.allwalletsList.push(resmsg[value]);
                        // });                        
                        self.walletsList = response.data.Result.wallets_list
                        //self.searchwalletsList = response.data.Result.wallets_list
                        //self.scrollcnt = self.scrollcnt +1;
                    })
                    .catch(function () {
                        //handle error
                    });
            } else {
                window.location.href = "/";
            }
        },
        createorgetWalletAddr: function () {
            this.overlay = true
            var self = this;
            let auth_token = this.$store.getters.authToken;
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "wallet_address_check";
                let bodyFormData = {
                    "wallet_symbol": this.withdraw_walletsybl
                }
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
                        if(response.data.status == "Success"){
                            let resmsg = response.data.Result
                            self.wallet_qr_code = resmsg.qrcode
                            self.crypto_wallet_addr = resmsg.wallet_address
                            self.dialog4 = true 
                        }else if(response.data.status == "Failure"){
                            self.createApiSession();
                        }                        
                    })
                    .catch(function (err) {
                        //handle error
                        if (!err.response.status) {
                            self.overlay = false
                            self.dialog4 = false
                            self.dialog41 = true
                        }else if(err.response.data.Result == 'User is blocked'){
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
                            if(err.response.data.is_expired == 1){
                                self.createApiSession();
                            }else{
                                self.overlay = false
                                self.dialog4 = false
                                self.dialog41 = true
                            }
                        }                        
                         
                    });
            } else {
                window.location.href = "/";
            }
        },  
        createApiSession: function () {
            //this.overlay = true
            var self = this;
            let auth_token = this.$store.getters.authToken;
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "create_api_session";
                let bodyFormData = {
                    "wallet_symbol": this.withdraw_walletsybl
                }
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
                        if(response.data.status == "Success"){
                            self.createorgetWalletAddr();
                        }
                    })
                    .catch(function () {
                        //handle error
                    });
            } else {
                window.location.href = "/";
            }
        },     
         onCopy: function (e) {
             this.copiedText = e.text;
            // alert('You just copied: ' + e.text)
            this.snackbar_text = 'You just copied: ' + e.text;
            this.snackbar = true
        },
        onError: function (e) {
            alert('Failed to copy texts'+e)
        },
        deposit: function (ws,is_erc20){
            this.withdraw_walletsybl = ws  
            this.is_erc = is_erc20
            //if(this.loggedUserInfo.kyc_status == 1){
                this.createorgetWalletAddr();       
                //this.dialog4 = true   
            // }else{
            //     this.dialog51 = true   
            // }      
        },       
        getWalletAddrList: function () {
            //this.overlay = true
            this.addressItems = []
            var self = this;
            let auth_token = this.$store.getters.authToken;
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "get_address_book";
                let bodyFormData = {
                    "wallet_symbol": this.withdraw_walletsybl
                }
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
                        //self.overlay = falseself.addressItems =
                        let resmsg = response.data.Result
                        resmsg.forEach((value) => {
                            self.addressItems.push({"address" : value.address,"label":value.label});
                        })
                        self.addressList = self.addressItems
                    })
                    .catch(function () {
                        //handle error
                    });
            } else {
                window.location.href = "/";
            }
        },    
         withdraw: function (ws,wf,wp,wb,minamt,is_erc20){
            this.is_erc = is_erc20
            this.withdraw_walletsybl = ws
            this.withdraw_walletfee = wf
            this.withdraw_walletprice = wp
            this.withdraw_walletbal = wb 
            this.minimum_withdrawal_amt = minamt
            this.withdraw_amt_in_usd = 0.00 
            this.listofwallets=false
            this.wtd_amount_err_div = false
            this.wtd_address_err_div = false
             //if(this.loggedUserInfo.kyc_status == 1){                        
                this.dialog5 = true
                this.getWalletAddrList();
                this.$refs.form.reset();
            //  }else{
            //      this.dialog51 = true
            //  }          
        },
        getMaxAmt: function(){
            let wb = this.withdraw_walletbal.replace(/,/g, '')
            let Amt =  parseFloat(wb)-parseFloat(this.withdraw_walletfee)
            this.wtamt = Amt
            this.updTotNetAmt();
        },
        isNumberVal: function(evt,type) {
            var amt = 1;
            if(type == 1){
                amt = this.wtamt
            }else if(type == 2){
                amt = this.transfintly_amt
            }else if(type == 3){
                amt = this.mtot_amt
            }else if(type == 4){
                amt = this.ttom_amt
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
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        updTotNetAmt: function(){
            let wb = this.withdraw_walletbal.replace(/,/g, '')
            if(this.wtamt){
                if(parseFloat(this.wtamt) > parseFloat(wb)){
                    //   this.wtamtRules= [
                    //     'Insufficient Balance'
                    //   ]
                    this.wtd_amount_err_div = true
                    this.wtd_amount_err = "Insufficient Main Balance"
                    //this.wtamt = ''
                    this.getNetAmt = 0
                    this.dispwtamt = 0
                    this.withdraw_amt_in_usd = 0
                }else{
                    //this.wtamtRules= ['']
                    this.wtd_amount_err_div = false
                    this.wtd_amount_err = ""
                    let usd = parseFloat(this.wtamt)*parseFloat(this.withdraw_walletprice)
                    this.withdraw_amt_in_usd = usd.toLocaleString('en',{maximumFractionDigits: 2});
                    let netamt =  parseFloat(this.wtamt)+parseFloat(this.withdraw_walletfee)
                    this.getNetAmt = netamt.toLocaleString('en',{maximumFractionDigits: 8});
                    this.dispwtamt = parseFloat(this.wtamt).toLocaleString('en',{maximumFractionDigits: 8}); 
                } 
            }else{
                this.getNetAmt = 0
                 this.dispwtamt = 0
                this.withdraw_amt_in_usd = 0
            }
                   
        },
        savewalletAddress: function(e){
            if(e == "success"){
                this.IsRequired = true
            }else{
                this.IsRequired = false
            }            
        },
        withdraw_2fa: function() {
            this.tfa1 = "";
            this.tfa2 = "";
            this.tfa3 = "";
            this.tfa4 = "";
            this.tfa5 = "";
            this.tfa6 = "";
            $('.tfa').removeClass("tfa_active_cls");
            this.twofa_err = false           
          if (this.$refs.form.validate()) {
              let wb = this.withdraw_walletbal.replace(/,/g, '')
              let fee = this.withdraw_walletfee.replace(/,/g, '')
                if(parseFloat(this.wtamt)+parseFloat(fee) > parseFloat(wb)){
                    this.wtd_amount_err_div = true
                    this.wtd_amount_err = "Insufficient main balance"
                }
                else{
                    if(parseFloat(this.wtamt) < parseFloat(this.minimum_withdrawal_amt)){
                        this.wtd_amount_err_div = true
                        this.wtd_amount_err = "Minimum withdraw amount is "+this.minimum_withdrawal_amt
                    }else{      
                        this.loading1 = false;                  
                        this.dialog6 = true;
                        this.dialog5 = false;
                    }
                }       
          }
        },
        bindAddress: function(e){
            this.walletAddr=e.address
            this.listofwallets=false
        },
        getAttributeLength: function () {
            var maxlength = event.target.getAttribute('maxlength');
            let verifyCode = this.tfa6
            if (maxlength == verifyCode.length) {
                this.withdrawRequest();
            }
        },
        validate: function(){
          if (this.$refs.form1.validate()) {
            this.withdrawRequest()
          }
        },
        withdrawRequest() {
            this.loading1 = true;
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let two_fa = this.tfa1+this.tfa2+this.tfa3+this.tfa4+this.tfa5+this.tfa6
            let bodyFormData = {
                "wallet_symbol": this.withdraw_walletsybl,
                "label": this.walletLabel,
                "wallet_address" : this.walletAddr,
                "amount": this.wtamt,
                "description": this.wtDescription,
                "two_fa" : two_fa,
                "usd_amount" : this.withdraw_walletprice,
                "fees" : this.withdraw_walletfee,
                "is_two_fa_enabled" : this.loggedUserInfo.withdraw_tfa_status,
                "total_usd_amount": this.totalUsdAmount,
                "totalMainAccountAmount": this.totalMainAccountAmount
            }
            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "withdrawRequest";
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
                        
                        if(response.data.status == 'Success'){                     
                            self.totalUsdAmount = response.data.totalUsdAmount
                            self.totalMainAccountAmount = response.data.totalMainAccountAmount
                            let data = {
                                        "main_balance": response.data.main_balance
                                    }
                                    
                            let index = self.walletsList.map(function(e) { return e.wallet_symbol; }).indexOf(self.withdraw_walletsybl);
                            Object.assign(self.walletsList[index], data)

                            self.dialog7 = true    
                            self.dialog6 = false;
                        }    
                                                            
                    })
                    .catch(function (err) {
                        
                        self.loading1 = false;                        
                        if( err.response.data.msg == "Please enter correct verification code"){
                            self.twofa_err = true
                            self.tfa1 = "";
                            self.tfa2 = "";
                            self.tfa3 = "";
                            self.tfa4 = "";
                            self.tfa5 = "";
                            self.tfa6 = "";
                        }                        
                        if( err.response.data.Result == "Insufficient funds."){
                            self.wtd_amount_err_div = true
                            self.wtd_amount_err = "Insufficient Main Balance"
                            self.dialog5 = true    
                            self.dialog6 = false;
                        }  
                        if( err.response.data.type == "self"){
                            self.wtd_address_err_div = true
                            self.wtd_address_err = err.response.data.Result
                            self.dialog5 = true    
                            self.dialog6 = false;
                        }   
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
                        //handle error
                    });
            } else {
                window.location.href = "/";
            }
        },
        transferInternally: function (ws,wp,wb){
            this.withdraw_walletsybl = ws
            this.withdraw_walletprice = wp
            this.withdraw_walletbal = wb
            this.transfer_amt_in_usd = 0
            this.verifyEmailStatus =  true
            this.emailverify_err = false
            this.ti_amount_err_div =  false
            if(this.loggedUserInfo.kyc_status == 1){                
                this.dialog8 = true
                this.$refs.form2.reset();
             }else{
                this.dialog51 = true
            } 
        },
        updUsdAmt: function(){
            if(this.transfintly_amt){
                let usd = this.withdraw_walletprice*this.transfintly_amt
                this.transfer_amt_in_usd = usd.toLocaleString('en',{maximumFractionDigits: 2});
            }            
        },
        getTIMaxAmt: function(){
            let wb = this.withdraw_walletbal.replace(/,/g, '')
            this.transfintly_amt = wb
        },
        receiver_emailid_focus: function(){
            this.emailverify_err = false
            this.verifyEmailStatus =  true
            this.ti_amount_err_div =  false
        },
        verifyEmail: function(){
            let email = this.receiver_emailid
            if(email){
                this.emailverify_err = false
                var self = this;
                let auth_token = this.$store.getters.authToken;
                let bodyFormData = {
                    "email": email
                }
                if (auth_token) {

                    const URL = process.env.VUE_APP_API_URL + "verifyUserByEmail";
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
                            self.verifyEmailStatus =  false
                            self.emailverify_err = true
                            self.verifyemailErrorMessage = response.data.Result
                            self.receiver_name = response.data.name  
                                                       
                        })
                        .catch(function (err) {
                            self.verifyEmailStatus =  true
                            self.emailverify_err = true
                            self.receiver_emailid = ''
                            self.verifyemailErrorMessage = err.response.data.Result
                        });
                }
            }else{
                self.emailverify_err = true
                self.verifyemailErrorMessage ="email id required"
            }
        },
        transfer_coin: function() {
            this.titfa1="";
            this.titfa2="";
            this.titfa3="";
            this.titfa4="";
            this.titfa5="";
            this.titfa6="";
            $('.ti_tfa').removeClass("tfa_active_cls");
            this.titwofa_err = false
            if (this.$refs.form2.validate()) {
                this.disptransfintly_amt = parseFloat(this.transfintly_amt).toLocaleString('en',{maximumFractionDigits: 8}); 
                let wb = this.withdraw_walletbal.replace(/,/g, '')
                if(parseFloat(this.transfintly_amt) > parseFloat(wb)){
                    this.ti_amount_err_div =  true
                    this.ti_amount_err = "Inusfficient Amount";
                }else{
                    this.loading1 = false;
                    this.dialog9 = true;
                    this.dialog8 = false;
                }
            }
        },
        transfInternally: function () {
            var maxlength = event.target.getAttribute('maxlength');
            let verifyCode = this.titfa6
            if (maxlength == verifyCode.length) {
                this.savetransferInternally();
            }
        },
         savetransferInternally() {
            this.loading1 = true;
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let two_fa = this.titfa1+this.titfa2+this.titfa3+this.titfa4+this.titfa5+this.titfa6
            let bodyFormData = {
                "wallet_symbol": this.withdraw_walletsybl,
                "amount": this.transfintly_amt,
                "usd_amount" : this.withdraw_walletprice,
                "email": this.receiver_emailid,
                "two_fa" : two_fa,
                "is_two_fa_enabled" : this.loggedUserInfo.transferto_user_tfa_status,
                "total_usd_amount": this.totalUsdAmount,
                "totalMainAccountAmount": this.totalMainAccountAmount
            }
            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "transfer_internally";
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
                        
                        if(response.data.status == 'Success'){
                             self.totalUsdAmount = response.data.totalUsdAmount
                             self.totalMainAccountAmount = response.data.totalMainAccountAmount
                            let data = {
                                        "main_balance": response.data.senderMainBalance
                                    }
                                    
                            let index = self.walletsList.map(function(e) { return e.wallet_symbol; }).indexOf(self.withdraw_walletsybl);
                            Object.assign(self.walletsList[index], data)

                            self.transferInternallyMsg = response.data.Result
                            self.dialog10 = true    
                            self.dialog9 = false;
                        }    
                                                            
                    })
                    .catch(function (err) {                        
                        //handle error
                        if(err.response.data.Result == 'Please enter correct verification code'){
                            self.loading1 = false;
                            self.titwofa_err = true
                        }
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
                    });
            } else {
                window.location.href = "/";
            }
        },
        transferToTradeAcc: function(ws,wp,wb,traccbal) {
            this.withdraw_walletsybl = ws
            this.withdraw_walletprice = wp
            this.withdraw_walletbal = wb
            this.withdraw_tradewalletbal = traccbal  
            this.mtot_amt_in_usd = 0 
            this.mtot_amount_err_div = false
            //if(this.loggedUserInfo.kyc_status == 1){    
                this.loading1 = false;                        
                this.dialog3 = true
                this.$refs.form4.reset();
            // }else{
            //     this.dialog51 = true
            // }            
        },
        mtotupdUsdAmt: function(){     
            if(this.mtot_amt){
                let usd = parseFloat(this.mtot_amt)*parseFloat(this.withdraw_walletprice)
                this.mtot_amt_in_usd = usd.toLocaleString('en',{maximumFractionDigits: 2});
            }        
        },
        getMtoTMaxAmt: function(){
            let wb = this.withdraw_walletbal.replace(/,/g, '')
            this.mtot_amt = wb
        },
        transfertoTradeAccount: function(){
            if (this.$refs.form4.validate()) {
                let wb = this.withdraw_walletbal.replace(/,/g, '')
                if(parseFloat(this.mtot_amt) <= parseFloat(wb)){
                    
                    this.loading1 = true;
                    var self = this;
                    let auth_token = this.$store.getters.authToken;
                    let bodyFormData = {
                        "wallet_symbol": this.withdraw_walletsybl,
                        "amount": this.mtot_amt,
                        "usd_amount" : this.withdraw_walletprice,
                        "totalMainAccountAmount": this.totalMainAccountAmount,
                        "totalTradeAccountAmount": this.totalTradeAccountAmount
                    }
                    if (auth_token) {

                        const URL = process.env.VUE_APP_API_URL + "transfer_main_to_trading_acc";
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
                                
                                if(response.data.status == 'Success'){
                                     self.totalMainAccountAmount = response.data.totalMainAccountAmount
                                     self.totalTradeAccountAmount = response.data.totalTradeAccountAmount
                                     var mb = '0.00'
                                     if(response.data.main_balance == '-0.00'){
                                        mb = '0.00'
                                     }else{
                                        mb = response.data.main_balance
                                     }
                                    let data = {
                                        "main_balance": mb,
                                        "trading_balance" : response.data.trading_balance
                                    }
                                    
                                    let index = self.walletsList.map(function(e) { return e.wallet_symbol; }).indexOf(self.withdraw_walletsybl);
                                    Object.assign(self.walletsList[index], data)

                                    self.dialog31 = true    
                                    self.dialog3 = false;
                                }else{
                                    self.loading1 = false;
                                    self.mtot_amount_err_div = true
                                    self.mtot_amount_err = response.data.Result
                                }  
                                                                    
                            })
                            .catch(function (err) {                                
                                //handle error
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
                                else if(err.response.data.Result == 'Insufficient Main balance'){
                                    self.loading1 = false;
                                    self.mtot_amount_err_div = true
                                    self.mtot_amount_err = err.response.data.Result
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
                }else{
                    //insufficient balance
                    this.mtot_amount_err_div = true
                    this.mtot_amount_err = "Insufficient Main balance";
                }
            }
        },
        transferToMainAcc: function(ws,wp,maccbal,wb) {
            this.withdraw_walletsybl = ws
            this.withdraw_walletprice = wp
            this.withdraw_tradewalletbal = wb
            this.withdraw_walletbal = maccbal
            this.ttom_amt_in_usd = 0
            this.ttom_amount_err_div = false
            //if(this.loggedUserInfo.kyc_status == 1){ 
                this.loading1 = false;
                this.transftomainacc_model = true
                this.$refs.form5.reset();
            // }else{
            //     this.dialog51 = true
            // }
        },
        amttoUsdTtoM: function(){
            if(this.ttom_amt){
                let usd = parseFloat(this.ttom_amt)*parseFloat(this.withdraw_walletprice)
                this.ttom_amt_in_usd = usd.toLocaleString('en',{maximumFractionDigits: 2});
            }            
        },
        getTtoMMaxAmt: function(){
            let wb = this.withdraw_tradewalletbal.replace(/,/g, '')
            this.ttom_amt = wb
        },
        transfertoMainAccount: function(){
            if (this.$refs.form5.validate()) {
                let wb = this.withdraw_tradewalletbal.replace(/,/g, '')
                if(parseFloat(this.ttom_amt) <= parseFloat(wb)){
                    
                    this.loading1 = true;
                    var self = this;
                    let auth_token = this.$store.getters.authToken;
                    let bodyFormData = {
                        "wallet_symbol": this.withdraw_walletsybl,
                        "amount": this.ttom_amt,
                        "usd_amount" : this.withdraw_walletprice,
                        "totalMainAccountAmount": this.totalMainAccountAmount,
                        "totalTradeAccountAmount": this.totalTradeAccountAmount
                    }
                    if (auth_token) {

                        const URL = process.env.VUE_APP_API_URL + "transfer_trading_to_main_acc";
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
                                
                                if(response.data.status == 'Success'){
                                     self.totalMainAccountAmount = response.data.totalMainAccountAmount
                                      self.totalTradeAccountAmount = response.data.totalTradeAccountAmount
                                     var tb = '0.00'
                                     if(response.data.trading_balance == '-0.00'){
                                        tb = '0.00'
                                     }else{
                                        tb = response.data.trading_balance
                                     }
                                    let data = {
                                        "main_balance": response.data.main_balance,
                                        "trading_balance" : tb
                                    }
                                    
                                    let index = self.walletsList.map(function(e) { return e.wallet_symbol; }).indexOf(self.withdraw_walletsybl);
                                    Object.assign(self.walletsList[index], data)

                                    self.transftomainacc_model1 = true    
                                    self.transftomainacc_model = false;
                                }else{
                                    self.loading1 = false;
                                    self.tradeaccToMainaccErr = response.data.Result
                                } 
                                                                    
                            })
                            .catch(function (err) {                                
                                //handle error                                
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
                                else if(err.response.data.Result == 'Insufficient Trading balance'){
                                    self.loading1 = false;
                                    self.ttom_amount_err_div = true
                                    self.ttom_amount_err = err.response.data.Result
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
                }else{
                    //insufficient balance
                    this.ttom_amount_err_div = true
                    this.ttom_amount_err = "Insufficient Trading balance";
                }
            }
        },
        getWalletListBack: function (t) {
            if(t.key=="Backspace" && this.walletname==""){
                this.walletsList=this.allwalletsList
            }
        },
        getWalletSearch: function () {
            let walletName = this.walletname;
            this.hideZeroBalance = null
            if (walletName != "") {
                //if(this.hideZeroBalance == 'balance'){
                //    this.walletsList = this.walletsList.filter(function (e) {
                //        let name = e.wallet_name;
                //        return name.toLowerCase().includes(walletName.toLowerCase());
                //    });   
                //}else{
                    // this.walletsList = this.allwalletsList.filter(function (e) {
                    //     let name = e.wallet_name;
                    //     return name.toLowerCase().includes(walletName.toLowerCase());
                    // });
                    this.searchWalletList(walletName.toLowerCase());
                //}                
            } else {
                //if(this.hideZeroBalance == 'balance'){
                //     this.walletsList = this.allwalletsList.filter(function (e) {
                 //        if(e.main_balance == '0.00' && e.trading_balance == '0.00'){
                             //console.log(e.main_balance);                            
                 //        }else{
                 //            return e.main_balance;
                  //       }                    
                 //   });
                //}else{
                    this.walletsList = this.allwalletsList
                //}
            }
        },
        balSorting: function(e) {
            this.walletname = "";
                if(e == 'balance'){
                     this.walletsList = this.allwalletsList.filter(function (e) {
                         if(e.main_balance == '0.00' && e.trading_balance == '0.00'){
                             //console.log(e.main_balance);                            
                         }else{
                             return e.main_balance;
                         }                    
                    });
                }else{
                    this.walletsList = this.allwalletsList
                }
            },
        gotoSecurity: function () {
            var self = this;
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
                    .then(function () {
                        //handle success 
                        self.$router.push('/Security')
                    })
                    .catch(function () {
                        //handle error
                        window.location.href = "/";
                    });
            } else {
                window.location.href = "/";
            }

        },
        getUserInfo: function () {
            this.overlay1 = true
            var self = this;
            let auth_token = this.$store.getters.authToken;
            
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
                        self.loggedUserInfo = response.data.Result;
                        self.totalUsdAmount = response.data.Result.totalAssert
                        self.totalMainAccountAmount = response.data.Result.mainBalaces
                        self.totalTradeAccountAmount = response.data.Result.tradingBlance
                        self.totalInordersUsd = response.data.Result.inOrderBlance
                        self.overlay1 = false
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
        getReferralInfo: function () {
            var self = this;
            let auth_token = this.$store.getters.authToken;

            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "my-referral";
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
                        self.referralInfo = response.data.Result;
                    })
                    .catch(function () {
                        window.location.href = "/";
                    });
            } else {
                window.location.href = "/";
            }

        },
        copyReferralCode: function () {
            let testingCodeToCopy = document.querySelector('#testing-code')
            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Referral ID copied' : 'unsuccessful';
                this.snackbar_text = msg;
                this.snackbar = true
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        copyReferralLink: function () {
            let testingCodeToCopy = document.querySelector('#testing-code-link')
            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Referral Link Copied' : 'unsuccessful';
                this.snackbar_text = msg;
                this.snackbar = true
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },     

    },
    mounted: function () {

        // let google_2fa_key = localStorage.getItem('google_2fa_key');//this.$store.getters.google_2fa_key
        // let Token2fa_validation_initial = localStorage.getItem('Token2fa_validation_initial');//this.$store.getters.Token2fa_validation_initial
        // let first_name = localStorage.getItem('first_name');//this.$store.getters.first_name
        // if(google_2fa_key == "" && Token2fa_validation_initial == 'D'){
        //     this.$router.push("/Trade/"+this.$store.getters.market_symbol);
        // }else if(google_2fa_key && Token2fa_validation_initial == 'D'){
        //     this.$router.push("/Security");
        // }else if(first_name == ""){
        //         this.$router.push("/Profile");
        //     }
            
      this.adminUrl = process.env.VUE_APP_ADMIN_URL
      
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight;

        if (bottomOfWindow && this.hideZeroBalance == null && this.walletname == "") {
            // Do something, anything!
            this.getWalletList();
        }
        };
        // Detect when scrolled to bottom.
        // const listElm = document.querySelector('#infinity_scroll');
        // listElm.addEventListener('scroll', e => {
        //     console.log(e);
        //     if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight && this.hideZeroBalance == null && this.walletname == "") {
        //         this.getWalletList();
        //     }
        // });

        // Initially load some items.
        this.getWalletList();

        $(function () {
            'use strict';
            var body = $('body');
            function goToNextInput(e) {
                
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
            body.on('keyup', '.ga_tfa', goToNextInput);
            body.on('keyup', '.ti_tfa', goToNextInput);
        })
    }

};
</script>
