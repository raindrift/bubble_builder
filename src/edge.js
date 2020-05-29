export default class Edge {
  constructor({nodes, details}) {
    this.details = details
    this.nodes = new Set()
    let ids = []
    for (let node of nodes) {
      this.nodes.add(node)
      ids.push(node.id)
    }
    this.id = ids.join('-')
  }

  adjacent = (thisNode) => {
    if(! this.nodes.has(thisNode)) return null

    for (let node of this.nodes) {
      if(node !== thisNode) return node
    }
  }
}
