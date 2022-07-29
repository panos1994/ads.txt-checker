fs = require('fs');
var myModule = require('./init');

var arr = myModule.arr

arr.forEach(element => {
    fs.unlink(element.path, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
    });
    fs.unlink(element.target, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
    });
    fs.unlink('missing.csv', function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
    });
});
