<template>
  <header class="header">
    <h1>D-obby</h1>
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" class="navbar">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/play">Speel</b-nav-item>
            <b-nav-item to="/games"> Partijen</b-nav-item>
            <b-nav-item to="/players"> Gebruikers</b-nav-item>
            <b-nav-item v-if="user.loggedIn" to="/contacts"> Contacten</b-nav-item>
            <b-nav-item v-if="user.loggedIn" :disabled="!this.user.data" @click="inspecteerGebruiker()"> Account</b-nav-item>
            <b-nav-item v-if="user.loggedIn"><a @click.prevent="signOut"> Log Out</a></b-nav-item>
            <b-nav-item v-if="!user.loggedIn" to="/login"> Login</b-nav-item>
            <b-nav-item v-if="!user.loggedIn" to="/register"> Register</b-nav-item>
            
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
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
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