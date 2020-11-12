<template>
  <b-container  class="bv-example-row test">
      <b-row v-for="row in groupedTest" :key="row.index" no-gutters>
        <b-col v-for="field in row" :key="field.field">
        <div v-if="field.piece != null">
            <div v-if="field.piece == 'white'" class="square white"/>
            <div v-if="field.piece == 'black'" class="square black"/>
        </div>
        
        <div v-else class="square" :class="[`${(field.color == 'light') ? 'light' : 'dark'}`]">
        
        
        
        
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";
import vueBootstrap from "bootstrap-vue";
import lod from "lodash";
Vue.use(vueBootstrap);
export default {
  props: ["board"],
  data() {
    return {};
  },
  computed:{
      groupedTest(){
      return lod.chunk(this.board, 10);
      }
  }
};
</script>

<style scoped>
.noMargin {
  margin: 0;
}
.my-col{
    border: 1px solid red;
}

.square:before{
    content: "";
    display: block;
    padding-top: 50%;  /* initial ratio of 1:1*/
    padding-bottom: 25%;
}
.light{
    background-color: rgb(187, 172, 131);
}
.dark{
    background-color: rgb(122, 112, 85);
}
.white{
    background-color: white;
}
.black{
    background-color: black;
}
.test{
    margin: 5px;
    width: 60%;
    margin-left: 0%;
}
.piece{
    height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display:inherit;
}
</style>