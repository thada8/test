const express = require('express')
const path = require('path')
const router = require('./routes/ejs-router')
const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public')))



app.listen(8080,()=>{
    console.log("Server are run in port 8080")
})