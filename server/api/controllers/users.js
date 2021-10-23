const express = require('express');
const { verifyToken } = require('../helpers/helpers');
const router = express.Router();

const User = require('../models/user');

router.get('/', verifyToken, async (req, res) => {
    const users = await User.all
    res.json(users)
})

module.exports = router