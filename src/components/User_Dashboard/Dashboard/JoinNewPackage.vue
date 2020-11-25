<template>

    <v-container class="px-0">

        <template>
            <v-card class="earnbtc_tabs">
                   
                <v-tabs background-color="transparent" grow class="join_pkg_tabs">
                    <v-row>
                        <v-col cols="4">
                            <v-tab  @click="getTab('subScribeMySelf')">
                                <v-icon>mdi-human-male</v-icon>
                                SUBSCRIBE FOR MYSELF
                            </v-tab>
                        </v-col>
                        <v-col cols="4">
                            <v-tab  @click="getTab('subScribeMyFriend')">
                                <v-icon>mdi-human-male-female</v-icon>
                                SUBSCRIBE FOR MY FRIEND
                            </v-tab>
                        </v-col>
                     
                    </v-row>
                    <!-- EARN BTC Trading -->
                    <v-tab-item class="mt-6">
                        <v-card flat>
                            <template>
                                <v-card >
                                    <v-col class="px-0">
                                        <div>
                                              <!-- <div class="brexco_box " :class="service.is_active==1 ? service.service_id==servicesel? 'active_box' : 'test': 'disable_box_text'">
                                                                <div class="disable_box" v-show="service.is_active==1 ? false : true"  ></div> -->



                                            <div class="d-inline-block px-2" v-for='(index , i) in getEarnCrptoEarnJoinPackagesInfo["earnCrypto_package_list"]' :key='i' >
                                                <!-- Start Package $500 -->
                                                
                                                    <v-col  class="p-0 pt-4 pkgbox-width" :class="index.cryptoAmt >= getEarnCrptoEarnJoinPackagesInfo['walletBlance'][0].main_balance? 'disableBox_content' : 'abc'">
                                                         <div class="disable_pkg_box" v-if="index.cryptoAmt >= getEarnCrptoEarnJoinPackagesInfo['walletBlance'][0].main_balance" ></div>
                                                        <v-col class="pkg_box" v-on:click="activetab=i+1" v-bind:class="[ activetab === i+1 ? 'pkg_active' : '' ]">
                                                            <div class="d-block w-100">
                                                                <h4 class="text-center font-weight-bold mb-4">${{ addCommas(index.package_amt)}} <span class="f16">USD</span></h4>
                                                                <div class=" text-center">
                                                                    <span class="clearfix d-inline-block">
                                                                    <img  v-bind:src="`${adminUrl}coin_listing_images/${index.coin_image}`" alt="" width="25" class="mr-2 float-left">
                                                                    <p class="float-left crypto_price">{{addCommas(index.cryptoAmt , 8)}} {{index.coin_symbol}}</p>
                                                                    </span>
                                                                </div>
                                                                <v-btn small color="success" dark class="w-100 font-weight-bold">BUY</v-btn>
                                                            </div>
                                                        </v-col>
                                                    </v-col>
                                                 
                                                    <v-col v-if="activetab ===i+1" class="activeTab_wrp px-0" >
                                                        <v-col class="pt-0">
                                                            <div  class="pkgInfo_box"  :class="[`pkgInfo_box-${i+1}`]" >
                                                               <a class="close_detail"><v-icon v-on:click="closeSelectionPackage()">mdi-close</v-icon></a> 
                                                                <v-row class="row-eq-height">
                                                                    <v-col cols="12" md="6">
                                                                        <v-row>
                                                                            <v-col>
                                                                                <p>Lock-in Period</p>
                                                                                <!-- <h3 class="font-weight-bold">12 months</h3> -->
                                                                            </v-col>
                                                                            <v-col>
                                                                                <p class=" text-center">Earnings Percentage</p>
                                                                                <!-- <h3 class="font-weight-bold text-center">1.5%</h3> -->
                                                                            </v-col>
                                                                            <v-col>
                                                                                <p class=" text-center">Monthly Earnings</p>
                                                                                <!-- <h3 class="font-weight-bold text-center">$12.50</h3> -->
                                                                            </v-col>
                                                                        </v-row>
                                                                        <hr/>
                                                                        <v-row v-for='(packageList , j) in getEarnCrptoEarnJoinPackagesInfo["earncrypto_lockperiod"]' :key='j'>
                                                                            <v-col v-if="packageList.months > selectedLockPeriod.months">
                                                                                <h3 class="font-weight-bold">{{packageList.months}} months</h3>
                                                                            </v-col >
                                                                            <v-col  v-if="packageList.months > selectedLockPeriod.months">
                                                                                <h3 v-if="packageList.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="font-weight-bold text-center">5%</h3>
                                                                                <h3 v-else class="font-weight-bold text-center">{{packageList.level0_percent}}%</h3>
                                                                                
                                                                            </v-col>
                                                                            <v-col   v-if="packageList.months > selectedLockPeriod.months">
                                                                                <h3 v-if="packageList.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="font-weight-bold text-center">${{index.package_amt*5/100}}</h3>
                                                                                 <h3 v-else  class="font-weight-bold text-center">${{index.package_amt*packageList.level0_percent/100}}</h3>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-col>
                                                                    <v-col cols="12" md="6" class="box-vertical-line">
                                                                        <div class=" pl-5">
                                                                            <p class="text-center mb-3"> Selected package for <span class="green_txt font-weight-bold">${{index.package_amt}} USD</span></p>
                                                                            <p class="text-center mb-1">Lock-in Period</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">{{ selectedLockPeriod.months }} months</h3> 
                                                                            <v-row>
                                                                                <v-col>
                                                                                    <p class="text-center mb-1">Earnings Percentage</p>
                                                                                    <h3 v-if="selectedLockPeriod.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="text-center font-weight-bold green_txt">5%</h3>
                                                                                    <h3 v-else class="text-center font-weight-bold green_txt">{{ selectedLockPeriod.level0_percent}}%</h3>
                                                                                    
                                                                                </v-col>
                                                                                <v-col class="box-vertical-line">
                                                                                    <p class="text-center mb-1">Monthly Earnings</p>
                                                                                    <h3 v-if="selectedLockPeriod.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="text-center font-weight-bold green_txt">${{index.package_amt*5/100}}</h3>
                                                                                    
                                                                                    <h3 v-else class="text-center font-weight-bold green_txt">${{index.package_amt*selectedLockPeriod.level0_percent/100}}</h3>
                                                                                </v-col>
                                                                            </v-row>
                                                                            <div class="d-flex justify-center mt-4">
                                                                            <v-btn color="success" x-large class="font-weight-bold" :width="250" @click="subscribePopup(i)">SUBSCRIBE</v-btn>
                                                                            </div>
                                                                        </div>
                                                                    </v-col>
                                                                </v-row>
                                                            </div>
                                                        </v-col>
                                                    </v-col>
                                                <!-- End Package $500 -->
                                            </div>
                                     


                                            <!-- Start Package $1,000 -->
                                            <!-- <v-col cols="6" md="2" class="px-2">
                                                <v-col class="pkg_box" v-on:click="activetab='2'" v-bind:class="[ activetab === '2' ? 'pkg_active' : '' ]">
                                                    <div class="d-block w-100">
                                                        <h4 class="text-center font-weight-bold mb-4">$1,000 <span class="f16">USD</span></h4>
                                                        <div class=" text-center">
                                                            <span class="clearfix d-inline-block">
                                                            <img src="../../../assets/images/btc-card.png" alt="" width="25" class="mr-2 float-left">
                                                            <p class="float-left crypto_price">0.16234 BTC</p>
                                                            </span>
                                                        </div>
                                                        <v-btn small color="success" dark class="w-100 font-weight-bold">BUY</v-btn>
                                                    </div>
                                                </v-col>
                                            </v-col>
                                              <v-col v-if="activetab ==='2'" class="activeTab_wrp px-0">
                                                <v-col>
                                                    <div class="pkgInfo_box pkg_2Info_box">
                                                        <v-row>
                                                            <v-col cols="12" md="6">
                                                                <v-row>
                                                                    <v-col>
                                                                        <p>Lock-in Period</p>
                                                                        <h3 class="font-weight-bold">12 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Earnings Percentage</p>
                                                                        <h3 class="font-weight-bold text-center">1.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Monthly Earnings</p>
                                                                        <h3 class="font-weight-bold text-center">$12.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                                <hr/>
                                                                  <v-row>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold">18 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">2.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">$15.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col cols="12" md="6">
                                                                <div class="box-vertical-line pl-5">
                                                                    <p class="text-center mb-3"> Selected package for <span class="green_txt font-weight-bold">$1,000.00 USD</span></p>
                                                                    <p class="text-center mb-1">Lock-in Period</p>
                                                                    <h3 class="text-center font-weight-bold green_txt">6 months</h3>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <p class="text-center mb-1">Earnings Percentage</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">1%</h3>
                                                                        </v-col>
                                                                        <v-col class="box-vertical-line">
                                                                             <p class="text-center mb-1">Monthly Earnings</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">$10.50</h3>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <div class="d-flex justify-center mt-4">
                                                                    <v-btn color="success" x-large class="font-weight-bold" :width="250">SUBSCRIBE</v-btn>
                                                                    </div>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-col>
                                            </v-col> -->
                                            <!-- End Package $1,000 -->

                                            <!-- Start Package $2,000 -->
                                            <!-- <v-col cols="6" md="2" class="px-2">
                                                <v-col class="pkg_box" v-on:click="activetab='3'" v-bind:class="[ activetab === '3' ? 'pkg_active' : '' ]">
                                                    <div class="d-block w-100">
                                                        <h4 class="text-center font-weight-bold mb-4">$2,000 <span class="f16">USD</span></h4>
                                                        <div class=" text-center">
                                                            <span class="clearfix d-inline-block">
                                                            <img src="../../../assets/images/btc-card.png" alt="" width="25" class="mr-2 float-left">
                                                            <p class="float-left crypto_price">0.16234 BTC</p>
                                                            </span>
                                                        </div>
                                                        <v-btn small color="success" dark class="w-100 font-weight-bold">BUY</v-btn>
                                                    </div>
                                                </v-col>
                                            </v-col>
                                              <v-col v-if="activetab ==='3'" class="activeTab_wrp px-0">
                                                <v-col>
                                                    <div class="pkgInfo_box pkg_3Info_box">
                                                        <v-row>
                                                            <v-col cols="12" md="6">
                                                                <v-row>
                                                                    <v-col>
                                                                        <p>Lock-in Period</p>
                                                                        <h3 class="font-weight-bold">12 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Earnings Percentage</p>
                                                                        <h3 class="font-weight-bold text-center">1.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Monthly Earnings</p>
                                                                        <h3 class="font-weight-bold text-center">$12.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                                <hr/>
                                                                  <v-row>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold">18 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">2.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">$15.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col cols="12" md="6">
                                                                <div class="box-vertical-line pl-5">
                                                                    <p class="text-center mb-3"> Selected package for <span class="green_txt font-weight-bold">$1,000.00 USD</span></p>
                                                                    <p class="text-center mb-1">Lock-in Period</p>
                                                                    <h3 class="text-center font-weight-bold green_txt">6 months</h3>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <p class="text-center mb-1">Earnings Percentage</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">1%</h3>
                                                                        </v-col>
                                                                        <v-col class="box-vertical-line">
                                                                             <p class="text-center mb-1">Monthly Earnings</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">$10.50</h3>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <div class="d-flex justify-center mt-4">
                                                                    <v-btn color="success" x-large class="font-weight-bold" :width="250">SUBSCRIBE</v-btn>
                                                                    </div>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-col>
                                            </v-col> -->
                                            <!-- End Package $2,000 -->
                                            
                                            <!-- Start Package $3,000 -->
                                            <!-- <v-col cols="6" md="2" class="px-2">
                                                <div class="disable_pkg_box"></div>
                                                <v-col class="pkg_box" v-on:click="activetab='4'" v-bind:class="[ activetab === '4' ? 'pkg_active' : '' ]">
                                                    
                                                    <div class="d-block w-100">
                                                        <h4 class="text-center font-weight-bold mb-4">$3,000 <span class="f16">USD</span></h4>
                                                        <div class=" text-center">
                                                            <span class="clearfix d-inline-block">
                                                            <img src="../../../assets/images/btc-card.png" alt="" width="25" class="mr-2 float-left">
                                                            <p class="float-left crypto_price">0.16234 BTC</p>
                                                            </span>
                                                        </div>
                                                        <v-btn small color="success" dark class="w-100 font-weight-bold">BUY</v-btn>
                                                    </div>
                                                </v-col>
                                            </v-col>
                                              <v-col v-if="activetab ==='4'" class="activeTab_wrp px-0">
                                                <v-col>
                                                    <div class="pkgInfo_box pkg_4Info_box">
                                                        <v-row>
                                                            <v-col cols="12" md="6">
                                                                <v-row>
                                                                    <v-col>
                                                                        <p>Lock-in Period</p>
                                                                        <h3 class="font-weight-bold">12 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Earnings Percentage</p>
                                                                        <h3 class="font-weight-bold text-center">1.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Monthly Earnings</p>
                                                                        <h3 class="font-weight-bold text-center">$12.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                                <hr/>
                                                                  <v-row>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold">18 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">2.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">$15.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col cols="12" md="6">
                                                                <div class="box-vertical-line pl-5">
                                                                    <p class="text-center mb-3"> Selected package for <span class="green_txt font-weight-bold">$1,000.00 USD</span></p>
                                                                    <p class="text-center mb-1">Lock-in Period</p>
                                                                    <h3 class="text-center font-weight-bold green_txt">6 months</h3>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <p class="text-center mb-1">Earnings Percentage</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">1%</h3>
                                                                        </v-col>
                                                                        <v-col class="box-vertical-line">
                                                                             <p class="text-center mb-1">Monthly Earnings</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">$10.50</h3>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <div class="d-flex justify-center mt-4">
                                                                    <v-btn color="success" x-large class="font-weight-bold" :width="250">SUBSCRIBE</v-btn>
                                                                    </div>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-col>
                                            </v-col> -->
                                            <!-- End Package $3,000 -->


                                            <!-- Start Package $5,000 -->
                                            <!-- <v-col cols="6" md="2" class="px-2">
                                                <div class="disable_pkg_box"></div>
                                                <v-col class="pkg_box" v-on:click="activetab='5'" v-bind:class="[ activetab === '5' ? 'pkg_active' : '' ]">
                                                    <div class="d-block w-100">
                                                        <h4 class="text-center font-weight-bold mb-4">$5,000 <span class="f16">USD</span></h4>
                                                        <div class=" text-center">
                                                            <span class="clearfix d-inline-block">
                                                            <img src="../../../assets/images/btc-card.png" alt="" width="25" class="mr-2 float-left">
                                                            <p class="float-left crypto_price">0.16234 BTC</p>
                                                            </span>
                                                        </div>
                                                        <v-btn small color="success" dark class="w-100 font-weight-bold">BUY</v-btn>
                                                    </div>
                                                </v-col>
                                            </v-col> 
                                             <v-col v-if="activetab ==='5'" class="activeTab_wrp px-0">
                                                <v-col>
                                                    <div class="pkgInfo_box pkg_5Info_box">
                                                        <v-row>
                                                            <v-col cols="12" md="6">
                                                                <v-row>
                                                                    <v-col>
                                                                        <p>Lock-in Period</p>
                                                                        <h3 class="font-weight-bold">12 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Earnings Percentage</p>
                                                                        <h3 class="font-weight-bold text-center">1.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Monthly Earnings</p>
                                                                        <h3 class="font-weight-bold text-center">$12.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                                <hr/>
                                                                  <v-row>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold">18 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">2.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">$15.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col cols="12" md="6">
                                                                <div class="box-vertical-line pl-5">
                                                                    <p class="text-center mb-3"> Selected package for <span class="green_txt font-weight-bold">$1,000.00 USD</span></p>
                                                                    <p class="text-center mb-1">Lock-in Period</p>
                                                                    <h3 class="text-center font-weight-bold green_txt">6 months</h3>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <p class="text-center mb-1">Earnings Percentage</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">1%</h3>
                                                                        </v-col>
                                                                        <v-col class="box-vertical-line">
                                                                             <p class="text-center mb-1">Monthly Earnings</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">$10.50</h3>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <div class="d-flex justify-center mt-4">
                                                                    <v-btn color="success" x-large class="font-weight-bold" :width="250">SUBSCRIBE</v-btn>
                                                                    </div>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-col>
                                            </v-col> -->
                                            <!-- End Package $5,000 -->

                                            <!-- Start Package $10,000 -->
                                            <!-- <v-col cols="6" md="2" class="pl-2">
                                                <div class="disable_pkg_box"></div>
                                                <v-col class="pkg_box" v-on:click="activetab='6'" v-bind:class="[ activetab === '6' ? 'pkg_active' : '' ]">
                                                    <div class="d-block w-100">
                                                        <h4 class="text-center font-weight-bold mb-4">$10,000 <span class="f16">USD</span></h4>
                                                        <div class=" text-center">
                                                            <span class="clearfix d-inline-block">
                                                            <img src="../../../assets/images/btc-card.png" alt="" width="25" class="mr-2 float-left">
                                                            <p class="float-left crypto_price">0.16234 BTC</p>
                                                            </span>
                                                        </div>
                                                        <v-btn small color="success" dark class="w-100 font-weight-bold">BUY</v-btn>
                                                    </div>
                                                </v-col>
                                            </v-col>
                                              <v-col v-if="activetab ==='6'" class="activeTab_wrp px-0">
                                                <v-col>
                                                    <div class="pkgInfo_box pkg_6Info_box">
                                                        <v-row>
                                                            <v-col cols="12" md="6">
                                                                <v-row>
                                                                    <v-col>
                                                                        <p>Lock-in Period</p>
                                                                        <h3 class="font-weight-bold">12 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Earnings Percentage</p>
                                                                        <h3 class="font-weight-bold text-center">1.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                          <p class=" text-center">Monthly Earnings</p>
                                                                        <h3 class="font-weight-bold text-center">$12.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                                <hr/>
                                                                  <v-row>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold">18 months</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">2.5%</h3>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <h3 class="font-weight-bold text-center">$15.50</h3>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col cols="12" md="6">
                                                                <div class="box-vertical-line pl-5">
                                                                    <p class="text-center mb-3"> Selected package for <span class="green_txt font-weight-bold">$1,000.00 USD</span></p>
                                                                    <p class="text-center mb-1">Lock-in Period</p>
                                                                    <h3 class="text-center font-weight-bold green_txt">6 months</h3>
                                                                    <v-row>
                                                                        <v-col>
                                                                            <p class="text-center mb-1">Earnings Percentage</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">1%</h3>
                                                                        </v-col>
                                                                        <v-col class="box-vertical-line">
                                                                             <p class="text-center mb-1">Monthly Earnings</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">$10.50</h3>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <div class="d-flex justify-center mt-4">
                                                                    <v-btn color="success" x-large class="font-weight-bold" :width="250">SUBSCRIBE</v-btn>
                                                                    </div>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-col>
                                            </v-col> -->
                                            <!-- End Package $10,000 -->
                                        </div>
                                    </v-col>
                                </v-card>
                            </template>
                        </v-card>
                    </v-tab-item>
                    <!-- Join New Package-->
                    <v-tab-item class="mt-6">
                        <v-card flat>
                            <template>
                                <h6 class="text-center font-weight-bold mt-10">Verify user receiving this subscription </h6>
                               
                                    <v-col cols="12" md="6" offset-md="3" class="mt-5 text-center">
                                            <form class="email_verify_form">
                                                <v-text-field
                                                    label="Enter user's email ID"
                                                    single-line
                                                    outlined
                                                    class="verify_input"
                                                    v-model="email"
                                                    v-on:change="signalChange"
                                                    :error-messages="emailErrors12"
                                                    required
                                                    @input="$v.email.$touch()"
                                                    @blur="$v.email.$touch()"
                                                ></v-text-field>
                                                <i aria-hidden="true" v-if="showEmailValid && !isEamilVerified" class="tickMark v-icon notranslate  red_txt mdi mdi-close-circle theme--dark"></i>
                                                <i aria-hidden="true" v-if="showEmailValid && isEamilVerified" class="tickMark v-icon notranslate  green_txt mdi mdi-check-circle theme--dark"></i>
                                                
                                                <v-btn class="verifyButton" @click="eamilVerify">Verify</v-btn>
                                            </form>
                                            <div class="email_error_msg d-none">{{emailvalied}}</div>
                                    </v-col>

                                 
                                <v-card v-if="isEamilVerified" >
                                    <v-col>
                                        <v-row>
                                            <!-- Start Package $500 -->

                                             <div class="d-inline-block px-2" v-for='(index , i) in getEarnCrptoEarnJoinPackagesInfo["earnCrypto_package_list"]' :key='i' >
                                                <!-- Start Package $500 -->
                                                    <v-col  class="p-0 pt-4 pkgbox-width" :class="index.cryptoAmt >= getEarnCrptoEarnJoinPackagesInfo['walletBlance'][0].main_balance? 'disableBox_content' : 'abc'">
                                                         <div class="disable_pkg_box" v-if="index.cryptoAmt >= getEarnCrptoEarnJoinPackagesInfo['walletBlance'][0].main_balance" ></div>
                                                        <v-col class="pkg_box" v-on:click="activetab=i+1" v-bind:class="[ activetab === i+1 ? 'pkg_active' : '' ]">
                                                            <div class="d-block w-100">
                                                                <h4 class="text-center font-weight-bold mb-4">${{addCommas( index.package_amt , 2)}} <span class="f16">USD</span></h4>
                                                                <div class=" text-center">
                                                                    <span class="clearfix d-inline-block">
                                                                    <img  v-bind:src="`${adminUrl}coin_listing_images/${index.coin_image}`" alt="" width="25" class="mr-2 float-left">
                                                                    <p class="float-left crypto_price">{{addCommas(index.cryptoAmt , 8)}} {{index.coin_symbol}}</p>
                                                                    </span>
                                                                </div>
                                                                <v-btn small color="success" dark class="w-100 font-weight-bold">BUY</v-btn>
                                                            </div>
                                                        </v-col>
                                                    </v-col>
                                                 
                                                       <v-col v-if="activetab ===i+1" class="activeTab_wrp px-0" >
                                                        <v-col class="pt-0">
                                                            <div  class="pkgInfo_box"  :class="[`pkgInfo_box-${i+1}`]" >
                                                               <a class="close_detail"><v-icon v-on:click="closeSelectionPackage()">mdi-close</v-icon></a> 
                                                                <v-row class="row-eq-height">
                                                                    <v-col cols="12" md="6">
                                                                        <v-row>
                                                                            <v-col>
                                                                                <p>Lock-in Period</p>
                                                                                <!-- <h3 class="font-weight-bold">12 months</h3> -->
                                                                            </v-col>
                                                                            <v-col>
                                                                                <p class=" text-center">Earnings Percentage</p>
                                                                                <!-- <h3 class="font-weight-bold text-center">1.5%</h3> -->
                                                                            </v-col>
                                                                            <v-col>
                                                                                <p class=" text-center">Monthly Earnings</p>
                                                                                <!-- <h3 class="font-weight-bold text-center">$12.50</h3> -->
                                                                            </v-col>
                                                                        </v-row>
                                                                        <hr/>
                                                                        <v-row v-for='(packageList , j) in getEarnCrptoEarnJoinPackagesInfo["earncrypto_lockperiod"]' :key='j'>
                                                                            <v-col v-if="packageList.months > selectedLockPeriod.months">
                                                                                <h3 class="font-weight-bold">{{packageList.months}} months</h3>
                                                                            </v-col >
                                                                            <v-col  v-if="packageList.months > selectedLockPeriod.months">
                                                                                <h3 v-if="packageList.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="font-weight-bold text-center">5%</h3>
                                                                                <h3 v-else class="font-weight-bold text-center">{{packageList.level0_percent}}%</h3>
                                                                                
                                                                            </v-col>
                                                                            <v-col   v-if="packageList.months > selectedLockPeriod.months">
                                                                                <h3 v-if="packageList.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="font-weight-bold text-center">${{index.package_amt*5/100}}</h3>
                                                                                 <h3 v-else  class="font-weight-bold text-center">${{index.package_amt*packageList.level0_percent/100}}</h3>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-col>
                                                                    <v-col cols="12" md="6" class="box-vertical-line">
                                                                        <div class=" pl-5">
                                                                            <p class="text-center mb-3"> Selected package for <span class="green_txt font-weight-bold">${{index.package_amt}} USD</span></p>
                                                                            <p class="text-center mb-1">Lock-in Period</p>
                                                                            <h3 class="text-center font-weight-bold green_txt">{{ selectedLockPeriod.months }} months</h3> 
                                                                            <v-row>
                                                                                <v-col>
                                                                                    <p class="text-center mb-1">Earnings Percentage</p>
                                                                                    <h3 v-if="selectedLockPeriod.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="text-center font-weight-bold green_txt">5%</h3>
                                                                                    <h3 v-else class="text-center font-weight-bold green_txt">{{ selectedLockPeriod.level0_percent}}%</h3>
                                                                                    
                                                                                </v-col>
                                                                                <v-col class="box-vertical-line">
                                                                                    <p class="text-center mb-1">Monthly Earnings</p>
                                                                                    <h3 v-if="selectedLockPeriod.months >= getEarnCrptoEarnJoinPackagesInfo['earnMonthCheck']" class="text-center font-weight-bold green_txt">${{index.package_amt*5/100}}</h3>
                                                                                    
                                                                                    <h3 v-else class="text-center font-weight-bold green_txt">${{index.package_amt*selectedLockPeriod.level0_percent/100}}</h3>
                                                                                </v-col>
                                                                            </v-row>
                                                                            <div class="d-flex justify-center mt-4">
                                                                            <v-btn color="success" x-large class="font-weight-bold" :width="250" @click="subscribePopup(i)">SUBSCRIBE</v-btn>
                                                                            </div>
                                                                        </div>
                                                                    </v-col>
                                                                </v-row>
                                                            </div>
                                                        </v-col>
                                                    </v-col>
                                                <!-- End Package $500 -->
                                            </div>
                                           
                                        </v-row>
                                    </v-col>
                                </v-card>
                            </template>
                        </v-card>
                    </v-tab-item>
                </v-tabs>

                <v-col class="select_crypto pr-0">
                       <div style="position:relative;">
                           <div class="posirion-relative">
                            <v-col class="position-relative earnCrypto_selecwrp px-0 pt-1 pb-2">
                                <v-select 
                                v-model="selectedCryptoCoin"
                                :items="getEarnCrptoEarnJoinPackagesInfo['cryptoList']"
                                item-value='coin_symbol'
                                item-text='coin_name'
                                return-object
                                @change="getEarnCrptoEarnJoinPackages('crypto')"
                                label="All Crypto"
                                outlined
                                hide-details="auto"
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
                    </div>
                        <v-select
                        v-model="selectedLockPeriod"
                        :items="lockPeriods"
                        item-value='id'
                        item-text='text'
                        return-object 
                        outlined
                        class="remove_legend"
                        :menu-props="{ bottom: true, offsetY: true }"
                         ></v-select>
                     </div>
                </v-col>
            </v-card>
        </template>


          <!--Selected package - Confirm Purchase -->
    <template>
       <v-dialog
          v-model="confirmPurchase" persistent
          max-width="500"
        >
          <v-card class="white-bg black_txt" style="border:solid 1px #22E627">
            <h3 class="font-weight-bold text-center pb-3 pt-8 mb-5">Confirm Purchase</h3>

            <p v-if='isSebScribeMyfriend' class="text-center mb-6">Please verify your purchase for</p>
            
            <p v-else class="text-center mb-6">Please verify your purchase </p>
            
             <h5 v-if='isSebScribeMyfriend' class="font-weight-bold text-center pb-3 pt-8 mb-5">{{this.email}}</h5>
            <h2 class="green_txt font-weight-bold text-center">${{addCommas(this.selectSubscribePackageInfo.package_amt,2)}} USD</h2>
            <div class="text-center">
                <span class="d-inline-block clearfix">
                    <img v-bind:src="`${adminUrl}coin_listing_images/${this.selectSubscribePackageInfo.coin_image}`"  alt="" width="25" class="float-left mr-2">
                    <h5 class="font-weight-bold float-left">{{addCommas(this.selectSubscribePackageInfo.cryptoAmt,8)}} {{this.selectSubscribePackageInfo.coin_symbol}}</h5>
                </span>
            </div>


              <v-card-actions class="close_btn_wrp">
                  <v-icon class="black-txt" @click="confirmPurchase = false">mdi-close</v-icon>
              </v-card-actions>

            <v-card-actions class="justify-center px-10 mb-5 mt-6">
              <v-btn-toggle class="mt-4 w-100" borderless>
                  <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="confirmPurchase = false">
                      <span class="hidden-sm-and-down">Cancel</span>
                  </v-btn>

                  <v-btn value="right" class="green darken-1 w-50 px-7 py-2" @click="termsOFuse = !termsOFuse; confirmPurchase = false;">
                      <span class="hidden-sm-and-down">Yes, proceed</span>
                  </v-btn>
              </v-btn-toggle>
              </v-card-actions>
          </v-card>
        </v-dialog>
    </template> 
  <!-- End Selected package - Confirm Purchase -->

     <!--selected package - Confirm Purchase - Term Of Use-->
    <template>
       <v-dialog
          v-model="termsOFuse" persistent
          max-width="500"
        >
          <v-card class="white-bg black_txt ec_terms_use_wrp" style="border:solid 1px #22E627">
            <h3 class="font-weight-bold text-center pb-3 pt-8 mb-5">Terms Of Use</h3>

                <div class="border p-3 m-4 f13 modal_terms_wrp">
                     <p class="font-weight-bold">Terms of use</p>
                      <p class="mb-3">
                    This Terms of Use acts as a Supplemental Agreement to the <a href="https://brexily.com/termsofuse/" target="_blank">General Terms of Use</a> of the Brexily. 
                    Therefore, both the General Term of Use and this Agreement shall be read together in a harmonious manner. 
                    Should there be any discrepancy between the General Term of Use with the provisions herein, the term 
                    contained herein shall prevail. Brexily is an automated trading service provided and powered by Everus Technologies
                  </p>
                  <p>By "<strong>Agreeing</strong>" to the terms herein, you <strong>AGREE AND CONFIRM</strong> that: -</p>
                  <ul class="square">
                    <li>You have read, understood, and agreed to be bound by the General Terms of Use and the terms herein;
</li>
<li>You assume all the obligations set forth herein;
</li>
<li>You are of sufficient legal age and capacity to use our services;</li>
<li>You are not under the control of jurisdiction that explicitly prohibits the use of similar services;</li>
<li>You use the Services at your own discretion and under your own responsibility and/or risks.</li>
<li>Standard blockchain transaction cost shall be applicable for all the transactions.</li>
<li>You acknowledge and agree that we may stop providing (permanently or temporarily) / terminate this Services (or any features within EarnCrypto) to you or to users generally, at our sole discretion, with reasonable prior notice to you; and the capital shall be returned to you within forty-eight (48) hours of such termination of service.</li>
<li>You may stop using / terminate / determine the Service after thirty (30) days (maturity period) from the date of joining Brexily trading package in accordance with the provisions contained herein. Should you withdraw the capital prior to the maturity period, thirty percentile (30%) of your capital calculated in the form of coin/tokens shall be retained as service charges for early determination.</li>
<li>Such determination by your voluntary withdrawal shall be transferred into your Brexily Wallet in one (1) working day from the time of your withdrawal request.</li>
                  </ul>

                  <p class="font-weight-bold">We DO NOT:-</p>
                  <ul class="square">
                    <li>Solicit any party to purchase any regulated financial instrument via our services;</li>
                    <li>Offer any investment, financial, legal, tax, or any other type of advice or schemes to you, and we do not owe you any fiduciary duty on any guarantee earning nor make any investment decision for you;</li>
                    <li>Accept any responsibility or liability whatsoever or makes any representation or warranty express or implied. Therefore, any scenarios, assumptions, historical or simulated performances, indicative prices or examples of potential transactions or returns are included for illustrative purposes only. Past performance is not indicative of future results. </li>
                    <li>Grant you any license and/or sublicense and/or rights to utilize any of our Intellectual Property or grant you access / control over the Earn Crypto</li>
                    <li>Tolerate with insider trading. Therefore, should you receive any personal/specific tips from any of our employee / agent, other than the information provided for the public in our website / Terms of Use / Whitepaper, marketing materials directed at public, you are advised to directly contact our Live Chat.</li>
                    
                  </ul>

                  <p class="font-weight-bold">We DO:-</p>
                  <ul class="square">
                    <li>Provide an alternate channel and fully automated trading services as a gesture of supporting the blockchain technology and cryptocurrency market.</li>
                    <li>Uphold the highest standard of integrity when dealing with your cryptocurrencies and capital.</li>
                    <li>Earmarked the amount of cryptocurrency used as capital, to its equivalent value in USD$ at the time of your joining.</li>
                    <li>Impose a maturity period / lock-in period of thirty (30) days from your Brexily Trading Package joining date. </li>
                    <li>Your Trading Capital withdrawal will be deposited into your Brexily wallet following the same value in Coin/token  as when you joined. </li>
                    <li>Allocate your earnings from Earn Crypto back to you in the form of Tether (USDT). Warranty that users have full control over their Earn Crtypto  Earnings in their Brexily Wallet.</li>
                    <li>Earn 1.5 to 6 % out of the total earnings from all your successfully referred friends’ who are trading with Earn Crypto..</li>
                    <li>Reserve our rights to have full control on when to determine and / or change the terms of Service with reasonable notice given to users. </li>
                  </ul>
                  <p class="f13">If you have any questions or concerns regarding to Earn Crypto and/or this Agreement, you may Live Chat with us.</p>
                  <p class="f13">Last Updated: 28/10/2020</p>
                </div>
                <div class="pl-5">
                    <v-checkbox
                    v-model="termsnconditions"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="I have read and accept the terms and condition"
                    value="1"
                    v-on:change="onChangeTerms(this)"
                    ></v-checkbox>
                     
                        <!-- <v-radio-group v-model="radio" :mandatory="true" name="radio" class="modal_terms_wrp2">
                            <v-radio selected=false v-on:change="onChangeTerms(this)" label="I have read and accept the terms and conditions" value="radio"></v-radio>
                        </v-radio-group> -->
                </div>
               <!-- <v-radio label="" value="radio-1">sdfasdf</v-radio> -->
            
             
              <v-card-actions class="close_btn_wrp">
                  <v-icon class="black-txt" @click="termsOFuse = false">mdi-close</v-icon>
              </v-card-actions>

            <v-card-actions class="justify-center px-6 mb-5">
              <v-btn-toggle class="mt-1 w-100" borderless>
                  <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="termsOFuse = false">
                      <span class="hidden-sm-and-down">Cancel</span>
                  </v-btn>

                  <!-- <v-btn value="right" class="green darken-1 w-50 px-7 py-2" @click="purchaseSuccessful = !purchaseSuccessful"> -->
                  <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :disabled="termsDisabled" @click="continueJoinPackage">
                     
                      <span class="hidden-sm-and-down">Continue</span>
                  </v-btn>
              </v-btn-toggle>
              </v-card-actions>
             
          </v-card>
        </v-dialog>
    </template> 
  <!-- End selected package - Confirm Purchase - Term Of Use -->

<!--selected package - Confirm Purchase -Successful-->
    <template>
       <v-dialog
          v-model="purchaseSuccessful" persistent
          max-width="500"
        >
          <v-card class="white-bg black_txt  text-center" style="border:solid 1px #22E627">
            <h3 class="font-weight-bold text-center pb-3 pt-8 mb-5">Confirm Purchase</h3>

                <v-icon class="green_tick_mark mb-4">mdi-checkbox-marked-circle</v-icon>

              
                <h5 class="px-8">You have purchased <strong>${{addCommas(selectSubscribePackageInfo.package_amt,2)}} /{{addCommas(this.selectSubscribePackageInfo.cryptoAmt,8)}} {{this.selectSubscribePackageInfo.coin_symbol}}</strong> package <span class="font-weight-bold" v-if="isSebScribeMyfriend">for {{this.email}}</span></h5>
           
               <!-- <v-radio label="" value="radio-1">sdfasdf</v-radio> -->
            

              <v-card-actions class="close_btn_wrp">
                  <v-icon class="black-txt" @click="purchaseSuccessful = false">mdi-close</v-icon>
              </v-card-actions>

            <v-card-actions class="justify-center px-7 mb-5">
              <v-btn-toggle class="mt-4 w-100" borderless>

                  <v-btn value="right" class="green darken-1 w-100 px-7 py-2" @click="purchaseSuccessful = false">
                      <span class="hidden-sm-and-down">Done</span>
                  </v-btn>
              </v-btn-toggle>
              </v-card-actions>
          </v-card>
        </v-dialog>
    </template> 
  <!-- End selected package - Confirm Purchase - Successful -->

  <!--selected package - Confirm Purchase -Unsuccssful-->
    <template>
       <v-dialog
          v-model="purchaseUnsccessful" persistent
          max-width="500"
        >
          <v-card class="white-bg black_txt  text-center" style="border:solid 1px #22E627">
            <h3 class="font-weight-bold text-center pb-3 pt-8 mb-5">Confirm Purchase</h3>

                <v-icon class="red_tick_mark mb-4">mdi-close-circle</v-icon>

                <p class="mb-6">Your subscription is unsuccssful</p>

               
           
               <!-- <v-radio label="" value="radio-1">sdfasdf</v-radio> -->
            

              <v-card-actions class="close_btn_wrp">
                  <v-icon class="black-txt" @click="purchaseUnsccessful = false">mdi-close</v-icon>
              </v-card-actions>

            <v-card-actions class="justify-center px-7 mb-5">
              <v-btn-toggle class="mt-4 w-100" borderless>

                  <v-btn value="right" class="green darken-1 w-100 px-7 py-2" @click="purchaseUnsccessful = false">
                      <span class="hidden-sm-and-down">Done</span>
                  </v-btn>
              </v-btn-toggle>
              </v-card-actions>
          </v-card>
        </v-dialog>
    </template> 
  <!-- End selected package - Confirm Purchase - Successful -->
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
    </v-container>

</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
// import {CoolSelect} from "vue-cool-select";
import $ from 'jquery';
import NProgress from 'nprogress';
import axios from 'axios'
import qs from 'qs'

export default {
    el: '#tabs',
    name: 'Join New Package',
     mixins: [validationMixin],
    components: {
        // CoolSelect,
    },
    data: () => ({
        emailvalied:'',
        overlay: false,
        absolute: true,
        termsnconditions:0,
        activetab: '0',
         radio: '',
        confirmPurchase: false,
        termsOFuse: false,
        purchaseSuccessful: false,
        purchaseUnsccessful: false,
        selectedCryptoCoin:{coin_symbol:"BTC"} ,
        selectedPackage:{id:1},
        selectedLockPeriod: {},
        selectSubscribePackageInfo:[],
        lockPeriods: [],
        pkg500Showing:false,
        pkg1000Showing:false,
        pkg2000Showing:false,
        pkg3000Showing:false,
        pkg5000Showing:false,
        pkg10000Showing:false,
        isSebScribeMyfriend:false,
        isEamilVerified:false,
        showEmailValid: false,
        email: '',
        adminUrl: '',
        getEarnCrptoEarnJoinPackagesInfo:[],
        joinPackagesByMonth: {},
        termsDisabled: '',
        items: [{
                name: 'All Crypto ',
                cryptoCode: '',
            },
            {
                name: 'Bitcoin',
                cryptoCode: 'BTC',
            },
            {
                name: 'Ethereum',
                cryptoCode: 'ETH',
            }
        ],
            period: [
            '6 Months', 
            '12 Months', 
            '18 Months',  
            ],
    }),

        validations: {
      email: { required, email },
    },
created() {

this.getEarnCrptoEarnJoinPackages('all');

},
 methods: {
        signalChange: function(){

            console.log("sdfs");
        $('.email_error_msg').addClass('d-none');  
        this.isEamilVerified = false;
        this.showEmailValid = false;
        }
        ,

 onChangeTerms: function() {
     if(this.termsnconditions == 1){
         this.termsDisabled = false;
     }else{
         this.termsDisabled = true;
     }
    
 },

 purchaseSuccessfulNav: function()
 {
     this.purchaseSuccessful = false
     self.$router.push("/earncrypto");
 }  
 ,  
    addCommas: function(x, num) {
            x = x || 0;
            x = Number(x);
            var n = x.toFixed(num);
            var parts = n.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },   
getTab: function(e)
{
if(e == 'subScribeMyFriend')
{
  this.isSebScribeMyfriend = true

}else{
 this.isSebScribeMyfriend = false
}

},

validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    ,
eamilVerify()
{
    $('.email_error_msg').addClass('d-none');
    if (!this.validEmail(this.email)) {
         $('.email_error_msg').removeClass('d-none');
         this.emailvalied = 'Please enter valid email';
       
    return
    }

   this.$v.$touch()
  // alert(this.email)

 var self = this;
        let auth_token = this.$store.getters.authToken;
        NProgress.start()
        let bodyFormData = {
                
                "subscribe_friend_email":this.email
                }
                if(auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "validateEmail";
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
                              self.showEmailValid = true;
                               $('.verify_input').addClass('email_n_verify');
                           if(response.data && response.data.Success && response.data.status == 200)
                           {
                             //  !this.$v.email.email && Success.push('email verifyed');
                            
                                if(response.data.Result == 'Email is valid')
                                {
                                    self.isEamilVerified = true;
                                    $('.email_error_msg').show();
                                    $('.email_error_msg').removeClass('d-none');
                                    self.emailvalied = 'Email is valid';
                                    $('.verify_input').removeClass('email_n_verify');
                                    setTimeout(function(){  
                                            $(".email_error_msg").fadeOut(3000); 
                                            $('.email_error_msg').addClass('d-none');
                                     }, 3000);
                                     
                                }
                                else if(response.data.Result == 'Cannot purchase to yourself')
                                {
                                     self.isEamilVerified = false;
                                      $('.email_error_msg').show();
                                    $('.email_error_msg').removeClass('d-none');

                                    console.log('email verified');
                                     self.emailvalied = 'Cannot purchase to yourself';
                                   
                                }
                                else{
                                    //  !this.$v.email.email && errors.push('Must be valid e-mail');
                                    self.isEamilVerified = false;
                                    console.log('email verified not');
                                     self.emailvalied = 'email not valid';
                                       $('.email_error_msg').show();
                                       $('.email_error_msg').removeClass('d-none');
                                }
                           } else {
                               
                               
                                self.emailvalied = 'Email not verified';
                                $('.email_error_msg').show();
                                $('.email_error_msg').removeClass('d-none');
                                self.isEamilVerified = false;
                           }
                           
                           })
                        .catch(function (err) {
                            self.isEamilVerified = false;
                            if(err.response && err.response.data && err.response.data.Result && err.response.data.Result == 'User is blocked'){
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
                } 
}  ,


closeSelectionPackage: function()
{
// this.hidden()
//$('.pkgInfo_box').hide();
$('.pkgInfo_box').addClass('d-none');
$('.pkg_box').addClass("removeArrow");
$('.pkg_box').removeClass("pkg_active")

}
,
subscribePopup: function(e)
{
 console.log(e)   
this.confirmPurchase = true
this.termsDisabled = true
this.termsnconditions = false
this.selectSubscribePackageInfo = this.getEarnCrptoEarnJoinPackagesInfo['earnCrypto_package_list'][e]
this.selectedPackage.id =  this.selectSubscribePackageInfo.id

 $('.pkg_box').addClass("removeArrow");
        $('.pkg_box').removeClass("pkg_active");
        //$('.pkgInfo_box').hide();
        $('.pkgInfo_box').addClass('d-none');
        //this.subscribePack = false
}
,
continueJoinPackage: function()
 {
        this.termsDisabled = true;
        this.overlay = true
        var self = this;
        let auth_token = this.$store.getters.authToken;
        NProgress.start()
        var eamilVal = ""
        if (this.isSebScribeMyfriend)
        {
            if(this.email)
            {
                eamilVal = this.email;
            }
           else
           {
               return
           }
        }     

        let bodyFormData = {
                "package_id":this.selectedPackage.id,
                "lockingPerod_id":this.selectedLockPeriod.id,
                "cryptoType":this.selectedCryptoCoin.coin_symbol,
                "subscribe_friend_email":eamilVal
                }
                if(auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "earnjoinPackage";
                    
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
                            self.getEarnCrptoEarnJoinPackages('crypto');
                            self.overlay = false
                            if( response.data.Success){
                                 self.purchaseSuccessful = true;
                            }
                            
                            //self.getEarnCrptoEarnJoinPackagesInfo = response.data.Result;
                            self.termsOFuse = false;
                            //self.termsDisabled = false;
                            self.$emit('joinNewPackToEarnCrypto', "Success")   
                        })
                        .catch(function (err) {
                            self.overlay = false
                            self.termsOFuse = false;
                            self.termsDisabled = false;
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



      getEarnCrptoEarnJoinPackages: function (e) {
     
        $('.pkg_box').addClass("removeArrow");
        $('.pkg_box').removeClass("pkg_active");
        //$('.pkgInfo_box').hide();
        $('.pkgInfo_box').addClass('d-none');

        var crypto = 'btc'

        if(e == 'all')
        {
          crypto = 'btc'
        }
        else{
          crypto = this.selectedCryptoCoin.coin_symbol;
          
        }

        var self = this;
        let auth_token = this.$store.getters.authToken;
        NProgress.start()
          let bodyFormData = {
                              "crypto":crypto
                             }
                if(auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "earnGetJoinPackagesList";
                    
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
                            self.joinPackagesByMonth = {};
                            self.getEarnCrptoEarnJoinPackagesInfo = response.data.Result;
                            self.lockPeriods = [];
                            self.packageDropdown = [];
                            for(let pack of self.getEarnCrptoEarnJoinPackagesInfo['earncrypto_lockperiod']) {
                                self.joinPackagesByMonth[pack.months] = pack;
                                if(pack.months == 1) {
                                    pack.text = 'Lock-in Period ('+pack.months+' Month)';
                                } else {
                                    pack.text = 'Lock-in Period ('+pack.months+' Months)';
                                }
                                self.lockPeriods.push(pack);
                                
                            }
                            
                            console.log(response);

                            //  self.$router.push("/earncrypto");
                            // if(e == 'all')
                            // {
                                self.selectedLockPeriod = self.joinPackagesByMonth[1];
                            //} 

                        })
                        .catch(function (err) {
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

                console.log(`${this.adminUrl}/coin_listing_images/${cryptocurrency}`);
                //return require(`../../../assets/images/crypto/${cryptocurrency.toLowerCase()}.png`);
                
                return (`${this.adminUrl}/coin_listing_images/${cryptocurrency}`);
            } catch (e) {
                return require("../../../assets/images/crypto/undefined.svg");
            }
        },
      

    },
    computed: {
           emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors

        !this.$v.email.email && errors.push('Must be valid e-mail')
        // !this.$v.email.required && errors.push('There is no user registered with that email address')
         !this.$v.email.required && errors.push('Please enter email address')
              $('.email_error_msg').addClass('d-none');
     
        return errors
      },
      
      
    }
    ,
    
	mounted() {
        this.adminUrl = process.env.VUE_APP_ADMIN_URL    
        // $('.email_error_msg').hide();  

         

/*
 $(document).on('click','.modal_terms_wrp2 ',function() {
        $('.darken-1').
        });*/


        $(function(){


        $(document).on('click','.pkg_box',function() {
         $(this).removeClass("removeArrow");
         $(this).addClass("pkg_active");
         $('.pkgInfo_box').removeClass('d-none');
       
          });
      
   
        });
  }
};
</script>
<style lang="css" scoped>
@import "../../../../node_modules/vue-cool-select/dist/themes/material-design.css";
</style>
