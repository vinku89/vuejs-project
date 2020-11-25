<template>
<div >
    <div v-show="profileDiv">
        <v-container class="py-5 account_wrapper_main account_wrapper_main_profile">
            <v-col cols="12" xl="8" offset-xl="2">
                <h5 class="mb-5">Contact Information & Details</h5>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field label="First Name" v-model="userInfo.first_name" disabled placeholder="Enter First Name" @keypress="checkSpaces(1)" @paste="copyText(1,$event)" required outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="Last Name" v-model="userInfo.last_name" disabled placeholder="Enter Last Name" @keypress="checkSpaces(2)" @paste="copyText(2,$event)" required outlined></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <div class="form-group">
                                <template>
                                    <v-container class="p-0">
                                        <!-- <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="dateFormatted" disabled persistent-hint @blur="date = parseDate(dateFormatted)" v-on="on" readonly :rules="birthdateRules" required outlined placeholder="Select Date" label="Birth Date" append-icon="event"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" :max="new Date().toISOString().substr(0, 10)" min="1940-01-01" no-title @input="menu1 = false"></v-date-picker>
                                        </v-menu>
                                        <p v-show="false">{{ date }}</p> -->
                                        <v-text-field v-model="dateofbirth" disabled persistent-hint readonly outlined placeholder="Select Date" label="Birth Date" append-icon="event"></v-text-field>
                                    </v-container>
                                </template>

                            </div>
                        </v-col>
                        <v-col cols="12" md="3" class="mx-auto">
                            <v-layout row align-center>
                                <v-radio-group class="mx-auto" disabled row v-model="gender" required>
                                    <v-radio label="Male" value="male"></v-radio>
                                    <v-radio label="Female" value="female"></v-radio>
                                </v-radio-group>
                            </v-layout>

                        </v-col>
                        <v-col cols="12" md="5">
                            <!-- <v-select @change="changedValue" v-bind:items="countryList" item-text="text" item-value="value" 
                        v-model="userInfo.nationality" label="Nationality" placeholder="Select Country" outlined :rules="nationalityRules" class="" required> </v-select>-->

                            <v-autocomplete @change="changedValue" v-bind:items="countryList" item-text="text" item-value="value" v-model="userInfo.nationality" label="Nationality" placeholder="Select Country" outlined :rules="nationalityRules" class="" required dense filled></v-autocomplete>

                            <!-- <v-icon>mdi-chevron-down</v-icon> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">

                            <div class="form-group">
                                <v-row>
                                    <v-col cols="12" sm="4" xl="4" class="pr-0 pt-0">
                                        <v-text-field outlined label="Country Code" v-model="country_code" readonly class="input_radius2"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="8" xl="8" class="pl-0 pt-0">
                                        <v-text-field class="input_radius inputArrows" type="number" label="Mobile Number" placeholder="Enter Mobile Number" outlined v-model="userInfo.mobile_number" :rules="mobileRules"></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- <vue-tel-input v-model="userInfo.mobile_number" v-bind="bindProps" label="Phone Number" placeholder="Enter Phone Number" outlined :rules="mobileRules" required></vue-tel-input> -->

                            </div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field label="E-mail address" placeholder="Enter E-mail address " outlined disabled v-model="userInfo.email"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-alert v-if="profileError.length" dense outlined type="error">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in profileError" v-bind:key="error">{{ error }}</li>
                        </ul>
                    </v-alert>

                    <v-btn @click="validate" large color="success">
                        <v-icon left style="transform: rotatex(180deg) !important;">mdi-reload</v-icon> Submit
                    </v-btn>
                </v-form>

            </v-col>
        </v-container>
    </div>
    <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_text }}

        <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>
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
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'Profiletab',
    singleExpand: false,
    components: {},
    props: {
        userInfo: {},
        referralList: {}
    },
    data: vm => ({
        profileDiv: true,
        overlay1: false,
        absolute: true,
        selectedItems: [],
        country_code: '',
        nationality: '',
        //userInfo: [],
        date: '',
        //date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu1: false,

        gender2: "",
        valid: true,
        firstnameRules: [
            v => !!v || 'First Name is required',
            v => (v && v.length >= 3) || 'First Name must have 3+ characters',
            v => (v && v.length <= 30) || 'Name must be less than 30 characters',
            v => /^[a-zA-Z0-9\s]+$/.test(v) || 'First Name should be Alpha-Numeric only.'
        ],
        lastnameRules: [
            v => !!v || 'Last Name is required',
            v => (v && v.length >= 3) || 'Last Name must have 3+ characters',
            v => (v && v.length <= 30) || 'Name must be less than 30 characters',
            v => /^[a-zA-Z0-9\s]+$/.test(v) || 'Last Name should be Alpha-Numeric only.'
        ],
        birthdateRules: [
            v => !!v || 'Birth Date is required',
        ],
        mobileRules: [
            v => !!v || 'Mobile Number is required',
            v => (v && v.length <= 15) || 'Mobile Number format not valid'
        ],
        nationalityRules: [
            v => !!v || 'Nationality is required',
        ],
        items: ['Select', 'Malaysia', 'India', 'Indonesia', 'Singapore'],
        items2: [],
        menu: false,
        snackbar: false,
        snackbar_text: "",
        vertical: true,
        timeout: 6000,
        color: "yellow",
        x: 'right',
        y: 'top',
        profileError: [],
        countryList: [],

    }),
    computed: {        
        gender: {
            // getter
            get: function () {
                if (this.userInfo.gender == "male") {
                    return "male";
                } else if (this.userInfo.gender == "female") {
                    return "female";
                } else {
                    return null;
                }
            },
            // setter
            set: function (newValue) {
                this.gender2 = newValue;
            }
        },
        dateofbirth: {
            get: function () {
                return this.formatDate(this.userInfo.birth_date)
            },
            set: function (newValue) {
                this.dateofbirth = newValue;
            }
        },

    },
    watch: {
        date() {
            this.dateFormatted = this.formatDate(this.date)
        }
    },
    methods: {         
        checkSpaces: function(type){
                let wsRegex = /^\s*\s*$/;
                if(type == 1){
                    this.userInfo.first_name = this.userInfo.first_name.replace(wsRegex, '');
                }else if(type == 2){
                    this.userInfo.last_name = this.userInfo.last_name.replace(wsRegex, '');
                }                
            },
        copyText: function(type, event) {
                event.preventDefault();
                let data = event.clipboardData.getData('text')
                let txt = data.replace(/\s/g,"")
                if(type == 1){
                    this.userInfo.first_name = txt
                }else if(type == 2){
                    this.userInfo.last_name = txt
                }
            },
        changedValue: function (e) {
            if (e) {
                this.country_code = "+" + e[0]
            } else {
                this.country_code = "0"
            }
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        save(date) {
            this.$refs.menu.save(date)
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.updateProfile()
            }
        },
        getUserInfo: function () {
            this.overlay1 = true
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
                        self.countriesList()
                        // self.dateFormatted = self.userInfo.birth_date
                        // self.date = self.userInfo.birth_date
                        // self.profileDiv = true
                         self.overlay1 = false
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
            } else {
                window.location.href = "/";
            }

        },
        countriesList: function () {
            var self = this;
            let auth_token = this.$store.getters.authToken;

            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "getCounties";
                axios({
                        method: 'get',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        }                            
                    })
                    .then(function (response) {
                        //handle success 
                        let cList = response.data.Result;
                        self.countryList = self.countryList.concat({
                            text: 'Select Country',
                            value: 0
                        });
                        Object.keys(cList).forEach(value => {
                            if (cList[value].country_id == self.userInfo.nationality) {
                                self.country_code = "+" + cList[value].currencycode
                                self.userInfo.nationality = [cList[value].currencycode, cList[value].country_id]
                            }

                            self.countryList = self.countryList.concat({
                                text: cList[value].country_name,
                                value: [cList[value].currencycode, cList[value].country_id]
                            });
                        });
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
            } else {
                window.location.href = "/";
            }

        },
        updateProfile: function () {
            var self = this;
            var gender1;
            let user_id = this.$store.getters.loggedUserId;
            //let session_key = this.$store.getters.session_key;
            let auth_token = this.$store.getters.authToken;

            let first_name = this.userInfo.first_name
            let last_name = this.userInfo.last_name
            if (this.gender2 != "") {
                gender1 = this.gender2
            } else {
                gender1 = this.userInfo.gender
            }

            let date = this.date
            let nationality = this.userInfo.nationality[1]

            let telephone = this.userInfo.mobile_number
            if (auth_token) {
                this.profileError = [];
                const apiUrl = process.env.VUE_APP_API_URL + 'update-profile';
                let bodyFormData = {
                    "user_id": user_id,
                    "first_name": first_name,
                    "last_name": last_name,
                    "birth_date": date,
                    "gender": gender1,
                    "nationality": nationality,
                    "mobile_number": telephone,
                    "token": auth_token
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
                    .then(function () {
                        //handle success 
                        localStorage.setItem('first_name', self.userInfo.first_name)
                        // let acttwofaStatus = localStorage.getItem('acttwofaStatus')
                        // if (acttwofaStatus == 'A') {
                        //     localStorage.setItem('verfdTwofa', 'V')
                        //     localStorage.removeItem('acttwofaStatus')
                        //     self.snackbar_text = "User information updated successfully."
                        //     self.snackbar = true
                        //     setTimeout(() => {
                        //         self.$router.push('/wallets')
                        //     }, 2000)
                        // } else {
                            self.snackbar_text = "User information updated successfully."
                            self.snackbar = true
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
                        }
                        else if(err.response.data.Result == 'Twofa Status Inactive'){
                                self.snackbar_text = "Please Activate Two-Factor Authentication."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/Security";
                                },2000)
                            }
                        else{
                            let resmsg = err.response.data.Result;
                            Object.keys(resmsg).forEach(value => {
                                self.profileError = self.profileError.concat(resmsg[value]);
                            });
                        }                        
                    });
            } else {
                window.location.href = "/";
            }

        },
    },
    mounted:function(){
        this.countriesList()
    },
    created() {
        this.getUserInfo()
        //this.countriesList()
    }
};
</script>
