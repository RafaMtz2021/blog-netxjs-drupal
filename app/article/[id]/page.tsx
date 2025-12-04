import Link from 'next/link';

interface Article {
  id: string;
  attributes: {
    title: string;
    body: {
      processed: string;
    };
    created: string;
  };
}

async function getArticle(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/article/${id}`,
    { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      }
    }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch article');
  }
  
  const data = await res.json();
  return data.data as Article;
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await params antes de usarlo
  const { id } = await params;
  const article = await getArticle(id);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link 
        href="/"
        className="text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Volver al inicio
      </Link>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">
          {article.attributes.title}
        </h1>
        
        <p className="text-gray-600 mb-8">
          Publicado: {new Date(article.attributes.created).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: article.attributes.body.processed 
          }}
        />
      </article>
    </main>
  );
}