const config=require("./config")
const mongoose=require("mongoose")
let Schema=mongoose.Schema
let objectId=Schema.ObjectId
let urlSchema=new Schema({
    id:{type:Number,index:true},
    longUrl:String,
    shortUrl:String
})
let UrlRecord=mongoose.model("Url",urlSchema)
exports=module.exports=UrlRecord