'use client'

import Link from 'next/link'
import { useAppSelector } from '@/app/store/hooks/hooks'
import { selectPaginatedArticles } from '@/app/store/slices/articlesSlice'

export default function ArticlesList() {
  // 📖 Leer del store
  const articles = useAppSelector(selectPaginatedArticles)  // ← Artículos paginados
  const loading = useAppSelector(state => state.articles.loading)
  const error = useAppSelector(state => state.articles.error)

  // 📖 Estado: Cargando
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  // 📖 Estado: Error
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    )
  }

  // 📖 Estado: Sin resultados
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No se encontraron artículos
      </div>
    )
  }

  // 📖 Estado: Mostrar artículos
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <article 
          key={article.id}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">
            <Link 
              href={`/article/${article.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {article.attributes.title}
            </Link>
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.attributes.body?.value.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </p>
          
          <time className="text-sm text-gray-500">
            {new Date(article.attributes.created).toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </article>
      ))}
    </div>
  )
}