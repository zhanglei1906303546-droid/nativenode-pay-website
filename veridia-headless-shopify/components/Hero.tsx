'use client';

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#f3f4f6] -mt-[80px]">
      <div className="absolute inset-0 z-0 bg-[#f3f4f6]">
        <img 
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="relative z-10 px-6 md:px-20 pt-[80px] max-w-2xl text-left">
        <h2 className="text-5xl md:text-7xl font-serif text-gray-900 leading-[1.1] mb-6">
          Results you <br />
          <span className="italic">can feel.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg">
          Personalized vitamins and supplements for your skin, body, hair, and mood.
        </p>
        <button 
          onClick={() => window.location.href = '/quiz'}
          className="bg-[#e10098] text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-black transition-colors shadow-lg uppercase font-montserrat"
        >
          Start your quiz
        </button>
      </div>
    </section>
  );
}