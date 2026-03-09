'use client';

import { useDocumentos } from "@/app/context/DocumentContext";
import DocumentTable from '@/app/components/DocumentTable';
import Link from 'next/link';
import { FileText, Bell, Users, Scale } from 'lucide-react';

export default function Home() {
  const { documentos } = useDocumentos();

  // Tomamos algunos documentos recientes para mostrarlos en inicio
  const documentosRecientes = [...documentos].slice(0, 5);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Santo Domingo Albarradas
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Órgano oficial de información pública del municipio. Transparencia, documentos y avisos para la comunidad.
          </p>
        </div>
      </section>

      {/* Tarjetas de secciones */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/transparencia" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Scale className="w-12 h-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Transparencia</h2>
            <p className="text-gray-600">Información financiera, presupuestos y obligaciones de transparencia.</p>
          </Link>

          <Link href="/documentos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FileText className="w-12 h-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Documentos</h2>
            <p className="text-gray-600">Reglamentos, manuales, organigramas y documentos oficiales.</p>
          </Link>

          <Link href="/avisos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Bell className="w-12 h-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Avisos</h2>
            <p className="text-gray-600">Convocatorias, comunicados y notificaciones importantes.</p>
          </Link>

          <Link href="/estructura" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Estructura</h2>
            <p className="text-gray-600">Organigrama, funciones y directorio del ayuntamiento.</p>
          </Link>
        </div>
      </section>

      {/* Documentos recientes */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Documentos recientes</h2>
            <Link href="/documentos" className="text-yellow-600 hover:text-yellow-700 font-medium">
              Ver todos →
            </Link>
          </div>
          <DocumentTable documentos={documentosRecientes} />
        </div>
      </section>
    </div>
  );
}