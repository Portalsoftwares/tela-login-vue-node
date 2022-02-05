<template>
  <div class="home">    
    <input type="text" v-model="email" name="email" id="email"><br>
    <input type="text" v-model="senha" name="senha" id="senha"><br>
    <button @click="logar">Login</button>
  </div>
</template>

<script>



export default {
  name: 'Home',
  data(){
    return {
      email: null,
      senha: null
    }
  },
  methods: {
    async logar(){
      
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

      console.log(res);
      
    }
  }
};
</script>
