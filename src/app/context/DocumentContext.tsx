'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Documento } from '../types/index';
import { documentosIniciales } from '../data/documentos';

interface DocumentContextType {
  documentos: Documento[];
  agregarDocumento: (doc: Omit<Documento, 'id'>) => void;
  editarDocumento: (id: string, doc: Partial<Documento>) => void;
  eliminarDocumento: (id: string) => void;
  cargarDocumentos: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const [documentos, setDocumentos] = useState<Documento[]>(() => {
    const stored = localStorage.getItem('gaceta-documentos');
    return stored ? JSON.parse(stored) : documentosIniciales;
  });

  // Guardar en localStorage cada vez que cambie el estado
  useEffect(() => {
    if (documentos.length > 0) {
      localStorage.setItem('gaceta-documentos', JSON.stringify(documentos));
    }
  }, [documentos]);

  const agregarDocumento = (nuevoDoc: Omit<Documento, 'id'>) => {
    const id = (documentos.length + 1).toString();
    setDocumentos([...documentos, { id, ...nuevoDoc }]);
  };

  const editarDocumento = (id: string, cambios: Partial<Documento>) => {
    setDocumentos(documentos.map(doc => (doc.id === id ? { ...doc, ...cambios } : doc)));
  };

  const eliminarDocumento = (id: string) => {
    setDocumentos(documentos.filter(doc => doc.id !== id));
  };

  const cargarDocumentos = () => {
    // Forzar recarga desde localStorage (útil después de importar)
    const stored = localStorage.getItem('gaceta-documentos');
    if (stored) setDocumentos(JSON.parse(stored));
  };

  return (
    <DocumentContext.Provider value={{ documentos, agregarDocumento, editarDocumento, eliminarDocumento, cargarDocumentos }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentos = () => {
  const context = useContext(DocumentContext);
  if (!context) throw new Error('useDocumentos debe usarse dentro de DocumentProvider');
  return context;
};
