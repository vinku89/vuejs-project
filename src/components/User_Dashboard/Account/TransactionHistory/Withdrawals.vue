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
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip :text-color="getColor(item.status)">{{ item.status }}</v-chip>
                        </template>
                <template v-slot:top>
                       
                </template>
                <template v-slot:expanded-item="{ headers }">
                <!-- <td :colspan="headers.length">More info about {{ item.name }}</td> -->
                <td :colspan="headers.length" class="py-5"> 
                    
                    <table
                    >
                      <tbody>
                        <tr>
                          <td>Withdrawal Wallet Address (EVR) </td>
                          <td>: sadf876876asdfg0h9fgh09345mmuty45456345 </td>
                        </tr>
                        <tr>
                          <td>Label</td>
                          <td>: EVR (Everus) </td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>:  Withdrawal EVR from Brexily </td>
                        </tr>
                         <tr>
                          <td>Transaction ID</td>
                          <td>: </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>

    export default {
        name: 'Withdrawals',
            data () {
      return {
        expanded: [''],
        singleExpand: true,
        headers: [
          { text: 'Date & Time', align: 'start', sortable: false, value: 'name', },
          { text: 'Withdrawal ID', value: 'withdrawal', sortable: false, },
          { text: 'Currency', value: 'currency', sortable: false, },
          { text: 'Fees (Crypto)', value: 'fees', sortable: false, },
          { text: 'Amount (Crypto)', value: 'amount', sortable: false, },
          { text: 'Status', value: 'v-select', sortable: false, },
          { text: 'TXID', value: 'data-table-expand' },
        ],
        desserts: [
          {
            name: '17/09/2019 12:35:19',
            withdrawal: '178654',
            currency:'EVR',
            fees: 45.08803077,
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
