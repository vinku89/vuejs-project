<template>

    <div>


      <template>
            <v-data-table
            :headers="headers"
            :items="desserts"
            class="referral_table"
            :hide-default-footer="true"
             item-key="name"
            >
            <template slot="headers" slot-scope="props">
            <tr>
                
                <th>{{ props.header.text }}</th>
                <th>{{ props.header.text }}</th>
                <th>{{ props.header.text }}</th>
                <th>
                     <v-select :items="type" label="Type" solo dense hide-details class="type_select"
                                elevation="0"></v-select>
                </th>
                <th>{{ props.header.text }}</th>
                </tr>
              </template>

            </v-data-table>
        </template>


        <div class="scroll_table d-none">
            <table class="table white_txt f12 txn_table">
                <thead>
                    <tr>
                        <th scope="col" class="border-top-0">Order Time</th>
                        <th scope="col" class="border-top-0">Closed Time</th>
                        <th scope="col" class="border-top-0">Order ID</th>
                        <th scope="col" class="border-top-0">Pair</th>
                        <th scope="col" class="border-top-0 text-center" style="width:100px; padding-bottom:4px">
                            <v-select :items="type" label="Type" solo dense hide-details class="type_select"
                                elevation="0"></v-select>
                        </th>
                        <th scope="col" class="border-top-0 text-right">Price(Crypto)</th>
                        <th scope="col" class="border-top-0 text-right">Amount</th>
                        <th scope="col" class="border-top-0 text-right">Completed</th>
                        <th scope="col" class="border-top-0 text-right">Total(Crypto)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center green_txt">BUY</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>18/09/2019 08:32:11</td>
                        <td>935587665</td>
                        <td>EVR/BTC</td>
                        <td class="text-center red_txt">SELL</td>
                        <td class="text-right">0.00000171</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">2389</td>
                        <td class="text-right">0.00408578</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <template>
            <div class="text-right">
                <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'Orders',
        data() {
            return {
                   page: 1, 
                   type: ['Type', 'BUY', 'SELL'],

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
            }
        },
    };
</script>