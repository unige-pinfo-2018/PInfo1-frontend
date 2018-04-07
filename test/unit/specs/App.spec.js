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
    expect(defaultData.backgroundColor).toBe('#65B0FF')
    expect(defaultData.color).toBe('#ffffff')
    expect(defaultData.position).toBe('bottom-right')
  })

  // it('computed properties are correct', () => {
  //   const Constructor = Vue.extend(App)
  //   const vm = new Constructor({
  //     propsData: {
  //     count: 4
  //     }
  //   }).$mount()
  //   expect(vm.getCount).toEqual(4)
  // })

})
