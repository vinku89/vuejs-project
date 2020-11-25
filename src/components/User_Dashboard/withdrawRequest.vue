<template>
  <v-app>
    <v-content  fill-height>
      <v-container class="pt-0"  fill-height>
      <div class="d-flex w-100 justify-center"  fill-height>
          <div class="text-center align-self-center h-100">
            <span v-show="approve">
                <v-icon class="shield_icon">mdi-shield-check-outline</v-icon>
            </span>
            <span v-show="lock">
                <v-icon class="shield_icon orange_txt">mdi-lock-outline</v-icon>  
            </span>
            <span v-show="cancel">          
                <img src="../../assets/images/cancel.png" alt="" class="mb-3">
            </span>
                <h4>{{status}}</h4>
          </div>
      </div>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
    import axios from 'axios'
    //import qs from 'qs'
    export default {
        name: 'Login',
        components: {},
        data() {
            return {
                post_url: '',
                status: '',
                approve: false,
                cancel: false,
                lock: false
            }
        },
        mounted: function () {
            let path = this.$route.path.split("/");
            let id = path[3]
            if(path[2] == 'confirm'){
                this.approve = true
                this.post_url = 'confirm_withdraw_transaction/'+id
            }else if(path[2] == 'cancel'){
                this.cancel = true
                this.post_url = 'cancel_withdraw_transaction/'+id
            }else if(path[2] == 'lock'){
                this.lock = true
                this.post_url = 'lockacc_withdraw_transaction/'+id
            }            
            this.withdrawRequest()
        },
        methods: {
            withdrawRequest: function () {
                var self = this;
                    const URL = process.env.VUE_APP_API_URL + this.post_url;
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {
                                "accept": "application/json"
                            }
                        })
                        .then(function (response) {
                            //handle success 
                            console.log(response);
                            self.status=response.data.Result
                        })
                        .catch(function (err) {
                            //handle error
                            console.log(err);
                            self.status=err.response.data.Result
                        });
                
            },
        }
    }
</script>