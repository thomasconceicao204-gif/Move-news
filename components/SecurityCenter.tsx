
import React, { useState, useEffect, useCallback } from 'react';

interface SecurityLog {
  id: string;
  event: string;
  ip: string;
  time: string;
  status: 'safe' | 'blocked' | 'warning' | 'critical';
}

interface NotificationChannel {
  name: string;
  status: 'active' | 'offline' | 'alerting';
  type: 'SMS' | 'Email' | 'Push' | 'Secure-Webhook';
}

const SecurityCenter: React.FC = () => {
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [threatLevel, setThreatLevel] = useState(12); // 0-100
  const [logs, setLogs] = useState<SecurityLog[]>([
    { id: '1', event: 'SSL Check Success', ip: '192.168.1.1', time: 'Agora', status: 'safe' },
    { id: '2', event: 'Tentativa de Login (Angola)', ip: '105.172.10.4', time: 'há 2m', status: 'safe' },
    { id: '3', event: 'Injeção SQL Bloqueada', ip: '45.12.88.9', time: 'há 15m', status: 'blocked' },
    { id: '4', event: 'Acesso Administrativo', ip: '102.65.2.11', time: 'há 1h', status: 'safe' },
  ]);

  const [channels, setChannels] = useState<NotificationChannel[]>([
    { name: 'SMS Emergência (+244)', status: 'active', type: 'SMS' },
    { name: 'Admin Email Principal', status: 'active', type: 'Email' },
    { name: 'Nova Move App Push', status: 'active', type: 'Push' },
    { name: 'Secure Backend Webhook', status: 'active', type: 'Secure-Webhook' },
  ]);

  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [criticalAlertVisible, setCriticalAlertVisible] = useState(false);

  // Sistema de monitorização de ameaças "Real-Time"
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(prev => {
        const variance = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : -2) : 0;
        const next = Math.max(5, Math.min(100, prev + variance));
        
        // Se o nível de ameaça subir organicamente acima de 80, alertar
        if (next > 80 && !isSimulatingAttack) {
          triggerEmergencyAlert("Anomalia de Tráfego Detectada");
        }
        
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isSimulatingAttack]);

  const triggerEmergencyAlert = useCallback((reason: string) => {
    setCriticalAlertVisible(true);
    setChannels(prev => prev.map(c => ({ ...c, status: 'alerting' })));
    
    const newLog: SecurityLog = {
      id: Date.now().toString(),
      event: `🚨 ALERTA CRÍTICO: ${reason.toUpperCase()}`,
      ip: 'Detectado via Heurística',
      time: 'Agora',
      status: 'critical'
    };
    setLogs(prev => [newLog, ...prev]);
  }, []);

  const simulateSecurityBreach = () => {
    setIsSimulatingAttack(true);
    setThreatLevel(98);
    triggerEmergencyAlert("Tentativa de Brute Force em Massa");

    // Simulando o envio de notificações ao criador
    setTimeout(() => {
      setIsSimulatingAttack(false);
      setThreatLevel(20);
      setChannels(prev => prev.map(c => ({ ...c, status: 'active' })));
      // Mantemos o alerta visual até ser fechado pelo usuário (criador)
    }, 5000);
  };

  const closeAlert = () => {
    setCriticalAlertVisible(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 relative">
      
      {/* Overlay de Alerta Crítico Global */}
      {criticalAlertVisible && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-xl animate-pulse"></div>
          <div className="relative glass-alert w-full max-w-md bg-slate-900/90 border-2 border-rose-500 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(244,63,94,0.3)] animate-in zoom-in-95">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-rose-500/50">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Intrusão Detectada!</h3>
                <p className="text-slate-400 text-sm mt-2 font-medium">
                  O sistema de defesa bloqueou o acesso. O Criador da plataforma já foi notificado por todos os canais de emergência.
                </p>
              </div>
              
              <div className="w-full space-y-2">
                {channels.map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-[10px] font-black text-slate-500 uppercase">{c.type}</span>
                    <span className="text-xs font-bold text-slate-200">{c.name}</span>
                    <span className="text-[9px] font-black text-rose-500 animate-pulse">ALERTING...</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={closeAlert}
                className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
              >
                Reconhecer e Neutralizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Status Header */}
      <div className={`glass p-10 rounded-[3rem] border-2 transition-all duration-700 ${threatLevel > 70 ? 'border-rose-500 shadow-2xl shadow-rose-500/40 bg-rose-950/10' : 'border-emerald-500/30 shadow-xl'}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="relative">
            {/* Animated Shield Radar */}
            <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-700 ${threatLevel > 70 ? 'border-rose-500 animate-pulse scale-110' : 'border-emerald-500'}`}>
              <svg className={`w-16 h-16 transition-colors duration-700 ${threatLevel > 70 ? 'text-rose-500' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className={`absolute -top-2 -right-2 p-1 rounded-full border-4 border-slate-900 transition-colors ${threatLevel > 70 ? 'bg-rose-600' : 'bg-emerald-500'}`}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" /></svg>
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">
              STATUS DE DEFESA: {threatLevel > 70 ? <span className="text-rose-500">CRÍTICO</span> : <span className="text-emerald-500">PROTEGIDO</span>}
            </h2>
            <p className="text-slate-400 mt-2 font-medium max-w-xl">
              Monitorização ativa 24/7. O sistema "Sentinel" está a analisar padrões de tráfego e integridade criptográfica em tempo real.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
               {channels.map((c, i) => (
                 <div key={i} className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                   <span className={`w-2 h-2 rounded-full ${c.status === 'alerting' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
                   <span className="text-[10px] font-black text-slate-300 uppercase">{c.type}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 min-w-[200px] text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Nível de Risco Ativo</p>
            <p className={`text-4xl font-black transition-all duration-700 ${threatLevel > 70 ? 'text-rose-500 scale-110' : 'text-emerald-500'}`}>
              {threatLevel}%
            </p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${threatLevel > 70 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                style={{ width: `${threatLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Logs */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center justify-between px-2">
             <h3 className="text-lg font-bold text-white flex items-center space-x-2">
               <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
               <span>Logs de Auditoria Forense</span>
             </h3>
             <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Exportar CSV</button>
           </div>
           <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5 max-h-[500px] overflow-y-auto custom-scrollbar">
              <div className="divide-y divide-white/5">
                {logs.map((log) => (
                  <div key={log.id} className={`p-5 flex items-center justify-between hover:bg-white/5 transition-all group ${log.status === 'critical' ? 'bg-rose-500/5 animate-pulse' : ''}`}>
                    <div className="flex items-center space-x-4">
                       <div className={`w-2.5 h-2.5 rounded-full ${
                         log.status === 'safe' ? 'bg-emerald-500' : 
                         log.status === 'blocked' ? 'bg-rose-500' : 
                         log.status === 'critical' ? 'bg-rose-600' : 'bg-amber-500'
                       } ${log.status === 'critical' ? 'animate-ping' : ''}`}></div>
                       <div>
                         <p className={`text-sm font-bold ${log.status === 'critical' ? 'text-rose-500' : 'text-white'}`}>{log.event}</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{log.ip} • {log.time}</p>
                       </div>
                    </div>
                    {log.status === 'critical' && (
                       <span className="bg-rose-600 text-white text-[8px] font-black px-2 py-1 rounded-lg">ALERTA DISPARADO</span>
                    )}
                    {log.status === 'blocked' && (
                       <span className="bg-slate-800 text-slate-400 text-[8px] font-black px-2 py-1 rounded-lg">NEUTRALIZADO</span>
                    )}
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Creator Notification Panel */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-[2.5rem] border border-indigo-500/20 bg-indigo-950/5">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center justify-between">
                <span>Painel do Criador</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </h4>
              <div className="space-y-6">
                {channels.map((chan, idx) => (
                  <div key={idx} className="flex items-center space-x-4 group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${chan.status === 'alerting' ? 'bg-rose-500 animate-bounce' : 'bg-slate-800'}`}>
                      {chan.type === 'SMS' && <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      {chan.type === 'Email' && <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      {chan.type === 'Push' && <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      {chan.type === 'Secure-Webhook' && <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">{chan.name}</p>
                      <p className={`text-[10px] font-bold uppercase ${chan.status === 'alerting' ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`}>
                        {chan.status === 'alerting' ? 'Notificando...' : 'Status: Conectado'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] border border-rose-500/30 bg-rose-950/10">
              <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest mb-4 italic">Protocolo de Resposta</h4>
              <p className="text-[10px] text-slate-400 mb-6 leading-relaxed">
                Ao detectar intrusão, a plataforma entra em modo "Cold Wallet" (desativa transações externas) e isola o IP atacante até validação manual do Criador.
              </p>
              
              <button 
                onClick={simulateSecurityBreach}
                disabled={isSimulatingAttack || criticalAlertVisible}
                className="w-full bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 text-white py-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center space-x-2 shadow-xl shadow-rose-600/30 mb-4 uppercase tracking-widest active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                <span>Simular Alerta Real</span>
              </button>

              <div className="flex items-center justify-center space-x-2 opacity-50">
                 <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                 <p className="text-[9px] font-black text-slate-400 uppercase">Acesso Reservado ao Criador</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
