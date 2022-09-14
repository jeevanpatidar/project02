const { Router } = require("express")
const CollegeModel = require("../Model/CollegeModel")
const internModel = require('../Model/InternModel')

let checkValid = function (value) {
    if (typeof value == "undefined" || typeof value == "number" || value.length == 0 || typeof value == null) {
        return false
    } else if (typeof value == "string") {
        return true
    }
    return true
}

const CreateIntern = async function (req, res) {
    try {
        let data = req.body;
        let { name, email, mobile } = data
        let cName = req.body.collegeName

        if (!(name && email && mobile))
            return res.status(400).send({ status: false, msg: "Please fill the Mandatory Fields." });

        if (!checkValid(name)) return res.status(400).send({ status: false, message: "Please Provide valid Input" })
        if (!(/^[A-Za-z]+$\b/).test(name)) return res.status(400).send({ status: false, msg: "Please Use Correct Characters in name" })



        if (!checkValid(email)) return res.status(400).send({ status: false, message: "Spaces aren't Allowed." })
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { return res.status(400).send({ status: false, msg: "Please provide valid Email" }) }
        let Duplicate = await internModel.findOne({ email: email })
        if (Duplicate) { return res.status(409).send({ status: false, msg: "This EmailID already exists please provide another EmailID." }) }


        if(!(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/).test(mobile)) {return res.status(400).send({ status: false, msg: "please enter valid mobile number"})}


        let CollageName = await CollegeModel.findOne({name: cName})
        if(!CollageName) return res.status(400).send({ status: false, msg: "No college found"})

        let collegeId = CollageName._id
        req.body.collegeId = collegeId

        delete req.body.CollageName
        let createIntern = await internModel.create(data)
        res.status(201).send({ status: true, msg: createIntern })


    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports.CreateIntern=CreateIntern