class PriorityQueue {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  empty() {
    return this.heap.length === 0;
  }

  top() {
    return this.heap[0];
  }

  push(data) {
    this.heap.push(data);
    this.heapifyUp();
  }

  heapifyUp() {
    let ci = this.heap.length - 1;
    const cd = this.heap[ci];
    
    while (ci > 0) {
      const pi = Math.floor((ci - 1) / 2);
      const pd = this.heap[pi];
      if (this.compare(pd, cd)) break;
      this.heap[ci] = pd;
      ci = pi;
    }

    this.heap[ci] = cd;
  }

  pop() {
    const last = this.heap.length - 1;
    this.heap[0] = this.heap[last];
    const data = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heapifyDown();
    }
    return data;
  }

  heapifyDown() {
    let pi = 0;
    const pd = this.heap[pi];
    
    while (pi < this.heap.length) {
      const li = pi * 2 + 1;
      const ri = pi * 2 + 2;
      if (li >= this.heap.length) break;
      const ld = this.heap[li];
      const rd = ri < this.heap.length ? this.heap[ri] : null;
      const bi = rd !== null && this.compare(rd, ld) ? ri: li;
      const bd = this.heap[bi];
      if (this.compare(pd, bd)) break;
      this.heap[pi] = bd;
      pi = bi;
    }
    this.heap[pi] = pd;
  }
}

module.exports = PriorityQueue;
