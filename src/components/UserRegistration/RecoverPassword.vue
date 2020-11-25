<template>
<div class="user_reg">
    <v-content class="new_login_bg mobile_view">
        <v-col cols="12" class="reg_logo">
            <a :href="`${websiteUrl}`">
                <img src="../../assets/images/login-logo.png" alt="Brexily Exchange" height="100">
            </a>
        </v-col>
        <v-container class="pa-0">

            <div class="new_login_wrp">
                <div class="userregistration_box">
                    <ul>
                        <li>
                            <a href="/login" class="radius_left activeTab">Sign in</a>
                        </li>
                        <li>
                            <a href="/signup" class="radius_right">Sign up</a>
                        </li>
                    </ul>
                    <div class="userregistration_contentbox">
                        <div class="signin_wrp">
                            <template>
                                <div>
                                    <div class="box_title_bg">
                                        <div class="box_title">
                                            <h1 class="f40">Recovering</h1>
                                            <p>your password</p>
                                        </div>
                                    </div>

                                    <!-- Recovering Password Form section -->
                                    <div class="userregistration_form_wrp">
                                        <div v-show="fpwdForm">
                                            <v-form ref="form" v-model="valid">
                                                <v-col cols="12" sm="12" class="p-0 mb-12">
                                                    <div class="form-group">
                                                        <p>Email Address</p>
                                                        <v-text-field v-model="email" :value="useremail" :rules="emailRules" placeholder="Enter your email address" required single-line outlined hide-details="auto" v-on:keyup.8="hideAlertbox">
                                                        </v-text-field>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" sm="12" class="p-0 pt-5">
                                                    <v-alert v-show="forgotpwderr" dense outlined type="error" class="alert_txt">
                                                        {{ dispMsg }}
                                                    </v-alert>
                                                    <v-btn x-large color="success" class="w-100 mb-4" dark @click="validate">Receive new password</v-btn>
                                                    <v-btn href="/login" x-large outlined color="success" class="w-100" dark>Sign in</v-btn>
                                                </v-col>
                                            </v-form>
                                        </div>
                                        <div v-show="!fpwdForm" class="recover_psw_msg">
                                            <h3 class="font-weight-bold mb-8">Kindly check your email for new password</h3>
                                            <p class="font-weight-normal">Thank you!</p>
                                        </div>

                                    </div>
                                    <!-- End Recovering Password Form section -->
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
                    {{ snackbar_text }}
                    <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
                    <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
                        Close
                    </v-btn> -->
                </v-snackbar>

                <div class="loginbox_footer">
                    <a :href="`${websiteUrl}termsofuse`">Terms &amp; Conditions</a> | <a :href="`${websiteUrl}privacypolicy`">Privacy Policy</a><br />
                    Copyright © 2020 Everus Technologies OÜ. All rights reserved.
                </div>
            </div>

        </v-container>
    </v-content>
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'RecoverPasswrod',
    components: {},
    data() {
        return {
            forgotpwderr: false,
            fpwdForm: true,
            dispMsg: '',
            // email
            email: '',
            emailRules: [
                v => !!v || 'Fill out this field',
                v => /.+@.+\..+/.test(v) || 'We can’t find user with that e-mail address',
            ],
            snackbar: false,
            snackbar_text: "",
            vertical: true,
            timeout: 6000,
            color: "yellow",
            x: 'right',
            y: 'top',
            websiteUrl: ''
        }
    },
    mounted: function () {
        this.websiteUrl = process.env.VUE_APP_WEBSITE_URL
    },
    methods: {
        hideAlertbox: function () {
            this.dispMsg = ''
            this.forgotpwderr = false
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.forgetPassword();
            }
        },
        forgetPassword: function () {
            var self = this
            let email = this.email
            const apiUrl = process.env.VUE_APP_API_URL + 'recover-password';
            let bodyFormData = {
                "email": email
            }
            axios({
                    method: 'post',
                    url: apiUrl,
                    data: qs.stringify(bodyFormData)
                })
                .then(function (response) {
                    //handle success
                    if (response.data.Success == true) {
                        self.fpwdForm = false;
                        self.snackbar_text = "Kindly check your email for new password"
                        self.snackbar = true
                    } else {
                        self.forgotpwderr = true
                        self.dispMsg = response.data.Result
                    }
                })
                .catch(function (err) {
                    //handle error
                    self.forgotpwderr = true
                    self.dispMsg = err.response.data.Result
                });
        }
    },
};
</script>

<style lang="css" scoped>
.theme--dark.v-application {
    background-color: #ffffff !important;
}
</style>
