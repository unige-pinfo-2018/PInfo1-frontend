import Vue from 'vue'
import Login from '@/components/Login'

describe('Login.vue', () => {
  it('has the hook created', () => {
    expect(typeof Login.created).toBe('function')
  })
})
