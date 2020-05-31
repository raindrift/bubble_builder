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

  describe('simulate', () => {
    let [graph, alice, bob, charles, dave, eva, freddie] = [null, null, null, null, null, null, null]

    beforeEach(() => {
      graph = new Graph()
      alice = graph.addNode({name: 'Alice', job: 'wfh'}).node
      bob = graph.addNode({name: 'Bob', job: 'wfh'}).node
      charles = graph.addNode({name: 'Charles', job: 'hcw'}).node
      dave = graph.addNode({name: 'Dave', job: 'wfh'}).node
      eva = graph.addNode({name: 'Eva', job: 'wfh'}).node
      freddie = graph.addNode({name: 'Freddie', job: 'wfh'}).node
    })


    describe('tryQuarantine', () => {})

    describe('updateNodes', () => {})

    describe('tryTransmission', () => {})

    it('returns something close to community risk for a graph of 1', () => {
      graph.simulate()
      expect(alice.totalRisk()).toBeLessThan(alice.communityRisk + 0.001)
      expect(alice.totalRisk()).toBeGreaterThan(alice.communityRisk - 0.001)
    })

    it('runs a single multi-day simulation', () => {
      bob.addEdge({node: alice, details: { days_per_week: 7 } })
      bob.addEdge({node: charles, details: { days_per_week: 1 } })
      bob.addEdge({node: freddie, details: { days_per_week: 2 } })
      alice.addEdge({node: dave, details: { days_per_week: 1 } })
      alice.addEdge({node: freddie, details: { days_per_week: 1 } })
      dave.addEdge({node: eva, details: { days_per_week: 0.5 } })

      graph.simulate()

      expect(bob.totalRisk()).toBeLessThan(0.08)
      expect(bob.totalRisk()).toBeGreaterThan(0.05)
    })
  })

  describe('reset', () => {
    xit('resets the entire graph to its un-simulated state', () => {

    })
  })

})
