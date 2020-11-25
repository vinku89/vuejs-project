<template>
  <v-app>
     <TopBar/>
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
import TopBar from '../User_Dashboard/TopBar';
export default {
  name: 'LuxDraws',
  components: {
    TopBar,
  },

  data: () => ({
    //
  }),
};
</script>
