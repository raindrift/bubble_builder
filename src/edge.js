export default class Edge {
  constructor({nodes, details}) {
    this.details = details
    this.nodes = new Set()
    for (let node of nodes) this.nodes.add(node)
  }

  adjacent = (thisNode) => {
    if(! this.nodes.has(thisNode)) return null

    for (let node of this.nodes) {
      if(node !== thisNode) return node
    }
  }
}
