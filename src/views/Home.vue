<template>
    <h1>{{ msg }}</h1>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            msg: null,
        }
    },
    methods: {
        async checar() {
            
            let token = null
            let user_id = null
            if(document.cookie.split('; ').find(row => row.startsWith('token='))){
                token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]          
            }
            if(document.cookie.split('; ').find(row => row.startsWith('id='))){
                user_id = document.cookie.split('; ').find(row => row.startsWith('id=')).split('=')[1]
            }
            const req = await fetch(`http://localhost:3000/home/${user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const res = await req.json()
            
            if(!res.ok){
                this.msg = "Você não está logado!"
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