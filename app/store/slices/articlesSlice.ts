import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

// 📌 TIPOS
interface Article {
  id: string;
  attributes: {
    title: string;
    body: {
      processed: string;
      value: string;
    };
    created: string;
  };
}

interface ArticlesState {
  items: Article[]              // Todos los artículos
  filteredItems: Article[]      // Artículos filtrados por búsqueda
  searchQuery: string           // Query de búsqueda actual
  currentPage: number           // Página actual
  itemsPerPage: number          // Artículos por página
  loading: boolean              // Estado de carga
  error: string | null          // Mensaje de error
  lastFetched: number | null    // Timestamp del último fetch
}

// 📌 ESTADO INICIAL
const initialState: ArticlesState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 6,
  loading: false,
  error: null,
  lastFetched: null,
}

// 📌 ASYNC THUNK - Fetch de artículos
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/article`,
        { cache: 'force-cache' }
      )
      
      if (!response.ok) throw new Error('Failed to fetch articles')
      
      const json = await response.json()
      return json.data as Article[]
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
    }
  }
)

// 📌 SLICE
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // Actualizar búsqueda
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
      
      // Filtrar artículos
      if (action.payload.trim() === '') {
        state.filteredItems = state.items
      } else {
        const query = action.payload.toLowerCase()
        state.filteredItems = state.items.filter(article =>
          article.attributes.title.toLowerCase().includes(query) ||
          article.attributes.body?.value.toLowerCase().includes(query)
        )
      }
    },
    
    // Cambiar página
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    
    // Cambiar items por página
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    
    // Limpiar error
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = action.payload
        state.lastFetched = Date.now()
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

// 📌 ACTIONS
export const { setSearchQuery, setCurrentPage, setItemsPerPage, clearError } = articlesSlice.actions

// 📌 REDUCER
export default articlesSlice.reducer

// 📌 SELECTORES MEMOIZADOS

// Selector base
const selectArticlesState = (state: { articles: ArticlesState }) => state.articles

// Artículos paginados
export const selectPaginatedArticles = createSelector(
  [selectArticlesState],
  (articlesState) => {
    const { filteredItems, currentPage, itemsPerPage } = articlesState
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredItems.slice(startIndex, endIndex)
  }
)

// Total de páginas
export const selectTotalPages = createSelector(
  [selectArticlesState],
  (articlesState) => {
    const { filteredItems, itemsPerPage } = articlesState
    return Math.ceil(filteredItems.length / itemsPerPage)
  }
)

// Información completa de paginación
export const selectPaginationInfo = createSelector(
  [selectArticlesState, selectTotalPages],
  (articlesState, totalPages) => ({
    currentPage: articlesState.currentPage,
    totalPages,
    itemsPerPage: articlesState.itemsPerPage,
    totalItems: articlesState.filteredItems.length,
    hasNextPage: articlesState.currentPage < totalPages,
    hasPreviousPage: articlesState.currentPage > 1,
  })
)