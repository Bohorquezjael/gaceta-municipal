import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
// Importaremos el Header y Footer después de crearlos
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Municipio de Santo Domingo Albarradas',
  description: 'Sitio oficial del Municipio de Santo Domingo Albarradas - Información y documentos públicos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}