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
                                            <h1 class="f40">Reset</h1>
                                            <p>your password</p>
                                        </div>
                                    </div>

                                    <!-- Login Form section -->
                                    <div class="userregistration_form_wrp">
                                        <v-form ref="form" v-model="valid">
                                            <v-col cols="12" sm="12" class="p-0">
                                                <div class="form-group">
                                                    <p>New password</p>
                                                    <v-text-field autocomplete="current-password" v-model="password" :value="userPassword" placeholder="Create new password" :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (value = !value)" :type="value ? 'password' : 'text'" :maxlength="36" :rules="[rules.password]" @input="_=>password=_" single-line outlined required hide-details="auto">
                                                    </v-text-field>
                                                </div>
                                            </v-col>

                                            <v-col cols="12" sm="12" class="p-0">
                                                <div class="form-group">
                                                    <p>Confirm password</p>
                                                    <v-text-field autocomplete="current-password" v-model="confirmedPassword" :value1="userPassword" placeholder="Confirm password" :append-icon="value1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (value1 = !value1)" :type="value1 ? 'password' : 'text'" :rules="confirmedPasswordRules" @input="_=>userPassword=_" single-line outlined required hide-details="auto">
                                                    </v-text-field>
                                                </div>
                                            </v-col>

                                            <v-col cols="12" sm="12" class="p-0">
                                                <v-alert v-show="resetpwderr" dense outlined type="error" class="alert_txt">
                                                    <p v-if="displayMsgArr.length">
                                                        <b>Please correct the following error(s): </b>
                                                        <ul>
                                                            <li v-for="error in displayMsgArr" v-bind:key="error">{{ error }}</li>
                                                        </ul>
                                                    </p>
                                                    <p v-else>
                                                        {{displayMsg}}
                                                    </p>
                                                </v-alert>
                                                <v-btn x-large color="success" class="w-100" dark @click="validate">Change password</v-btn>
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
    name: 'ResetPassword',
    components: {},
    data() {
        return {
            resetpwderr: false,
            displayMsgArr: [],
            displayMsg: "",
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
    created: function () {
        this.myResult = this.$route.path.split("/");
        this.timestamp = this.myResult[2];
    },
    mounted: function () {
        this.websiteUrl = process.env.VUE_APP_WEBSITE_URL
    },
    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.resetPassword()
            }
        },
        resetPassword: function () {
            var self = this;
            let password = this.password
            let confirmedPassword = this.confirmedPassword
            let timestamp = this.timestamp
            const apiUrl = process.env.VUE_APP_API_URL + 'reset-password';
            let bodyFormData = {
                "password": password,
                "confirmedpassword": confirmedPassword,
                "encrypt_user_id": timestamp
            }
            axios({
                    method: 'post',
                    url: apiUrl,
                    data: qs.stringify(bodyFormData)
                })
                .then(function (response) {
                    //handle success                           
                    if (response.data.Success == true) {
                        self.snackbar_text = "Your password has been reset successfully."
                        self.snackbar = true
                        setTimeout(() => {
                            self.resetpwderr = false
                            self.displayMsg = "";
                            window.location.href = "/";
                            //window.location.href = "/";
                        }, 3000)
                    } else {
                        self.resetpwderr = true
                        self.displayMsgArr = [];
                        let resmsg = response.data.Result;
                        Object.keys(resmsg).forEach(value => {
                            self.displayMsgArr = self.displayMsgArr.concat(resmsg[value]);
                        });
                    }
                })
                .catch(function (err) {
                    //handle error
                    self.resetpwderr = true
                    self.displayMsgArr = [];
                    self.displayMsg = err.response.data.Result;
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
