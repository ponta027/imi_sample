const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const enrichment = require("imi-enrichment-address")
const hojin = require("imi-enrichment-hojin")
const jsic= require("imi-enrichment-jsic")

app.get('/address', (req, res) => {
        enrichment(req.query.address).then( json => {
                console.log(json);
                res.send(JSON.stringify(json))
        });
})
app.get('/hojin', (req, res) => {
        console.log(req.query.hojin)
        hojin(req.query.hojin).then( json => {
                console.log(json);
                res.send(JSON.stringify(json))
        }).catch( (error)=>{
                res.send(error)
        });
})

app.get('/jsic', (req, res) => {
        console.log(req.query.jsic)
        res.send(JSON.stringify(jsic(req.query.jsic)))
})



app.listen(3000, () => console.log('Example app listening on port 3000!'))


