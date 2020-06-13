import Graph from './graph';
import { factorSpy } from './test_util'

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

  describe('simulation', () => {
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


    describe('updateNodes', () => {
      it('steps infections forward', () => {
        alice.infected = true
        graph.updateNodes(2)
        expect(alice.infectionAge).toEqual(1)
      })
    })

    describe('tryTransmission', () => {
      it('makes transmission happen', () => {
        bob.addEdge({node: alice, details: { days_per_week: 7 } })
        bob.infected = true
        // Small chance this test will be flaky. If it's a nuisance, mock some
        // factors to ensure that infection is always transmitted
        for (let i = 0; i < 30; i++) {
          graph.tryTransmission(i)
        }
        expect(alice.infected).toBeTruthy()
      })
    })

    it('returns something close to community risk for a graph of 1, in one day', () => {
      alice.communityRisk = 0.1 // 1% chance per day
      graph.daysToSimulate = 1
      graph.simulate()
      expect(alice.totalRisk(graph.iterations)).toBeLessThan(0.15)
      expect(alice.totalRisk(graph.iterations)).toBeGreaterThan(0.09)
    })

    it('gets simulation results similar to the prototype model', () => {
      // These are the largely contrived factors from the prototype
      factorSpy({
        cases: { value: 19891 },
        population: { value: 328000000 },
        under_reported_by: { multiplier: 5 },
        symptomatic_rate: { multiplier: 0.8 },
        quarantine_impact: { multiplier: 0.05 },
        jobs: {
          'wfh': {multiplier: 1},
          'hcw': {multiplier: 15},
          'frontline': {multiplier: 3},
        },
        symptom_timeline:{
          values: {
            0: 0.0001,  // basically never on day 0
            1: 0.001,
            2: 0.025,
            3: 0.15,
            4: 0.35,
            5: 0.5,
            6: 0.65,
            7: 0.8,
            8: 0.85,
            9: 0.9,
            10: 0.95,
            11: 0.975,
            12: 1,    // everything above this is assumed to be 1
          }
        },
        transmission_risk: { value: 0.5 },
      })

      bob.addEdge({node: alice, details: { days_per_week: 7 } })
      bob.addEdge({node: charles, details: { days_per_week: 1 } })
      bob.addEdge({node: freddie, details: { days_per_week: 2 } })
      alice.addEdge({node: dave, details: { days_per_week: 1 } })
      alice.addEdge({node: freddie, details: { days_per_week: 1 } })
      dave.addEdge({node: eva, details: { days_per_week: 0.5 } })

      graph.simulate()

      // 0.0666 in the python simulation
      expect(bob.totalRisk(graph.iterations)).toBeLessThan(0.08)
      expect(bob.totalRisk(graph.iterations)).toBeGreaterThan(0.05)

      // 0.0625 in the python simulation
      expect(alice.totalRisk(graph.iterations)).toBeLessThan(0.08)
      expect(alice.totalRisk(graph.iterations)).toBeGreaterThan(0.05)
    })
  })

  describe('reset', () => {
    it('resets a single simulation for the whole graph', () => {
      const graph = new Graph()
      const alice = graph.addNode({name: 'Alice', job: 'wfh'}).node
      alice.infected = true
      graph.reset()
      expect(alice.infected).toBeFalsy()
    })
  })

  describe('resetAll', () => {
    it('resets the graph to its un-simulated state', () => {
      const graph = new Graph()
      const alice = graph.addNode({name: 'Alice', job: 'wfh'}).node
      alice.infected = true
      graph.resetAll()
      expect(alice.infected).toBeFalsy()
    })
  })

  describe('factor tests', () => {
    it('has the correct outcome for a two-person graph with no quarantine', () => {
      factorSpy({
        cases: { value: 100 },
        population: { value: 10000 }, // 1% risk
        under_reported_by: { multiplier: 5 }, // 5% risk
        jobs: {
          'frontline': {multiplier: 0.5}, // 2.5% risk
          'hcw': {multiplier: 1}  // 5% risk
        },

        symptomatic_rate: { multiplier: 0.0001 }, // negligible chance of symptoms
        symptom_timeline: { values: { 1: 0.5, 2: 0.5, 3: 0.5, 4: 0.5, 5: 0.5 } }, // 25% chance
        transmission_risk: { value: 1 }, // always transmit
      })

      const graph = new Graph()
      graph.daysToSimulate = 2
      const alice = graph.addNode({name: 'Alice', job: 'frontline'}).node
      const bob = graph.addNode({name: 'Bob', job: 'frontline'}).node

      // no edges
      graph.simulate()

      // 2 days at 2.5% risk is ~5%
      expect(bob.totalRisk(graph.iterations)).toBeLessThan(0.06)
      expect(bob.totalRisk(graph.iterations)).toBeGreaterThan(0.04)
      expect(alice.totalRisk(graph.iterations)).toBeLessThan(0.06)
      expect(alice.totalRisk(graph.iterations)).toBeGreaterThan(0.04)

      graph.resetAll()
      alice.addEdge({node: bob, details: {days_per_week: 7}}) // 100% transmission odds
      graph.simulate()

      // 2 days with 100% odds of transmission should be ~10%ish
      expect(alice.totalRisk(graph.iterations)).toBeLessThan(0.11)
      expect(alice.totalRisk(graph.iterations)).toBeGreaterThan(0.09)
      expect(bob.totalRisk(graph.iterations)).toBeLessThan(0.11)
      expect(bob.totalRisk(graph.iterations)).toBeGreaterThan(0.09)
    })
  })

})
