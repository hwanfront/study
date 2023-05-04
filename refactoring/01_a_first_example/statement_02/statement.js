/**
 * statement
 * @param {Invoice} invoice 
 * @param {Object.<string,Play>} plays 
 */
function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  for(let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())}\n`;
  result += `정립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
  
  /**
   * totalAmount
   */
  function totalAmount() {
    let result = 0;
    for(let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
  
  /**
   * totalVolumeCredits
   */
  function totalVolumeCredits() {
    let result = 0;
    for(let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  /**
   * usd format 함수의 이름 변경
   * @param {number} aNumber 
   */
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "USD", 
      minimumFractionDigits: 2 
    }).format(aNumber / 100); // 단위 변환 로직도 함수 안으로 이동
  }
  
  /**
   * volumeCreditsFor 적립 포인트 계산 코드 추출하기
   * @param {Perf} aPerformance
   */
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if("2" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  /**
   * playFor 임시 변수를 질의함수로 바꾸기
   * @param {Perf} aPerformance
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  /**
   * amountFor 함수 추출하기
   * @param {Perf} aPerformance 
   * @param {Play} play
   */
  function amountFor(aPerformance) { // 필요없어진 매개변수 제거
    let result = 0;
    switch(playFor(aPerformance).type) { // 함수 선언 바꾸기
      case "1":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "2":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }
}

const invoices = require('../data/invoices.json');
const plays = require('../data/plays.json');

const myStatement = statement(invoices[0], plays);
console.log(myStatement);
