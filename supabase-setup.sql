-- Script de configuração do banco de dados Supabase para o site Jamaaw
-- Execute este script no SQL Editor do Supabase

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela para armazenar informações das ruas
CREATE TABLE IF NOT EXISTS ruas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(20) CHECK (status IN ('concluido', 'andamento', 'analise')) DEFAULT 'analise',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    fotos TEXT[], -- Array de URLs das fotos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para sugestões públicas de novas ruas
CREATE TABLE IF NOT EXISTS sugestoes_ruas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome_rua VARCHAR(255) NOT NULL,
    descricao TEXT,
    email VARCHAR(255) NOT NULL,
    imagens TEXT[], -- Array de URLs das imagens
    aprovada BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela para posts do blog/notícias
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    resumo TEXT,
    imagem_destaque TEXT, -- URL da imagem de destaque
    publicado BOOLEAN DEFAULT FALSE,
    autor_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Tabela para galeria antes/depois
CREATE TABLE IF NOT EXISTS galeria_antes_depois (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem_antes TEXT NOT NULL, -- URL da imagem "antes"
    imagem_depois TEXT NOT NULL, -- URL da imagem "depois"
    localizacao VARCHAR(255),
    data_trabalho DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para configurações do site
CREATE TABLE IF NOT EXISTS configuracoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    descricao TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configurações padrão
INSERT INTO configuracoes (chave, valor, descricao) VALUES
('mapa_centro_lat', '-9.6658', 'Latitude do centro do mapa (Maceió)'),
('mapa_centro_lng', '-35.7353', 'Longitude do centro do mapa (Maceió)'),
('mapa_zoom_inicial', '12', 'Zoom inicial do mapa')
ON CONFLICT (chave) DO NOTHING;

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_ruas_updated_at BEFORE UPDATE ON ruas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracoes_updated_at BEFORE UPDATE ON configuracoes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

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

-- Criar bucket para armazenamento de imagens
INSERT INTO storage.buckets (id, name, public) VALUES ('jamaaw-images', 'jamaaw-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para upload de imagens (público pode fazer upload)
CREATE POLICY "Qualquer um pode fazer upload de imagens" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'jamaaw-images');

-- Política para visualização de imagens (público pode ver)
CREATE POLICY "Imagens são visíveis publicamente" ON storage.objects
    FOR SELECT USING (bucket_id = 'jamaaw-images');

-- Política para administradores gerenciarem imagens
CREATE POLICY "Administradores podem gerenciar imagens" ON storage.objects
    FOR ALL USING (bucket_id = 'jamaaw-images' AND auth.role() = 'authenticated');

