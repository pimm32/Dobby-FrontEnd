<template>
    <div>
        <p>
        {{message.color}}: {{message.text}}
        </p>
    </div>
</template>>
    
<script>
export default {
    name: "ChatBericht",
    props: ["message"],
    data() {
        return{
            
        }
    },
    components :{

    },
    methods: {

    },
}
</script>

<style scoped>

</style>