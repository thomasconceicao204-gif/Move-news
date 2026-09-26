
import React from 'react';
import { VirtualCard } from '../types';

interface VirtualCardsProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

const VirtualCards: React.FC<VirtualCardsProps> = ({ notify }) => {
  const cards: VirtualCard[] = [
    { id: '1', lastFour: '4582', balance: 120.50, type: 'Visa', expiry: '12/26', status: 'active' },
    { id: '2', lastFour: '9012', balance: 5.00, type: 'Mastercard', expiry: '08/25', status: 'frozen' },
  ];

  const handleAirtmReload = () => {
    notify("Redirecionando para autenticação segura no Airtm...", "info");
  };

  const handleNewCard = () => {
    notify("Funcionalidade em desenvolvimento. Brevemente disponível.", "info");
  };

  const handleCardAction = (status: string) => {
     if (status === 'active') {
       notify("Cartão congelado temporariamente.", "success");
     } else {
       notify("Cartão reativado com sucesso.", "success");
     }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Meus Cartões</h2>
          <p className="text-slate-400 text-sm">Financie seus cartões usando seu saldo Airtm.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleAirtmReload}
            className="flex items-center space-x-2 bg-cyan-600/20 border border-cyan-500/30 hover:bg-cyan-600/30 text-cyan-400 font-bold px-4 py-2 rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span>Recarregar via Airtm</span>
          </button>
          <button 
            onClick={handleNewCard}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Novo Cartão</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className={`relative group perspective-1000`}>
            <div className={`relative h-52 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 ${
              card.status === 'active' 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700' 
                : 'bg-slate-900/50 border border-slate-800 opacity-60'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Saldo Disponível</p>
                  <p className="text-2xl font-bold text-white">${card.balance.toFixed(2)}</p>
                </div>
                <div className="text-xl font-bold italic text-slate-600">{card.type}</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                   <div className="flex space-x-1">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>)}
                   </div>
                   <div className="flex space-x-1">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>)}
                   </div>
                   <div className="flex space-x-1">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>)}
                   </div>
                   <span className="text-lg font-mono text-slate-300 tracking-widest">{card.lastFour}</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Expira em</p>
                    <p className="text-sm font-medium text-slate-300">{card.expiry}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    card.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {card.status}
                  </div>
                </div>
              </div>

              {/* Hover actions */}
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-3">
                  <button className="bg-white text-slate-900 p-2 rounded-lg hover:bg-slate-200 transition-colors">
                    Ver Dados
                  </button>
                  <button 
                    onClick={() => handleCardAction(card.status)}
                    className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    {card.status === 'active' ? 'Congelar' : 'Ativar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Create Empty Placeholder */}
        <div 
          onClick={handleNewCard}
          className="h-52 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 hover:border-slate-700 hover:text-slate-400 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
             </svg>
          </div>
          <span className="mt-4 font-bold">Criar Cartão</span>
        </div>
      </div>

      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-4">Parceria Airtm</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex space-x-3">
             <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <div>
                <p className="font-bold text-slate-200">Conversão Direta</p>
                <p className="text-sm text-slate-400">Converta seus AirUSD diretamente para saldo no cartão Nova Move Pro sem taxas ocultas.</p>
             </div>
          </div>
          <div className="flex space-x-3">
             <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
             </div>
             <div>
                <p className="font-bold text-slate-200">Depósitos Automáticos</p>
                <p className="text-sm text-slate-400">Toda receita de vendas na plataforma é enviada para sua carteira Airtm em tempo real.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCards;
