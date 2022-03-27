<template>
    <div id="form-bg">
        <h1>Login</h1>
        <Input @custom-change="this.email = $event" type="email" input="E-mail"/>
        <br>
        <Input @custom-change="this.senha = $event" type="password" input="Senha"/>
        <Button @click="logar" msg="Login" />
        <p class="no-acc-txt">Não possui uma conta?</p>
        <router-link to="/register"><p class="new-acc-txt">Criar uma nova conta</p></router-link>
    </div>
</template>

<script>
import Input from './form/Input.vue'
import Button from './form/Button.vue'

export default {
    name: 'Form',
    components: {
        Input,
        Button
    },
    data(){
        return {
            email: null,
            senha: null
        }
    },
    methods: {
        async logar() {
            const data = {
                email: this.email,
                senha: this.senha
            }

            const dataJson = JSON.stringify(data)

            const req = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: dataJson
            })

            const res = await req.json()

            if(!res.ok){
                console.log('erro ao fazer o login');
                console.log(res.mensagem);
            }else {
                document.cookie = `token=${res.token}`
                document.cookie = `id=${res.id}`
                console.log('logado com sucesso!');
                this.$router.push('home')
            }
        }
    }
}
</script>

<style>
    #form-bg{
        background-color: #2DAADF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: min(450px, 90vw);
        height: 50%;
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        color: rgb(0, 0, 0);
    }
    #form-bg h1{
        margin-bottom: 20px;
    }
    .no-acc-txt{
        color: #0D3140;
    }
    .new-acc-txt{
        font-size: 12px;
        padding: 5px;
        color: #1A6180;
        cursor: pointer;
    }
</style>