class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) { return parentIndex * 2 + 1; }
  getRightChildIndex(parentIndex) { return parentIndex * 2 + 2; }  
  getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }
  peak() { return this.heap[0]; }
  size() { return this.heap.length; }

  enqueue(key, value) {
    const node = { key, value };
    this.heap.push(node);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    const lastInertedNode = this.heap[index];

    while(index > 0) {
      const parentIndex = this.getParentIndex(index);

      if(this.heap[parentIndex].key < lastInertedNode.key) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else {
        break;
      }
    }

    this.heap[index] = lastInertedNode;
  }

  dequeue() {
    const count = this.heap.length;
    const rootNode = this.heap[0];

    if(count <= 0) {
      return undefined;
    }
    if(count === 1) {
      this.heap = [];
    } else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
    }

    return rootNode;
  }

  heapifyDown() {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while(this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const biggerChildIndex = (rightChildIndex < count && this.heap[rightChildIndex].key > this.heap[leftChildIndex].key) ? rightChildIndex : leftChildIndex;

      if(this.heap[biggerChildIndex].key >= rootNode.key) {
        this.heap[index] = this.heap[biggerChildIndex];
        index = biggerChildIndex;
      } else {
        break;
      }

      this.heap[index] = rootNode;
    }
  }
}

module.exports = MaxHeap;
