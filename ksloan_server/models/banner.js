var fs = require('fs');
var path = require('path');

exports.getBannerData = function(req, res) {
    try {
        fs.readFile(path.join(__dirname, './bannerdata.json'), 'utf-8', function(err, data) {
            if (err) {
                res.statusCode = 400;

                console.log('error to read file: bannerdata.json');
                throw err;
            } else {
                var resultObj = JSON.parse(data);
                var arr = resultObj.data;
                for (var i = 0; i < arr.length; i++) {
                    var bannerObject = arr[i];
                    var imgUrl = bannerObject.xxHigh_url;
                    bannerObject.xxHigh_url = 'http://' + req.get('host') + imgUrl;
                }

                var resultStr = JSON.stringify(resultObj);
                console.log('Result obj:', resultStr);

                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(resultStr),
                    'Content-Type': 'text/plain;charset=utf-8'
                });
                res.write(resultStr);
                res.end();
            }
        });
    } catch (e) {
        console.error('Error caught by getBannerData:', e);
    }

}