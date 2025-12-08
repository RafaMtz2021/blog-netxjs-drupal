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
  const storeRef = useRef<AppStore>()
  
  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(fetchArticles())
  }

  // Non-null assertion operator (!) le dice a TypeScript que confíe
  return <Provider store={storeRef.current!}>{children}</Provider>
}