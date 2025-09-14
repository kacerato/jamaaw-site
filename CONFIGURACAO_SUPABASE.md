# Guia Completo de Configuração do Supabase para o Site JAMAAW

## Introdução

Este documento fornece instruções detalhadas para configurar completamente o Supabase para o site institucional da JAMAAW. O Supabase servirá como backend completo, fornecendo autenticação, banco de dados PostgreSQL, storage de arquivos e APIs em tempo real.

## Pré-requisitos

Antes de começar, certifique-se de ter:
- Acesso ao repositório GitHub: https://github.com/kacerato/jamaaw-site
- Credenciais de acesso: **kacerato** / **Lcskrt11@**
- Conta no Supabase (https://supabase.com)
- Permissão total para modificar o projeto

## 1. Configuração Inicial do Supabase

### 1.1 Criando o Projeto

1. Acesse https://supabase.com e faça login
2. Clique em "New Project"
3. Configure o projeto:
   - **Nome do Projeto**: `jamaaw-site`
   - **Database Password**: Use uma senha forte (recomendado: `JamaawDB2025!`)
   - **Região**: Selecione `South America (São Paulo)` para melhor performance
   - **Pricing Plan**: Selecione o plano adequado (Free tier é suficiente para início)

### 1.2 Obtendo as Credenciais

Após criar o projeto, vá para **Settings > API** e anote:
- **Project URL**: `https://[seu-projeto-id].supabase.co`
- **Project API Key (anon, public)**: Chave pública para uso no frontend
- **Project API Key (service_role, secret)**: Chave privada para operações administrativas

### 1.3 Configurando as Variáveis de Ambiente

No arquivo `.env` do projeto, atualize com suas credenciais:

```env
VITE_SUPABASE_URL=https://[seu-projeto-id].supabase.co
VITE_SUPABASE_ANON_KEY=[sua-chave-publica]
```

## 2. Configuração do Banco de Dados

### 2.1 Executando o Script SQL

O projeto já inclui um arquivo `supabase-setup.sql` com todas as tabelas necessárias. Para executá-lo:

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Copie e cole o conteúdo completo do arquivo `supabase-setup.sql`
4. Clique em **Run** para executar

### 2.2 Estrutura das Tabelas Criadas

O script criará as seguintes tabelas principais:

#### Tabela `ruas`
Armazena informações sobre as ruas e seu status de limpeza:
- `id`: Identificador único
- `nome`: Nome da rua
- `bairro`: Bairro onde está localizada
- `status`: Status atual (concluido, andamento, analise)
- `coordenadas`: Coordenadas geográficas (latitude, longitude)
- `descricao`: Descrição detalhada
- `data_inicio`: Data de início dos trabalhos
- `data_conclusao`: Data de conclusão
- `fotos_antes`: URLs das fotos antes da limpeza
- `fotos_depois`: URLs das fotos depois da limpeza

#### Tabela `sugestoes_ruas`
Armazena sugestões enviadas pelos usuários:
- `id`: Identificador único
- `nome_rua`: Nome da rua sugerida
- `descricao`: Descrição da situação
- `email`: Email do usuário que enviou
- `imagens`: URLs das imagens enviadas
- `aprovada`: Status da sugestão (TRUE para aprovada, FALSE para pendente)
- `created_at`: Data de criação da sugestão
- `processed_at`: Data de processamento da sugestão

#### Tabela `noticias`
Armazena posts do blog/notícias:
- `id`: Identificador único
- `titulo`: Título da notícia
- `conteudo`: Conteúdo completo em HTML
- `resumo`: Resumo para listagem
- `imagem_capa`: URL da imagem de capa
- `autor`: Nome do autor
- `publicado`: Status de publicação
- `data_publicacao`: Data de publicação

#### Tabela `galeria`
Armazena imagens da galeria antes/depois:
- `id`: Identificador único
- `titulo`: Título do projeto
- `descricao`: Descrição do projeto
- `localizacao`: Localização do projeto
- `imagem_antes`: URL da imagem antes
- `imagem_depois`: URL da imagem depois
- `data_projeto`: Data do projeto

## 3. Configuração de Autenticação

### 3.1 Habilitando Provedores de Autenticação

1. Vá para **Authentication > Settings**
2. Em **Auth Providers**, habilite:
   - **Email**: Para login com email/senha
   - **Google** (opcional): Para login social

### 3.2 Configurando Email de Administrador

Para definir o email de administrador padrão:

1. Vá para **Authentication > Users**
2. Clique em **Invite User**
3. Digite o email do administrador: `admin@jamaaw.com`
4. Defina uma senha temporária forte
5. Marque como **Email Confirmed**

### 3.3 Configurando Políticas RLS (Row Level Security)

Execute os seguintes comandos SQL para configurar as políticas de segurança:

```sql
-- Políticas RLS (Row Level Security)
ALTER TABLE ruas ENABLE ROW LEVEL SECURITY;
ALTER TABLE sugestoes_ruas ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria_antes_depois ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública
CREATE POLICY "Ruas são visíveis publicamente" ON ruas
    FOR SELECT USING (true);

CREATE POLICY "Posts publicados são visíveis publicamente" ON blog_posts
    FOR SELECT USING (publicado = true);

CREATE POLICY "Galeria é visível publicamente" ON galeria_antes_depois
    FOR SELECT USING (true);

CREATE POLICY "Configurações são visíveis publicamente" ON configuracoes
    FOR SELECT USING (true);

-- Política para inserção de sugestões (público pode inserir)
CREATE POLICY "Qualquer um pode inserir sugestões" ON sugestoes_ruas
    FOR INSERT WITH CHECK (true);

-- Políticas para administradores (usuários autenticados)
CREATE POLICY "Administradores podem gerenciar ruas" ON ruas
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Administradores podem ver sugestões" ON sugestoes_ruas
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Administradores podem atualizar sugestões" ON sugestoes_ruas
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Administradores podem gerenciar posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Administradores podem gerenciar galeria" ON galeria_antes_depois
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Administradores podem gerenciar configurações" ON configuracoes
    FOR ALL USING (auth.role() = 'authenticated');
```

## 4. Configuração de Storage

### 4.1 Criando Buckets de Storage

1. Vá para **Storage** no painel do Supabase
2. Clique em **New Bucket**
3. Crie os seguintes buckets:

#### Bucket `jamaaw-images`
- **Name**: `jamaaw-images`
- **Public**: ✅ (marcado)
- **File size limit**: 10 MB
- **Allowed MIME types**: `image/jpeg,image/png,image/webp`

### 4.2 Configurando Políticas de Storage

Execute no SQL Editor:

```sql
-- Política para upload de imagens (público pode fazer upload)
CREATE POLICY "Qualquer um pode fazer upload de imagens" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'jamaaw-images');

-- Política para visualização de imagens (público pode ver)
CREATE POLICY "Imagens são visíveis publicamente" ON storage.objects
    FOR SELECT USING (bucket_id = 'jamaaw-images');

-- Política para administradores gerenciarem imagens
CREATE POLICY "Administradores podem gerenciar imagens" ON storage.objects
    FOR ALL USING (bucket_id = 'jamaaw-images' AND auth.role() = 'authenticated');
```

## 5. Configuração de Email

### 5.1 Configurando SMTP Personalizado

Para emails de produção, configure um provedor SMTP:

1. Vá para **Settings > Auth**
2. Em **SMTP Settings**, configure:
   - **Enable custom SMTP**: ✅
   - **SMTP Host**: `smtp.gmail.com` (ou seu provedor)
   - **SMTP Port**: `587`
   - **SMTP User**: `contato@jamaaw.com`
   - **SMTP Password**: Senha do email
   - **Sender Name**: `JAMAAW`
   - **Sender Email**: `contato@jamaaw.com`

### 5.2 Personalizando Templates de Email

Personalize os templates em **Auth > Email Templates**:

#### Template de Confirmação
```html
<h2>Bem-vindo à JAMAAW!</h2>
<p>Obrigado por se cadastrar em nosso sistema.</p>
<p>Clique no link abaixo para confirmar seu email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar Email</a></p>
```

#### Template de Recuperação de Senha
```html
<h2>Recuperação de Senha - JAMAAW</h2>
<p>Você solicitou a recuperação de sua senha.</p>
<p>Clique no link abaixo para redefinir:</p>
<p><a href="{{ .ConfirmationURL }}">Redefinir Senha</a></p>
```

## 6. Dados de Exemplo

### 6.1 Inserindo Ruas de Exemplo

Execute no SQL Editor para inserir dados de exemplo:

```sql
-- Inserir ruas de exemplo
INSERT INTO ruas (nome, bairro, status, coordenadas, descricao, data_inicio, data_conclusao) VALUES
('Rua das Flores', 'Pajuçara', 'concluido', '{"lat": -9.6658, "lng": -35.7353}', 'Remoção completa de cabos de telefonia e TV a cabo abandonados há mais de 5 anos.', '2024-01-15', '2024-01-20'),
('Avenida Fernandes Lima', 'Farol', 'andamento', '{"lat": -9.6498, "lng": -35.7089}', 'Trabalho de organização e remoção de cabos inativos em uma das principais avenidas da cidade.', '2024-12-01', NULL),
('Rua Jangadeiros Alagoanos', 'Pajuçara', 'analise', '{"lat": -9.6708, "lng": -35.7308}', 'Remoção de múltiplos cabos abandonados que comprometiam a segurança dos pedestres.', NULL, NULL),
('Praça da República', 'Centro', 'concluido', '{"lat": -9.6658, "lng": -35.7353}', 'Revitalização da área central com remoção de cabos antigos e organização da infraestrutura.', '2024-07-10', '2024-07-28');
```

### 6.2 Inserindo Notícias de Exemplo

```sql
-- Inserir notícias de exemplo
INSERT INTO noticias (titulo, conteudo, resumo, imagem_capa, autor, publicado, data_publicacao) VALUES
('JAMAAW Completa 500 Ruas Transformadas', '<p>Alcançamos um marco histórico: 500 ruas completamente limpas e organizadas em Maceió...</p>', 'Empresa alcança marca de 500 ruas transformadas, beneficiando mais de 50.000 moradores.', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop', 'Equipe JAMAAW', true, '2024-12-15'),
('Nova Parceria com Prefeitura de Maceió', '<p>Firmamos uma importante parceria com a Prefeitura de Maceió para expandir nossos serviços...</p>', 'Parceria oficial permitirá atendimento a mais bairros da capital alagoana.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop', 'Carlos Mendes', true, '2024-11-20');
```

### 6.3 Inserindo Galeria de Exemplo

```sql
-- Inserir projetos da galeria
INSERT INTO galeria (titulo, descricao, localizacao, imagem_antes, imagem_depois, data_projeto) VALUES
('Rua do Comércio - Centro', 'Remoção completa de cabos de telefonia e TV a cabo abandonados há mais de 5 anos.', 'Centro, Maceió', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', '2024-08-15'),
('Avenida Fernandes Lima', 'Trabalho de organização e remoção de cabos inativos em uma das principais avenidas da cidade.', 'Farol, Maceió', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', '2024-10-10');
```

## 7. Testando a Configuração

### 7.1 Teste de Conexão

O site inclui um componente de teste de conexão. Para usá-lo:

1. Acesse o site local ou em produção
2. Clique no botão "DB Test" no canto inferior esquerdo
3. Verifique se todas as operações retornam sucesso:
   - ✅ Conexão com Supabase
   - ✅ Leitura de ruas
   - ✅ Leitura de notícias
   - ✅ Leitura de galeria

### 7.2 Teste de Autenticação

1. Clique no ícone de configurações (canto inferior direito)
2. Faça login com: `admin@jamaaw.com` e a senha definida
3. Verifique se o painel administrativo carrega corretamente
4. Teste as funcionalidades de CRUD (Create, Read, Update, Delete)

### 7.3 Teste de Upload de Imagens

1. Vá para a seção "Sugestões"
2. Preencha o formulário e anexe uma imagem
3. Envie a sugestão
4. Verifique se a imagem foi salva no bucket `imagens-sugestoes`

## 8. Configuração de Produção

### 8.1 Variáveis de Ambiente no Render

Ao fazer deploy no Render, configure as seguintes variáveis de ambiente:

```
VITE_SUPABASE_URL=https://[seu-projeto-id].supabase.co
VITE_SUPABASE_ANON_KEY=[sua-chave-publica]
```

### 8.2 Configuração de CORS

No Supabase, vá para **Settings > API** e adicione o domínio do Render na lista de origens permitidas:

```
https://jamaaw-site.onrender.com
```

### 8.3 Configuração de Webhooks (Opcional)

Para notificações em tempo real, configure webhooks em **Database > Webhooks**:

- **Table**: `sugestoes`
- **Events**: `INSERT`
- **HTTP Request**: `POST` para endpoint de notificação

## 9. Manutenção e Monitoramento

### 9.1 Monitoramento de Performance

No painel do Supabase, monitore:
- **Database > Logs**: Logs de consultas SQL
- **Auth > Users**: Usuários registrados
- **Storage > Usage**: Uso de armazenamento
- **Settings > Usage**: Uso geral da API

### 9.2 Backup Automático

Configure backup automático:
1. Vá para **Settings > Database**
2. Configure **Point-in-time Recovery** (PITR)
3. Defina retenção de 7 dias para o plano gratuito

### 9.3 Atualizações de Segurança

Mantenha sempre atualizado:
- Senhas de administrador
- Chaves de API (renovar periodicamente)
- Políticas RLS conforme necessário

## 10. Solução de Problemas Comuns

### 10.1 Erro de Conexão

Se houver erro de conexão:
1. Verifique se as variáveis de ambiente estão corretas
2. Confirme se o projeto Supabase está ativo
3. Verifique se não há bloqueios de firewall

### 10.2 Erro de Autenticação

Para problemas de login:
1. Verifique se o email está confirmado
2. Confirme se as políticas RLS estão corretas
3. Teste com um usuário diferente

### 10.3 Erro de Upload

Para problemas com upload de imagens:
1. Verifique se os buckets existem e são públicos
2. Confirme se as políticas de storage estão configuradas
3. Verifique o tamanho e formato dos arquivos

## Conclusão

Seguindo este guia completo, o Supabase estará totalmente configurado para suportar todas as funcionalidades do site JAMAAW. O sistema incluirá autenticação segura, banco de dados robusto, storage de arquivos e APIs em tempo real.

Para suporte adicional, consulte a documentação oficial do Supabase em https://supabase.com/docs ou entre em contato com a equipe de desenvolvimento.

---

**Autor**: Manus AI  
**Data**: Janeiro 2025  
**Versão**: 1.0

