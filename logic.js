let arr="abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let len=arr.length
function encode(id){
    let encoded = "";
    while (id){
        let remainder = id % len;
        id = Math.floor(id / len);
        encoded = arr[remainder].toString() + encoded;
    }
    return encoded;
}
function decode(url){
    let id=0
    while(url){
        let index=arr.indexOf(url[0])
        let power=url.length-1
        id+=index*(Math.pow(len,power))
        url=url.substring(1)
    }
    return id
}
exports=module.exports={
    encode,decode
}