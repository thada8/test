const express = require('express')
const router = express.Router()
//const path = require('path')

//อ้างอิงตำแหน่งไฟล์


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

router.post('/insert',(req,res)=>{

console.log(req.body);
console.log(req.body.name);
console.log(req.body.price);
console.log(req.body.description);
res.render('form.ejs')
})

router.get('/search',(req,res)=>{

    console.log(req.query);
    console.log(req.query.keyword);
    res.render('manage.ejs')
})



module.exports = router