const express = require('express');
const https = require("https");
const gtfs = require('./gtfs');
const fs = require('fs');
require("dotenv").config();
const key = fs.readFileSync(process.env.KEY_PATH);
const cert = fs.readFileSync(process.env.CERT_PATH);
const app = express();
const port = 3000;

gtfs.loadDB();

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static("static"));

require('./routing')(app);

app.use((err,req,res,next)=>{
    res.render("main", { view: 'error', data: err});
})

const server = https.createServer({ key: key, cert: cert }, app);
server.listen(process.env.PORT, () => {
    console.log("Server listening on " + process.env.PORT);
});