<style scoped>
    .v-application--wrap {
        min-height: calc(100vh - 90px) !important;
    }

    .accountwrap .v-tab {
        padding: 0 3.5vw !important;
    }
</style>
<template>
    <v-app class="accountwrap">        
        <TopBar :userInfo="loggedUserInfo" :chngTabs="changeTabs" :ispmActive="true" />
         <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_text }}
        
        <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>
        <!-- <div v-show="AccountDiv"> -->
        <v-container fluid fill-height style="align-items: flex-start !important;">
           
        <v-col cols="12">
            <h2 class="pt-4 font-bold" style="font-weight: 600;">
                Account
            </h2>
            <v-card>
                <v-toolbar>
                    <v-tabs slot="extension" v-model="tabs" background-color="transparent" grow class="tabs_row">
                        <v-tab :href="`#tab-0`" :disabled="loggedUserInfo.Twofa_status == 'D'">
                            Profile
                        </v-tab>
                        <v-tab :href="`#tab-1`">
                            Security
                        </v-tab>
                        <v-tab :href="`#tab-2`" :disabled="loggedUserInfo.Twofa_status == 'D'">
                            Verification
                        </v-tab>
                        <v-tab :href="`#tab-3`" :disabled="loggedUserInfo.Twofa_status == 'D'">
                            Transaction History
                        </v-tab>
                        <v-tab :href="`#tab-4`" :disabled="loggedUserInfo.Twofa_status == 'D'">
                            Referral
                        </v-tab>
                        <v-tab :href="`#tab-5`" :disabled="loggedUserInfo.Twofa_status == 'D'">
                            Settings
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items class="py-5" v-model="tabs" v-show="AccountDiv">
                    <v-tab-item :id="`tab-0`">
                        <v-card flat v-show="vrf">
                            <Profile :key="vcomponentKey" :userInfo="loggedUserInfo"/>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item :id="`tab-1`">
                        <v-card flat >
                            <Security  :userInfo="loggedUserInfo" :chngTabs="changeTabs" v-on:childToParentST="onChildClickST" />
                        </v-card>
                    </v-tab-item>
                    <v-tab-item :id="`tab-2`">
                        <v-card flat v-show="vrf">
                            <Verification v-on:vchildToParent="vonChildClick" :userInfo="loggedUserInfo" :getKycStatus="kycStatus" />
                        </v-card>
                        <v-overlay :value="overlay1" style="z-index:205;">
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
                    </v-tab-item>
                    <v-tab-item :id="`tab-3`">
                        <v-card flat >
                            <Transaction  :userInfo="loggedUserInfo" />
                        </v-card>
                    </v-tab-item>
                    <v-tab-item :id="`tab-4`">
                        <v-card flat >
                            <Referral :userInfo="loggedUserInfo" :referralList="refferelUsersList" :chngTabs="changeTabs" /> 
                        </v-card>
                    </v-tab-item>
                    <v-tab-item :id="`tab-5`">
                        <v-card flat >
                            <Settings :userInfo="loggedUserInfo" />
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
             </v-col>
             
        </v-container>
        <!-- </div> -->
        <v-overlay :value="overlay" style="z-index:205;">
           <!-- <v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img>-->
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
    import axios from 'axios'
    import qs from 'qs'
    //import $ from 'jquery'
    import TopBar from '../../User_Dashboard/TopBar';
    import Referral from './Referral';
    import Profile from './Profile';
    import Transaction from './Transaction';
    import Verification from './Verification';
    import Security from './Security';
    import Settings from './Settings';
    export default {
        name: 'Account',
        singleExpand: false,
        components: {
            TopBar,
            Profile,
            Referral,
            Security,
            Transaction,
            Verification,
            Settings
        },
        data() {
            return { 
                AccountDiv: false,
                vrf: false,
                profileTab: false,
                overlay: false,
                overlay1: false,
                absolute: true,
                kycStatus: '',
                mode:'',
                tabs: 0,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                loggedUserInfo: [],
                refferelUsersList:[],
                //checkUserTwofaStatus: 'D',
                snackbar: false,
                snackbar_text: "",
                vertical: true,
                timeout: 6000,
                color: "yellow",
                x: 'right',
                y: 'top',
            }
        },
        props: {
            accData: String,
            addToFunc: { type: Function },
        },
        mounted:function(){
            // let google_2fa_key = localStorage.getItem('google_2fa_key');//this.$store.getters.google_2fa_key
            // let Token2fa_validation_initial = localStorage.getItem('Token2fa_validation_initial');//this.$store.getters.Token2fa_validation_initial
            // let first_name = localStorage.getItem('first_name');//this.$store.getters.first_name
            
            // if(google_2fa_key == ""){
            //     this.$router.push("/Trade/"+this.$store.getters.market_symbol);
            // }else if(google_2fa_key && Token2fa_validation_initial == 'D'){
            //     this.$router.push("/Security");
            // }else if(first_name == ""){
            //     this.$router.push("/Profile");
            // }

            this.myResult = this.$route.path.split("/");
            //this.tabs = `tab-${this.myResult[2]}`
            if(this.myResult[1] == 'Profile'){
                this.tabs = `tab-0`
            }else if(this.myResult[1] == 'Security'){
                this.tabs = `tab-1`
            }else if(this.myResult[1] == 'Verification'){
                this.tabs = `tab-2`
            }else if(this.myResult[1] == 'TransactionHistory'){
                this.tabs = `tab-3`
            }
            else if(this.myResult[1] == 'BrexcoTransactions'){
                this.tabs = `tab-3`
            }
            else if(this.myResult[1] == 'Referral'){
                this.tabs = `tab-4`
            }
            else if(this.myResult[1] == 'Settings'){
                this.tabs = `tab-5`
            }
            else if(this.myResult[1] == 'TradingCommission'){
                this.tabs = `tab-4`
            }
            else{
                this.tabs = `tab-0`
            }

        },
         methods:{
             onChildClickST (value) {
                this.getUserInfo()
                console.log(value);
             },
             vonChildClick (value) {
                 console.log(value);
                this.vcomponentKey += 1;  
                this.getKycStatus() 
                this.getUserInfo()
            },
            changeTabs: function(id){
                this.tabs = `tab-${id}`
            },
            getUserInfo: function() {
                this.overlay = true
                var self = this;
                let auth_token = this.$store.getters.authToken;

                if(auth_token){
                   
                    const URL = process.env.VUE_APP_API_URL+"userDetails";
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {"accept": "application/json","Authorization": "Bearer "+auth_token},                        
                        })
                        .then(function (response) {
                           self.loggedUserInfo = response.data.Result; 
                           self.AccountDiv = true
                           self.overlay = false
                        //    if(response.data.Result.Twofa_status == 'D' && response.data.Result.first_name == ""){
                        //        self.checkUserTwofaStatus = 'D'
                        //    } 
                        //    else if(response.data.Result.Twofa_status == 'D' && response.data.Result.first_name != ""){
                        //        self.checkUserTwofaStatus = 'A'
                        //    }                    
                        //    else if(response.data.Result.Twofa_status == 'A' && response.data.Result.first_name != ""){
                        //      self.checkUserTwofaStatus = 'A'
                        //    }
                        //    else{
                        //      self.checkUserTwofaStatus = 'D'
                        //    }             
                        })
                        .catch(function (err) {
                            if(err.response.data.Result == 'User is blocked'){
                                self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                self.profileTab = true
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
                }else{
                    window.location.href = "/";
                }

            },
            getReferredUsersList: function() {
                var self = this;                
                let user_id = this.$store.getters.loggedUserId;
                let auth_token = this.$store.getters.authToken;

                if(auth_token){ 
                   let postData = {"ancestor_id":user_id,"distance":1}
                   
                    const URL = process.env.VUE_APP_API_URL+"fetch-referral";
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {"accept": "application/json","Authorization": "Bearer "+auth_token},
                            data: qs.stringify(postData),                            
                        })
                        .then(function (response) {  
                            //handle success 
                           self.refferelUsersList = response.data.Result;                           
                        })
                        .catch(function () {
                            //handle error
                        });
                }else{
                    window.location.href = "/";
                }

            },
           getKycStatus() {
                this.overlay1 = true
                var self = this;
                let auth_token = this.$store.getters.authToken;
                if (auth_token) {                    
                    const URL = process.env.VUE_APP_API_URL + "get_kyc_status";
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
                            self.vrf = true
                            self.overlay1 = false
                            self.kycStatus = response.data.Result                                        
                        })
                        .catch(function () {
                            //handle error
                        });
                } else {
                    window.location.href = "/";
                }
            }
           
        },
        created(){
            this.getUserInfo()
            this.getReferredUsersList()
            this.getKycStatus()
        }
    };
</script>