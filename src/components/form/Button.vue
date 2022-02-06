<template>
    <button>{{ msg }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        msg: String
    }
}
</script>

<style scoped>
    button{
        width: 80px;
        height: 40px;
        border: 2px solid rgb(0, 0, 0);
        background-color: rgb(0, 0, 0);
        border-radius: 10px;
        cursor: pointer;
        transition: .5s;
        margin-top: 15px;
        margin-bottom: 20px;
        color: white;
    }
    button:hover{
        background-color: transparent;
        color: white;
    }
</style>