const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.pass, salt);
        await User.create({...req.body, pass: hash})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email)
        if(!user){ throw new Error('No user with this email') }
        const authed = await bcrypt.compare(req.body.pass, user.pass)
        if (authed){
            const sendToken = (err, token) => {
                if(err){ throw new Error('Could not create token')}
                res.status(200).json({
                    success: true,
                    token: 'Bearer ' + token
                })
            } 
            const secret = process.env.TOKEN_SECRET;
            const payload = { user: user.fname, email:user.email }
            jwt.sign(payload, secret, { expiresIn: '4h' }, sendToken)
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
})

module.exports = router