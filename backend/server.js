const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Router = require("./Routes/route");

const app = express()

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Ajay-kumar:Ajaykumar$13@cluster0.ofmxz.mongodb.net/Eventorganization",{ useUnifiedTopology: true });

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'https://scintillating-centaur-4eb964.netlify.app',
    credentials:true,
}));
app.use(cookieParser());
app.use(session({secret: 'Your_Secret_Key', resave: false, saveUninitialized: false, key: "user_sid"}))
    
app.use('/',Router);

     
app.listen(5000, function(error){
    if(error) {
        console.log(error)
    }
    console.log("Server listening on PORT 5000")
})
