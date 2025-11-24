import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PricesSection from '../../../app/components/Home/PricesSection.vue'

describe('PricesSection', () => {
  it('should render without errors', () => {
    const wrapper = mount(PricesSection)
    expect(wrapper.exists()).toBe(true)
  })

  it('should be a Vue component', () => {
    const wrapper = mount(PricesSection)
    expect(wrapper.vm).toBeDefined()
  })

  it('should have proper HTML structure', () => {
    const wrapper = mount(PricesSection)
    const element = wrapper.element
    expect(element).toBeInstanceOf(HTMLElement)
  })
})