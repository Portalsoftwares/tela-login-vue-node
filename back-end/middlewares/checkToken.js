const jwt = require('jsonwebtoken')

// funcao para checar o token
module.exports = {
  checkToken: async function (req, res, next) {
    const token = req.headers.cookie
     ? req.headers.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
     : null

    if(!token){
      return next()
    }
  
    try {
      const secret = process.env.SECRET
      const decodedToken = await jwt.verify(token, secret)
      req.decoded = decodedToken
      next()
    } catch (error) {
      res.status(400).json({mensagem: 'Token inválido', ok: false})
    }
  },
  isAuth: async function (req, res, next) {
    if(req.decoded){
      return next()
    }
    res.status(401).send({mensagem: 'Sem permissão!', ok: false})
  }
}