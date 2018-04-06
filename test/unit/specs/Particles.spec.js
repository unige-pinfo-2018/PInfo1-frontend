import Vue from 'vue'
import Particles from '@/components/Particles'

describe('Particles.vue', () => {
  it('has the hook created', () => {
    expect(typeof Particles.created).toBe('function')
  })
})
