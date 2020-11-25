<template>
    <v-app >
         <v-container class="py-5 account_wrapper_main">
             
             <v-col cols="12" class="p-2" md="8" offset-md="2" >
                 <v-col cols="12" class="settingswrap" :class="exchangefee==false ? '' : 'active_sbox'">
                    <div class="w-100" v-on:click="exchangefee = !exchangefee"><span class="font-weight-bold">Set payment fee mode</span>
                        <span v-if="exchangefee" aria-hidden="true" class="float-right select_sbtn">CLOSE</span>
                        <span v-else aria-hidden="true" class="float-right unselect_sbtn">EDIT</span>
                    </div>
                    <v-col v-if="exchangefee" class="fee_select pt-8">
                        <v-radio-group v-model="fee_mode" v-on:change="showPopup()">
                            <v-radio :label="`Pay with Base Currency ( Maker ${this.userInfo.All_bc_maker_fee}% / Taker ${this.userInfo.All_bc_taker_fee}%)`" value="baseCurrency"></v-radio>
                            <v-radio :label="`Pay with EVR ( Maker ${this.userInfo.EVR_maker_fee}% / Taker ${this.userInfo.EVR_taker_fee}% )`" value="evr"></v-radio>
                        </v-radio-group>
                    </v-col>
                 </v-col>
                 
             </v-col>
             

         </v-container>

             <!-- Attention modal popup -->
     <template>
        <v-row justify="center" class="float-left">
            <v-dialog v-model="feeMode_modal" persistent max-width="500px">
                <v-card justify="center" class="text-center white-bg" style="border: solid 1px #22E627;">
                    <v-card-text class="p-5 black-txt">
                        <v-container>
                            <img alt="Alert" src="../../../assets/images/danger-popup-icon.png" width="100" class="img-fluid" />
                            <h4 class="headline font-weight-bold my-2">Are you sure?</h4>
                            <h5 class="subtitle-1 my-2">You want to pay fee with <strong>{{fee_mode_text}}</strong></h5>

                            <v-card-actions class="close_btn_wrp">
                                <v-icon class="black-txt" v-on:click="cancelPopup">mdi-close</v-icon>
                            </v-card-actions>

                            <v-btn-toggle class="mt-4" borderless>
                                <v-btn value="left" class="red accent-4 w-50 px-7 py-2" v-on:click="cancelPopup">
                                    <span class="hidden-sm-and-down">Cancel</span>
                                </v-btn>

                                <v-btn value="right" class="green darken-1 w-50 px-7 py-2" :loading="loading" :disabled="loading" v-on:click ="setPaymentFee">
                                    <span class="hidden-sm-and-down">Yes, proceed</span>
                                </v-btn>
                            </v-btn-toggle>
                        </v-container>

                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </template>

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
        name: 'Settings',
        props: {
            userInfo: {},
        },
        data() {
            return {
                exchangefee: false,
                //fee_mode: 'baseCurrency',
                fee_mode2: '',
                feeMode_modal: false,
                fee_mode_text: '',
                snackbar: false,
                snackbar_text: "",
                vertical: true,
                timeout: 6000,
                color: "yellow",
                x: 'right',
                y: 'top',
                loading: false,
            }
        },
        computed: {        
            fee_mode: {
                // getter
                get: function () {
                    if (this.userInfo.payment_fee_mode == 1) {
                        return "evr";
                    } else if (this.userInfo.payment_fee_mode == 0) {
                        return "baseCurrency";
                    } else {
                        return null;
                    }
                },
                // setter
                set: function (newValue) {
                    this.fee_mode2 = newValue;
                    console.log(newValue)
                }
            },
        },
        watch: {
            // fee_mode2() {
            //    this.fee_mode = this.fee_mode2
            //    alert(this.fee_mode)
            // }
        },
        methods: {
            showPopup: function(){
                var fee_mode1;
                if (this.fee_mode2 != "") {
                    fee_mode1 = this.fee_mode2
                } else {
                    fee_mode1 = this.userInfo.payment_fee_mode
                }
                var fee_mode_txt;
                if(fee_mode1 == 'evr'){
                    fee_mode_txt = 'EVR'
                }else{
                    fee_mode_txt = 'Base Currency'
                }
                this.fee_mode_text = fee_mode_txt
                this.feeMode_modal = true
            },
            cancelPopup: function(){
                 
                if(this.fee_mode2 == 'evr'){
                    this.fee_mode = 'baseCurrency'
                }else{
                    this.fee_mode = 'evr'
                }
                this.exchangefee = false
                this.feeMode_modal = false
            },
            setPaymentFee: function(){
                this.loading = true;
                var self = this;
                var fee_mode1;
                if (this.fee_mode2 != "") {
                    fee_mode1 = this.fee_mode2
                } else {
                    fee_mode1 = this.userInfo.payment_fee_mode
                }
                let auth_token = this.$store.getters.authToken;
                if (auth_token) {
                    const apiUrl = process.env.VUE_APP_API_URL + 'setPaymentFeeMode';
                    let bodyFormData = {
                        "payment_fee_mode": fee_mode1
                    }
                    axios({
                            method: 'post',
                            url: apiUrl,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            },
                            data: qs.stringify(bodyFormData),
                        })
                        .then(function (response) {
                            //handle success 
                            self.getUserInfo()
                                self.feeMode_modal = false
                                setTimeout(function(){
                                    self.loading = false;
                                },500);
                                self.snackbar_text = response.data.Result
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
                            }
                            else if(err.response.data.Result == 'Twofa Status Inactive'){
                                self.snackbar_text = "Please Activate Two-Factor Authentication."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/Security";
                                },2000)
                            }
                            else{
                                window.location.href = "/";
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
        },
    };
</script>