 <template>
  <div>
    <b-form
      @submit="Registreren"
      @reset="Reset"
      v-if="show"
      :class="[`${windowWidth > 800 ? 'special__class' : 'normal__class'}`]"
    >
      <b-form-group
        id="input-group-1"
        label="Gebruikersnaam:"
        label-for="input-reg-gebruikersnaam"
        description="Voer hier een gebruikersnaam in"
      >
        <b-form-input
          id="input-reg-gebruikersnaam"
          v-model="gebruikersnaam"
          type="text"
          required
          placeholder="DamKoning078"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="E-mail:"
        label-for="input-reg-email"
        description="Voer hier uw Email in"
      >
        <b-form-input
          id="input-reg-email"
          v-model="email"
          type="email"
          required
          placeholder="haarlemmer@kingshot.com"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Wachtwoord:"
        label-for="input-reg-wachtwoord"
        description="Voer hier uw wachtwoord in"
      >
        <b-form-input
          id="input-reg-wachtwoord"
          v-model="wachtwoord"
          type="password"
          required
          placeholder="***********"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Herhaal wachtwoord:"
        label-for="input-reg-wachtwoord2"
        description="Voer hier uw wachtwoord nogmaals in"
      >
        <b-form-input
          id="input-reg-wachtwoord2"
          v-model="wachtwoord2"
          type="password"
          required
          placeholder="***********"
        >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mr-2 btn"
        >Registreer</b-button
      >
      <b-button type="reset" variant="danger" class="ml-2 btn">Reset</b-button>
     
        <b-list-group class="mt-5">
      <b-list-group-item variant="danger" v-if="!$v.gebruikersnaam.required"> Gebruikersnaam is verplicht!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.gebruikersnaam.minLength">Gebruikersnaam moet minimaal {{$v.gebruikersnaam.$params.minLength.min}} karakters zijn!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.gebruikersnaam.maxLength">Gebruikersnaam mag maximaal {{$v.gebruikersnaam.$params.maxLength.max}} karakters zijn!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.email.required">Email is verplicht!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.email.email">Dit is geen geldig email adres!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.wachtwoord.required">Wachtwoord is verplicht!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.wachtwoord.minLength">Wachtwoord moet minimaal {{$v.wachtwoord.$params.minLength.min}} karakters zijn!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.wachtwoord.maxLength">Wachtwoord mag maximaal {{$v.wachtwoord.$params.maxLength.max}} karakters zijn!</b-list-group-item>
      <b-list-group-item variant="danger" v-if="!$v.wachtwoord2.sameAswachtwoord">Wachtwoorden komen niet overeen!</b-list-group-item>
      <b-list-group-item variant="info" v-if="$v.$invalid"> <kbd>Ongeldige invoer</kbd></b-list-group-item>
      <b-list-group-item variant="success" v-if="!$v.$invalid"> <kbd>Geldige invoer</kbd></b-list-group-item>
    </b-list-group>
        
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import Axios from "axios";
import firebase from "firebase";
import { required, minLength, maxLength, sameAs, email } from "vuelidate/lib/validators";
Vue.use(Vuelidate);
export default {
  data() {
    return {
        gebruikersnaam: "",
        wachtwoord: "",
        wachtwoord2: "",
        email: "",
      show: true,
      windowWidth: window.innerWidth,
      apiDomain: "",
    };
  },
  methods: {
    Registreren() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.wachtwoord)
        .then(data => {
          data.user
            .updateProfile({
              displayName : this.gebruikersnaam,             
            })
            .then(() => {this.Register(),  this.$router.replace({ name: "dashboard" })});

        })
        .catch(err => {
          alert(err.message)
        })
    },
    Register(){
        Axios({
        method: "post",
        url: this.apiDomain + "gebruiker/Post",
        data: {
        Gebruikersnaam: this.gebruikersnaam,
        Email: this.email,
        Rating: 1200,
        },
      })
      .then(
        this.$notify({
        group: "top-ctr",
        title: "Succesvolle registratie!",
        text: "Gefeliciteerd u heeft succesvol uw nieuwe account("+this.gebruikersnaam+") geregistreerd!",
        duration: 10000,
        type: "success"
        
      }));
    },
    Reset(e) {
      e.preventDefault();
      this.gebruikersnaam = "";
      this.wachtwoord = "";
      this.wachtwoord2 = "";
      this.email = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  validations: {
    gebruikersnaam:{
      required,
      minLength: minLength(4),
      maxLength: maxLength(24),
    },
    wachtwoord:{
      required,
      minLength: minLength(4),
      maxLength: maxLength(24),
    },
    wachtwoord2:{
      required,
      sameAswachtwoord: sameAs('wachtwoord'),
    },
    email:{
      required,
      email,
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  created(){
    if(window.location.href.substring(0, 16) === "http://localhost"){
        this.apiDomain = "https://localhost:44300/";
      }
      else{
        this.apiDomain = "https://i417025core.venus.fhict.nl/";
      }
  }
};
</script>

<style scoped>
.special__class{
    margin-left: 25%;
    margin-right: 25%;
}
.normal__class{
    margin-left: 5%;
    margin-right: 5%;
}
</style>