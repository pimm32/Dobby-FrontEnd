  <template>
  <div id="app" class="mt-0">
    <Header />
    <router-view/>
    <notifications group="btm-lft" position="bottom left" width=500 ignoreDuplicates />
    <notifications group="top-ctr" position="top center" width=500 ignoreDuplicates />
  </div>
</template>

<script>
import Header from './components/layout/Header';
import Vue from 'vue';
import notifications from 'vue-notification';
Vue.use(notifications);
//import Navbar from './components/Navbar';
export default {
  name:"app",
  components: {
    Header,
    //Navbar,
  },
  methods: {
    getApiDomain(){
      if(window.location.href.substring(0, 15) === "http://localhost"){
        this.apiDomain = "https://localhost:44300/";
      }
      else{
        this.apiDomain = "https://i417025core.venus.fhict.nl/";
      }
    }
  }
}
</script>


<style>
 </style>
