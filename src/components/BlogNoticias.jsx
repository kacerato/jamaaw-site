import { useState, useEffect } from 'react'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { blogService } from '../lib/database.js'

export default function BlogNoticias() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)

  // Posts de exemplo para demonstração
  const postsExemplo = [
    {
      id: 1,
      titulo: 'Remoção de Cabos na Avenida Fernandes Lima Concluída',
      resumo: 'Trabalho de remoção de cabos inativos na principal avenida de Maceió foi finalizado com sucesso.',
      conteudo: `A Jamaaw concluiu com sucesso a remoção de cabos inativos na Avenida Fernandes Lima, uma das principais vias de Maceió. O trabalho, que durou duas semanas, removeu mais de 2 quilômetros de cabos abandonados.

A operação foi realizada em parceria com a Prefeitura de Maceió e contou com o apoio das concessionárias locais. Durante o processo, foram identificados cabos de telefonia, TV a cabo e internet que estavam fora de uso há anos.

"Este é um marco importante para nossa cidade. A remoção desses cabos não apenas melhora a estética urbana, mas também aumenta a segurança dos pedestres e motoristas", comentou o coordenador da operação.

O próximo foco será a Rua do Comércio, no centro da cidade, onde já iniciamos os estudos técnicos para a próxima intervenção.`,
      imagem_destaque: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      publicado: true,
      published_at: '2025-09-10T10:00:00Z',
      created_at: '2025-09-10T10:00:00Z'
    },
    {
      id: 2,
      titulo: 'Nova Tecnologia para Identificação de Cabos Inativos',
      resumo: 'Jamaaw investe em equipamentos modernos para acelerar o processo de identificação de cabos abandonados.',
      conteudo: `A Jamaaw anunciou a aquisição de novos equipamentos de última geração para identificação de cabos inativos. A tecnologia utiliza sensores avançados que conseguem detectar se um cabo está em uso ou abandonado.

Esta inovação permitirá que nossa equipe trabalhe de forma mais eficiente e precisa, reduzindo o tempo necessário para análise técnica de cada localização.

Os novos equipamentos já estão sendo utilizados em campo e os resultados iniciais são muito promissores. Conseguimos reduzir em 40% o tempo de análise técnica.`,
      imagem_destaque: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      publicado: true,
      published_at: '2025-09-08T14:30:00Z',
      created_at: '2025-09-08T14:30:00Z'
    },
    {
      id: 3,
      titulo: 'Parceria com Universidades para Pesquisa Urbana',
      resumo: 'Jamaaw firma parceria com UFAL para desenvolvimento de soluções inovadoras em infraestrutura urbana.',
      conteudo: `A Jamaaw firmou uma importante parceria com a Universidade Federal de Alagoas (UFAL) para desenvolvimento de pesquisas na área de infraestrutura urbana.

O projeto conjunto visa desenvolver metodologias mais eficientes para identificação e remoção de cabos inativos, além de estudar o impacto visual e ambiental desses elementos na paisagem urbana.

Estudantes de engenharia e arquitetura participarão ativamente do projeto, contribuindo com novas perspectivas e soluções inovadoras.`,
      imagem_destaque: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      publicado: true,
      published_at: '2025-09-05T09:15:00Z',
      created_at: '2025-09-05T09:15:00Z'
    }
  ]

  useEffect(() => {
    async function carregarPosts() {
      try {
        setLoading(true)
        // Comentado para usar dados de exemplo
        // const data = await blogService.getPublished()
        // setPosts(data)
        setPosts(postsExemplo)
      } catch (error) {
        console.error('Erro ao carregar posts:', error)
        setPosts(postsExemplo) // Fallback para dados de exemplo
      } finally {
        setLoading(false)
      }
    }

    carregarPosts()
  }, [])

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const calcularTempoLeitura = (conteudo) => {
    const palavras = conteudo.split(' ').length
    const minutos = Math.ceil(palavras / 200) // Assumindo 200 palavras por minuto
    return `${minutos} min de leitura`
  }

  if (selectedPost) {
    return (
      <section className="jamaaw-section bg-white">
        <div className="jamaaw-container">
          <div className="max-w-4xl mx-auto">
            {/* Botão Voltar */}
            <button
              onClick={() => setSelectedPost(null)}
              className="jamaaw-button-secondary mb-8 inline-flex items-center"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Voltar para notícias
            </button>

            {/* Artigo */}
            <article className="jamaaw-fade-in">
              {selectedPost.imagem_destaque && (
                <img
                  src={selectedPost.imagem_destaque}
                  alt={selectedPost.titulo}
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                />
              )}

              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  {selectedPost.titulo}
                </h1>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatarData(selectedPost.published_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{calcularTempoLeitura(selectedPost.conteudo)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Equipe Jamaaw</span>
                  </div>
                </div>
              </header>

              <div className="prose prose-lg max-w-none">
                {selectedPost.conteudo.split('\n\n').map((paragrafo, index) => (
                  <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {paragrafo}
                  </p>
                ))}
              </div>

              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Publicado em {formatarData(selectedPost.published_at)}
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="jamaaw-button-primary"
                  >
                    Ver mais notícias
                  </button>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="noticias" className="jamaaw-section bg-gray-50">
      <div className="jamaaw-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Notícias e Atualizações
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe as últimas novidades sobre nossos projetos e 
            o progresso da transformação urbana em Maceió.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article 
                key={post.id} 
                className="jamaaw-card overflow-hidden hover:shadow-lg transition-shadow duration-300 jamaaw-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {post.imagem_destaque && (
                  <img
                    src={post.imagem_destaque}
                    alt={post.titulo}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatarData(post.published_at)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{calcularTempoLeitura(post.conteudo)}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-black mb-3 line-clamp-2">
                    {post.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.resumo}
                  </p>
                  
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center text-black hover:text-gray-600 font-medium transition-colors"
                  >
                    Ler mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma notícia disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  )
}

