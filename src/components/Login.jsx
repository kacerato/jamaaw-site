import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('') // Limpar erro ao digitar
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Email e senha são obrigatórios')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) {
        throw error
      }

      if (data.user) {
        onLogin(data.user)
      }
    } catch (error) {
      console.error('Erro no login:', error)
      
      if (error.message.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos')
      } else if (error.message.includes('Email not confirmed')) {
        setError('Email não confirmado. Verifique sua caixa de entrada.')
      } else {
        setError('Erro ao fazer login. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">JAMAAW</h1>
          <p className="text-sm text-gray-600 mb-8">Área Administrativa</p>
          <h2 className="text-2xl font-semibold text-black">
            Fazer Login
          </h2>
          <p className="mt-2 text-gray-600">
            Acesse o painel administrativo
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="jamaaw-input pl-10"
                  placeholder="admin@jamaaw.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="jamaaw-input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="jamaaw-button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Entrando...</span>
              </div>
            ) : (
              'Entrar'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Esqueceu sua senha?{' '}
              <button
                type="button"
                className="font-medium text-black hover:text-gray-700"
                onClick={() => {
                  // Implementar recuperação de senha se necessário
                  alert('Entre em contato com o administrador do sistema')
                }}
              >
                Recuperar senha
              </button>
            </p>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Acesso restrito a administradores autorizados
          </p>
        </div>
      </div>
    </div>
  )
}

