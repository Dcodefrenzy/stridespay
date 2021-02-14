define(function(require, exports, module) {

exports.request = (url, token, method, body, callback)=>{
  //console.log(url)
  fetch("/api/v1/"+url, {
    method:method,
    body:JSON.stringify(body),
    headers: {'Content-Type': "application/json", "u-auth": token.token}
  })
  .then(res=>res.json())
  .then(response=>{
    
  return callback(response)
  })

}

exports.filesRequest=(url, token, method, body, callback)=>{
    console.log(url)
  fetch("/api/v1/"+url, {
    method:method,
    body:body,
    headers: {"u-auth": token.token}
  })
  .then(res=>res.json())
  .then(response=>{
    
  return callback(response)
  })
}


exports.getRequest = (url, token, method, callback)=>{
//console.log(url)
  fetch("/api/v1/"+url, {
    method:method,
    headers: {'Content-Type': "application/json", "u-auth": token.token}
  })
  .then(res=>res.json())
  .then(response=>{
  return callback(response)
  })

}






});