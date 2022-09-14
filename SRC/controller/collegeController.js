
const CollegeModel = require('../model/collegeModel')



//===================================================================//
const isValid = function(value){
    if(typeof (value) === 'undefined' || value === null) return false
    if(typeof (value) === 'string' && value.trim().length > 0) return true
    
}
const isValidRequestBody = function(reqBody){
   return Object.keys(reqBody).length > 0
}
//=================================================================//

const createCollege = async function(req, res){
    try {
        const requestBody = req.body

    if(!isValidRequestBody(requestBody)){
        return res.status(400).send({status : false, message: "Please provide college data"})
    }

    const {name , fullName, logoLink } = requestBody

    if(!isValid(name)){
        return res.status(400).send({status : false, message: "Name is required"})
    }

    if(!isValid(fullName)){
        return res.status(400).send({status : false, message: "fullName is required"})
    }

    if(!isValid(logoLink)){
        return res.status(400).send({status : false, message: "logoLink is required"})
    }
    
    const isNameNotUnique = await CollegeModel.findOne({name : name}) 

    if(isNameNotUnique) {
        return res.status(400).send({status : false, message : "name already exist"})
    }
    const newCollegeEntry =  await CollegeModel.create(requestBody)
    res.status(201).send({status: true, message: "new college entry done", data : newCollegeEntry })
    } 
    
    catch (error){
        res.status(500).send({error : error.message})
    }
}

//======================================================//



module.exports.createCollege = createCollege



