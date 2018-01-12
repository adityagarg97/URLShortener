const sequelize=require("sequelize")
const db=new sequelize("urls","urluser","mypass",{
    host:"localhost",
    dialect:"mysql"
})
const urltable=db.define("urltable",{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    longUrl:{
        type:sequelize.STRING,
        allowNull:false,
        unique:true
    },
    shortUrl:{
        type:sequelize.STRING,
        allowNull:false,
        unique:true
    }
})
db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error creating database"))
exports=module.exports=urltable