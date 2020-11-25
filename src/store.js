import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user_id: localStorage.getItem('user_id') || '',
    market_symbol: localStorage.getItem('market_symbol') || '',
    google_2fa_key: localStorage.getItem('google_2fa_key') || '',
    Token2fa_validation_initial: localStorage.getItem('Token2fa_validation_initial') || '',
    first_name: localStorage.getItem('first_name') || '',
    chartData: null
  };

const mutations = {
      auth_request(state){
        state.status = 'loading'
      },
      login_success(state, token){
        state.status = 'success'
        state.token = token       
      },
      logged_userId(state, user_id){ 
        state.status = 'success'
        state.user_id = user_id
      },
      user_info(state, userInfo){ 
        state.status = 'success'
        state.userInfo = userInfo        
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
      },
  };

const actions = {

    login({commit}, user){
      
        let postData = {"email": user.email, "password": user.password,"ip":user.ipaddr,"browser":user.browser,"country":user.country,"city":user.city,"region":user.region, "otpcode":user.verifyCode,"recaptcha_token":user.recaptcha_token}
        const URL = process.env.VUE_APP_API_URL+"login";
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({
            method: 'post',
            url: URL,
            data: qs.stringify(postData)
          })
          .then(resp => {
            const user_id = resp.data.data.userInfo.user_id
            const market_symbol = resp.data.data.market_symbol
            const google_2fa_key = resp.data.data.google_2fa_key
            const Token2fa_validation_initial = resp.data.data.Token2fa_validation_initial
            const first_name = resp.data.data.first_name
            const token = resp.data.data.token
            localStorage.setItem('user_id', user_id)
            localStorage.setItem('market_symbol', market_symbol)
            localStorage.setItem('google_2fa_key', google_2fa_key)
            localStorage.setItem('Token2fa_validation_initial', Token2fa_validation_initial)
            localStorage.setItem('first_name', first_name)
            localStorage.setItem('token', token)


            // const now = new Date()
            // const item = {
            //   tokenid: token,
            //   expiry: now.getTime() + 8000
            // }
            // localStorage.setItem("tokenexp", JSON.stringify(item))

            axios.defaults.headers.common['Authorization'] = token
            commit('login_success', token)
            commit('logged_userId', user_id)
            resolve(resp)
          }).catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            localStorage.removeItem('market_symbol')
            localStorage.removeItem('google_2fa_key')
            localStorage.removeItem('Token2fa_validation_initial')
            localStorage.removeItem('first_name')
            reject(err)
          }) 
        })
    },
    register({commit}, user){
          let postData = {"email": user.email, "referral": user.referral, "terms_of_use": user.termsnconditions,"recaptcha_token":user.recaptcha_token}
          const URL = process.env.VUE_APP_API_URL+"brxlysignup";
          return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({
              method: 'post',
              url: URL, 
              data: qs.stringify(postData)
            })
            .then(resp => {
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error', err)
              localStorage.removeItem('token')
              reject(err)
            })
          })
    }
  };
  const getters = {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        authToken: state => state.token,
        loggedUserId: state => state.user_id,
        market_symbol: state => state.market_symbol,
        google_2fa_key: state => state.google_2fa_key,
        Token2fa_validation_initial: state => state.Token2fa_validation_initial,
        first_name: state => state.first_name,
        userInfo: state => state.userInfo,
    }

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  });