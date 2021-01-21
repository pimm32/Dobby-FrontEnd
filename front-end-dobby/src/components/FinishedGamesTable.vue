<template>
    <div>
       <b-table
        fixed
        responsive="true"
        striped
        hover
        :items="partijenDieAfgelopenZijn"
        :fields="fieldsVoorPartijenDieAfgelopenZijn"
        :sort-by.sync="sort"
      >
      <template v-slot:cell(white)="row">
          <div v-if="row.item.spelers[0].kleurSpeler === 'Wit'">
            {{row.item.spelers[0].gebruiker.gebruikersnaam}}
          </div>
          <div v-else>
            {{row.item.spelers[1].gebruiker.gebruikersnaam}}
          </div>
        </template>
        <template v-slot:cell(black)="row">
          <div v-if="row.item.spelers[0].kleurSpeler === 'Zwart'">
            {{row.item.spelers[0].gebruiker.gebruikersnaam}}
          </div>
          <div v-else>
            {{row.item.spelers[1].gebruiker.gebruikersnaam}}
          </div>
        </template>
        <template v-slot:cell(time)="row">
          {{row.item.speeltempoMinuten}} minuten + {{row.item.speeltempoFisherSeconden}} seconden
        </template>
        <template v-slot:cell(result)="row">
          {{row.item.uitslag}}
        </template>
        <template v-slot:cell(inspect)="row">
          <b-button
            size="sm"
            variant="info"
            @click="bekijkPartij(row.item, $event.target)"
            class="btn btn-primary"
          >
            Bekijk partij
          </b-button>
        </template>
      </b-table>
</div>
</template>
<script>

export default {
    name:"AccountPage",
    props: ["partijenDieAfgelopenZijn", "fieldsVoorPartijenDieAfgelopenZijn", "sort"],
    data(){
        return{

        }
    },
    methods:{
      bekijkPartij(obj){
      this.$router.push({ name: "Play", params: { game: obj }});

      }
    }
}
</script>

<style scoped>

</style>