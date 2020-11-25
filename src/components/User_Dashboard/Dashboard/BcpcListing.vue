<template>
<div class="w-100 coinListWrap">
    <div class="cryptoBtnGroup">
        <ul class="crypto_tabs clearfix">
            <li v-bind:class="getClass(item.base_currency_symbol)" style="width:80px" v-for="(item,i) in marketList" :key="i" @click="getPairingData(item.base_currency_symbol)">{{ item.base_currency_symbol }}</li>
            <li style="width:180px" v-bind:class="{'crypto_dropdn': getscClass}">
                <v-overflow-btn :items="stableCoinList" v-model="selected" @change="getPairingData1($event[0])" label="Stablecoins" dense full-width append-icon="$dropdown" target="#dropdown-example">
                </v-overflow-btn>
            </li>
        </ul>

    </div>
    <!-- Search Option -->
    <div style="position:relative" class="search_field">
        <v-text-field class="mx-3 my-3" flat hide-details label="Search" v-model="search" v-on:keyup="getWalletSearch" outlined color="white" append-icon="mdi-magnify">
        </v-text-field>
    </div>
    <div class="coinlisting_wrp">
        <v-data-table :headers="headers" :hide-default-footer="true" v-bind:items="desserts" sort-by="volume" :sort-desc="true" :items-per-page="10000" :fixed-header="true" class="elevation-1 coinList_scroll" v-bar>
            <template slot="item" slot-scope="props">
                <tr @click="rowClick(props.item.market_symbol)" :id="`${props.item.market_symbol}`" v-bind:class="getClassName(props.item.market_symbol)">
                    <td class="crypto_names text-xs-left">
                        <v-img :src="`${adminUrl}/coin_listing_images/${props.item.coin_image}`" :alt="props.item.coin_symbol" height="20px" width="20px" class="float-left mr-2 mt-1"></v-img>
                        <v-label>{{props.item.coin_symbol}}</v-label>
                    </td>
                    <td class="text-right">{{ props.item.market_price }}</td>
                    <td class="text-right">{{ props.item.volume }}</td>
                    <td class="text-right">
                        <v-chip :text-color="`${props.item.change < 0 ? 'red': 'green'}`" dark>{{ props.item.change }}%</v-chip>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
    <v-overlay :value="overlay" style="z-index:205">
       <!-- <v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img>-->
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
window.Pusher = require('pusher-js');
export default {
    name: 'BcpcListing',
    data: () => ({
        getscClass: false,
        isActive: true,
        bc: '',
        last_bc: '',
        overlay: false,
        absolute: true,
        marketPriceValues: [],
        marketList: [],
        stableCoinList: [],
        desserts: [],
        coinsTableData: [],
        active_tab: 2,
        search: '',
        myResult: '',
        timer: '',
        selected: '',
        headers: [{
                text: 'Market',
                value: 'coin_image',
                sortable: true,
                width: '25%'
            },
            {
                text: 'Price',
                value: 'market_price',
                align: 'right',
                sortable: true,
                width: '28%'
            },
            {
                text: 'Vol',
                value: 'volume',
                align: 'right',
                sortable: true,
                width: '27%'
            },
            {
                text: '+/-',
                value: 'change',
                align: 'right',
                sortable: true,
                width: '20%'
            }
        ],
        options: {
            height: '100%',
            size: 5,
            color: '#22E627',
            mouseover: false,
            MinSize: .2,
            adminUrl: ''
        }

    }),
    mounted() {

        this.loadData()
        this.getBasecurrency()
        this.adminUrl = process.env.VUE_APP_ADMIN_URL
        this.bc = this.$route.path.split("/")[2].split("_")[1]
       
        //Pairing data websocket listener
        //setTimeout(function(){
        this.pairingDataWebsocket()
        //},5000);
    },
    beforeDestroy: function(){
        window.sockets.old2.leave('PairingData_'+this.bc)
    },
    watch: {
        $route(to) {
            this.last_bc = this.bc
            this.bc = to.path.split("/")[2].split("_")[1];

            //Pairing data websocket listener
            window.sockets.old2.leave('PairingData_'+this.last_bc)
            window.Echo.channel('PairingData_'+this.bc)
            .listen('PairingDataEvent', (e) => {
                if(e.message.market_symbol.split("_")[1] == this.bc){
                    let pc = e.message.market_symbol.split("_")[0];
                    let index = this.desserts.map(function(e) { return e.coin_symbol; }).indexOf(pc);
                    Object.assign(this.desserts[index], e.message.Result)
                }
            });
            window.sockets.old2 = window.Echo;
        },       
    },
    methods: {
        pairingDataWebsocket(){
           
            window.Echo.channel('PairingData_'+this.bc)
            .listen('PairingDataEvent', (e) => {
                if(e.message.market_symbol.split("_")[1] == this.bc){
                    let pc = e.message.market_symbol.split("_")[0];
                    let index = this.desserts.map(function(e) { return e.coin_symbol; }).indexOf(pc);
                    Object.assign(this.desserts[index], e.message.Result)
                }
            });
            window.sockets.old2 = window.Echo
        },
        customSort(items, index, isDescending) {
         
          items.sort((a, b) => {
              if (index === 'volume') {
                  if (isDescending) {
                      return b.volume - a.volume;
                  } else {
                      return a.volume - b.volume;
                  }
              }
          });

          return items;
        },
        getClass(c){
             if(c == this.$route.path.split("/")[2].split("_")[1]){
                 return { 'setActive': this.isActive }
             }
        },
        getClassName(cn){
            if(cn == this.$route.path.split("/")[2]){
                 return { 'setActive': this.isActive }
             }
        },
        getColorcode(myString) {
            this.myResult = myString.split("%");
            if (this.myResult[0] >= 0) return 'green'
            else return 'red'
        },
        rowClick(id) {
            this.$router.push('/Exchange/' + id)
        },
        getBasecurrency: function () {
            var self = this;
            //let auth_token = this.$store.getters.authToken;

            //if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "baseCurrencyList";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            //"Authorization": "Bearer " + auth_token
                        }
                    })
                    .then(function (response) {
                        //handle success                         
                        self.marketList = response.data.Result   
                        let sdata = response.data.stablecoinslist 
                        //self.selected = sdata[0]['base_currency_symbol']
                        sdata.forEach((value) => {
                            self.stableCoinList.push([
                                value['base_currency_symbol']
                            ]);
                        })
                        self.getClassName(self.$store.getters.market_symbol)                     
                    })
                    .catch(function () {
                        //handle error
                    });
            // } else {
            //     window.location.href = "/";
            // }

        },
        getPairingData(e) {
            this.getscClass = false
            this.overlay = true
            //this.$emit('childToParentBS', "Success")
            this.getEventos(e,'BC')
            this.selected="Stablecoins"
        },
        getPairingData1(e) {
            this.getscClass = true
            this.overlay = true
            //this.$emit('childToParentBS', "Success")
            this.getEventos(e,'BC')           
        },
        async getEventos(e,from) {

            var self = this;
            self.bc = e;
            //let auth_token = this.$store.getters.authToken;
            let bodyFormData = {
                "base_currency_name": self.bc
            }
            //if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "getBaseCurrencyPairingList";
                axios({
                        method: 'post',
                        url: URL,
                        headers: {
                            "accept": "application/json",
                            //"Authorization": "Bearer " + auth_token
                        },
                        data: qs.stringify(bodyFormData)
                    })
                    .then(function (response) {
                        //handle success 
                        self.overlay = false
                        self.desserts = response.data.Result[0].pairing_list  
                        self.coinsTableData = response.data.Result[0].pairing_list 
                        self.getWalletSearch()
                        //self.customSort
                        //self.$emit('childToParentBS', "Success") 
                        if(from == 'BC'){
                            self.$router.push('/Exchange/' + response.data.Result[0].pairing_list[0].market_symbol)
                        }        
                         
                    })
                    .catch(function () {
                        //handle error
                    });
            // } else {
            //     window.location.href = "/";
            // }
        },
        async loadData() {
            this.overlay = true
            this.desserts = await this.getEventos(this.$route.path.split("/")[2].split("_")[1],'PC')
        },
        getMarketPriceValues: function () {

            var self = this;
            let auth_token = this.$store.getters.authToken;
            let basecurrency = this.$route.path.split("/")[2].split("_")[1];
            let bodyFormData = {
                "base_currency_symbol": basecurrency
            }
            if (auth_token) {

                const URL = process.env.VUE_APP_API_URL + "getMarketPriceValues";
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
                        let resmsg = response.data.Result
                        Object.keys(resmsg).forEach(value => {
                            let editedIndex = resmsg.indexOf(resmsg[value])
                            Object.assign(self.desserts[editedIndex], resmsg[value])
                        });                        
                    })
                    .catch(function () {
                        //handle error
                    });
            } else {
                window.location.href = "/";
            }
        },
        getWalletSearch: function (){
            let search = this.search;
            if (search != "") {
                this.desserts = this.coinsTableData.filter(function (e) {
                    let name = e.coin_symbol;
                    return name.toLowerCase().includes(search.toLowerCase());
                });
            } else {
                this.desserts = this.coinsTableData
            }
        },
    },

}
</script>
