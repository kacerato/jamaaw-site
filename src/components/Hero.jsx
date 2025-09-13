import { ArrowRight, CheckCircle, MapPin, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="jamaaw-section bg-white">
      <div className="jamaaw-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="jamaaw-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              Transformando
              <span className="block text-gray-600">Maceió</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A Jamaaw é especializada na remoção de cabos inativos em Maceió, 
              contribuindo para uma cidade mais limpa, organizada e segura. 
              Acompanhe nosso progresso em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#mapa"
                className="jamaaw-button-primary inline-flex items-center justify-center"
              >
                Ver Mapa Interativo
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#sugestoes"
                className="jamaaw-button-secondary inline-flex items-center justify-center"
              >
                Sugerir Rua
                <MapPin className="ml-2 h-5 w-5" />
              </a>
            </div>

            {/* Características */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Remoção profissional e segura</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Acompanhamento em tempo real</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Participação da comunidade</span>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="jamaaw-fade-in">
            <div className="grid grid-cols-2 gap-6">
              <div className="jamaaw-stat-card">
                <div className="jamaaw-stat-number text-green-600">
                  45
                </div>
                <div className="jamaaw-stat-label">
                  Ruas Concluídas
                </div>
              </div>
              
              <div className="jamaaw-stat-card">
                <div className="jamaaw-stat-number text-yellow-600">
                  12
                </div>
                <div className="jamaaw-stat-label">
                  Em Andamento
                </div>
              </div>
              
              <div className="jamaaw-stat-card">
                <div className="jamaaw-stat-number text-red-600">
                  8
                </div>
                <div className="jamaaw-stat-label">
                  Em Análise
                </div>
              </div>
              
              <div className="jamaaw-stat-card">
                <div className="jamaaw-stat-number text-blue-600">
                  156
                </div>
                <div className="jamaaw-stat-label">
                  Sugestões Recebidas
                </div>
              </div>
            </div>

            {/* Mapa Preview */}
            <div className="mt-8 jamaaw-card p-6">
              <h3 className="text-lg font-semibold text-black mb-4">
                Progresso por Região
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Centro</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pajuçara</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ponta Verde</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Jatiúca</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
              </div>
              
              <a
                href="#mapa"
                className="inline-flex items-center text-sm text-black hover:text-gray-600 mt-4 font-medium"
              >
                Ver mapa completo
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

