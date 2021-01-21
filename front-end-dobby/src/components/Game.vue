<template>
 <div id="test"> 
   <h2 class="card-header">Partij</h2>
   <b-row>
     <div ref="dambord" style="width: 500px"></div>
   {{this.partij.position()}}
   </b-row>
   <h5 class="card-header">Mogelijke zetten</h5>
   <b-row>

   <div v-for="zet in this.mogelijkeZetten" :key="zet.value">
     <b-col cols="3">
     <b-button @click="speelZet(zet.from, zet.to)">
     {{zet.from}}
     <span v-if="zet.piecesTaken == undefined">
       -
     </span>
     <span v-else>
       *
     </span>
     {{zet.to}}
     </b-button>
     </b-col>
   </div>
   </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import vueBootstrap from "bootstrap-vue";
import lod from "lodash";
import draughts from "draughts";
import draughtsboard from "draughtsboard";
Vue.use(vueBootstrap);
export default {
  props: ["board"],
  data() {
    return {
      partij: typeof draughts,
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
    this.partij = new draughts();
    this.mogelijkeZetten = this.partij.moves();
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
      var move = this.partij.move({
        from: van,
        to: naar,
      });
      // illegal move
      if (move === null) {alert("Geen geldige zet!!"); return }
      else{
      this.mogelijkeZetten = this.partij.moves();
      }

    },
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
.unicode.w, .unicode.W {
  color: #fff;
}
/* black square */
.black-3c85d {
  background-color: #31708f;
  color: #fff;
}
.unicode.b, .unicode.B {
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
.highlight1-32417, .highlight2-9c5d2 {
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