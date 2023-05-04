/**
 * statement
 * @param {Invoice} invoice 
 * @param {Object.<string,Play>} plays 
 */
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

  for(let perf of invoice.performances) {
    const play = plays[perf.playId];
    let thisAmount = 0;

    switch(play.type) {
      case "1":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "2":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    volumeCredits += Math.max(perf.audience - 30, 0);
    if("2" === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `정립 포인트: ${volumeCredits}점\n`;
  return result;
}

const invoices = require('../data/invoices.json');
const plays = require('../data/plays.json');

const myStatement = statement(invoices[0], plays);
console.log(myStatement);
