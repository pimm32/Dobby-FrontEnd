 <template>
  <div id="app">
    <div v-if="this.user.data && this.partij != null">
    <Game
      v-bind:isUserAanZet="this.SpelerAanZet()"
      v-bind:speeltUser="this.SpelerDoetAanPartijMee()"
      v-bind:partij="this.partij"
      v-bind:wit="this.wit"
      v-bind:zwart="this.zwart"
      v-on:add-message-to-chat="addMessage"
      v-on:add-move-to-game="addZetVerificatieModal"
      v-on:remise-aanbieden="remiseAanbieden"
      v-on:partij-opgeven="partijOpgevenVerificatieModal"
    />
    </div>
    <div v-else-if="this.partij!=null">
      <Game
      v-bind:isUserAanZet="false"
      v-bind:speeltUser="false"
      v-bind:partij="this.partij"
      v-bind:wit="this.wit"
      v-bind:zwart="this.zwart"
    />
    </div>
    <div v-else class="mt-5" align="center">
      <span> Oops er gaat iets fout! </span><br/><br/>
      <b-button @click="$router.push({ name: 'Home'})"> Klik hier om naar de homepagina te gaan</b-button>
    </div>
  </div>
</template>

<script>
import Game from "../components/Game";
import { mapGetters } from "vuex";
//import GameChat from "../components/GameChat.vue";
import axios from "axios";
//import ZettenLijst from "../components/ZettenLijst.vue";
export default {
  name: "playpage",
  components: {
    // GameChat,
    Game,
    //GameChat,
    //ZettenLijst,
  },

  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  data() {
    return {
      partij: this.$route.params.game,
      wit: null,
      zwart: null,
      apiDomain: "",
      show: false,
    };
  },
  created() {
    console.log(Date());
    if (window.location.href.substring(0, 16) === "http://localhost") {
      this.apiDomain = "https://localhost:44300/";
    } else {
      this.apiDomain = "https://i417025core.venus.fhict.nl/";
    }
    if (this.partij.spelers[0].kleurSpeler == "Wit") {
      this.wit = this.partij.spelers[0];
      this.zwart = this.partij.spelers[1];
    } else {
      this.wit = this.partij.spelers[1];
      this.zwart = this.partij.spelers[0];
    }
  },

  methods: {
    SpelerAanZet() {
      if (
        this.user.data.email === this.wit.gebruiker.email &&
        Object.keys(this.partij.zetten).length % 2 === 0
      ) {
        return true;
      } else if (
        this.user.data.email === this.zwart.gebruiker.email &&
        Object.keys(this.partij.zetten).length % 2 === 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    SpelerDoetAanPartijMee() {
      if (
        this.user.data.email === this.wit.gebruiker.email ||
        this.user.data.email === this.zwart.gebruiker.email
      ) {
        return true;
      }
      return false;
    },
    addMessage(bericht) {
      //
      let afzender;
      if (this.user.data.email === this.wit.gebruiker.email) {
        afzender = this.wit.gebruiker;
      }
      if (this.user.data.email === this.zwart.gebruiker.email) {
        afzender = this.zwart.gebruiker;
      }
      let dateNow = new Date();
      let newBericht = {
        tekst: bericht,
        datum: dateNow,
        afzenderId: afzender.id,
        afzender: afzender,
        chatId: this.partij.chat.id,
      };
      axios({
        method: "post",
        url: this.apiDomain + "bericht/Post",
        data: {
          tekst: bericht,
          datum: dateNow.toJSON(),
          afzenderId: afzender.id,
          chatId: this.partij.chat.id,
        },
      })
        .then(this.$notify({
        group: "btm-lft",
        title: "Bericht verzonden",
        text: "Uw bericht is succesvol verzonden",
        duration: 10000,
        type: "success"
        
      }),
          (this.partij.chat.berichten = [
            ...this.partij.chat.berichten,
            newBericht,
          ])
        )
        .catch((err) => console.log(err));
    },
    addZetVerificatieModal: function(zet){
      this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Weet u zeker dat u ' + zet.beginVeld +' naar ' + zet.eindVeld + ' wilt spelen?', {
          title: 'Bevestiging',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Ja',
          cancelVariant: 'primary',
          cancelTitle: 'Nee',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
            if (value == true) {
              this.addZet(zet)
            }
          })
          .catch(err=>console.log(err))
    },
    addZet(zet){
      axios({
        method: "post",
        url: this.apiDomain + "zet/Post",
        data: {
          beginVeld: zet.beginVeld,
          eindVeld: zet.eindVeld, 
          partijId: zet.partijId, 
          standNaZet: zet.standNaZet,
        },
      })
        .then(this.$notify({
        group: "btm-lft",
        title: "Zet gespeeld",
        text: "Uw heeft zojuist een zet gespeeld(" + zet.beginVeld+ "-/x" + zet.eindVeld+")",
        duration: 10000,
        type: "info"
        
      }),
          this.partij.zetten = [
            ...this.partij.zetten,
            zet,
          ]
        )
        .catch((err) => console.log(err));
    },
    remiseAanbieden(){
      let spelerDieRemiseAanbied;
      if(this.user.data.email === this.wit.gebruiker.email){
        spelerDieRemiseAanbied = this.wit;
      }
      if(this.user.data.email === this.zwart.gebruiker.email){
        spelerDieRemiseAanbied = this.zwart;
      }
      console.log(spelerDieRemiseAanbied)
      axios({
        
      })
        .then(
         
        )
        .catch((err) => console.log(err));
    },
    partijOpgevenVerificatieModal: function(){
      this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Weet u zeker dat u deze partij op wilt geven?', {
          title: 'Bevestiging',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Ja',
          cancelVariant: 'primary',
          cancelTitle: 'Nee',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
            if (value == true) {
              this.partijOpgeven()
            }
          })
          .catch(err=>console.log(err))
    },
    async partijOpgeven(){
      let uitslag;
      if(this.user.data.email === this.wit.gebruiker.email){
        uitslag = "0-2";
      }
      if(this.user.data.email === this.zwart.gebruiker.email){
        uitslag = "2-0"
      }

      axios({
        method: "put",
        url: this.apiDomain + "partij/put/"+this.partij.id,
        data: {
          speeltempoMinuten: this.partij.speeltempoMinuten,
          speeltempoFisherSeconden: this.partij.speeltempoFisherSeconden,
          tijdWitSpeler: this.partij.tijdWitSpeler,
          tijdZwartSpeler: this.partij.tijdZwartSpeler,
          uitslag: uitslag,
          id: this.partij.id
        },
      })
      .then(this.$notify({
        group: "btm-lft",
        title: "Oops!!!!",
        text: "Verloren, helaas, volgende keer beter! U wordt nu naar uw persoonlijke pagina gestuurd",
        duration: 10000,
        type: "dark"
        
      }),this.$router.push({ name: 'Account', params: { gebruiker :  (await axios.
      get(this.apiDomain + "gebruiker/GetByEmail/" + this.user.data.email)).data }}));

    }
  },
};
</script>

<style scoped>
</style>