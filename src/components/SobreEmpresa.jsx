import { 
  Users, 
  Award, 
  Clock, 
  Shield, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Target,
  Heart,
  Zap
} from 'lucide-react'

export default function SobreEmpresa() {
  const stats = [
    { number: '500+', label: 'Ruas Transformadas', icon: MapPin },
    { number: '15km', label: 'Cabos Removidos', icon: Zap },
    { number: '3 anos', label: 'de Experiência', icon: Calendar },
    { number: '98%', label: 'Satisfação', icon: Heart }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Priorizamos a segurança em todos os nossos processos, garantindo trabalhos sem riscos para a comunidade.'
    },
    {
      icon: Target,
      title: 'Precisão',
      description: 'Utilizamos tecnologia avançada para identificar e remover apenas cabos realmente inativos.'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Trabalhamos em parceria com a comunidade, ouvindo sugestões e mantendo transparência total.'
    },
    {
      icon: Award,
      title: 'Excelência',
      description: 'Buscamos sempre a excelência em nossos serviços, com equipe qualificada e equipamentos modernos.'
    }
  ]

  const team = [
    {
      name: 'Carlos Mendes',
      role: 'Diretor Técnico',
      bio: 'Engenheiro elétrico com 15 anos de experiência em infraestrutura urbana.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Ana Silva',
      role: 'Coordenadora de Projetos',
      bio: 'Especialista em gestão urbana e relacionamento com a comunidade.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Roberto Santos',
      role: 'Supervisor de Campo',
      bio: 'Técnico especializado com vasta experiência em remoção segura de cabos.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    }
  ]

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/jamaaw_oficial',
      color: 'hover:text-pink-600',
      followers: '2.5K'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com/jamaaw.oficial',
      color: 'hover:text-blue-600',
      followers: '1.8K'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/company/jamaaw',
      color: 'hover:text-blue-700',
      followers: '850'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      url: 'https://youtube.com/@jamaaw',
      color: 'hover:text-red-600',
      followers: '1.2K'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com/jamaaw_oficial',
      color: 'hover:text-blue-500',
      followers: '950'
    }
  ]

  return (
    <section id="sobre" className="jamaaw-section bg-white">
      <div className="jamaaw-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Sobre a JAMAAW
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos pioneiros na transformação urbana de Maceió através da remoção 
            profissional de cabos inativos, contribuindo para uma cidade mais limpa, 
            organizada e segura para todos.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index} 
                className="text-center jamaaw-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Nossa História */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="jamaaw-fade-in">
            <h3 className="text-3xl font-bold text-black mb-6">
              Nossa História
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A JAMAAW nasceu em 2022 da visão de transformar Maceió em uma cidade 
                mais organizada e segura. Fundada por profissionais experientes em 
                infraestrutura urbana, começamos com um objetivo claro: remover os 
                milhares de cabos abandonados que poluem nossa paisagem urbana.
              </p>
              <p>
                Desde então, já transformamos mais de 500 ruas, removendo quilômetros 
                de cabos inativos e devolvendo a beleza natural aos nossos bairros. 
                Nosso trabalho vai além da estética - promovemos segurança, organização 
                e qualidade de vida para todos os maceioenses.
              </p>
              <p>
                Hoje, somos referência em Alagoas e expandimos nossos serviços para 
                outras cidades do Nordeste, sempre mantendo nosso compromisso com a 
                excelência e transparência.
              </p>
            </div>
          </div>
          
          <div className="jamaaw-fade-in">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
              alt="Equipe JAMAAW trabalhando"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Nossos Valores */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4">
              Nossos Valores
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho e definem nossa identidade como empresa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div 
                  key={index} 
                  className="jamaaw-card p-6 text-center hover:shadow-lg transition-shadow jamaaw-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-black" />
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Nossa Equipe */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4">
              Nossa Equipe
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conheça os profissionais dedicados que tornam possível a transformação de Maceió.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="jamaaw-card p-6 text-center hover:shadow-lg transition-shadow jamaaw-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-black mb-2">
                  {member.name}
                </h4>
                <p className="text-gray-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-black mb-4">
              Siga-nos nas Redes Sociais
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acompanhe nosso trabalho, veja os bastidores dos projetos e fique por 
              dentro das novidades da transformação urbana de Maceió.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`jamaaw-card p-6 text-center hover:shadow-lg transition-all duration-300 group jamaaw-fade-in ${social.color}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-gray-600 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-black mb-1">
                    {social.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {social.followers} seguidores
                  </p>
                </a>
              )
            })}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Use a hashtag <span className="font-semibold text-black">#MaceiôLimpa</span> 
              e marque <span className="font-semibold text-black">@jamaaw_oficial</span> 
              nas suas publicações!
            </p>
          </div>
        </div>

        {/* Contato Direto */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="jamaaw-card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-black mb-2">Telefone</h4>
            <p className="text-gray-600">(82) 9999-9999</p>
            <p className="text-sm text-gray-500 mt-1">Seg-Sex: 8h às 18h</p>
          </div>
          
          <div className="jamaaw-card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-black mb-2">Email</h4>
            <p className="text-gray-600">contato@jamaaw.com</p>
            <p className="text-sm text-gray-500 mt-1">Resposta em até 24h</p>
          </div>
          
          <div className="jamaaw-card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-black mb-2">Localização</h4>
            <p className="text-gray-600">Maceió, Alagoas</p>
            <p className="text-sm text-gray-500 mt-1">Atendemos toda a região</p>
          </div>
        </div>
      </div>
    </section>
  )
}

