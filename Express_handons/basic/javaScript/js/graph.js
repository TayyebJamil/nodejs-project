class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    // Add the connection both ways for an undirected graph.
    if (!this.adjacencyList[vertex1].includes(vertex2)) {
      this.adjacencyList[vertex1].push(vertex2);
    }
    if (!this.adjacencyList[vertex2].includes(vertex1)) {
      this.adjacencyList[vertex2].push(vertex1);
    }
  }

  // Remove an edge between two vertices.
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  // Remove a vertex and all its edges from the graph.
  removeVertex(vertex) {
    // Remove all edges to this vertex.
    while (this.adjacencyList[vertex] && this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    // Finally, delete the vertex itself.
    delete this.adjacencyList[vertex];
  }

  // Display the graph's adjacency list.
  printGraph() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " -> " + this.adjacencyList[vertex].join(", "));
    }
  }
}

const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "C");
g.printGraph(); // Output: A -> B, C \n B -> A, C \n C -> A, B