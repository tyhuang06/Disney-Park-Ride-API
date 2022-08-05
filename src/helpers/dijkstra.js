import { Heap } from 'heap-js';

export class Dijkstra {
	constructor(source, vertices, edges) {
		this.source = source;
		this.vertices = vertices;
		this.edges = edges;

		// fill distance array with infinity, dist to self is 0
		this.dist = Array(vertices.length).fill(Infinity);
		this.dist[source] = 0;

		// this.adjacencyList = {};
		const comparator = (a, b) => a.weight - b.weight;

		this.minHeap = new Heap(comparator);
		this.minHeap.init(this.edges);
	}

	run() {
		const visited = new Set();

		while (this.minHeap.length > 0) {
			const smallest = this.minHeap.pop();

			if (visited.has(smallest)) {
				continue;
			}

			for (let i = 0; i < this.vertices.length; i++) {
				if (
					this.dist[i] >
					this.dist[smallest.source] + this.edges[i].weight
				) {
					this.dist[i] =
						this.dist[smallest.source] + this.edges[i].weight;
				}
			}

			visited.add(smallest);
		}

		return this.dist;
	}
}
