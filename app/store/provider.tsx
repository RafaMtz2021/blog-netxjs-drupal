'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { fetchArticles } from './slices/articlesSlice'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Inicializar con undefined explícitamente
  const storeRef = useRef<AppStore | undefined>(undefined)
  
  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(fetchArticles()) 
  }

  return <Provider store={storeRef.current}>{children}</Provider>
} 