  
<template>
  <div class="home">
    <h1>Home</h1>
    <p>Welkom op de pagina van Dobby!</p>
    <p v-if="user.data">U bent ingelogd als {{user.data.displayName}} </p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
    components: {
    },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
    
  },
  
};
</script>