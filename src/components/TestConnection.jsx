import { useState, useEffect } from 'react'
import { testConnection } from '../lib/database.js'

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkConnection() {
      try {
        const result = await testConnection()
        setConnectionStatus(result)
      } catch (error) {
        setConnectionStatus({
          success: false,
          message: `Erro inesperado: ${error.message}`
        })
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
  }, [])

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Testando conexão com Supabase...</p>
      </div>
    )
  }

  return (
    <div className={`p-4 rounded-lg ${
      connectionStatus?.success 
        ? 'bg-green-100 border border-green-300' 
        : 'bg-red-100 border border-red-300'
    }`}>
      <h3 className="font-semibold mb-2">
        Status da Conexão Supabase
      </h3>
      <p className={
        connectionStatus?.success 
          ? 'text-green-700' 
          : 'text-red-700'
      }>
        {connectionStatus?.message}
      </p>
      {connectionStatus?.success && (
        <p className="text-sm text-green-600 mt-1">
          ✅ Banco de dados configurado e acessível
        </p>
      )}
    </div>
  )
}

