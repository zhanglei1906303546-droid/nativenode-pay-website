import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Veridia | Headless Shopify Demo',
  description: 'Custom frontend connected to Shopify Storefront API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}