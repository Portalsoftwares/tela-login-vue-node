require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

// importando modelo de usuario
const User = require('./models/User')


// teste 
app.get('/', (req, res) => {
    res.status(200).json({message: "deu certoooooooooo"})
})
// registro
app.post('/registrar', async (req, res) =>{
    const {nome, email, senha, confirmasenha} = req.body

    // validação dos campos
    if(!nome){
        return res.status(422).json({mensagem: 'O nome é obrigatório!'})
    }
    if(!email){
        return res.status(422).json({mensagem: 'O email é obrigatório!'})
    }
    if(!senha){
        return res.status(422).json({mensagem: 'A senha é obrigatória!'})
    }
    if(senha !== confirmasenha){
        return res.status(422).json({mensagem: 'As senhas não conferem!'})
    }


    // checar se o usuario ja existe no banco
    const userExist = await User.findOne({email: email})

    if(userExist){
        return res.status(422).json({mensagem: 'Email ja registrado!'})
    }

    // criar a senha
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha, salt)

    // criar o usuario
    const user = new User({
        nome,
        email,
        senha: senhaHash
    })

    try {
        await user.save()

        res.status(201).json({mensagem: "Usuário criado com sucesso!"})

    } catch (error) {
        console.log(error);
        res.status(500).json({mensagem: "Ocorreu um erro com o servidor, por favor, tente novamente mais tarde!"})
    }


})

// login
app.post('/login', async (req, res) => {
    const {email, senha} = req.body

    // validacao
    if(!email){
        return res.status(422).json({mensagem: 'O email é obrigatório!'})
    }
    if(!senha){
        return res.status(422).json({mensagem: 'A senha é obrigatória!'})
    }

    // checar se o usuário existe
    const user = await User.findOne({email: email})

    if(!user){
        return res.status(422).json({mensagem: "Usuário não encontrado!"})
    }

    // checar se a senha confere
    const senhaCheck = await bcrypt.compare(senha, user.senha)

    if(!senhaCheck){
        return res.status(422).json({mensagem: 'Senha inválida!'})
    }

    try {
        
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id
        }, secret)

        res.status(200).json({mensagem: "Autenticação realizada com sucesso!", token})


    } catch (error) {
        console.log(error);
        res.status(500).json({mensagem: 'Ocorreu um erro com o servidor, por favor, tente novamente mais tarde!'})
    }




})





// conexao com o banco
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@apicluster.kbp4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000)
    console.log('Conectou ao banco!');
}).catch((err) =>{
    console.log(err);
})