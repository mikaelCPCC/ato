const express = require('express');
const app = express('/');

/**
 * Sample routes that handle server side user 
 * timing
 */
app.get('/slow', (req, res) => {
    if (req.query.debug) {
        // set our header
    }
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})