const express = require('express');
const https = require("https");
const http = require("http");
const gtfs = require('./gtfs');
const fs = require('fs');
require("dotenv").config();
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
var server;
if (process.env.SSL === "true") {
    const key = fs.readFileSync(process.env.KEY_PATH);
    const cert = fs.readFileSync(process.env.CERT_PATH);
    server = https.createServer({ key: key, cert: cert }, app);
    console.log("SSL cert and key loaded!");
} else {
    server = http.createServer(app);
}
server.listen(process.env.PORT, () => {
    console.log((process.env.SSL === "true"?"HTTPS":"HTTP") + " Server listening on " + process.env.PORT);
});