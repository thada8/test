const connect = true
const url1 = "tdac.dev/file1.json"
const url2 = "tdac.dev/file2.json"
const url3 = "tdac.dev/file3.json"
const url4 = "tdac.dev/file4.json"

function downloading(url){
    return new Promise(function(resolve,reject){
        //console.log('กำลังโหลดไฟล์จาก ${url}')
        setTimeout(()=>{
            if(connect){
                resolve(`โหลด ${url} เรียบร้อย`)
            }else{reject('เกิดข้อผิดพลาด')
            }
        },3000)
    }
    )
}

async function start(){
    console.log(await downloading(url1))
    console.log(await downloading(url2))
    console.log(await downloading(url3))
    console.log(await downloading(url4))
}