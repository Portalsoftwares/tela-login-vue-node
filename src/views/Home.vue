<template>
  <div class="search">
    <label>Type a number of roons</label> <input type="number" v-model="qtd" />
    <label>Type a number of floors</label>
    <input type="number" v-model="qtd2" />
    <input type="text" placeholder="Search" v-model="search" id="usr" />
    <button @click="searchRoom()">Search</button>
  </div>

  <div class="logout">
    <h1>{{ msg }}</h1>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: null,
      qtd: null,
      qtd2: null,
      search: null,
    };
  },
  methods: {
    async getUser() {
      const req = await fetch(`${process.env.VUE_APP_API_URL}`);

      const res = await req.json();

      if (res.ok) {
        this.msg = `Bem-vindo, ${res.user.name}!`;
      } else {
        this.msg = res.mensagem;
      }
    },
    logout() {
     //alert("Logout efetuado com sucesso!")
      this.$router.push("http://localhost:8080/");
    },
    searchRoom() {
    this.$router.push({
      name: "Search",
      params: { qtd: this.qtd, qtd2: this.qtd2, search: this.search },
    });
  },
  },
  mounted() {
    this.getUser();
  },
 
};
</script>
<style>
* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  gap: 1.5em;
  border: #e40f0f 2px solid;
  padding: 1.5em;
}
#usr {
  background-image: url("https://i.imgur.com/eKw2dvH.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: 1.3em;
  padding-left: 1.3em;
}
input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}
button {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  background-color: aqua;
}
button:hover {
  background-color: #0d3140;
  color: white;
  border: #e40f0f 2px solid;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  gap: 1.5em;
  border: #e40f0f 2px solid;
  padding: 1.5em;
}

@media (max-width: 900px) {
  .search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    gap: 1.5em;
    border: #e40f0f 2px solid;
    padding: 1.5em;
  }
  .logout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    gap: 1.5em;
    border: #e40f0f 2px solid;
    padding: 1.5em;
  }
}
</style>
