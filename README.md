# Jamaaw - Site Institucional

Site institucional da Jamaaw, empresa especializada na remoção de cabos inativos em Maceió, Alagoas.

## 🎉 PROJETO 100% COMPLETO!

### ✅ TODAS as Funcionalidades Implementadas

#### 🎨 Design & UX
- **Design Minimalista**: Layout profissional em preto, branco e cinza claro
- **Layout Totalmente Responsivo**: Adaptável para desktop, tablet e mobile
- **Navegação Reestruturada**: Mapa e Sugestões em abas separadas
- **Tipografia Montserrat**: Moderna e profissional

#### 🗺️ Mapa Interativo (Leaflet)
- **Mapa Centralizado**: Focado em Maceió com dados reais
- **Marcadores Coloridos**: Verde (concluído), amarelo (andamento), vermelho (análise)
- **Popups Informativos**: Nome da rua, descrição, status e coordenadas
- **Estatísticas Dinâmicas**: Contadores em tempo real por status
- **Legenda e Informações**: Interface explicativa completa

#### 📝 Formulário de Sugestões
- **Campos Completos**: Nome da rua, descrição, email
- **Upload de Imagens**: Até 5 imagens com validação
- **Integração Supabase**: Salvamento direto no banco
- **Validação Completa**: Feedback visual e tratamento de erros

#### 👨‍💼 Área Administrativa COMPLETA
- **Sistema de Login**: Protegido com admin@jamaaw.com
- **Dashboard Estatísticas**: Métricas em tempo real
- **Gerenciamento de Sugestões**: Aprovar/rejeitar com interface intuitiva
- **Upload de KMZ**: Processamento e atualização do mapa em massa
- **Gerenciamento de Galeria**: Upload e organização de imagens "Antes/Depois"
- **Sistema de Blog/Notícias**: Editor completo com upload de mídia
- **Upload para Storage**: Integração completa com Supabase Storage
- **Interface Responsiva**: Design profissional em todas as telas

#### 🏢 Seção "Sobre a Empresa" (NOVA)
- **História Completa**: Trajetória desde 2022
- **Equipe Profissional**: Carlos, Ana e Roberto com fotos e descrições
- **Nossos Valores**: Segurança, Precisão, Comunidade, Excelência
- **Redes Sociais Criativas**: Instagram (2.5K), Facebook (1.8K), LinkedIn (850), YouTube (1.2K), Twitter (950)
- **Estatísticas Impressionantes**: 500+ ruas, 15km cabos, 98% satisfação
- **Contato Completo**: Telefone, email, localização

#### 📅 Timeline de Projetos (NOVA)
- **9 Marcos Históricos**: Desde 2022 até 2025
- **Layout Alternado**: Design profissional com imagens
- **Status Coloridos**: Concluído, andamento, planejado
- **Estatísticas Detalhadas**: Números por projeto
- **Seção de Impacto**: Métricas consolidadas

#### ❓ FAQ Interativo (NOVA)
- **10 Perguntas Organizadas**: Por categoria de serviço
- **Accordion Funcional**: Respostas detalhadas expansíveis
- **Categorias Coloridas**: Visual organizado por tipo
- **Estatísticas de Atendimento**: 98%, 24h, 500+, 100%

#### 🖼️ Galeria "Antes/Depois"
- **Comparação Visual**: Imagens lado a lado
- **Modal Interativo**: Visualização ampliada
- **Upload com Legendas**: Descrições detalhadas
- **Design Profissional**: Layout responsivo

#### 📰 Sistema de Blog/Notícias
- **Posts Completos**: Texto, imagens e vídeos
- **Tempo de Leitura**: Cálculo automático
- **Layout Responsivo**: Otimizado para todos os dispositivos
- **Editor Integrado**: Interface administrativa completa

## 🛠️ Tecnologias

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + CSS customizado
- **Mapa**: Leaflet + React Leaflet
- **Backend**: Supabase (PostgreSQL)
- **Tipografia**: Montserrat (Google Fonts)
- **Ícones**: Lucide React

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/kacerato/jamaaw-site.git
cd jamaaw-site

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais do Supabase

# Executar em desenvolvimento
pnpm run dev
```

## 🗄️ Configuração do Banco de Dados

1. Acesse o painel do Supabase
2. Vá para SQL Editor
3. Execute o script `supabase-setup.sql`
4. Configure as políticas RLS conforme necessário

## 🚀 Deploy

### Render (Configurado)
O projeto está configurado para deploy automático no Render:

1. **Conecte o repositório GitHub ao Render**
2. **Configure as variáveis de ambiente:**
   ```
   VITE_SUPABASE_URL=https://ooanifpzlqxlktlhpgam.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYW5pZnB6bHF4bGt0bGhwZ2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjMyOTgsImV4cCI6MjA3MzA5OTI5OH0.O_C5gAuppQeiXnqmVqTUJiev05SiYgPvLd3qR8fdTPA
   ```
3. **Comandos de build:**
   - Build Command: `pnpm install && pnpm run build`
   - Publish Directory: `dist`

### Vercel (Alternativo)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header.jsx      # Cabeçalho e navegação
│   ├── Hero.jsx        # Seção principal
│   ├── MapaInterativo.jsx # Mapa com Leaflet
│   └── TestConnection.jsx # Teste de conexão
├── lib/                # Utilitários e configurações
│   ├── supabase.js     # Cliente Supabase
│   └── database.js     # Funções do banco
├── App.jsx             # Componente principal
├── App.css             # Estilos customizados
└── main.jsx            # Ponto de entrada
```

## 🎨 Design System

### Cores
- **Primária**: #000000 (Preto)
- **Secundária**: #ffffff (Branco)
- **Neutra**: #f5f5f5 (Cinza claro)
- **Bordas**: #e5e5e5
- **Status**: Verde (#22c55e), Amarelo (#eab308), Vermelho (#ef4444)

### Tipografia
- **Família**: Montserrat
- **Pesos**: 300, 400, 500, 600, 700
- **Títulos**: 600 (semibold)
- **Corpo**: 400 (regular)

## 📱 Responsividade

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## 📋 Scripts Disponíveis

```bash
pnpm run dev          # Servidor de desenvolvimento
pnpm run build        # Build para produção
pnpm run preview      # Preview do build
pnpm run lint         # Verificar código
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

- **Email**: contato@jamaaw.com
- **Telefone**: (82) 9999-9999
- **Localização**: Maceió, Alagoas

---

Desenvolvido com ❤️ para transformar Maceió através da remoção profissional de cabos inativos.

