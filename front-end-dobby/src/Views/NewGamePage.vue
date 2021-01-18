<template>
  <div>
    <div
      align="center"
      class="mt-5"
      v-if="
        this.$route.params.uitgedaagdeGebruiker == null ||
        this.$route.params.uitdager == null ||
        this.user.data == null
      "
    >
      Er is iets fout gegaan probeer het opnieuw <br /><br /><br /><br />
      <b-button @click="GaNaarHome">Terug naar home</b-button>
    </div>
    <div v-else>
      {{ this.uitgedaagdeGebruiker }}
      {{ this.uitdager }}
      <b-form
        style="margin-left: 25%"
        @submit="PartijToevoegen"
        @reset="GaNaarHome()"
      >
        <b-row class="mt-5" style="width: 50%">
          <b-col cols="5" align="left">
            Witspeler: <br />
            <br />
            <div v-if="this.kleurUitdager == 'wit'">
              {{ this.uitdager.gebruikersnaam }}
            </div>
            <div v-else>
              {{ this.uitgedaagdeGebruiker.gebruikersnaam }}
            </div>
          </b-col>
          <b-col cols="2">
            <b-button @click="toggleKleurUitdager()"> Wissel </b-button>
          </b-col>
          <b-col cols="5" align="left">
            Zwartspeler: <br /><br />
            <div v-if="this.kleurUitdager == 'zwart'">
              {{ this.uitdager.gebruikersnaam }}
            </div>
            <div v-else>
              {{ this.uitgedaagdeGebruiker.gebruikersnaam }}
            </div>
          </b-col>
        </b-row>
        <br /><br />
        <b-row style="width: 50%">
          <b-col cols="6">
            <b-form-group
              id="input-group-1"
              label="speeltempo:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                type="number"
                v-model="speeltempo"
                required
                placeholder="speeltempo"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              id="input-group-1"
              label="tijds eenheid:"
              label-for="input-1"
            >
              <select v-model="speeltempoSoort">
                <option disabled value="">
                  Kies één van onderstaande opties
                </option>
                <option>Minuten</option>
                <option>Uren</option>
                <option>Dagen</option>
              </select>
            </b-form-group>
          </b-col>
        </b-row>
        <br /><br />
        <b-row style="width: 50%">
          <b-col cols="6">
            <b-form-group
              id="input-group-1"
              label="toegevoegde tijd:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                type="number"
                v-model="speeltempoFisher"
                required
                placeholder="toegevoegde tijd"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              id="input-group-1"
              label="tijds eenheid:"
              label-for="input-1"
            >
              <select v-model="speeltempoFisherSoort">
                <option disabled value="">
                  Kies één van onderstaande opties
                </option>
                <option>Minuten</option>
                <option>Uren</option>
                <option>Dagen</option>
              </select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row style="width: 50%" align="center">
          <b-col cols="6">
            <b-button cols="6" type="submit" variant="primary" class="mr-5"
              >Partij starten</b-button
            >
          </b-col>
          <b-col cols="6">
            <b-button type="reset" variant="danger" class="ml-5"
              >Annuleren</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
//import Axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "NewGamePage",
  components: {},
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  data() {
    return {
      uitgedaagdeGebruiker: this.$route.params.uitgedaagdeGebruiker,
      uitdager: this.$route.params.uitdager,
      kleurUitdager: "wit",
      speeltempo: null,
      speeltempoSoort: null,
      speeltempoFisher: null,
      speeltempoFisherSoort: null,
      partij: null,
      apiDomain: "",
    };
  },
  methods: {
    async PartijToevoegen(e) {
      
      e.preventDefault();
      if (
        this.speeltempo == null ||
        this.speeltempoSoort == null ||
        this.speeltempoFisher == null ||
        this.speeltempoFisherSoort == null
      ) {
        alert("controleer uw input, iets klopt niet");
      }
      var newPartij = {
        SpeeltempoMinuten: this.speeltempoBerekenen(),
        SpeeltempoFisherSeconden: this.speeltempoFisherBerekenen(),
        TijdWitSpeler: this.speeltempoBerekenen(),
        TijdZwartSpeler: this.speeltempoBerekenen(),
      };
      console.log(newPartij);
      this.partij = (await Axios({
        method: "post",
        url: this.apiDomain + "partij/Post",
        data: {
          SpeeltempoMinuten: this.speeltempoBerekenen(),
        SpeeltempoFisherSeconden: this.speeltempoFisherBerekenen(),
        TijdWitSpeler: this.speeltempoBerekenen(),
        TijdZwartSpeler: this.speeltempoBerekenen(),
        },
      })).data;
      let kleur1;
      let kleur2;
      if(this.kleurUitdager === "wit"){
          kleur1 = "Wit";
          kleur2 = "Zwart";
      }
      else{
          kleur1 = "Zwart";
          kleur2 = "Wit";
      }
      console.log(this.partij)
      Axios({
        method: "post",
        url: this.apiDomain + "speler/Post",
        data: {
         gebruikerId: this.uitdager.id,
         ratingAanBeginVanWedstrijd: this.uitdager.rating,
         partijId: this.partij.id,
         kleurSpeler: kleur1
        },
      });
      Axios({
        method: "post",
        url: this.apiDomain + "speler/Post",
        data: {
         gebruikerId: this.uitgedaagdeGebruiker.id,
         ratingAanBeginVanWedstrijd: this.uitgedaagdeGebruiker.rating,
         partijId: this.partij.id,
         kleurSpeler: kleur2
        },
      })
    },
    GaNaarHome() {
      this.$router.push({ name: "Home" });
    },
    speeltempoBerekenen() {
      if (this.speeltempoSoort === "Minuten") {
        return this.speeltempo * 60;
      }
      if (this.speeltempoSoort === "Uren") {
        return this.speeltempo * 60 * 60;
      }
      if (this.speeltempoSoort === "Dagen") {
        return this.speeltempo * 60 * 60 * 24;
      }
    },
    speeltempoFisherBerekenen() {
      if (this.speeltempoFisherSoort === "Minuten") {
        return this.speeltempoFisher * 60;
      }
      if (this.speeltempoFisherSoort === "Uren") {
        return this.speeltempoFisher * 60 * 60;
      }
      if (this.speeltempoFisherSoort === "Dagen") {
        return this.speeltempoFisher * 60 * 60 * 24;
      }
    },
    toggleKleurUitdager() {
      if (this.kleurUitdager == "wit") {
        this.kleurUitdager = "zwart";
      } else {
        this.kleurUitdager = "wit";
      }
    },
  },
  created() {
      if(window.location.href.substring(0, 16) === "http://localhost"){
        this.apiDomain = "https://localhost:44300/";
      }
      else{
        this.apiDomain = "https://i417025core.venus.fhict.nl/";
      }
  },
};
</script>

<style scoped>
</style>