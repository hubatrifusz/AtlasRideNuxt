import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ValuesSection from '../../../app/components/Home/ValuesSection.vue'

describe('ValuesSection', () => {
  it('should render without errors', () => {
    const wrapper = mount(ValuesSection)
    expect(wrapper.exists()).toBe(true)
  })

  it('should be a Vue component', () => {
    const wrapper = mount(ValuesSection)
    expect(wrapper.vm).toBeDefined()
  })

  it('should have proper HTML structure', () => {
    const wrapper = mount(ValuesSection)
    const element = wrapper.element
    expect(element).toBeInstanceOf(HTMLElement)
  })
})