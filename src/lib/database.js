import { supabase } from './supabase.js'

// Funções para gerenciar ruas
export const ruasService = {
  // Buscar todas as ruas
  async getAll() {
    const { data, error } = await supabase
      .from('ruas')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar ruas por status
  async getByStatus(status) {
    const { data, error } = await supabase
      .from('ruas')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Criar nova rua
  async create(rua) {
    const { data, error } = await supabase
      .from('ruas')
      .insert([rua])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Atualizar rua
  async update(id, updates) {
    const { data, error } = await supabase
      .from('ruas')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Deletar rua
  async delete(id) {
    const { error } = await supabase
      .from('ruas')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Obter estatísticas por status
  async getStatistics() {
    const { data, error } = await supabase
      .from('ruas')
      .select('status')
    
    if (error) throw error
    
    const stats = {
      concluido: 0,
      andamento: 0,
      analise: 0,
      total: data.length
    }
    
    data.forEach(rua => {
      stats[rua.status]++
    })
    
    return stats
  }
}

// Funções para gerenciar sugestões
export const sugestoesService = {
  // Buscar todas as sugestões
  async getAll() {
    const { data, error } = await supabase
      .from('sugestoes_ruas')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar sugestões não aprovadas
  async getPending() {
    const { data, error } = await supabase
      .from('sugestoes_ruas')
      .select('*')
      .eq('aprovada', false)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Criar nova sugestão
  async create(sugestao) {
    const { data, error } = await supabase
      .from('sugestoes_ruas')
      .insert([sugestao])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Aprovar sugestão
  async approve(id) {
    const { data, error } = await supabase
      .from('sugestoes_ruas')
      .update({ 
        aprovada: true, 
        processed_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}

// Funções para gerenciar posts do blog
export const blogService = {
  // Buscar posts publicados
  async getPublished() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('publicado', true)
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar todos os posts (admin)
  async getAll() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar post por ID
  async getById(id) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Criar novo post
  async create(post) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Atualizar post
  async update(id, updates) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Publicar post
  async publish(id) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ 
        publicado: true, 
        published_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}

// Funções para gerenciar galeria
export const galeriaService = {
  // Buscar todas as imagens da galeria
  async getAll() {
    const { data, error } = await supabase
      .from('galeria_antes_depois')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Criar nova entrada na galeria
  async create(entrada) {
    const { data, error } = await supabase
      .from('galeria_antes_depois')
      .insert([entrada])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Atualizar entrada da galeria
  async update(id, updates) {
    const { data, error } = await supabase
      .from('galeria_antes_depois')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Deletar entrada da galeria
  async delete(id) {
    const { error } = await supabase
      .from('galeria_antes_depois')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Funções para upload de arquivos
export const storageService = {
  // Upload de imagem
  async uploadImage(file, path) {
    const { data, error } = await supabase.storage
      .from('jamaaw-images')
      .upload(path, file)
    
    if (error) throw error
    
    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('jamaaw-images')
      .getPublicUrl(path)
    
    return { ...data, publicUrl }
  },

  // Deletar imagem
  async deleteImage(path) {
    const { error } = await supabase.storage
      .from('jamaaw-images')
      .remove([path])
    
    if (error) throw error
  }
}

// Função para testar conexão
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('configuracoes')
      .select('chave, valor')
      .limit(1)
    
    if (error) throw error
    
    return { success: true, message: 'Conexão com Supabase estabelecida com sucesso' }
  } catch (error) {
    return { success: false, message: `Erro na conexão: ${error.message}` }
  }
}

