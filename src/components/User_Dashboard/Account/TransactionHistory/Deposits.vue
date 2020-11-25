<template>
    <div>
       <template>
              <!-- @click:row="clicked" -->
            <v-data-table
                :headers="headers"
                :items="desserts"
                :expanded.sync="expanded"
                :single-expand="singleExpand"
                item-key="name"
                show-expand
                class="expand_table "
            >
            <!-- <template v-slot:headers.append>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <v-text-field v-model="calories" type="number" label="Less than"></v-text-field>
                </td>
              </tr>
            </template> -->
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip :text-color="getColor(item.status)">{{ item.status }}</v-chip>
                        </template>
                <template v-slot:expanded-item="{ headers }">
                <!-- <td :colspan="headers.length">More info about {{ item.name }}</td> -->
                <td :colspan="headers.length" class="py-5"> 
                    <ul class="inner_content_table">
                        <li class="mr-6">Transaction ID:</li>
                        <li class="green_txt font-weight-bold">76556363726Hgsh7262562890shHGffDD78267282828</li>
                        <li class="ml-6">
                            <v-btn small color="success">
                            <v-icon class="mr-2" style="font-size:15px">mdi-file-multiple-outline</v-icon>
                            Copy</v-btn>
                            </li>
                    </ul>
                </td>
                
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>

    export default {
        name: 'Deposits',
            data () {
      return {
        expanded: [''],
        singleExpand: true,
        headers: [
          { text: 'Date & Time', align: 'start', sortable: false, value: 'name', },
          { text: 'Deposit ID', value: 'Deposit', sortable: false },
          { text: 'Currency', value: 'currency', sortable: false },
          { text: 'Amount (Crypto)', value: 'amount', sortable: false },
          { text: 'Status', value: 'status', sortable: false },
          { text: 'TXID', value: 'data-table-expand' },
        ],
        desserts: [
          {
            name: '17/09/2019 12:35:19',
            Deposit: 349773489,
            currency: 'EVR',
            amount: 14795.08803077,
            status: 'Success',
          },
         
        ],
      }
        },
         methods: {
                      getColor(status) {
                        if (status == "Pending") return 'red'
                        else return 'green'
                    },
                },
    };
</script>
