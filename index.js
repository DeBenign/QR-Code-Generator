const express = require("express");
const bodyParser = require("body-parser");
const qr = require("qrcode");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const url = req.body.url;

    try {
        //check if the url is empty
    if(url.length == 0){
        res.send("Data is empty!");
    };

    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
  
    qr.toDataURL(url, (err, src) =>{
        if(err) res.send(err, "Error occured");

        res.render("scan", { src });
    })
    } catch (error) {
        console.log(error, "error occur")
    }
});

const port = 3000;
app.listen( port, () => console.log(`The server is running on the port ${port}`));

