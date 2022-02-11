<template>
    <h1>{{ msg }}</h1>
</template>

<script>
export default {
    name: 'Home',
    props: {
        user_id: {
            type: String,
            default: 0
        }
    },
    data() {
        return {
            msg: null
        }
    },
    methods: {
        async checar() {

            const token = localStorage.getItem('token')

            const req = await fetch(`http://localhost:3000/autenticar/${this.user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const res = await req.json()
            
            if(!res.ok){
                this.msg = "Você não tem autorização para visualizar esta página"
                console.log(res);
            } else {
                this.msg = `Bem-vindo ${res.user.nome}!`
                console.log(res);
            }

        }
    },
    mounted() {
        this.checar()
    }
}
</script>