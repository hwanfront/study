class PerformanceCalculator {
  /**
   * @param {MyPerf} aPerformance
   * @param {Play} aPlay
   */
  constructor(aPerformance, aPlay) {
    this.performances = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계됨');
  }

  get volumeCredits() {
    return Math.max(this.performances.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performances.audience > 30) {
      result += 1000 * (this.performances.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result 
    result = 30000;
    if (this.performances.audience > 20) {
      result += 10000 + 500 * (this.performances.audience - 20);
    }
    result += 300 * this.performances.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performances.audience / 5);
  }
}

/**
 * @param {MyPerf} aPerformance
 * @param {Play} aPlay
 */
function createPerformanceCalculator(aPerformance, aPlay) {
  switch(aPlay.type) {
    case "1": return new TragedyCalculator(aPerformance, aPlay);
    case "2": return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

/**
 * @param {Invoice} invoice 
 * @param {Object.<string,Play>} plays 
 */
function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  /**
   * @param {Perf} aPerformance
   * @returns {MyPerf}
   */
  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance)); // 팩터리 함수 이용
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    // result.amount = amountFor(result);
    // result.volumeCredits = volumeCreditsFor(result);
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  /**
   * @param {Perf} aPerformance
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  /**
   * @deprecated 
   * @param {MyPerf} aPerformance 
   */
  function amountFor(aPerformance) { 
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  /**
   * @deprecated 
   * @param {MyPerf} aPerformance
   */
  function volumeCreditsFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits;
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
