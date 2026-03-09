'use client';

import { useDocumentos } from '../context/DocumentContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Documento } from '../types/index';
import { ArrowLeft, Plus, Edit, Trash2, Save } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const { documentos, agregarDocumento, editarDocumento, eliminarDocumento } = useDocumentos();
  const [editando, setEditando] = useState<Documento | null>(null);
  const [nuevo, setNuevo] = useState(false);
  const router = useRouter();

  const validarPassword = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAutenticado(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Acceso Administrador</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={validarPassword}
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const handleGuardarNuevo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoDoc: Omit<Documento, 'id'> = {
      modulo: formData.get('modulo') as string,
      titulo: formData.get('titulo') as string,
      fecha: formData.get('fecha') as string,
      semestre: parseInt(formData.get('semestre') as string) as 1 | 2,
      archivo: formData.get('archivo') as string,
    };
    agregarDocumento(nuevoDoc);
    setNuevo(false);
  };

  const handleEditar = (doc: Documento) => {
    setEditando(doc);
  };

  const handleGuardarEdicion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editando) return;
    const formData = new FormData(e.currentTarget);
    const cambios = {
      modulo: formData.get('modulo') as string,
      titulo: formData.get('titulo') as string,
      fecha: formData.get('fecha') as string,
      semestre: parseInt(formData.get('semestre') as string) as 1 | 2,
      archivo: formData.get('archivo') as string,
    };
    editarDocumento(editando.id, cambios);
    setEditando(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} /> Volver a la Gaceta
          </button>
          <button
            onClick={() => setNuevo(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <Plus size={18} /> Nuevo Documento
          </button>
        </div>

        {nuevo && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Documento</h2>
            <form onSubmit={handleGuardarNuevo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Módulo</label>
                <input name="modulo" required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input name="titulo" required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha (ej. 01 DE ENERO DE 2024)</label>
                <input name="fecha" required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Semestre</label>
                <select name="semestre" required className="w-full p-2 border border-gray-300 rounded">
                  <option value="1">Primer Semestre</option>
                  <option value="2">Segundo Semestre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Archivo (ruta o URL)</label>
                <input name="archivo" required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Guardar
                </button>
                <button type="button" onClick={() => setNuevo(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {editando && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Editar Documento</h2>
            <form onSubmit={handleGuardarEdicion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Módulo</label>
                <input name="modulo" defaultValue={editando.modulo} required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input name="titulo" defaultValue={editando.titulo} required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input name="fecha" defaultValue={editando.fecha} required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Semestre</label>
                <select name="semestre" defaultValue={editando.semestre} required className="w-full p-2 border border-gray-300 rounded">
                  <option value="1">Primer Semestre</option>
                  <option value="2">Segundo Semestre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Archivo</label>
                <input name="archivo" defaultValue={editando.archivo} required className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  <Save size={18} className="inline mr-1" /> Guardar Cambios
                </button>
                <button type="button" onClick={() => setEditando(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Módulo</th>
                <th className="px-4 py-2 text-left">Título</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Semestre</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((doc) => (
                <tr key={doc.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{doc.modulo}</td>
                  <td className="px-4 py-2">{doc.titulo.substring(0, 50)}...</td>
                  <td className="px-4 py-2">{doc.fecha}</td>
                  <td className="px-4 py-2">{doc.semestre === 1 ? 'Primer' : 'Segundo'}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleEditar(doc)} className="text-blue-600 hover:text-blue-800 mr-3">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => eliminarDocumento(doc.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}