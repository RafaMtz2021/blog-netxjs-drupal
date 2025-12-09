import { configureStore } from '@reduxjs/toolkit'
import articlesReducer, {
  setSearchQuery,
  setCurrentPage,
  fetchArticles,
} from '@/app/store/slices/articlesSlice'

describe('articlesSlice', () => {
  // Helper para crear store de test
  const createTestStore = () => {
    return configureStore({
      reducer: {
        articles: articlesReducer,
      },
    })
  }

  describe('reducers', () => {
    it('should set search query', () => {
      const store = createTestStore()
      store.dispatch(setSearchQuery('drupal'))
      
      const state = store.getState()
      expect(state.articles.searchQuery).toBe('drupal')
      expect(state.articles.currentPage).toBe(1)
    })

    it('should set current page', () => {
      const store = createTestStore()
      store.dispatch(setCurrentPage(2))
      
      expect(store.getState().articles.currentPage).toBe(2)
    })
  })

  describe('async thunks', () => {
    beforeEach(() => {
      // Reset fetch mock
      (global.fetch as jest.Mock).mockClear()
    })

    it('should fetch articles successfully', async () => {
      const mockArticles = [
        {
          id: '1',
          attributes: {
            title: 'Test Article',
            body: { value: 'Content', processed: '<p>Content</p>' },
            created: '2024-01-01',
          },
        },
      ]

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockArticles }),
      })

      const store = createTestStore()
      await store.dispatch(fetchArticles())

      const state = store.getState()
      expect(state.articles.items).toEqual(mockArticles)
      expect(state.articles.loading).toBe(false)
      expect(state.articles.error).toBe(null)
    })

    it('should handle fetch error', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      )

      const store = createTestStore()
      await store.dispatch(fetchArticles())

      const state = store.getState()
      expect(state.articles.loading).toBe(false)
      expect(state.articles.error).toBe('Network error')
    })
  })
})