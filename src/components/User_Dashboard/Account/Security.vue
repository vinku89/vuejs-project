<template>
<v-app>
    <v-container class="py-5  account_wrapper_main">
        <div  v-show="securityDiv">
        <v-col cols="12" xl="8" offset-xl="2">
            <h5>Two-Factor Authentication (2FA)</h5>
            <p class="py-2">
                Using Two-factor authentication is highly recommended. Plase consider our availabe for increasing the
                security of your account. We want to give you every opportunity to be confident that your account is
                secure.
            </p>

            <!-- Show on Activation -->
            <div class="disable_msg d-none" v-if="userInfo.Twofa_status == 'A'">
                Disabling two-factor authentication will deactivate all your features security.
            </div>
            <div class="twofa_status_wrap">
                <span>Status:</span>
                <!-- <span class="twofa_status inactive"></span> -->
                <v-chip v-if="userInfo.Twofa_status == 'A'" class="ma-2 active" color="success" label>
                    <v-icon class="mr-2 active" style="font-size: 10px;">fas fa-circle</v-icon>Active
                </v-chip>
                <v-chip v-else class="ma-2 inactive" label>
                    <v-icon class="mr-2 inactive" style="font-size: 10px;">fas fa-circle</v-icon>Disabled
                </v-chip>
            </div>
            <div class="my-5 d-flex">
                <!-- Hide on Activation -->
                <div class=" mr-5" v-if="userInfo.Twofa_status == 'D'">
                    <img :src="qr_code" style="width:275px;" class="img-fluid">
                </div>
                <div class="w-100">
                    <!-- Hide on Activation -->
                    <div class="" v-if="userInfo.Twofa_status == 'D'">
                        <p>Open up your 2FA mobile apps and scan the following QR code. If your 2FA mobile app does
                            not support QR code, enable the following number</p>
                        <div>
                            <!--<v-chip class="ma-2" color="grey darken-3" label outlined link text-color="white">
                                    <v-icon left style="transform: rotateY(0deg) !important;">mdi-reload</v-icon>
                                    Generate New
                                </v-chip>-->
                            <span class="pl-4 f18">{{google_secreate_key}}</span>
                        </div>
                    </div>
                    <div class="" v-if="userInfo.Token2fa_validation == 'D'">
                        <template>
                            <v-form ref="form" v-model="valid">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <div class="form-group">
                                            <label for="name">2FA Code</label>
                                            <v-text-field id="name" class="security_twofa" placeholder="Enter 2FA Activation code" :rules="authRules" v-model="google_token" required outlined></v-text-field>
                                            <v-alert v-show="twofaerr" dense outlined type="error">
                                                {{verfErr}}
                                            </v-alert>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" v-if="userInfo.Twofa_status == 'D'">
                                        <v-btn @click="validate" color="success" large class="mt-9">Activate 2FA</v-btn>
                                    </v-col>
                                    <v-col cols="12" md="4" v-else>
                                        <v-btn @click="validate1" color="error" large class="mt-9">Deactivate 2FA</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </template>                        
                    </div>
                </div>
            </div>
            <div class="my-5">
                <div class="font-bold">
                    The following features can be secured by 2FA
                </div>
                <template>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4" class="outline-transparent">
                                <template>
                                    <v-card class="mx-auto" outlined>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class="text-center ">Security
                                                    Settings</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-card-actions>
                                            <v-btn color="success" disabled class=" mx-auto my-3" style="" @click="validate">
                                                Inactive
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-col>
                            <v-col cols="12" md="4" class="outline-transparent">
                                <template>
                                    <v-card class="mx-auto" outlined>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class=" text-center ">Login
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-card-actions>
                                            <!-- <v-btn color="success" v-on:click="twofaSettings('login','A')" :loading="loading" :disabled="loading" v-if="userInfo.Twofa_status == 'A' && userInfo.login_tfa_status == 'D'" class=" mx-auto my-3 " style="">
                                                Enable
                                            </v-btn>
                                            <v-btn color="error" v-on:click="twofaSettings('login','D')" :loading="loading" :disabled="loading" v-else-if="userInfo.Twofa_status == 'A' && userInfo.login_tfa_status == 'A'" class=" mx-auto my-3 " style="">
                                                Disable
                                            </v-btn> -->
                                            <v-btn color="success" v-if="userInfo.login_tfa_status == 'A'" class=" mx-auto my-3 " style="">
                                                Active
                                            </v-btn>
                                            <v-btn :color="statusColor" v-else disabled class=" mx-auto my-3 " style="">
                                                Inactive
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-col>
                            <v-col cols="12" md="4" class="outline-transparent">
                                <template>
                                    <v-card class="mx-auto" outlined>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class=" text-center ">Change
                                                    Password</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-card-actions>
                                            <v-btn color="success" disabled class=" mx-auto my-3" style="" @click="validate">
                                                Inactive
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-col>
                            <v-col cols="12" md="4" class="outline-transparent">
                                <template>
                                    <v-card class="mx-auto" outlined>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class=" text-center ">Withdraw
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-card-actions>
                                            <!-- <v-btn color="success" v-on:click="twofaSettings('withdraw','A')" :loading="loading1" :disabled="loading1" v-if="userInfo.Twofa_status == 'A' && userInfo.withdraw_tfa_status == 'D'" class=" mx-auto my-3 " style="">
                                                Enable
                                            </v-btn>
                                            <v-btn color="error" v-on:click="twofaSettings('withdraw','D')" :loading="loading1" :disabled="loading1" v-else-if="userInfo.Twofa_status == 'A' && userInfo.withdraw_tfa_status == 'A'" class=" mx-auto my-3 " style="">
                                                Disable
                                            </v-btn> -->
                                            <v-btn color="success" v-if="userInfo.withdraw_tfa_status == 'A'" class=" mx-auto my-3 " style="">
                                                Active
                                            </v-btn>
                                            <v-btn :color="statusColor" v-else disabled class=" mx-auto my-3 " style="">
                                                Inactive
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-col>
                            <v-col cols="12" md="4" class="outline-transparent">
                                <template>
                                    <v-card class="mx-auto" outlined>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class=" text-center ">Transfer To
                                                    User</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-card-actions>
                                            <!-- <v-btn color="success" v-on:click="twofaSettings('transfertouser','A')" :loading="loading2" :disabled="loading2" v-if="userInfo.Twofa_status == 'A' && userInfo.transferto_user_tfa_status == 'D'" class=" mx-auto my-3 " style="">
                                                Enable
                                            </v-btn>
                                            <v-btn color="error" v-on:click="twofaSettings('transfertouser','D')" :loading="loading2" :disabled="loading2" v-else-if="userInfo.Twofa_status == 'A' && userInfo.transferto_user_tfa_status == 'A'" class=" mx-auto my-3 " style="">
                                                Disable
                                            </v-btn> -->
                                            <v-btn color="success" v-if="userInfo.transferto_user_tfa_status == 'A'" class=" mx-auto my-3 " style="">
                                                Active
                                            </v-btn>
                                            <v-btn :color="statusColor" v-else disabled class=" mx-auto my-3 " style="">
                                                Inactive
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-col>
                            <v-col cols="12" md="4" class="outline-transparent">
                                <template>
                                    <v-card class="mx-auto" outlined>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title class=" text-center ">Profile
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-card-actions>
                                            <v-btn color="success" disabled class=" mx-auto my-3" style="" @click="validate">
                                                Inactive
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
            </div>
        </v-col>
        <!-- Deactivate 2FA modal popup -->
        <template>
            <v-row justify="center" class="float-left">
                <v-dialog v-model="deactiveTwofaModal" persistent max-width="600px">
                    <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                        <v-card-text class="p-5 black-txt">
                            <v-container>
                                <img src="../../../assets/images/attention-popup-icon.png" alt="">

                                <h4 class="headline font-weight-bold my-2">Attention!!</h4>
                                <h5 class="subtitle-1 my-2">You have <strong class="text-danger">Deactivated 2FA</strong> for <strong>all your features security.</strong> </h5>
                                <p class="yellow py-3 px-8">
                                    For the safety of your account, we highly recommended to enable 2FA.
                                </p>
                                <v-card-actions class="close_btn_wrp">
                                    <v-icon class="black-txt" @click="deactiveTwofaModal = false">mdi-close</v-icon>
                                </v-card-actions>
                            </v-container>

                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>
    </div>
    </v-container>
    <v-overlay  :value="overlay" style="z-index:205;">
        <!-- <v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img> -->
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
    <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_text }}

        <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>
</v-app>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'Security',
    singleExpand: false,
    components: {},
    props: {
        userInfo: {},
        chngTabs: {
            type: Function
        }
    },
    data() {
        return {
            loading: false,
            loading1: false,
            loading2: false,
            securityDiv: false,
            overlay: false,
            absolute: true,
            mode: '',
            //userInfo: [],
            deactiveTwofaModal: false,
            twofaerr: false,
            qr_code: '',
            google_token: '',
            google_secreate_key: '',
            valid: true,
            authRules: [
                v => !!v || 'Fill out this field'
            ],
            verfErr: '',
            statusText: 'Active',
            statusColor: 'success',
            snackbar: false,
            snackbar_text: "",
            vertical: true,
            timeout: 6000,
            color: "yellow",
            x: 'right',
            y: 'top',
        }
    },
    methods: {
        twofaSettings(t,status){
            var self = this;            
            let auth_token = this.$store.getters.authToken;
            let type = t
            if(type == 'login'){
                self.loading = true
            }else if(type == 'withdraw'){
                self.loading1 = true
            }else{
                self.loading2 = true
            }
            if (auth_token) {
                let postData = {
                    "type": type,
                    "status": status
                }

                const URL = process.env.VUE_APP_API_URL + "twofaSettings";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(postData),
                    })
                    .then(function () {
                        //handle success 
                        self.getUserInfo()
                        let ttype = ""
                        if(type == 'login'){
                            ttype = 'Login'
                            self.loading = false
                        }else if(type == 'withdraw'){
                            ttype = 'Withdraw'
                            self.loading1 = false
                        }else{
                            ttype = 'Transfer To User'
                            self.loading2 = false
                        }
                        if(status == 'A'){
                            self.snackbar_text = "2FA Enabled for "+ttype
                        }else{
                            self.snackbar_text = "2FA Disabled for "+ttype
                        }                        
                        self.snackbar = true
                        
                    })
                    .catch(function (err) {
                        //handle error
                        if(err.response.data.Result == 'User is blocked'){
                            self.snackbar_text = "Your account has been deactivated."
                            self.snackbar = true
                            setTimeout(() => {
                            window.location.href = "/";
                            },2000)
                        }else{
                            self.verfErr = "Please enter valid verification code"
                            self.twofaerr = true
                        }
                    });
            } else {
                window.location.href = "/";
            }
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.submitVerifyCode()
            }
        },
        validate1() {
            if (this.$refs.form.validate()) {
                this.deactivateTwofa()
            }
        },
        submitVerifyCode: function () {
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let google_token = this.google_token;

            if (auth_token) {
                let postData = {
                    "google_token": google_token,
                    "verification_status_change": "A"
                }

                const URL = process.env.VUE_APP_API_URL + "google-verify-token";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(postData),
                    })
                    .then(function () {
                        //handle success 
                        //localStorage.setItem('Token2fa_validation_initial', 'A')
                        self.statusText = "Active";
                        self.statusColor = "success";
                        self.snackbar_text = "You have activated your Two-factor Authentication(2FA)."
                        self.snackbar = true
                        //self.google_token = ''
                        self.$refs.form.reset();
                        self.twofaerr = false
                        // if (self.userInfo.Twofa_status == 'D' && self.userInfo.first_name == "") {
                        //     setTimeout(() => {
                        //         self.chngTabs(0)
                        //         localStorage.setItem('acttwofaStatus', 'A')
                        //     }, 2000)
                        // } else {
                            self.$emit('childToParentST', "Success") 
                            //self.getUserInfo()
                        //}
                    })
                    .catch(function (err) {
                        //handle error
                        if(err.response.data.Result == 'User is blocked'){
                            self.snackbar_text = "Your account has been deactivated."
                            self.snackbar = true
                            setTimeout(() => {
                            window.location.href = "/";
                            },2000)
                        }else{
                            self.verfErr = "Please enter valid verification code"
                            self.twofaerr = true
                        }
                    });
            } else {
                window.location.href = "/";
            }
        },
        deactivateTwofa: function () {
            var self = this;
            let auth_token = this.$store.getters.authToken;
            let google_token = this.google_token;

            if (auth_token) {
                let postData = {
                    "google_token": google_token,
                    "verification_status_change": "D"
                }

                const URL = process.env.VUE_APP_API_URL + "google-verify-token";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(postData),
                    })
                    .then(function () {
                        //handle success 
                        //self.google_token = ''
                        self.$refs.form.reset();
                        self.deactiveTwofaModal = true
                        self.getUserInfo()
                        self.snackbar_text = "You have deactivated your Two-factor Authentication(2FA)."
                        self.twofaerr = false
                    })
                    .catch(function (err) {
                        //handle error
                        if(err.response.data.Result == 'User is blocked'){
                            self.snackbar_text = "Your account has been deactivated."
                            self.snackbar = true
                            setTimeout(() => {
                            window.location.href = "/";
                            },2000)
                        }else if(err.response.data.Result.msg == 'Verification Failed'){
                            self.verfErr = "Please enter valid verification code"
                            self.twofaerr = true
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
        },
        getUserInfo: function () {
            this.overlay = true
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
                        },
                    })
                    .then(function (response) {
                        //handle success 
                        self.securityDiv = true
                        self.overlay = false
                        self.userInfo = response.data.Result;
                    })
                    .catch(function () {
                        window.location.href = "/";
                    });
            } else {
                window.location.href = "/";
            }

        },
        getQrcode: function () {
            this.overlay = true
            var self = this;
            let auth_token = this.$store.getters.authToken;

            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "google-qrcode-render";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        },
                    })
                    .then(function (response) {
                        //handle success
                        self.securityDiv = true
                        self.overlay = false
                        self.qr_code = response.data.Result.google2fa_qrcode_url
                        self.google_secreate_key = response.data.Result.google_secreate_key
                    })
                    .catch(function (err) {
                        //handle error
                        if(err.response.data.Result == 'User is blocked'){
                                self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
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
                        .then(function (response) {
                            //handle success 
                            localStorage.setItem('google_2fa_key', response.data.Result.google_secreate_key)
                            self.getQrcode()
                            //self.$store.commit('getters',{'google_2fa_key': response.data.Result.google_secreate_key})
                           //setTimeout(() => {
                           //self.$router.push('/Security')
                           // }, 2000)
                        })
                        .catch(function () {
                            //handle error
                            window.location.href = "/";
                        });
                } else {
                    window.location.href = "/";
                }

            },
    },
    created() {
        this.gotoSecurity()        
        //this.getUserInfo()
    }
};
</script>
