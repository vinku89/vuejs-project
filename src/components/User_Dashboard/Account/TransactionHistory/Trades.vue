<template>
    <div>
        <table class="table white_txt f12 txn_table">
            <thead>
                <tr>
                    <th scope="col" class="border-top-0">Trade Time</th>
                    <th scope="col" class="border-top-0">Trade ID</th>
                    <th scope="col" class="border-top-0">Order ID</th>
                    <th scope="col" class="border-top-0">Pair</th>
                    <th scope="col" class="border-top-0 text-center" style="width:100px; padding-bottom:4px">
                        <v-select :items="type" label="Type" solo dense hide-details class="type_select" elevation="0">
                        </v-select>
                    </th>
                    <th scope="col" class="border-top-0 text-right">Amount</th>
                    <th scope="col" class="border-top-0 text-right">Price(Crypto)</th>
                    <th scope="col" class="border-top-0 text-right">Fee(Crypto)</th>
                    <th scope="col" class="border-top-0 text-right">Total(Crypto)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>18/09/2019 10:27:29</td>
                    <td>935587665</td>
                    <td>123457665</td>
                    <td>EVR/BTC</td>
                    <td class="text-center green_txt">BUY</td>
                    <td class="text-right">1234</td>
                    <td class="text-right">0.00408578</td>
                    <td class="text-right">0.00408344</td>
                    <td class="text-right">0.00508989</td>
                </tr>
                <tr>
                    <td>18/09/2019 10:27:29</td>
                    <td>935587665</td>
                    <td>123457665</td>
                    <td>EVR/BTC</td>
                    <td class="text-center red_txt">SELL</td>
                    <td class="text-right">1234</td>
                    <td class="text-right">0.00408578</td>
                    <td class="text-right">0.00408344</td>
                    <td class="text-right">0.00508989</td>
                </tr>
            </tbody>
        </table>
        <template>
            <div class="text-right">
                <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'Trades',
        data() {
            return {
                 page: 1, 
                   type: ['Type', 'BUY', 'SELL'],
            }
        },
    };
</script>