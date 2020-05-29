import Edge from './edge';
import Node from './node';

describe('Edge', () => {
  let [alice, bob, edge] = [null, null, null]

  beforeEach(() => {
    alice = new Node({name: 'Alice'}, 1)
    bob = new Node({name: 'Bob'}, 2)
    edge = new Edge({nodes: [alice, bob], details: {foo: 'bar'}})
  })

  it('stores nodes', () => {
    expect(edge.nodes).toContain(alice)
    expect(edge.nodes).toContain(bob)
    expect(edge.id).toEqual('1-2')
  })

  describe('.adjacent', () => {
    it('fetches the neighbor edge', () => {
      expect(edge.adjacent(alice)).toEqual(bob)
      expect(edge.adjacent(bob)).toEqual(alice)
    })

    it('returns null if thisNode is not present', () => {
      const carol = new Node({name: 'Carol', id: 3})
      expect(edge.adjacent(carol)).toBeFalsy()
    })
  })

})
