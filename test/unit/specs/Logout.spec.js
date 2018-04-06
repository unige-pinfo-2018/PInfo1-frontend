import Vue from 'vue'
import Logout from '@/components/Logout'

describe('Logout.vue', () => {
  it('has the hook created', () => {
    expect(typeof Logout.created).toBe('function')
  })
})
