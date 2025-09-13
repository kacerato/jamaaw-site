import { useState } from 'react'
import { useAuth } from './hooks/useAuth.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MapaInterativo from './components/MapaInterativo.jsx'
import FormularioSugestoes from './components/FormularioSugestoes.jsx'
import BlogNoticias from './components/BlogNoticias.jsx'
import GaleriaAntesDepois from './components/GaleriaAntesDepois.jsx'
import Login from './components/Login.jsx'
import PainelAdmin from './components/PainelAdmin.jsx'
import TestConnection from './components/TestConnection.jsx'
import { Settings } from 'lucide-react'
import './App.css'

function App() {
  const { user, loading } = useAuth()
  const [showAdmin, setShowAdmin] = useState(false)
  const [showTestConnection, setShowTestConnection] = useState(false)

  // Se está carregando a autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Se está tentando acessar admin mas não está logado
  if (showAdmin && !user) {
    return <Login onLogin={() => setShowAdmin(true)} />
  }

  // Se está logado e quer ver o painel admin
  if (showAdmin && user) {
    return <PainelAdmin user={user} onLogout={() => setShowAdmin(false)} />
  }

  // Site público
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Botão Admin (fixo no canto) */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-40"
        title="Área Administrativa"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Botão Test Connection (desenvolvimento) */}
      <button
        onClick={() => setShowTestConnection(!showTestConnection)}
        className="fixed bottom-4 left-4 bg-gray-600 text-white px-3 py-2 rounded text-xs hover:bg-gray-700 transition-colors z-40"
        title="Testar Conexão Supabase"
      >
        DB Test
      </button>

      <main>
        <Hero />
        <MapaInterativo />
        <FormularioSugestoes />
        <GaleriaAntesDepois />
        <BlogNoticias />
        
        {/* Seção de teste da conexão - apenas para desenvolvimento */}
        {showTestConnection && (
          <section className="jamaaw-section bg-gray-50">
            <div className="jamaaw-container">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-black mb-6 text-center">
                  Status do Sistema
                </h2>
                <TestConnection />
              </div>
            </div>
          </section>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="jamaaw-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">JAMAAW</h3>
              <p className="text-gray-300 mb-4 max-w-md">
                Transformando Maceió através da remoção profissional 
                de cabos inativos. Contribuindo para uma cidade mais 
                limpa, organizada e segura.
              </p>
              <div className="flex space-x-4">
                <a href="#mapa" className="text-gray-300 hover:text-white transition-colors">
                  Mapa Interativo
                </a>
                <a href="#sugestoes" className="text-gray-300 hover:text-white transition-colors">
                  Sugestões
                </a>
                <a href="#galeria" className="text-gray-300 hover:text-white transition-colors">
                  Galeria
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-300">
                <p>Maceió, Alagoas</p>
                <p>(82) 9999-9999</p>
                <p>contato@jamaaw.com</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <div className="space-y-2 text-gray-300">
                <p>Remoção de cabos inativos</p>
                <p>Análise técnica</p>
                <p>Consultoria urbana</p>
                <p>Manutenção preventiva</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Jamaaw. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Termos de Uso
                </a>
                <button
                  onClick={() => setShowAdmin(true)}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Área Administrativa
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
