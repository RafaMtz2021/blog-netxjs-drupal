'use client'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks'
import { setCurrentPage, selectPaginationInfo } from '@/app/store/slices/articlesSlice'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Pagination() {
  const dispatch = useAppDispatch()
  
  // Un solo selector con toda la info de paginación
  const { 
    currentPage, 
    totalPages, 
    hasNextPage, 
    hasPreviousPage,
    totalItems 
  } = useAppSelector(selectPaginationInfo)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-8">
      <nav className="flex justify-center items-center space-x-2" aria-label="Paginación">
        {/* Botón Anterior */}
        <button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={!hasPreviousPage}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 
                     disabled:cursor-not-allowed hover:bg-gray-50 transition"
          aria-label="Página anterior"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* Números de página */}
        {pages.map(page => (
          <button
            key={page}
            onClick={() => dispatch(setCurrentPage(page))}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={`Página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Botón Siguiente */}
        <button
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={!hasNextPage}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 
                     disabled:cursor-not-allowed hover:bg-gray-50 transition"
          aria-label="Página siguiente"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>
      
      {/* Info adicional */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Mostrando página {currentPage} de {totalPages} ({totalItems} artículos totales)
      </p>
    </div>
  )
}