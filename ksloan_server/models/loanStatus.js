 /**
  * 可提现状态
  */
 var STATUS_CAN_LOAN = 0;
 /**
  * 重置状态（初次申请）
  */
 var STATUS_BEGIN = 1;
 /**
  * 处于继续激活状态
  */
 var STATUS_COMMIT = 2;
 /**
  * 等待授信中
  */
 var STATUS_WAIT_GRANT = 3;
 /**
  * 授信失败
  */
 var STATUS_GRANT_FAIL = 4;
 /**
  * 借款审核失败 (有借款成功后的借款审核失败)
  */
 var STATUS_DEBT_FAIL_IN_LOAN = 5;
 /**
  * 账号异常（额度已被冻结,逾期还款）
  */
 var STATUS_ACCOUNT_FROZE_DEBT = 6;
 /**
  * 账号异常(额度已被冻结)
  */
 var STATUS_ACCOUNT_FROZE_ERROR = 7;
 /**
  * 借款审核中
  */
 var STATUS_LOAN_DEBT_CHECKING = 8;
 /**
  * 额度到期
  */
 var STATUS_GRANT_TIME_OUT = 9;
 /**
  * 逾期未还款
  */
 var REPAY_TIME_OUT = 10;

 var randomStatus = STATUS_CAN_LOAN;

 var Status = function() {
     this.status = -1; //当前状态
     this.step = 0; //资料还差几步
     this.amount = 20000.0; //总额度
     this.available = 0.0; //可用额度
     this.day = 0; //还差几天可再次授信
     this.reviewquota = 0; //提现失败的金额；提现中的金额; 逾期金额;
     this.loanCount = 0; // 多少笔借款待还
     this.infoComplete = 0; //额外资料是否填写完成（非必填). 用于是否显示提额入口
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
             break;
         case STATUS_BEGIN:
             status.step = 3;
             status.available = 20000.0;
             console.log('STATUS_BEGIN');
             break;
         case STATUS_COMMIT:
             status.step = 2;
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

     responseStatus(req, res, status);

     randomStatus++;
 }

 exports.getCanLoanStatus = function(req, res) {
     var status = new Status();
     status.status = STATUS_CAN_LOAN;
     status.available = 20000.0;
     responseStatus(req, res, status);
 }

 var responseStatus = function(req, res, status) {
     var result = {
         code: 200,
         msg: 'OK'
     };

     result.data = status;
     var resultStr = JSON.stringify(result);
     console.log('json result:\n' + resultStr);

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
 }