import { Inter } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/UI/WhatsAppButton';
import Header from '@/components/UI/Header';
import SmoothScroll from '@/components/UI/SmoothScroll';
import Navigation from '@/components/UI/Navigation';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Pixelpeak - Data-Driven Digital Marketing',
  description: 'Elevate your digital presence. Pixelpeak provides data-driven marketing powered by creative innovation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white selection:bg-teal-500 selection:text-white transition-colors duration-500 ease-in-out overflow-x-hidden w-full max-w-[100vw]`}>
        <SmoothScroll>
          <Navigation />
          <Header />
          {children}
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
