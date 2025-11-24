import { beforeEach, vi } from 'vitest'

// Mock global functions
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
}

// Suppress unhandled rejections from Nuxt during testing
process.on('unhandledRejection', (reason: unknown) => {
  // Suppress specific Nuxt manifest errors that don't affect test validity
  if (reason && typeof reason === 'object' && 'message' in reason) {
    const message = String(reason.message)
    if (message.includes('Cannot read properties of undefined') && message.includes('then')) {
      return // Ignore Nuxt manifest errors
    }
  }
  // Re-throw other unhandled rejections
  throw reason
})

// Mock timers and async operations that might cause issues
vi.stubGlobal('setTimeout', vi.fn((fn) => fn()))
vi.stubGlobal('setInterval', vi.fn())
vi.stubGlobal('clearTimeout', vi.fn())
vi.stubGlobal('clearInterval', vi.fn())

// Mock fetch for API calls
global.fetch = vi.fn()

// Mock $fetch globally
const mockFetch = vi.fn()
// @ts-expect-error - Global mock for testing
global.$fetch = mockFetch

// Mock Nuxt composables and utilities
vi.mock('#app', () => ({
  $fetch: mockFetch,
}))

vi.mock('#imports', () => ({
  $fetch: mockFetch,
  toRaw: vi.fn((obj) => obj),
}))

// Setup test environment
beforeEach(() => {
  vi.clearAllMocks()
  // Reset mock implementations
  mockFetch.mockResolvedValue({ success: true })
})

// Export mock for use in tests
export { mockFetch }