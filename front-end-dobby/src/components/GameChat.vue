<template>
    <div>
        <h2 class="card-header">Chat</h2>
        <ul class="demo">
            <li v-for="bericht in chat.berichten" :key="bericht.id">
                <ChatMessage v-bind:message="bericht"/>
            </li>
        </ul>
    </div>
</template>

<script>
//import axios from "axios";
//import Vue from "vue";
import ChatMessage from "../components/ChatMessage";
export default {
    name: "GameChat",
    props:["chat"],
    components: {
        ChatMessage
    }
    
}
</script>

<style scoped>

</style>