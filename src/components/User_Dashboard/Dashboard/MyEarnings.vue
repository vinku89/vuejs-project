<template>

    <v-container class="px-0">

        <template>
            <v-card class="earnbtc_tabs">
                   
                <v-tabs background-color="transparent" grow class="myearning_tabs">
                    <v-row>
                        <v-col cols="6">
                            <h5 class="font-weight-bold mb-6 text-uppercase mr-auto">MY EARNINGS</h5> 
                        </v-col>
                        <v-col cols="3">
                            <v-tab>
                                DAILY
                            </v-tab>
                        </v-col>
                        <v-col cols="3">
                            <v-tab>
                                MONTHLY
                            </v-tab>
                        </v-col>
                     
                    </v-row>
                    <!-- EARN BTC Trading -->
                    <v-tab-item class="mt-6">
                        <v-card flat>
                            <template>
                                <v-card>
                                    <v-row>
                                        <v-col cols="12" sm="3" >
                                             <v-select
                                                v-model="year"
                                                :items="years"
                                                item-value='id'
                                                item-text='name'
                                                return-object
                                                @change="getCalData()"
                                                label="2020"
                                                outlined
                                                :menu-props="{ bottom: true, offsetY: true }"
                                                class="remove_legend"
                                                single-line
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="3">
                                             <v-select
                                                v-model="month"
                                                :items="months"
                                                item-value='id'
                                                item-text='name'
                                                return-object
                                                label="January"
                                                outlined
                                                @change="getCalData()"
                                                :menu-props="{ bottom: true, offsetY: true }"
                                                class="remove_legend"
                                                single-line
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="text-right">
                                            <v-row class="text-right">
                                                <v-col ml-auto class="py-0">
                                                     
                                                     <h3 class="font-weight-bold mb-0">
                                                         <span class="mr-4 f16 font-weight-normal">Total Earnings: </span>
                                                         <span>{{addCommas(totalEarningsCrypto,4)}} <img src="../../../assets/images/all/tether.png" width="28px" height="28px" alt="usdt"></span>
                                                    </h3>
                                                </v-col>
                                               
                                            </v-row>
                                            <!-- <p class="text-right">{{addCommas(totalEarningsCrypto,8)}} USDT</p> -->
                                        </v-col>
                                    </v-row>

                                    <table class="table daily_calander">
                                        <tbody>
                                            <tr class="weekdays_names">
                                                <td>Monday</td>
                                                <td>Tuesday</td>
                                                <td>Wednesday</td>
                                                <td>Thursday</td>
                                                <td>Friday</td>
                                                <td>Saturday</td>
                                                <td>Sunday</td>
                                            </tr>
                                            <tr class="day_col" v-for="(cal, index) in calData" :key="`cal-${index}`">
                                                <td class="active_day"  v-for="(cal1, index1) in calData[index]" :key="`cal-date-${index1}`">
                                                    <span class="float-right f14">{{cal1.day}}</span>
                                                    <div class="d-inline-block pt-6">
                                                        <h3 class="green_txt" v-if="cal1.amountCrypto">{{cal1.amountCrypto >0?addCommas(cal1.amountCrypto,4):''}} <img src="../../../assets/images/all/tether.png" width="20px" height="20px" alt="usdt"></h3>
                                                        <h3 class="green_txt" v-else>{{cal1.amountCrypto >0?addCommas(cal1.amountCrypto,4):''}}</h3>
                                                        <!--<p>{{cal1.amountCrypto >0?addCommas(cal1.amountCrypto,8):''}} {{cal1.amountCryptoType}}</p>-->
                                                    </div>
                                                </td>
                                            </tr>
                  
                                        </tbody>
                                    </table>
                                </v-card>
                            </template>
                        </v-card>
                    </v-tab-item>
                    <!-- Join New Package-->
                    <v-tab-item class="mt-6">
                        <v-card flat>
                             <template>
                                <v-card>
                                    <v-row>
                                        <v-col cols="12" sm="3" >
                                             <v-select
                                                v-model="monthlyyear"
                                                :items="years"
                                                item-value='id'
                                                item-text='name'
                                                return-object
                                                @change="getMonthlyData()"
                                                label="2020"
                                                outlined
                                                :menu-props="{ bottom: true, offsetY: true }"
                                                class="remove_legend"
                                                single-line
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="9" class="text-right">
                                            <v-row class="text-right">
                                                <v-col ml-auto class="py-0">
                                                     
                                                     <h3 class="font-weight-bold mb-0">
                                                         <span class="mr-4 f16 font-weight-normal">Total Earnings: </span>
                                                         <span>{{addCommas(monthlyPayoutCrypto,4)}} <img src="../../../assets/images/all/tether.png" width="28px" height="28px" alt="usdt"></span>
                                                    </h3>
                                                </v-col>
                                               
                                            </v-row>
                                            <!--<p class="text-right">{{addCommas(monthlyPayoutCrypto,8)}} USDT</p>-->
                                        </v-col>
                                    </v-row>

                                    <v-col class="graph_div">
                                        <v-row class="graph_lines align-end">
                                             <div class="py-0 brex_levels" v-for="(graph, index) in graphData" :key="`graph-${index}`">
                                                    <h6 class="text-center mb-0 green_txt" style="font-size:18px;">{{graph.payoutAmountCrypto?addCommas(graph.payoutAmountCrypto,4):'0'}} {{graph.cryptoType}}</h6>
                                                    <!--<p class="text-center f11 mb-1 white_txt">{{graph.payoutAmountCrypto?addCommas(graph.payoutAmountCrypto,8):'0'}} {{graph.cryptoType}}</p>-->
                                                    <div class="line" :style="{'height': graph.height+'px'}"></div>
                                            </div>
                                        </v-row>
                                    </v-col>
                                     <v-col class="">
                                        <v-row class="graph_lines px-3">
                                            <!--1-->
                                            <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">JAN</h6>
                                            </div>
                                             <!--2-->
                                             <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">FEB</h6>
                                            </div>
                                             <!--3-->
                                             <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">MAR</h6>
                                            </div>
                                             <!--4-->
                                              <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">APR</h6>
                                            </div>
                                             <!--5-->
                                             <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">MAY</h6>
                                            </div>
                                             <!--6-->
                                              <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">JUNE</h6>
                                            </div>
                                             <!--7-->
                                              <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">JULY</h6>
                                            </div>
                                             <!--8-->
                                              <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">AUG</h6>
                                            </div>
                                             <!--9-->
                                              <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">SEP</h6>
                                            </div>
                                             <!--10-->
                                              <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">OCT</h6>
                                            </div>
                                             <!--11-->
                                              <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">NOV</h6>
                                            </div>
                                             <!--12-->
                                             <div class="py-0 brex_levels">
                                                    <h6 class="text-center mb-0 white_txt">DEC</h6>
                                            </div>
                                        </v-row>
                                    </v-col>
                                </v-card>
                             </template>
                        </v-card>
                    </v-tab-item>
                </v-tabs>

            </v-card>
        </template>

    </v-container>

</template>

<script>
// import $ from 'jquery';
import NProgress from 'nprogress';
import axios from 'axios';
import qs from 'qs';

var today = new Date();
var _year = today.getFullYear();
var _month = today.getMonth()+1;

export default {
    el: '#tabs',
    name: 'Join New Package',
    data: () => ({
        adminUrl: '',
        calData: [],
        totalEarningsUsd: 0,
        totalEarningsCrypto: 0,
        totalEarningsCryptoType: '',
        month: {id: _month},
        year: {id: _year},
        monthlyyear: {id: _year},
        months: null,
        years: null,
        monthlyPayoutUsd: 0,
        monthlyPayoutCrypto: 0,
        graphData: [],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }),

    created() {
    this.getCalData()
    this.getMonthlyData();

},
    mounted() {    
        this.adminUrl = process.env.VUE_APP_ADMIN_URL      
    },
     methods: {
    addCommas: function(x, num) {
        x = x || 0;
        x = Number(x);
        var n = x.toFixed(num);
        var parts = n.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
          getCalData: function () {
         
          var self = this;

          let auth_token = this.$store.getters.authToken;
          NProgress.start();
          let bodyFormData = {
                              "month": this.month.id || _month,
                              "year": this.year.id || _year
                             };
        
                if(auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "earnCryptoEarningsDialy";
                    
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                            ,
                            data: qs.stringify(bodyFormData),
                           
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done();
                            console.log(response);

                            self.totalEarningsUsd = response.data.Result.totalPayoutData;
                            self.totalEarningsCrypto = response.data.Result.totalPayoutCryptoData;
                            
                            self.month = { id: parseInt(response.data.Result.month)};
                            self.year = {id: parseInt(response.data.Result.year)};
                            
                            self.years = [];
                            let years = response.data.Result.years;
                            for(let i=0; i< years.length; i++) {
                                self.years.push({id: years[i], name: years[i]});
                            }

                            self.months = [];
                            let months = response.data.Result.months;
                            for(let i=0; i< months.length; i++) {
                                self.months.push({id: i+1, name: months[i]});
                            }

                            let payoutMap = {};
                            let payouts = response.data.Result.result;
                            for(let payout of payouts) {
                                payoutMap[payout.payoutDay] = payout;
                            }

                            let firstDay = response.data.Result.calList[0].split('-')[3];
                            let preCount = self.days.indexOf(firstDay);
                            let preCal = [];
                            for(let i=0; i< preCount; i++) {
                                preCal.push('');
                            }
                            let mainCal = response.data.Result.calList;
                            let totalCal = [...preCal,...mainCal];
                            let totalCount = totalCal.length/7;
                            console.log('Calc');
                            console.log(totalCal);
                            self.calData = [];
                            for(let i=0, j=0; i<totalCount; i++) {
                                let arr = [];
                                for(let k=0; k<7; k++) {
                                    if(j < totalCal.length) {
                                        if(totalCal[j] != '') {
                                            let day = totalCal[j].split('-')[2];
                                            if(payoutMap[day]) {
                                                let payout = payoutMap[day];
                                                arr.push({day: day, amountUsd: payout.payoutAmountUsd, amountCrypto: payout.payoutAmountCrypto.toFixed(8), amountCryptoType: payout.payout_crypto_type});
                                            } else  {
                                                arr.push({day: day, amountUsd: '', amountCrypto: '', amountCryptoType: ''});
                                            }

                                           
                                        } else {
                                            arr.push({day: '', amountUsd: '', amountCrypto: '', amountCryptoType: ''});
                                        }
                                    } else {
                                        arr.push({day: '', amountUsd: '', amountCrypto: '', amountCryptoType: ''});
                                    }
                                    
                                    j++;
                                }
                                self.calData.push(arr);
                            }
                            
                            console.log(self.calData);

                        })
                        .catch(function (err) {
                          console.log(err);
                            if(err && err.response && err.response.data && err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
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

            },


  getMonthlyData: function () {
         
          var self = this;

          let bodyFormData = {
                              "year": this.monthlyyear.id || _year
                             };
         
          let auth_token = this.$store.getters.authToken;
          NProgress.start();
        
                if(auth_token) {

                  const URL = process.env.VUE_APP_API_URL + "earnCryptoEarningsMonthly";
                    
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                            ,
                            data: qs.stringify(bodyFormData),
                           
                        })
                        .then(function (response) {
                            //handle success 
                            NProgress.done();
                            console.log(response);

                            self.totalAmountData = response.data.Result.totalAmountData;
                            self.totalPayoutData = response.data.Result.totalPayoutData;
                            
                            self.monthlyyear = {id: parseInt(response.data.Result.year)};

                            self.years = [];
                            let years = response.data.Result.years;
                            for(let i=0; i< years.length; i++) {
                                self.years.push({id: years[i], name: years[i]});
                            }
                            
                            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            var monthlyPayoutUsd = 0;
                            var monthlyPayoutCrypto = 0;
                            var crypto = 'USDT';
                            var tradeMap = {};
                            let _trades = response.data.Result.result;

                            let maxTrade = 0;
                            for(let trade of _trades) {
                                monthlyPayoutUsd += trade.payoutAmountUsd;
                                monthlyPayoutCrypto += trade.payoutAmountCrypto;
                                crypto = trade.payout_crypto_type || 'USDT';
                                maxTrade = maxTrade > trade.payoutAmountUsd ? maxTrade: trade.payoutAmountUsd;
                                tradeMap[trade.payoutDay] = trade;
                            }
                            self.monthlyPayoutUsd = monthlyPayoutUsd;
                            self.monthlyPayoutCrypto = monthlyPayoutCrypto;

                            let graphData = [];
                            for(let i=0; i< months.length; i++) {
                                let graphPayoutAmountUsd = tradeMap[i+1] && tradeMap[i+1].payoutAmountUsd ? self.addCommas(tradeMap[i+1].payoutAmountUsd, 2) : 0;
                                let graphPayoutAmountCrypto = tradeMap[i+1] && tradeMap[i+1].payoutAmountCrypto ? self.addCommas(tradeMap[i+1].payoutAmountCrypto, 8): 0;
                                let cryptoType = tradeMap[i+1] && tradeMap[i+1].payout_crypto_type ? tradeMap[i+1].payout_crypto_type : crypto;
                                let height = tradeMap[i+1] && tradeMap[i+1].payoutAmountUsd ? (tradeMap[i+1].payoutAmountUsd/maxTrade)*100: 0;
                                graphData.push({payoutAmountUsd: graphPayoutAmountUsd, 
                                    payoutAmountCrypto: graphPayoutAmountCrypto,
                                    cryptoType: cryptoType,
                                    height: (height*250/100)});
                            }

                            self.graphData = graphData;

                            //console.log(monthlyPayoutUsd);
                            //console.log(monthlyPayoutCrypto+""+crypto+""+maxTrade+tradeMap);
                           
                            
                        })
                        .catch(function (err) {
                          console.log(err);
                            if(err && err.response && err.response.data && err.response.data.Result == 'User is blocked'){
                               // self.snackbar_text = "Your account has been deactivated."
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

            },

     }

};
</script>

