const express = require('express')
const router = express.Router()
//const path = require('path')

//อ้างอิงตำแหน่งไฟล์


//จัดการเส้นทางในเว็บ
router.get("/",(req,res)=>{
    const name = "Thada"
    const age = 3
    const address = "ระยอง"
    
    res.render('index.ejs',{name:name,age:age,address:address})
})


module.exports = router