import * as factorsModule from './factors'

export const factorSpy = (factors) => {
  const valSpy = spyOn(factorsModule, 'factorVal')
    .and.callFake((name) => {
      return(factors[name].multiplier || factors[name].value)
    })
  const getSpy = spyOn(factorsModule, 'getFactor')
    .and.callFake((name) => { return(factors[name]) })
  return [getSpy, valSpy]
}
