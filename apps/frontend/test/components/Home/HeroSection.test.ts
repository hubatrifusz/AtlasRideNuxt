import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '../../../app/components/Home/HeroSection.vue'

describe('HeroSection', () => {
  it('should render correctly', () => {
    const wrapper = mount(HeroSection)

    expect(wrapper.find('h1').text()).toBe('Atlas ride')
    expect(wrapper.find('h2').text()).toBe('Megbízható reptéri személyszállítás')
    expect(wrapper.find('h3').text()).toContain('Az Atlas Ride gyors és megbízható repülőtéri transzfereket kínál')
  })

  it('should have proper styling classes', () => {
    const wrapper = mount(HeroSection)
    const section = wrapper.find('section')

    expect(section.classes()).toContain('h-screen')
    expect(section.classes()).toContain('w-full')
    expect(section.classes()).toContain('flex')
    expect(section.classes()).toContain('flex-col')
    expect(section.classes()).toContain('justify-center')
    expect(section.classes()).toContain('items-center')
  })

  it('should have hero id', () => {
    const wrapper = mount(HeroSection)
    const section = wrapper.find('section')

    expect(section.attributes('id')).toBe('hero')
  })

  it('should render all text content', () => {
    const wrapper = mount(HeroSection)

    expect(wrapper.text()).toContain('Megbízható reptéri személyszállítás')
    expect(wrapper.text()).toContain('Atlas ride')
    expect(wrapper.text()).toContain('személyre szabott privát személyszállítással')
  })
})