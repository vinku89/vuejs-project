import Router from 'vue-router';
import store from './store.js'
import TopBar from './components/User_Dashboard/TopBar';
import Wallets from './components/User_Dashboard/Wallets';
import testwallet from './components/User_Dashboard/testwallet';
import withdrawRequest from './components/User_Dashboard/withdrawRequest';
import CoinInfo from './components/User_Dashboard/CoinInfo.vue';
import BuyCrypto from './components/User_Dashboard/BuyCrypto.vue';
import Ecommerce from './components/User_Dashboard/Ecommerce.vue';
import LuxDraws from './components/User_Dashboard/LuxDraws.vue';
import Games from './components/User_Dashboard/Games.vue';
import Market from './components/User_Dashboard/Market.vue';
import MarketList from './components/User_Dashboard/MarketList.vue';
import EarnBtc from './components/User_Dashboard/EarnBtc.vue';
import Account from './components/User_Dashboard/Account/Account.vue';
import Login from './components/UserRegistration/Login.vue';
import Signup from './components/UserRegistration/SignUp.vue';
import CreatePassword from './components/UserRegistration/CreatePassword.vue';
import RecoverPassword from './components/UserRegistration/RecoverPassword.vue';
import ResetPassword from './components/UserRegistration/ResetPassword.vue';
import NProgress from 'nprogress';
import NotFound from './components/NotFound.vue';
import Trade from './components/User_Dashboard/Dashboard/Trade.vue';
import Exchange from './components/User_Dashboard/Dashboard/Exchange.vue';
import BrexilyEcosystem from './components/User_Dashboard/Brexco/BrexilyEcosystem.vue';
import EwalletReload from './components/User_Dashboard/Brexco/EwalletReload.vue';
import MobileReload from './components/User_Dashboard/Brexco/MobileReload.vue';
import TestWs from './components/testws.vue';
import LeadersBoard from './components/User_Dashboard/LeadersBoard.vue';
import LeaderBoard from './components/User_Dashboard/LeaderBoard.vue';
import Dashboard from './components/User_Dashboard/Dashboard/Dashboard.vue';
import EarnCrypto from './components/User_Dashboard/Dashboard/EarnCrypto.vue';
let router = new Router({
  mode: 'history',
  routes: [    
      {
        path: '/',
        name: 'LandingPage',
        component: Login
      },
      {
      path: '/EarnCrypto',
      name: 'EarnCrypto',
      component: EarnCrypto
    },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/RecoverPassword',
        name: 'RecoverPassword',
        component: RecoverPassword
      },
      {
        path: '/signup/:refcode?',
        name: 'Signup',
        component: Signup
      },
      {
        path: '/verify/:stamp',
        name: 'Verify',
        component: CreatePassword
      },
      {
        path: '/recover/:stamp',
        name: 'ResetPassword',
        component: ResetPassword
      },
      {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/Account',
        name: 'Account',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/Profile',
        name: 'Profile',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/Security',
        name: 'Security',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/Verification',
        name: 'Verification',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/TransactionHistory',
        name: 'TransactionHistory',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/BrexcoTransactions',
        name: 'BrexcoTransactions',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/Referral',
        name: 'Referral',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/TradingCommission',
        name: 'TradingCommission',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/Settings',
        name: 'Settings',
        component: Account,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/TopBar',
        name: 'TopBar',
        component: TopBar
      },
      {
        path: '/Trade/:id?',
        name: 'Trade',
        component: Trade
      },
      {
        path: '/Exchange/:id?',
        name: 'Exchange',
        component: Exchange
      },
      {
        path: '/LeadersBoard',
        name: 'LeadersBoard',
        component: LeadersBoard,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/LeaderBoard',
        name: 'LeaderBoard',
        component: LeaderBoard
      },
      {
        path: '/coininfo',
        name: 'coininfo',
        component: CoinInfo
      },
      {
        path: '/buycrypto',
        name: 'buycrypto',
        component: BuyCrypto
      },
      {
        path: '/ecommerce',
        name: 'ecommerce',
        component: Ecommerce
      },
      {
        path: '/luxdraws',
        name: 'luxdraws',
        component: LuxDraws
      },
      {
        path: '/games',
        name: 'games',
        component: Games
      },
      {
        path: '/market',
        name: 'market',
        component: Market,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/marketlist',
        name: 'marketList',
        component: MarketList
      },
      {
        path: '/earnbtc',
        name: 'earnbtc',
        component: EarnBtc
      },
      {
        path: '/wallets',
        name: 'Wallets',
        component: Wallets,
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/BrexilyEcosystem',
        name: 'BrexilyEcosystem',
        component: BrexilyEcosystem       
      },
      {
        path: '/EwalletReload',
        name: 'EwalletReload',
        component: EwalletReload       
      },
      {
        path: '/MobileReload',
        name: 'MobileReload',
        component: MobileReload       
      },
      {
        path: '/testwallet',
        name: 'testwallet',
        component: testwallet
      },
      {
        path: '/withdrawRequest/:type/:id',
        name: 'withdrawRequest',
        component: withdrawRequest
      },
      {
        path: '/kycverify/:stamp',
        name: 'kycverify',
        component: Login
      },
      {
        path: '/testws',
        name: 'testws',
        component: TestWs
      },
      {
        path: '*',
        redirect: '/404'
      },
      { path: '/404', component: NotFound }
    ]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
  
})

router.beforeEach((to, from, next) => {
  
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // const itemStr = localStorage.getItem("tokenexp")
    // const item = JSON.parse(itemStr);
    // const now = new Date();
    // if (store.getters.isLoggedIn && now.getTime() <= item.expiry) {
    if (store.getters.isLoggedIn) {      
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router;