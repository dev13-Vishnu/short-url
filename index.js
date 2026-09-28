const express = require ("express");
const { connectDB } = require("./connection");
const path = require("path");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user');

const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

 
const app = express();

const PORT = 8001;

//mongodb connect
connectDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB Connected."))
.catch((err)=> console.err("Mongo error:",err));

// templete engine

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/url',restrictToLoggedInUserOnly,urlRoute);
app.use('/user', userRoute);
app.use('/',checkAuth,staticRoute);

app.get('/test', async(req,res)=> {

    const allUrls = await URL.find({})
    res.render('home', {
        urls: allUrls,
    });
})

app.listen(PORT,()=> {
    console.log(`Server started at ${PORT}`)
})