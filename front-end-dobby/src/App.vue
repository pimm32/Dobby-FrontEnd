  <template>
  <div id="app" class="mt-0">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header';
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
        return "https://localhost:44300/";
      }
      else{
        return "https://i417025core.venus.fhict.nl/";
      }
    }
  }
}
</script>


<style>
 </style>
