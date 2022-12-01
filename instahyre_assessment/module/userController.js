const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');
const Promise = require('bluebird');
const { Sequelize } = require('../models');
const Op = Sequelize.Op;

const User = require('../models').User;

const createUser = async (req, res) => {
    try {
        const { name = "", phone = "", email = "", password = "" } = req.body;
        if(isEmpty(name)) res.send("Enter the name");
        if(isEmpty(phone)) res.send("Enter the phone number");
        if(isEmpty(password)) res.send("Enter the password");
        const salt = await bcrypt.genSalt(10)
        const passwordCrypt = await bcrypt.hash(password, salt);
        const inserted = await User.create({ name, phone, email, password: passwordCrypt });
        const token = await jwt.sign({ name: inserted.name, phone: inserted.phone, email: inserted.email }, process.env.TOKEN_SECRET);
        res.send({
            message: "Successfully created user",
            response: "Use the token for further requests",
            token
        })
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ error: error.message })
        throw error
    }
}

const reportSpam = async (req, res) => {
    try {
        const { number } = req.body;
        const updateSpam = await User.findOne({ where: { phone: number} }); //WE NEED TO SEARCH FOR THE NUMBER IN THE GLOBAL DATABASE
        const { spam: previousSpam, id } = updateSpam;
        let updateObj = {
            spam: previousSpam + 1
        }
        const updatedSpam = await User.update(updateObj, {
            where: {
                id: id
            }
        });
        res.send(`Spam reported successfully`);
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
}

const searchUser = async ( req, res ) => {
    // const { key } = req.query;
    // let data = await User.findAll({ where: { name: { [Op.like]: '%' + key + '%' } } || {number:  { [Op.like]: key }}})
    // .then(data => res.render('data', { data }))
    // .catch(err => console.log(err));
    try {
        const { key } = req.body;
        let data = await User.findAll({ where: { name: { [Op.like]: '%' + key + '%' } } || {number:  { [Op.like]: key }}, raw : true}) //WE NEED TO PROVIDE THE GLOBAL DATABASE NAME TO SEARVH 
        let {name="", phone = "", email = "", spam } = data[0] || []
        res.send({
            name,
            phone,
            email,
            spam
        });
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
}

module.exports = {
    createUser,
    reportSpam,
    searchUser
}

