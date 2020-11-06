<template>
    <div>
        <div v-for="field in board" :key="field.field" class="noMargin">
            <div v-if="field.piece != null"> {{field.piece}}</div>
            <div v-else> {{field.field}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:["board"],
    data (){
        return{

        }
    }
    
}
</script>

<style scoped>
.noMargin{
margin: 0;
}
</style>