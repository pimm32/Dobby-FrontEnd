<template>
  <div>
    <div v-if="this.user.data">
    <div
      v-if="this.user.data.email === this.gebruiker.email"
    >
      <b-card title="Account" sub-title="Gebruikers informatie">
        <b-card-text>
          mijn gebruikersnaam: {{ this.gebruiker.gebruikersnaam }}
        </b-card-text>

        <b-card-text> mijn email: {{ this.gebruiker.email }} </b-card-text>
        <b-card-text> mijn rating: {{ this.gebruiker.rating }} </b-card-text>
      </b-card>
    </div>
    <div v-else>
      <b-card title="Account" sub-title="Gebruikers informatie">
        <b-card-text>
          gebruikersnaam: {{ this.gebruiker.gebruikersnaam }}
        </b-card-text>

        <b-card-text> email: {{ this.gebruiker.email }} </b-card-text>
        <b-card-text> rating: {{ this.gebruiker.rating }} </b-card-text>
        <b-row align-h="center">
          <b-col cols="3">
            <b-button @click="nieuwePartijOpstellen()">Partij beginnen</b-button>
          </b-col>
          <b-col cols="3">
            <b-button :disabled="contactVanUser()" @click="contactToevoegen()"
              >Contact toevoegen</b-button
            >
          </b-col>
        </b-row>
      </b-card>
    </div>
    <h2 class="card-header">Partijen die nog bezig zijn</h2>
    <div>
      <unfinished-games-table
        v-bind:partijenDieNogBezigZijn="this.partijenDieNogBezigZijn"
        v-bind:fieldsVoorPartijenDieNogBezigZijn="
          fieldsVoorPartijenDieNogBezigZijn
        "
        v-bind:sort="sortByPartijenDieNogBezigZijn"
      />
    </div>
    <br /><br /><br />
    <h2 class="card-header">Partijen die afgelopen zijn</h2>
    <div>
      <finished-games-table 
        v-bind:partijenDieAfgelopenZijn="this.partijenDieAfgelopenZijn"
        v-bind:fieldsVoorPartijenDieAfgelopenZijn="
          fieldsVoorPartijenDieAfgelopenZijn
        "
        v-bind:sort="sortByPartijenDieAfgelopenZijn"
      />
    </div>
    </div>
    <div v-else align="center" class="mt-5">
      Er is iets fout gegaan <br/><br/>
      <b-button @click="gaNaarLogin()">Login</b-button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";
import FinishedGamesTable from "../components/FinishedGamesTable.vue";
import UnfinishedGamesTable from "../components/UnfinishedGamesTable.vue";

export default {
  name: "AccountPage",
    components: {
        FinishedGamesTable,
        UnfinishedGamesTable
    },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
    
  },
  data() {
    return {
      gebruiker: this.$route.params.gebruiker,
      partijenDieNogBezigZijn: [],
      partijenDieAfgelopenZijn: [],
      listsFilled:false,
      fieldsVoorPartijenDieNogBezigZijn: [
        { key: "white", label: "witspeler", sortable: "true" },
        { key: "black", label: "zwartspeler", sortable: "true" },
        { key: "moves", label: "aantal zetten" },
        { key: "inspect", label: "partij openen" },],
      fieldsVoorPartijenDieAfgelopenZijn: [
        { key: "white", label: "witspeler" },
        { key: "black", label: "zwartspeler" },
        { key: "result", label: "uitslag" },
        { key: "inspect", label: "partij openen" },],
      sortByPartijenDieNogBezigZijn: "moves",
      sortByPartijenDieAfgelopenZijn: "result",
      apiDomain: "",
    };
  },
  methods: {
    gaNaarLogin(){
    this.$router.push({ name: "login"});  
    },
    contactVanUser() {
      return false;
    },
    contactToevoegen() {
      console.log("jeej");
    },
    async nieuwePartijOpstellen(){
      this.$router.push({ name: "newGame", params: { uitgedaagdeGebruiker : this.gebruiker, uitdager: (await Axios.
      get(this.apiDomain + "gebruiker/GetByEmail/" + this.user.data.email)).data}});

    }
  },
  created() {
    if(window.location.href.substring(0, 16) === "http://localhost"){
        this.apiDomain = "https://localhost:44300/";
      }
      else{
        this.apiDomain = "https://i417025core.venus.fhict.nl/";
      }
    Axios
      .get(this.apiDomain + "partij/GetAll/" + this.gebruiker.id)
      .then((res) => (this.partijenDieNogBezigZijn = res.data.partijenDieNogBezigZijn, this.partijenDieAfgelopenZijn = res.data.partijenDieAfgelopenZijn, this.listsFilled = true))
      .catch((err)=> console.log(err));

  },
  updated(){
    if(!this.listsFilled){
      Axios
      .get(this.apiDomain + "partij/GetAll/" + this.gebruiker.id)
      .then((res) => (this.partijenDieNogBezigZijn = res.data.partijenDieNogBezigZijn, this.partijenDieAfgelopenZijn = res.data.partijenDieAfgelopenZijn, this.listsFilled = true))
      .catch((err)=> console.log(err));
    }
  }
};
</script>

<style scoped>
</style>