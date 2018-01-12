const express=require("express")
const table=require("./db")
const route=express.Router()
const config=require("./config")
let encode=require("./logic").encode
let decode=require("./logic").decode
route.get("/:url",(req,res)=>{
    let shorturl=req.params.url.toString()
    let findid=decode(shorturl)
    table.findAll({where:{
        id:findid
        }})
        .then((data)=>{
            if(data.length==1){
                newUrl="http://"+data[0].longUrl
                console.log(newUrl)
                res.redirect(newUrl)
            }
            else {
                window.alert("URL Doesn't Exist")
                res.redirect(config.webhost)
            }
        }).catch((err)=> {
        res.status(500).send({
            error: "Error occurred while checking for already existing short urls"
        })
    })
})
route.post("/shorten",(req,res)=>{
    if(req.body.Url.length==0){
        res.send({
            error:"URL Not Provided"
        })
    }
    let new_id=0
    table.findAll({
        where:{
            longUrl:req.body.Url
        }
    })
        .then((data)=>{
            if(data.length==1){
                newUrl=config.webhost+encode(data[0].id)
                res.status(200).send({shortUrl:newUrl})
            }else {
                table.findAll()
                    .then((data)=>{
                        new_id=Object.keys(data).length+1
                        table.create({
                            longUrl:req.body.Url,
                            id:new_id,
                            shortUrl:encode(new_id)
                        }).then((data)=>{
                            res.status(201).send({shortUrl:config.webhost+data.shortUrl})
                        }).catch((err)=>{
                            res.status(501).send({
                                error:"Error creating short URL"
                            })
                        })
                    }).catch((err)=>{
                    error:"Error occurred"
                })

            }
        }).catch((err)=>{
            res.status(500).send({
                error:"Error occurred while checking for already existing short urls"
            })
    })
})
exports=module.exports=route