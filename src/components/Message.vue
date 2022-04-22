<template>
    <div class="message-container">
        <p>{{msg}}</p>
    </div>
</template>

<script>
export default {
  name: "Message",
  props: {
      msg: String
  }
}
</script>

<style scoped>
.message-container{
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px 10px 10px 20px;
  width: min(400px, 90vw);
  margin: 10px 0 10px 0;
  color: #290000;
  font-size: 15px;
}
</style>