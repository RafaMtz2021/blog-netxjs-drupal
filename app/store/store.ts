import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './slices/articlesSlice'

// Función factory: crea un nuevo store cada vez
export const makeStore = () => {
  return configureStore({
    reducer: {
      articles: articlesReducer,  // ← Slice de artículos
    },
    // Redux DevTools habilitado en producción para fines educativos.
    // En un proyecto real con datos sensibles, usar:
    // devTools: process.env.NODE_ENV !== 'production'
    devTools: true,
  })
}

// Tipos para TypeScript (inferidos del store)
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']