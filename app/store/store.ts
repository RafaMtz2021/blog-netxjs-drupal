import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './slices/articlesSlice'

// Función factory: crea un nuevo store cada vez
export const makeStore = () => {
  return configureStore({
    reducer: {
      articles: articlesReducer,  // ← Nuestro slice de artículos
    },
    devTools: process.env.NODE_ENV !== 'production',  // Habilita Redux DevTools
  })
}

// Tipos para TypeScript (inferidos del store)
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']