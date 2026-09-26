
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface MarketingHubProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

const MarketingHub: React.FC<MarketingHubProps> = ({ notify }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = "novamove.pro/join/angola-top-1";
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [platform, setPlatform] = useState<'instagram' | 'whatsapp' | 'linkedin'>('instagram');

  const stats = [
    { label: 'Cliques no Link', value: '1,240', color: 'text-indigo-400' },
    { label: 'Cadastros Confirmados', value: '45', color: 'text-emerald-400' },
    { label: 'Comissão Pendente', value: '$225.00', color: 'text-amber-400' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    notify("Link de embaixador copiado!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePost = async () => {
    setIsGenerating(true);
    setGeneratedPost("");
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Crie uma legenda curta, viral e persuasiva para o ${platform} promovendo a plataforma "Nova Move Pro". 
      Foco: Jovens empreendedores em África, ganhar dinheiro online, cartões virtuais. 
      Tom: Motivacional, urgente, use emojis. Inclua CTA para clicar no link na bio.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setGeneratedPost(response.text || "Junte-se à revolução digital em África com a Nova Move Pro! 🚀");
      notify("Conteúdo viral gerado com sucesso!", "success");
    } catch (error) {
      setGeneratedPost("🚀 Acelere o seu negócio com a Nova Move Pro! Cartões virtuais e renda extra em Angola. Clique no link!");
      notify("Modo offline ativado. Texto padrão gerado.", "info");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Hero Section */}
      <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-purple-900 to-slate-950 border border-purple-500/20 p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
           <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Motor Viral Ativo</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
             TORNE-SE UM <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">EMBAIXADOR</span>
           </h2>
           <p className="text-slate-300 max-w-xl text-lg leading-relaxed">
             Use nossa IA para criar conteúdo viral, partilhe seu link exclusivo e ganhe $5 por cada empreendedor que ativar a conta.
           </p>

           <div className="mt-8 bg-slate-900/50 p-2 rounded-2xl flex items-center max-w-md border border-white/10">
              <div className="flex-1 px-4 font-mono text-slate-300 text-sm truncate">
                {referralLink}
              </div>
              <button 
                onClick={handleCopy}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-purple-600/20"
              >
                {copied ? 'Copiado!' : 'Copiar Link'}
              </button>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* AI Content Generator */}
        <div className="glass p-8 rounded-[2.5rem] border border-purple-500/20">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <span>✨</span> Gerador de Posts Viral
           </h3>
           
           <div className="flex space-x-2 mb-6">
             {['instagram', 'whatsapp', 'linkedin'].map((p) => (
               <button
                 key={p}
                 onClick={() => setPlatform(p as any)}
                 className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                   platform === p ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                 }`}
               >
                 {p}
               </button>
             ))}
           </div>

           <div className="bg-slate-900/50 rounded-2xl p-6 min-h-[150px] border border-white/5 mb-6 relative">
             {isGenerating ? (
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
               </div>
             ) : (
               <p className="text-slate-300 text-sm whitespace-pre-wrap italic">
                 {generatedPost || "O seu texto gerado por IA aparecerá aqui..."}
               </p>
             )}
           </div>

           <button 
             onClick={generatePost}
             disabled={isGenerating}
             className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-purple-600/20 active:scale-95 flex items-center justify-center gap-2"
           >
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             Gerar Post Agora
           </button>
        </div>

        {/* Marketing Assets */}
        <div className="glass p-8 rounded-[2.5rem] border border-white/5">
           <h3 className="text-xl font-bold text-white mb-6">Materiais Oficiais</h3>
           <div className="space-y-4">
              {[
                { name: 'Stories Pack (5 Imagens)', size: '12MB', type: 'ZIP' },
                { name: 'Video Promocional 30s', size: '45MB', type: 'MP4' },
                { name: 'Logos & Identidade', size: '5MB', type: 'PNG' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5 hover:bg-slate-800 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-black text-[9px] text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                       {item.type}
                     </div>
                     <div>
                       <p className="text-white font-bold text-sm">{item.name}</p>
                       <p className="text-slate-500 text-xs">{item.size}</p>
                     </div>
                   </div>
                   <button className="text-purple-400 hover:text-white transition-colors">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   </button>
                </div>
              ))}
           </div>
           
           <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/20 rounded-2xl">
             <p className="text-purple-300 text-xs font-medium text-center">
               💡 Dica: Publique no TikTok entre 18h e 20h para maior alcance viral.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MarketingHub;
