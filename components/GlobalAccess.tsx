
import React, { useState, useEffect } from 'react';

interface GlobalAccessProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

const GlobalAccess: React.FC<GlobalAccessProps> = ({ notify }) => {
  const [vpnStatus, setVpnStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [kycVerified, setKycVerified] = useState(false);
  const [loadingKyc, setLoadingKyc] = useState(false);

  const regions = [
    { id: 'US', name: 'Estados Unidos', flag: '🇺🇸', ip: '104.22.14.89' },
    { id: 'UK', name: 'Reino Unido', flag: '🇬🇧', ip: '185.199.110.153' },
    { id: 'EU', name: 'União Europeia (DE)', flag: '🇪🇺', ip: '49.12.128.5' },
    { id: 'UAE', name: 'Dubai', flag: '🇦🇪', ip: '5.195.0.1' },
  ];

  const handleToggleVpn = () => {
    if (vpnStatus === 'connected') {
      setVpnStatus('disconnected');
      notify("Conexão segura encerrada. IP original restaurado.", "info");
    } else {
      setVpnStatus('connecting');
      setTimeout(() => {
        setVpnStatus('connected');
        const region = regions.find(r => r.id === selectedRegion);
        notify(`Nova ID Global ativa! Localização Virtual: ${region?.name}`, "success");
      }, 2000);
    }
  };

  const handleVerifyKyc = () => {
    setLoadingKyc(true);
    setTimeout(() => {
        setLoadingKyc(false);
        setKycVerified(true);
        notify("Passaporte Digital verificado com sucesso!", "success");
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Visual */}
      <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 border border-indigo-500/20 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl">
           <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
             ACESSO <span className="text-cyan-400">GLOBAL</span>
           </h2>
           <p className="text-slate-300 text-lg leading-relaxed">
             Quebre fronteiras digitais. Mascare a sua localização para aceder a serviços internacionais e valide a sua identidade para parceiros globais.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* IP Shield / VPN Simulator */}
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-cyan-500/20 relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                IP Shield Empresarial
              </h3>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  vpnStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50' : 
                  vpnStatus === 'connecting' ? 'bg-amber-500/10 text-amber-500 border-amber-500/50' :
                  'bg-slate-800 text-slate-500 border-slate-700'
              }`}>
                  {vpnStatus === 'connected' ? 'PROTEGIDO' : vpnStatus === 'connecting' ? 'CONECTANDO...' : 'INATIVO'}
              </div>
           </div>

           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    disabled={vpnStatus === 'connected'}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                        selectedRegion === region.id 
                        ? 'bg-cyan-900/20 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-600'
                    } ${vpnStatus === 'connected' && selectedRegion !== region.id ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                      <span className="text-3xl">{region.flag}</span>
                      <span className="text-[10px] font-black uppercase">{region.name}</span>
                  </button>
              ))}
           </div>

           <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
               {vpnStatus === 'connecting' && (
                   <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-20">
                       <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                   </div>
               )}
               
               {vpnStatus === 'connected' ? (
                   <div className="text-center animate-in zoom-in duration-300">
                       <p className="text-slate-400 text-xs font-bold uppercase mb-2">Sua Identidade Pública Atual</p>
                       <p className="text-3xl md:text-4xl font-black text-cyan-400 font-mono tracking-tight mb-2">
                           {regions.find(r => r.id === selectedRegion)?.ip}
                       </p>
                       <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                           Túnel Seguro Ativo
                       </p>
                   </div>
               ) : (
                   <div className="text-center opacity-50">
                       <p className="text-slate-500 text-xs font-bold uppercase mb-2">Endereço IP Real (Exposto)</p>
                       <p className="text-2xl font-black text-slate-300 font-mono tracking-tight">102.14.XXX.XXX</p>
                       <p className="text-rose-500 text-[10px] font-bold uppercase mt-2">Localização: Luanda, AO</p>
                   </div>
               )}
           </div>

           <button 
             onClick={handleToggleVpn}
             className={`w-full mt-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                 vpnStatus === 'connected' 
                 ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20' 
                 : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20'
             }`}
           >
               {vpnStatus === 'connected' ? 'Desativar Escudo' : 'Ativar Proteção Internacional'}
           </button>
        </div>

        {/* Digital Passport / KYC */}
        <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-900/20 to-slate-950 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Passaporte Digital</h3>
                
                <div className="relative z-10 bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xl">
                            NM
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Empreendedor Nova</p>
                            <p className="text-slate-400 text-[10px] uppercase">ID: 8829-1029-UK</p>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Status</span>
                            {kycVerified ? (
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    Verificado
                                </span>
                            ) : (
                                <span className="text-amber-400 font-bold">Pendente</span>
                            )}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Nível</span>
                            <span className="text-white font-bold">Gold Business</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Acesso</span>
                            <span className="text-white font-bold">Global (Tier 1)</span>
                        </div>
                    </div>
                </div>

                {!kycVerified ? (
                    <button 
                        onClick={handleVerifyKyc}
                        disabled={loadingKyc}
                        className="w-full bg-white text-slate-950 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
                    >
                        {loadingKyc ? 'Verificando...' : 'Verificar Identidade'}
                    </button>
                ) : (
                    <div className="text-center p-2 border border-emerald-500/30 bg-emerald-500/5 rounded-xl">
                        <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">
                            Passaporte Válido
                        </p>
                    </div>
                )}
            </div>

            <div className="glass p-6 rounded-3xl border border-white/5">
                <h4 className="font-bold text-white mb-4 text-sm">Ferramentas Úteis</h4>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-slate-900/50 rounded-xl hover:bg-slate-800 transition-colors group">
                        <span className="text-xs text-slate-300 font-medium">Gerador de Endereço EUA</span>
                        <span className="text-indigo-400 text-xs">Gerar</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-slate-900/50 rounded-xl hover:bg-slate-800 transition-colors group">
                        <span className="text-xs text-slate-300 font-medium">Número SMS Temporário</span>
                        <span className="text-indigo-400 text-xs">Gerar</span>
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalAccess;
