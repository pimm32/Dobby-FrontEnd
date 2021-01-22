<template>
  <div id="test">
    <h2 class="card-header">Partij</h2>
    Witspeler: {{ this.wit.gebruiker.gebruikersnaam }}<br />
    Zwartspeler: {{ this.zwart.gebruiker.gebruikersnaam }}<br />
    
      <b-row>
        <b-col cols="4">
            {{ this.partijLogic.position() }}
            <b-row v-if="this.speeltUser">
              <b-col cols="6">
                <b-button @click="geefPartijOp()"> Opgeven </b-button>
              </b-col>
              <b-col cols="6">
                <b-button :disabled="isUserAanZet" @click="biedRemiseAan()"> Remise aanbieden</b-button>
              </b-col>
            </b-row>
          <h5 class="card-header" v-if="this.isUserAanZet">U bent aan zet, kies een zet:</h5>
          <b-row v-if="this.isUserAanZet">
            <b-col
              cols="6"
              v-for="zet in this.mogelijkeZetten"
              :key="zet.value"
            >
              <b-button @click="speelZet(zet.from, zet.to)">
                {{ zet.from }}
                <span v-if="zet.piecesTaken == undefined"> - </span>
                <span v-else> * </span>
                {{ zet.to }}
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="4">
          <h5 class="card-header">Gespeelde zetten</h5>
          <b-row>
            <b-col
              cols="6"
              v-for="gespeeldeZet in this.partij.zetten"
              :key="gespeeldeZet.value"
            >
              {{ gespeeldeZet.beginVeld}} - {{gespeeldeZet.eindVeld}}
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <game-chat v-bind:chat="this.partij.chat" v-bind:userSpeeltPartij="this.speeltUser" v-on:add-message="AddMessageToChat"/>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import vueBootstrap from "bootstrap-vue";
import lod from "lodash";
import draughts from "draughts";
import draughtsboard from "draughtsboard";
import GameChat from "./GameChat.vue";
Vue.use(vueBootstrap);
export default {
  name: 'Game',
  props: ["partij", "speeltUser", "isUserAanZet", "wit", "zwart"],
  components:{
    GameChat,
  },
  data() {
    return {
      partijLogic: typeof draughts,
      diagram: typeof draughtsboard,
      mogelijkeZetten: [],
    };
  },
  computed: {
    groupedTest() {
      return lod.chunk(this.board, 10);
    },
  },
  mounted() {
      this.partijLogic = new draughts()
    if(this.partij.zetten.length > 0){
     /* for (let index = 0; index < this.partij.zetten.length; index++) {
        const element = this.partij.zetten[index];
        this.partijLogic.move({
          from: element.beginVeld,
          to: element.eindVeld,
        })
        console.log("zet gespeeld");
        
      }*/
      this.partijLogic = new draughts(this.partij.zetten[this.partij.zetten.length-1].standNaZet);
    }
      console.log(this.partijLogic.fen());
    this.mogelijkeZetten = this.partijLogic.moves();
    //
  },
  methods: {
    /*test(){
      console.log(this.partij.generate_moves(32));
    },
    onSnapEnd() {
      //this.board2.position(this.partij.fen());
    },
    onMouseoutSquare(square, piece) {
      console.log(square, piece);
    },
    onMouseoverSquare(square, piece) {
      // get list of possible moves for this square
      var moves = this.partij.getLegalMoves(square);
      // rest of the coe
      console.log(square, piece);
      console.log(moves);
    },*/
    speelZet(van, naar) {
      // see if the move is legal
      var move = this.partijLogic.move({
        from: van,
        to: naar,
      });
      var newMove = {
        beginVeld: van,
        eindVeld: naar,
        partijId: this.partij.id,
        standNaZet: this.partijLogic.fen(),
      }
      console.log(this.partijLogic.fen());
      console.log(newMove)
      // illegal move
      if (move === null) {
        alert("Geen geldige zet!!");
        return;
      } else if (this.partijLogic.inDraw()) {
      this.$emit("add-move-to-game", newMove);
        //uitslag remise db update
        alert("REMISE BITCHES");
        return;
      } else if (this.partijLogic.gameOver()) {
      this.$emit("add-move-to-game", newMove);
        //uitslag winst voor laatste speler die aan zet was
          this.mogelijkeZetten = [],
          this.partijLogic.undo();
        alert("POTJE OVER" + this.partijLogic.turn() + " HEEFT GEWONNEN");
      } else {
      this.$emit("add-move-to-game", newMove);
        this.mogelijkeZetten = this.partijLogic.moves();
        return;
      }
    },
    AddMessageToChat(bericht){
      this.$emit("add-message-to-chat", bericht);
    },
    biedRemiseAan(){
      this.$emit("remise-aanbieden");
    },
    geefPartijOp(){
      this.$emit("partij-opgeven");
    }

  },
};
</script>

<style scoped>
/* clearfix */
.clearfix-7da63 {
  clear: both;
}

/* board */
.board-b72b1 {
  border: 2px solid #404040;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

/* square */
.square-55d63 {
  float: left;
  position: relative;
  /* disable any native browser highlighting */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* white square */
.white-1e1d7 {
  background-color: #fff;
  color: #31708f;
}
.unicode.w,
.unicode.W {
  color: #fff;
}
/* black square */
.black-3c85d {
  background-color: #31708f;
  color: #fff;
}
.unicode.b,
.unicode.B {
  color: #000;
}
.unicode {
  position: absolute;
  top: -40%;
}
.unicode:hover {
  position: absolute;
  top: -40%;
}
/* highlighted square */
.highlight1-32417,
.highlight2-9c5d2 {
  -webkit-box-shadow: inset 0 0 3px 3px #31b0d5;
  -moz-box-shadow: inset 0 0 3px 3px #31b0d5;
  box-shadow: inset 0 0 3px 3px #31b0d5;
}

/* notation */
.notation-322f9 {
  cursor: default;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  position: absolute;
}
.alpha-d2270 {
  bottom: 1px;
  right: 3px;
}
.numeric-fc462 {
  top: 2px;
  left: 2px;
}
.noMargin {
  margin: 0;
}
.my-col {
  border: 1px solid red;
}

.square:before {
  content: "";
  display: block;
  padding-top: 50%; /* initial ratio of 1:1*/
  padding-bottom: 25%;
}
.light {
  background-color: rgb(187, 172, 131);
}
.dark {
  background-color: rgb(122, 112, 85);
}
.white {
  background-color: white;
}
.black {
  background-color: black;
}
.test {
  margin: 5px;
  width: 60%;
  margin-left: 0%;
}
.piece {
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inherit;
}
</style>