<template>
    <div>
        <div class="scroll_table">
            <table class="table white_txt f12 txn_table">
                <thead>
                    <tr>
                        <th scope="col" class="border-top-0">Date &amp; Time</th>
                        <th scope="col" class="border-top-0">T.Internally ID</th>
                        <th scope="col" class="border-top-0">Currency</th>
                        <th scope="col" class="border-top-0">Email ID</th>
                        <th scope="col" class="border-top-0">User ID</th>
                        <th scope="col" class="border-top-0">Status</th>
                        <th scope="col" class="border-top-0 text-right">Amount(Crypto)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>18/09/2019 10:27:29</td>
                        <td>T131725468</td>
                        <td>EVR</td>
                        <td>robert.pattinson@gmail.com</td>
                        <td>Robert Pattinson</td>
                        <td class="green_txt">Successful</td>
                        <td class="text-right">15880.3265148</td>
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
        name: 'TransferInternally',

       data() {
            return {
                   page: 1, 
                  
            }
        },
    };
</script>