const express=require("express")
const table=require("./db2")
const route=express.Router()
const config=require("./config")
let encode=require("./logic").encode
let decode=require("./logic").decode
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/urls")
route.post("/shorten",(req,res)=> {
    if (req.body.Url.length == 0) {
        res.send({
            error: "URL Not Provided"
        })
    }
    let new_id = 0
    table.find({
        longUrl: req.body.Url
    }, (err, result) => {
        if (result.length==1) {
            newUrl = config.webhost + result[0]._doc.shortUrl
            res.status(200).send({shortUrl: newUrl})
        } else {
            table.find({}, (err, result) => {
                if (err) throw err
                new_id = result.length + 1
                let newUrl = new table({
                    id: new_id,
                    longUrl: req.body.Url,
                    shortUrl: encode(new_id)
                })
                newUrl.save((err) => {
                    if (err) throw err
                    res.status(201).send({shortUrl: config.webhost + newUrl.shortUrl})
                })
            })
        }
    })
})

route.get("/:url",(req,res)=> {
    let shorturl = req.params.url.toString()
    let findid = decode(shorturl)
    table.findOne({id: findid}, (err, result) => {
        if (err) throw err
        if (result) {
            newUrl = "http://" + result._doc.longUrl
            console.log(newUrl)
            res.redirect(newUrl)
        } else {
            res.redirect(config.webhost)
        }
    })
})
exports=module.exports=route