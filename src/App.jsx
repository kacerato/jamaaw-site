import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MapaInterativo from './components/MapaInterativo.jsx'
import TestConnection from './components/TestConnection.jsx'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <MapaInterativo />
        
        {/* Seção de teste da conexão - remover em produção */}
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
      </main>
      
      {/* Footer temporário */}
      <footer className="bg-black text-white py-12">
        <div className="jamaaw-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">JAMAAW</h3>
              <p className="text-gray-300">
                Transformando Maceió através da remoção profissional 
                de cabos inativos.
              </p>
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
              <h4 className="font-semibold mb-4">Links</h4>
              <div className="space-y-2">
                <a href="#mapa" className="block text-gray-300 hover:text-white">
                  Mapa Interativo
                </a>
                <a href="#sugestoes" className="block text-gray-300 hover:text-white">
                  Sugestões
                </a>
                <a href="#galeria" className="block text-gray-300 hover:text-white">
                  Galeria
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Jamaaw. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
