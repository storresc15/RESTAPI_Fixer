const express = require("express"),
    app = express(),
    request = require("request"),
    PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res) {
    res.render("search");
});

//This should be the main use of request... look for more ways beyond what the bootcamp showed...


app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://data.fixer.io/api/latest?access_key=8a31270dcf21bc8993b57ea28f81c9ce&symbols=USD,CAD,EUR,MXN";
   request(url, function(error, response, body){
    if(!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        res.render("results", {data: data});
    }
    });
});

/*
request('http://data.fixer.io/api/latest?access_key=8a31270dcf21bc8993b57ea28f81c9ce', function(error, response, body){
    if(!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        console.log(body);
    }
});

*/
app.listen(PORT, function() {
    console.log("App has started!");
});
