<template>
    <div>
        <br/> <br/> <br/>
        <b-row>
            <b-col cols="4"/>
            <b-col cols="2">
                speler 1 id
            </b-col>
            <b-col cols="2">
                speler 2 id
            </b-col>
            <b-col cols="4"/>
        </b-row>
        <br/> <br/> <br/> <br/> 
        <b-row>
            <b-col cols="2"/>
            <b-col cols="4">
            <Game v-bind:board="bord"/>
            </b-col>
            <b-col cols="3" height="120px">
                USER 1
                 
                USER 2
            </b-col>
            <b-col cols="3">
                <game-chat v-bind:chat="chatberichten"/>
            </b-col>

        </b-row>
        
    </div>
</template>

<script>
import Game from "../components/Game";
import GameChat from '../components/GameChat.vue';
export default {
    data(){
        return{
            chatberichten:[
                {color:"white", text:"blabla1"},
                {color:"black", text:"blabla2"},
                {color:"black", text:"blabla3"},
                {color:"white", text:"blabla4"},
                {color:"black", text:"blabla5"},

            ],
            bord:[
                {color:"light", field:0},
                {piece:"black", field:1},
                {color:"light",field:2},
                {piece:"black", field:3},
                {color:"light",field:4},
                {piece:"black", field:5},
                {color:"light",field:6},
                {piece:"black", field:7},
                {color:"light",field:8},
                {piece:"black", field:9},
                {piece:"black", field:10},
                {color:"light",field:11},
                {piece:"black", field:12},
                {color:"light",field:13},
                {piece:"black", field:14},
                {color:"light",field:15},
                {piece:"black", field:16},
                {color:"light",field:17},
                {piece:"black", field:18},
                {color:"light",field:19},
                {color:"light",field:20},
                {piece:"black", field:21},
                {color:"light",field:22},
                {piece:"black", field:23},
                {color:"light",field:24},
                {piece:"black", field:25},
                {color:"light",field:26},
                {piece:"black", field:27},
                {color:"light",field:28},
                {piece:"black", field:29},
                {piece:"black", field:30},
                {color:"light",field:31},
                {piece:"black", field:32},
                {color:"light",field:33},
                {piece:"black", field:34},
                {color:"light",field:35},
                {piece:"black", field:36},
                {color:"light",field:37},
                {piece:"black", field:38},
                {color:"light",field:39},
                {color:"light",field:40},
                {color:"dark",field:41},
                {color:"light",field:42},
                {color:"dark",field:43},
                {color:"light",field:44},
                {color:"dark",field:45},
                {color:"light",field:46},
                {color:"dark",field:47},
                {color:"light",field:48},
                {color:"dark",field:49},
                {color:"dark",field:50},
                {color:"light",field:51},
                {color:"dark",field:52},
                {color:"light",field:53},
                {color:"dark",field:54},
                {color:"light",field:55},
                {color:"dark",field:56},
                {color:"light",field:57},
                {color:"dark",field:58},
                {color:"light",field:59},
                {color:"light",field:60},
                {color:"dark",piece:"white", field:61},
                {color:"light",field:62},
                {color:"dark",piece:"white", field:63},
                {color:"light",field:64},
                {color:"dark",piece:"white", field:65},
                {color:"light",field:66},
                {color:"dark",piece:"white", field:67},
                {color:"light",field:68},
                {color:"dark",piece:"white", field:69},
                {color:"dark",piece:"white", field:70},
                {color:"light",field:71},
                {color:"dark",piece:"white", field:72},
                {color:"light",field:73},
                {color:"dark",piece:"white", field:74},
                {color:"light",field:75},
                {color:"dark",piece:"white", field:76},
                {color:"light",field:77},
                {color:"dark",piece:"white", field:78},
                {color:"light",field:79},
                {color:"light",field:80},
                {color:"dark",piece:"white", field:81},
                {color:"light",field:82},
                {color:"dark",piece:"white", field:83},
                {color:"light",field:84},
                {color:"dark",piece:"white", field:85},
                {color:"light",field:86},
                {color:"dark",piece:"white", field:87},
                {color:"light",field:88},
                {color:"dark",piece:"white", field:89},
                {color:"dark",piece:"white", field:90},
                {color:"light",field:91},
                {color:"dark",piece:"white", field:92},
                {color:"light",field:93},
                {color:"dark",piece:"white", field:94},
                {color:"light",field:95},
                {color:"dark",piece:"white", field:96},
                {color:"light",field:97},
                {color:"dark",piece:"white", field:98},
                {color:"light",field:99},

            ],
            show: false,
        };
        
    },
    components:{
           // GameChat,
            Game,
        GameChat,
        }
    
}
</script>

<style scoped>

</style>