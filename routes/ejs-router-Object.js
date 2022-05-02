const express = require('express')
const router = express.Router()
//const path = require('path')

//อ้างอิงตำแหน่งไฟล์


//จัดการเส้นทางในเว็บ
router.get("/",(req,res)=>{
    const products = [
        {name:"Notebook", price:20500, img:"images/products/product1.png"},
        {name:"เสื้อผ้า", price:590, img:"images/products/product2.png"}
    ]    
    res.render('index.ejs',{products:products})
})


module.exports = router