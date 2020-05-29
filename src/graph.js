import Node from './node'
import { values } from 'lodash'

export default class Graph {
  constructor() {
    this.nodesByName = {}
    this.nodesById = {}
    this.nextId = 1
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
}
