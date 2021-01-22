<template>
    <div>
        <h2 class="card-header">Chat</h2>
        <ul class="demo">
            <li v-for="bericht in chat.berichten" :key="bericht.id">
                <ChatMessage v-bind:message="bericht"/>
            </li>
        </ul>
        <b-row v-if="this.userSpeeltPartij">
            <b-col cols="9">
        <b-form-input v-model="newBericht" placeholder="Voer uw bericht in"/>
            </b-col>
            <b-col cols="3">
                <b-button @click="verstuurBericht"> Verstuur </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
//import axios from "axios";
//import Vue from "vue";
import ChatMessage from "../components/ChatMessage";
export default {
    name: "GameChat",
    props:["chat", "userSpeeltPartij"],
    components: {
        ChatMessage
    },
    data(){
        return{
            newBericht: "",
        }
    },
    methods:{
        verstuurBericht(){
            this.$emit("add-message", this.newBericht);
            this.newBericht = "";
        }
    }
    
}
</script>

<style scoped>

</style>