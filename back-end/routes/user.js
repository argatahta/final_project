const express = require("express");
const userdb = require("../models/user");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res)=>{
    let newObj = new userdb({
        username : req.body.username,
        password : req.body.password,
        email: req.body.email
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

    userdb.findOne({username : req.body.username, password: req.body.password}, (error ,result)=>{
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({message:"User not found !"})
        }else{
            const payload ={
                id:result._id,
                name:result.username
            }
            const token = jwt.sign(payload, "secretkey", {expiresIn :1500 });
            res.json({token:token});
        };
    });
});

module.exports = (function (){
    return router;
})();