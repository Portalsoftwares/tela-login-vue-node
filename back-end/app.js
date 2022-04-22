require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { checkToken, isAuth } = require('./middlewares/checkToken')


const app = express()
app.use(express.json())
app.use(cors())
app.use(checkToken)

// importando modelo de usuario
const User = require('./models/User')


// rota de teste 
app.get('/', isAuth, (req, res) => {
  res.status(200).send({user: req.decoded, ok: true})
})

// rota para autenticação
app.get('/admin', isAuth, async (req, res) => {
  // checar se o usuario existe
  const user = await User.findById(id, '-password')

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado", ok: false })
  }

  res.status(200).json({ user, ok: true })

})

// registro
app.post('/registrar', async (req, res) => {
  const { nome, email, senha, confirmasenha } = req.body

  // validação dos campos
  if (!nome) {
    return res.status(422).json({ mensagem: 'O nome é obrigatório!', ok: false })
  }
  if (!email) {
    return res.status(422).json({ mensagem: 'O e-mail é obrigatório!', ok: false })
  }
  if (!senha) {
    return res.status(422).json({ mensagem: 'A senha é obrigatória!', ok: false })
  }
  if (senha !== confirmasenha) {
    return res.status(422).json({ mensagem: 'As senhas não conferem!', ok: false })
  }


  // checar se o usuario ja existe no banco
  const userExist = await User.findOne({ email: email })

  if (userExist) {
    return res.status(422).json({ mensagem: 'E-mail ja registrado!', ok: false })
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

    res.status(201).json({ mensagem: "Usuário criado com sucesso!", ok: true })

  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Ocorreu um erro com o servidor, por favor, tente novamente mais tarde!", ok: false })
  }


})

// login
app.post('/login', async (req, res) => {

  const { email, senha } = req.body

  // validacao
  if (!email) {
    return res.status(422).json({ mensagem: 'O e-mail é obrigatório!', ok: false })
  }
  if (!senha) {
    return res.status(422).json({ mensagem: 'A senha é obrigatória!', ok: false })
  }

  // checar se o usuário existe
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(422).json({ mensagem: "Usuário não encontrado!", ok: false })
  }

  // checar se a senha confere
  const senhaCheck = await bcrypt.compare(senha, user.senha)

  if (!senhaCheck) {
    return res.status(422).json({ mensagem: 'Senha inválida!', ok: false })
  }


  try {

    let cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000 ),
      httpOnly: true
    }

    const secret = process.env.SECRET

    const token = jwt.sign({
      id: user._id,
      name: user.nome
    },
      secret,
      {
        expiresIn: '1h',
      })

    res
    .cookie('token', token, cookieOptions)
    .status(200)
    .json({ok: true})

  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: 'Ocorreu um erro com o servidor, por favor, tente novamente mais tarde!', ok: false })
  }
})

// conexao com o banco
const PORT = 8081
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const mongoDBUrl = `mongodb+srv://${dbUser}:${dbPassword}@apicluster.kbp4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoDBUrl)
  .then(() => {
    console.log('Conectou ao banco!');
  }).catch((err) => {
    console.log(err);
  })

app.listen(PORT, () => console.log('Servidor aberto!'))