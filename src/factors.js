export const factors = {
  baseline_risk: {
    title: 'Daily Baseline Community Risk',
    source: 'http://foo.com',
    value: 0.0002,
  },
  transmission_risk: {
    title: 'Daily Baseline Transmission Risk',
    source: 'http://foo.com',
    value: 0.5,
  },
  jobs: {
    wfh: {
      title: 'Works from home',
      source: '',
      multiplier: 0.5,
      key: 'wfh',
    },
    hcw: {
      title: 'Healthcare worker',
      source: 'http://foo.com',
      multiplier: 20,
      key: 'hcw',
    },
    frontline: {
      title: 'Works with the public',
      source: '',
      multiplier: 1,
      key: 'frontline',
    },
  },
}
