const express = require('express');
const app = express('/');
const ServerTiming  = require('servertiming');

const timing = new ServerTiming();
const mockData = require('./resources/mockData_1000.json');



/**
 * Sample routes that handle server side user 
 * timing
 */
app.get('/timing', (req, res) => {
    setTimeout(()=> {
        // // All timings should be in milliseconds (s)
        timing.addMetric("Locking Tractor Beam", 50.0);
        timing.addMetric("Cheesy Quote", 150.0);
        timing.addMetric("Applying Lasers", 75.0);

        // JSON with 100 random images from our data
        const rdmImages = (new Array(100)).fill(0)
            .map(idx => Math.floor(Math.random()*mockData.length-1))
            .map(idx => mockData[idx])
            .reduce((acc, img) => [...acc, {img: img.imageUrl}], [])
        res.setHeader("Server-Timing", timing.generateHeader());
        res.status(200).json(rdmImages);
    }, 500);
    
});


app.get('/data/:seed', (req, res) => {
    // simulate a slight delay
    setTimeout(()=> {

        res.status(200).json(mockData);
    }, 500);
    
})
const resp = {hello:'world'};
app.get('/echo', (req, res)=> res.status(200).json(resp));

app.get('/echo/:time', (req, res) => {
   

    const time = parseInt(req.params.time, 10) || 0;
    setTimeout(()=> {
        res.status(200).json(resp);
    }, time)


})

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})