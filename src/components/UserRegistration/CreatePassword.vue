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
                            <router-link to="/login" class="radius_left">Sign in</router-link>
                        </li>
                        <li>
                            <router-link to="/signup" class="radius_right activeTab">Sign up</router-link>
                        </li>
                    </ul>
                    <div class="userregistration_contentbox">
                        <div class="signup_wrp">
                            <template>
                                <div>
                                    <div class="box_title_bg">
                                        <div class="box_title">
                                            <h1 class="f40">Create</h1>
                                            <p>your password</p>
                                        </div>
                                    </div>

                                    <!-- Login Form section -->
                                    <div class="userregistration_form_wrp">
                                        <v-form ref="form" v-model="valid">
                                            <v-col cols="12" sm="12" class="p-0">
                                                <div class="form-group">
                                                    <p>Create new password</p>
                                                    <v-text-field v-model="password" :value="userPassword" placeholder="Create new password" :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (value = !value)" :type="value ? 'password' : 'text'" :maxlength="36" :rules="[rules.password]" @input="_=>password=_" single-line outlined required>
                                                    </v-text-field>
                                                </div>
                                            </v-col>

                                            <v-col cols="12" sm="12" class="p-0">
                                                <div class="form-group">
                                                    <p>Confirm password</p>
                                                    <v-text-field v-model="confirmedPassword" :value1="userPassword" placeholder="Confirm password" :append-icon="value1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (value1 = !value1)" :type="value1 ? 'password' : 'text'" :rules="confirmedPasswordRules" @input="_=>userPassword=_" single-line outlined required>
                                                    </v-text-field>
                                                </div>
                                            </v-col>

                                            <v-col cols="12" sm="12" class="p-0">
                                                <v-alert v-show="createpwderr" dense outlined type="error" class="alert_txt">
                                                    <p v-if="displayMsgArr.length">
                                                        <b>Please correct the following error(s): </b>
                                                        <ul>
                                                            <li v-for="error in displayMsgArr" v-bind:key="error">{{ error }}</li>
                                                        </ul>
                                                    </p>
                                                    <p v-else>
                                                        {{dispMsg}}
                                                    </p>
                                                </v-alert>

                                                <v-btn x-large color="success" class="w-100" dark @click="validate">Create password</v-btn>
                                            </v-col>
                                        </v-form>
                                    </div>
                                    <!-- End Login Form section -->
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
    name: 'SignUp',
    components: {},
    data() {
        return {
            // password
            createpwderr: false,
            displayMsgArr: [],
            dispMsg: "",
            timestamp: "",
            noneseKey: "",
            userPassword: "",
            password: "",
            confirmedPassword: "",
            valid: true,
            value: true,
            value1: true,
            rules: {
                required: value => !!value || "Required.",
                password: value => {
                    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
                    return (
                        pattern.test(value) ||
                        "Password length must contain minimum 8 characters and maximum 30( inclusion of upper case, lower case, alphanumeric, special character)"
                    );
                }
            },
            confirmedPasswordRules: [
                v => !!v || 'Confirmation Password is required',
                () => (this.password === this.confirmedPassword) || 'Password must match'
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
        this.myResult = this.$route.path.split("/");
        this.timestamp = this.myResult[2];
        this.verificationStatus();
        this.websiteUrl = process.env.VUE_APP_WEBSITE_URL
    },
    methods: {
        verificationStatus: function () {
            var self = this
            let timestamp = this.timestamp
            const apiUrl = process.env.VUE_APP_API_URL + 'verification-status';
            let bodyFormData = {
                "encrypt_user_id": timestamp
            }
            axios({
                    method: 'post',
                    url: apiUrl,
                    data: qs.stringify(bodyFormData)
                })
                .then(function (response) {
                    //handle success 
                    self.verification_status = response.data.Result.status;
                    if (self.verification_status == "A") {
                        self.snackbar_text = "Already verified your account."
                        self.snackbar = true
                        setTimeout(function () {
                            window.location.href = "/";
                            //window.location.href = "/";
                        }, 2000);
                    } else {
                        self.createPwdForm = "verify";
                        self.snackbar_text = "Your account has been successfully verified, please create your login password here."
                        self.snackbar = true
                    }
                })
                .catch(function () {
                    //handle error
                    window.location.href = "/";
                });
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.createPassword()
            }
        },
        createPassword: function () {
            var self = this
            let password = this.password
            let confirmedPassword = this.confirmedPassword
            let timestamp = this.timestamp
            self.displayMsgArr = [];
            const apiUrl = process.env.VUE_APP_API_URL + 'createPassword';
            let bodyFormData = {
                "password": password,
                "confirmedpassword": confirmedPassword,
                "encrypt_user_id": timestamp,
                "email_verification_status": "A"
            }
            axios({
                    method: 'post',
                    url: apiUrl,
                    data: qs.stringify(bodyFormData)
                })
                .then(function (response) {
                    //handle success 
                    if (response.data.Success == true) {
                        self.snackbar_text = "Password created successfully, Please login into your account."
                        self.snackbar = true
                        setTimeout(function () {
                            window.location.href = "/";
                            //window.location.href = "/";
                        }, 3000);
                    } else {
                        self.createpwderr = true
                        let resmsg = response.data.Result;
                        Object.keys(resmsg).forEach(value => {
                            self.displayMsgArr = self.displayMsgArr.concat(resmsg[value]);
                        });

                    }
                })
                .catch(function (err) {
                    //handle error
                    self.createpwderr = true
                    self.dispMsg = err.response.data.Result;

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
