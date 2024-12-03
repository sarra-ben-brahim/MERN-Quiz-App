const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../models/model.user');


const protect =  (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if(!accesstoken) {
        return res.status(401).json({message: 'Not authorized, token is required'});
    }else{
        jwt.verify(accesstoken, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(403).json({valid : false ,message: 'Token is invalid'});
            }
            req.user = decoded.id; // Set user id to req
            next();
        });
    }


}

module.exports ={protect}