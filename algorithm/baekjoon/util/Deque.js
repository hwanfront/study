class Deque {
  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  peekFront() { 
    return this.head && this.head.value;
  }

  peekBack() { 
    return this.tail && this.tail.value;
  }

  unshift(value) {
    if (!this.head) this.head = this.tail = { value };
    else this.head = this.head.next = { value, prev: this.head };
    this.length++;
  }

  shift() {
    let value = this.peekFront();
    if (this.head === this.tail) this.head = this.tail = undefined;
    else (this.head = this.head.prev).next = undefined;
    if(value) this.length--;
    return value;
  }

  push(value) {
    if (!this.head) this.head = this.tail = { value };
    else this.tail = this.tail.prev = { value, next: this.tail };
    this.length++;
  }

  pop() {
    let value = this.peekBack();
    if (this.head === this.tail) this.head = this.tail = undefined;
    else (this.tail = this.tail.next).prev = undefined;
    if(value) this.length--;
    return value;
  }
}

class Deque {
  static MAX = Number.MAX_SAFE_INTEGER;
  constructor() {
    this.data = {};
    this.head = 0;
    this.tail = 1;
    this.length = 0;
  }

  peekHead() { 
    if(this.length) return this.data[this.head];
  }

  peekTail() { 
    if(this.length) return this.data[this.tail];
  }

  unshift(value) {
    this.length++;
    this.head = (this.head + 1) % Deque.MAX;
    this.data[this.head] = value;
  }

  shift()   {
    if (!this.length) return undefined;
    let value = this.peekHead();
    this.length--;
    delete this.data[this.head];
    this.head = (this.head || Deque.MAX) - 1;
    return value;
  }
  

  push(value) {
    this.length++;
    this.tail = (this.tail || Deque.MAX) - 1;
    this.data[this.tail] = value;
  }

  pop()   {
    if (!this.length) return undefined;
    let value = this.peekTail();
    this.length--;
    delete this.data[this.tail];
    this.tail = (this.tail + 1) % Deque.MAX;
    return value;
  }
  
}