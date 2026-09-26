
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { AppSection, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currency, setCurrency] = useState('AOA');
  const [lang, setLang] = useState('PT');

  const navItems = [
    { id: AppSection.Dashboard, label: 'Painel', icon: ICONS.Dashboard },
    { id: AppSection.Hunter, label: 'Hunter AI', icon: ICONS.Radar }, // Novo item
    { id: AppSection.Sales, label: 'Minhas Vendas', icon: ICONS.ShoppingBag },
    { id: AppSection.VirtualCards, label: 'Cartões', icon: ICONS.CreditCard },
    { id: AppSection.GlobalMarket, label: 'Mercado Global', icon: ICONS.Globe },
    { id: AppSection.GlobalAccess, label: 'Acesso Global', icon: ICONS.FingerPrint },
    { id: AppSection.Marketing, label: 'Viral Boost', icon: ICONS.Megaphone },
    { id: AppSection.Income, label: 'Renda Extra', icon: ICONS.Banknotes },
    { id: AppSection.Education, label: 'Educação', icon: ICONS.AcademicCap },
    { id: AppSection.Services, label: 'Serviços', icon: ICONS.Briefcase },
    { id: AppSection.AICoach, label: 'IA Coach', icon: ICONS.Sparkles },
    { 
      id: AppSection.Security, 
      label: 'Segurança', 
      icon: (props: any) => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.333 9-6.03 9-11.623 0-1.3-.243-2.543-.683-3.682A11.954 11.954 0 0112 2.714z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Mobile Nav - Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 px-2 py-2 flex justify-between items-center overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center p-2 min-w-[60px] rounded-xl transition-colors ${
              activeSection === item.id ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] mt-1 font-bold uppercase tracking-tight whitespace-nowrap">{item.label}</span>
          </button>
        ))}
        <button 
           onClick={() => setShowUserMenu(!showUserMenu)}
           className="flex flex-col items-center p-2 min-w-[60px] rounded-xl text-slate-400"
        >
           <img src={user.avatar} className="w-6 h-6 rounded-full border border-slate-600" alt="Me" />
           <span className="text-[9px] mt-1 font-bold uppercase tracking-tight">Eu</span>
        </button>
      </nav>
      
      {/* Mobile User Menu Overlay */}
      {showUserMenu && (
        <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-sm md:hidden flex items-end justify-center pb-24" onClick={() => setShowUserMenu(false)}>
           <div className="bg-slate-900 w-[90%] rounded-3xl border border-slate-800 p-6 shadow-2xl animate-in slide-in-from-bottom-10">
              <div className="flex items-center space-x-4 mb-6">
                 <img src={user.avatar} className="w-12 h-12 rounded-xl" alt="" />
                 <div>
                    <p className="text-white font-bold text-lg">{user.name}</p>
                    <p className="text-slate-400 text-xs">{user.email}</p>
                 </div>
              </div>
              <button onClick={onLogout} className="w-full bg-rose-500/10 text-rose-500 font-black py-4 rounded-xl border border-rose-500/20 uppercase text-xs tracking-widest">
                Terminar Sessão
              </button>
           </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 overflow-y-auto custom-scrollbar">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-bold italic">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Nova Move <span className="text-indigo-500">Pro</span></span>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass p-4 rounded-2xl border border-slate-800 mb-4">
             <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proteção Ativa</span>
             </div>
            <p className="text-xs text-slate-200 font-semibold mb-1">Seus dados estão encriptados.</p>
          </div>
          
          <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-3">
               <img src={user.avatar} className="w-8 h-8 rounded-lg border border-slate-700" alt="" />
               <div className="overflow-hidden">
                 <p className="text-xs font-bold text-white truncate w-24">{user.name}</p>
                 <button onClick={onLogout} className="text-[10px] text-rose-400 hover:text-rose-300 font-bold uppercase tracking-wide">Sair</button>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0 bg-slate-950">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
          <h1 className="text-xl font-bold text-white uppercase tracking-tight">
            {navItems.find(i => i.id === activeSection)?.label}
          </h1>
          <div className="flex items-center space-x-4">
            {/* International Settings (Language/Currency) */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
               <button 
                 onClick={() => setLang(lang === 'PT' ? 'EN' : 'PT')}
                 className="px-2 py-1 text-[10px] font-black text-slate-400 hover:text-white transition-colors uppercase w-8"
               >
                 {lang}
               </button>
               <div className="w-px h-4 bg-slate-700"></div>
               <button 
                 onClick={() => setCurrency(currency === 'AOA' ? 'USD' : 'AOA')}
                 className="px-2 py-1 text-[10px] font-black text-slate-400 hover:text-white transition-colors uppercase w-10"
               >
                 {currency}
               </button>
            </div>

            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="flex items-center space-x-3 bg-slate-900 py-1.5 px-3 rounded-full border border-slate-800">
              <span className="text-xs font-bold text-slate-300 hidden sm:block">{user.name}</span>
              <img src={user.avatar} className="w-7 h-7 rounded-full border border-slate-700" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
