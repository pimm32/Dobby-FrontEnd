<template>
    <div>
        <h2 class="card-header">Zetten</h2>
        <ul class="demo">
            <b-row>
                <b-col cols="6" v-for="zet in zetten" :key="zet.id">
                    <Zet v-bind:zet="zet"/>
                </b-col>
            </b-row>
        </ul>
    </div>
</template>

<script>
import Zet from "../components/Zet.vue";
export default {
    name: "GameChat",
    props:["zetten"],
    components: {
        Zet
    }
    
}
</script>

<style scoped>

</style>