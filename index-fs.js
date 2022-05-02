const http = require('http')
const fs = require('fs')
const url = require('url')

const indexPage = fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8')
const productpage1 = fs.readFileSync(`${__dirname}/templates/product1.html`,'utf-8')
const productpage2 = fs.readFileSync(`${__dirname}/templates/product2.html`,'utf-8')
const productpage3 = fs.readFileSync(`${__dirname}/templates/product3.html`,'utf-8')
//const navbar = fs.readFileSync(`${__dirname}/templates/navbar.html`,'utf-8')
//const footerpage = fs.readFileSync(`${__dirname}/templates/footerpage.html`,'utf-8')
//const aside_right = fs.readFileSync(`${__dirname}/templates/aside.html`,'utf-8')
  
const server = http.createServer((req,res)=>{

    //const pathName = req.url
    console.log(url.parse(req.url,true))
    const {pathname,query} = url.parse(req.url,true)

    if(pathname==="/" || pathname==="/home"){
        res.end(indexPage)
   
    }else if(pathname==="/product"){
        if(query.id === "1"){
            res.end(productpage1)
        }else if(query.id === "2"){
            res.end(productpage2)
        }else if(query.id === "3"){
            res.end(productpage3)
        } 
        else{
            res.writeHead(404)
            res.end("Not Found") 
        }
    }else{
        res.writeHead(404)
        res.end("Not Found")  
    }
})
server.listen(8080,'localhost',()=>{
    console.log("Server are start in port 8080")
})