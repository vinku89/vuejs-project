<template>
  <v-app>
      <v-layout>
              <table class="table white_txt f12 txn_table">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="f11 border-top-0">Date &amp; Time</th>
                                                <th scope="col" class="f11 border-top-0">ID</th>
                                                <th scope="col" class="f11 border-top-0 text-right">Currency</th>
                                                <th scope="col" class="f11 border-top-0">Utilities</th>
                                                <th scope="col" class="f11 border-top-0 text-right">AC Number</th>
                                                <th scope="col" class="f11 border-top-0 text-right">Mob Number</th>
                                                <th scope="col" class="f11 border-top-0 text-right">Amount</th>
                                                <th scope="col" class="f11 border-top-0 text-right">Amount (USD)</th>
                                                <th scope="col" class="f11 border-top-0 text-right">Discount</th>
                                                <th scope="col" class="f11 border-top-0 text-right">Fee</th>
                                                <th scope="col" class="f11 border-top-0 text-right">Amount (Crypto)</th>
                                                <th scope="col" class="f11 border-top-0">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="desserts.length == 0">
                                                <td colspan="13" class="no_record">No records found!</td>
                                            </tr>
                                            <tr v-else v-for="item in desserts" v-bind:key="item.id">
                                                <td>{{item.time}}</td>
                                                <td>{{item.payment_id}}</td>
                                                <td class="text-right">{{item.currency}}</td>
                                                <td>{{item.service_name}}</td>
                                                <td class="text-right">{{ (item.service == 1 || item.service == 2 || item.service == 4 || item.service == 9) ? '-' : item.account_number }}</td>
                                                <td class="text-right">{{item.mobile_number}}</td>
                                                <td class="text-right">{{item.amount}} </td>
                                                <td class="text-right">{{item.usd_amount}}</td>
                                                <td class="text-right">{{item.discount}}</td>
                                                <td class="text-right">{{item.fee}}</td>
                                                <td class="text-right font-weight-bold">{{item.crypto_amount}}</td>
                                                <td class="orange_txt" style="width:80px;" v-if="item.status == 'CONFIRMED'">{{item.status}}</td>
                                                <td class="green_txt" style="width:80px;" v-else-if="item.status == 'COMPLETED'">{{item.status}}</td>
                                                <td class="red_txt" style="width:80px;" v-else>{{item.status}}</td>
                                            </tr>                            
                                        </tbody>
                                    </table>
      
      </v-layout>
 <v-overlay :absolute="absolute" :value="overlay">
            <v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img>
        </v-overlay>

  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BrexcoTransactions',
  components: {
  },

  data: () => ({
    desserts: [],
    overlay: false,
    absolute: true,
  }),
  methods: {
      async loadData() {
                this.desserts = await this.brexcoHistory()
            },
            async brexcoHistory() {
            var self = this;
            self.overlay = true
            let auth_token = this.$store.getters.authToken;
            if (auth_token) {
                const URL = process.env.VUE_APP_API_URL + "brexcoTransactionsList/All";
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
                        //.tranhist = true

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
  mounted: function(){
        this.loadData();
        
        
        this.app_url=process.env.VUE_APP_NAME
    }
};
</script>
