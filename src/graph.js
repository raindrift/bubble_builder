import Node from './node'
import { values } from 'lodash'
import { factors } from './factors'

export default class Graph {
  constructor() {
    this.nodesByName = {}
    this.nodesById = {}
    this.nextId = 1

    this.daysToSimulate = 30
    this.iterations = 10000
  }

  addNode = (person) => {
    if(this.nodesByName[person.name.toLowerCase()]) {
      return({error: 'A person with that name is already present', node: undefined})
    }

    const node = new Node(person, this.nextId)
    this.nextId++
    this.nodesByName[person.name.toLowerCase()] = node
    this.nodesById[node.id] = node

    return({error: undefined, node})
  }

  // nodes as a list
  nodes = () => {
    return values(this.nodesById)
  }

  // edges as a list
  edges = () => {
    const seenEdges = new Set()
    const allEdges = []
    for (let node of this.nodes()) {
      for (let edge of values(node.edges)) {
        if(!seenEdges.has(edge.id)) {
          seenEdges.add(edge.id)
          allEdges.push(edge)
        }
      }
    }
    return allEdges
  }

  updateNodes = (day) => {
    // try to infect/quarantine all individuals for a given day
    for (let node of values(this.nodesById)) {
      node.stepInfection(day)
    }
  }

  tryTransmission = (day) => {
    for (let node of values(this.nodesById)) {
      if(node.infected) {
        for(let edge of values(node.edges)) {
          const contact = edge.adjacent(node)
          if(!contact.infected) {
            const quarantineFactor = contact.quarantined ? factors.quarantine_impact.value : 1
            contact.tryInfect(edge.transmissionRisk * quarantineFactor, day, node)
          }
        }
      }
    }
  }

  simulate = () => {
    for(let i = 0; i < this.iterations; i++) {
      for(let day = 0; day < this.daysToSimulate; day++) {
        this.updateNodes(day)
        this.tryTransmission(day)
      }
      this.reset()
    }
  }

  reset = () => {
    for (let node of values(this.nodesById)) {
      node.reset()
    }
  }
}
