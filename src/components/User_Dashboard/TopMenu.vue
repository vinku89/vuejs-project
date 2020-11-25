<template>
<div>
    <v-app-bar app dark elevation="0" class="userdashboard" fixed height="50">

        <div class="d-flex align-center">
            
            <v-btn :href="`/Exchange/BTC_EVR`" class="bg-transparent">
                <v-img alt="Brexily Logo" class="shrink mr-2" contain src="../../assets/images/brexily_logo.svg" transition="scale-transition" width="175" height="46" />
            </v-btn>
            
        </div>
        <v-spacer></v-spacer>
        
        <div class="d-flex topMenu">
            <v-toolbar app height="47">
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    
                    <v-btn v-for="item in items" :to="`${item.href}`" :key="item.title" :class="[currenctPage.split('/')[1] == item.href.split('/')[1] ? 'v-btn--active': '']">
                       <!-- <span v-if="item.title == 'EXCHANGE'">
                       <v-badge color="green" content="BETA">
                        {{ item.title }}
                        </v-badge>      
                       </span>
                       <span v-else> -->
                           {{ item.title }}
                       <!-- </span>                   -->
                    </v-btn>

                    <v-btn flat href="https://brexily.com/brexco/" target="_blank">
                            BrexCo
                    </v-btn>
                    <v-btn flat href="https://brexily.com/earn-crypto/" target="_blank">
                            Earn Crypto
                    </v-btn>
                    <v-btn flat href="https://brexily.com/brexgames/" target="_blank">
                            BrexGames
                    </v-btn>
                    
                </v-toolbar-items>
            </v-toolbar>
        </div>
        <v-spacer></v-spacer>
         <div class="topbar_right_menus">
         
           <a flat v-for="item in newUserItems" :href="`${item.href}`" :key="item.title">
                {{ item.title }}
           </a>
        </div>
        
    </v-app-bar>
   
</div>
</template>

<script>
//import axios from 'axios'
//import qs from 'qs'
export default {
    name: 'TopMenu',
    props: {
        chngTabs: {
            type: Function
        },
        iswtmActive: Boolean,
        ispmActive: Boolean
    },
    data() {
        return {
        menuActive: 'menuActive',
            menu: false,
            model: false,
            logOutModal: false,
            userInfo: {},
            sidebar: false,
            items: [{
                    title: 'EXCHANGE',
                    // icon: 'mdi-view-dashboard',
                    href: "/Exchange/BTC_EVR",
                    router: true
                },
                {
                    title: 'MARKET',
                    href: '/marketlist',
                    router: true
                },
                {
                    title: 'Leaders Board',
                    href: '/LeaderBoard',
                    router: true
                },
                //{
                //    title: 'Login',
                //    href: '/login',
                //    router: true
                //},
                //{
                //    title: 'Signup',
                //    href: '/signup',
                //    router: true
                //},
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
            newUserItems: [
                {
                    title: 'Login',
                    href: '/login',
                    router: true
                },
                {
                    title: 'Signup',
                    href: '/signup',
                    router: true
                },
            ],
            right: null,
            icon: '',
            profileItems: [{
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
                {
                    icon: 'mdi-history',
                    text: 'Transaction History',
                    link: 'TransactionHistory',
                    router: true
                },
                {
                    icon: 'mdi-account-multiple-outline',
                    text: 'Referral',
                    link: 'Referral',
                    router: true
                },
                // {
                //     icon: 'mdi-ship-wheel',
                //     text: 'Settings',
                //     link: '',
                //     router: true
                // },
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
    }
}
</script>
