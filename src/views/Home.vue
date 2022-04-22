<template>
  <h1>{{ msg }}</h1>
  <button @click="logout()">Logout</button>
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
    async getUser() {      

      const req = await fetch(`${process.env.VUE_APP_API_URL}`)

      const res = await req.json()

      if(res.ok){
        this.msg = `Bem-vindo, ${res.user.name}!`
      } else {
        this.msg = res.mensagem
      }
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>