<template>
  <v-app>
     <TopBar :userInfo="loggedUserInfo"/>
    <v-content>
          <v-container fluid fill-height class=" frame-pt">
      <v-layout>
        <v-col cols="12" class="text-center pt-10 mt-5">
           <h2 class="text-center pt-5 mt-5 mb-6">
                        COMING SOON
                    </h2>
                    <p class="text-center f16">
                        We’re currently working on creating something fantastic. <br>We’ll be here soon.
                    </p>
        </v-col>
      
      </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import TopBar from '../User_Dashboard/TopBar';
export default {
  name: 'LeadersBoard',
  components: {
    TopBar,
  },

  data: () => ({
    loggedUserInfo: [],
  }),
  created() {
            this.getUserInfo()
  },
  methods: {
          getUserInfo: function() {
                var self = this;
                let auth_token = this.$store.getters.authToken;

                if(auth_token){
                   
                    const URL = process.env.VUE_APP_API_URL+"userDetails";
                    axios({
                            method: 'post',
                            url: URL,
                            headers: {"accept": "application/json","Authorization": "Bearer "+auth_token},                        
                        })
                        .then(function (response) {
                           self.loggedUserInfo = response.data.Result;          
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
                }else{
                    window.location.href = "/";
                }

            },
  }
};
</script>
