'use client';

import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del municipio */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Municipio de Santo Domingo Albarradas</h3>
            <p className="text-gray-300 text-sm mb-4">
              Administración 2024-2027. Información oficial y documentos públicos para la comunidad.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Palacio Municipal, Santo Domingo Albarradas, Oaxaca</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:santodomingo_albarradas@hotmail.com" className="hover:text-yellow-400">
                  santodomingo_albarradas@hotmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Facebook size={16} />
                <a 
                  href="https://www.facebook.com/SantoDomingoAlbarradas/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400"
                >
                  /SantoDomingoAlbarradas
                </a>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/transparencia" className="text-gray-300 hover:text-yellow-400">
                  Transparencia
                </Link>
              </li>
              <li>
                <Link href="/documentos" className="text-gray-300 hover:text-yellow-400">
                  Documentos oficiales
                </Link>
              </li>
              <li>
                <Link href="/avisos" className="text-gray-300 hover:text-yellow-400">
                  Avisos y convocatorias
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-yellow-400">
                  Acceso administrador
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios o información adicional */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horario de atención</h3>
            <p className="text-gray-300 text-sm">
              Lunes a Viernes: 9:00 AM - 3:00 PM<br />
              Sábados y Domingos: Cerrado
            </p>
            <p className="text-gray-300 text-sm mt-4">
              Para trámites y consultas, acudir al palacio municipal en horario laboral.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Municipio de Santo Domingo Albarradas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}