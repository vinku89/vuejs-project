<template>
  <v-app class="h-100"> 
   <!-- <TopBar/> -->
    <v-content class="h-100 pl-0 pt-0">
      <ModalIdle v-if="isIdle" />
      <router-view/>
    </v-content>
  </v-app>
</template>

 <style lang="css">
  @import "./assets/css/app.css";
  @import "./assets/css/global.css";
  @import "./assets/css/landing.css";
  @import "./assets/css/login.css";
  @import "./assets/css/luxdraws.css";
  @import "./assets/css/nav.css";
  @import "./assets/css/slidercaptcha.css";
  @import "./assets/css/brexco.css";
  @import "./assets/css/userdashboard.css";
  @import "./assets/css/earncrypto.css";
</style>
<script type="module" src="../public/js/scripts.js"></script>
<script>
//import '../public/js/scripts.js';
import ModalIdle from "./ModalIdle";
export default {
  name: 'App',

  components: {
    ModalIdle
  },
  computed: {
    isIdle() {
      return this.$store.state.idleVue.isIdle;
      }
  },
  props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

   data: vm => ({
      initialDark: vm.$vuetify
        ? vm.$vuetify.theme.dark
        : false,
    }),
    
    beforeDestroy () {
          if (!this.$vuetify) return

          this.$vuetify.theme.dark = this.initialDark
        },
    };
</script>


