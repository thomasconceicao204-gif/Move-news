
import React, { useState, useEffect } from 'react';

interface IncomeCenterProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface PaidAd {
  id: string;
  brand: string;
  title: string;
  reward: number;
  duration: number; // seconds
  thumbnail: string;
  category: string;
}

interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  commission: number;
  price: number;
  sold: number;
  image: string;
}

const IncomeCenter: React.FC<IncomeCenterProps> = ({ notify }) => {
  const [balance, setBalance] = useState(18.50);
  
  // Ad Watch State
  const [activeAd, setActiveAd] = useState<PaidAd | null>(null);
  const [adProgress, setAdProgress] = useState(0);
  const [isAdPlaying, setIsAdPlaying] = useState(false);

  // Sharing State
  const [sharingProduct, setSharingProduct] = useState<AffiliateProduct | null>(null);
  const [socialPlatform, setSocialPlatform] = useState<'whatsapp' | 'facebook' | 'twitter' | 'linkedin'>('whatsapp');

  const tasks = [
    { id: 1, title: 'Avaliar App parceiro (KwanzaPay)', reward: '$2.50', time: '3 min', difficulty: 'Fácil', icon: '📱' },
    { id: 2, title: 'Assistir Tutorial de Trading', reward: '$1.00', time: '10 min', difficulty: 'Fácil', icon: '📺' },
    { id: 3, title: 'Cliente Oculto Online (Site de Moda)', reward: '$15.00', time: '20 min', difficulty: 'Médio', icon: '🕵️' },
    { id: 4, title: 'Criar Artigo sobre Fintech em África', reward: '$25.00', time: '1 hora', difficulty: 'Difícil', icon: '✍️' },
  ];

  const affiliateProducts: AffiliateProduct[] = [
    { 
      id: 'prod1',
      name: 'Curso Marketing Digital AO', 
      description: 'Aprenda a vender no Facebook e Instagram em Angola.',
      commission: 12.00, 
      price: 40.00, 
      sold: 120,
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 'prod2',
      name: 'Ebook Importação China', 
      description: 'Guia passo a passo para importar do Alibaba.',
      commission: 5.00, 
      price: 15.00, 
      sold: 850,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 'prod3',
      name: 'Mentoria Forex Elite', 
      description: 'Sinais diários e aulas ao vivo com traders profissionais.',
      commission: 25.00, 
      price: 100.00, 
      sold: 45,
      image: 'https://images.unsplash.com/photo-1611974714658-66d2f13ee9a2?auto=format&fit=crop&q=80&w=800'
    },
  ];

  const paidAds: PaidAd[] = [
    { 
      id: 'ad1', 
      brand: 'Unitel Money', 
      title: 'A nova forma de pagar em Angola', 
      reward: 0.50, 
      duration: 15, 
      category: 'Finanças',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 'ad2', 
      brand: 'Coca-Cola', 
      title: 'Sinta o sabor do verão', 
      reward: 0.35, 
      duration: 10, 
      category: 'Lifestyle',
      thumbnail: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 'ad3', 
      brand: 'Binance Africa', 
      title: 'Cripto para todos - Tutorial', 
      reward: 1.20, 
      duration: 30, 
      category: 'Crypto',
      thumbnail: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleStartTask = (taskName: string) => {
    notify(`Iniciando tarefa: ${taskName}. Siga as instruções.`, "info");
  };

  // Logic for playing ads
  const handleWatchAd = (ad: PaidAd) => {
    setActiveAd(ad);
    setAdProgress(0);
    setIsAdPlaying(true);
  };

  useEffect(() => {
    let interval: any;
    if (isAdPlaying && activeAd) {
      interval = setInterval(() => {
        setAdProgress((prev) => {
          const increment = 100 / activeAd.duration;
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            finishAd();
            return 100;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAdPlaying, activeAd]);

  const finishAd = () => {
    setIsAdPlaying(false);
    if (activeAd) {
        const newBalance = balance + activeAd.reward;
        setBalance(newBalance);
        notify(`Parabéns! Você ganhou $${activeAd.reward.toFixed(2)} assistindo ao anúncio da ${activeAd.brand}.`, "success");
        setTimeout(() => {
            setActiveAd(null);
            setAdProgress(0);
        }, 1000); // Small delay to close modal
    }
  };

  const cancelAd = () => {
    setIsAdPlaying(false);
    setActiveAd(null);
    setAdProgress(0);
    notify("Visualização cancelada. Nenhuma recompensa creditada.", "error");
  };

  // Logic for Sharing
  const handleOpenShare = (product: AffiliateProduct) => {
    setSharingProduct(product);
  };

  const handleCopyLink = () => {
    if (!sharingProduct) return;
    const link = `novamove.pro/ref/u882/${sharingProduct.id}`;
    navigator.clipboard.writeText(link);
    notify("Link de afiliado copiado! Cole nas suas redes sociais.", "success");
  };

  const handleSimulateShare = () => {
    if (!sharingProduct) return;
    notify(`Redirecionando para o ${socialPlatform.charAt(0).toUpperCase() + socialPlatform.slice(1)}... Publicação criada!`, "success");
    setSharingProduct(null);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white italic tracking-tight">RENDA EXTRA <span className="text-emerald-500">TURBO</span></h2>
          <p className="text-slate-400 text-sm mt-1">Realize micro-tarefas, venda como afiliado ou assista anúncios para lucrar.</p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Saldo Acumulado</p>
            <p className="text-3xl font-black text-emerald-400 animate-in zoom-in">${balance.toFixed(2)}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* Paid Ads Section */}
      <div className="relative">
         <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-[2.5rem] blur-xl"></div>
         <div className="glass p-8 rounded-[2.5rem] border border-amber-500/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
               <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">🎬</span> Cine Lucro (Anúncios Pagos)
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Marcas pagam para você assistir. Nós dividimos esse lucro consigo.
                  </p>
               </div>
               <div className="bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Patrocinadores Ativos: {paidAds.length}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {paidAds.map((ad) => (
                  <div key={ad.id} className="group relative bg-slate-900/50 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-amber-500/10">
                     <div className="aspect-video relative overflow-hidden">
                        <img src={ad.thumbnail} alt={ad.brand} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-bold flex items-center gap-1">
                           <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           {ad.duration}s
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-xl scale-0 group-hover:scale-100 transition-transform duration-300">
                              <svg className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                           </div>
                        </div>
                     </div>
                     <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                           <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{ad.brand}</p>
                           <span className="text-white font-black bg-emerald-500/20 px-2 py-0.5 rounded text-xs border border-emerald-500/20">+${ad.reward.toFixed(2)}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm line-clamp-1">{ad.title}</h4>
                        <button 
                           onClick={() => handleWatchAd(ad)}
                           className="w-full mt-4 bg-white/5 hover:bg-amber-500 hover:text-slate-900 text-slate-300 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                           Assistir para Ganhar
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Affiliate Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🤝</span> Afiliação Premium
          </h3>
          <div className="glass rounded-[2.5rem] p-6 border border-white/5 bg-gradient-to-br from-slate-900 to-indigo-900/10 h-full">
             <p className="text-slate-400 text-sm mb-6">Promova produtos e ganhe até 30% de comissão. Use seus links nas redes sociais.</p>
             
             <div className="space-y-4">
                {affiliateProducts.map((prod) => (
                  <div key={prod.id} className="bg-slate-950/50 p-4 rounded-2xl border border-white/5 flex gap-4 group hover:border-indigo-500/30 transition-all">
                     <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                       <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between">
                        <div>
                           <p className="text-white font-bold text-sm line-clamp-1">{prod.name}</p>
                           <p className="text-[10px] text-slate-500 mt-1">{prod.sold} Vendas Totais</p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                           <div>
                              <p className="text-[10px] text-slate-500 uppercase">Comissão</p>
                              <p className="text-emerald-400 font-black text-sm">${prod.commission.toFixed(2)}</p>
                           </div>
                           <button 
                             onClick={() => handleOpenShare(prod)}
                             className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-1"
                           >
                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                             Partilhar
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Micro-Tasks Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>⚡</span> Tarefas Rápidas
          </h3>
          <div className="space-y-3">
             {tasks.map((task) => (
               <div key={task.id} className="glass p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                     <div className="text-2xl">{task.icon}</div>
                     <div>
                       <p className="text-white font-bold text-sm">{task.title}</p>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">{task.time}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                            task.difficulty === 'Fácil' ? 'bg-emerald-500/10 text-emerald-400' : 
                            task.difficulty === 'Médio' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>{task.difficulty}</span>
                       </div>
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-black text-lg">{task.reward}</p>
                    <button 
                      onClick={() => handleStartTask(task.title)}
                      className="mt-1 bg-white text-slate-950 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors"
                    >
                      Começar
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>

      </div>

      {/* Ad Player Modal */}
      {activeAd && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
             <div className="w-full max-w-4xl h-full md:h-auto md:aspect-video bg-black relative flex flex-col items-center justify-center md:rounded-3xl overflow-hidden border border-slate-800">
                {/* Simulated Video Content */}
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <img src={activeAd.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
                    <div className="z-10 text-center animate-pulse">
                        <p className="text-amber-500 font-black text-xl mb-2">PUBLICIDADE PATROCINADA</p>
                        <h2 className="text-4xl text-white font-bold">{activeAd.brand}</h2>
                        <p className="text-slate-300 mt-2">{activeAd.title}</p>
                    </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent z-20">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">Assistindo para ganhar: <span className="text-emerald-400">${activeAd.reward.toFixed(2)}</span></span>
                        <span className="text-xs font-mono text-slate-400">
                            {Math.floor((activeAd.duration * (adProgress/100)))}s / {activeAd.duration}s
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-amber-500 transition-all duration-1000 ease-linear"
                           style={{ width: `${adProgress}%` }}
                        ></div>
                    </div>
                </div>

                <button 
                  onClick={cancelAd}
                  className="absolute top-6 right-6 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-30"
                >
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
          </div>
      )}

      {/* Social Sharing Modal */}
      {sharingProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSharingProduct(null)}></div>
          <div className="relative glass w-full max-w-lg rounded-[2.5rem] p-6 animate-in zoom-in-95 border border-white/10 shadow-2xl">
             <div className="text-center mb-6">
               <h3 className="text-xl font-black text-white">Partilhar Link de Afiliado</h3>
               <p className="text-slate-400 text-sm mt-1">Ganhe ${sharingProduct.commission.toFixed(2)} por cada venda realizada através do seu link.</p>
             </div>

             <div className="bg-slate-900/50 p-4 rounded-2xl flex items-center gap-4 mb-6 border border-white/5">
                <img src={sharingProduct.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                   <p className="text-white font-bold text-sm">{sharingProduct.name}</p>
                   <p className="text-emerald-400 font-black text-xs">Sua Comissão: ${sharingProduct.commission.toFixed(2)}</p>
                </div>
             </div>

             <div className="space-y-4">
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Escolha a Plataforma</p>
                  <div className="grid grid-cols-4 gap-2">
                     {['whatsapp', 'facebook', 'twitter', 'linkedin'].map((platform) => (
                        <button
                          key={platform}
                          onClick={() => setSocialPlatform(platform as any)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                            socialPlatform === platform 
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white hover:border-slate-600'
                          }`}
                        >
                          {/* Simple Icons using text/emoji for demo */}
                          <span className="text-xl capitalize">
                            {platform === 'whatsapp' ? '💬' : platform === 'facebook' ? '📘' : platform === 'twitter' ? '🐦' : '💼'}
                          </span>
                        </button>
                     ))}
                  </div>
               </div>

               <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Mensagem Sugerida</p>
                  <p className="text-slate-300 text-xs italic">
                    "Olha só esta oportunidade incrível: {sharingProduct.name}! Eu uso e recomendo. Compra pelo meu link seguro: novamove.pro/ref/u882/{sharingProduct.id}"
                  </p>
               </div>

               <div className="flex gap-3 mt-4">
                  <button 
                    onClick={handleCopyLink}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    Copiar Link
                  </button>
                  <button 
                    onClick={handleSimulateShare}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    Publicar Agora
                  </button>
               </div>
             </div>

             <button onClick={() => setSharingProduct(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white p-2">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default IncomeCenter;
