const express = require('express')
const app = express()

app.use('/', express.static(__dirname + '/public'))

function decryptQueryParams(req, res ,next) {

    // TODO: decrypt all query params as per our logic
    rawData = req.query.code
    let newh = "";
    for(let ch in rawData){
        if(rawData[ch]===rawData[ch].toLowerCase()){
            newh = newh + rawData[ch].toUpperCase()
        }
        else{
            newh = newh + rawData[ch].toLowerCase()
        }
    }
    req.query.code =  newh;

    next()
}

function decodeQueryBase64(req, res, next) {

    for (let q in req.query) {
        let data = req.query[q] 
        data = new Buffer(data, 'base64').toString('ascii')
        req.query[q] = data
    }
    next()
}

app.get('/eval', decryptQueryParams, decodeQueryBase64, (req, res) => {

   // TODO: eval the code actually
    let snip = req.query.code; //this is code
    
    let snipEvaled = eval(snip)
    res.send(`${snipEvaled}`)
})

app.listen(4545, () => {
    console.log('server started on http://localhost:4545')
})