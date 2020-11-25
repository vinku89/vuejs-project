<template>
<div >
    <div v-show="tradingComm">
    <v-row class="mb-5">
        <v-col cols="12" xl="6">
            <div class="referral_details_box p-4">
                <h6 class=" text-uppercase subtitle-2">Total Trading ($)</h6>
                <h6 class="h4 mb-0">{{addCommas(total_trading_vol,2)}}</h6>
            </div>
        </v-col>
        <v-col cols="12" xl="6">
            <div class="referral_details_box p-4">
                <h6 class=" text-uppercase subtitle-2">Total Payout (USDT)</h6>
                <h6 class="h4 mb-0">{{addCommas(total_payout_vol,8)}}</h6>
            </div>
        </v-col>
    </v-row>

    <!-- Date Filter -->
    <v-col>
        <template>
            <v-row>
                <v-col cols="4">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field 
                        v-model="date" 
                        outlined
                        append-icon="event"
                        readonly v-bind="attrs" v-on="on"
                        hide-details>
                        </v-text-field>
                    </template>
                    <v-date-picker v-model="date" type="month" no-title scrollable class="pickerBody">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="selectDate()">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                </v-col>
         
            </v-row>
        </template>
    </v-col>

        <v-col>
            <v-row class="px-2">
                <v-col cols="3" class=" pb-0 f14">Trade Date</v-col>
                <v-col cols="4" class="text-right pr-5 pb-0 f14">Total Trading ($)</v-col>
                <v-col cols="4" class="text-right pr-6 pb-0 f14">Total Payout (USDT)</v-col>
            </v-row>
        </v-col>

    <template>
        <div v-if="maintradeData.length == 0" class="text-center pt-10">No records found!</div>
        <v-expansion-panels class="trade_com_table" accordion>
            
            <v-expansion-panel  v-for="(team, index) in maintradeData" v-bind:key="index">
               
                <v-expansion-panel-header class="py-0 pr-3">                    
                    <template>
                        <v-row >
                            <v-col cols="3" class="font-weight-bold">{{team.payoutDate}}</v-col>
                            <v-col cols="4" class="text-right font-weight-bold">{{addCommas(team.totalTrade,2)}}</v-col>
                            <v-col cols="4" class="text-right font-weight-bold">{{addCommas(team.totalCommissionAmount,8)}}</v-col>
                        </v-row>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content >
                    <template >       
                        <!-- <div v-for="(result, index) in team.res"  :key="index">                  -->
                    <v-data-table
                        :headers="headers"
                        :items="desserts[index]"
                        hide-default-footer
                        class="levels_table"
                    >
                    </v-data-table>
                        <!-- </div> -->
                    </template>
                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-expansion-panels>
    </template>
    </div>
    <v-overlay :value="overlay" style="z-index:205;">
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
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'TradingCommission',
    data: () => ({
        total_trading_vol: 0,
        total_payout_vol: 0,
        tradingComm: false,
        total_trading: 0,
        total_payout: 0,
        overlay: false,
        absolute: true,
        date: new Date().toISOString().substr(0, 7),
        menu: false,
        selectedDate: '',
     headers: [
          {
            text: 'Tree',
            align: 'start',
            sortable: false,
            value: 'level',
          },
          { text: 'Total Buy ($)', value: 'totalBuy', sortable: false, },
          { text: 'Total Sell ($)', value: 'totalSell', sortable: false, },
          { text: 'Total Trading ($)', value: 'totalTrade', sortable: false, },
          { text: 'Payout (USDT)', value: 'commissionAmount', sortable: false, },
        ],
        maintradeData: [],
        desserts: [],
         desserts1: [
          {
            level: 'My Self',
            buy: '25,000',
            sell: '36,000',
            trading: '61,000',
            payout: 45.70,
          },
          {
            level: 'Level 1 TTL Sales',
            buy: '1,25,000',
            sell: '98,000',
            trading: '2,23,000',
            payout: 66.9,
          },
          {
            level: 'Level 2 TTL Sales',
            buy: '96,000',
            sell: '2,300',
            trading: '98,300',
            payout: 14.745,
          },
          {
            level: 'Level 3 TTL Sales',
            buy: '12,000',
            sell: '31,000',
            trading: '43,000',
            payout: 3.87,
          },
          
          
        ],
    }),
    methods: {
        selectDate(){
            this.$refs.menu.save(this.date)
            this.selectedDate = this.date
            this.getCommissionReport()
        },
        addCommas: function(x, num) {
            x = x || 0;
            x = Number(x);
            var n = x.toFixed(num);
            var parts = n.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },
        getCommissionReport: function () {
            var self = this;
             self.tradingComm = false
            self.overlay = true
            self.overlay = true
            let auth_token = this.$store.getters.authToken;
            let bodyFormData = {
                "selectedDate": this.selectedDate
            }
            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "tradeCommissionReport";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(bodyFormData)
                    })
                    .then(function (response) {
                        self.tradingComm = true
                       self.overlay = false
                        let res =  response.data.Result
                        self.total_trading = response.data.total_trading
                        self.total_payout = response.data.total_payout
                        let tradesData = [];
                        let data = Object.values(res);
                        let total_trading_vol = 0;
                        let total_payout_vol = 0;
                        for(let i=0;i< data.length; i++) {
                            let records = data[i];

                            for(let j=0; j<records.length; j++){
                                if(j==0) {
                                    total_trading_vol += records[j].totalTrade
                                    total_payout_vol += records[j].totalCommissionAmount
                                    tradesData.push(records[j]);
                                    records.shift();
                                    break;
                                }
                            }
                        }
                        for(let res of data){
                            for(let record of res){
                                record.totalBuy = self.addCommas(record.totalBuy,2);
                                record.totalSell = self.addCommas(record.totalSell,2);
                                record.totalTrade = self.addCommas(record.totalTrade,2);
                                record.commissionAmount = self.addCommas(record.commissionAmount,8);
                            }
                        }
                        self.total_trading_vol = total_trading_vol
                        self.total_payout_vol = total_payout_vol
                        self.maintradeData = tradesData;
                        self.desserts = data;
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
    },
    mounted: function () {
        this.getCommissionReport()
    },
    
};
</script>



