<template>
 <div id="test"> {{board2}} </div>
</template>

<script>
import Vue from "vue";
import vueBootstrap from "bootstrap-vue";
import lod from "lodash";
import draughts from "draughts";
import draughtsBoard from "draughtsboard";
Vue.use(vueBootstrap);
export default {
  props: ["board"],
  data() {
    return {
      partij: typeof draughts,
      board2: typeof draughtsBoard,
    };
  },
  computed: {
    groupedTest() {
      return lod.chunk(this.board, 10);
    },
  },
  created() {
    this.partij = new draughts();
    console.log(this.partij);
    console.log(this.partij.fen())
    console.log(this.partij.ascii());
    console.log(this.partij.getMoves());
    
  },
  mounted() {
    
    this.board2 = new draughtsBoard("test");
    this.board2.position = this.partij.fen();
    console.log(this.board2);
    
  },
  methods: {
    test(){
      console.log(this.partij.getLegalMoves());
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
    },
    onDrop(source, target) {
      // see if the move is legal
      var move = this.partij.move({
        from: source,
        to: target,
      });
      // illegal move
      if (move === null) return "snapback";
      console.log(source, target);
    },
    onDragStart(source, piece, position, orientation) {
      // do not pick up pieces if the game is over
      if (this.partij.gameOver()) return false;
      console.log(source, piece, position, orientation);
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