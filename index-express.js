const express = require('express')
const router = require('./routes/myrouter')
const app = express()

app.use(router)

app.listen(8080,()=>{
    console.log("Server are run in port 8080")
})