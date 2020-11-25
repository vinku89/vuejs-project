<template>
<v-app>
    <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
                {{ snackbar_text }}

                <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
                <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
                    Close
                </v-btn> -->
            </v-snackbar>
    <v-container>
        <div  v-show="referralDiv" class="referral_tabs">
        <v-col cols="12" xl="8" offset-xl="2">            

            <!-- <div class="tabGroup"> -->
                <v-tabs grow v-model="tab" >
                    <v-tab :href="`#tab-6`">My Referral</v-tab>
                    <v-tab :href="`#tab-7`">Tree Structure</v-tab>
                    <v-tab :href="`#tab-8`">Trading Commission</v-tab>
                </v-tabs>
            <!-- </div> -->
            <v-tabs-items v-model="tab" style="background-color: transparent;">
                <!-- My Referral section -->
                <v-tab-item :id="`tab-6`" class="div_tab1 mt-5 pt-5">
                    <h5 class="subtitle-1 font-weight-bold white_color mb-4">Referral Details</h5>
                    <v-row class="mb-5">
                        <v-col cols="12" xl="6">
                            <div class="referral_details_box">
                                <p class="caption text-uppercase font-weight-bold">Total Earnings</p>
                                <h2 class="title" v-if="refInfo.ref">{{refInfo.ref.TotalEarning | numFormat('0.00')}} <span class="subtitle-1">EVR</span></h2>
                            </div>
                        </v-col>
                        <v-col cols="12" xl="4" class="d-none">
                            <div class="referral_details_box">
                                <p class="caption text-uppercase font-weight-bold">Total in BTC Earn</p>
                                <h2 class="title">645.49444874 <span class="subtitle-1">BTC</span></h2>
                            </div>
                        </v-col>
                        <v-col cols="12" xl="6">
                            <div class="referral_details_box">
                                <p class="caption text-uppercase font-weight-bold">Total Referred</p>
                                <h2 class="title" v-if="refInfo.ref">{{refInfo.ref.total_distance}}</h2>
                            </div>
                        </v-col>
                    </v-row>
                    <h5 class="subtitle-1 white_color mb-4 font-weight-bold">How can i get started?</h5>
                    <v-row>
                        <v-col cols="12" xl="4" style="position:relative">
                            <div class="p-3 text-center">
                                <img src="../../../assets/images/links.png" alt="" class="mb-4" width="80">
                                <h4 class="title green_txt">1.Get the code/link</h4>
                                <p>Share you personal referal code or link to social media</p>
                            </div>
                            <v-icon class="arrowicon">mdi-chevron-right</v-icon>
                        </v-col>
                        <v-col cols="12" xl="4" style="position:relative">
                            <div class="p-3 text-center">
                                <img src="../../../assets/images/users.png" alt="" class="mb-4" width="80">
                                <h4 class="title green_txt">2.Invite User</h4>
                                <p>The more user you bring to BREXILY the more you earn </p>
                            </div>
                            <v-icon class="arrowicon">mdi-chevron-right</v-icon>
                        </v-col>
                        <v-col cols="12" xl="4">
                            <div class="p-3 text-center">
                                <img src="../../../assets/images/rewarded.png" alt="" class="mb-4" width="80">
                                <h4 class="title green_txt">3.Be Rewarded</h4>
                                <p>Get 25% from your friend's trades</p>
                            </div>
                        </v-col>
                    </v-row>
                    <div class="custom-card">
                        <p class="m-0">Use below code and link to refer other users and you will receive rewards of 25% from
                            your referee's tradings. The more people you refer to BREXILY, the more you will earn.</p>
                    </div>
                    <div class="mb-5" style="position:relative">
                        <span class="title_width">My Referral ID</span>
                        <span class="title green_txt">{{ userInfo.ref_code }}</span>
                        <v-btn class="referral_copy_btn float-right" @click.stop.prevent="copyReferralCode">
                            <v-icon class="mr-1">mdi-file-multiple-outline</v-icon>
                            Copy
                        </v-btn>
                        <input type="hidden" id="testing-code" :value="userInfo.ref_code">
                    </div>
                    <div class="mb-5" style="position:relative">
                        <span class="title_width">Referral Link</span>
                        <a href="" class="body-1 green_txt">{{hostname}}/signup/{{ userInfo.ref_code }}</a>
                        <v-btn class="referral_copy_btn float-right" @click.stop.prevent="copyReferralLink">
                            <v-icon class="mr-1">mdi-file-multiple-outline</v-icon>
                            Copy
                        </v-btn>
                        <input type="hidden" id="testing-code-link" :value="hostname+'/signup/'+userInfo.ref_code">
                    </div>
                    <div style="position:relative">
                        <span class="title_width">Share</span>
                        <span class="social_icons d-inline-flex">
                            <shareMedia :userInfo="userInfo" />
                        </span>
                    </div>
                    <!-- <v-flex class="my-5">
                        <v-row>
                            <v-col cols="5">
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    outlined
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-flex>

                    <template>
                        <v-data-table
                        :headers="headers"
                        :items="desserts"
                        class="referral_table"
                        :hide-default-footer="true"
                        ></v-data-table>
                    </template> -->


                </v-tab-item>
                <!-- Tree Structure section -->
                <v-tab-item :id="`tab-7`" class="div_tab2">
                    <div id="container" class="mt-5 pt-5 container">
                        <!-- <v-treeview :items="items"></v-treeview> -->

                        <!-- Level section -->
                        <div class="level_group" v-if="refInfo.ref">
                            <v-col cols="12" xl="12" class="align-xl-stretch ">
                                <v-row>
                                    <div class="mr-1 active_lavel">
                                        <h6>Total<span>Referred</span></h6>
                                        <h4>{{refInfo.ref.total_distance}}</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 1</h6>
                                        <h4 v-if="refInfo.Result[0]">{{refInfo.Result[0].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 2</h6>
                                        <h4 v-if="refInfo.Result[1]">{{refInfo.Result[1].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 3</h6>
                                        <h4 v-if="refInfo.Result[2]">{{refInfo.Result[2].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 4</h6>
                                        <h4 v-if="refInfo.Result[3]">{{refInfo.Result[3].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 5</h6>
                                        <h4 v-if="refInfo.Result[4]">{{refInfo.Result[4].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 6</h6>
                                        <h4 v-if="refInfo.Result[5]">{{refInfo.Result[5].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 7</h6>
                                        <h4 v-if="refInfo.Result[6]">{{refInfo.Result[6].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 8</h6>
                                        <h4 v-if="refInfo.Result[7]">{{refInfo.Result[7].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 9</h6>
                                        <h4 v-if="refInfo.Result[8]">{{refInfo.Result[8].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>
                                    <div class="mr-1 level_div">
                                        <h6>Level 10</h6>
                                        <h4 v-if="refInfo.Result[9]">{{refInfo.Result[9].distance}}</h4>
                                        <h4 v-else>0</h4>
                                    </div>

                                </v-row>
                            </v-col>
                        </div>

                        <h4 class="white_txt py-4 mb-5 mt-5">Tree Structure</h4>

                        <!-- Tree Structure -->
                        <div id="container" class="brick-tree ">
                            <ul>
                                <li class="main_user">
                                    <div class="tree-main" id="">
                                        <div class="main_user_icon">
                                            <v-icon>mdi-account-circle-outline</v-icon>
                                        </div>
                                        <div class="user_info_wrp">
                                            <h4 class="font-weight-bold">{{userInfo.first_name}}</h4>
                                            <p>{{userInfo.email}}</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="margin_left " v-for="(referral, index) in referralList" v-bind:key="referral.descendant_id">
                                    <div class="tree-main ml-2" :id="'txt_'+index">
                                        <div class="user_info_wrp">
                                            <h4 class="font-weight-bold">{{ referral.name }}</h4>
                                            <p>{{ referral.email }}</p>
                                        </div>
                                    </div>
                                    <div class="inactiveBtn">
                                        <button type="button" id="2" class="remove ">-</button>
                                    </div>
                                    <button type="button" :id="`${referral.descendant_id}`" :data-distance="`${referral.distance}`" :data-divid="`${index}`" class="ul-appending opend activeBtn">+</button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </v-tab-item>
                <!-- Trading Commission -->
                <v-tab-item :id="`tab-8`" class="div_tab3 pt-5">
                    <!-- <h2 class="text-center pt-5 mt-5">
                        COMING SOON
                    </h2>
                    <p class="text-center f20">
                        We’re currently working on creating something fantastic. <br>We’ll be here soon.
                    </p> -->
                    <TradingCommission />
                </v-tab-item>
            </v-tabs-items>
        </v-col>
        </div>
    </v-container>
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
</v-app>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import shareMedia from '../shareMedia'
import TradingCommission from './TradingCommission'
import qs from 'qs'
export default {
    name: 'Referral',
    singleExpand: false,
    components: {
        shareMedia,
        TradingCommission
    },
    props: {
        userInfo: {},
        referralList: {}
    },
    data: () => ({
        referralDiv: false,
        overlay: false,
        absolute: true,
        posts: '',
        refInfo: [],
        refferelSubUsersList: [],
        tab: null,
        items: [

            {
                id: 5,
                name: 'Sudheer',
                children: [{
                        id: 6,
                        name: 'vuetify :',
                        children: [{
                            id: 7,
                            name: 'src :',
                            children: [{
                                    id: 8,
                                    name: 'index : ts'
                                },
                                {
                                    id: 9,
                                    name: 'bootstrap : ts'
                                },
                            ],
                        }, ],
                    },
                    {
                        id: 10,
                        name: 'material2 :',
                        children: [{
                            id: 11,
                            name: 'src :',
                            children: [{
                                    id: 12,
                                    name: 'v-btn : ts'
                                },
                                {
                                    id: 13,
                                    name: 'v-card : ts'
                                },
                                {
                                    id: 14,
                                    name: 'v-window : ts'
                                },
                            ],
                        }, ],
                    },
                ],
            },

        ],
        snackbar: false,
        snackbar_text: "",
        vertical: true,
        timeout: 6000,
        color: "yellow",
        x: 'right',
        y: 'top',
        hostname: '',

          headers: [
          {text: '#',  align: 'start', sortable: false, value: 'sno', },
          { text: 'Name', value: 'name', sortable: false, },
          { text: 'Join Date', value: 'date' },
          { text: 'Referral ID', value: 'referral', sortable: false, },
          { text: 'Earnings', value: 'earnings', align: 'right' },
        ],
         desserts: [
          {
            sno: 1,
            name: 'John Doe',
            date: '04/05/2020 10:27:30',
            referral: 'JohndoeBREXILY088',
            earnings: '$8.20',
          },
         ]

    }),
    computed: {
        items: function () {
            return this.referralList;

        }
    },
    watch: {
        $route(to) {
            this.myResult = to.path.split("/");
            if(this.myResult[1] == 'TradingCommission'){
                this.show(8)
            }else{
                this.show(6)
            }
        }
    },
    mounted: function () {
         $(".report_ac_menu2").addClass("report_ac_active"); 
        this.myResult = this.$route.path.split("/");
        if(this.myResult[1] == 'TradingCommission'){
            this.show(8)
        }else{
            this.show(6)
        }
        
        this.hostname = window.location.origin
        this.getReferralInfo()
        var self = this
        $('body').on('click', 'button.ul-appending', function () {
            
            $(this).children('ul').remove();
            $(this).prop('disabled', true);
            $(this).prev('div.inactiveBtn').show();
            $(this).hide();
            var id = $(this).attr('id');
            var distance = $(this).data('distance');
            var divid = $(this).data('divid');
            $("#txt_" + divid).parent().children('ul').remove();
            self.getSubUsers(id, distance, divid)

            $('body').on('click', 'button.remove', function () {
                $(this).parent('.inactiveBtn').next('button').prop('disabled', false);
                $(this).parent('.inactiveBtn').parent('li').children('ul').remove();
                $(this).parent('.inactiveBtn').next('button').show();
                $(this).parent('.inactiveBtn').hide();
            });
        });
    },

    methods: {
        show(x) {
            this.tab = `tab-${x}`
        },
        async getSubUsers (id, distance, divid) {
            var self = this;
            let auth_token = this.$store.getters.authToken;

            if (auth_token) {
                let postData = {
                    "ancestor_id": id,
                    "distance": distance
                }

                const URL = process.env.VUE_APP_API_URL + "fetch-referral";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            "Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(postData),
                    })
                    .then(function (response) {
                        //handle success 
                        self.data = response.data.Result;
                        var ids = [];
                        var i = 1;
                        self.data.forEach(function (item) {
                            ids.push("<li class='margin_left'><div class='tree-main ml-2' id='txt_" + divid + "_" + i +
                                "'><div class='user_info_wrp'><h4 class='font-weight-bold'>" + item.name + "</h4><p>" + item.email +
                                "</p></div></div><div class='inactiveBtn'><button type='button' id='2' class='remove'>-</button></div><button type='button' id='" +
                                item.descendant_id + "' data-distance='" + item.distance + "' data-divid='" + divid + "_" +
                                i + "' class='ul-appending opend activeBtn'>+</button></li>")

                            i++;
                        });
                        $("#txt_" + divid).parent().append($('<ul>').addClass('newul').append(ids));
                    })
                    .catch(function () {
                        //handle error
                    });
            } else {
                window.location.href = "/";
            }
        },
        copyReferralCode: function () {
            let testingCodeToCopy = document.querySelector('#testing-code')
            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Referral ID copied' : 'unsuccessful';
                this.snackbar_text = msg;
                this.snackbar = true
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        copyReferralLink: function () {
            let testingCodeToCopy = document.querySelector('#testing-code-link')

            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Referral Link Copied' : 'unsuccessful';
                this.snackbar_text = msg;
                this.snackbar = true
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
        getReferralInfo: function () {
            var self = this;
            self.overlay = true
            let auth_token = this.$store.getters.authToken;

            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "my-referral";
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
                        self.refInfo = response.data.Result;                        
                        self.referralDiv = true
                        self.overlay = false
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
