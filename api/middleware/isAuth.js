const jwt = require('jsonwebtoken')

/* Middleware to validate the user token 
to authenticate the API endpoints */
module.exports = function (req, res, next) {
    const token = req.header('authorization')

    if (token) {
        try {

            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next()

        } catch (err) {
            console.log(err, 'err');
            res.status(401).send({ error: 'unauthorized' })
        }

    } else {
        res.status(401).send({ error: 'unauthorized' })
    }

}

