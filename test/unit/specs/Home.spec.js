import Vue from 'vue'
import Home from '../../../src/components/Home'

describe('Home.vue', () => {
  it('has the hook created', () => {
    expect(typeof Home.created).toBe('function')
  })
})
