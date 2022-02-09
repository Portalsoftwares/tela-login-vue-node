require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// importando modelo de usuario
const User = require('./models/User')

// teste 
app.get('/', (req, res) => {
    res.status(200).json({message: "deu certoooooooooo"})
})


// rota para autenticação
app.post('/autenticar', checkToken, async (req, res) =>{
    const id = req.params.id

    // checar se o usuario existe
    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({message: "Usuário não encontrado", ok: false})
    }
    
    res.status(200).json({user, ok: true})

})


// funcao para checar o token
function checkToken(req, res, next) {
    const authHeader = req.headers['autorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({mensagem: 'Acesso negado!', ok: false})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (error) {
        res.status(400).json({mensagem: 'Token inválido', ok: false})
    }



}


// registro
app.post('/registrar', async (req, res) =>{
    const {nome, email, senha, confirmasenha} = req.body

    // validação dos campos
    if(!nome){
        return res.status(422).json({mensagem: 'O nome é obrigatório!', ok: false})
    }
    if(!email){
        return res.status(422).json({mensagem: 'O email é obrigatório!', ok: false})
    }
    if(!senha){
        return res.status(422).json({mensagem: 'A senha é obrigatória!', ok: false})
    }
    if(senha !== confirmasenha){
        return res.status(422).json({mensagem: 'As senhas não conferem!', ok: false})
    }


    // checar se o usuario ja existe no banco
    const userExist = await User.findOne({email: email})

    if(userExist){
        return res.status(422).json({mensagem: 'Email ja registrado!', ok: false})
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

        res.status(201).json({mensagem: "Usuário criado com sucesso!", ok: true})

    } catch (error) {
        console.log(error);
        res.status(500).json({mensagem: "Ocorreu um erro com o servidor, por favor, tente novamente mais tarde!", ok: false})
    }


})

// login
app.post('/login', async (req, res) => {
    const {email, senha} = req.body

    // validacao
    if(!email){
        return res.status(422).json({mensagem: 'O email é obrigatório!', ok: false})
    }
    if(!senha){
        return res.status(422).json({mensagem: 'A senha é obrigatória!', ok: false})
    }

    // checar se o usuário existe
    const user = await User.findOne({email: email})

    if(!user){
        return res.status(422).json({mensagem: "Usuário não encontrado!", ok: false})
    }

    // checar se a senha confere
    const senhaCheck = await bcrypt.compare(senha, user.senha)

    if(!senhaCheck){
        return res.status(422).json({mensagem: 'Senha inválida!', ok: false})
    }

    try {
        
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id
        }, secret)

        res.status(200).json({mensagem: "Autenticação realizada com sucesso!", token, ok: true})


    } catch (error) {
        console.log(error);
        res.status(500).json({mensagem: 'Ocorreu um erro com o servidor, por favor, tente novamente mais tarde!', ok: false})
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