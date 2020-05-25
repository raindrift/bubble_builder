import Node from './node';

describe('Node', () => {
  let [alice, bob, carol] = [null, null, null]

  beforeEach(() => {
    alice = new Node({name: 'Alice', id: 1})
    bob = new Node({name: 'Bob', id: 2})
    carol = new Node({name: 'Carol', id: 3})
  })

  it('does not duplicate edges', () => {
    alice.addEdge({node: bob, details: {risk: 0.47}})
    alice.addEdge({node: bob, details: {risk: 0.55}})
    expect(Object.values(alice.edges).length).toEqual(1)
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
})
