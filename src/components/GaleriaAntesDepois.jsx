import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, MapPin, Calendar } from 'lucide-react'
import { galeriaService } from '../lib/database.js'

export default function GaleriaAntesDepois() {
  const [galeria, setGaleria] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Dados de exemplo para demonstração
  const galeriaExemplo = [
    {
      id: 1,
      titulo: 'Rua do Comércio - Centro',
      descricao: 'Remoção completa de cabos de telefonia e TV a cabo abandonados há mais de 5 anos.',
      imagem_antes: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      imagem_depois: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      localizacao: 'Centro, Maceió',
      data_trabalho: '2025-08-15',
      created_at: '2025-08-20T10:00:00Z'
    },
    {
      id: 2,
      titulo: 'Avenida Fernandes Lima',
      descricao: 'Trabalho de organização e remoção de cabos inativos em uma das principais avenidas da cidade.',
      imagem_antes: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      imagem_depois: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      localizacao: 'Farol, Maceió',
      data_trabalho: '2025-08-10',
      created_at: '2025-08-15T14:30:00Z'
    },
    {
      id: 3,
      titulo: 'Rua Jangadeiros Alagoanos',
      descricao: 'Remoção de múltiplos cabos abandonados que comprometiam a segurança dos pedestres.',
      imagem_antes: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
      imagem_depois: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      localizacao: 'Pajuçara, Maceió',
      data_trabalho: '2025-08-05',
      created_at: '2025-08-10T09:15:00Z'
    },
    {
      id: 4,
      titulo: 'Praça da República',
      descricao: 'Revitalização da área central com remoção de cabos antigos e organização da infraestrutura.',
      imagem_antes: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      imagem_depois: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      localizacao: 'Centro, Maceió',
      data_trabalho: '2025-07-28',
      created_at: '2025-08-02T16:45:00Z'
    }
  ]

  useEffect(() => {
    async function carregarGaleria() {
      try {
        setLoading(true)
        // Comentado para usar dados de exemplo
        // const data = await galeriaService.getAll()
        // setGaleria(data)
        setGaleria(galeriaExemplo)
      } catch (error) {
        console.error('Erro ao carregar galeria:', error)
        setGaleria(galeriaExemplo) // Fallback para dados de exemplo
      } finally {
        setLoading(false)
      }
    }

    carregarGaleria()
  }, [])

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const abrirModal = (item, imageIndex = 0) => {
    setSelectedItem(item)
    setCurrentImageIndex(imageIndex)
  }

  const fecharModal = () => {
    setSelectedItem(null)
    setCurrentImageIndex(0)
  }

  const proximaImagem = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? 1 : 0)
  }

  const imagemAnterior = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? 1 : 0)
  }

  const getCurrentImage = () => {
    if (!selectedItem) return ''
    return currentImageIndex === 0 ? selectedItem.imagem_antes : selectedItem.imagem_depois
  }

  const getCurrentLabel = () => {
    return currentImageIndex === 0 ? 'Antes' : 'Depois'
  }

  return (
    <section id="galeria" className="jamaaw-section bg-white">
      <div className="jamaaw-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Galeria Antes e Depois
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja a transformação que nosso trabalho proporciona às ruas de Maceió. 
            Cada projeto representa um passo em direção a uma cidade mais organizada.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galeria.map((item, index) => (
              <div 
                key={item.id} 
                className="jamaaw-card overflow-hidden jamaaw-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Comparação Antes/Depois */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-0">
                    {/* Imagem Antes */}
                    <div className="relative group cursor-pointer" onClick={() => abrirModal(item, 0)}>
                      <img
                        src={item.imagem_antes}
                        alt={`${item.titulo} - Antes`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                        ANTES
                      </div>
                    </div>

                    {/* Imagem Depois */}
                    <div className="relative group cursor-pointer" onClick={() => abrirModal(item, 1)}>
                      <img
                        src={item.imagem_depois}
                        alt={`${item.titulo} - Depois`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
                        DEPOIS
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informações */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {item.descricao}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.localizacao}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatarData(item.data_trabalho)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {galeria.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum item na galeria no momento.</p>
          </div>
        )}

        {/* Modal de Visualização */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              {/* Botão Fechar */}
              <button
                onClick={fecharModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navegação */}
              <button
                onClick={imagemAnterior}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={proximaImagem}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Imagem */}
              <div className="text-center">
                <img
                  src={getCurrentImage()}
                  alt={`${selectedItem.titulo} - ${getCurrentLabel()}`}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
                
                {/* Informações da Imagem */}
                <div className="mt-4 text-white">
                  <div className="inline-block bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                    <h3 className="text-xl font-semibold mb-1">
                      {selectedItem.titulo} - {getCurrentLabel()}
                    </h3>
                    <p className="text-gray-300">{selectedItem.descricao}</p>
                    <div className="flex items-center justify-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedItem.localizacao}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatarData(selectedItem.data_trabalho)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicadores */}
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <button
                    onClick={() => setCurrentImageIndex(0)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentImageIndex === 0 ? 'bg-white' : 'bg-gray-500'
                    }`}
                  />
                  <button
                    onClick={() => setCurrentImageIndex(1)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentImageIndex === 1 ? 'bg-white' : 'bg-gray-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

