<template>
<div>
    <!-- <v-col cols="12" class="text-center">
        <v-btn large color="success" class="mr-2">Main Account</v-btn>
        <v-btn large class="">Tradings Account</v-btn>
    </v-col> -->
           <v-tabs class="h-100 ledger_tabs" centered>
                <v-tab>
                    Main Account
                </v-tab>
                 <!-- <v-tab>
                  Tradings Account
                </v-tab> -->
         

    <!-- Main Account section here -->
      <v-tab-item>
        <v-col cols="12">
            <div class="col-lg-10 offset-lg-1">
                <v-row>
                    <v-col cols="12" lg="8" >
                        <v-row>
                            <v-col cols="12" lg="4" class="py-0" >
                                    <!-- <v-autocomplete
                                            v-model="value"
                                            :items="items"
                                            outlined
                                            filled
                                            dense
                                            class="pairs_select"
                                            placeholder="Custom range"
                                        ></v-autocomplete> -->

                                        <v-select
                                            :items="items"
                                            v-model="selectDateFilter"
                                            solo
                                            outlined
                                            hide-details="auto"
                                            class="selectField px-2"
                                            placeholder="Custom range"
                                            ></v-select>
                            </v-col>
                            <v-col cols="12" lg="8" class="py-0" >
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dates" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field 
                                        v-model="dates" 
                                        outlined
                                        append-icon="event"
                                        readonly v-bind="attrs" v-on="on"
                                        hide-details>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker v-model="dates" range no-title scrollable class="pickerBody">
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="selectDate()">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                                
                                    <!-- <v-text-field
                                     append-icon="mdi-calendar"
                                        outlined
                                        value="01/01/2018 - 01/15/2018"
                                        name="daterange"
                                    ></v-text-field> -->
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-btn large color="success" class="mr-2 px-0 mt-1 float-left" @click="mainWalletFilter()">Filter</v-btn>
                        <v-btn large class="px-0 float-left mt-1" @click="clearFilterData()">Clear</v-btn> 
                        <div class=" float-left ml-2" style="position:relative; width:130px;">

                            <v-select
                            :items="entries"
                            solo
                            outlined
                            class="selectField px-2"
                            placeholder="All entries"
                            ></v-select>
                        </div>
                        <div class="download_ledger" >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on" >mdi-file-download-outline</v-icon>
                            </template>
                            <span>Download</span>
                            </v-tooltip>
                        </div>
                    
                    </v-col>
                </v-row>
            </div>
        </v-col>

        <v-flex>
            <template>
                <v-data-table
                    :headers="headers"
                    :items="tabledata"
                    :pagination.sync="pagination"
                    class="ledger_table"   
                >
                </v-data-table>
            </template>
        </v-flex>
      </v-tab-item>
    <!-- Trade Account section here -->
      <v-tab-item>
        <v-col cols="12">
            <div class="col-lg-10 offset-lg-1">
                <v-row>
                    <v-col cols="12" lg="8" >
                        <v-row>
                            <v-col cols="12" lg="4" class="py-0" >
                                    <!-- <v-autocomplete
                                            v-model="value"
                                            :items="items"
                                            outlined
                                            filled
                                            dense
                                            class="pairs_select"
                                            placeholder="Custom range"
                                        ></v-autocomplete> -->

                                        <v-select
                                            :items="items"
                                            solo
                                            outlined
                                            hide-details="auto"
                                            class="selectField px-2"
                                            placeholder="Custom range"
                                            ></v-select>
                            </v-col>
                            <v-col cols="12" lg="8" class="py-0" >
                                    <v-text-field
                                        outlined
                                        value="01/01/2018 - 01/15/2018"
                                        name="daterange"
                                    ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-btn large color="success" class="mr-2 px-0 mt-1 float-left">Filter</v-btn>
                        <v-btn large class="px-0 float-left mt-1">Clear</v-btn> 
                        <div class=" float-left ml-2" style="position:relative; width:130px;">

                            <v-select
                            :items="entries"
                            solo
                            outlined
                            class="selectField px-2"
                            placeholder="All entries"
                            ></v-select>
                        </div>
                        <div class="download_ledger" >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on" >mdi-file-download-outline</v-icon>
                            </template>
                            <span>Download</span>
                            </v-tooltip>
                        </div>
                    
                    </v-col>
                </v-row>
            </div>
        </v-col>

        <v-flex>

            <!-- Data table -->
            <!-- <template>
                <v-data-table
                    :headers="headers"
                    :items="tabledata"
                    class="ledger_table"
                >
                </v-data-table>
            </template> -->

            <v-flex class=" text-center" style="height:350px;padding-top:100px">
                <img src="../../../../assets/images/no-entries.png" width="100px">
            </v-flex>

        </v-flex>
      </v-tab-item>
        </v-tabs>
        <v-overlay  :value="overlay" style="z-index:205">
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
import $ from 'jquery'
import qs from 'qs'
    export default {
        name: 'Ledgers',
        data() {
            return {
                dates: ['2020-11-11', '2020-11-11'],
                menu: false,
                selectedDate: '',
                selectDateFilter: '',
                startDate: '',
                endDate: '',
                overlay: false,
                absolute: true,
                tabs: null,  
                items: [ 
                    'Today', 
                    '7 days', 
                    '2 weeks',
                    '1 month',
                    '2 months'
                    ],
                entries: [
                    '100',
                    '200',
                    '500',
                    '800',
                    '1000'
                ],
                pagination: {
                    rowsPerPage: 20
                },
                headers: [
                { text: 'Date & Time', align: 'start', sortable: false, value: 'transaction_date',},
                { text: 'ID', value: 'transaction_id', sortable: false, },
                { text: 'Currency', value: 'currency_symbol', sortable: false, },
                { text: 'Descriptions', value: 'description', sortable: false, },
                { text: 'In (Debit)', value: 'credit_amt', sortable: false, align: 'end',},
                { text: 'Out (Credit)', value: 'debit_amt', sortable: false, align: 'end', },
                { text: 'Balance (Crypto)', value: 'balance', sortable: false, align: 'end', },
                { text: 'Transaction Type', value: 'transaction_type', sortable: false, },
                ],
                tabledata: [],
                tabledata1: [
                    {
                        date: '18/09/2019 16:32:16',
                        id: '017176821' ,
                        currency: 'BTC',
                        Descriptions: 'Transfer of 0.08 BTC from wallet Main Account on wallet Trading Account',
                        Credit: 0.066158,
                        balance: 0.08667753,
                        Wallet: 'Tradings Account',
                    },
                     {
                        date: '18/09/2019 16:32:16',
                        id: '017176821' ,
                        currency: 'BTC',
                        Descriptions: 'Exchange 6.04619074 LTC for BTC @ 0.013773 on wallet Trading Account',
                        debit: 0.8351248,
                        balance: 0.08667753,
                        Wallet: 'Tradings Account',
                    },
                ],
            }
        },
        mounted: function () {
            $(function() {
                var self = this
                $('input[name="daterange"]').daterangepicker({
                    opens: 'left'
                    }, function(start, end) {
                        self.startDate = start.format('DD-MM-YYYY')
                        self.endDate = end.format('DD-MM-YYYY')
                        console.log("A new date selection was made: " + start.format('DD-MM-YYYY') + ' to ' + end.format('DD-MM-YYYY'));
                    });
                });

            this.loadData()
        },
        methods: {    
            clearFilterData(){
                this.selectDateFilter = ""
                this.dates = ['2020-11-11', '2020-11-11']
                this.selectedDate = this.dates
            },
            selectDate(){
                this.selectDateFilter = ""
                this.$refs.menu.save(this.dates)
                this.selectedDate = this.dates
                this.mainWalletLedger()
            },
            mainWalletFilter: function () {
                this.mainWalletLedger()
            }, 
            async loadData() {
                this.tabledata = await this.mainWalletLedger()
            },
            async mainWalletLedger() {
                
            var self = this;
            self.overlay = true
            let auth_token = this.$store.getters.authToken;
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "mainWalletLedger";
                 let bodyFormData = {
                    "selectedDate": this.selectedDate,
                    "selectDateFilter": this.selectDateFilter
                }
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
                        //handle success 
                        self.overlay = false
                        self.tabledata = response.data.Result
                        // self.tranhist = true
                        console.log("rrrrrrrrrrrrrrrrrrrr");
                        console.log(response.data.Result);

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

        }
    };
</script>



