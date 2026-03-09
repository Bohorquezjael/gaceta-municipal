'use client';

import { Documento } from '@/app/types';
import { FileText, Search } from 'lucide-react';
import { useState } from 'react';

interface Props {
  documentos: Documento[];
}

export default function DocumentTable({ documentos }: Props) {
  const [filtroSemestre, setFiltroSemestre] = useState<1 | 2 | 'todos'>('todos');
  const [busqueda, setBusqueda] = useState('');

  const documentosFiltrados = documentos.filter(doc => {
    const coincideSemestre = filtroSemestre === 'todos' || doc.semestre === filtroSemestre;
    const coincideBusqueda = doc.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      doc.modulo.includes(busqueda);
    return coincideSemestre && coincideBusqueda;
  });

  const primerSemestre = documentosFiltrados.filter(d => d.semestre === 1);
  const segundoSemestre = documentosFiltrados.filter(d => d.semestre === 2);

  const renderTabla = (docs: Documento[], titulo: string) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-yellow-500 pb-2">{titulo}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">MÓDULO</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">NOMBRE DEL DOCUMENTO</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">FECHA DE PUBLICACIÓN</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{doc.modulo}</td>
                <td className="px-4 py-2 text-sm text-gray-800 font-medium">{doc.titulo}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{doc.fecha}</td>
                <td className="px-4 py-2 text-sm">
                  <a
                    href={doc.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <FileText size={18} />
                    Ver PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFiltroSemestre('todos')}
            className={`px-4 py-2 rounded ${filtroSemestre === 'todos' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltroSemestre(1)}
            className={`px-4 py-2 rounded ${filtroSemestre === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            Primer Semestre
          </button>
          <button
            onClick={() => setFiltroSemestre(2)}
            className={`px-4 py-2 rounded ${filtroSemestre === 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            Segundo Semestre
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar documento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {primerSemestre.length > 0 && renderTabla(primerSemestre, 'PRIMER SEMESTRE')}
      {segundoSemestre.length > 0 && renderTabla(segundoSemestre, 'SEGUNDO SEMESTRE')}
      {documentosFiltrados.length === 0 && (
        <p className="text-center text-gray-500 py-8">No se encontraron documentos.</p>
      )}
    </div>
  );
}
