//const pi=3.14
function add(x,y){
   return x+y
}

function getCurrentTime(){
    return new Date()
}

function formatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


//module.exports.pi=pi
module.exports.add = add
module.exports.getCurrentTime = getCurrentTime
module.exports.formatNumber = formatNumber