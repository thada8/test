const express = require('express')
const path = require('path')
const router = require('./routes/ejs-router')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('./config.json');
const res = require('express/lib/response')
const mongo = require('mongodb');

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({secret:"mysession",resave:false,saveUninitialized:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public')))


// Port ของเว็บ
app.listen(8080,()=>{
    console.log("Server are run in port 8080")
})


//Port 3000 ของ Line
const port = config.port;
app.listen(port, () => {
  console.log(`Line Messaging API are run in port ${port}`);
});



