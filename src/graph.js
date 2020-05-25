import Node from './node'
import Edge from './edge'

export default class Graph {
  constructor() {
    this.nodesByName = {}
    this.nodesById = {}
    this.nextId = 1
  }

  addNode = (person) => {
    if(this.nodesByName[person.name]) {
      return({error: 'A person with that name is already present'})
    }

    person.id = this.nextId
    this.nextId++

    const node = new Node(person)
    this.nodesByName[person.name] = node
    this.nodesById[person.id] = node

    return node
  }
}
