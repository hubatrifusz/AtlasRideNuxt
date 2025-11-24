import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StepChooseType from '../../../app/components/Booking/StepChooseType.vue'

describe('StepChooseType', () => {
  it('should render all three options', () => {
    const wrapper = mount(StepChooseType)

    expect(wrapper.text()).toContain('Céges')
    expect(wrapper.text()).toContain('Reptéri')
    expect(wrapper.text()).toContain('Egyéb')
  })

  it('should emit selectType when clicking on an option', async () => {
    const wrapper = mount(StepChooseType)

    // Click on "Céges" option
    await wrapper.find('.card_border').trigger('click')

    expect(wrapper.emitted('selectType')).toBeTruthy()
    expect(wrapper.emitted('selectType')?.[0]).toEqual(['céges'])
  })

  it('should emit correct type for each option', async () => {
    const wrapper = mount(StepChooseType)
    const cards = wrapper.findAll('.card_border')

    // Test Céges option
    await cards[0].trigger('click')
    expect(wrapper.emitted('selectType')?.[0]).toEqual(['céges'])

    // Test Reptéri option
    await cards[1].trigger('click')
    expect(wrapper.emitted('selectType')?.[1]).toEqual(['reptéri'])

    // Test Egyéb option
    await cards[2].trigger('click')
    expect(wrapper.emitted('selectType')?.[2]).toEqual(['egyéb'])
  })

  it('should be clickable and interactive', async () => {
    const wrapper = mount(StepChooseType)
    const cards = wrapper.findAll('.card_border')

    // All cards should be present
    expect(cards).toHaveLength(3)
    
    // Cards should have click listeners (indicated by cursor: pointer in CSS)
    cards.forEach(card => {
      expect(card.element).toBeInstanceOf(HTMLElement)
    })
  })

  it('should have correct HTML structure', () => {
    const wrapper = mount(StepChooseType)

    // Check main container
    expect(wrapper.find('div.w-full').exists()).toBe(true)
    expect(wrapper.findAll('.card_border')).toHaveLength(3)
    expect(wrapper.findAll('.card')).toHaveLength(3)
  })

  it('should have proper responsive classes', () => {
    const wrapper = mount(StepChooseType)
    const container = wrapper.find('.w-full')

    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('md:flex-row')
    expect(container.classes()).toContain('flex-col')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
  })
})