
import React, { useState } from 'react';

interface SalesHubProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

const SalesHub: React.FC<SalesHubProps> = ({ notify }) => {
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const stats = [
    { label: 'Receita Total', value: '$12,450.00', trend: '+22% vs mês anterior', color: 'text-indigo-400', icon: '💰' },
    { label: 'Pedidos Hoje', value: '14', trend: '3 pendentes de envio', color: 'text-emerald-400', icon: '📦' },
    { label: 'Ticket Médio', value: '$45.00', trend: 'Estável', color: 'text-amber-400', icon: '🏷️' },
  ];

  const orders = [
    { id: '#ORD-9921', customer: 'Manuel Silva', product: 'Ebook Importação', amount: '$15.00', status: 'Concluído', date: 'Hoje, 10:23' },
    { id: '#ORD-9920', customer: 'Ana Paula', product: 'Mentoria Vip', amount: '$120.00', status: 'Processando', date: 'Hoje, 09:15' },
    { id: '#ORD-9919', customer: 'Carlos B.', product: 'Kit Branding', amount: '$50.00', status: 'Concluído', date: 'Ontem, 18:40' },
    { id: '#ORD-9918', customer: 'Joana D.', product: 'Curso Marketing', amount: '$25.00', status: 'Cancelado', date: 'Ontem, 14:20' },
  ];

  const handleCreateLink = () => {
    if (!productName || !productPrice) {
      notify('Preencha o nome e o preço do produto.', 'error');
      return;
    }
    const link = `https://novamove.pro/pay/u882/${Math.floor(Math.random() * 10000)}?item=${encodeURIComponent(productName)}&price=${productPrice}`;
    setGeneratedLink(link);
    notify('Link de pagamento gerado com sucesso!', 'success');
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      notify('Link copiado para a área de transferência!', 'success');
    }
  };

  const closeLinkModal = () => {
    setShowCreateLink(false);
    setProductName('');
    setProductPrice('');
    setGeneratedLink(null);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white italic tracking-tight">COMANDO DE <span className="text-indigo-500">VENDAS</span></h2>
          <p className="text-slate-400 text-sm mt-1">Gira o seu império digital. Crie links, acompanhe pedidos e escale.</p>
        </div>
        <div className="flex gap-3">
            <button 
              onClick={() => setShowCreateLink(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Link Rápido
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-3 rounded-xl transition-all border border-slate-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-[2rem] relative overflow-hidden group">
            <div className="flex justify-between items-start">
               <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</p>
                 <p className="text-[10px] text-slate-400 font-medium">{stat.trend}</p>
               </div>
               <div className="text-2xl bg-slate-900/50 p-3 rounded-xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales Chart (Simulated) */}
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-white/5">
           <h3 className="text-lg font-bold text-white mb-6">Performance de Vendas (7 Dias)</h3>
           <div className="h-64 flex items-end justify-between gap-2">
              {[45, 60, 35, 80, 55, 90, 75].map((h, i) => (
                <div key={i} className="w-full flex flex-col justify-end items-center group">
                  <div 
                    className="w-full bg-indigo-600/30 rounded-t-xl hover:bg-indigo-500 transition-all relative"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${h * 10}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-bold uppercase">Dia {i+1}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Quick Product Add */}
        <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-900/20 to-slate-950 border border-white/5">
           <h3 className="text-lg font-bold text-white mb-4">Top Produtos</h3>
           <div className="space-y-4">
              {[
                { name: 'Mentoria Vip', sold: 42, rev: '$5,040' },
                { name: 'Ebook Importação', sold: 150, rev: '$2,250' },
                { name: 'Kit Branding', sold: 85, rev: '$4,250' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                   <div>
                     <p className="text-sm font-bold text-white">{p.name}</p>
                     <p className="text-[10px] text-slate-500">{p.sold} vendas</p>
                   </div>
                   <p className="text-sm font-black text-indigo-400">{p.rev}</p>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-3 rounded-xl border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
             Ver Todos os Produtos
           </button>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Pedidos Recentes</h3>
          <input type="text" placeholder="Procurar pedido..." className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-[10px] font-black text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4 text-center">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-white">{order.customer}</td>
                  <td className="px-6 py-4 text-xs text-slate-300">{order.product}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-emerald-400">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                      order.status === 'Concluído' ? 'bg-emerald-500/10 text-emerald-400' :
                      order.status === 'Processando' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-rose-500/10 text-rose-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-[10px] text-slate-500 font-bold uppercase">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Link Modal */}
      {showCreateLink && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={closeLinkModal}></div>
          <div className="relative glass w-full max-w-md rounded-[2.5rem] p-8 animate-in zoom-in-95 border border-white/10 shadow-2xl">
             <h3 className="text-xl font-black text-white mb-6">Criar Link de Pagamento</h3>
             
             {!generatedLink ? (
               <div className="space-y-4">
                 <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome do Produto/Serviço</label>
                   <input 
                     type="text" 
                     value={productName}
                     onChange={(e) => setProductName(e.target.value)}
                     className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 mt-1"
                     placeholder="Ex: Consultoria 1h"
                   />
                 </div>
                 <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Preço (USD)</label>
                   <input 
                     type="number" 
                     value={productPrice}
                     onChange={(e) => setProductPrice(e.target.value)}
                     className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 mt-1"
                     placeholder="0.00"
                   />
                 </div>
                 <div className="mt-8 flex gap-3">
                   <button onClick={closeLinkModal} className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs uppercase">Cancelar</button>
                   <button onClick={handleCreateLink} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/20">Gerar Link</button>
                 </div>
               </div>
             ) : (
               <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-2">
                 <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-lg">{productName}</h4>
                   <p className="text-emerald-400 font-black text-2xl">${parseFloat(productPrice).toFixed(2)}</p>
                 </div>
                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 break-all text-xs text-slate-400 font-mono">
                   {generatedLink}
                 </div>
                 <div className="flex gap-3">
                   <button onClick={handleCopyLink} className="flex-1 bg-white text-slate-950 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-lg">
                     Copiar Link
                   </button>
                   <button onClick={() => setGeneratedLink(null)} className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-700 transition-colors">
                     Criar Novo
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      )}

    </div>
  );
};

export default SalesHub;
