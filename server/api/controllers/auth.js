const express = require('express');
const bcrypt = require('bcryptjs');
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
            res.status(200).json({ user: user.fname })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
})

module.exports = router