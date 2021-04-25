const express = require('express');
const gtfs = require('./gtfs');
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

app.listen(port, ()=>{
    console.log("Server listening on " + port);
});