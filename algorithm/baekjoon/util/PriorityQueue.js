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

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    const currentItem = this.heap[currentIndex];
    
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const parentItem = this.heap[parentIndex];
      
      if (this.compare(parentItem, currentItem)) break;

      this.heap[currentIndex] = parentItem;
      currentIndex = parentIndex;
    }

    this.heap[currentIndex] = currentItem;
  }

  pop() {
    const last = this.heap.length - 1;
    this.heap[0] = this.heap[last];
    this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heapifyDown();
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    const currentItem = this.heap[currentIndex];
    
    while (currentIndex < this.heap.length) {
      const leftChildIndex = currentIndex * 2 + 1;
      const rightChildIndex = currentIndex * 2 + 2;

      if (leftChildIndex >= this.heap.length) break;

      const leftChildItem = this.heap[leftChildIndex];
      const rightChildItem = rightChildIndex < this.heap.length ? this.heap[rightChildIndex] : null;
      const bestIndex = rightChildItem !== null && this.compare(rightChildItem, leftChildItem) ? rightChildIndex: leftChildIndex;
      const bestItem = this.heap[bestIndex];
      
      if (this.compare(currentItem, bestItem)) break;

      this.heap[currentIndex] = bestItem;
      currentIndex = bestIndex;
    }
    this.heap[currentIndex] = currentItem;
  }
}

module.exports = PriorityQueue;
