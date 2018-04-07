import Vue from 'vue'
import Posts from '@/components/Posts'

describe('Posts.vue', () => {
  it('has the hook created', () => {
    expect(typeof Posts.created).toBe('function')
  })
})
