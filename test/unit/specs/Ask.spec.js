import Vue from 'vue'
import Ask from '@/components/Ask'

describe('Ask.vue', () => {
  it('has the hook created', () => {
    expect(typeof Ask.created).toBe('function')
  })
})
