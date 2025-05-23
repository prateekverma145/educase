// const exp=ress = require('express');
const router=require('express').Router();
const {addSchool, listSchools} = require('./controller');

router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);
module.exports = router;
