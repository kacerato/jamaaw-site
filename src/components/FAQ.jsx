import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail, MessageCircle } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      categoria: 'Serviços',
      pergunta: 'Como vocês identificam quais cabos estão realmente inativos?',
      resposta: 'Utilizamos equipamentos especializados para detectar sinais elétricos e realizamos testes técnicos rigorosos. Nossa equipe também trabalha em coordenação com as concessionárias de energia e telecomunicações para confirmar o status de cada cabo antes da remoção. Todo o processo segue protocolos de segurança estabelecidos pela ANEEL e ANATEL.'
    },
    {
      categoria: 'Segurança',
      pergunta: 'O trabalho de remoção é seguro para os moradores?',
      resposta: 'Absolutamente. Nossa equipe é composta por técnicos certificados que seguem rigorosos protocolos de segurança. Utilizamos EPIs adequados, isolamos as áreas de trabalho e realizamos todos os procedimentos durante horários seguros. Além disso, mantemos comunicação constante com os moradores durante todo o processo.'
    },
    {
      categoria: 'Processo',
      pergunta: 'Quanto tempo demora para remover os cabos de uma rua?',
      resposta: 'O tempo varia conforme a complexidade e extensão da rua. Em média, uma rua residencial leva de 2 a 5 dias úteis para ser completamente limpa. Ruas com maior concentração de cabos ou situações mais complexas podem levar até 2 semanas. Sempre informamos o cronograma detalhado aos moradores antes do início dos trabalhos.'
    },
    {
      categoria: 'Custos',
      pergunta: 'Quanto custa o serviço para uma rua ou bairro?',
      resposta: 'Nossos serviços são oferecidos através de parcerias com a prefeitura e órgãos públicos, sendo gratuitos para a comunidade. Para projetos privados ou comerciais, realizamos orçamentos personalizados baseados na complexidade e extensão do trabalho. Entre em contato conosco para uma avaliação gratuita.'
    },
    {
      categoria: 'Solicitação',
      pergunta: 'Como posso solicitar a limpeza da minha rua?',
      resposta: 'É muito simples! Você pode usar nosso formulário de sugestões aqui no site, nos enviar um e-mail para contato@jamaaw.com, ou ligar para (82) 9999-9999. Nossa equipe fará uma avaliação técnica gratuita e incluirá sua rua em nosso cronograma de trabalhos.'
    },
    {
      categoria: 'Processo',
      pergunta: 'Vocês trabalham em finais de semana e feriados?',
      resposta: 'Nosso horário padrão é de segunda a sexta-feira, das 8h às 17h. Em casos especiais ou emergências, podemos realizar trabalhos aos sábados. Não trabalhamos aos domingos e feriados, respeitando o descanso da comunidade e de nossa equipe.'
    },
    {
      categoria: 'Técnico',
      pergunta: 'O que acontece com os cabos removidos?',
      resposta: 'Todos os materiais removidos são destinados adequadamente. Cabos de cobre são enviados para reciclagem, contribuindo para a economia circular. Materiais não recicláveis são descartados em locais apropriados, seguindo todas as normas ambientais. Mantemos certificados de destinação adequada de todos os resíduos.'
    },
    {
      categoria: 'Resultados',
      pergunta: 'Quais os benefícios após a remoção dos cabos?',
      resposta: 'Os benefícios são imediatos e duradouros: melhoria na estética urbana, redução de riscos de acidentes, facilita a manutenção de postes e árvores, melhora a iluminação pública, valoriza os imóveis da região e contribui para uma cidade mais organizada e moderna.'
    },
    {
      categoria: 'Garantia',
      pergunta: 'Vocês oferecem garantia do serviço?',
      resposta: 'Sim! Oferecemos garantia de 12 meses contra defeitos em nosso trabalho. Se algum cabo removido por nossa equipe apresentar problemas ou se novos cabos inativos aparecerem na mesma área por falha nossa, retornamos gratuitamente para correção.'
    },
    {
      categoria: 'Emergência',
      pergunta: 'E se houver uma emergência com cabos perigosos?',
      resposta: 'Temos um serviço de atendimento emergencial 24h para situações de risco. Se você identificar cabos caídos, soltos ou em situação perigosa, entre em contato imediatamente pelo (82) 9999-9999. Nossa equipe de plantão avaliará e tomará as medidas necessárias para garantir a segurança.'
    }
  ]

  const categorias = [...new Set(faqs.map(faq => faq.categoria))]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="jamaaw-section bg-white">
      <div className="jamaaw-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tire todas as suas dúvidas sobre nossos serviços, processos e como 
            podemos transformar sua rua. Se não encontrar a resposta que procura, 
            entre em contato conosco!
          </p>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categorias.map((categoria, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
            >
              {categoria}
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="jamaaw-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1 font-medium">
                        {faq.categoria}
                      </div>
                      <h3 className="text-lg font-semibold text-black pr-4">
                        {faq.pergunta}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="ml-12 text-gray-700 leading-relaxed">
                      {faq.resposta}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            Não encontrou sua resposta?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa equipe está sempre pronta para esclarecer suas dúvidas e 
            fornecer informações detalhadas sobre nossos serviços.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="tel:(82)9999-9999"
              className="jamaaw-card p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Telefone</h4>
              <p className="text-gray-600 text-sm">(82) 9999-9999</p>
              <p className="text-xs text-gray-500 mt-1">Seg-Sex: 8h às 18h</p>
            </a>
            
            <a
              href="mailto:contato@jamaaw.com"
              className="jamaaw-card p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Email</h4>
              <p className="text-gray-600 text-sm">contato@jamaaw.com</p>
              <p className="text-xs text-gray-500 mt-1">Resposta em até 24h</p>
            </a>
            
            <a
              href="#sugestoes"
              className="jamaaw-card p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Formulário</h4>
              <p className="text-gray-600 text-sm">Envie sua pergunta</p>
              <p className="text-xs text-gray-500 mt-1">Resposta personalizada</p>
            </a>
          </div>
        </div>

        {/* Estatísticas de Atendimento */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-black mb-2">98%</div>
            <div className="text-gray-600 text-sm">Dúvidas Resolvidas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black mb-2">24h</div>
            <div className="text-gray-600 text-sm">Tempo Médio de Resposta</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black mb-2">500+</div>
            <div className="text-gray-600 text-sm">Perguntas Respondidas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-black mb-2">100%</div>
            <div className="text-gray-600 text-sm">Satisfação no Atendimento</div>
          </div>
        </div>
      </div>
    </section>
  )
}

