<template>
  <v-app>
     <TopBar :userInfo="loggedUserInfo"/>
    <v-content>
      <v-container fluid>
      <v-layout>
        <v-container>
    <h2 class="font-weight-bold mb-6">EARN CRYPTO</h2>
        <!-- <v-row>
          <v-col cols="12" md="6">
            <div class="purple-bg ttal_earn_div">
              <img src="../../../assets/images/ttl-active-trading.png" >
              <div class="ml-9">
                <h5 class="text-uppercase font-weight-bold">total active trading</h5>
                <h1>${{addCommas(this.totalActiveTrading, 2)}} <span class="f20">USD</span></h1>
              </div>
            </div>
          </v-col>
           <v-col cols="12" md="6">
             <div class="purple-bg ttal_earn_div">
              <img src="../../../assets/images/ttl-earned-profit.png" >
              <div class="ml-9">
                <h5 class="text-uppercase font-weight-bold">total earned profit</h5>
                <h1>${{addCommas(this.totalEarnProfit, 8)}} <span class="f20">USD</span></h1>
              </div>
            </div>
          </v-col>
        </v-row> -->


            <template>
              <v-card class="earnbtc_tabs">

                <v-tabs background-color="transparent" grow v-model="tabs">
                  <v-tab :href="`#tab-0`">
                    EARN CRYPTO Trading
                  </v-tab>
                  <v-tab :href="`#tab-1`">
                    Join New Package
                  </v-tab>
                  <v-tab :href="`#tab-2`">
                    My Earnings
                  </v-tab>
                  </v-tabs>
            <v-tabs-items v-model="tabs">
            <!-- EARN Crypto Trading -->
                  <v-tab-item class="mt-6" :id="`tab-0`">
                    <v-card flat>
                      <template>
                        <v-card>
                          <!-- Unsubscribe Package section -->
                            <!-- <EarnBTCUnsubscribePackage /> -->


                          <!-- Earn BTC Subscribed Package -->
                            <EarnCryptoSubscribedPackage :key="componentKey" @updateAmount="updateAmount" v-on:childToParentJN="onChildClickJN"/>


                        </v-card>
                      </template>
                    </v-card>
                  </v-tab-item>
                  
                  <!-- Join New Package-->
                  <v-tab-item class="mt-6" :id="`tab-1`">
                    <v-card flat>
                     <JoinNewPackage v-on:joinNewPackToEarnCrypto="onChildClickNewPackage" />
                          
                    </v-card>
                  </v-tab-item>

                <!--My Earnings-->
                  <v-tab-item class=" mt-6" :id="`tab-2`">
                    <v-card flat>
                    
                          <template>
                                  <MyEarnings />
                            </template>
                    </v-card>
                  </v-tab-item>
                  </v-tabs-items>
                
              </v-card>
            </template>


        
        </v-container>
        
      
      </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
//import $ from 'jquery';
import TopBar from '../TopBar';
// import EarnBTCUnsubscribePackage from '../Dashboard/EarnBTCUnsubscribePackage.vue';
import EarnCryptoSubscribedPackage from '../Dashboard/EarnCryptoSubscribedPackage.vue';
import JoinNewPackage from '../Dashboard/JoinNewPackage.vue';
import MyEarnings from '../Dashboard/MyEarnings.vue';
export default {
  name: 'EarnBtc',
  components: {
    TopBar,
    // EarnBTCUnsubscribePackage,
    EarnCryptoSubscribedPackage,
    JoinNewPackage,
    MyEarnings
  },
  mounted() {
    this.tabs = `tab-0`;

        //     $(function(){

        //   console.log("Mounted");
      
        //     $(document).on('click','.fold-table tr.view',function() {
        //       $(this).toggleClass("open").next(".fold").toggleClass("open");
        //     });
        // });
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    onChildClickJN(value) {
        console.log(value)
         this.tabs = `tab-1`
    },
    onChildClickNewPackage(value) {
        console.log(value)
          this.componentKey += 1;
    },
    updateAmount(_totalActiveTrading, _totalEarnProfit) {
      this.totalActiveTrading = _totalActiveTrading;
      this.totalEarnProfit = _totalEarnProfit;
    },
    addCommas: function(x, num) {
        x = x || 0;
        x = Number(x);
        var n = x.toFixed(num);
        var parts = n.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    getUserInfo: function () {
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
  },
  data: () => ({
    totalActiveTrading: 0,
    totalEarnProfit: 0,
    tabs: 0,
    loggedUserInfo: [],
    componentKey: 0,
  }),
};
</script>
