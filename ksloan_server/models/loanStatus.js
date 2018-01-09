var STATUS_CAN_LOAN = 0;
var STATUS_BEGIN = 1;
var STATUS_COMMIT = 2;
var STATUS_WAIT_GRANT = 3;
var STATUS_GRANT_FAIL = 4;
var STATUS_DEBT_FAIL_IN_LOAN = 5;
var STATUS_ACCOUNT_FROZE_DEBT = 6;
var STATUS_ACCOUNT_FROZE_ERROR = 7;
var STATUS_LOAN_DEBT_CHECKING = 8;
var STATUS_GRANT_TIME_OUT = 9;
var REPAY_TIME_OUT = 10;

var randomStatus = STATUS_CAN_LOAN;

var Status = function() {
    this.status = -1;
    this.step = 0;
    this.amount = 20000.0;
    this.available = 0.0;
    this.day = 0;
    this.reviewquota = 0;
    this.loanCount = 0;
    this.infoComplete = 0;
}

exports.getRandomStatus = function(req, res) {
    // var randomStatus = Math.floor(Math.random() * 11);
    randomStatus = randomStatus % 11;
    var status = new Status();
    status.status = randomStatus;
    switch (randomStatus) {
        case STATUS_CAN_LOAN:
            console.log('STATUS_CAN_LOAN');
            status.available = 20000.0;
            status.first = 1;
            break;
        case STATUS_BEGIN:
            status.step = 5;
            status.available = 20000.0;
            status.first = 1;
            console.log('STATUS_BEGIN');
            break;
        case STATUS_COMMIT:
            status.step = 2;
            status.first = 1;
            console.log('STATUS_COMMIT');
            break;
        case STATUS_WAIT_GRANT:
            console.log('STATUS_WAIT_GRANT');
            break;
        case STATUS_GRANT_FAIL:
            status.day = 20;
            console.log('STATUS_GRANT_FAIL');
            break;
        case STATUS_DEBT_FAIL_IN_LOAN:
            status.reviewquota = 3000;
            status.available = 17000;
            console.log('STATUS_DEBT_FAIL_IN_LOAN');
            break;
        case STATUS_ACCOUNT_FROZE_DEBT:
            status.loanCount = 2;
            console.log('STATUS_ACCOUNT_FROZE_DEBT');
            break;
        case STATUS_ACCOUNT_FROZE_ERROR:
            console.log('STATUS_ACCOUNT_FROZE_ERROR');
            break;
        case STATUS_LOAN_DEBT_CHECKING:
            status.reviewquota = 3000;
            status.available = 17000.0;
            console.log('STATUS_LOAN_DEBT_CHECKING');
            break;
        case STATUS_GRANT_TIME_OUT:
            status.loanCount = 2;
            console.log('STATUS_GRANT_TIME_OUT');
            break;
        case REPAY_TIME_OUT:
            status.reviewquota = 1000;
            console.log('STATUS_GRANT_TIME_OUT');
            break;
        default:
            console.log('STATUS_UNKNOWN :' + randomStatus);
            break;
    }

    var result = {
        code: 200,
        msg: 'OK'
    };

    result.data = status;
    var resultStr = JSON.stringify(result);
    console.log('json result:\n' + resultStr);

    setTimeout(function() {
        try {
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(resultStr),
                'Content-Type': 'text/plain;charset=utf-8'
            });
            res.write(resultStr);
            res.end();
        } catch (e) {
            console.log('getRandomStatus response error:\n' + e);
        }

        randomStatus++;
    }, 200);

}