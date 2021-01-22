  
<template>
  <div class="home">
    <h1>Home</h1>
    <p>Welkom op de pagina van Dobby!</p>
    <p v-if="user.data && user.data.displayName">U bent ingelogd als {{user.data.displayName}} </p>

    <b-row align-v="center" align-h="center">
      <b-col cols="4">

     <img src="../../img/pimjos11.png" style="margin-right: 50%" title="Het aanstormende talent behaalt remise tegen de bekende grootmeester Jos Stokkel"/>

      </b-col>
      <b-col cols="8">
        <b-row align-h="center">
          <b-col cols="9">
            <img src="../../img/combi1.png" style="margin-right: 50%" title="De halve maan slag, zie jij 'm?"/>
          </b-col>
          <b-col cols="9">
            <img src="../../img/combi2.png" style="margin-right: 50%" title="Een mooie rondslag"/>
          </b-col>
          <b-col cols="9">
            <img src="../../img/combi3.png" style="margin-right: 50%" title="Een leuk zetje met een mooi eindspel!"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
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