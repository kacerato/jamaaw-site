# Jamaaw - Site Institucional

Site institucional da Jamaaw, empresa especializada na remoção de cabos inativos em Maceió, Alagoas.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Design Minimalista**: Layout profissional em preto, branco e cinza claro
- **Mapa Interativo**: Visualização em tempo real do progresso dos trabalhos
- **Marcadores Coloridos**: Verde (concluído), amarelo (andamento), vermelho (análise)
- **Estatísticas Dinâmicas**: Contadores por status das ruas
- **Layout Responsivo**: Adaptável para desktop, tablet e mobile
- **Navegação Intuitiva**: Header fixo com menu responsivo

### 🔄 Em Desenvolvimento
- Formulário de sugestões públicas
- Área administrativa com autenticação
- Sistema de blog/notícias
- Galeria antes/depois
- Upload de arquivos KMZ
- Editor de texto rico

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

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Render
1. Conecte o repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático

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

