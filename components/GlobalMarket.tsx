
import React, { useState } from 'react';

interface GlobalMarketProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface GlobalStore {
  id: string;
  name: string;
  category: 'Tech' | 'Retalho' | 'Atacado' | 'Moda';
  logo: string;
  color: string;
  description: string;
  isConnected: boolean;
  perks: string[];
}

const GlobalMarket: React.FC<GlobalMarketProps> = ({ notify }) => {
  const [activeTab, setActiveTab] = useState<'lojas' | 'dropshipping'>('lojas');
  
  const [stores, setStores] = useState<GlobalStore[]>([
    {
      id: 'amazon-intl',
      name: 'Amazon Internacional',
      category: 'Retalho',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
      color: 'bg-white',
      description: 'Acesse milhões de produtos com entrega global. Eletrônicos, livros e tecnologia.',
      isConnected: false,
      perks: ['Envio Prioritário', 'Pagamento em 1-Click', 'Integração FBA']
    },
    {
      id: 'alibaba',
      name: 'Alibaba Atacado',
      category: 'Atacado',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Alibaba_Group_logo.svg/1200px-Alibaba_Group_logo.svg.png',
      color: 'bg-white',
      description: 'Importe stock diretamente de fabricantes na China para o seu negócio em África.',
      isConnected: false,
      perks: ['Cotações Diretas', 'Trade Assurance', 'Dropshipping']
    },
    {
      id: 'apple',
      name: 'Apple Store EUA',
      category: 'Tech',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
      color: 'bg-white',
      description: 'Compre iPhones, MacBooks e acessórios oficiais diretamente da fonte.',
      isConnected: false,
      perks: ['Produtos Originais', 'Lançamentos', 'Garantia Global']
    },
    {
      id: 'aliexpress',
      name: 'AliExpress',
      category: 'Retalho',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Aliexpress_logo.svg/2560px-Aliexpress_logo.svg.png',
      color: 'bg-white',
      description: 'Ideal para testar produtos e dropshipping unitário com baixo custo.',
      isConnected: true,
      perks: ['Proteção ao Comprador', 'Milhões de Itens', 'Envio Económico']
    },
    {
      id: 'ebay',
      name: 'eBay Global',
      category: 'Retalho',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png',
      color: 'bg-white',
      description: 'Encontre tecnologia, peças de carros e itens raros de vendedores mundiais.',
      isConnected: false,
      perks: ['Leilões', 'Peças Raras', 'Proteção PayPal']
    },
     {
      id: 'shein',
      name: 'SHEIN',
      category: 'Moda',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/SHEIN_logo.svg/2560px-SHEIN_logo.svg.png',
      color: 'bg-black',
      description: 'Tendências de moda a preços acessíveis. Ótimo para revenda local.',
      isConnected: false,
      perks: ['Moda Rápida', 'Descontos Bulk', 'Tendências']
    }
  ]);

  const handleConnect = (storeId: string) => {
    // Simular conexão
    notify("Iniciando protocolo de conexão segura...", "info");
    
    setTimeout(() => {
        setStores(prev => prev.map(store => 
            store.id === storeId 
            ? { ...store, isConnected: !store.isConnected }
            : store
        ));
        
        const storeName = stores.find(s => s.id === storeId)?.name;
        const isNowConnected = !stores.find(s => s.id === storeId)?.isConnected;
        
        if (isNowConnected) {
            notify(`Cartão Virtual Nova Move vinculado com sucesso à ${storeName}!`, "success");
        } else {
            notify(`Desvinculado da ${storeName}.`, "info");
        }
    }, 1500);
  };

  const handleShopNow = (url: string) => {
      notify("A redirecionar para a loja parceira através de proxy seguro...", "info");
      // Aqui abriria a URL real numa nova aba
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Hero Banner */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-indigo-900 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center p-6">
              <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-2">
                O MUNDO É <span className="text-orange-400">SEU STOCK</span>
              </h2>
              <p className="text-slate-200 text-sm md:text-base max-w-lg font-medium">
                Conecte os seus cartões virtuais Nova Move diretamente às maiores lojas do planeta. Compre tecnologia, moda e equipamentos sem barreiras.
              </p>
          </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4">
          <button 
             onClick={() => setActiveTab('lojas')}
             className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'lojas' ? 'bg-white text-slate-950 shadow-xl' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
          >
             Grandes Lojas
          </button>
          <button 
             onClick={() => setActiveTab('dropshipping')}
             className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'dropshipping' ? 'bg-white text-slate-950 shadow-xl' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
          >
             Dropshipping Hub
          </button>
      </div>

      {/* Stores Grid */}
      {activeTab === 'lojas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
                <div key={store.id} className="group glass rounded-[2.5rem] p-8 flex flex-col items-center text-center hover:border-indigo-500/30 transition-all relative overflow-hidden">
                    {store.isConnected && (
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            Conectado
                        </div>
                    )}
                    
                    <div className={`w-24 h-24 rounded-full ${store.color} p-4 flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                        <img src={store.logo} alt={store.name} className="max-w-full max-h-full object-contain" />
                    </div>

                    <h3 className="text-xl font-black text-white mb-2">{store.name}</h3>
                    <p className="text-slate-400 text-xs mb-6 leading-relaxed min-h-[40px]">{store.description}</p>
                    
                    <div className="w-full bg-slate-900/50 rounded-xl p-3 mb-6">
                        <p className="text-[9px] text-slate-500 uppercase font-bold mb-2">Vantagens Nova Move</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {store.perks.map((perk, i) => (
                                <span key={i} className="text-[9px] bg-white/5 text-slate-300 px-2 py-1 rounded-md border border-white/5">{perk}</span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto w-full flex gap-3">
                        <button 
                           onClick={() => handleConnect(store.id)}
                           className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition-all ${store.isConnected ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg'}`}
                        >
                           {store.isConnected ? 'Desconectar' : 'Conectar'}
                        </button>
                        {store.isConnected && (
                            <button 
                               onClick={() => handleShopNow(store.id)}
                               className="flex-1 bg-white text-slate-950 py-3 rounded-xl font-black text-xs uppercase tracking-wide hover:bg-slate-200 transition-colors"
                            >
                                Acessar
                            </button>
                        )}
                    </div>
                </div>
            ))}
          </div>
      )}

      {activeTab === 'dropshipping' && (
          <div className="glass rounded-[3rem] p-12 text-center border border-indigo-500/20 bg-gradient-to-b from-indigo-900/10 to-slate-950">
             <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/30">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
             </div>
             <h3 className="text-3xl font-black text-white mb-4">Nova Move Dropship Engine</h3>
             <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                 Estamos a desenvolver uma ferramenta que sincroniza produtos do AliExpress e Alibaba diretamente com a sua loja Shopify ou WooCommerce. O pagamento será processado automaticamente pelo seu cartão Nova Move.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 text-left">
                     <span className="text-2xl">⚡</span>
                     <div>
                         <p className="text-white font-bold text-sm">Automação Total</p>
                         <p className="text-slate-500 text-xs">Processamento de pedidos sem mãos.</p>
                     </div>
                 </div>
                 <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 text-left">
                     <span className="text-2xl">📦</span>
                     <div>
                         <p className="text-white font-bold text-sm">Rastreio em Tempo Real</p>
                         <p className="text-slate-500 text-xs">Da China para o cliente final.</p>
                     </div>
                 </div>
             </div>
             <button className="mt-8 bg-white/5 text-slate-300 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors cursor-not-allowed">
                 Brevemente Disponível
             </button>
          </div>
      )}

      <div className="glass p-6 rounded-2xl flex items-center justify-between border border-white/5">
         <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
                 <p className="text-white font-bold text-sm">Cotação do Dólar Comercial</p>
                 <p className="text-slate-400 text-xs">Atualizado a cada 60s para compras internacionais.</p>
             </div>
         </div>
         <div className="text-right">
             <p className="text-emerald-400 font-black text-xl">1 USD = 850 AOA</p>
             <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Spread 2.5%</p>
         </div>
      </div>

    </div>
  );
};

export default GlobalMarket;
