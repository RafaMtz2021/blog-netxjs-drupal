import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_DRUPAL_BASE_URL = 'https://dev-rafael-martinez-demo.pantheonsite.io'

// Mock fetch
global.fetch = jest.fn()

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})