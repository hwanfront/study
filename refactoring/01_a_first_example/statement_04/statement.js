const invoices = require('../data/invoices.json');
const plays = require('../data/plays.json');
const createStatementData = require('./createStatementData.js');

/**
 * @param {Invoice} invoice 
 * @param {Object.<string,Play>} plays 
 */
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

/**
 * renderPlainText 결과를 텍스트로 출력
 * @param {StatementData} data 
 */
function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`; // 데이터를 중간 데이터로부터 얻음
  for(let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `정립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

/**
 * @param {Invoice} invoice 
 * @param {Object.<string,Play>} plays 
 */
function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

/**
 * renderPlainText 결과를 텍스트로 출력
 * @param {StatementData} data 
 */
function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`; // 데이터를 중간 데이터로부터 얻음
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n"
  for(let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td><td>${usd(perf.amount)}</td></tr>\n`
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>정립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

/**
 * @param {number} aNumber 
 */
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", { 
    style: "currency", 
    currency: "USD", 
    minimumFractionDigits: 2 
  }).format(aNumber / 100);
}

const myStatement = statement(invoices[0], plays);
const myHtmlStatement = htmlStatement(invoices[0], plays);
console.log(myStatement);
console.log(myHtmlStatement);
