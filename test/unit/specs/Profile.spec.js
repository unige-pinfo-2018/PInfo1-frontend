import Vue from 'vue'
import Profile from '@/components/Profile'

describe('Profile.vue', () => {
  it('has the hook created', () => {
    expect(typeof Profile.created).toBe('function')
  })
})
