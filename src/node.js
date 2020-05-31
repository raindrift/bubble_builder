import { values } from 'lodash'
import Edge from './edge'
import { factors, getFactor } from './factors'
import { randomBool } from './util'

export default class Node {
  constructor(details, id) {
    // required details
    details.job = details.job || 'frontline'

    this.details = details
    this.id = id
    this.edges = {}
    this.resetAll()
  }

  reset = () => {
    // reset variables from a single simulation
    this.infected = false
    this.infectionAge = 0
    this.quarantined = false
  }

  resetAll = () => {
    this.reset()

    // reset variables that persist across simulations
    this.firstInfectedDay = []
    this.infectedBy = []
    this.iterations = 0

    // calculate risk from inputs
    const risk_per_day = factors.cases.value / factors.population.value * factors.under_reported_by.multiplier
    this.communityRisk = risk_per_day * factors.jobs[this.details.job].multiplier
  }

  // Graph construction methods
  addEdge = ({node, details}) => {
    const edge = new Edge({nodes: [this, node], details})
    this.edges[node.id] = edge
    node.edges[this.id] = edge
    return edge
  }

  contacts = () => {
    let contacts = new Set()
    for (let edge of values(this.edges)) {
      const contact = edge.adjacent(this)
      contacts.add(contact)
    }
    return contacts
  }

  edgeWith = (node) => {
    return this.edges[node.id]
  }


  // Simulation methods
  stepInfection = (day) => {
    // try infecting a single node with a given risk
    if(this.infected) {
      this.infectionAge++
    } else {
      this.tryInfect(this.communityRisk, day, null)
    }

    this.tryQuarantine(day)
    this.iterations++ // independent iteration counter
  }

  tryInfect = (risk, day, from) => {
    this.infected = randomBool(risk)
    if(this.infected) {
      this.firstInfectedDay.push(day)
      this.infectedBy.push(from)
    }
  }

  tryQuarantine = (day) => {
    if(!this.infected || this.quarantined) return null
    const symptomaticRate = getFactor('symptomatic_rate').multiplier
    const symptomTimeline = getFactor('symptom_timeline')

    // if not present, assumed to be 1
    let symptomProbability = symptomTimeline.values[this.infectionAge] || 1.0
    this.quarantined = randomBool(symptomProbability * symptomaticRate)
  }

  totalRisk = () => {
    return this.firstInfectedDay.length / this.iterations
  }
}
