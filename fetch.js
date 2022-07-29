const axios = require('axios').default;
fs = require('fs');
var myModule = require('./init');

var arr = myModule.arr

arr.forEach(element => {

    axios({
        method: 'get',
        url: element.url,
        responseType: 'stream'
      })
        .then(function(response) {
          response.data.pipe(fs.createWriteStream(element.path))
      }); 
});
