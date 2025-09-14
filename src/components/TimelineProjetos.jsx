import { Calendar, MapPin, Users, Award, Zap, Building, CheckCircle } from 'lucide-react'

export default function TimelineProjetos() {
  const timeline = [
    {
      ano: '2025',
      mes: 'Janeiro',
      titulo: 'Expansão para Região Metropolitana',
      descricao: 'Início das operações em Rio Largo e Satuba, expandindo nosso alcance para atender toda a região metropolitana de Maceió.',
      status: 'planejado',
      icon: Building,
      stats: { ruas: '50+', cabos: '8km' },
      imagem: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop'
    },
    {
      ano: '2024',
      mes: 'Dezembro',
      titulo: 'Marco de 500 Ruas Transformadas',
      descricao: 'Alcançamos a marca histórica de 500 ruas completamente limpas e organizadas, beneficiando mais de 50.000 moradores de Maceió.',
      status: 'concluido',
      icon: Award,
      stats: { ruas: '500', cabos: '75km' },
      imagem: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop'
    },
    {
      ano: '2024',
      mes: 'Outubro',
      titulo: 'Projeto Pajuçara Sustentável',
      descricao: 'Revitalização completa do bairro de Pajuçara, removendo mais de 12km de cabos inativos e melhorando significativamente a paisagem urbana.',
      status: 'concluido',
      icon: Zap,
      stats: { ruas: '85', cabos: '12km' },
      imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop'
    },
    {
      ano: '2024',
      mes: 'Julho',
      titulo: 'Parceria com Universidades',
      descricao: 'Estabelecimento de parcerias com UFAL e CESMAC para pesquisa e desenvolvimento de novas tecnologias em infraestrutura urbana.',
      status: 'concluido',
      icon: Users,
      stats: { projetos: '3', pesquisadores: '15' },
      imagem: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'
    },
    {
      ano: '2024',
      mes: 'Abril',
      titulo: 'Certificação ISO 9001',
      descricao: 'Conquista da certificação ISO 9001:2015, reconhecendo nossos padrões internacionais de qualidade e gestão.',
      status: 'concluido',
      icon: CheckCircle,
      stats: { certificacoes: '3', auditores: '5' },
      imagem: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop'
    },
    {
      ano: '2023',
      mes: 'Dezembro',
      titulo: 'Prêmio Inovação Urbana',
      descricao: 'Reconhecimento pelo Governo do Estado de Alagoas como empresa mais inovadora em soluções urbanas sustentáveis.',
      status: 'concluido',
      icon: Award,
      stats: { premios: '2', reconhecimentos: '5' },
      imagem: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop'
    },
    {
      ano: '2023',
      mes: 'Setembro',
      titulo: 'Projeto Centro Histórico',
      descricao: 'Revitalização do centro histórico de Maceió, preservando o patrimônio arquitetônico enquanto modernizamos a infraestrutura.',
      status: 'concluido',
      icon: Building,
      stats: { ruas: '45', patrimonio: '20 prédios' },
      imagem: 'https://images.unsplash.com/photo-1533158628620-7e35717d36e8?w=400&h=250&fit=crop'
    },
    {
      ano: '2023',
      mes: 'Março',
      titulo: 'Lançamento do Mapa Interativo',
      descricao: 'Desenvolvimento e lançamento da plataforma digital que permite aos cidadãos acompanhar em tempo real o progresso dos trabalhos.',
      status: 'concluido',
      icon: MapPin,
      stats: { usuarios: '5000+', visualizacoes: '50000+' },
      imagem: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    },
    {
      ano: '2022',
      mes: 'Agosto',
      titulo: 'Fundação da JAMAAW',
      descricao: 'Início oficial das operações da JAMAAW, com o objetivo de transformar Maceió através da remoção profissional de cabos inativos.',
      status: 'concluido',
      icon: Building,
      stats: { funcionarios: '5', equipamentos: '3' },
      imagem: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluido':
        return 'bg-green-500'
      case 'andamento':
        return 'bg-yellow-500'
      case 'planejado':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'concluido':
        return 'Concluído'
      case 'andamento':
        return 'Em Andamento'
      case 'planejado':
        return 'Planejado'
      default:
        return 'Status'
    }
  }

  return (
    <section className="jamaaw-section bg-gray-50">
      <div className="jamaaw-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Nossa Jornada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Acompanhe nossa trajetória de crescimento e os marcos importantes 
            que marcaram nossa missão de transformar Maceió em uma cidade mais 
            limpa e organizada.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Linha vertical central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full hidden lg:block"></div>
            
            {timeline.map((item, index) => {
              const Icon = item.icon
              const isEven = index % 2 === 0
              
              return (
                <div 
                  key={index} 
                  className={`relative mb-12 jamaaw-fade-in ${
                    isEven ? 'lg:text-right' : 'lg:text-left'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Conteúdo */}
                  <div className={`lg:w-5/12 ${
                    isEven ? 'lg:ml-auto lg:pr-12' : 'lg:mr-auto lg:pl-12'
                  }`}>
                    <div className="jamaaw-card p-6 hover:shadow-lg transition-shadow">
                      {/* Imagem */}
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={item.imagem}
                          alt={item.titulo}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Data e Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-500 font-medium">
                          {item.mes} {item.ano}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </div>
                      </div>
                      
                      {/* Título */}
                      <h3 className="text-xl font-bold text-black mb-3">
                        {item.titulo}
                      </h3>
                      
                      {/* Descrição */}
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.descricao}
                      </p>
                      
                      {/* Estatísticas */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {Object.entries(item.stats).map(([key, value]) => (
                          <div key={key} className="bg-gray-100 px-3 py-1 rounded-full">
                            <span className="font-semibold text-black">{value}</span>
                            <span className="text-gray-600 ml-1 capitalize">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Ícone central (apenas desktop) */}
                  <div className="hidden lg:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getStatusColor(item.status)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  
                  {/* Ícone mobile */}
                  <div className="lg:hidden flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 ${getStatusColor(item.status)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {item.mes} {item.ano}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              Nosso Impacto em Números
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Resultados concretos de nossa dedicação em transformar Maceió 
              em uma cidade mais limpa e organizada.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <div className="text-gray-600">Ruas Transformadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">75km</div>
              <div className="text-gray-600">Cabos Removidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">50K+</div>
              <div className="text-gray-600">Pessoas Beneficiadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">3</div>
              <div className="text-gray-600">Anos de Operação</div>
            </div>
          </div>
        </div>

        {/* Próximos Passos */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            O Futuro que Construímos Juntos
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa jornada está apenas começando. Com sua ajuda, continuaremos 
            transformando Maceió e expandindo para toda a região Nordeste.
          </p>
          <a
            href="#sugestoes"
            className="jamaaw-button-primary inline-flex items-center"
          >
            Faça Parte da Nossa História
          </a>
        </div>
      </div>
    </section>
  )
}

