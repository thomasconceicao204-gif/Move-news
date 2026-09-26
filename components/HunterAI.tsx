
import React, { useState, useEffect } from 'react';
import { Lead } from '../types';

interface HunterAIProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

const HunterAI: React.FC<HunterAIProps> = ({ notify }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [credits, setCredits] = useState(5);

  const mockLeads: Partial<Lead>[] = [
    { platform: 'twitter', content: 'Alguém conhece um designer bom e barato em Luanda? Preciso de logo urgente!', category: 'Design', budget: '$50 - $100' },
    { platform: 'linkedin', content: 'A nossa empresa de logística está à procura de freelancers para gestão de redes sociais. Envie portfólio.', category: 'Marketing', budget: '$300/mês' },
    { platform: 'instagram', content: 'Preciso de um site simples para a minha loja de roupa. #WebDev #Luanda', category: 'Dev', budget: '$200' },
    { platform: 'twitter', content: 'Quem faz edição de vídeo para YouTube? Tenho canal de gaming a crescer.', category: 'Video', budget: '$40/video' },
    { platform: 'linkedin', content: 'Procuramos copywriter para emails de vendas. Projeto pontual.', category: 'Copy', budget: '$150' },
  ];

  const toggleScan = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      notify("Scanner Hunter AI ativado. Varrimento de redes iniciado...", "info");
    } else {
      notify("Scanner pausado.", "info");
    }
  };

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      interval = setInterval(() => {
        // Simular a descoberta de um novo lead
        const randomLead = mockLeads[Math.floor(Math.random() * mockLeads.length)];
        const newLead: Lead = {
          id: Date.now().toString(),
          platform: randomLead.platform as any,
          username: `user_${Math.floor(Math.random() * 9999)}`,
          content: randomLead.content || '',
          category: randomLead.category as any,
          budget: randomLead.budget,
          timeAgo: 'Agora mesmo',
          confidence: Math.floor(Math.random() * (99 - 80) + 80)
        };
        
        setLeads(prev => [newLead, ...prev]);
        
        // Parar scan automaticamente se tiver muitos leads para não spammar
        if (leads.length > 8) setIsScanning(false);
        
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isScanning, leads]);

  const unlockLead = (leadId: string) => {
    if (credits <= 0) {
      notify("Créditos Hunter insuficientes. Adquira mais no painel.", "error");
      return;
    }
    setCredits(prev => prev - 1);
    setLeads(prev => prev.filter(l => l.id !== leadId)); // Remove da lista de "locked" (simulação)
    notify("Lead desbloqueado com sucesso! Contato enviado para o seu email.", "success");
    // Aqui a plataforma ganharia a comissão ou taxa do crédito gasto
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      
      {/* Header / Control Center */}
      <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 border border-emerald-500/20 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="max-w-xl">
               <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-emerald-500 animate-ping' : 'bg-slate-600'}`}></div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    {isScanning ? 'Varrimento de Rede Ativo' : 'Sistema em Standby'}
                  </span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
                 HUNTER <span className="text-emerald-500">AI</span>
               </h2>
               <p className="text-slate-300 text-lg leading-relaxed">
                 O nosso agente de IA vasculha Twitter, LinkedIn e Instagram em tempo real para encontrar clientes que precisam dos seus serviços agora.
               </p>
           </div>

           <div className="text-center">
              <div className="glass p-6 rounded-3xl mb-4 border border-emerald-500/30 bg-emerald-900/10">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seus Créditos Hunter</p>
                 <p className="text-4xl font-black text-white">{credits}</p>
              </div>
              <button 
                onClick={toggleScan}
                className={`w-full py-4 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
                    isScanning 
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                }`}
              >
                {isScanning ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Parar Scan
                    </>
                ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      Iniciar Busca
                    </>
                )}
              </button>
           </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <span className="text-2xl">📡</span> Radar de Oportunidades
                 </h3>
                 <span className="text-xs text-slate-500 font-mono">
                   {leads.length} leads encontrados
                 </span>
              </div>

              {leads.length === 0 && !isScanning && (
                  <div className="glass p-12 rounded-[3rem] text-center border-dashed border-2 border-slate-800">
                      <p className="text-slate-500 text-sm">Inicie o scanner para encontrar clientes em tempo real.</p>
                  </div>
              )}

              <div className="space-y-4">
                  {leads.map((lead) => (
                      <div key={lead.id} className="glass p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group animate-in slide-in-from-left-4">
                          <div className="flex items-start justify-between gap-4">
                              <div className="flex gap-4">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                                      lead.platform === 'twitter' ? 'bg-sky-500/20 text-sky-400' :
                                      lead.platform === 'instagram' ? 'bg-pink-500/20 text-pink-400' :
                                      'bg-blue-600/20 text-blue-400'
                                  }`}>
                                      {lead.platform === 'twitter' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>}
                                      {lead.platform === 'instagram' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                      {lead.platform === 'linkedin' && <span className="font-bold">in</span>}
                                  </div>
                                  <div>
                                      <div className="flex items-center gap-2 mb-1">
                                          <span className="text-white font-bold text-sm">@{lead.username}</span>
                                          <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full uppercase tracking-wider">{lead.timeAgo}</span>
                                      </div>
                                      <p className="text-slate-300 text-sm leading-relaxed mb-3">"{lead.content}"</p>
                                      <div className="flex flex-wrap gap-2">
                                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 font-bold uppercase">{lead.category}</span>
                                          {lead.budget && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-bold uppercase">{lead.budget}</span>}
                                          <span className="text-[10px] text-indigo-400 px-2 py-1 font-bold">Confiança IA: {lead.confidence}%</span>
                                      </div>
                                  </div>
                              </div>
                              <button 
                                onClick={() => unlockLead(lead.id)}
                                className="bg-white hover:bg-slate-200 text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all shrink-0"
                              >
                                  Desbloquear
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="space-y-6">
              <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-indigo-900/20 border border-white/5">
                  <h4 className="font-black text-white mb-4">Como funciona?</h4>
                  <ul className="space-y-4">
                      <li className="flex gap-3 text-sm text-slate-400">
                          <span className="text-emerald-500 font-bold">1.</span>
                          O Hunter AI escaneia palavras-chave ("preciso de", "procuro", "orçamento") em posts públicos.
                      </li>
                      <li className="flex gap-3 text-sm text-slate-400">
                          <span className="text-emerald-500 font-bold">2.</span>
                          Filtramos spam e bots para mostrar apenas clientes reais.
                      </li>
                      <li className="flex gap-3 text-sm text-slate-400">
                          <span className="text-emerald-500 font-bold">3.</span>
                          Você usa 1 crédito para desbloquear o contato direto e fechar o negócio.
                      </li>
                  </ul>
                  <button className="w-full mt-6 py-3 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                      Comprar Mais Créditos
                  </button>
              </div>

              <div className="glass p-6 rounded-2xl border border-rose-500/20 bg-rose-900/5">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                      <p className="text-xs font-bold text-rose-400 uppercase">Dica Pro</p>
                  </div>
                  <p className="text-slate-400 text-xs">
                      Responda rápido! Leads contatados nos primeiros 15 minutos têm 80% mais chance de fechar negócio.
                  </p>
              </div>
          </div>
      </div>

    </div>
  );
};

export default HunterAI;
