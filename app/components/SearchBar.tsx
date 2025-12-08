'use client'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks'
import { setSearchQuery } from '@/app/store/slices/articlesSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar() {
  // 📖 Leer del store
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(state => state.articles.searchQuery)
  const resultsCount = useAppSelector(state => state.articles.filteredItems.length)

  // 📖 Función para actualizar búsqueda
  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query))  // ← Dispara la action
  }

  return (
    <div className="mb-8">
      {/* Input de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="search"
          placeholder="Buscar artículos..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400 transition duration-150"
          aria-label="Buscar artículos"
        />
      </div>
      
      {/* Contador de resultados */}
      {searchQuery && (
        <p className="mt-2 text-sm text-gray-600">
          {resultsCount} {resultsCount === 1 ? 'resultado' : 'resultados'} encontrados
        </p>
      )}
    </div>
  )
}