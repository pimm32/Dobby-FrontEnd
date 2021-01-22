<template>
  <header class="header">
    <h1>D-obby</h1>
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" class="navbar">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/games"> Partijen</b-nav-item>
            <b-nav-item to="/players"> Gebruikers</b-nav-item>
            <b-nav-item v-if="user.loggedIn" :disabled="!this.user.data" @click="inspecteerGebruiker()"> Account</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown>
              <template #button-content>
                <em>Mijn Account</em>
              </template>
            <b-dropdown-item v-if="user.loggedIn"><a @click="signOut"> Uitloggen</a></b-dropdown-item>
            <b-dropdown-item v-if="!user.loggedIn" to="/login"> Inloggen</b-dropdown-item>
            <b-dropdown-item v-if="!user.loggedIn" to="/register"> Registreren</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Axios from "axios";
import firebase from "firebase";
export default {
  data(){
    return{
      apiDomain: "",
    }
  },
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },  
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(this.$notify({
        group: "top-ctr",
        title: "Succesvol uitgelogd",
        text: "Uw bent succesvol uitgelogd, tot de volgende keer!",
        duration: 10000,
        type: "warning"
        
      }),
          this.$router.replace({
            name: "Home"
          })
        );
    },
    async inspecteerGebruiker(){
      this.$router.push({ name: 'Account', params: { gebruiker :  (await Axios.
      get(this.apiDomain + "gebruiker/GetByEmail/" + this.user.data.email)).data }});
    },
  },
  created(){
    if(window.location.href.substring(0, 16) === "http://localhost"){
        this.apiDomain = "https://localhost:44300/";
      }
      else{
        this.apiDomain = "https://i417025core.venus.fhict.nl/";
      }
  }
};
</script>

<style scoped>
.header {
  background: rgb(14, 45, 184);
  color: #fff;
  text-align: center;
  padding: 10px;
}
.header a {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}
.navbar {
  background:rgb(99, 123, 240);
}
</style>