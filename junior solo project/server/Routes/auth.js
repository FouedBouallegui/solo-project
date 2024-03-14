const express = require('express');
const router = express.Router()
const {getAll,login}=require('../controller/auth');

// router.post('/',register)
router.get("/",getAll)
router.post("/login",login)
// router.put("/:id",updateHandler)
// router.delete("/:id",deleteHandler)

module.exports=router