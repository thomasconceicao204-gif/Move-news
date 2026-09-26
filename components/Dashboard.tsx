
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import FinancialGoalsWidget from './FinancialGoalsWidget';

interface DashboardProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface WithdrawalMethod {
  id: string;
  name: string;
  icon: string;
  type: 'local' | 'international';
  placeholder: string;
}

interface SoldProduct {
  name: string;
  type: 'Curso' | 'eBook' | 'Mentoria';
  sales: number;
  revenue: string;
  icon: string;
}

const Dashboard: React.FC<DashboardProps> = ({ notify }) => {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod | null>(null);
  const [withdrawalDetail, setWithdrawalDetail] = useState('');
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState('');

  const stats = [
    { label: 'Vendas Brutas (Total)', value: '$4,850.20', trend: '+15% este mês', color: 'text-slate-400' },
    { label: 'Comissão Plataforma (5%)', value: '-$242.51', trend: 'Processamento Seguro', color: 'text-rose-400' },
    { label: 'Saldo Disponível', value: '$4,607.69', trend: 'Pronto para Saque', color: 'text-emerald-400' },
    { label: 'Vendas nas últimas 24h', value: '$320.00', trend: '12 novas vendas', color: 'text-amber-400' },
  ];

  const soldProducts: SoldProduct[] = [
    { name: 'Masterclass: Vendas no Facebook em Angola', type: 'Curso', sales: 154, revenue: '$770.00', icon: '📱' },
    { name: 'Guia de Importação: Da China para Luanda', type: 'eBook', sales: 312, revenue: '$1,560.00', icon: '🚢' },
    { name: 'Mentoria: Criador de Conteúdo Viral', type: 'Mentoria', sales: 24, revenue: '$1,200.00', icon: '🎬' },
    { name: 'Estratégias de Dropshipping Nacional', type: 'Curso', sales: 98, revenue: '$490.00', icon: '📦' },
  ];

  const withdrawalMethods: WithdrawalMethod[] = [
    { id: 'express', name: 'Multicaixa Express', icon: '📱', type: 'local', placeholder: '9XXXXXXXX (Número de Telefone)' },
    { id: 'bai', name: 'Banco BAI', icon: '🏦', type: 'local', placeholder: 'AO06 0040 XXXX XXXX XXXX X' },
    { id: 'bfa', name: 'Banco BFA', icon: '🏦', type: 'local', placeholder: 'AO06 0006 XXXX XXXX XXXX X' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', type: 'international', placeholder: 'seu-email@exemplo.com' },
    { id: 'airtm', name: 'Airtm', icon: '☁️', type: 'international', placeholder: 'Username ou Email Airtm' },
  ];

  const generateImpactImage = async () => {
    // @ts-ignore
    if (window.aistudio) {
       // @ts-ignore
       const hasKey = await window.aistudio.hasSelectedApiKey();
       if (!hasKey) {
         // @ts-ignore
         await window.aistudio.openSelectKey();
         notify("Por favor, selecione sua chave de API para continuar.", "info");
         return;
       }
    }

    setIsGeneratingImage(true);
    setGenerationStep('Analizando tendências de mercado...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      setGenerationStep('Construindo visão futurista...');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [
            {
              text: 'A professional and inspiring technological landscape representing African entrepreneurship. Elements of digital finance, mobile phones showing profit graphs, glowing virtual cards with "Nova Move" logo, and abstract shapes of the African continent in deep indigo, emerald green and gold. 8k resolution, cinematic lighting, sleek fintech aesthetic.',
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        },
      });

      setGenerationStep('Finalizando detalhes visuais...');

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setGeneratedImageUrl(`data:image/png;base64,${base64Data}`);
          notify("Visual gerado com sucesso!", "success");
          break;
        }
      }
    } catch (error) {
      console.error("Erro na geração:", error);
      notify("Não foi possível gerar a imagem no momento. Tente novamente.", "error");
    } finally {
      setIsGeneratingImage(false);
      setGenerationStep('');
    }
  };

  const handleWithdraw = () => {
    if (!selectedMethod || !withdrawalDetail) {
      notify("Selecione um método e preencha os dados.", "error");
      return;
    }
    
    // Simulação de sucesso
    setShowWithdrawalModal(false);
    setSelectedMethod(null);
    setWithdrawalDetail('');
    notify(`Saque de $4,607.69 solicitado via ${selectedMethod.name}.`, "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Visual Hero / Brand Banner */}
      <div className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden group shadow-2xl">
        {generatedImageUrl ? (
          <img 
            src={generatedImageUrl} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            alt="Nova Move Pro Impact Visual"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-8 text-center relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4 z-10">
               NOVA MOVE <span className="text-indigo-500">PRO</span>
             </h2>
             <p className="text-slate-400 text-sm md:text-base max-w-lg font-medium z-10">
               Transformando a ambição jovem na maior economia digital de África.
             </p>
             
             {!isGeneratingImage && (
               <button 
                 onClick={generateImpactImage}
                 className="mt-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all z-10 flex items-center space-x-2"
               >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 <span>Atualizar Visual AI</span>
               </button>
             )}
          </div>
        )}

        {isGeneratingImage && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-lg flex flex-col items-center justify-center z-20">
             <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
             <p className="text-white font-black text-xl animate-pulse">{generationStep}</p>
          </div>
        )}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-[2rem] hover:border-white/20 transition-all cursor-default relative overflow-hidden group">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/5 ${stat.color}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Goals & Monthly Savings Progress Widget */}
      <FinancialGoalsWidget notify={notify} availableBalance={4607.69} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products & History */}
        <div className="lg:col-span-2 space-y-8">
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-white px-2 flex items-center gap-2">
                <span>📦</span>
                Seu Inventário de Sucesso
              </h3>
              <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] font-black text-slate-500 uppercase">
                      <tr>
                        <th className="px-6 py-4">Produto Ativo</th>
                        <th className="px-6 py-4 text-center">Volume</th>
                        <th className="px-6 py-4 text-right">Líquido (95%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {soldProducts.map((prod, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{prod.icon}</span>
                              <div>
                                <p className="text-sm font-bold text-slate-200 group-hover:text-white">{prod.name}</p>
                                <p className="text-[9px] text-slate-500 font-black uppercase">{prod.type}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-white">{prod.sales}</td>
                          <td className="px-6 py-4 text-right font-black text-emerald-400">{prod.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="text-lg font-bold text-white px-2">🕒 Histórico Recente de Retiradas</h3>
              <div className="glass rounded-[2.5rem] overflow-hidden divide-y divide-white/5 border border-white/5">
                {[
                  { method: 'Multicaixa Express', date: 'Hoje, 09:20', amount: '$450.00', status: 'Concluído', icon: '📱' },
                  { method: 'Banco BAI', date: 'Ontem, 15:45', amount: '$1,200.00', status: 'Concluído', icon: '🏦' },
                  { method: 'PayPal', date: '22 Abr, 10:12', amount: '$85.00', status: 'Concluído', icon: '🅿️' },
                ].map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-5 hover:bg-white/5 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">{h.icon}</div>
                      <div>
                        <p className="text-sm font-bold text-white">{h.method}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">{h.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">{h.amount}</p>
                      <p className="text-[9px] text-emerald-500 font-bold uppercase">{h.status}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-[2.5rem] border border-indigo-500/20 text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Saldo pronto para levantar</p>
              <p className="text-4xl font-black text-white mb-6">$4,607.69</p>
              <button 
                onClick={() => setShowWithdrawalModal(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center space-x-2 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                <span>Levantar Ganhos</span>
              </button>
           </div>

           <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-indigo-950/20 border-white/5">
              <h4 className="font-black text-white mb-4">Suporte ao Empreendedor</h4>
              <p className="text-xs text-slate-400 mb-6 italic leading-relaxed">
                "Nosso objetivo é garantir que 95% do lucro do seu esforço chegue às suas mãos o mais rápido possível."
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <span className="text-[10px] font-bold text-slate-300 uppercase">Verificação Imediata</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <span className="text-[10px] font-bold text-slate-300 uppercase">Saques em menos de 24h</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => { setShowWithdrawalModal(false); setSelectedMethod(null); }}></div>
          <div className="relative glass w-full max-w-xl rounded-[3rem] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border-white/10 shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-white/5">
              <h3 className="text-2xl font-black text-white">Retirar Lucros</h3>
              <p className="text-slate-400 text-sm mt-1">Selecione para onde deseja enviar o seu capital.</p>
            </div>

            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Escolha o Destino</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {withdrawalMethods.map(method => (
                    <button 
                      key={method.id}
                      onClick={() => { setSelectedMethod(method); setWithdrawalDetail(''); }}
                      className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2 ${
                        selectedMethod?.id === method.id 
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl scale-[1.02]' 
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <span className="text-[9px] font-black text-center uppercase">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedMethod && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Dados da Conta</h4>
                  <input 
                    type="text"
                    placeholder={selectedMethod.placeholder}
                    value={withdrawalDetail}
                    onChange={(e) => setWithdrawalDetail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
                  />
                  <p className="text-[9px] text-slate-500 mt-2">Certifique-se que os dados estão corretos para processamento rápido.</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-900/50 border-t border-white/5">
               <button 
                disabled={!selectedMethod || !withdrawalDetail}
                onClick={handleWithdraw}
                className={`w-full py-5 rounded-2xl font-black transition-all text-sm uppercase tracking-widest ${
                  selectedMethod && withdrawalDetail
                    ? 'bg-white text-slate-950 shadow-2xl active:scale-95 hover:bg-slate-200' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
               >
                 Confirmar Levantamento
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
