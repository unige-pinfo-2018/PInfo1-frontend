import Vue from 'vue'
import App from '@/views/App'

describe('App.vue', () => {
  it('has the hook computed', () => {
    expect(typeof App.computed.getCount).toBe('function')
    expect(typeof App.computed.getIsOpenNewTab).toBe('function')
  })
  it('has default data', () => {
    expect(typeof App.data).toBe('function')
    const defaultData = App.data()
    expect(defaultData.count).toBe(4)
    expect(defaultData.backgroundColor).toBe('#2196F3')
    expect(defaultData.color).toBe('#ffffff')
    expect(defaultData.position).toBe('bottom-right')
  })
})
