'use client'  // ← IMPORTANTE: Esto es un Client Component

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { fetchArticles } from './slices/articlesSlice'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // useRef para mantener el mismo store en re-renders
  const storeRef = useRef<AppStore>()
  
  // Crear el store SOLO la primera vez
  if (!storeRef.current) {
    storeRef.current = makeStore()
    
    // Pre-cargar artículos automáticamente al iniciar la app
    storeRef.current.dispatch(fetchArticles())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}