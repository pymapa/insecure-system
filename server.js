const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');

app.use(bodyParser.json());

// Load environment variables from ./.env
require('dotenv').config();

// Use REST API
app.use('/api', require('./api/index'));


app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('Server running on port ' + app.get('port'));
});