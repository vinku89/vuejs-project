<template>
<div>
    <v-app-bar app dark elevation="0" class="userdashboard" fixed height="50">

        <div class="d-flex align-center">
            
            <v-btn :href="`/Trade/${this.$store.getters.market_symbol}`" :disabled="userInfo.Twofa_status == 'D'" class="bg-transparent brexily_logo">
                <v-img alt="Brexily Logo" class="shrink mr-2" contain src="../../assets/images/brexily_logo.svg" transition="scale-transition" width="175" height="46" />
            </v-btn>
            <!-- <v-btn :href="`/Dashboard`" class="bg-transparent">
                <v-img alt="Brexily Logo" class="shrink mr-2" contain src="../../assets/images/brexily_logo.svg" transition="scale-transition" width="175" height="46" />
            </v-btn> -->
            
        </div>
        <!-- <v-spacer></v-spacer> -->
                <div class="position-relative mainmenu">
                 <span class="px-0 main_nav" v-on:click="main_navmethod()">
                    <v-icon>mdi-apps</v-icon>
                </span>

                <div class="new_topMenus">
                    <ul>
                        <li>
                            <v-btn :to="`/Trade/${this.$store.getters.market_symbol}`">
                            <i class="new_topmenu_icons topmenu_icon1 topmenu_icon_width"></i>
                            <div class="d-block pl-2">
                                  <p class="mb-0">Exchange</p>
                                 <small>Easily trade your cryptocurrencies for other crypto assets.</small>
                            </div>
                          </v-btn>
                        </li>
                         <li>
                             <v-btn to="/BrexilyEcosystem">
                            <i class="new_topmenu_icons topmenu_icon2 topmenu_icon_width"></i>
                            <div class="d-block pl-2">
                                  <p class="mb-0">BrexCo - EcoSystem</p>
                                 <small>Make different payments with crypto.</small>
                            </div>
                            </v-btn>
                        </li>
                        <li>
                            <v-btn to="/EarnCrypto">
                            <i class="new_topmenu_icons topmenu_icon3 topmenu_icon_width"></i>
                            <div class="d-block pl-2">
                                  <p class="mb-0">Earn Crypto</p>
                                 <small>Earn up to 36% per annum in dividend returns.</small>
                            </div>
                          </v-btn>
                        </li>
                        <li>
                            <v-btn href="https://brexily.com/brexgames/" @click="closeMainMenu()" target="_blank">
                            <i class="new_topmenu_icons topmenu_icon4 topmenu_icon_width"></i>
                            <div class="d-block pl-2">
                                  <p class="mb-0">BrexGames</p>
                                 <small>Take part in intriguing games and earn crypto rewards in return.</small>
                            </div>
                          </v-btn>
                        </li>
                        <li>
                            <v-btn to="/market">
                            <i class="new_topmenu_icons topmenu_icon5 topmenu_icon_width"></i>
                            <div class="d-block pl-2">
                                  <p class="mb-0">Market</p>
                                 <small>View the market worth of different cryptocurrencies. </small>
                            </div>
                          </v-btn>
                        </li>
                        <li>
                            <v-btn to="/LeadersBoard">
                            <i class="new_topmenu_icons topmenu_icon6 topmenu_icon_width"></i>
                            <div class="d-block pl-2">
                                  <p class="mb-0">Leaders Board</p>
                                 <small>View your position and performance in the exchange.</small>
                            </div>
                          </v-btn>
                        </li>
                    </ul>
                </div>

                </div>

        
        <div class="d-flex topMenu">
            <v-toolbar app height="47" style="display:none;">
                <v-spacer></v-spacer>

                <v-btn>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-btn>

                <v-toolbar-items>
                    
                    <v-btn v-for="item in items" :to="`${item.href}`" :class="[currenctPage.split('/')[1] == item.href.split('/')[1] ? 'v-btn--active': '']" :key="item.title">
                       <!-- <span v-if="item.title == 'EXCHANGE'">
                       <v-badge color="green" content="BETA">
                        {{ item.title }}
                        </v-badge>      
                       </span>
                       <span v-else> -->
                           {{ item.title }}
                       <!-- </span>                   -->
                    </v-btn>

                    <!-- <v-btn flat href="https://brexily.com/brexco/" target="_blank">
                            BrexCo
                    </v-btn> -->
                    <!-- <v-btn flat href="https://brexily.com/earn-crypto/" target="_blank">
                            Earn Crypto
                    </v-btn> -->
                    <v-btn flat href="https://brexily.com/brexgames/" target="_blank">
                            BrexGames
                    </v-btn>
                    
                </v-toolbar-items>
            </v-toolbar>
        </div>
        <v-spacer></v-spacer>
    
        <div class="topbar_right_menus">


                        <v-btn class="report_menu" v-on:click="report_menumethod()">
                        Report 
                        <v-icon class="new_downArrow">mdi-menu-down</v-icon>
                        <v-icon class="new_upArrow">mdi-menu-up</v-icon>
                        </v-btn>

                        <div class="report_topMenus">
                            <ul>
                                <li>
                                    <v-btn to="/wallets">
                                    <i class="new_topmenu_icons topmenu_icon7 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">Wallet</p>
                                        <small>Store and manage your multiple cryptocurrencies on different wallets.</small>
                                    </div>
                                    </v-btn>
                                </li>
                                <li>
                                     <v-btn @click="addToFunc('TransactionHistory')" class="report_ac_menu">
                                    <i class="new_topmenu_icons topmenu_icon8 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">Deposits / Withdrawals</p>
                                        <small>Make deposits or withdraw an asset with just a few clicks.</small>
                                    </div>
                                     </v-btn>
                                </li>
                                <!-- <li>
                                    <v-btn to="/">
                                    <i class="new_topmenu_icons topmenu_icon9 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">My Orders</p>
                                        <small>View the specifics of each order along with the corresponding prices and status.</small>
                                    </div>
                                    </v-btn>
                                </li>
                                <li>
                                    <v-btn to="/">
                                    <i class="new_topmenu_icons topmenu_icon10 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">My Trades</p>
                                        <small>View the orders of your trades on the exchange.</small>
                                    </div>
                                    </v-btn>
                                </li>
                                <li>
                                    <v-btn to="/">
                                    <i class="new_topmenu_icons topmenu_icon11 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">Internal Transfer</p>
                                        <small>Instantly send and receive cryptocurrency within Brexily exchange.</small>
                                    </div>
                                    </v-btn>
                                </li>-->
                                <li>
                                    <v-btn @click="addToFunc('BrexcoTransactions')" class="report_ac_menu1">
                                    <i class="new_topmenu_icons topmenu_icon12 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">BrexCo Transactions</p>
                                        <small>Make seamless payments on Brexco payment system.</small>
                                    </div>
                                    </v-btn>
                                </li>
                                <!-- <li>
                                   <v-btn to="/">
                                    <i class="new_topmenu_icons topmenu_icon13 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">Earn Crypto Transactions</p>
                                        <small>Carry out transactions to enjoy the Earn Crypto bonus.</small>
                                    </div>
                                    </v-btn>
                                </li> -->
                                <li>
                                    <v-btn @click="addToFunc('TradingCommission')" class="report_ac_menu2">
                                    <i class="new_topmenu_icons topmenu_icon14 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">Trading Commissions</p>
                                        <small>Make seamless trades on any cryptocurrency to enjoy the trading commission.</small>
                                    </div>
                                    </v-btn>
                                </li>
                                <!-- <li>
                                    <v-btn to="/">
                                    <i class="new_topmenu_icons topmenu_icon15 topmenu_icon_width"></i>
                                    <div class="d-block pl-2">
                                        <p class="mb-0">Ledgers</p>
                                        <small>View the record of your trading transactions.</small>
                                    </div>
                                    </v-btn>
                                </li> -->
                            </ul>
                        </div>



            <div class="d-none">
                <v-switch v-model="$vuetify.theme.dark" hide-details inset label="" class="pt-2"></v-switch>
            </div>
            <v-btn height="47" :class="[currenctPage.includes('wallets') ? menuActive: '']" :disabled="userInfo.Twofa_status == 'D'" to="/wallets">
                <v-icon>mdi-wallet-outline</v-icon>
            </v-btn>
            <v-btn height="47">
                <v-icon>mdi-bell-outline</v-icon>
            </v-btn>

            <!-- Profile menu and dropdoen section -->
            <template>
                <v-menu :close-on-content-click="true" :nudge-width="300" offset-x style="min-width:300px !important;" offset-y="50">
                    <template v-slot:activator="{ on }">
                        <v-btn height="47" v-on="on" :class="{ menuActive: ispmActive }" @click="dblWtMenu">
                            <v-icon>mdi-account-circle-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-card class=" profile_dropdown">
                        <h2 class="title m-0 pb-2 font-weight-bold">{{ userInfo.email }}</h2>
                        <v-divider class="m-0"></v-divider>
                        <h6 class="title m-0 d-none">Not verified</h6>
                        <p class="body-2 d-none">To have access to withdraw, codes and IEO you need to go through online
                            verification</p>
                        <a href="" class="d-none">Pass verification</a>
                        <div>
                            <v-list class="profile_sub_wrp mt-2">
                                <v-list-item-group>
                                    <v-list-item v-for="(item, i) in profileItems" :key="i" @click="addToFunc(item.link)">
                                        <v-list-item-icon>
                                            <v-icon v-text="item.icon"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.text"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </div>
                    </v-card>
                </v-menu>
            </template>
            <!--End Profile menu and dropdoen section -->
        </div>
    </v-app-bar>
    <!-- Logout modal popup -->
    <template>
        <v-row justify="center" class="float-left">
            <v-dialog v-model="logOutModal" persistent max-width="600px">
                <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                    <v-card-text class="p-5 black-txt">
                        <v-container>
                            <img alt="Alert" src="../../assets/images/danger-popup-icon.png" class="img-fluid" />
                            <h4 class="headline font-weight-bold my-2">Are you sure?</h4>
                            <h5 class="subtitle-1 my-2">You want to log out <strong>BREXILY</strong> ?</h5>

                            <v-card-actions class="close_btn_wrp">
                                <v-icon class="black-txt" @click="logOutModal = false">mdi-close</v-icon>
                            </v-card-actions>

                            <v-btn-toggle class="mt-4" borderless>
                                <v-btn value="left" class="red accent-4 w-50 px-7 py-2" @click="logOutModal = false">
                                    <span class="hidden-sm-and-down">Cancel</span>
                                </v-btn>

                                <v-btn value="right" class="green darken-1 w-50 px-7 py-2" @click="logoutFunc">
                                    <span class="hidden-sm-and-down">Yes, proceed</span>
                                </v-btn>
                            </v-btn-toggle>
                        </v-container>

                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </template>
</div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
    name: 'TopBar',
    props: {
        userInfo: {},
        chngTabs: {
            type: Function
        },
        iswtmActive: Boolean,
        ispmActive: Boolean
    },
    data() {
        return {
            report_menu: false,
            main_nav: false,
            menuActive: 'menuActive',
            menu: false,
            model: false,
            logOutModal: false,
            //userInfo: {},
            //chkUserTwofaStatus: 'D',
            sidebar: false,
            items: [
                // {
                //     title: 'Dashboard',
                //     href: '/Dashboard',
                //     router: true
                // },
                {
                    title: 'EXCHANGE',
                    // icon: 'mdi-view-dashboard',
                    href: "/Trade/"+this.$store.getters.market_symbol,
                    router: true
                },
                {
                    title: 'MARKET',
                    href: '/market',
                    router: true
                },
                {
                    title: 'Brexco',
                    href: '/BrexilyEcosystem',
                    router: true
                },
                {
                    title: 'Earn Crypto',
                    href: '/EarnCrypto',
                    router: true
                },
                {
                    title: 'Leaders Board',
                    href: '/LeadersBoard',
                    router: true
                },
                // {
                //     title: 'COININFO',
                //     href: '/coininfo',
                //     router: true
                // },
                // {
                //     title: 'BUY CRYPTO',
                //     href: '/buycrypto',
                //     router: true
                // },
                // {
                //     title: 'E-COMMERCE',
                //     href: '/ecommerce',
                //     router: true
                // },
                // {
                //     title: 'LUXDRAWS',
                //     href: '/luxdraws',
                //     router: true
                // },
                // {
                //     title: 'GAMES',
                //     href: '/games',
                //     router: true
                // },
                // {
                //     title: 'EARN BTC',
                //     href: '/earnbtc',
                //     router: true
                // }
            ],
            right: null,
            icon: '',
            profileItems: [{
                    icon: 'mdi-monitor-dashboard',
                    text: 'Dashboard',
                    link: 'Dashboard',
                    router: true
                },
                {
                    icon: 'mdi-face',
                    text: 'Profile',
                    link: 'Profile',
                    router: true
                },
                {
                    icon: 'mdi-shield-lock-outline',
                    text: 'Security',
                    link: 'Security',
                    router: true

                },
                 {
                    icon: 'mdi-lock-open-outline',
                    text: 'Verification',
                    link: 'Verification',
                    router: true
                },
                // {
                //     icon: 'mdi-history',
                //     text: 'Transaction History',
                //     link: 'TransactionHistory',
                //     router: true
                // },
                {
                    icon: 'mdi-account-multiple-outline',
                    text: 'Referral',
                    link: 'Referral',
                    router: true
                },
                {
                    icon: 'mdi-ship-wheel',
                    text: 'Settings',
                    link: 'Settings',
                    router: true
                },
                {
                    icon: 'mdi-power',
                    text: 'Logout',
                    link: 'logout',
                    router: true
                },
            ],
        }
    },
    computed: {
        currenctPage() {
            return this.$route.path;
        }
    },
    methods: {
        closeMainMenu: function(){
            $(".new_topMenus").removeClass("d-block");
        },
        main_navmethod: function(){
            //this.main_nav = true
            if(this.userInfo.Twofa_status == 'A'){
                $(".main_nav").toggleClass("topMenu_active");
                $(".report_menu").removeClass("report_active");
                $(".new_topMenus").toggleClass("d-block");
                $(".report_topMenus").removeClass("d-block");
            }
            
        },
        report_menumethod: function(){
            if(this.userInfo.Twofa_status == 'A'){
                $(".main_nav").removeClass("topMenu_active");
                $(".report_menu").toggleClass("report_active");
                $(".new_topMenus").removeClass("d-block");
                $(".report_topMenus").toggleClass("d-block");
            }
        },
        dblWtMenu: function () {
            document.body.classList.remove("selectdropwn");
            document.body.classList.remove("stable_coins_dd");
            document.body.classList.remove("selectecountrydropwn"); 
            this.iswtmActive = false
            $(".new_topMenus").removeClass("d-block");
            $(".report_topMenus").removeClass("d-block");
           $(".main_nav").removeClass("topMenu_active");
            $(".report_menu").removeClass("report_active");
        },
        myFilter: function () {
            this.isActive = !this.isActive;
            // some code to filter users
        },
        logoutFunc: function () {
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            localStorage.removeItem('twofa_popup_show')
            this.$store.state.token = null
            this.$store.state.user_id = null
            this.$store.state.isLoggedIn = false
            window.location.href = "/Exchange/BTC_EVR";
        },
        addToFunc: function (val) {
            $(".report_topMenus").removeClass("d-block");
            
            if (val == 'logout') {
                this.logOutModal = true
            } 
            else if (val == 'Dashboard') {
                 this.$router.push('/Dashboard')
            }
            else if (val == 'Profile' && this.userInfo.Twofa_status == 'A') {
                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/Profile')
                    this.chngTabs(0)
                //}
            } else if (val == 'Security' && this.userInfo.Twofa_status == 'A') {
                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/Security')
                    this.chngTabs(1)
                //}
            } else if (val == 'Verification' && this.userInfo.Twofa_status == 'A') {

                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/Verification')
                    this.chngTabs(2)
                //}
            } else if (val == 'TransactionHistory' && this.userInfo.Twofa_status == 'A') {
               
                $(".report_ac_menu").addClass("report_ac_active"); 
                $(".report_ac_menu1").removeClass("report_ac_active"); 
                $(".report_ac_menu2").removeClass("report_ac_active"); 
                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/TransactionHistory')
                    this.chngTabs(3)
                //}
            }else if (val == 'BrexcoTransactions' && this.userInfo.Twofa_status == 'A') {
                $(".report_ac_menu").removeClass("report_ac_active"); 
                $(".report_ac_menu1").addClass("report_ac_active"); 
                $(".report_ac_menu2").removeClass("report_ac_active");
                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/BrexcoTransactions')
                    this.chngTabs(3)
                //}
            } else if (val == 'Referral' && this.userInfo.Twofa_status == 'A') {

                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/Referral')
                    this.chngTabs(4)
                //}
            }
            else if (val == 'TradingCommission' && this.userInfo.Twofa_status == 'A') {
                $(".report_ac_menu").removeClass("report_ac_active"); 
                $(".report_ac_menu1").removeClass("report_ac_active"); 
                $(".report_ac_menu2").addClass("report_ac_active");
                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/TradingCommission')
                    this.chngTabs(4)
                //}
            }
            else if (val == 'Settings' && this.userInfo.Twofa_status == 'A') {

                //if ((this.userInfo.Twofa_status == 'A' && this.userInfo.first_name != "") || (this.userInfo.Twofa_status == 'D' && this.userInfo.first_name != "")) {
                    this.$router.push('/Settings')
                    this.chngTabs(5)
                //}
            }

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
                        self.userInfo = response.data.Result;
                        // if (self.userInfo.Twofa_status == 'A') {
                        //     self.chkUserTwofaStatus = 'A'
                        // } else if (self.userInfo.Twofa_status == 'D' && self.userInfo.first_name != "") {
                        //     self.chkUserTwofaStatus = 'A'
                        // } else {
                        //     self.chkUserTwofaStatus = 'D'
                        // }
                    })
                    .catch(function () {
                        window.location.href = "/";
                    });
            } else {
                window.location.href = "/";
            }

        },
    },
    mounted: function () {
        //this.getUserInfo()
        $(document).on('click', function (e) {
            if ($(e.target).closest(".mainmenu").length === 0) {
                $(".new_topMenus").removeClass("d-block");
            }

            if ($(e.target).closest(".topbar_right_menus").length === 0) {
                $(".report_topMenus").removeClass("d-block");
            }
        });
    }
}
</script>
