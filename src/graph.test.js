import Graph from './graph';

describe('Graph', () => {
  describe('addNode', () => {
    it('adds a person', () => {
      const graph = new Graph()
      graph.addNode({name: 'Bob', foo: 'bar'})
      expect(graph.nodesByName['Bob']).toBeTruthy()
      expect(graph.nodesByName['Bob'].details.foo).toBeTruthy()
      expect(graph.nodesByName['Bob'].details.id).toEqual(1)
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
