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

    person.id = this.nextId
    this.nextId++

    const node = new Node(person)
    this.nodesByName[person.name.toLowerCase()] = node
    this.nodesById[person.id] = node

    return({error: undefined, node})
  }

  // nodes as a list
  nodes = () => {
    return values(this.nodesById)
  }
}
