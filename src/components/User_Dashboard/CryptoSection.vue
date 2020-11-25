<template>
    <v-navigation-drawer 
    flat
    prominent
    right :width="600">
    <div class="pa-4 carousel_slider">
        <template>
            <v-carousel :show-arrows="false" cycle height="300" width="300">
                <a href="">
                    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
                </a>
            </v-carousel>
        </template>
    </div>
            
        <template>
            <div class="trade_history">
                <h1>Trade History</h1>
                <template>
                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :hide-default-footer="true" 
                    :fixed-header="true"
                    :items-per-page="15"
                    class="elevation-1"
                    height="300"
                >
                  <template v-slot:[`item.trade`]="{ item }">
                    <v-chip :text-color="getColor(item.trade)" >{{ item.trade }}</v-chip>
                  </template>
                  <template v-slot:[`item.price`]="{ item }">
                    <v-chip :text-color="getColor(item.trade)" >{{ item.price }}</v-chip>
                  </template>
                  <template v-slot:[`item.amount`]="{ item }">
                    <v-chip :text-color="getColor(item.trade)" >{{ item.amount }}</v-chip>
                  </template>
                </v-data-table>
                </template>
            </div>
        </template>
    </v-navigation-drawer>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
        showArrows: false,
        hideDelimiters: true,
        cycle: true,
        interval: 3000,

        headers: [
          {
            text: 'Time',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: '', value: 'trade', sortable: false, },
          { text: 'Price(BTC)', value: 'price', sortable: false, align: 'right' },
          { text: 'Amount(ETH)', value: 'amount', sortable: false, align: 'right' }
        ],
        desserts: [
          {
            name: '15:32:01',
            trade: 'SELL',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:03',
            trade: 'SELL',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:10',
            trade: 'BUY',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:13',
            trade: 'BUY',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:18',
            trade: 'SELL',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:21',
            trade: 'SELL',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:24',
            trade: 'BUY',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:29',
            trade: 'BUY',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:30',
            trade: 'BUY',
            price: 0.021409,
            amount: 0.182,
          },
          {
            name: '15:32:34',
            trade: 'SELL',
            price: 0.021409,
            amount: 0.182,
          },
        ],
      }
      
    },
    methods: {
      getColor (trade) {
        if (trade == "SELL") return 'red'
        else return 'green'
      },
    },
  }
</script>
