import { PRODUCTS } from '@/lib/mock-data';
import { ChevronRight } from 'lucide-react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import ScrollingTicker from '@/components/ScrollingTicker';
import ProductList from '@/components/ProductList';
import Hero from '@/components/Hero';
import ExpertAdvice from '@/components/ExpertAdvice';
import CategoryGrid from '@/components/CategoryGrid';
import BestsellersSlider from '@/components/BestsellersSlider';

export default async function HomePage() {
  const products = PRODUCTS.map(p => ({
    node: {
      id: p.id,
      title: p.title,
      handle: p.handle,
      description: p.description,
      images: {
        edges: [{ node: { url: p.image, altText: p.title } }]
      },
      priceRange: {
        minVariantPrice: { amount: p.price.toString(), currencyCode: 'USD' }
      }
    }
  }));

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <AnnouncementBar />
      <Navbar />
      <Hero />

      <ScrollingTicker />
      <ExpertAdvice />
      <CategoryGrid />

      <BestsellersSlider products={products} />

      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h1 className="text-3xl font-black tracking-tighter mb-6 font-montserrat">Veridia</h1>
            <p className="text-sm text-gray-400 leading-relaxed font-montserrat">
              Premium personalized nutrition, science-backed and clinically proven.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6 font-montserrat">Explore</h5>
            <div className="flex flex-col gap-4 text-[13px] font-bold text-gray-500 font-montserrat">
              <a href="#" className="hover:text-black">Shop All</a>
              <a href="#" className="hover:text-black">Take the Quiz</a>
              <a href="#" className="hover:text-black">Our Science</a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6 font-montserrat">Support</h5>
            <div className="flex flex-col gap-4 text-[13px] font-bold text-gray-500 font-montserrat">
              <a href="#" className="hover:text-black">FAQ</a>
              <a href="#" className="hover:text-black">Track Order</a>
              <a href="#" className="hover:text-black">Contact Us</a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6 font-montserrat">Newsletter</h5>
            <p className="text-xs text-gray-400 mb-4 font-montserrat">Stay updated with latest wellness tips.</p>
            <div className="flex border-b border-black pb-2">
              <input type="email" placeholder="Email address" className="bg-transparent border-none text-sm w-full outline-none font-montserrat" />
              <ChevronRight className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase font-montserrat">
          &copy; 2026 Veridia Health. All rights reserved.
        </div>
      </footer>
    </div>
  );
}