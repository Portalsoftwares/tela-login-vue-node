<template>
    <div id="form-bg">
        <h1>Criar uma nova conta</h1>
        <Input @custom-change="this.nome = $event" type="text" input="Nome"/>
        <br>
        <Input @custom-change="this.email = $event" type="email" input="E-mail"/>
        <br>
        <Input @custom-change="this.senha = $event" type="password" input="Senha"/>
        <br>
        <Input @custom-change="this.confirmarsenha = $event" type="password" input="Confirmar Senha"/>
        <br>
        <Button @click="teste" msg="Criar"/>
        <p class="no-acc-txt">Já possui uma conta?</p>
        <router-link to="/"><p class="new-acc-txt">Entrar com uma conta existente</p></router-link>
    </div>
</template>

<script>
import Input from './form/Input.vue'
import Button from './form/Button.vue'

export default {
    name: 'FormRegister',
    components: {
        Input,
        Button
    },
    data() {
        return {
            email: null,
            nome: null,
            senha: null,
            confirmarsenha: null
        }
    },
    methods: {
        async teste() {
            console.log(this.email, this.nome, this.senha, this.confirmarsenha);
        }
    }
}
</script>

<style scoped>
    #form-bg{
        width: 500px;
        height: 500px;
    }
</style>

