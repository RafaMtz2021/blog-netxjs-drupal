import SearchBar from './components/SearchBar'
import ArticlesList from './components/ArticlesList'
import Pagination from './components/Pagination'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Blog Demo
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Next.js 16 + Drupal 10 + Redux Toolkit + Azure
      </p>
      
      <SearchBar />
      <ArticlesList />
      <Pagination />
    </main>
  )
}