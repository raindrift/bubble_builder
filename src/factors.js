export const factors = {
  cases: {
    title: 'CA new cases/day',
    value: 3660,
  },
  population: {
    title: 'USA population',
    value: 39500000,
  },
  under_reported_by: {
    title: 'The rate at which under-reporting happens',
    multiplier: 1,  // 1x under-reporting (for now) (TODO)
  },
  symptomatic_rate: {
    title: 'Percentage of infected who show symptoms',
    value: 0.8,
  },
  transmission_risk: {
    title: 'Daily Baseline Transmission Risk',
    source: 'http://foo.com',
    value: 0.5,
  },
  quarantine_impact: {
    title: 'Reduction in transmission risk while quarantined',
    multiplier: 0.05,
  },
  jobs: {
    wfh: {
      title: 'Works from home',
      source: '',
      multiplier: 1,
      key: 'wfh',
    },
    hcw: {
      title: 'Healthcare worker',
      source: 'http://foo.com',
      multiplier: 15,
      key: 'hcw',
    },
    frontline: {
      title: 'Works with the public',
      source: '',
      multiplier: 3,
      key: 'frontline',
    },
  },
  symptom_timeline:{
    title: 'Likelihood of developing symptoms by day of infection (not including fully asymptomatic cases)',
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
  }
}

// for testability
export function getFactor(name) {
  return factors[name]
}

export function factorVal(name) {
  if(factors[name]) {
    return factors[name].multiplier || factors[name].value
  }
}
