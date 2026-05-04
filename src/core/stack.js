export class Stack {
  constructor(initialItems = []) {
    this.items = Array.isArray(initialItems) ? [...initialItems] : [];
  }

  push(value) {
    this.items.push(value);
    return value;
  }

  pop() {
    if (this.items.length === 0) {
      throw new Error("Stack underflow");
    }

    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  clone() {
    return new Stack(this.items);
  }

  toArray() {
    return [...this.items];
  }
}

export default Stack;