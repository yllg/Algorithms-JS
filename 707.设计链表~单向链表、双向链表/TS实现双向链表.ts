class TNode {
  prev: TNode;
  next: TNode;
  val: number;
  constructor(_val: number) {
    this.val = _val;
  }
}

class MyLinkedList {
  he = new TNode(-1);
  ta = new TNode(-1);
  sz = 0;
  constructor() {
    this.he.next = this.ta;
    this.ta.prev = this.he;
  }
  get(index: number): number {
    const node = this.getNode(index);
    return node == null ? -1 : node.val;
  }
  addAtHead(val: number): void {
    const node = new TNode(val);
    node.next = this.he.next;
    node.prev = this.he;
    this.he.next.prev = node;
    this.he.next = node;
    this.sz++;
  }
  addAtTail(val: number): void {
    const node = new TNode(val);
    node.prev = this.ta.prev;
    node.next = this.ta;
    this.ta.prev.next = node;
    this.ta.prev = node;
    this.sz++;
  }
  addAtIndex(index: number, val: number): void {
    if (index > this.sz) return;
    if (index <= 0) {
      this.addAtHead(val);
    } else if (index == this.sz) {
      this.addAtTail(val);
    } else {
      const node = new TNode(val),
        cur = this.getNode(index);
      node.next = cur;
      node.prev = cur.prev;
      cur.prev.next = node;
      cur.prev = node;
      this.sz++;
    }
  }
  deleteAtIndex(index: number): void {
    const cur = this.getNode(index);
    if (cur == null) return;
    cur.prev.next = cur.next;
    cur.next.prev = cur.prev;
    this.sz--;
  }
  getNode(index: number): TNode | null {
    const isLeft = index < this.sz / 2;
    if (!isLeft) index = this.sz - index - 1;
    for (
      let cur = isLeft ? this.he.next : this.ta.prev;
      cur != this.ta && cur != this.he;
      cur = isLeft ? cur.next : cur.prev
    ) {
      if (index-- == 0) return cur;
    }
    return null;
  }
}
