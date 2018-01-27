const express = require("express");
const userdb = require("../models/user");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res)=>{
    let newObj = new userdb({
        username : req.body.username,
        password : req.body.password,
        email: req.body.email,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    });

    newObj.save((error)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.json(newObj);
        };
    });
});

router.post("/login", (req, res)=>{

    query={}
    
    if(req.body.username){
        query.username = req.body.username
        query.password = req.body.password
    }
    if(req.body.email){
        query.email = req.body.email
        query.password = req.body.password
    }

    userdb.findOne(query, (error ,result)=>{
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({message:"User not found !"})
        }else{
            const payload ={
                id:result._id,
                username:result.username
            }
            const token = jwt.sign(payload, "secretkey", {expiresIn :1500 });
            const userid = result._id
            const username =result.firstname
            
            res.json({token:token, userid:userid,username:username});
        };
    });
});

module.exports = (function (){
    return router;
})();