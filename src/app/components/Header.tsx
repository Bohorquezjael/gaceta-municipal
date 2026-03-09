'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Transparencia', href: '/transparencia' },
    { name: 'Documentos', href: '/documentos' },
    { name: 'Avisos', href: '/avisos' },
  ];

  // Si estás en admin, no mostrar el header completo (opcional)
  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center text-white font-bold text-xl">
              {/* Placeholder para el logo - reemplaza con la imagen de Facebook */}
              <span>SDA</span>
              {/* Cuando tengas la imagen, usa:
              <Image 
                src="/logo-sda.png" 
                alt="Santo Domingo Albarradas" 
                fill
                className="object-cover"
              />
              */}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Santo Domingo</h1>
              <p className="text-sm text-gray-600">Albarradas</p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? 'text-yellow-600 border-b-2 border-yellow-500' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Botón de contacto / administración */}
          <div className="hidden md:block">
            <Link
              href="/admin"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors"
            >
              Administrar
            </Link>
          </div>

          {/* Botón móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-yellow-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-gray-700 hover:text-yellow-600 ${
                  pathname === item.href ? 'text-yellow-600 font-semibold' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md text-center"
              onClick={() => setIsOpen(false)}
            >
              Administrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}