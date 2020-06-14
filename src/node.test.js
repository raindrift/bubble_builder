import _ from 'lodash'
import Node from './node';
import { factorSpy } from './test_util'

describe('Node', () => {

  let [alice, bob, carol] = [null, null, null]

  beforeEach(() => {
    factorSpy({
      cases: { value: 100 },
      population: { value: 10000 }, // 1% risk
      under_reported_by: { multiplier: 5 }, // 5% risk
      jobs: {
        'frontline': {multiplier: 0.5}, // 2.5% risk
        'hcw': {multiplier: 1}, // 5% risk
      },

      symptomatic_rate: { multiplier: 1 },
      symptom_timeline: { values: { 8: 1.0 } },
      transmission_risk: { value: 0.5 },
    })

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

  it('calculates individual risk coefficients', () => {
    const alice = new Node({name: 'Alice'}, 1)
    expect(alice.communityRisk).toEqual(0.025)
  })

  describe('edgeWith', () => {
    it('returns a specific edge', () => {
      const edge = alice.addEdge({node: bob, details: {risk: 0.47}})
      expect(alice.edgeWith(bob)).toEqual(edge)
    })
  })

  describe('reset', () => {
    it('initializes and resets simulation values', () => {
      expect(alice.infectionAge).toEqual(0)

      alice.infected = true
      alice.reset()
      expect(alice.infected).toBeFalsy()
      expect(alice.infectionAge).toEqual(0)
    })
  })

  describe('resetAll', () => {
    it('computes communityRisk', () => {
      alice.details.job = 'hcw'
      alice.resetAll()
      expect(alice.communityRisk).toEqual(0.05)
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

    it('infects at community risk rate in one day', () => {
      let infectedCount = 0
      alice.communityRisk = 0.1 // 10% daily risk
      for (let i = 0; i < 10000; i++) {
        alice.stepInfection(1)
        if(alice.infected) {
          infectedCount++
        }
        alice.reset()
      }
      expect(infectedCount).toBeGreaterThan(900)
      expect(infectedCount).toBeLessThan(1100)
    })

    it('infects at a higher rate in 10 days', () => {
      let infectedCount = 0
      alice.communityRisk = 0.1 // 10% daily risk
      for (let i = 0; i < 10000; i++) {
        for (let day = 0; day < 10; day++) {
          alice.stepInfection(day)
          if(alice.infected) {
            infectedCount++
            break
          }
        }
        alice.reset()
      }
      // This value should follow a logarithmic distribution
      // ~65% at 10 days
      expect(infectedCount).toBeGreaterThan(6300)
      expect(infectedCount).toBeLessThan(6700)
    })

    it('gives reasonable results with a large population', () => {
      let infectedCount = 0
      alice.communityRisk = 3660 / 39500000
      for (let i = 0; i < 10000; i++) {
        for (let day = 0; day < 10; day++) {
          alice.stepInfection(day)
          if(alice.infected) {
            infectedCount++
            break
          }
        }
        alice.reset()
      }
      // the stddev for this is fairly high
      expect(infectedCount).toBeGreaterThan(1)
      expect(infectedCount).toBeLessThan(20)
    })
  })

  describe('tryQuarantine', () => {
    it('sets quarantined', () => {
      alice.infected = true
      alice.infectionAge = 8
      alice.tryQuarantine(20)
      expect(alice.quarantined).toBeTruthy()
    })
  })
})
