const express = require('express');
const controller = require('../module/userController')
const authorization = require('./auth');
const router = express.Router();


/* GET users listing. */
router.post('/user/create', controller.createUser);
router.post('/spam/report', controller.reportSpam);
router.get('/search',authorization, controller.searchUser);

module.exports = router;
