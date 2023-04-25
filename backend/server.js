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
    origin:'https://event-organization-bif6.onrender.com',
    credentials:true,
}));
app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
})
app.use(cookieParser());
app.use(session({secret: 'Your_Secret_Key', resave: false, saveUninitialized: false, key: "user_sid", cookie: {secure: true}
                }))
    
app.use('/',Router);

     
app.listen(5000, function(error){
    if(error) {
        console.log(error)
    }
    console.log("Server listening on PORT 5000")
})
