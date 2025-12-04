import Link from 'next/link';

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

async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/article`,
    { cache: 'force-cache' }  // Cambiado
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  
  const data = await res.json();
  return data.data as Article[];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Mi Blog con Next.js + Drupal</h1>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">
              <Link 
                href={`/article/${article.id}`}
                className="hover:text-blue-600"
              >
                {article.attributes.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 text-sm mb-4">
              Publicado: {new Date(article.attributes.created).toLocaleDateString('es-MX')}
            </p>
            
            <div 
              className="prose prose-sm"
              dangerouslySetInnerHTML={{ 
                __html: article.attributes.body.processed.substring(0, 200) + '...' 
              }}
            />
            
            <Link 
              href={`/article/${article.id}`}
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              Leer más →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}