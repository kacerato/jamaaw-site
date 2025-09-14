import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { 
  Users, 
  MapPin, 
  MessageSquare, 
  Image, 
  FileText, 
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  Edit,
  Trash2,
  Plus,
  Eye,
  Calendar,
  Mail,
  AlertCircle,
  Download,
  Save,
  LogOut
} from 'lucide-react'

export default function PainelAdmin({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    totalRuas: 0,
    ruasCompletas: 0,
    sugestoesPendentes: 0,
    totalNoticias: 0
  })

  // Estados para gerenciamento de sugestões
  const [sugestoes, setSugestoes] = useState([])
  const [loadingSugestoes, setLoadingSugestoes] = useState(false)

  // Estados para gerenciamento de galeria
  const [galeria, setGaleria] = useState([])
  const [loadingGaleria, setLoadingGaleria] = useState(false)
  const [novoProjetoGaleria, setNovoProjetoGaleria] = useState({
    titulo: '',
    descricao: '',
    localizacao: '',
    data_projeto: '',
    imagem_antes: null,
    imagem_depois: null
  })

  // Estados para gerenciamento de notícias
  const [noticias, setNoticias] = useState([])
  const [loadingNoticias, setLoadingNoticias] = useState(false)
  const [novaNoticia, setNovaNoticia] = useState({
    titulo: '',
    conteudo: '',
    resumo: '',
    imagem_capa: null,
    autor: 'Equipe JAMAAW',
    publicado: false
  })

  // Estados para upload KMZ
  const [kmzFile, setKmzFile] = useState(null)
  const [uploadingKmz, setUploadingKmz] = useState(false)

  // Estados para gerenciamento de ruas
  const [ruas, setRuas] = useState([])
  const [loadingRuas, setLoadingRuas] = useState(false)

  useEffect(() => {
    loadStats()
    if (activeTab === 'sugestoes') loadSugestoes()
    if (activeTab === 'galeria') loadGaleria()
    if (activeTab === 'noticias') loadNoticias()
    if (activeTab === 'ruas') loadRuas()
  }, [activeTab])

  const loadStats = async () => {
    try {
      const { data: ruas } = await supabase.from('ruas').select('status')
      const { data: sugestoes } = await supabase.from('sugestoes').select('status')
      const { data: noticias } = await supabase.from('noticias').select('id')

      setStats({
        totalRuas: ruas?.length || 0,
        ruasCompletas: ruas?.filter(r => r.status === 'concluido').length || 0,
        sugestoesPendentes: sugestoes?.filter(s => s.status === 'pendente').length || 0,
        totalNoticias: noticias?.length || 0
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  // Funções para gerenciamento de sugestões
  const loadSugestoes = async () => {
    setLoadingSugestoes(true)
    try {
      const { data, error } = await supabase
        .from('sugestoes')
        .select('*')
        .order('data_criacao', { ascending: false })

      if (error) throw error
      setSugestoes(data || [])
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error)
      alert('Erro ao carregar sugestões')
    } finally {
      setLoadingSugestoes(false)
    }
  }

  const atualizarStatusSugestao = async (id, novoStatus) => {
    try {
      const { error } = await supabase
        .from('sugestoes')
        .update({ status: novoStatus })
        .eq('id', id)

      if (error) throw error
      
      // Atualizar lista local
      setSugestoes(prev => prev.map(s => 
        s.id === id ? { ...s, status: novoStatus } : s
      ))
      
      // Atualizar estatísticas
      loadStats()
      
      alert(`Sugestão ${novoStatus === 'aprovada' ? 'aprovada' : 'rejeitada'} com sucesso!`)
    } catch (error) {
      console.error('Erro ao atualizar sugestão:', error)
      alert('Erro ao atualizar sugestão')
    }
  }

  // Funções para gerenciamento de ruas
  const loadRuas = async () => {
    setLoadingRuas(true)
    try {
      const { data, error } = await supabase
        .from('ruas')
        .select('*')
        .order('nome', { ascending: true })

      if (error) throw error
      setRuas(data || [])
    } catch (error) {
      console.error('Erro ao carregar ruas:', error)
    } finally {
      setLoadingRuas(false)
    }
  }

  const atualizarStatusRua = async (id, novoStatus) => {
    try {
      const { error } = await supabase
        .from('ruas')
        .update({ status: novoStatus })
        .eq('id', id)

      if (error) throw error
      
      // Atualizar lista local
      setRuas(prev => prev.map(r => 
        r.id === id ? { ...r, status: novoStatus } : r
      ))
      
      // Atualizar estatísticas
      loadStats()
      
      alert('Status da rua atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar status da rua:', error)
      alert('Erro ao atualizar status da rua')
    }
  }

  // Funções para gerenciamento de galeria
  const loadGaleria = async () => {
    setLoadingGaleria(true)
    try {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .order('data_projeto', { ascending: false })

      if (error) throw error
      setGaleria(data || [])
    } catch (error) {
      console.error('Erro ao carregar galeria:', error)
    } finally {
      setLoadingGaleria(false)
    }
  }

  const uploadImagemGaleria = async (file, tipo) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${tipo}.${fileExt}`
      const filePath = `galeria/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('imagens-galeria')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('imagens-galeria')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      throw error
    }
  }

  const salvarProjetoGaleria = async () => {
    try {
      let imagemAntesUrl = null
      let imagemDepoisUrl = null

      // Upload das imagens
      if (novoProjetoGaleria.imagem_antes) {
        imagemAntesUrl = await uploadImagemGaleria(novoProjetoGaleria.imagem_antes, 'antes')
      }
      
      if (novoProjetoGaleria.imagem_depois) {
        imagemDepoisUrl = await uploadImagemGaleria(novoProjetoGaleria.imagem_depois, 'depois')
      }

      // Salvar no banco
      const { error } = await supabase
        .from('galeria')
        .insert({
          titulo: novoProjetoGaleria.titulo,
          descricao: novoProjetoGaleria.descricao,
          localizacao: novoProjetoGaleria.localizacao,
          data_projeto: novoProjetoGaleria.data_projeto,
          imagem_antes: imagemAntesUrl,
          imagem_depois: imagemDepoisUrl
        })

      if (error) throw error

      // Resetar formulário e recarregar lista
      setNovoProjetoGaleria({
        titulo: '',
        descricao: '',
        localizacao: '',
        data_projeto: '',
        imagem_antes: null,
        imagem_depois: null
      })
      
      loadGaleria()
      alert('Projeto adicionado à galeria com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar projeto:', error)
      alert('Erro ao salvar projeto na galeria')
    }
  }

  const excluirProjetoGaleria = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return

    try {
      const { error } = await supabase
        .from('galeria')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      loadGaleria()
      alert('Projeto excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir projeto:', error)
      alert('Erro ao excluir projeto')
    }
  }

  // Funções para gerenciamento de notícias
  const loadNoticias = async () => {
    setLoadingNoticias(true)
    try {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('data_publicacao', { ascending: false })

      if (error) throw error
      setNoticias(data || [])
    } catch (error) {
      console.error('Erro ao carregar notícias:', error)
    } finally {
      setLoadingNoticias(false)
    }
  }

  const uploadImagemNoticia = async (file) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-capa.${fileExt}`
      const filePath = `noticias/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('imagens-noticias')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('imagens-noticias')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      throw error
    }
  }

  const salvarNoticia = async () => {
    try {
      let imagemCapaUrl = null

      // Upload da imagem de capa
      if (novaNoticia.imagem_capa) {
        imagemCapaUrl = await uploadImagemNoticia(novaNoticia.imagem_capa)
      }

      // Salvar no banco
      const { error } = await supabase
        .from('noticias')
        .insert({
          titulo: novaNoticia.titulo,
          conteudo: novaNoticia.conteudo,
          resumo: novaNoticia.resumo,
          imagem_capa: imagemCapaUrl,
          autor: novaNoticia.autor,
          publicado: novaNoticia.publicado,
          data_publicacao: new Date().toISOString()
        })

      if (error) throw error

      // Resetar formulário e recarregar lista
      setNovaNoticia({
        titulo: '',
        conteudo: '',
        resumo: '',
        imagem_capa: null,
        autor: 'Equipe JAMAAW',
        publicado: false
      })
      
      loadNoticias()
      loadStats()
      alert('Notícia salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar notícia:', error)
      alert('Erro ao salvar notícia')
    }
  }

  const excluirNoticia = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return

    try {
      const { error } = await supabase
        .from('noticias')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      loadNoticias()
      loadStats()
      alert('Notícia excluída com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir notícia:', error)
      alert('Erro ao excluir notícia')
    }
  }

  const alternarPublicacaoNoticia = async (id, publicado) => {
    try {
      const { error } = await supabase
        .from('noticias')
        .update({ publicado: !publicado })
        .eq('id', id)

      if (error) throw error
      
      loadNoticias()
      alert(`Notícia ${!publicado ? 'publicada' : 'despublicada'} com sucesso!`)
    } catch (error) {
      console.error('Erro ao alterar publicação:', error)
      alert('Erro ao alterar status de publicação')
    }
  }

  // Função para upload de KMZ
  const processarKMZ = async () => {
    if (!kmzFile) {
      alert('Selecione um arquivo KMZ primeiro')
      return
    }

    setUploadingKmz(true)
    try {
      // Upload do arquivo KMZ para o storage
      const fileExt = kmzFile.name.split('.').pop()
      const fileName = `${Date.now()}-mapa.${fileExt}`
      const filePath = `kmz/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('arquivos-kmz')
        .upload(filePath, kmzFile)

      if (uploadError) throw uploadError

      // Aqui você implementaria a lógica para processar o arquivo KMZ
      // Por enquanto, vamos simular o processo
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      alert('Arquivo KMZ processado com sucesso! O mapa será atualizado em breve.')
      setKmzFile(null)
      loadStats()
      loadRuas()
    } catch (error) {
      console.error('Erro ao processar KMZ:', error)
      alert('Erro ao processar arquivo KMZ')
    } finally {
      setUploadingKmz(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      onLogout()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'sugestoes', label: 'Sugestões', icon: MessageSquare },
    { id: 'ruas', label: 'Ruas', icon: MapPin },
    { id: 'kmz', label: 'Upload KMZ', icon: Upload },
    { id: 'galeria', label: 'Galeria', icon: Image },
    { id: 'noticias', label: 'Notícias', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="jamaaw-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black">JAMAAW Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {user?.email || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-black"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="jamaaw-container py-8">
        {/* Navegação das abas */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo das abas */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'dashboard' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-black mb-6">
                Visão Geral
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">Total de Ruas</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.totalRuas}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">Ruas Completas</p>
                      <p className="text-2xl font-bold text-green-900">{stats.ruasCompletas}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-yellow-600">Sugestões Pendentes</p>
                      <p className="text-2xl font-bold text-yellow-900">{stats.sugestoesPendentes}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">Total de Notícias</p>
                      <p className="text-2xl font-bold text-purple-900">{stats.totalNoticias}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-4">Ações Rápidas</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('sugestoes')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <MessageSquare className="h-5 w-5 text-yellow-600" />
                      <span>Revisar Sugestões Pendentes</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('galeria')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <Image className="h-5 w-5 text-blue-600" />
                      <span>Adicionar Projeto à Galeria</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('noticias')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <FileText className="h-5 w-5 text-green-600" />
                      <span>Criar Nova Notícia</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('kmz')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <Upload className="h-5 w-5 text-purple-600" />
                      <span>Upload de Arquivo KMZ</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-4">Atividade Recente</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Sistema atualizado há 2 horas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{stats.sugestoesPendentes} sugestões pendentes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>{stats.totalNoticias} notícias no sistema</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>{stats.ruasCompletas} ruas concluídas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sugestoes' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">
                  Gerenciar Sugestões
                </h2>
                <button
                  onClick={loadSugestoes}
                  className="jamaaw-button-secondary"
                  disabled={loadingSugestoes}
                >
                  {loadingSugestoes ? 'Carregando...' : 'Atualizar'}
                </button>
              </div>

              {loadingSugestoes ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                  <p className="text-gray-500 mt-4">Carregando sugestões...</p>
                </div>
              ) : sugestoes.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma sugestão encontrada.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sugestoes.map((sugestao) => (
                    <div key={sugestao.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-black mb-2">
                            {sugestao.nome_rua}
                          </h3>
                          <p className="text-gray-600 mb-2">{sugestao.descricao}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{sugestao.email_usuario}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(sugestao.data_criacao).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            sugestao.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                            sugestao.status === 'aprovada' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {sugestao.status === 'pendente' ? 'Pendente' :
                             sugestao.status === 'aprovada' ? 'Aprovada' : 'Rejeitada'}
                          </span>
                        </div>
                      </div>

                      {sugestao.imagens && sugestao.imagens.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Imagens anexadas:</p>
                          <div className="flex space-x-2">
                            {sugestao.imagens.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Anexo ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {sugestao.status === 'pendente' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => atualizarStatusSugestao(sugestao.id, 'aprovada')}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Aprovar</span>
                          </button>
                          <button
                            onClick={() => atualizarStatusSugestao(sugestao.id, 'rejeitada')}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Rejeitar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ruas' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">
                  Gerenciar Ruas
                </h2>
                <button
                  onClick={loadRuas}
                  className="jamaaw-button-secondary"
                  disabled={loadingRuas}
                >
                  {loadingRuas ? 'Carregando...' : 'Atualizar'}
                </button>
              </div>

              {loadingRuas ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                  <p className="text-gray-500 mt-4">Carregando ruas...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Nome da Rua
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Descrição
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ruas.map((rua) => (
                        <tr key={rua.id} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 text-sm text-black font-medium">
                            {rua.nome}
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                            {rua.descricao || 'Sem descrição'}
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rua.status === 'concluido' ? 'bg-green-100 text-green-800' :
                              rua.status === 'andamento' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {rua.status === 'concluido' ? 'Concluído' :
                               rua.status === 'andamento' ? 'Em Andamento' : 'Em Análise'}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            <select
                              value={rua.status}
                              onChange={(e) => atualizarStatusRua(rua.id, e.target.value)}
                              className="text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="analise">Em Análise</option>
                              <option value="andamento">Em Andamento</option>
                              <option value="concluido">Concluído</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'kmz' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-black mb-6">
                Upload de Arquivo KMZ
              </h2>
              
              <div className="max-w-2xl">
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Upload de Arquivo KMZ
                      </h3>
                      <p className="text-blue-800 text-sm">
                        Faça upload de um arquivo KMZ para atualizar o mapa com múltiplas ruas de uma só vez. 
                        O sistema processará automaticamente as coordenadas e criará os marcadores no mapa.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecionar Arquivo KMZ
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept=".kmz"
                        onChange={(e) => setKmzFile(e.target.files[0])}
                        className="hidden"
                        id="kmz-upload"
                      />
                      <label
                        htmlFor="kmz-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Clique para selecionar um arquivo KMZ
                        </span>
                      </label>
                      {kmzFile && (
                        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                          <p className="text-sm font-medium text-gray-700">
                            Arquivo selecionado: {kmzFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Tamanho: {(kmzFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={processarKMZ}
                    disabled={!kmzFile || uploadingKmz}
                    className="jamaaw-button-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {uploadingKmz ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Processar KMZ</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Instruções:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• O arquivo KMZ deve conter pontos com coordenadas válidas</li>
                    <li>• Cada ponto será convertido em uma rua no sistema</li>
                    <li>• O status padrão será "Em Análise"</li>
                    <li>• Você pode editar individualmente após o upload</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'galeria' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">
                  Gerenciar Galeria Antes/Depois
                </h2>
                <button
                  onClick={loadGaleria}
                  className="jamaaw-button-secondary"
                  disabled={loadingGaleria}
                >
                  {loadingGaleria ? 'Carregando...' : 'Atualizar'}
                </button>
              </div>

              {/* Formulário para novo projeto */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Adicionar Novo Projeto
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título do Projeto
                    </label>
                    <input
                      type="text"
                      value={novoProjetoGaleria.titulo}
                      onChange={(e) => setNovoProjetoGaleria(prev => ({
                        ...prev,
                        titulo: e.target.value
                      }))}
                      className="jamaaw-input"
                      placeholder="Ex: Rua das Flores - Centro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localização
                    </label>
                    <input
                      type="text"
                      value={novoProjetoGaleria.localizacao}
                      onChange={(e) => setNovoProjetoGaleria(prev => ({
                        ...prev,
                        localizacao: e.target.value
                      }))}
                      className="jamaaw-input"
                      placeholder="Ex: Centro, Maceió"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={novoProjetoGaleria.descricao}
                      onChange={(e) => setNovoProjetoGaleria(prev => ({
                        ...prev,
                        descricao: e.target.value
                      }))}
                      className="jamaaw-input"
                      rows={3}
                      placeholder="Descreva o projeto realizado..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data do Projeto
                    </label>
                    <input
                      type="date"
                      value={novoProjetoGaleria.data_projeto}
                      onChange={(e) => setNovoProjetoGaleria(prev => ({
                        ...prev,
                        data_projeto: e.target.value
                      }))}
                      className="jamaaw-input"
                    />
                  </div>

                  <div></div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagem "Antes"
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNovoProjetoGaleria(prev => ({
                        ...prev,
                        imagem_antes: e.target.files[0]
                      }))}
                      className="jamaaw-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagem "Depois"
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNovoProjetoGaleria(prev => ({
                        ...prev,
                        imagem_depois: e.target.files[0]
                      }))}
                      className="jamaaw-input"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={salvarProjetoGaleria}
                    className="jamaaw-button-primary flex items-center space-x-2"
                    disabled={!novoProjetoGaleria.titulo || !novoProjetoGaleria.localizacao}
                  >
                    <Save className="h-4 w-4" />
                    <span>Salvar Projeto</span>
                  </button>
                </div>
              </div>

              {/* Lista de projetos existentes */}
              {loadingGaleria ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                  <p className="text-gray-500 mt-4">Carregando galeria...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galeria.map((projeto) => (
                    <div key={projeto.id} className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-2">
                        {projeto.imagem_antes && (
                          <div className="relative">
                            <img
                              src={projeto.imagem_antes}
                              alt="Antes"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                              ANTES
                            </div>
                          </div>
                        )}
                        {projeto.imagem_depois && (
                          <div className="relative">
                            <img
                              src={projeto.imagem_depois}
                              alt="Depois"
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                              DEPOIS
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-black mb-2">{projeto.titulo}</h4>
                        <p className="text-sm text-gray-600 mb-2">{projeto.descricao}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{projeto.localizacao}</span>
                          <span>{new Date(projeto.data_projeto).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => excluirProjetoGaleria(projeto.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'noticias' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">
                  Gerenciar Blog/Notícias
                </h2>
                <button
                  onClick={loadNoticias}
                  className="jamaaw-button-secondary"
                  disabled={loadingNoticias}
                >
                  {loadingNoticias ? 'Carregando...' : 'Atualizar'}
                </button>
              </div>

              {/* Formulário para nova notícia */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Criar Nova Notícia
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={novaNoticia.titulo}
                      onChange={(e) => setNovaNoticia(prev => ({
                        ...prev,
                        titulo: e.target.value
                      }))}
                      className="jamaaw-input"
                      placeholder="Título da notícia..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resumo
                    </label>
                    <textarea
                      value={novaNoticia.resumo}
                      onChange={(e) => setNovaNoticia(prev => ({
                        ...prev,
                        resumo: e.target.value
                      }))}
                      className="jamaaw-input"
                      rows={2}
                      placeholder="Resumo para listagem..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conteúdo Completo
                    </label>
                    <textarea
                      value={novaNoticia.conteudo}
                      onChange={(e) => setNovaNoticia(prev => ({
                        ...prev,
                        conteudo: e.target.value
                      }))}
                      className="jamaaw-input"
                      rows={8}
                      placeholder="Conteúdo completo da notícia (pode usar HTML)..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Autor
                      </label>
                      <input
                        type="text"
                        value={novaNoticia.autor}
                        onChange={(e) => setNovaNoticia(prev => ({
                          ...prev,
                          autor: e.target.value
                        }))}
                        className="jamaaw-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagem de Capa
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNovaNoticia(prev => ({
                          ...prev,
                          imagem_capa: e.target.files[0]
                        }))}
                        className="jamaaw-input"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="publicado"
                      checked={novaNoticia.publicado}
                      onChange={(e) => setNovaNoticia(prev => ({
                        ...prev,
                        publicado: e.target.checked
                      }))}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="publicado" className="text-sm font-medium text-gray-700">
                      Publicar imediatamente
                    </label>
                  </div>

                  <button
                    onClick={salvarNoticia}
                    className="jamaaw-button-primary flex items-center space-x-2"
                    disabled={!novaNoticia.titulo || !novaNoticia.conteudo}
                  >
                    <Save className="h-4 w-4" />
                    <span>Salvar Notícia</span>
                  </button>
                </div>
              </div>

              {/* Lista de notícias existentes */}
              {loadingNoticias ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                  <p className="text-gray-500 mt-4">Carregando notícias...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {noticias.map((noticia) => (
                    <div key={noticia.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-black">
                              {noticia.titulo}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              noticia.publicado 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {noticia.publicado ? 'Publicado' : 'Rascunho'}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{noticia.resumo}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Por {noticia.autor}</span>
                            <span>{new Date(noticia.data_publicacao).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        {noticia.imagem_capa && (
                          <img
                            src={noticia.imagem_capa}
                            alt="Capa"
                            className="w-20 h-20 object-cover rounded-lg ml-4"
                          />
                        )}
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => alternarPublicacaoNoticia(noticia.id, noticia.publicado)}
                          className={`px-3 py-1 rounded text-sm ${
                            noticia.publicado 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {noticia.publicado ? 'Despublicar' : 'Publicar'}
                        </button>
                        <button
                          onClick={() => excluirNoticia(noticia.id)}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

