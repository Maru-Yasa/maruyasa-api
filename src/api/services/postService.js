const PostModel = require("../../models/Post")

module.exports = {
    createPost : async (body) => {
        const blogdata = {
            title : body.title,
            author : body.author,
            thumbnail : body.thumbnail,
            content : body.content
        }

        PostModel.create(blogdata, (err, blog) => {
            if(!err) return err
            return blog
        })
    },
    
    updatePost : async (postdata) => {
        console.log(postdata);
        const id = await postdata.id
        delete postdata.id
        await PostModel.findByIdAndUpdate(id, postdata, (err, post) => {
            if(err) return err
            return post
        }).clone()
    },

    deletePost : async (id) => {
        await PostModel.findByIdAndDelete(id)
        return true;
    }
}