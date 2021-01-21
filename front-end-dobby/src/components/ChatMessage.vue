<template>
    <div>
        <p>
            {{message.afzender.gebruikersnaam}}: {{message.tekst}} om {{new Date(message.datum).toDateString()}}
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