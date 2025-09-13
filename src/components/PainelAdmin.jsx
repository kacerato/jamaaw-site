import { useState, useEffect } from 'react'
import { 
  Users, 
  MapPin, 
  FileText, 
  Image, 
  Settings, 
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Eye,
  Trash2,
  Plus
} from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { sugestoesService, ruasService, blogService, galeriaService } from '../lib/database.js'

export default function PainelAdmin({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sugestoes, setSugestoes] = useState([])
  const [ruas, setRuas] = useState([])
  const [posts, setPosts] = useState([])
  const [galeria, setGaleria] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    try {
      const [sugestoesData, ruasData, postsData, galeriaData] = await Promise.all([
        sugestoesService.getAll(),
        ruasService.getAll(),
        blogService.getAll(),
        galeriaService.getAll()
      ])
      
      setSugestoes(sugestoesData)
      setRuas(ruasData)
      setPosts(postsData)
      setGaleria(galeriaData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const aprovarSugestao = async (id) => {
    try {
      await sugestoesService.approve(id)
      await carregarDados()
    } catch (error) {
      console.error('Erro ao aprovar sugestão:', error)
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

  const getStatusColor = (status) => {
    const colors = {
      concluido: 'text-green-600 bg-green-50',
      andamento: 'text-yellow-600 bg-yellow-50',
      analise: 'text-red-600 bg-red-50'
    }
    return colors[status] || 'text-gray-600 bg-gray-50'
  }

  const getStatusText = (status) => {
    const texts = {
      concluido: 'Concluído',
      andamento: 'Em Andamento',
      analise: 'Em Análise'
    }
    return texts[status] || status
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Settings },
    { id: 'sugestoes', label: 'Sugestões', icon: Users },
    { id: 'ruas', label: 'Ruas', icon: MapPin },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'galeria', label: 'Galeria', icon: Image }
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="jamaaw-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sugestões Pendentes</p>
              <p className="text-2xl font-bold text-black">
                {sugestoes.filter(s => !s.aprovada).length}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="jamaaw-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Ruas</p>
              <p className="text-2xl font-bold text-black">{ruas.length}</p>
            </div>
            <MapPin className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="jamaaw-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Posts do Blog</p>
              <p className="text-2xl font-bold text-black">{posts.length}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="jamaaw-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Itens na Galeria</p>
              <p className="text-2xl font-bold text-black">{galeria.length}</p>
            </div>
            <Image className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="jamaaw-card p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Ruas por Status</h3>
          <div className="space-y-3">
            {['concluido', 'andamento', 'analise'].map(status => {
              const count = ruas.filter(r => r.status === status).length
              const percentage = ruas.length > 0 ? (count / ruas.length) * 100 : 0
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {getStatusText(status)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          status === 'concluido' ? 'bg-green-500' :
                          status === 'andamento' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${percentage}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="jamaaw-card p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Sugestões Recentes</h3>
          <div className="space-y-3">
            {sugestoes.slice(0, 5).map(sugestao => (
              <div key={sugestao.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-black">{sugestao.nome_rua}</p>
                  <p className="text-sm text-gray-600">{sugestao.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {sugestao.aprovada ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSugestoes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Sugestões</h2>
        <button
          onClick={carregarDados}
          className="jamaaw-button-secondary"
        >
          Atualizar
        </button>
      </div>

      <div className="jamaaw-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rua
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sugestoes.map(sugestao => (
                <tr key={sugestao.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-black">
                        {sugestao.nome_rua}
                      </div>
                      {sugestao.descricao && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {sugestao.descricao}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sugestao.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(sugestao.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sugestao.aprovada 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sugestao.aprovada ? 'Aprovada' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {!sugestao.aprovada && (
                        <button
                          onClick={() => aprovarSugestao(sugestao.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      )
    }

    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      case 'sugestoes':
        return renderSugestoes()
      case 'ruas':
        return <div className="text-center py-12 text-gray-500">Gerenciamento de ruas em desenvolvimento</div>
      case 'blog':
        return <div className="text-center py-12 text-gray-500">Sistema de blog em desenvolvimento</div>
      case 'galeria':
        return <div className="text-center py-12 text-gray-500">Galeria em desenvolvimento</div>
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-black">JAMAAW Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {user.email}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 space-y-1 mr-8">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

