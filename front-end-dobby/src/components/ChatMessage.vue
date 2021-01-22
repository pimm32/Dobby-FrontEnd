<template>
    <div>
        <p>
            {{message.afzender.gebruikersnaam}}: {{message.tekst}} <br/> {{new Date(message.datum).toLocaleString()}}
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