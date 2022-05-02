const express = require('express')
const router = express.Router()
const path = require('path')

//อ้างอิงตำแหน่งไฟล์
const indexPage1 = path.join(__dirname,"../templates-express/index.html")
//const product1 = path.join(__dirname,"../templates-express/product1.html")
//const product2 = path.join(__dirname,"../templates-express/product2.html")
//const product3 = path.join(__dirname,"../templates-express/product3.html")

//จัดการเส้นทางในเว็บ
router.get("/",(req,res)=>{
    res.status(200)
    res.sendFile(indexPage1)
})

router.get("/product/:id",(req,res)=>{
    
    const productID = req.params.id
    if(productID === "1"){
        res.status(200)
        res.sendFile(path.join(__dirname,"../templates-express/product1.html"))

    }else if(productID === "2"){
        res.status(200)
        res.sendFile(path.join(__dirname,"../templates-express/product2.html"))
    }else if(productID === "3"){
        res.status(200)
        res.sendFile(path.join(__dirname,"../templates-express/product3.html"))
    }else{
        //res.status(404)
        //.send("<h1>ไม่พบรายการสินค้า</h1>")
        res.redirect('/')
    }


 
})

module.exports = router