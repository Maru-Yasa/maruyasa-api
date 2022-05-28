const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    cookieExtractor : (req) => {
        var token = null;
        if (req && req.cookies)
        {
            token = req.cookies['jwt'];
        }
        return token;
    },
    createToken : (obj) => {
        let token = ""
        token = jwt.sign(obj, process.env.SECRET, { expiresIn: '24h' })
        return token
    }
}