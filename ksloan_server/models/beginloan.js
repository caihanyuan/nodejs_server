var fs = require('fs');
var path = require('path');

exports.getBeginData = function(req, res) {
    try {
        fs.readFile(path.join(__dirname, './beginloandata.json'), 'utf-8', function(err, data) {
            if (err) {
                res.statusCode = 500;
                res.end();
                console.log('error to read file: beginloandata.json');
                throw err;
            } else {
                try {
                    var resultObj = JSON.parse(data);
                    var resultStr = JSON.stringify(resultObj);
                    console.log('Result obj:', resultStr);

                    res.writeHead(200, {
                        'Content-Length': Buffer.byteLength(resultStr),
                        'Content-Type': 'text/plain;charset=utf-8'
                    });
                    res.write(resultStr);
                    res.end();

                } catch (err) {
                    console.log('banner error:', err);
                    res.statusCode = 500;
                    res.end();
                }
            }
        });
    } catch (e) {
        console.error('Error caught by getBannerData:', e);
    }

}