const express = require('express')
const Router = express.Router()
const passport = require('../auth')
const { authJWT } = require('../middlewares')
const UserModel = require('../models/User')
const { createToken } = require('../utils')

Router.post('/login', async (req,res) => {
    const body = req.body
    console.log(body);
    const user = await UserModel.findOne({email : body.email})
    if (!user) {
        return res.status(403).json({
            message : "Email or password invalid"
        })
    }
    const isValidPassword = await user.isValidPassword(body.password)
    if(!isValidPassword) {
        return res.status(403).json({
            message : "Email or password invalid"
        })    
    }
    const token = createToken({
        _id : user._id,
        username : user.username,
        email : user.email
    })

    return res.status(200).json({
        message : "Success login",
        data : {
            token : token,
            type : "Bearer"
        }
    })
})


Router.get('/me', authJWT, (req, res) => {
    return res.status(200).json({
        message : "Success get your user",
        data : req.user
    })
})

module.exports = Router