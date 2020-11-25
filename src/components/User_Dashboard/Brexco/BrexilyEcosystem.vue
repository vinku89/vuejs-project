<template>
<v-app>
    <TopBar :userInfo="loggedUserInfo"/>
    <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_text }}

        <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>
    <v-snackbar v-model="snackbar_err" color="red" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_err_text }}

        <v-icon @click="snackbar_err = false" class="close_snak">mdi-close</v-icon>
        <!-- <v-btn dark text @click="snackbar_err = false" style="color: #000;">
            Close
        </v-btn> -->
    </v-snackbar>
    <v-container fluid class="frame-pt pb-0" style="background-color: #eceef1 !important;">
        <v-row>
            <div class="banner_gradiant">
                <v-container>
                    <v-col class="text-center">
                        <div class="brexco-banner-bg"></div>
                        <div class="banner-content">
                            <h1 class="mb-5">Brexily Ecosystem</h1>
                            <p class="mb-0">One stop online crypto payment method to purchase flight tickets, hotel bookings, bill </p>
                            <p>payments, mobile reload and many more that makes online transactions easy and safe for you</p>
                        </div>
                    </v-col>
                    <div class="banner_white_patch">
                        <div class="text-center position-relative">
                            <div class="d-inline-block pt-4 country-selection-wrp">
                                <h5 class="mb-5"><span class="red_txt">*</span>Please choose your country option.</h5>
                                    <v-autocomplete hide-details @click="selectecountry" @change="changedCountryValue" v-model="user_country" v-bind:items="countryList" single-line outlined placeholder="Please select country" class="country-selection"></v-autocomplete>
                                <div class="error_msg w-100" v-show="countrysel">
                                    Please choose country
                                </div>
                            </div>
                        </div>
                    </div>
                </v-container>
            </div>
        </v-row>
        <div>
            <v-col class="brexco_services_wrp">
                <v-container fluid class="px-0">
                    <v-container class="position-relative">
                                <h5 class="black_txt text-center">Choose your preferred crypto utilities payment</h5> 
                                <v-icon class="expand_icon col-md-4"  @click="toggle" :class="shown==false ? 'iconclose' : 'iconopen'">mdi-plus-box-outline</v-icon>
                     </v-container>

                     <div v-show="shown">
                           <v-row>
                                            <v-container>
                                                <v-col xl="10" offset-xl="1">
                                                <div class="banner_white_patch rounded-0">
                                                    <v-row id="myapp2" >
                                                        <!-- Disable box -->
                                                        <v-col cols="3" md="3" class="mb-4" v-for="service in services" :key="service.service_id">
                                                       
                                                                
                                                            <div class="brexco_box " :class="(service.is_active==1 && (activeServices.includes(service.portal_service_id)) ? (service.service_id==servicesel? 'active_box' : 'test') : 'disable_box_text')">
                                                                <div class="disable_box" v-show="service.is_active==1 && activeServices.includes(service.portal_service_id)? false : true"  ></div>

                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">{{service.service_name}}</h5>
                                                                    <img :src="`${app_url}brexco_images/${service.service_logo}`" class="my-2"/>
                                                                    <p class="mb-0">{{service.service_description}}</p>

                                                                </div>
                                                                <a class="pay_btn" @click="mblrd(service)">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">E-wallet reload</h5>
                                                                    <img src="../../../assets/images/e-wallet-reload.png" alt="" class="my-2">
                                                                    <p class="mb-0">Top up e-wallet with</p>
                                                                    <p class="mb-0">crypto &amp; receive in fiat</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                        
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">water utility</h5>
                                                                    <img src="../../../assets/images/water-utility.png" alt="" class="my-2">
                                                                    <p class="mb-0">Pay your water bill</p>
                                                                    <p class="mb-0">account dues</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                    
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">public transport</h5>
                                                                    <img src="../../../assets/images/public-transport.png" alt="" class="my-2">
                                                                    <p class="mb-0">Travel ticketing easy</p>
                                                                    <p class="mb-0">with seamless payments</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">insurance</h5>
                                                                    <img src="../../../assets/images/insurance.png" alt="" class="my-2">
                                                                    <p class="mb-0">Pay your life insurance </p>
                                                                    <p class="mb-0">policy premiums</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">healthcare</h5>
                                                                    <img src="../../../assets/images/healthcare.png" alt="" class="my-2">
                                                                    <p class="mb-0">Hospital and health care</p>
                                                                    <p class="mb-0">medical bills</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                    
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">education</h5>
                                                                    <img src="../../../assets/images/education.png" alt="" class="my-2">
                                                                    <p class="mb-0">Repayment education</p>
                                                                    <p class="mb-0">loan and college fee</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">petrol</h5>
                                                                    <img src="../../../assets/images/petrol.png" alt="" class="my-2">
                                                                    <p class="mb-0">Manage your fuel cards</p>
                                                                    <p class="mb-0">payment</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                        
                                                        <v-col cols="3" md="3" class="mb-4">
                                                            <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                <div class="p-3">
                                                                    <h5 class="text-uppercase black_txt font-weight-bold">Gold</h5>
                                                                    <img src="../../../assets/images/gold.png" alt="" class="my-2">
                                                                    <p class="mb-0">Complete your gold and</p>
                                                                    <p class="mb-0">silver purchase</p>
                                                                </div>
                                                                <a class="pay_btn">
                                                                    pay
                                                                </a>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                                </v-col>
                                            </v-container>
                           </v-row>
                                        
                         <v-row>
                                            <v-col class="light-green-bg pb-4">
                                                <v-row>
                                                    <v-container class="px-8">
                                                        <v-col md="10" offset-md="1">
                                                             <h5 class="mb-5 text-center black_txt ligreen_title">Choose your preferred crypto booking payment</h5>
                                                        <v-row>
                                                            <v-col cols="3" md="3" class="mb-4">
                                                                <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                    <div class="p-3">
                                                                        <h5 class="text-uppercase black_txt font-weight-bold">flight booking</h5>
                                                                        <img src="../../../assets/images/flight-booking.png" alt="" class="my-2">
                                                                        <p class="mb-0">Gets you anywhere in</p>
                                                                        <p class="mb-0">the world</p>
                                                                    </div>
                                                                    <a class="pay_btn">
                                                                        pay
                                                                    </a>
                                                                </div>
                                                            </v-col>
                                                            <v-col cols="3" md="3" class="mb-4">
                                                                <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                    <div class="p-3">
                                                                        <h5 class="text-uppercase black_txt font-weight-bold">hotel booking</h5>
                                                                        <img src="../../../assets/images/hotel-booking.png" alt="" class="my-2">
                                                                        <p class="mb-0">allows cashless instant</p>
                                                                        <p class="mb-0">booking</p>
                                                                    </div>
                                                                    <a class="pay_btn">
                                                                        pay
                                                                    </a>
                                                                </div>
                                                            </v-col>
                                                            <v-col cols="3" md="3" class="mb-4">
                                                                <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                    <div class="p-3">
                                                                        <h5 class="text-uppercase black_txt font-weight-bold">car booking</h5>
                                                                        <img src="../../../assets/images/car-booking.png" alt="" class="my-2">
                                                                        <p class="mb-0">Pay for your car rental</p>
                                                                        <p class="mb-0">reservation</p>
                                                                    </div>
                                                                    <a class="pay_btn">
                                                                        pay
                                                                    </a>
                                                                </div>
                                                            </v-col>
                                                            <v-col cols="3" md="3" class="mb-4">
                                                                <div class="brexco_box disable_box_text">
                                                                <div class="disable_box"></div>
                                                                    <div class="p-3">
                                                                        <h5 class="text-uppercase black_txt font-weight-bold">Holiday Packages</h5>
                                                                        <img src="../../../assets/images/holiday-packages.png" alt="" class="my-2">
                                                                        <p class="mb-0">Travel, Tour &amp; Holiday </p>
                                                                        <p class="mb-0">packages</p>
                                                                    </div>
                                                                    <a class="pay_btn">
                                                                        pay
                                                                    </a>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                        </v-col>
                                                       
                                                    </v-container>
                                                </v-row>
                                            </v-col>
                                        </v-row> 
                     </div>
                    
                    
                       
                </v-container>
            </v-col>
       
        </div>
        <div v-show="reloadOption">
             <MobileReload v-on:childToParent="onChildClick" :serviceData="service" :selCountry="selectedCountry" :countryCode="countryCode" :operatorsList="operators" :key="refreshMobile" /> 
                 <!-- <EwalletReload /> -->
        </div>
        <div v-show="internetreloadOption">
             <InternetReload v-on:childToParent="onChildClick" :serviceData="service" :selCountry="selectedCountry" :countryCode="countryCode" :operatorsList="operators" :key="refreshMobile" /> 
        </div>
        <div v-show="utilitiesreloadOption">
             <UtilitiesReload v-on:childToParent="onChildClick" :serviceData="service" :selCountry="selectedCountry" :countryCode="countryCode" :operatorsList="operators" :key="refreshMobile" /> 
        </div>
        <div v-show="giftCardreloadOption">
             <GiftCardReload v-on:childToParent="onChildClick" :serviceData="service" :selCountry="selectedCountry" :countryCode="countryCode" :operatorsList="operators" :key="refreshMobile" /> 
        </div>
        <div v-show="landlinereloadOption">
             <LandlineReload v-on:childToParent="onChildClick" :serviceData="service" :selCountry="selectedCountry" :countryCode="countryCode" :operatorsList="operators" :key="refreshMobile" /> 
        </div>
        <div v-show="televisionreloadOption">
             <TelevisionReload v-on:childToParent="onChildClick" :serviceData="service" :selCountry="selectedCountry" :countryCode="countryCode" :operatorsList="operators" :key="refreshMobile" /> 
        </div>
        <div v-show="voIPreloadOption">
             <VoIPReload v-on:childToParent="onChildClick" :serviceData="service" :selCountry="selectedCountry" :countryCode="countryCode" :operatorsList="operators" :key="refreshMobile" /> 
        </div>
    </v-container>
     <v-overlay :value="overlay" style="z-index:205;" v-on:parentLoader="onChildLoader">
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
    <v-snackbar v-on:childSnack="onChildSnakShow" v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
        {{ snackbar_text }}
        <v-btn dark text @click="snackbar = false" style="color: #000;">
            Close
        </v-btn>
    </v-snackbar>
    <!-- no service to the country -->
            <template>
              <v-row justify="center">
                <v-dialog v-model="noServicesAlert" persistent max-width="500" content-class="confirmation2fa">
                  <v-card class="text-center">
                    <h4 class="text-center font-weight-bold mb-8">Alert</h4>
                    
                   <v-icon class="red_txt" style="font-size: 65px;">mdi-close-circle</v-icon>

                    <p class="mb-0 f18">Sorry,This Country not providing any services</p>
                    
                      <v-card-actions class="close_btn_wrp ">
                          <v-icon class="black_txt" @click="close_success_popup()">mdi-close</v-icon>
                      </v-card-actions>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" class="w-100"  @click="close_success_popup()">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
</v-app>
</template>

<script>
import axios from 'axios';
import TopBar from '../TopBar';
import MobileReload from '../Brexco/MobileReload';
import InternetReload from '../Brexco/InternetReload';
import UtilitiesReload from '../Brexco/UtilitiesReload';
import GiftCardReload from '../Brexco/GiftCardReload';
import LandlineReload from '../Brexco/LandlineReload';
import TelevisionReload from '../Brexco/TelevisionReload';
import VoIPReload from '../Brexco/VoIPReload';
// import EwalletReload from '../Brexco/EwalletReload';
export default {
    el: '#myapp',
    name: 'BrexilyEcosystem',
    components: {
        TopBar,
        MobileReload,
        InternetReload,
        UtilitiesReload,
        GiftCardReload,
        LandlineReload,
        TelevisionReload,
        VoIPReload
        // EwalletReload,
    },
    props: {
        referralList: {}
    },
    data: () => ({
        refreshMobile: 0,
        loggedUserInfo: [],
        countryList: [],
        user_country:'',
        selectedCountry:'',
        closeopen: true,
        countryCode:"",
        shown: true,
        mblreload: true,
        gftcardreload: true,
        panel: [0],
        services:[],
        activeServices:[],
        app_url:'',
        reloadOption:false,
        internetreloadOption:false,
        utilitiesreloadOption:false,
        giftCardreloadOption:false,
        landlinereloadOption:false,
        televisionreloadOption:false,
        voIPreloadOption:false,
        service:[],
        operators:[],
        countrysel:false,
        //refresh: false
        absolute: true,
        overlay: false,
        noServicesAlert:false,
        servicesel: ''

    }),
     methods: {
          onChildClick(value) {
                console.log(value)
                this.shown=true;
                this.reloadOption=false;
                this.internetreloadOption=false;
                this.utilitiesreloadOption=false;
                this.giftCardreloadOption=false;
                this.landlinereloadOption=false;
                this.televisionreloadOption=false;
                this.voIPreloadOption=false;
            },
            close_success_popup:function(){
                this.noServicesAlert=false;
            },
    toggle() {
      this.shown = !this.shown;
    },
    mblrd(service){
        //alert(MobileReload.data.prepaid);
        //alert(this.selectedCountry);
        this.servicesel=service.service_id;
        this.refreshMobile++;
        if(this.selectedCountry=='' || typeof this.selectedCountry == 'undefined'){
            this.countrysel=true;
        }else{
            this.countrysel=false;
            this.service=service;
            this.loadOperators();
            
        }
        
        
    },
    loadOperators: function(){
        
        var self= this;
        self.overlay = true
        //alert(self.selectedCountry);
        let auth_token = this.$store.getters.authToken;
        if (auth_token) {
            const URL = process.env.VUE_APP_API_URL + "getCountryOperators/"+self.selectedCountry+"/"+self.service.portal_service_id;
            axios({
                method: 'get',
                url: URL,
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer " + auth_token
                }
            })
            .then(function (response) {
                self.operators = response.data.Result;
                self.shown = false;
                if(self.operators.length == 0){
                    self.reloadOption=false;
                    self.giftCardreloadOption=false;
                    self.utilitiesreloadOption=false;
                    self.televisionreloadOption=false;
                    self.internetreloadOption=false;
                    self.landlinereloadOption=false;
                    self.voIPreloadOption=false;
                    self.noServicesAlert=true;
                    
                }else{
                    if(self.service.portal_service_id == 1){
                        self.reloadOption=true;
                        self.giftCardreloadOption=false;
                        self.utilitiesreloadOption=false;
                        self.televisionreloadOption=false;
                        self.internetreloadOption=false;
                        self.landlinereloadOption=false;
                        self.voIPreloadOption=false;
                    }else if(self.service.portal_service_id == 2){
                        self.internetreloadOption=true;
                        self.reloadOption=false;
                        self.utilitiesreloadOption=false;
                        self.giftCardreloadOption=false;
                        self.televisionreloadOption=false;
                        self.landlinereloadOption=false;
                        self.voIPreloadOption=false;
                    }else if(self.service.portal_service_id == 3){
                        self.utilitiesreloadOption=true;
                        self.internetreloadOption=false;
                        self.reloadOption=false;
                        self.giftCardreloadOption=false;
                        self.televisionreloadOption=false;
                        self.landlinereloadOption=false;
                        self.voIPreloadOption=false;
                    }else if(self.service.portal_service_id == 4){
                        self.giftCardreloadOption=true;
                        self.reloadOption=false;
                        self.televisionreloadOption=false;
                        self.utilitiesreloadOption=false;
                        self.internetreloadOption=false;
                        self.landlinereloadOption=false;
                        self.voIPreloadOption=false;
                    }else if(self.service.portal_service_id == 5){
                        self.landlinereloadOption=true;
                        self.giftCardreloadOption=false;
                        self.reloadOption=false;
                        self.televisionreloadOption=false;
                        self.utilitiesreloadOption=false;
                        self.internetreloadOption=false;
                        self.voIPreloadOption=false;
                    }else if(self.service.portal_service_id == 6){
                        self.televisionreloadOption=true;
                        self.reloadOption=false;
                        self.giftCardreloadOption=false;
                        self.utilitiesreloadOption=false;
                        self.internetreloadOption=false;
                        self.landlinereloadOption=false;
                        self.voIPreloadOption=false;
                    }else if(self.service.portal_service_id == 9){
                        self.internetreloadOption=false;
                        self.reloadOption=false;
                        self.giftCardreloadOption=false;
                        self.televisionreloadOption=false;
                        self.landlinereloadOption=false;
                        self.utilitiesreloadOption=false;
                        self.voIPreloadOption=true;
                    }
                }
                //console.log(self.service.portal_service_id);
                
                self.overlay = false;
            })
            .catch(function () {
                self.snackbar_err_text = "Server busy, please try after sometime."
                self.snackbar_err = true
                setTimeout(() => {
                window.location.href = "/";
                },2000)
                
            });
        }
    },
    selectecountry:function(){
        document.body.classList.add("selectecountrydropwn");
    },
    changedCountryValue: function (e) {
        document.body.classList.remove("selectecountrydropwn");
        console.log("selected country "+e);
        if(e=='' || typeof e=='undefined'){
            this.countrysel=true;
            this.selectedCountry='';
        }else{
            //alert();
            this.countrysel=false;
            this.selectedCountry=e;
            this.shown = true;
            this.reloadOption=false;
            this.giftCardreloadOption=false;
            this.televisionreloadOption=false;
            this.landlinereloadOption=false;
            this.internetreloadOption=false;
            this.voIPreloadOption=false;
            //this.refresh= true;
            
            //alert(this.selectedCountry);
            this.getSelCountry(e);
        }
        
        
    },
    getSelCountry: function(country){
        var self= this;
        self.overlay=true;
        let auth_token = this.$store.getters.authToken;
        if (auth_token) {
            const URL = process.env.VUE_APP_API_URL + "brexco_sel_country_data/"+country;
            axios({
                    method: 'get',
                    url: URL,
                    headers: {
                        "accept": "application/json",
                        "Authorization": "Bearer " + auth_token
                    }
                })
                .then(function (response) {
                    self.overlay=false;
                    self.services = response.data.services
                    self.countryCode="+"+response.data.Result;
                    self.activeServices = response.data.active_services;   
                    //console.log('testse'); 
                    //console.log(self.activeServices);        
                })
                .catch(function () {
                    self.snackbar_err_text = "Server busy, please try after sometime."
                    self.snackbar_err = true
                    setTimeout(() => {
                    window.location.href = "/";
                    },2000)
                  
                });
        } else {
            window.location.href = "/";
        }
    },
    loadCountries: function(){
        var self= this;

        let auth_token = this.$store.getters.authToken;
        if (auth_token) {
            const URL = process.env.VUE_APP_API_URL + "brexco_countries_list";
            axios({
                    method: 'get',
                    url: URL,
                    headers: {
                        "accept": "application/json",
                        "Authorization": "Bearer " + auth_token
                    }
                })
                .then(function (response) {
                    //self.countryList = response.data.Result.countries
                    let cList = response.data.Result;
                    self.countryList = self.countryList.concat({
                        text: 'Select Country',
                        value: 0
                    });
                    Object.keys(cList).forEach(value => {
                        self.countryList = self.countryList.concat({
                            text: cList[value].name,
                            value: cList[value].iso_code
                        });
                        console.log("coutryls "+cList[value].iso_code);
                        console.log("coutryls self "+response.data.user_country);
                        self.countryCode="+"+response.data.country_code;
                        if(cList[value].iso_code==response.data.user_country){
                           self.user_country=response.data.user_country;
                           self.selectedCountry=response.data.user_country;
                           
                        }
                       // self.refresh= true;
                    });
                   
                    
                })
                .catch(function (err) {                    

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
                                self.snackbar_err_text = "Server busy, please try after sometime."
                                self.snackbar_err = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }
                  
                });
        } else {
            window.location.href = "/";
        }
    },
    loadServices: function(){
        var self= this;
        let auth_token = this.$store.getters.authToken;
        if (auth_token) {
            const URL = process.env.VUE_APP_API_URL + "getDefaultServices";
            axios({
                method: 'get',
                url: URL,
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer " + auth_token
                }
            })
            .then(function (response) {
                self.services = response.data.Result;
                self.activeServices = response.data.services;  
            })
            .catch(function (err) {
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
                                self.snackbar_err_text = "Server busy, please try after sometime."
                                self.snackbar_err = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }
                
            });
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
                
                self.loggedUserInfo = response.data.Result;
                if (response.data.Result.Twofa_status == 'D') {
                    self.dialog = true
                }
                
            })
            .catch(function (err) {
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

}
},
    //  methods: {
    //   toggleClass: function(event){
    //      this.isActive = !this.isActive;
    //   }
    // }
    
    mounted: function(){
        this.loadServices();
        this.loadCountries();
        this.app_url=process.env.VUE_APP_NAME;
        this.getUserInfo();
    }
};
</script>

<style lang="css" scoped>
@import "../../../../node_modules/vue-cool-select/dist/themes/material-design.css";
</style>