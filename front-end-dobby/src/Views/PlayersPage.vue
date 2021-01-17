<template>
  <div class="mr-5 ml-5">
    <h2 class="card-header">
      Overzicht van alle gebruikers
    </h2>
    <b-row>
        <b-col lg="6" class="my-1"/>
        <b-col lg="6" class="my-1">
            <b-form-group
                label="zoek"
                label-for="zoek-input"
                label-cols-sm="2"
                label-align-sm="center"
                label-size="sm"
                class="mb-0"
            >
            <b-input-group size="sm">
                <b-form-input
                    id="zoek-input"
                    v-model="zoek"
                    type="search"
                    placeholder="Type om gebruiker te zoeken"
                />
                <b-input-group-append>
                    <b-button :disabled="!zoek" @click="zoek = ''">Clear</b-button>
                </b-input-group-append>
                
            </b-input-group>
            </b-form-group>
        </b-col>
    </b-row>
     <b-table
        fixed
        responsive="true"
        striped
        hover
        @filtered="onFiltered"
        :filter="zoek"
        :filter-included-fields="filterOn"
        :items="gebruikersLijst"
        :fields="fields"
        :sort-by.sync="sortBy"
      >
        <template v-slot:cell(inspect)="row">
          <b-button
            size="sm"
            variant="info"
            @click="inspecteerGebruiker(row.item, $event.target)"
            class="btn btn-primary"
          >
            Bekijk gebruiker
          </b-button>
        </template>
      </b-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GamesPage",
  components: {
  },
  data() {
    return {
      sortBy: "rating",
    totalRows: 1,
    currentPage: 1,
    pageOptions: [10, 20, 30, { value: 100, text: "Show a lot" }],
    perPage:10,
    zoek: null,
    filterOn: ["gebruikersnaam"],
      fields: [
        { key: "gebruikersnaam", label: "gebruikersnaam", sortable: "true" },
        { key: "rating", label: "rating", sortable: "true" },
        { key: "inspect", label: "inspecteer" },
      ],
      gebruikersLijst: [
      ],
    };
  },
  methods: {
    inspecteerGebruiker(obj){
      this.$router.push({ name: "Account", params: { gebruiker : obj } });
    },
    onFiltered(){
        this.currentPage = 1;
    }
  },
  mounted(){
      axios
      .get("https://i417025core.venus.fhict.nl/gebruiker/GetAll")
      .then((res) => (this.gebruikersLijst = res.data, this.totalRows =this.gebruikersLijst.length))
      .catch((err)=> console.log(err));
  },
};
</script>

<style scoped>
</style>