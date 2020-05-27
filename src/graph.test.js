import Graph from './graph';

describe('Graph', () => {
  describe('addNode', () => {
    it('adds a person', () => {
      const graph = new Graph()
      const result = graph.addNode({name: 'Bob', foo: 'bar'})
      expect(result.node.details.foo).toBeTruthy()
      expect(graph.nodesByName['bob']).toBeTruthy()
      expect(graph.nodesByName['bob'].details.foo).toBeTruthy()
      expect(graph.nodesByName['bob'].details.id).toEqual(1)
      expect(graph.nodesById[1].details.name).toEqual('Bob')
    })

    it('produces an error when the person is in the graph', () => {
      const graph = new Graph()
      graph.addNode({name: 'Bob', foo: 'bar'})
      const result = graph.addNode({name: 'Bob', foo: 'bar'})
      expect(result.error).toBeTruthy()
    })
  })

})
