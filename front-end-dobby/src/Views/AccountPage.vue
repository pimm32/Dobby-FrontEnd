<template>
  <div>
    <div v-if="this.user.data && this.gebruiker.id != null">
      <div v-if="this.user.data.email === this.gebruiker.email">
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
              <b-button @click="nieuwePartijOpstellen()"
                >Partij beginnen</b-button
              >
            </b-col>
            <b-col cols="3">
              <b-button :disabled="contactVanUser()" @click="contactToevoegen()"
                >Contact toevoegen</b-button
              >
            </b-col>
          </b-row>
        </b-card>
      </div>
      <b-row>
        <b-col cols="8">
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
        </b-col>
        <b-col cols="4">
          <h2 class="card-header">Contacten</h2>
          <div
            v-if="
              this.contacten.length != 0 &&
              this.user.data.email == this.gebruiker.email
            "
          >
            <b-list-group>
              <b-list-group-item v-for="contact in contacten" :key="contact.id">
                <b-row>
                  <b-col cols=" 9">
                    {{ contact.contact.gebruikersnaam }}
                    {{ contact.contact.rating }}
                  </b-col>
                  <b-col cols="3">
                    <b-button
                      @click="ContactVerwijderenVerificatieModal(contact)"
                      >Verwijder</b-button
                    >
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </div>
          <div v-else-if="this.contacten.length != 0">
            <b-list-group>
              <b-list-group-item v-for="contact in contacten" :key="contact.id">
                <b-row>
                  <b-col cols=" 9">
                    {{ contact.contact.gebruikersnaam }}
                    {{ contact.contact.rating }}
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </div>
          <div v-else>
            Geen contacten
            <span v-if="this.gebruiker.email == this.user.data.email"
              >, volg mensen!</span
            >
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-else align="center" class="mt-5">
      Er is iets fout gegaan <br /><br />
      <div v-if="this.user.loggedIn">
        <b-button @click="gaNaarHome()">Home</b-button>
      </div>
      <div v-else>
        <b-button @click="gaNaarLogin()">Login</b-button>
      </div>
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
    UnfinishedGamesTable,
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
      contacten: [],
      partijenDieNogBezigZijn: [],
      partijenDieAfgelopenZijn: [],
      listsFilled: false,
      fieldsVoorPartijenDieNogBezigZijn: [
        { key: "white", label: "witspeler", sortable: "true" },
        { key: "black", label: "zwartspeler", sortable: "true" },
        { key: "moves", label: "aantal zetten" },
        { key: "inspect", label: "partij openen" },
      ],
      fieldsVoorPartijenDieAfgelopenZijn: [
        { key: "white", label: "witspeler" },
        { key: "black", label: "zwartspeler" },
        { key: "result", label: "uitslag" },
        { key: "inspect", label: "partij openen" },
      ],
      sortByPartijenDieNogBezigZijn: "moves",
      sortByPartijenDieAfgelopenZijn: "result",
      apiDomain: "",
    };
  },
  methods: {
    gaNaarLogin() {
      this.$router.push({ name: "login" });
    },
    gaNaarHome() {
      this.$router.push({ name: "Home" });
    },
    contactVanUser() {
      return false;
    },
    async contactToevoegen() {
      Axios({
        method: "post",
        url: this.apiDomain + "contact/Post",
        data: {
          gebruikerId: (
            await Axios.get(
              this.apiDomain + "gebruiker/GetByEmail/" + this.user.data.email
            )
          ).data.id,
          contactId: this.gebruiker.id,
        },
      })
        .then(
          this.$notify({
            group: "btm-lft",
            title: "Contact toegevoegd!",
            text:
              "Gefeliciteerd, u heeft zojuist een nieuw contact toegevoegd!",
            duration: 10000,
            type: "success",
          })
        )
        .catch((err) => console.log(err));
    },
    ContactVerwijderenVerificatieModal: function (obj) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(
          "Weet u zeker dat u " +
            obj.contact.gebruikersnaam +
            " als contact wilt verwijderen?",
          {
            title: "Bevestiging",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Ja",
            cancelVariant: "primary",
            cancelTitle: "Nee",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          this.boxTwo = value;
          if (value == true) {
            this.VerwijderContact(obj);
          }
        })
        .catch((err) => console.log(err));
    },
    async VerwijderContact(obj) {
      await Axios({
        method: "delete",
        url: this.apiDomain + "contact/Delete/" + obj.id,
      })
        .then(this.contacten.splice(this.contacten.indexOf(obj), 1))
        .catch((err) => console.log(err));
      this.$notify({
        group: "btm-lft",
        title: "Contact verwijderd",
        text: "U heeft zojuist een contact verwijderd",
        duration: 10000,
        type: "danger",
      });
    },
    async nieuwePartijOpstellen() {
      this.$router.push({
        name: "newGame",
        params: {
          uitgedaagdeGebruiker: this.gebruiker,
          uitdager: (
            await Axios.get(
              this.apiDomain + "gebruiker/GetByEmail/" + this.user.data.email
            )
          ).data,
        },
      });
      this.$notify({
        group: "btm-lft",
        title: "Nieuwe partij",
        text: "U staat op het punt om een nieuwe partij aan te maken",
        duration: 10000,
        type: "info",
      });
    },
  },
  created() {
    if (window.location.href.substring(0, 16) === "http://localhost") {
      this.apiDomain = "https://localhost:44300/";
    } else {
      this.apiDomain = "https://i417025core.venus.fhict.nl/";
    }
    Axios.get(this.apiDomain + "partij/GetAll/" + this.gebruiker.id)
      .then(
        (res) => (
          (this.partijenDieNogBezigZijn = res.data.partijenDieNogBezigZijn),
          (this.partijenDieAfgelopenZijn = res.data.partijenDieAfgelopenZijn),
          (this.listsFilled = true)
        )
      )
      .catch((err) => console.log(err));
    Axios.get(this.apiDomain + "contact/GetAllContacts/" + this.gebruiker.id)
      .then((res) => (this.contacten = res.data))
      .catch((err) => console.log(err));
  },
  updated() {
    if (!this.listsFilled) {
      Axios.get(this.apiDomain + "partij/GetAll/" + this.gebruiker.id)
        .then(
          (res) => (
            (this.partijenDieNogBezigZijn = res.data.partijenDieNogBezigZijn),
            (this.partijenDieAfgelopenZijn = res.data.partijenDieAfgelopenZijn),
            (this.listsFilled = true)
          )
        )
        .catch((err) => console.log(err));
    }
  },
};
</script>

<style scoped>
</style>