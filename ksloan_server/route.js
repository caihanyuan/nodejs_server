
exports.setRequestUrl=function(app){
    var banner = require('./models/banner');
    var loanstatus = require('./models/loanStatus');
    var loanModel = require('./models/beginloan');

    app.get('/api/content/v1/banners', banner.getBannerData);
    app.post('/loanstatus', loanstatus.getCanLoanStatus);
    app.post('/api/content/v1/loanbegin', loanModel.getBeginData);
}
