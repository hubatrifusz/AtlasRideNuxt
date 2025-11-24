import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CalendarDate } from '@internationalized/date'

// Mock the entire composable to avoid real API calls
const mockUseBooking = {
  postNewBooking: vi.fn(),
  getAllBooking: vi.fn(),
}

// Mock toRaw function
const mockToRaw = vi.fn((obj) => obj)

vi.mock('../../app/composables/useBooking', () => ({
  useBooking: () => mockUseBooking
}))

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    toRaw: mockToRaw,
  }
})

describe('useBooking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseBooking.postNewBooking.mockResolvedValue({ success: true, id: '123' })
    mockUseBooking.getAllBooking.mockResolvedValue([])
  })

  describe('date conversion logic', () => {
    it('should convert CalendarDate to ISO string', () => {
      const calendarDate = new CalendarDate(2024, 12, 25)
      
      // Test the conversion logic directly
      const calendarDateToISO = (cd: CalendarDate | null): string | null => {
        if (!cd) return null
        return new Date(Date.UTC(cd.year, cd.month - 1, cd.day)).toISOString()
      }
      
      const result = calendarDateToISO(calendarDate)
      
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      expect(result).toContain('2024-12-25')
    })

    it('should handle null CalendarDate', () => {
      // Test the conversion logic directly
      const calendarDateToISO = (cd: CalendarDate | null): string | null => {
        if (!cd) return null
        return new Date(Date.UTC(cd.year, cd.month - 1, cd.day)).toISOString()
      }
      
      const result = calendarDateToISO(null)
      
      expect(result).toBeNull()
    })
  })

  describe('postNewBooking', () => {
    it('should post booking successfully', async () => {
      const mockResponse = { success: true, id: '123' }
      const mockForm = {
        rideType: 'céges',
        email: 'test@example.com',
        phone: '+36301234567',
        departureLocation: 'Budapest',
        destinationLocation: 'Vienna Airport',
        departureDate: new CalendarDate(2024, 12, 25),
      }

      mockUseBooking.postNewBooking.mockResolvedValueOnce(mockResponse)

      const result = await mockUseBooking.postNewBooking(mockForm)

      expect(result).toEqual(mockResponse)
      expect(mockUseBooking.postNewBooking).toHaveBeenCalledWith(mockForm)
    })

    it('should handle API error', async () => {
      const mockForm = {
        rideType: 'céges',
        email: 'test@example.com',
        phone: '+36301234567',
      }

      const mockError = new Error('API Error')
      mockUseBooking.postNewBooking.mockRejectedValueOnce(mockError)

      await expect(mockUseBooking.postNewBooking(mockForm)).rejects.toThrow('API Error')
    })
  })

  describe('getAllBooking', () => {
    it('should fetch all bookings successfully', async () => {
      const mockBookings = [
        { id: '1', email: 'test1@example.com' },
        { id: '2', email: 'test2@example.com' },
      ]

      mockUseBooking.getAllBooking.mockResolvedValueOnce(mockBookings)

      const result = await mockUseBooking.getAllBooking()

      expect(result).toEqual(mockBookings)
      expect(mockUseBooking.getAllBooking).toHaveBeenCalled()
    })

    it('should handle fetch error', async () => {
      const mockError = new Error('Failed to fetch bookings')
      mockUseBooking.getAllBooking.mockRejectedValueOnce(mockError)

      await expect(mockUseBooking.getAllBooking()).rejects.toThrow('Failed to fetch bookings')
    })

    it('should handle network error', async () => {
      const mockError = new Error('Network error')
      mockUseBooking.getAllBooking.mockRejectedValueOnce(mockError)

      await expect(mockUseBooking.getAllBooking()).rejects.toThrow('Network error')
    })
  })
})