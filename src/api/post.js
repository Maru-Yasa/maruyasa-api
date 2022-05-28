const { validate } = require('express-validation')
const { authJWT } = require('../middlewares')
const PostModel = require('../models/Post')
const { createPostValidation, updatePostValidation, deletePostValidation } = require('./dtos/postDtos')
const { createPost, updatePost, deletePost } = require('./services/postService')

const Router = require('express').Router()

Router.get('/', async (req, res) => {
    const post = await PostModel.findById(req.body.id)
    return res.status(200).json({
        message : "Success get post",
        data : post
    })
})

Router.get('/all', async (req, res) => {
    const posts = await PostModel.find()
    return res.status(200).json({
        message : "Success get all posts",
        data : posts
    })
})

Router.post('/create', authJWT, validate(createPostValidation, {}, {}), async (req, res) => {
    let postData = req.body
    postData.author = req.user.username
    const newPost = await createPost(postData)
    return res.status(200).json({
        message : "Success creating new post",
        data : newPost
    })
})

Router.post('/update', authJWT, validate(updatePostValidation), async (req, res) => {
    let postData = req.body
    const newPost = await updatePost(postData)
    return res.status(200).json({
        message : "Success updating new post",
        data : newPost
    })
})

Router.post('/delete', authJWT, validate(deletePostValidation), async (req, res) => {
    const isDeleted = await deletePost(req.body.id)
    if(isDeleted) return res.status(200).json({
        message : "Success deleting new post",
    })
})

module.exports = Router