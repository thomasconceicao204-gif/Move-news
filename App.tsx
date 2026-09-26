
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import VirtualCards from './components/VirtualCards';
import GlobalMarket from './components/GlobalMarket';
import GlobalAccess from './components/GlobalAccess';
import Education from './components/Education';
import AICoach from './components/AICoach';
import Services from './components/Services';
import SecurityCenter from './components/SecurityCenter';
import MarketingHub from './components/MarketingHub';
import IncomeCenter from './components/IncomeCenter';
import SalesHub from './components/SalesHub';
import HunterAI from './components/HunterAI'; // Novo Import
import { AppSection, User, NotificationState } from './types';

// Componente de Notificação (Toast)
const NotificationToast: React.FC<{ notification: NotificationState; onClose: () => void }> = ({ notification, onClose }) => {
  if (!notification.show) return null;

  const bgColors = {
    success: 'bg-emerald-500',
    error: 'bg-rose-500',
    info: 'bg-indigo-500'
  };

  const icons = {
    success: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right-10 fade-in duration-300">
      <div className="glass bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-sm backdrop-blur-xl">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${bgColors[notification.type]}`}>
          {icons[notification.type]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">{notification.message}</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.Dashboard);
  const [loading, setLoading] = useState(true);
  
  // Estado Global de Notificação
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'info'
  });

  const notify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  useEffect(() => {
    // Check local storage for persistent login
    const savedUser = localStorage.getItem('nova_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user session");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    notify(`Bem-vindo de volta, ${userData.name}!`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('nova_user');
    setUser(null);
    setActiveSection(AppSection.Dashboard);
    notify('Sessão terminada com sucesso.', 'info');
  };

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.Dashboard:
        return <Dashboard notify={notify} />;
      case AppSection.Hunter: // Novo Case
        return <HunterAI notify={notify} />;
      case AppSection.Sales:
        return <SalesHub notify={notify} />;
      case AppSection.VirtualCards:
        return <VirtualCards notify={notify} />;
      case AppSection.GlobalMarket:
        return <GlobalMarket notify={notify} />;
      case AppSection.GlobalAccess:
        return <GlobalAccess notify={notify} />;
      case AppSection.Marketing:
        return <MarketingHub notify={notify} />;
      case AppSection.Income:
        return <IncomeCenter notify={notify} />;
      case AppSection.Education:
        return <Education notify={notify} />;
      case AppSection.AICoach:
        return <AICoach />;
      case AppSection.Services:
        return <Services notify={notify} />;
      case AppSection.Security:
        return <SecurityCenter />;
      default:
        return <Dashboard notify={notify} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-800 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-white text-xs">NOVA</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NotificationToast notification={notification} onClose={() => setNotification(prev => ({ ...prev, show: false }))} />
      
      {!user ? (
        <Auth onLogin={handleLogin} notify={notify} />
      ) : (
        <Layout 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          user={user}
          onLogout={handleLogout}
        >
          {renderContent()}
        </Layout>
      )}
    </>
  );
};
