import { factorVal } from './factors'

export default class Edge {
  constructor({nodes, details}) {
    this.nodes = new Set()
    let ids = []
    for (let node of nodes) {
      this.nodes.add(node)
      ids.push(node.id)
    }
    this.id = ids.join('-')

    details.days_per_week = details.days_per_week || 7
    this.details = details
    this.transmissionRisk = factorVal('transmission_risk') * (details.days_per_week / 7)
  }

  adjacent = (thisNode) => {
    if(! this.nodes.has(thisNode)) return null

    for (let node of this.nodes) {
      if(node !== thisNode) return node
    }
  }
}
