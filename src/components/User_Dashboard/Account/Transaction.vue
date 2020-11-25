<template>
    <v-app>
         <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
                {{ snackbar_text }}

                <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
                <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
                    Close
                </v-btn> -->
            </v-snackbar>
         <v-container class="py-5 account_wrapper_main">
            <!-- <h2 class="text-center mt-5">
                COMING SOON
            </h2> -->
            <!-- <p class="text-center f20 pt-10">
                No Records Found
            </p> -->
                            <template>
                <v-card class="transactionTabs">
                    <v-tabs v-model="tab">
                    <v-tab :href="`#tab-31`">
                        Deposit/Withdraw
                    </v-tab>
                    <v-tab :href="`#tab-32`">
                    Brexco
                    </v-tab>
                    <!-- <v-tab :href="`#tab-33`">
                    Ledger
                    </v-tab> -->
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                    <v-tab-item :id="`tab-31`">
                        <v-card flat>
                             <div v-show="tranhist">
                    <table class="table white_txt f12 txn_table">
                        <thead>
                            <tr>
                                <th scope="col" class="border-top-0">Time (UTC)</th>
                                <th scope="col" class="border-top-0">ID</th>
                                <th scope="col" class="border-top-0">Type</th>
                                <th scope="col" class="border-top-0">Currency</th>
                                <th scope="col" class="border-top-0 text-right">Amount</th>
                                <th scope="col" class="border-top-0 text-right">Fee</th>
                                <th scope="col" class="border-top-0">Payment Status</th>
                                <th scope="col" class="border-top-0">Verification Status</th>
                                <th width="250px" scope="col" class="border-top-0">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="desserts.length == 0">
                                <td colspan="9" class="no_record">No records found!</td>
                            </tr>
                            <tr v-else v-for="item in desserts" v-bind:key="item.id">
                                <td>{{item.time}}</td>
                                <td>{{item.id}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.currency}}</td>
                                <td class="text-right font-bold">{{item.amount}}</td>
                                <td class="text-right font-bold" v-if="item.fee == 0">0.00</td>
                                <td class="text-right font-bold" v-else>{{item.fee}}</td>
                                <td class="text-success" v-if="item.payment_status == 'Completed'">{{item.payment_status}}</td>
                                <td class="orange_txt" v-else-if="item.payment_status == 'Pending'">{{item.payment_status}}</td>
                                <td class="text-danger" v-else>{{item.payment_status}} </td>
                                
                                <td v-if="item.verification_status != ''">
                                    <span class="text-success" v-if="item.verification_status == 'Completed'">{{item.verification_status}}<!-- <span>{{item.confirmations}}</span> --></span>
                                    <span class="orange_txt" v-else-if="item.verification_status == 'Pending'">{{item.verification_status}}<!-- <span>{{item.confirmations}}</span> --></span>
                                    <span class="text-danger" v-else>{{item.verification_status}}<!-- <span>{{item.confirmations}}</span> --></span>
                                </td>
                                <td v-else>-</td>

                                <td width="200" v-if="item.details != ''"><a :href="`${item.hash_link}`" target="_blank" class="detail_hash">{{item.details}}</a></td>
                                <td width="200" v-else>-</td>
                            </tr>                            
                        </tbody>
                    </table>
                    <!-- <template>
                        <div class="text-right">
                            <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
                        </div>
                    </template> -->
                </div>
                        </v-card>
                    </v-tab-item>

                    <!-- Brexco Transaction -->
                    <v-tab-item :id="`tab-32`">
                        <v-card flat>
                            <BrexcoTransactions />
                        </v-card>
                    </v-tab-item>

                    <!-- <v-tab-item :id="`tab-33`">
                        <v-card flat>
                            <Ledgers />
                        </v-card>
                    </v-tab-item> -->
                    </v-tabs-items>
                    
                </v-card>
                </template>


            <!-- <template>
                <div v-show="tranhist">
                    <table class="table white_txt f12 txn_table">
                        <thead>
                            <tr>
                                <th scope="col" class="border-top-0">Time (UTC)</th>
                                <th scope="col" class="border-top-0">ID</th>
                                <th scope="col" class="border-top-0">Type</th>
                                <th scope="col" class="border-top-0">Currency</th>
                                <th scope="col" class="border-top-0 text-right">Amount</th>
                                <th scope="col" class="border-top-0 text-right">Fee</th>
                                <th scope="col" class="border-top-0">Payment Status</th>
                                <th scope="col" class="border-top-0">Verification Status</th>
                                <th width="250px" scope="col" class="border-top-0">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="desserts.length == 0">
                                <td colspan="9" class="no_record">No records found!</td>
                            </tr>
                            <tr v-else v-for="item in desserts" v-bind:key="item.id">
                                <td>{{item.time}}</td>
                                <td>{{item.id}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.currency}}</td>
                                <td class="text-right font-bold">{{item.amount}}</td>
                                <td class="text-right font-bold" v-if="item.fee == 0">0.00</td>
                                <td class="text-right font-bold" v-else>{{item.fee}}</td>
                                <td class="text-success" v-if="item.payment_status == 'Completed'">{{item.payment_status}}</td>
                                <td class="orange_txt" v-else-if="item.payment_status == 'Pending'">{{item.payment_status}}</td>
                                <td class="text-danger" v-else>{{item.payment_status}} </td>
                                
                                <td v-if="item.verification_status != ''">
                                    <span class="text-success" v-if="item.verification_status == 'Completed'">{{item.verification_status}}</span>
                                    <span class="orange_txt" v-else-if="item.verification_status == 'Pending'">{{item.verification_status}}</span>
                                    <span class="text-danger" v-else>{{item.verification_status}}</span>
                                </td>
                                <td v-else>-</td>

                                <td width="200" v-if="item.details != ''"><a :href="`${item.hash_link}`" target="_blank" class="detail_hash">{{item.details}}</a></td>
                                <td width="200" v-else>-</td>
                            </tr>                            
                        </tbody>
                    </table>
                </div>
            </template> -->
         </v-container>
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
    </v-app>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import BrexcoTransactions from '../Brexco/BrexcoTransactions.vue'
//import Ledgers from './TransactionHistory/Ledgers.vue'
//import qs from 'qs'
    export default {
        name: 'Transaction',
        singleExpand: false,
        components: {
        BrexcoTransactions,
        //Ledgers
        },

        data() {
            return {
                 page: 1, 
                   type: ['Type', 'BUY', 'SELL'],
                   desserts: [],
                   overlay: false,
                    absolute: true,
                    tranhist: false,
                    snackbar: false,
                    snackbar_text: "",
                    vertical: true,
                    timeout: 6000,
                    color: "yellow",
                    x: 'right',
                    y: 'top',
                    tab: null,
            }
        },
        watch: {
            $route(to) {
                this.myResult = to.path.split("/");
                if(this.myResult[1] == 'BrexcoTransactions'){
                    this.showTabs(32)
                }else{
                    this.showTabs(31)
                }
            }
        },
        mounted: function () {
            this.loadData()
            this.myResult = this.$route.path.split("/");
            if(this.myResult[1] == 'BrexcoTransactions'){
                this.showTabs(32)
                $(".report_ac_menu1").addClass("report_ac_active"); 
            }else{
                this.showTabs(31)
                $(".report_ac_menu").addClass("report_ac_active"); 
            }
        },
        methods: {    
            showTabs(x) {
                this.tab = `tab-${x}`
            }, 
            async loadData() {
                this.desserts = await this.paymentHistory()
            },
            async paymentHistory() {
            var self = this;
            self.overlay = true
            let auth_token = this.$store.getters.authToken;
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "paymentHistory";
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
                        self.desserts = response.data.Result
                        self.tranhist = true

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