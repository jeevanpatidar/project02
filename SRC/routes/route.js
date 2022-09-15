const express = require('express');
const router = express.Router();
const CollegeController = require('../controller/collegeController')
const InternController = require('../controller/internController')

// test API
router.get('/test', function(req, res){
    res.status(200).send({status: true, message: "test api working fine"})
})

router.post('/functionup/colleges', CollegeController.createCollege)

router.post('/functionup/interns', InternController.CreateIntern)

router.get('/functionup/collegeDetails',CollegeController.getCollegeDetails)



module.exports = router;