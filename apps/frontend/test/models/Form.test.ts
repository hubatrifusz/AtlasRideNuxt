import { describe, it, expect } from 'vitest'
import type { Form } from '../../app/models/Form'
import { CalendarDate } from '@internationalized/date'

describe('Form Model', () => {
  it('should have correct type structure', () => {
    const mockForm: Form = {
      rideType: 'céges',
      email: 'test@example.com',
      phone: '+36301234567',
      departureLocation: 'Budapest',
      destinationLocation: 'Vienna Airport',
      departureDate: new CalendarDate(2024, 12, 25),
    }

    // Test required fields
    expect(mockForm.rideType).toBe('céges')
    expect(mockForm.email).toBe('test@example.com')
    expect(mockForm.phone).toBe('+36301234567')
    expect(mockForm.departureLocation).toBe('Budapest')
    expect(mockForm.destinationLocation).toBe('Vienna Airport')
    expect(mockForm.departureDate).toBeInstanceOf(CalendarDate)
  })

  it('should allow optional fields', () => {
    const mockForm: Form = {
      rideType: 'reptéri',
      email: 'test@example.com',
      phone: '+36301234567',
      departureLocation: 'Budapest',
      destinationLocation: 'Vienna Airport',
      departureDate: null,
      // Optional fields
      name: 'John Doe',
      companyName: 'Atlas Ride Ltd.',
      passengers: '2',
      homeAddress: '1234 Main St, Budapest',
      departureTime: '14:30',
      takeoffTime: '16:00',
      flightNumber: 'FR123',
      return: true,
      returnLocation: 'Vienna Airport',
      returnDate: new CalendarDate(2024, 12, 30),
      returnTime: '18:30',
      comment: 'Special requirements',
    }

    expect(mockForm.name).toBe('John Doe')
    expect(mockForm.companyName).toBe('Atlas Ride Ltd.')
    expect(mockForm.return).toBe(true)
    expect(mockForm.comment).toBe('Special requirements')
  })

  it('should handle null/undefined optional fields', () => {
    const mockForm: Form = {
      rideType: 'egyéb',
      email: 'test@example.com',
      phone: '+36301234567',
      departureLocation: 'Budapest',
      destinationLocation: 'Vienna Airport',
      departureDate: null,
      returnDate: null,
    }

    expect(mockForm.departureDate).toBeNull()
    expect(mockForm.returnDate).toBeNull()
    expect(mockForm.name).toBeUndefined()
    expect(mockForm.companyName).toBeUndefined()
  })

  it('should have correct calendar date handling', () => {
    const testDate = new CalendarDate(2024, 12, 25)
    const mockForm: Form = {
      rideType: 'céges',
      email: 'test@example.com',
      phone: '+36301234567',
      departureLocation: 'Budapest',
      destinationLocation: 'Vienna Airport',
      departureDate: testDate,
    }

    expect(mockForm.departureDate?.year).toBe(2024)
    expect(mockForm.departureDate?.month).toBe(12)
    expect(mockForm.departureDate?.day).toBe(25)
  })
})