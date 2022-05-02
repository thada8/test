const express = require('express')
const router = express.Router()

//const path = require('path')

//เรียกใช้งานไฟล์ใน Folder Models
const Product = require('../models/product')

//อัพโหลดไฟล์
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products')  //ตำแหน่งเก็บไฟล์ภาพ
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")     //กำหนดชื่อไฟล์ไม่ซ้ำกัน โดยใช้วันที่ปัจจุบัน
    }
})

//เริ่มต้นอัพโหลดไฟล์รูป
const upload = multer({
    storage:storage
})


//จัดการเส้นทางในเว็บ
router.get("/",(req,res)=>{
    const products = [
        {name:"Notebook", price:20500, img:"images/products/product1.png"},
        {name:"เสื้อผ้า", price:590, img:"images/products/product2.png"},
        {name:"หูฟัง", price:1590, img:"images/products/product3.png"},
        {name:"Notebook", price:19900, img:"images/products/product1.png"},
        {name:"เสื้อผ้า", price:990, img:"images/products/product2.png"},
        {name:"หูฟัง", price:790, img:"images/products/product3.png"}
    ]    
    res.render('index.ejs',{products:products})
})

router.get("/addform",(req,res)=>{
    res.render('form.ejs')

})

router.get("/manage",(req,res)=>{
    res.render('manage.ejs')

})

router.get('/search',(req,res)=>{

    console.log(req.query);
    console.log(req.query.keyword);
    //res.render('manage.ejs')
})

router.post('/insert',upload.single("image"),(req,res)=>{

    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        image:req.file.filename
    })
    Product.saveProduct(data,(err)=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
    console.log(data)
    console.log(req.file)
})


module.exports = router