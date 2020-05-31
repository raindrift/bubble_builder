import { randomBool } from './util'

describe('randomBool', () => {
  // this probably seems pedantic, but it's such an important part of this project.
  it('returns true with the given weight', () => {
    let topWeighted = []
    let bottomWeighted = []
    for (let i = 0; i < 100; i++) {
      expect(randomBool(1.0)).toBeTruthy()
      expect(randomBool(0.0)).toBeFalsy()
      topWeighted.push(randomBool(0.8))
      bottomWeighted.push(randomBool(0.2))
    }
    expect(topWeighted.filter(v => v).length).toBeGreaterThan(50)
    expect(bottomWeighted.filter(v => v).length).toBeLessThan(50)
  })
})
