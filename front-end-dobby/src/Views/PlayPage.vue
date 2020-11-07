<template>
    <div>
        <Game v-bind:board="bord" v-if="show"/>
        <GameChat v-bind:chat="chatberichten"/>
    </div>
</template>

<script>
import Game from "../components/Game";
import GameChat from "../components/GameChat";
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
                {field:0},
                {piece:"black", field:1},
                {field:2},
                {piece:"black", field:3},
                {field:4},
                {piece:"black", field:5},
                {field:6},
                {piece:"black", field:7},
                {field:8},
                {piece:"black", field:9},
                {piece:"black", field:10},
                {field:11},
                {piece:"black", field:12},
                {field:13},
                {piece:"black", field:14},
                {field:15},
                {piece:"black", field:16},
                {field:17},
                {piece:"black", field:18},
                {field:19},
                {field:20},
                {piece:"black", field:21},
                {field:22},
                {piece:"black", field:23},
                {field:24},
                {piece:"black", field:25},
                {field:26},
                {piece:"black", field:27},
                {field:28},
                {piece:"black", field:29},
                {piece:"black", field:30},
                {field:31},
                {piece:"black", field:32},
                {field:33},
                {piece:"black", field:34},
                {field:35},
                {piece:"black", field:36},
                {field:37},
                {piece:"black", field:38},
                {field:39},
                {field:40},
                {field:41},
                {field:42},
                {field:43},
                {field:44},
                {field:45},
                {field:46},
                {field:47},
                {field:48},
                {field:49},
                {field:50},
                {field:51},
                {field:52},
                {field:53},
                {field:54},
                {field:55},
                {field:56},
                {field:57},
                {field:58},
                {field:59},
                {field:60},
                {piece:"white", field:61},
                {field:63},
                {piece:"white", field:63},
                {field:64},
                {piece:"white", field:65},
                {field:66},
                {piece:"white", field:67},
                {field:68},
                {piece:"white", field:69},
                {piece:"white", field:70},
                {field:71},
                {piece:"white", field:72},
                {field:73},
                {piece:"white", field:74},
                {field:75},
                {piece:"white", field:76},
                {field:77},
                {piece:"white", field:78},
                {field:79},
                {field:80},
                {piece:"white", field:81},
                {field:82},
                {piece:"white", field:83},
                {field:84},
                {piece:"white", field:85},
                {field:86},
                {piece:"white", field:87},
                {field:88},
                {piece:"white", field:89},
                {piece:"white", field:90},
                {field:91},
                {piece:"white", field:92},
                {field:93},
                {piece:"white", field:94},
                {field:95},
                {piece:"white", field:96},
                {field:97},
                {piece:"white", field:98},
                {field:99},

            ],
            show: false,
        };
        
    },
    components:{
            GameChat,
            Game,
        }
    
}
</script>

<style scoped>

</style>