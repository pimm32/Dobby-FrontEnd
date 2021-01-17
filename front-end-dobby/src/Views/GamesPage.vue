<template>
  <div>
    <h2 class="card-header" @click="toggleShowPartijenDieNogBezigZijn">
      Partijen die nog bezig zijn
    </h2>
    <div v-if="showPartijenDieNogBezigZijn">
     <unfinished-games-table v-bind:partijenDieNogBezigZijn="partijenDieNogBezigZijn" v-bind:fieldsVoorPartijenDieNogBezigZijn="fieldsVoorPartijenDieNogBezigZijn" v-bind:sort="sortByPartijenDieNogBezigZijn"/>
    </div>
    <br /><br /><br />
    <h2 class="card-header" @click="toggleShowPartijenDieAfgelopenZijn">
      Partijen die afgelopen zijn
    </h2>
    <div v-if="showPartijenDieAfgelopenZijn">
      <finished-games-table v-bind:partijenDieAfgelopenZijn="partijenDieAfgelopenZijn" v-bind:fieldsVoorPartijenDieAfgelopenZijn="fieldsVoorPartijenDieAfgelopenZijn" v-bind:sort="sortByPartijenDieAfgelopenZijn"/>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FinishedGamesTable from "../components/FinishedGamesTable.vue";
import UnfinishedGamesTable from "../components/UnfinishedGamesTable.vue";
export default {
  name: "GamesPage",
  components: {
    FinishedGamesTable,
    UnfinishedGamesTable,
  },
  data() {
    return {
      showPartijenDieNogBezigZijn: true,
      showPartijenDieAfgelopenZijn: true,
      sortByPartijenDieAfgelopenZijn: "result",
      sortByPartijenDieNogBezigZijn: "moves",

      fieldsVoorPartijenDieNogBezigZijn: [
        { key: "white", label: "witspeler", sortable: "true" },
        { key: "black", label: "zwartspeler", sortable: "true" },
        { key: "moves", label: "aantal zetten" },
        { key: "time", label: "speeltempo" },
        { key: "inspect", label: "partij openen" },
      ],
      fieldsVoorPartijenDieAfgelopenZijn: [
        { key: "white", label: "witspeler" },
        { key: "black", label: "zwartspeler" },
        { key: "result", label: "uitslag" },
        { key: "time", label: "speeltempo" },
        { key: "inspect", label: "partij openen" },
      ],
      partijenDieNogBezigZijn: [],
      partijenDieAfgelopenZijn: [],
    };
  },
  methods: {
    toggleShowPartijenDieNogBezigZijn() {
      this.showPartijenDieNogBezigZijn = !this.showPartijenDieNogBezigZijn;
    },
    toggleShowPartijenDieAfgelopenZijn() {
      this.showPartijenDieAfgelopenZijn = !this.showPartijenDieAfgelopenZijn;
    },
  },
  created(){
      axios
      .get("https://i417025core.venus.fhict.nl/partij/GetAll")
      .then((res) => (this.partijenDieNogBezigZijn = res.data.partijenDieNogBezigZijn, this.partijenDieAfgelopenZijn = res.data.partijenDieAfgelopenZijn))
      .catch((err)=> console.log(err));

  }
};
</script>

<style scoped>
</style>