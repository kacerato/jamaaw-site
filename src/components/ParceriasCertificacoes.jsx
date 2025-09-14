import { Award, Shield, Users, Building, CheckCircle, Star } from 'lucide-react'

export default function ParceriasCertificacoes() {
  const parcerias = [
    {
      nome: 'Prefeitura de Maceió',
      tipo: 'Parceria Institucional',
      logo: 'https://via.placeholder.com/120x60/000000/FFFFFF?text=PMCZ',
      descricao: 'Parceria oficial para revitalização urbana'
    },
    {
      nome: 'UFAL',
      tipo: 'Parceria Acadêmica',
      logo: 'https://via.placeholder.com/120x60/0066CC/FFFFFF?text=UFAL',
      descricao: 'Pesquisa e desenvolvimento em infraestrutura'
    },
    {
      nome: 'CREA-AL',
      tipo: 'Registro Profissional',
      logo: 'https://via.placeholder.com/120x60/FF6600/FFFFFF?text=CREA',
      descricao: 'Registro e fiscalização profissional'
    },
    {
      nome: 'SEBRAE',
      tipo: 'Apoio Empresarial',
      logo: 'https://via.placeholder.com/120x60/009900/FFFFFF?text=SEBRAE',
      descricao: 'Consultoria e desenvolvimento empresarial'
    },
    {
      nome: 'Equatorial Energia',
      tipo: 'Parceria Técnica',
      logo: 'https://via.placeholder.com/120x60/FF0000/FFFFFF?text=EQUATORIAL',
      descricao: 'Coordenação em infraestrutura elétrica'
    },
    {
      nome: 'Oi Fibra',
      tipo: 'Parceria Operacional',
      logo: 'https://via.placeholder.com/120x60/FFCC00/000000?text=OI',
      descricao: 'Identificação de cabos de telecomunicações'
    }
  ]

  const certificacoes = [
    {
      titulo: 'ISO 9001:2015',
      orgao: 'Sistema de Gestão da Qualidade',
      icon: Award,
      cor: 'text-blue-600',
      descricao: 'Certificação internacional de qualidade'
    },
    {
      titulo: 'ISO 14001:2015',
      orgao: 'Sistema de Gestão Ambiental',
      icon: Shield,
      cor: 'text-green-600',
      descricao: 'Compromisso com sustentabilidade'
    },
    {
      titulo: 'OHSAS 18001',
      orgao: 'Segurança e Saúde Ocupacional',
      icon: CheckCircle,
      cor: 'text-red-600',
      descricao: 'Segurança no trabalho certificada'
    },
    {
      titulo: 'Alvará Municipal',
      orgao: 'Prefeitura de Maceió',
      icon: Building,
      cor: 'text-purple-600',
      descricao: 'Autorização oficial para operação'
    }
  ]

  const reconhecimentos = [
    {
      titulo: 'Empresa Destaque 2024',
      orgao: 'Federação das Indústrias de AL',
      ano: '2024'
    },
    {
      titulo: 'Prêmio Inovação Urbana',
      orgao: 'Governo do Estado de Alagoas',
      ano: '2023'
    },
    {
      titulo: 'Selo Verde Empresarial',
      orgao: 'Instituto Meio Ambiente AL',
      ano: '2023'
    },
    {
      titulo: 'Top 10 Startups AL',
      orgao: 'SEBRAE Alagoas',
      ano: '2022'
    }
  ]

  return (
    <section className="jamaaw-section bg-white">
      <div className="jamaaw-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Parcerias e Certificações
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com as melhores instituições e mantemos os mais altos 
            padrões de qualidade, segurança e responsabilidade ambiental.
          </p>
        </div>

        {/* Parcerias */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-black mb-4">
              Nossos Parceiros
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Colaboramos com instituições públicas e privadas para garantir 
              a excelência em nossos serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parcerias.map((parceria, index) => (
              <div 
                key={index}
                className="jamaaw-card p-6 text-center hover:shadow-lg transition-shadow jamaaw-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-center h-20">
                  <img
                    src={parceria.logo}
                    alt={parceria.nome}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
                <h4 className="font-semibold text-black mb-2">
                  {parceria.nome}
                </h4>
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  {parceria.tipo}
                </p>
                <p className="text-sm text-gray-600">
                  {parceria.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificações */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-black mb-4">
              Certificações e Licenças
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mantemos todas as certificações necessárias para garantir 
              qualidade, segurança e conformidade legal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificacoes.map((cert, index) => {
              const Icon = cert.icon
              return (
                <div 
                  key={index}
                  className="jamaaw-card p-6 text-center hover:shadow-lg transition-shadow jamaaw-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                    <Icon className={`h-8 w-8 ${cert.cor}`} />
                  </div>
                  <h4 className="font-semibold text-black mb-2 text-sm">
                    {cert.titulo}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">
                    {cert.orgao}
                  </p>
                  <p className="text-xs text-gray-600">
                    {cert.descricao}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Reconhecimentos */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              Reconhecimentos e Prêmios
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa dedicação à excelência tem sido reconhecida por 
              diversas instituições e órgãos governamentais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reconhecimentos.map((premio, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow jamaaw-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-black mb-2 text-sm">
                  {premio.titulo}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {premio.orgao}
                </p>
                <div className="inline-block bg-black text-white px-2 py-1 rounded text-xs font-medium">
                  {premio.ano}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compromissos */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-black mb-2">
              100% Seguro
            </h4>
            <p className="text-gray-600 text-sm">
              Todos os trabalhos seguem rigorosos protocolos de segurança
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-black mb-2">
              Qualidade Garantida
            </h4>
            <p className="text-gray-600 text-sm">
              Certificações internacionais asseguram a excelência dos serviços
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-black mb-2">
              Responsabilidade Social
            </h4>
            <p className="text-gray-600 text-sm">
              Compromisso com a comunidade e desenvolvimento sustentável
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

