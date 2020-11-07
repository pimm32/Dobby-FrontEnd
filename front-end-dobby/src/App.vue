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
  }
}
</script>


<style>
 </style>
