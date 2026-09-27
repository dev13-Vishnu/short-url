const express = require ("express");
const urlRoute = require("./routes/url");
const { connectDB } = require("./connection");

const app = express();

app.use(express.urlencoded());
const PORT = 8001;

//mongodb connect
connectDB("mongodb://127.0.0.1:27017/short-url")
    .then(()=> console.log("MongoDB Connected."))
    .catch((err)=> console.err("Mongo error:",err));

app.use('/url',urlRoute)

app.listen(PORT,()=> {
    console.log(`Server started at ${PORT}`)
})