"use client";

import { useDocumentos } from "@/app/context/DocumentContext";
import DocumentTable from "@/app/components/DocumentTable";

export default function AvisosPage() {
	const { documentos } = useDocumentos();
	// Filtrar avisos y convocatorias
	const avisosDocs = documentos.filter(
		(doc) =>
			doc.titulo.toLowerCase().includes("convocatoria") ||
			doc.titulo.toLowerCase().includes("aviso") ||
			doc.titulo.toLowerCase().includes("comunicado"),
	);

	return (
		<div className="bg-gray-50 min-h-screen py-10">
			<div className="max-w-6xl mx-auto px-4">
				<h1 className="text-3xl font-bold mb-2">Avisos y convocatorias</h1>
				<p className="text-gray-600 mb-8">
					Comunicados importantes para la comunidad.
				</p>

				<div className="bg-white rounded-lg shadow-md p-6">
					<DocumentTable documentos={avisosDocs} />
				</div>
			</div>
		</div>
	);
}
