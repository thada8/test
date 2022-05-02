const express = require('express')
const router = express.Router()
//const path = require('path')

//อ้างอิงตำแหน่งไฟล์


//จัดการเส้นทางในเว็บ
router.get("/",(req,res)=>{
    const products = ["เสื้อ","พัดลม","หูฟัง","Keyboard","Mouse","จอภาพ",]    
    res.render('index.ejs',{products})
})


module.exports = router