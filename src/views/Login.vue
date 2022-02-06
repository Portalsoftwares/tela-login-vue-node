<template>
  <div id="home">
    <FormLogin />
  </div>
</template>

<script>
import FormLogin from '../components/FormLogin.vue'

export default {
  name: 'Login',
  components: {
    FormLogin
  }
}
</script>

<style>
  #home{
    background-color: #0D3140;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
