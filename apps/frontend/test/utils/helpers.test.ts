import { describe, it, expect } from 'vitest'
import { CalendarDate } from '@internationalized/date'

// Utility functions that might be used across the app
describe('Utility Functions', () => {
  describe('CalendarDate utilities', () => {
    it('should create valid CalendarDate instances', () => {
      const date = new CalendarDate(2024, 12, 25)
      
      expect(date.year).toBe(2024)
      expect(date.month).toBe(12)
      expect(date.day).toBe(25)
    })

    it('should handle date conversion to ISO using UTC', () => {
      const calendarDate = new CalendarDate(2024, 12, 25)
      // Use UTC to avoid timezone issues
      const jsDate = new Date(Date.UTC(calendarDate.year, calendarDate.month - 1, calendarDate.day))
      const isoString = jsDate.toISOString()
      
      expect(isoString).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      expect(isoString).toContain('2024-12-25')
    })

    it('should compare dates correctly', () => {
      const date1 = new CalendarDate(2024, 12, 25)
      const date2 = new CalendarDate(2024, 12, 25)
      const date3 = new CalendarDate(2024, 12, 26)
      
      expect(date1.compare(date2)).toBe(0)
      expect(date1.compare(date3)).toBeLessThan(0)
      expect(date3.compare(date1)).toBeGreaterThan(0)
    })
  })

  describe('Form validation helpers', () => {
    it('should validate email format', () => {
      const validEmails = [
        'test@example.com',
        'user@domain.co.uk',
        'name.surname@company.org'
      ]
      
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        ''
      ]

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true)
      })

      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false)
      })
    })

    it('should validate phone format', () => {
      const validPhones = [
        '+36301234567',
        '+36201234567',
        '+36701234567'
      ]
      
      const invalidPhones = [
        '1234567',
        '+36123',
        'not-a-phone',
        ''
      ]

      const phoneRegex = /^\+36[0-9]{9}$/

      validPhones.forEach(phone => {
        expect(phoneRegex.test(phone)).toBe(true)
      })

      invalidPhones.forEach(phone => {
        expect(phoneRegex.test(phone)).toBe(false)
      })
    })
  })
})