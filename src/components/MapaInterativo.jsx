import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { ruasService } from '../lib/database.js'

// Configurar ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Ícones personalizados por status
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })
}

const icons = {
  concluido: createCustomIcon('#22c55e'), // Verde
  andamento: createCustomIcon('#eab308'), // Amarelo
  analise: createCustomIcon('#ef4444')    // Vermelho
}

// Dados de exemplo para demonstração
const ruasExemplo = [
  {
    id: 1,
    nome: 'Rua do Comércio',
    descricao: 'Remoção de cabos antigos de telefonia',
    status: 'concluido',
    latitude: -9.6658,
    longitude: -35.7353,
    fotos: []
  },
  {
    id: 2,
    nome: 'Avenida Fernandes Lima',
    descricao: 'Cabos de TV a cabo inativos',
    status: 'andamento',
    latitude: -9.6505,
    longitude: -35.7089,
    fotos: []
  },
  {
    id: 3,
    nome: 'Rua Jangadeiros Alagoanos',
    descricao: 'Múltiplos cabos abandonados',
    status: 'analise',
    latitude: -9.6648,
    longitude: -35.7108,
    fotos: []
  },
  {
    id: 4,
    nome: 'Avenida Álvaro Otacílio',
    descricao: 'Cabos de internet desativados',
    status: 'concluido',
    latitude: -9.6789,
    longitude: -35.7234,
    fotos: []
  },
  {
    id: 5,
    nome: 'Rua Barão de Atalaia',
    descricao: 'Cabos elétricos antigos',
    status: 'andamento',
    latitude: -9.6712,
    longitude: -35.7456,
    fotos: []
  }
]

function MapaStats({ ruas }) {
  const stats = {
    concluido: ruas.filter(r => r.status === 'concluido').length,
    andamento: ruas.filter(r => r.status === 'andamento').length,
    analise: ruas.filter(r => r.status === 'analise').length,
    total: ruas.length
  }

  return (
    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-2xl font-bold text-green-600">{stats.concluido}</div>
        <div className="text-sm text-green-700">Concluídas</div>
      </div>
      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="text-2xl font-bold text-yellow-600">{stats.andamento}</div>
        <div className="text-sm text-yellow-700">Em Andamento</div>
      </div>
      <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-2xl font-bold text-red-600">{stats.analise}</div>
        <div className="text-sm text-red-700">Em Análise</div>
      </div>
      <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-2xl font-bold text-gray-600">{stats.total}</div>
        <div className="text-sm text-gray-700">Total</div>
      </div>
    </div>
  )
}

function MapaLegenda() {
  return (
    <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
      <h4 className="font-semibold text-black mb-3">Legenda</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
          <span className="text-sm text-gray-700">Concluído</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow"></div>
          <span className="text-sm text-gray-700">Em Andamento</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"></div>
          <span className="text-sm text-gray-700">Em Análise</span>
        </div>
      </div>
    </div>
  )
}

export default function MapaInterativo() {
  const [ruas, setRuas] = useState(ruasExemplo) // Usando dados de exemplo
  const [loading, setLoading] = useState(false)

  // Função para carregar ruas do banco (comentada para usar dados de exemplo)
  /*
  useEffect(() => {
    async function carregarRuas() {
      try {
        setLoading(true)
        const data = await ruasService.getAll()
        setRuas(data)
      } catch (error) {
        console.error('Erro ao carregar ruas:', error)
        // Usar dados de exemplo em caso de erro
        setRuas(ruasExemplo)
      } finally {
        setLoading(false)
      }
    }

    carregarRuas()
  }, [])
  */

  const getStatusText = (status) => {
    const statusMap = {
      concluido: 'Concluído',
      andamento: 'Em Andamento',
      analise: 'Em Análise'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status) => {
    const colorMap = {
      concluido: 'text-green-600',
      andamento: 'text-yellow-600',
      analise: 'text-red-600'
    }
    return colorMap[status] || 'text-gray-600'
  }

  return (
    <section id="mapa" className="jamaaw-section bg-gray-50">
      <div className="jamaaw-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Mapa Interativo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe o progresso da remoção de cabos inativos em Maceió. 
            Clique nos marcadores para ver detalhes de cada rua.
          </p>
        </div>

        <MapaStats ruas={ruas} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mapa */}
          <div className="lg:col-span-3">
            <div className="jamaaw-card p-0 overflow-hidden">
              {loading ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-gray-500">Carregando mapa...</div>
                </div>
              ) : (
                <MapContainer
                  center={[-9.6658, -35.7353]} // Centro de Maceió
                  zoom={13}
                  style={{ height: '500px', width: '100%' }}
                  className="rounded-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {ruas.map((rua) => (
                    <Marker
                      key={rua.id}
                      position={[rua.latitude, rua.longitude]}
                      icon={icons[rua.status]}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h3 className="font-semibold text-black mb-2">
                            {rua.nome}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {rua.descricao}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${getStatusColor(rua.status)}`}>
                              {getStatusText(rua.status)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {rua.latitude.toFixed(4)}, {rua.longitude.toFixed(4)}
                            </span>
                          </div>
                          {rua.fotos && rua.fotos.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">
                                {rua.fotos.length} foto(s) disponível(is)
                              </span>
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          {/* Sidebar com legenda e informações */}
          <div className="lg:col-span-1">
            <MapaLegenda />
            
            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-black mb-3">Informações</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  O mapa é atualizado em tempo real conforme o progresso dos trabalhos.
                </p>
                <p>
                  Clique nos marcadores para ver detalhes específicos de cada localização.
                </p>
                <p>
                  Tem uma sugestão de rua? Use o formulário abaixo para nos informar.
                </p>
              </div>
              
              <a
                href="#sugestoes"
                className="jamaaw-button-primary w-full mt-4 text-center"
              >
                Sugerir Nova Rua
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

