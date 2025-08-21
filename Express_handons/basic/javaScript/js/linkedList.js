// Definition of a Node in the Linked List
class Node {
  constructor(value) {
      this.value = value; // The data value of the node
      this.next = null;   // Pointer to the next node
  }
}

// Definition of the Linked List
class LinkedList {
  constructor() {
      this.head = null; // Head node of the list
  }

  // Add a node to the end of the list
  append(value) {
      const newNode = new Node(value);
      if (!this.head) {
          this.head = newNode; // If list is empty, new node is head
          return;
      }
      let current = this.head;
      while (current.next) {
          current = current.next; // Traverse to the end
      }
      current.next = newNode; // Add new node at the end
  }

  // Print the linked list
  print() {
      let current = this.head;
      let output = '';
      while (current) {
          output += current.value + ' -> ';
          current = current.next;
      }
      output += 'null';
      console.log(output);
  }

  // Reverse the linked list in-place
  reverse() {
      let prev = null;
      let current = this.head;
      let next = null;
      // Iterate through the list
      while (current !== null) {
          next = current.next;  // Store next node
          current.next = prev;  // Reverse the 'next' pointer
          prev = current;       // Move 'prev' forward
          current = next;       // Move 'current' forward
      }
      this.head = prev; // Set the new head after the loop
  }

  // Search for a value in the list, returning the node if found or null
  search(value) {
      let current = this.head;
      let iteration = 0; // To print iterations
      while (current !== null) {
          // Log the current iteration and value
          console.log(`Iteration ${iteration}: current node value = ${current.value}`);
          if (current.value === value) {
              console.log(`Value ${value} found at iteration ${iteration}`);
              return current; // Found the value
          }
          current = current.next; // Move to next node
          iteration++;
      }
      console.log(`Value ${value} not found in the list.`);
      return null; // Not found
  }
}

// ----------- Demo: Usage Example -----------

const list = new LinkedList();
list.append(5);
list.append(10);
list.append(20);
list.append(30);

console.log("Original linked list:");
list.print(); // 5 -> 10 -> 20 -> 30 -> null

console.log("Reversing linked list...");
list.reverse();

console.log("Reversed linked list:");
list.print(); // 30 -> 20 -> 10 -> 5 -> null

console.log("Searching for value 20 in the reversed list:");
list.search(20); // Will output each iteration

/*
Expected Output:
Original linked list:
5 -> 10 -> 20 -> 30 -> null
Reversing linked list...
Reversed linked list:
30 -> 20 -> 10 -> 5 -> null
Searching for value 20 in the reversed list:
Iteration 0: current node value = 30
Iteration 1: current node value = 20
Value 20 found at iteration 1
*/