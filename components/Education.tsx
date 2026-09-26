
import React, { useState } from 'react';
import { Product, ProductType } from '../types';

interface EducationProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface PaymentOption {
  id: string;
  name: string;
  type: 'local' | 'international';
  icon?: string;
  color: string;
}

const Education: React.FC<EducationProps> = ({ notify }) => {
  const [activeTab, setActiveTab] = useState<'explorar' | 'meus-conteudos'>('explorar');
  const [filterType, setFilterType] = useState<'todos' | 'curso' | 'ebook'>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // State for user details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 'blogger-elite', 
      title: 'Blogger de Elite: Consistência e Audiência Global', 
      author: 'Mauro dos Santos', 
      type: 'curso',
      price: 15.00,
      isPurchased: false,
      thumbnail: 'https://images.unsplash.com/photo-1493723843671-1d655e7d98f0?auto=format&fit=crop&q=80&w=800', 
      category: 'Digital',
      rating: 4.9,
      salesCount: 4200,
      youtubeId: 'q8UfS-8fH-w'
    },
    { 
      id: 'vendas-facebook', 
      title: 'O Rei das Vendas no Facebook Ads (Foco Angola)', 
      author: 'Elisângela Santos', 
      type: 'curso',
      price: 25.00,
      isPurchased: false,
      thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800', 
      category: 'Marketing',
      rating: 5.0,
      salesCount: 1540
    },
    { 
      id: 'ebook-china', 
      title: 'Ebook: O Guia Definitivo da Importação da China', 
      author: 'Arnaldo Kwanza', 
      type: 'ebook',
      price: 10.00,
      isPurchased: false,
      thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800', 
      category: 'Negócios',
      rating: 4.8,
      salesCount: 8900,
      pages: 124
    },
    { 
      id: 'tiktok-viral', 
      title: 'Fórmula TikTok: Viralizando do Zero em África', 
      author: 'Bruna Digital', 
      type: 'curso',
      price: 12.00,
      isPurchased: false,
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800', 
      category: 'Social',
      rating: 4.7,
      salesCount: 3100
    },
    { 
      id: 'forex-ao', 
      title: 'Trading de Elite: Consistência no Mercado Cambial', 
      author: 'Dário Silva', 
      type: 'curso',
      price: 50.00,
      isPurchased: false,
      thumbnail: 'https://images.unsplash.com/photo-1611974714658-66d2f13ee9a2?auto=format&fit=crop&q=80&w=800', 
      category: 'Finanças',
      rating: 4.9,
      salesCount: 560
    },
    { 
      id: 'design-canva', 
      title: 'Ebook: Design Irresistível usando apenas o Canva', 
      author: 'Inês Design', 
      type: 'ebook',
      price: 5.00,
      isPurchased: false,
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800', 
      category: 'Design',
      rating: 4.6,
      salesCount: 12400,
      pages: 65
    },
  ]);

  const paymentOptions: PaymentOption[] = [
    { id: 'express', name: 'Multicaixa Express', type: 'local', color: 'bg-blue-600' },
    { id: 'bai', name: 'Banco BAI', type: 'local', color: 'bg-indigo-900' },
    { id: 'bfa', name: 'Banco BFA', type: 'local', color: 'bg-orange-600' },
    { id: 'paypal', name: 'PayPal', type: 'international', color: 'bg-blue-500' },
    { id: 'mastercard', name: 'MasterCard / Visa', type: 'international', color: 'bg-slate-700' },
  ];

  const handleOpenPayment = (product: Product) => {
    setSelectedProduct(product);
    setCustomerName('');
    setCustomerPhone('');
    setIsPaymentModalOpen(true);
  };

  const confirmPurchase = (method: string) => {
    if (!selectedProduct) return;
    
    if (!customerName || !customerPhone) {
        notify("Por favor, preencha o Nome e o Telefone para emissão do recibo.", 'error');
        return;
    }

    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, isPurchased: true } : p));
    setIsPaymentModalOpen(false);
    
    notify(`Pagamento confirmado via ${method}! O conteúdo foi adicionado à sua biblioteca.`, 'success');
    setSelectedProduct(null);
  };

  const handleDownload = (title: string) => {
    notify(`Iniciando download do arquivo: ${title}...`, 'success');
  };

  const filteredProducts = products.filter(p => {
    const tabMatch = activeTab === 'explorar' || p.isPurchased;
    const typeMatch = filterType === 'todos' || p.type === filterType;
    return tabMatch && typeMatch;
  });

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight italic">EDUCAÇÃO <span className="text-indigo-500">PRO</span></h2>
          <p className="text-slate-400 text-sm mt-1">Conhecimento real para gerar renda real no mercado atual.</p>
        </div>
        
        <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 flex">
          <button 
            onClick={() => setActiveTab('explorar')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'explorar' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Explorar Loja
          </button>
          <button 
            onClick={() => setActiveTab('meus-conteudos')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'meus-conteudos' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Meus Cursos
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {['todos', 'curso', 'ebook'].map(t => (
          <button 
            key={t}
            onClick={() => setFilterType(t as any)} 
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              filterType === t ? 'bg-white text-slate-950 border-white' : 'text-slate-500 border-slate-800 hover:border-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="group glass rounded-[2.5rem] overflow-hidden flex flex-col border border-white/5 hover:border-indigo-500/50 transition-all bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/20 hover:from-slate-800/80 hover:to-slate-900/40 hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="relative aspect-square overflow-hidden">
              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                 <span className="text-yellow-400 text-xs">⭐</span>
                 <span className="text-white text-xs font-bold">{p.rating}</span>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                 <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                   p.type === 'curso' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                 }`}>
                   {p.type}
                 </span>
                 <h3 className="text-lg font-bold text-white mt-2 leading-tight drop-shadow-md">{p.title}</h3>
                 <p className="text-xs text-slate-300 mt-1 font-medium">{p.author}</p>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 relative">
              <div className="flex items-center justify-between mb-4 text-xs text-slate-400 font-medium">
                 <span>{p.category}</span>
                 <span>{p.salesCount ? `${(p.salesCount / 1000).toFixed(1)}k alunos` : 'Novo'}</span>
              </div>

              {p.type === 'ebook' && p.pages && (
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      <span>{p.pages} Páginas</span>
                  </div>
              )}

              <div className="mt-auto space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white">${p.price.toFixed(2)}</span>
                    {p.isPurchased && (
                        <span className="text-emerald-400 text-[10px] font-black uppercase flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            Adquirido
                        </span>
                    )}
                 </div>

                 {p.isPurchased ? (
                   p.type === 'ebook' ? (
                     <button 
                       onClick={() => handleDownload(p.title)}
                       className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
                     >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                       Baixar eBook
                     </button>
                   ) : (
                     <button className="w-full py-3 bg-white text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-lg active:scale-95">
                       Acessar Aula
                     </button>
                   )
                 ) : (
                   <button 
                     onClick={() => handleOpenPayment(p)}
                     className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                   >
                     Comprar Agora
                   </button>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPaymentModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsPaymentModalOpen(false)}></div>
          <div className="relative glass w-full max-w-lg rounded-[2.5rem] p-8 animate-in zoom-in-95 border border-white/10 shadow-2xl">
             <div className="flex items-start gap-4 mb-6">
                <img src={selectedProduct.thumbnail} className="w-20 h-20 rounded-xl object-cover" alt="" />
                <div>
                  <h3 className="text-xl font-black text-white">{selectedProduct.title}</h3>
                  <p className="text-emerald-400 font-bold text-lg">${selectedProduct.price.toFixed(2)}</p>
                </div>
             </div>
             
             <div className="space-y-4 mb-6">
               <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome no Recibo</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 mt-1"
                    placeholder="Seu nome completo"
                  />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Telemóvel (WhatsApp)</label>
                  <input 
                    type="tel" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 mt-1"
                    placeholder="+244..."
                  />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-3 mb-6">
               {paymentOptions.map(option => (
                 <button 
                   key={option.id}
                   onClick={() => confirmPurchase(option.name)}
                   className={`${option.color} hover:opacity-90 text-white p-3 rounded-xl flex flex-col items-center justify-center transition-all active:scale-95`}
                 >
                   <span className="text-[10px] font-black uppercase text-center">{option.name}</span>
                 </button>
               ))}
             </div>
             
             <button onClick={() => setIsPaymentModalOpen(false)} className="w-full py-3 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
               Cancelar Compra
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
