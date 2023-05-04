/**
 * @param {Invoice} invoice 
 * @param {Object.<string,Play>} plays 
 */
function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer; // 데이터를 중간 데이터로 옮김
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  /**
   * @param {Perf} aPerformance
   * @returns {MyPerf}
   */
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance); // 얕은 복사
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  /**
   * @param {Perf} aPerformance
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  /**
   * @param {MyPerf} aPerformance 
   */
  function amountFor(aPerformance) { 
    let result = 0;
    switch(aPerformance.play.type) { 
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
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }
    return result;
  }

  /**
   * @param {MyPerf} aPerformance
   */
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if("2" === aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }
  
  /**
   * @param {Object} data
   * @param {MyPerf[]} data.performances
   */
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0); 
  }
  
  /**
   * @param {Object} data
   * @param {MyPerf[]} data.performances
   */
  function totalVolumeCredits(data) {    
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0); 
  }
}

module.exports = createStatementData;
