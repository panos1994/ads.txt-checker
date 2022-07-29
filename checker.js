fs = require('fs');
const e = require('express');
var myModule = require('./init');

var arr = myModule.arr

arr.forEach(element => {
    var defaultFile = fs.readFileSync('ads/default_ads.txt', 'utf-8');
    var fileToTest = fs.readFileSync(element.path, 'utf-8');
    var arrayofIds=[];
    var arrayofDefaults = [];
    var cnt=0;  
    var x=0;
    var y=0;

    fileToTest.split(/\r?\n/).forEach(siteline => {
        sitelineId = siteline.split(',')[1];
        arrayofIds.push(sitelineId);  
    });

    arrayofIds = arrayofIds.filter(function( element ) {
        return element !== undefined;
     });

     for (var i=0; i<arrayofIds.length; i++){
        arrayofIds[i] = arrayofIds[i].replace(/\s/g, '');       
     };

     defaultFile.split(/\r?\n/).forEach(line => {
        lineId = line.split(',')[1];
        arrayofDefaults.push(lineId);  
    });

    arrayofDefaults = arrayofDefaults.filter(function( element ) {
        return element !== undefined;
     });

     for (var i=0; i<arrayofDefaults.length; i++){
        arrayofDefaults[i] = arrayofDefaults[i].replace(/\s/g, '');       
     };

     defaultFile = fs.readFileSync('ads/default_ads.txt', 'utf-8');

     defaultFile.split(/\r?\n/).forEach(line => {
        if (line === ''){
            var stream = fs.writeFileSync(element.target, line+"\r\n", {encoding:'utf8',flag:'a'}, function (err) {
                    if (err) return console.log(err);
                });
        }
        else if (line.startsWith('#')){
            var stream = fs.writeFileSync(element.target, line+"\r\n", {encoding:'utf8',flag:'a'}, function (err) {
                    if (err) return console.log(err);
                });
        }
        else{
            if (arrayofIds.includes(arrayofDefaults[x])){
                cnt++;
                x++;
            }
            else {
                var stream = fs.writeFileSync(element.target, line+"\r\n", {encoding:'utf8',flag:'a'}, function (err) {
                    if (err) return console.log(err);
                });
                x++;
            }
        }
     });

     var diff = 279-cnt;
     console.log(element.name + ': missing lines = ' + diff);
     var stream = fs.writeFileSync('missing.csv', element.name+','+diff+"\r\n", {encoding:'utf8',flag:'a'}, function (err) {
        if (err) return console.log(err);
    });
});


