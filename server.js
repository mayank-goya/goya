var express = require('express');
var app     = express();
var body    = require('body-parser');
var path = require('path');
var port    = process.env.PORT || 8000


app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(express.static(__dirname));



/*Primary app routes. */
app.get('/',function (req, res) {
// Use res.sendfile, as it streams instead of reading the file into memory.
var p = path.resolve('/index.html');
res.sendfile(p);
});

app.listen(port);
console.log('The magic happens on port ' + port);
console.log('Node Version: ' + process.version);