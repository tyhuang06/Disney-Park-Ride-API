import { Heap } from 'heap-js';

export class Dijkstra {
	constructor(source, vertices, edges) {
		this.source = source;
		this.vertices = vertices;
		this.edges = edges;

		// fill distance array with infinity, dist to self is 0
		this.dist = Array(vertices.length).fill(Infinity);
		this.dist[source] = 0;

		// heap comparator: compare by weight
		const comparator = (a, b) => a.weight - b.weight;

		// create min heap
		this.minHeap = new Heap(comparator);
		this.minHeap.init(this.edges);
	}

	run() {
		// create visited set
		const visited = new Set();

		// loop through minHeap
		while (this.minHeap.length > 0) {

			// get edge with smallest weight
			const smallest = this.minHeap.pop();

			// check if smallest weight is visited
			if (visited.has(smallest)) {
				continue;
			}

			// update target distance if necessary
			for (let i = 0; i < this.vertices.length; i++) {
				if (
					this.dist[i] >
					this.dist[smallest.source] + this.edges[i].weight
				) {
					this.dist[i] =
						this.dist[smallest.source] + this.edges[i].weight;
				}
			}

			// add smallest weight to visited
			visited.add(smallest);
		}

		return this.dist;
	}
}
