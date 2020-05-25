import Edge from './edge'

export default class Node {
  constructor(details) {
    this.details = details
    this.id = details.id
    this.edges = {}
  }

  addEdge = ({node, details}) => {
    const edge = new Edge({nodes: [this, node], details})
    this.edges[node.id] = edge
    node.edges[this.id]= edge
    return edge
  }

  contacts = () => {
    let contacts = new Set()
    for (let edge of Object.values(this.edges)) {
      const contact = edge.adjacent(this)
      contacts.add(contact)
    }
    return contacts
  }

  edgeWith = (node) => {
    return this.edges[node.id]
  }
}
