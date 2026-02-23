import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { loadContent } from "/src/utils/contentLoader";
import '../styles/animations.css';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    siteName: "Dr. Carlos Silva",
    oab: "OAB/SP 123.456",
    whatsapp: "5511999999999"
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Carregar configurações
        const settingsData = await loadContent('/src/content/settings/general.md');
        setContent(prev => ({ ...prev, ...settingsData?.data }));

        // Carregar o post específico
        const response = await fetch(`/src/content/posts/${slug}.md`);
        if (response.ok) {
          const text = await response.text();
          const { data, content } = parseFrontmatter(text);
          setPost({ slug, data, content });
        }
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  function parseFrontmatter(text) {
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { data: {}, content: text };
    
    const data = {};
    match[1].split('\n').forEach(line => {
      if (line.includes(': ')) {
        const [key, ...value] = line.split(': ');
        data[key.trim()] = value.join(': ').trim();
      }
    });
    
    return { data, content: match[2] };
  }

  // Função para formatar o conteúdo em parágrafos
  function formatContent(content) {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-6 text-gray-700 leading-relaxed">
        {paragraph.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < paragraph.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="mb-8">O artigo que você está procurando não existe.</p>
          <Link
            to="/blog"
            className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans overflow-x-hidden">
      <Header 
        siteName={content.siteName}
        oab={content.oab}
        whatsapp={content.whatsapp}
      />

      {/* Hero do Artigo */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-black"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-accent transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para artigos
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
            {post.data.title}
          </h1>

          {/* Meta informações */}
          <div className="flex flex-wrap items-center gap-6 text-white/80 animate-fadeInUp delay-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <span>{new Date(post.data.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏷️</span>
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full">
                {post.data.category || 'Direito'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">👤</span>
              <span>{post.data.author || 'Dr. Carlos Silva'}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <span>5 min de leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Imagem de destaque */}
      {post.data.image && (
        <section className="py-8 bg-white">
          <div className="container-custom">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.data.image}
                alt={post.data.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo do artigo */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Descrição/Resumo */}
            {post.data.description && (
              <div className="mb-8 p-6 bg-gray-50 border-l-4 border-accent rounded-r-lg">
                <p className="text-lg text-gray-700 italic">
                  {post.data.description}
                </p>
              </div>
            )}

            {/* Conteúdo principal */}
            <article className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </article>

            {/* Tags */}
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-primary mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.data.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-accent hover:text-primary transition cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compartilhamento */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-primary mb-4">Compartilhe:</h3>
              <div className="flex gap-3">
                {[
                  { icon: "📘", label: "Facebook", color: "hover:bg-blue-600" },
                  { icon: "🐦", label: "Twitter", color: "hover:bg-blue-400" },
                  { icon: "💼", label: "LinkedIn", color: "hover:bg-blue-700" },
                  { icon: "📱", label: "WhatsApp", color: "hover:bg-green-500" }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl hover:text-white hover:scale-110 transition-all ${social.color}`}
                    title={social.label}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Navegação entre posts */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
              <Link
                to="/blog"
                className="flex items-center gap-2 text-gray-600 hover:text-accent transition group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Todos os artigos
              </Link>
              
              <Link
                to="#"
                className="flex items-center gap-2 text-gray-600 hover:text-accent transition group"
              >
                Próximo artigo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-primary mb-4">
              Receba novos artigos
            </h3>
            <p className="text-gray-600 mb-8">
              Cadastre-se para receber notificações quando publicarmos novos conteúdos.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-primary px-8 py-4 rounded-lg font-semibold hover:scale-105 transition whitespace-nowrap"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </section>

      <WhatsAppButton whatsapp={content.whatsapp} />
      <Footer
        siteName={content.siteName}
        oab={content.oab}
        phone={content.phone}
        email={content.email}
        address={content.address}
        whatsapp={content.whatsapp}
      />
    </div>
  );
}