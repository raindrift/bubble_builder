import { randomBool } from './util'

describe('randomBool', () => {
  // this probably seems pedantic, this function is so fundamental
  it('returns true with the given weight', () => {
    let topWeighted = []
    let bottomWeighted = []
    for (let i = 0; i < 10000; i++) {
      expect(randomBool(1.0)).toBeTruthy()
      expect(randomBool(0.0)).toBeFalsy()
      topWeighted.push(randomBool(0.8))
      bottomWeighted.push(randomBool(0.2))
    }
    const topPercent = topWeighted.filter(v => v).length / 10000
    const bottomPercent = bottomWeighted.filter(v => v).length / 10000
    expect(topPercent).toBeGreaterThan(0.78)
    expect(topPercent).toBeLessThan(0.82)
    expect(bottomPercent).toBeGreaterThan(0.19)
    expect(bottomPercent).toBeLessThan(0.21)
  })
})
