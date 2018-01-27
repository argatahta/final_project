const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy
const jwt = require("jsonwebtoken");

const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(passport.initialize());

passport.use("auth", new BearerStrategy((token, done)=>{

    jwt.verify(token, "secretkey", (error, decoded)=>{
        if(error){
            return done(error,null);
        }else{
            console.log(decoded);
            return done(null,decoded);
        }
    })
}));

app.post("/api/validatetoken", passport.authenticate("auth", {session:false}), (req, res)=>{
    res.json(req.user);
});

app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes(passport));

app.listen(3000, ()=>{
    console.log("connected");
});
