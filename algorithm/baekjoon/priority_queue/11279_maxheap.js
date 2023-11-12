// https://www.acmicpc.net/problem/11286
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

class MaxHeap {
  constructor() {
    this.heap = [];
  }
  isEmpty() { return this.heap.length === 0 }
  top() { return this.heap[0] }
  push(data) { 
    this.heap.push(data);
    this.heapifyUp();
  }
  heapifyUp() {
    let ci = this.heap.length - 1;
    const cd = this.heap[ci];
    while(ci > 0) {
      const pi = Math.floor((ci - 1) / 2);
      const pd = this.heap[pi];
      if(pd > cd) break;
      this.heap[ci] = pd;
      ci = pi;
    }
    this.heap[ci] = cd;
  }
  pop() {
    this.heap[0] = this.heap.at(-1);
    this.heap.pop();
    if(this.heap.length > 0) this.heapifyDown();
  }
  heapifyDown() {
    let ci = 0;
    const cd = this.heap[0];
    while(ci < this.heap.length) {
      const li = ci * 2 + 1;
      const ri = ci * 2 + 2;
      if(li >= this.heap.length) break;
      const ld = this.heap[li];
      const rd = ri >= this.heap.length ? null : this.heap[ri];
      const bi = rd !== null && rd > ld ? ri : li;
      const bd = this.heap[bi];// https://www.acmicpc.net/problem/
      // const input = require("fs").readFileSync("/dev/stdin").toString().trim();
      
      class AbsHeap {
        constructor() {
          this.heap = [];
        }
        isEmpty() { return this.heap.length === 0 }
        top() { return this.heap[0] }
        push(data) { 
          this.heap.push(data);
          this.heapifyUp();
        }
        heapifyUp() {
          let ci = this.heap.length - 1;
          const cd = this.heap[ci];
          while(ci > 0) {
            const pi = Math.floor((ci - 1) / 2);
            const pd = this.heap[pi];
            if(Math.abs(pd) < Math.abs(cd)) break;
            if(Math.abs(pd) === Math.abs(cd) && pd < cd) break;
            this.heap[ci] = pd;
            ci = pi;
          }
          this.heap[ci] = cd;
        }
        pop() {
          this.heap[0] = this.heap.at(-1);
          this.heap.pop();
          if(this.heap.length > 0) this.heapifyDown();
        }
        heapifyDown() {
          let ci = 0;
          const cd = this.heap[0];
          while(ci < this.heap.length) {
            console.log(ci);
            const li = ci * 2 + 1;
            const ri = ci * 2 + 2;
            let bi = null;
            if(li < this.heap.length) {
              const ld = this.heap[li];
              if(Math.abs(ld) < Math.abs(cd) || (Math.abs(ld) === Math.abs(cd) && ld < cd)) {
                bi = li;
              }
            }
            if(ri < this.heap.length) {
              const rd = this.heap[ri];
              if(bi !== null) {
                const ld = this.heap[li];
                if(Math.abs(rd) < Math.abs(ld) || (Math.abs(rd) === Math.abs(ld) && rd < ld)) {
                  bi = ri
                }
              } else {
                if(Math.abs(rd) < Math.abs(cd) || (Math.abs(rd) === Math.abs(cd) && rd < cd)) {
                  bi = ri
                }
              }
            }
            if(bi === null) break;
            this.heap[ci] = this.heap[bi];
            ci = bi;
          }
          this.heap[ci] = cd;
        }
      }
      
      const input = `20
      -1
      1
      1
      -1
      -1
      -1
      1
      1
      1
      -1
      0
      0
      0
      0
      0
      0
      0
      0
      0
      0`;
      const [n, ...num] = input.split`\n`.map(Number);
      console.log(solution(n, num));
      
      function solution(n, num) {
        const ah = new AbsHeap();
        const result = [];
        num.forEach(e => {
          console.log(ah);
          if(e !== 0) ah.push(e);
          else {
            if(ah.isEmpty()) {
              result.push(0);
            } else {
              result.push(ah.top());
              ah.pop();
            }
          }
        })
      
        return result.join('\n')
      }
      if(bd < cd) break;
      this.heap[ci] = bd;
      ci = bi;
    }
    this.heap[ci] = cd;
  }
}

const input = `8
1
1
1
1
2
3
4
0
0
0
0`;
const [n, ...num] = input.split`\n`.map(Number);
console.log(solution(n, num));

function solution(n, num) {
  const mh = new MaxHeap();
  const result = [];
  num.forEach(e => {
    console.log(mh.heap)
    if(e > 0) mh.push(e);
    else {
      if(mh.isEmpty()) {
        result.push(0);
      } else {
        result.push(mh.top());
        mh.pop();
      }
    }
  })

  return result.join('\n')
}
