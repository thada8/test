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
    Product.find().exec((err,doc)=>{
        res.render('index.ejs',{products:doc})
    })    
})

router.get('/product/:id',(req,res)=>{
    const product_id = req.params.id
    console.log("Product ID: ",product_id)
    Product.findOne({_id:product_id}).exec((err,doc)=>{
        console.log(doc)
        res.render('product.ejs',{product:doc})
    })
})

router.get("/add-product",(req,res)=>{
    res.render('form.ejs')

})

router.get("/manage",(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('manage.ejs',{products:doc})
    }) 
})

router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
    console.log("Deleted ID:",req.params.id)
})

router.get('/search',(req,res)=>{

    console.log(req.query);
    console.log(req.query.keyword);
    //res.render('manage.ejs')
})

router.get("/test",(req,res)=>{  
    res.render('test.ejs') 
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