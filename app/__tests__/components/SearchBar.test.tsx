import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SearchBar from '@/app/components/SearchBar'
import articlesReducer from '@/app/store/slices/articlesSlice'

describe('SearchBar', () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        articles: articlesReducer,
      },
    })
  }

  it('renders search input', () => {
    const store = createTestStore()
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/buscar artículos/i)).toBeInTheDocument()
  })

  it('updates search query on input', () => {
    const store = createTestStore()
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const input = screen.getByPlaceholderText(/buscar artículos/i)
    fireEvent.change(input, { target: { value: 'drupal' } })

    expect(input).toHaveValue('drupal')
  })

  it('displays results count', () => {
    const store = createTestStore()
    
    // Pre-populate store
    const mockArticles = [
      {
        id: '1',
        attributes: {
          title: 'Drupal Article',
          body: { value: 'Test', processed: '<p>Test</p>' },
          created: '2024-01-01',
        },
      },
    ]

    store.dispatch({
      type: 'articles/fetchArticles/fulfilled',
      payload: mockArticles,
    })

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const input = screen.getByPlaceholderText(/buscar artículos/i)
    fireEvent.change(input, { target: { value: 'drupal' } })

    expect(screen.getByText(/1 resultado/i)).toBeInTheDocument()
  })
})