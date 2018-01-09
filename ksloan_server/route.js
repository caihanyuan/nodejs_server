
exports.setRequestUrl=function(app){
    var banner = require('./models/banner');
    var loanstatus = require('./models/loanStatus');

    app.get('/api/content/v1/banners', banner.getBannerData);
    app.post('/loanstatus', loanstatus.getRandomStatus);
}
