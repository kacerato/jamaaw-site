import { useState } from 'react'
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="jamaaw-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">
                JAMAAW
              </h1>
              <p className="text-xs text-gray-600 -mt-1">
                Remoção de Cabos
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#inicio"
                className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Início
              </a>
              <a
                href="#sobre"
                className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
              >
                Sobre
              </a>
              <a
                href="#mapa"
                className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
              >
                Mapa
              </a>
              <a
                href="#sugestoes"
                className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
              >
                Sugestões
              </a>
              <a
                href="#galeria"
                className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
              >
                Galeria
              </a>
              <a
                href="#noticias"
                className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
              >
                Notícias
              </a>
              <a
                href="#contato"
                className="text-gray-600 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
              >
                Contato
              </a>
            </div>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Maceió, AL</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>(82) 9999-9999</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <a
              href="#inicio"
              className="text-black hover:text-gray-600 block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Início
            </a>
            <a
              href="#sobre"
              className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Sobre
            </a>
            <a
              href="#mapa"
              className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Mapa
            </a>
            <a
              href="#sugestoes"
              className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Sugestões
            </a>
            <a
              href="#galeria"
              className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Galeria
            </a>
            <a
              href="#noticias"
              className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Notícias
            </a>
            <a
              href="#contato"
              className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Contato
            </a>
            
            {/* Mobile Contact Info */}
            <div className="px-3 py-2 border-t border-gray-200 mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>Maceió, Alagoas</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Phone className="h-4 w-4" />
                <span>(82) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>contato@jamaaw.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

