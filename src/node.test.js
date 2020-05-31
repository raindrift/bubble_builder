import _ from 'lodash'
import Node from './node';
import * as factorsModule from './factors'

describe('Node', () => {
  let [alice, bob, carol] = [null, null, null]

  beforeEach(() => {
    alice = new Node({name: 'Alice'}, 1)
    bob = new Node({name: 'Bob'}, 2)
    carol = new Node({name: 'Carol'}, 3)
  })

  it('has ids', () => {
    expect(alice.id).toEqual(1)
    expect(bob.id).toEqual(2)
  })

  it('does not duplicate edges', () => {
    alice.addEdge({node: bob, details: {risk: 0.47}})
    alice.addEdge({node: bob, details: {risk: 0.55}})
    expect(_.values(alice.edges).length).toEqual(1)
  })

  it('has bidirectional contact relationships', () => {
    alice.addEdge({node: bob, details: {risk: 0.47}})
    alice.addEdge({node: carol, details: {risk: 0.52}})

    expect(alice.contacts().has(bob)).toBeTruthy()
    expect(alice.contacts().has(carol)).toBeTruthy()
    expect(carol.contacts().has(alice)).toBeTruthy()
    expect(bob.contacts().has(alice)).toBeTruthy()
  })

  describe('edgeWith', () => {
    it('returns a specific edge', () => {
      const edge = alice.addEdge({node: bob, details: {risk: 0.47}})
      expect(alice.edgeWith(bob)).toEqual(edge)
    })
  })

  describe('resetting', () => {
    it('reset initializes and resets simulation values', () => {
      expect(alice.infectionAge).toEqual(0)

      alice.infected = true
      alice.reset()
      expect(alice.infected).toBeFalsy()
      expect(alice.infectionAge).toEqual(0)
    })

    it('resetAll computes communityRisk', () => {
      expect(alice.communityRisk).toBeGreaterThan(0.0001)
      expect(alice.communityRisk).toBeLessThan(0.001)
      alice.details.job = 'hcw'
      alice.resetAll()
      expect(alice.communityRisk).toBeGreaterThan(0.001)
    })
  })

  describe('stepInfection', () => {
    it('attempts to infect, or progresses an existing infection', () => {
      alice.communityRisk = 0.0
      alice.stepInfection(3)
      expect(alice.infected).toBeFalsy()

      alice.communityRisk = 1.0
      alice.stepInfection(4)
      expect(alice.infected).toBeTruthy()
      expect(alice.firstInfectedDay).toEqual([4])
      expect(alice.infectionAge).toEqual(0)

      alice.stepInfection(5)
      expect(alice.firstInfectedDay).toEqual([4])
      expect(alice.infectionAge).toEqual(1)
    })
  })

  describe('tryQuarantine', () => {
    it('sets quarantined', () => {
      const factors = {
        symptomatic_rate: { multiplier: 1 },
        symptom_timeline: { values: { 8: 1.0 } },
      }
      const spy = spyOn(factorsModule, 'getFactor')
        .and.callFake((name) => { return(factors[name]) })

      alice.infected = true
      alice.infectionAge = 8
      alice.tryQuarantine(20)
      expect(alice.quarantined).toBeTruthy()
    })
  })


})
