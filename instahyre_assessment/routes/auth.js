const jwt = require('jsonwebtoken');
const User = require('../models').User;
const {isEmpty} = require('lodash');

const authorization = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(isEmpty(token)) return res.status(401).send("Access Denied!, Add Token in the header");
    try{
        const verification = await jwt.verify(token, process.env.TOKEN_SECRET)
        const {email} = verification ;
        const isUser = await User.findOne({ where: { email } });
        if (isEmpty(isUser)) {
            res.send("Invalid token/user")
            throw new Error({ message: 'User not found' })
        }
        req.user = isUser
        next();
    }
    catch(error){
        res.status(400).send('Invalid Token')
    }

}
module.exports = authorization