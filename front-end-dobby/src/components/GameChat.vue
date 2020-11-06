<template>
    <div>
        <ul class="demo">
            <li v-for="message in chat" :key="message.text">
                <ChatMessage v-bind:message="message"/>
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