import expect from 'expect'
import { sleep, localStorage } from '../src'

describe('Helper functions', () => {
  describe('#sleep()', () => {
    it('should pause the async function execution', async () => {
      const start = Date.now()
      await sleep(10)
      const end = Date.now()

      expect(end - start).toBeGreaterThanOrEqual(10)
    })
  })

  describe('#localStorage', () => {
    it('should support regular object assignment', () => {
      expect(localStorage.someKey).toBeUndefined()
      localStorage.someKey = 'test'
      expect(localStorage.someKey).toEqual('test')
    })

    describe('#getItem()', () => {
      it('should return the requested item', () => {
        localStorage.someKey = 'test'
        expect(localStorage.getItem('someKey')).toEqual('test')
      })

      it("should return undefined on items that don't exist.", () => {
        expect(localStorage.getItem("item that doesn't exist")).toBeNull()
      })
    })

    describe('#setItem()', () => {
      it('should save an item', () => {
        expect(localStorage.getItem('ayaya')).toBeNull()
        localStorage.setItem('ayaya', 'clap')
        expect(localStorage.getItem('ayaya')).toBe('clap')
      })

      it('should update an existing item', () => {
        expect(localStorage.getItem('ayaya')).toBe('clap')
        localStorage.setItem('ayaya', 'clapperino')
        expect(localStorage.getItem('ayaya')).toEqual('clapperino')
      })
    })

    describe('#removeItem', () => {
      it('should remove an item', () => {
        expect(localStorage.itemToRemove).toBeUndefined()
        localStorage.setItem('item to remove', 'hm')
        localStorage.removeItem('item to remove')
        expect(localStorage.itemToRemove).toBeUndefined()
      })
    })

    describe('#clear()', () => {
      it('should clear the key/value pairs', () => {
        localStorage.a = 'a'
        localStorage.b = 'b'
        localStorage.clear()

        expect(localStorage.a).toBeUndefined()
        expect(localStorage.a).toBeUndefined()
        expect(typeof localStorage.getItem).toBe('function') // Don't remove the methods
      })
    })
  })
})
