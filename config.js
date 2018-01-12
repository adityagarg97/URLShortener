const port=process.env.PORT||1111
let config={
    db:{
        host:"localhost",
        name:"urls"
    },
    webhost:"http://localhost:"+port+"/"
}
exports=module.exports=config