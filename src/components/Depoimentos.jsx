import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export default function Depoimentos() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const depoimentos = [
    {
      id: 1,
      nome: 'Maria Santos',
      bairro: 'Pajuçara',
      rating: 5,
      texto: 'A transformação na nossa rua foi incrível! Antes tínhamos uma verdadeira teia de cabos abandonados. Agora a rua está limpa, organizada e muito mais segura. Parabéns à equipe JAMAAW!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      nome: 'João Silva',
      bairro: 'Centro',
      rating: 5,
      texto: 'Trabalho excepcional! A equipe foi muito profissional, explicou todo o processo e deixou nossa rua impecável. Recomendo para todos os bairros de Maceió.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      nome: 'Ana Costa',
      bairro: 'Ponta Verde',
      rating: 5,
      texto: 'Finalmente nossa avenida ficou livre daqueles cabos perigosos! O trabalho da JAMAAW foi rápido, seguro e o resultado superou nossas expectativas. Muito obrigada!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      nome: 'Carlos Mendes',
      bairro: 'Farol',
      rating: 5,
      texto: 'Como comerciante, posso dizer que a remoção dos cabos melhorou muito a aparência da nossa rua. Os clientes comentam sobre a diferença. Excelente serviço!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 5,
      nome: 'Lucia Oliveira',
      bairro: 'Jatiúca',
      rating: 5,
      texto: 'A JAMAAW não apenas removeu os cabos, mas também orientou nossa comunidade sobre como manter a organização. Profissionalismo e cuidado com a cidade. Nota 10!',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const nextDepoimento = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === depoimentos.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevDepoimento = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? depoimentos.length - 1 : prevIndex - 1
    )
  }

  // Auto-play dos depoimentos
  useEffect(() => {
    const interval = setInterval(nextDepoimento, 5000)
    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="jamaaw-section bg-gray-50">
      <div className="jamaaw-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja os depoimentos de moradores e comerciantes que já vivenciaram 
            a transformação em suas ruas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Carrossel de Depoimentos */}
          <div className="relative">
            <div className="jamaaw-card p-8 md:p-12 text-center relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 opacity-10">
                <Quote className="h-16 w-16 text-black" />
              </div>
              
              {/* Depoimento Atual */}
              <div className="jamaaw-fade-in" key={currentIndex}>
                <div className="flex items-center justify-center mb-4">
                  {renderStars(depoimentos[currentIndex].rating)}
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{depoimentos[currentIndex].texto}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={depoimentos[currentIndex].avatar}
                    alt={depoimentos[currentIndex].nome}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-black text-lg">
                      {depoimentos[currentIndex].nome}
                    </div>
                    <div className="text-gray-600">
                      {depoimentos[currentIndex].bairro}, Maceió
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles de Navegação */}
            <button
              onClick={prevDepoimento}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-black"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextDepoimento}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow text-gray-600 hover:text-black"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {depoimentos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Estatísticas de Satisfação */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">98%</div>
            <div className="text-gray-600">Taxa de Satisfação</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">4.9/5</div>
            <div className="text-gray-600">Avaliação Média</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">150+</div>
            <div className="text-gray-600">Avaliações Positivas</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Quer ver sua rua transformada também?
          </p>
          <a
            href="#sugestoes"
            className="jamaaw-button-primary inline-flex items-center"
          >
            Envie sua sugestão
          </a>
        </div>
      </div>
    </section>
  )
}

