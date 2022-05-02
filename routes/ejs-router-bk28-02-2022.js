const express = require('express')
const router = express.Router()



//const path = require('path')

//เรียกใช้งานไฟล์ใน Folder Models
const Product = require('../models/product')

//อัพโหลดไฟล์
const multer = require('multer')
const session = require('express-session')
const { redirect } = require('express/lib/response')

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
    if(req.session.login){
    const session_status = true
    Product.find().exec((err,doc)=>{
        res.render('index.ejs',{products:doc,session_status})
        
    })
    }else{
        const session_status = false
        Product.find().exec((err,doc)=>{
        res.render('index.ejs',{products:doc,session_status})
    })
    }
})

router.get("/admin",(req,res)=>{
    res.render('admin.ejs')
})

router.get('/product/:id',(req,res)=>{
    if(req.session.login){
        const session_status = true

        const product_id = req.params.id
        console.log("Product ID: ",product_id)
        Product.findOne({_id:product_id}).exec((err,doc)=>{
        console.log(doc)
        res.render('product.ejs',{product:doc,session_status})
        })
    }else{
        const session_status = false
        const product_id = req.params.id
        console.log("Product ID: ",product_id)
        Product.findOne({_id:product_id}).exec((err,doc)=>{
        console.log(doc)
        res.render('product.ejs',{product:doc,session_status})
        })
    }


})

router.get("/add-product",(req,res)=>{
    if(req.session.login){
        res.render('form.ejs')  //บันทึกสินค้า
    }else{ 
        res.render('admin.ejs')  //เข้าสู่ระบบ
    }
})

router.get("/manage",(req,res)=>{
    //แสดงข้อมูล session
    console.log("รหัส session =",req.sessionID)
    console.log("ข้อมูลใน session =",req.session)
    console.log("ผู้ใช้งาน =",req.session.username)
    if(req.session.login){
        Product.find().exec((err,doc)=>{
            res.render('manage.ejs',{products:doc})
        })
    }else{
        res.render('admin.ejs')  //เข้าสู่ระบบ
    }
})

router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
    console.log("Deleted ID:",req.params.id)
})

router.get('/search',(req,res)=>{
    const keyword = req.query.keyword
    
    console.log("ค้นหา :" ,keyword);
    Product.find({ $or: [ { name: { $regex : '.*'+ keyword + '.*' }}, { description: { $regex : '.*'+ keyword + '.*' }} ] }).exec((err,doc)=>{  
    console.log(doc)
    if(req.session.login){
        const session_status = true
        res.render('search.ejs',{products:doc,session_status})  //นำผลลัพธ์ไปแสดงที่ search.ejs
    }else{
        const session_status = false
        res.render('search-index.ejs',{products:doc,session_status})
    }
    })
})


router.get('/test',(req,res)=>{  
    //const cookie_status = false
    res.render('test.ejs')

}) 

router.post('/testform',(req,res)=>{  
    
    const date = req.body.date
    const time = req.body.time
    console.log(date)
    console.log(time)
    res.render('testform.ejs',{date,time})
    
    //console.log(age)

    //{vehicle_name: req.body.vehicle}   
    //{vehicle_name: req.body.vehicle1}, {vehicle_name: req.body.vehicle2}, {vehicle_name: req.body.vehicle3}

}) 



//ออกจากระบบ
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        res.render('admin.ejs')
    })
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

router.post('/edit',(req,res)=>{
    const edit_id= req.body.edit_id
    console.log("Edit ID:",edit_id)
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        console.log(doc)
        res.render('edit.ejs',{product:doc})  //นำข้อมูลเดิมไปแสดงที่ edit.ejs
    })
})

router.post('/update',upload.single("image"),(req,res)=>{
    console.log(req.file)

    //ข้อมูลอัพเดทใหม่ที่ถูกส่งมาจากแบบฟอร์มแก้ไข
    if (!req.file){   //ถ้าไม่มีไฟล์ภาพ ให้ทำดังนี้
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
    }
     Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
         res.redirect('/manage')
         console.log("ข้อมูลที่ส่งจากฟอร์มอัพเดทล่าสุด",data)
     }) 
    }else{  //ถ้ามีไฟล์ภาพ ให้ทำดังนี้
    const update_id = req.body.update_id
    let data = {
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            image:req.file.filename  //ต่างกันตรงบรรทัดนี้
        }
         Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
             res.redirect('/manage')
             console.log("ข้อมูลที่ส่งจากฟอร์มอัพเดทล่าสุด",data)
         }) 

    }
    
})

router.post('/confirm-delete',(req,res)=>{
    const delete_id= req.body.delete_id
    console.log("Delete ID:",delete_id)
    Product.findOne({_id:delete_id}).exec((err,doc)=>{
      console.log(doc)
      res.render('modal.ejs',{product_delete:doc})   //นำข้อมูลไปแสดงที่ modal.ejs
    })
})

router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 3000000 // 3000 วินาที หรือ 50 นาที
    if(username === "admin" && password === "1234"){
        //สร้าง cookie
        //res.cookie('username',username,{maxAge:timeExpire})
        //res.cookie('password',password,{maxAge:timeExpire})
        res.cookie('login',true,{maxAge:timeExpire})  //true => login เข้าสู่ระบบ

        //สร้าง session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire
        res.redirect('/manage')
    }else if (!username || !password){
        res.render('admin.ejs')
    }else{
        res.render('404.ejs')
    } 
})


module.exports = router