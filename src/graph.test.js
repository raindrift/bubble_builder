import Graph from './graph';

describe('Graph', () => {
  describe('addNode', () => {
    it('adds a person', () => {
      const graph = new Graph()
      const result = graph.addNode({name: 'Bob', foo: 'bar'})
      expect(result.node.details.foo).toBeTruthy()
      expect(graph.nodesByName['bob']).toBeTruthy()
      expect(graph.nodesByName['bob'].details.foo).toBeTruthy()
      expect(graph.nodesByName['bob'].id).toEqual(1)
      expect(graph.nodesById[1].details.name).toEqual('Bob')
    })

    it('allocates ids', () => {
      const graph = new Graph()
      const alice = graph.addNode({name: 'Alice', foo: 'bar'}).node
      const bob = graph.addNode({name: 'Bob', foo: 'bar'}).node
      expect(alice.id).toEqual(1)
      expect(bob.id).toEqual(2)
    })

    it('produces an error when the person is in the graph', () => {
      const graph = new Graph()
      graph.addNode({name: 'Bob', foo: 'bar'})
      const result = graph.addNode({name: 'Bob', foo: 'bar'})
      expect(result.error).toBeTruthy()
    })
  })

  describe('edges', () => {
    const graph = new Graph()
    const alice = graph.addNode({name: 'Alice', foo: 'bar'}).node
    const bob = graph.addNode({name: 'Bob', foo: 'bar'}).node
    const carol = graph.addNode({name: 'Carol', foo: 'bar'}).node
    alice.addEdge({node: bob, details: {risk: 0.47}})
    alice.addEdge({node: carol, details: {risk: 0.47}})
    bob.addEdge({node: carol, details: {risk: 0.47}})

    const edges = graph.edges()
    expect(edges.length).toEqual(3)
    expect(edges[0].nodes).toBeTruthy()
  })

})
