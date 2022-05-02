//ฟังก์ชันของ Line
function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
  }
  
  function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };
  
    return client.replyMessage(event.replyToken, msg);
  }


module.exports.handleEvent = handleEvent
module.exports.handleMessageEvent = handleMessageEvent
