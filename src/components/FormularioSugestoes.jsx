import { useState } from 'react'
import { Upload, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { sugestoesService, storageService } from '../lib/database.js'

export default function FormularioSugestoes() {
  const [formData, setFormData] = useState({
    nome_rua: '',
    descricao: '',
    email: ''
  })
  const [imagens, setImagens] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 5) {
      setStatus({
        type: 'error',
        message: 'Máximo de 5 imagens permitidas'
      })
      return
    }
    setImagens(files)
  }

  const uploadImages = async (files) => {
    const uploadedUrls = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileName = `sugestoes/${Date.now()}-${i}-${file.name}`
      
      try {
        const result = await storageService.uploadImage(file, fileName)
        uploadedUrls.push(result.publicUrl)
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error)
        throw new Error(`Erro ao fazer upload da imagem ${file.name}`)
      }
    }
    
    return uploadedUrls
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nome_rua || !formData.email) {
      setStatus({
        type: 'error',
        message: 'Nome da rua e email são obrigatórios'
      })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      let imagensUrls = []
      
      if (imagens.length > 0) {
        imagensUrls = await uploadImages(imagens)
      }

      const sugestao = {
        nome_rua: formData.nome_rua,
        descricao: formData.descricao,
        email: formData.email,
        imagens: imagensUrls
      }

      await sugestoesService.create(sugestao)

      setStatus({
        type: 'success',
        message: 'Sugestão enviada com sucesso! Obrigado pela contribuição.'
      })

      // Limpar formulário
      setFormData({
        nome_rua: '',
        descricao: '',
        email: ''
      })
      setImagens([])
      
      // Limpar input de arquivo
      const fileInput = document.getElementById('imagens')
      if (fileInput) fileInput.value = ''

    } catch (error) {
      console.error('Erro ao enviar sugestão:', error)
      setStatus({
        type: 'error',
        message: 'Erro ao enviar sugestão. Tente novamente.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="sugestoes" className="jamaaw-section bg-white">
      <div className="jamaaw-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Sugerir Nova Rua
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conhece uma rua com cabos inativos que precisa de atenção? 
              Envie sua sugestão e ajude a transformar Maceió.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div className="jamaaw-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome_rua" className="block text-sm font-medium text-black mb-2">
                    Nome da Rua *
                  </label>
                  <input
                    type="text"
                    id="nome_rua"
                    name="nome_rua"
                    value={formData.nome_rua}
                    onChange={handleInputChange}
                    className="jamaaw-input"
                    placeholder="Ex: Rua das Flores, Avenida Fernandes Lima..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-black mb-2">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    className="jamaaw-textarea"
                    placeholder="Descreva a situação dos cabos, localização específica, etc."
                    rows={4}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Seu Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="jamaaw-input"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="imagens" className="block text-sm font-medium text-black mb-2">
                    Imagens (Opcional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="imagens"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="imagens"
                      className="jamaaw-input cursor-pointer flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">
                        {imagens.length > 0 
                          ? `${imagens.length} imagem(ns) selecionada(s)` 
                          : 'Clique para selecionar imagens (máx. 5)'
                        }
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceitos: JPG, PNG, GIF. Máximo 5 imagens.
                  </p>
                </div>

                {/* Status Messages */}
                {status && (
                  <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                    status.type === 'success' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {status.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                    <p className={status.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                      {status.message}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="jamaaw-button-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Enviar Sugestão</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Informações */}
            <div className="space-y-6">
              <div className="jamaaw-card p-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Como Funciona
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Envie sua sugestão</h4>
                      <p className="text-sm text-gray-600">
                        Preencha o formulário com informações da rua e fotos se possível.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Análise técnica</h4>
                      <p className="text-sm text-gray-600">
                        Nossa equipe avalia a sugestão e planeja a intervenção.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Execução</h4>
                      <p className="text-sm text-gray-600">
                        Realizamos a remoção dos cabos e atualizamos o mapa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="jamaaw-card p-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Dicas para uma boa sugestão
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Seja específico sobre a localização</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Inclua fotos se possível</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Descreva o tipo de cabo (telefone, TV, internet)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Mencione pontos de referência próximos</span>
                  </li>
                </ul>
              </div>

              <div className="jamaaw-card p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-black mb-2">
                  Contato Direto
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Prefere falar conosco diretamente?
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-black font-medium">(82) 9999-9999</p>
                  <p className="text-black font-medium">contato@jamaaw.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

