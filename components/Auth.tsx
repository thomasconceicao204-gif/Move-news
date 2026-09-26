
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, notify }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de delay de rede
    setTimeout(() => {
      if (!isLogin) {
        // Validação básica de Registo
        if (password !== confirmPassword) {
          notify("As senhas não coincidem.", 'error');
          setIsLoading(false);
          return;
        }
        if (!name || !email || !password) {
          notify("Por favor, preencha todos os campos obrigatórios.", 'error');
          setIsLoading(false);
          return;
        }
      } else {
        // Validação básica de Login
        if (!email || !password) {
           notify("Insira o email e a senha para continuar.", 'error');
           setIsLoading(false);
           return;
        }
      }

      // Criação do objeto de utilizador (Simulando resposta do backend)
      const user: User = {
        name: isLogin ? 'Empreendedor Nova' : name,
        email: email,
        phone: phone,
        avatar: `https://ui-avatars.com/api/?name=${isLogin ? 'Nova+Move' : name.replace(' ', '+')}&background=4f46e5&color=fff&bold=true`
      };

      // Persistir sessão (Simulado)
      localStorage.setItem('nova_user', JSON.stringify(user));
      
      onLogin(user);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl h-[85vh] glass rounded-[3rem] overflow-hidden flex shadow-2xl border border-white/10 animate-in zoom-in-95 duration-500">
        
        {/* Left Side - Visual & Branding */}
        <div className="hidden lg:flex w-1/2 bg-slate-900/50 relative flex-col justify-between p-12">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950"></div>
           
           <div className="relative z-10">
             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6">
               <span className="text-2xl font-bold italic text-white">N</span>
             </div>
             <h1 className="text-4xl font-black text-white italic tracking-tighter">
               NOVA MOVE <span className="text-indigo-500">PRO</span>
             </h1>
             <p className="text-slate-400 mt-2 font-medium">A plataforma definitiva para o empreendedor africano moderno.</p>
           </div>

           <div className="relative z-10 space-y-6">
             <div className="glass p-4 rounded-2xl border-l-4 border-emerald-500 bg-slate-900/40 backdrop-blur-md">
               <p className="text-xs text-slate-300 italic">"Graças à Nova Move, expandi as minhas vendas de Luanda para o mundo. O cartão virtual mudou o meu negócio."</p>
               <p className="text-[10px] font-black text-emerald-500 uppercase mt-2">— Jandira S., Luanda</p>
             </div>
             <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <span>Segurança AES-256</span>
                <span>•</span>
                <span>Pagamentos Globais</span>
             </div>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 bg-slate-950/80 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-black text-white mb-2">{isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
            <p className="text-slate-400 text-sm mb-8">
              {isLogin 
                ? 'Acesse seu painel para gerir seus lucros e cartões.' 
                : 'Junte-se a mais de 10.000 empreendedores digitais.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-4 animate-in slide-in-from-left-4 fade-in duration-300">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Telefone</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+244 9XX XXX XXX"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Profissional</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@seu-negocio.com"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Senha de Acesso</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all placeholder:text-slate-600"
                />
              </div>

              {!isLogin && (
                <div className="space-y-1 animate-in slide-in-from-left-4 fade-in duration-300">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirmar Senha</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all placeholder:text-slate-600"
                  />
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  isLogin ? 'Entrar na Plataforma' : 'Criar Conta Grátis'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                {isLogin ? 'Ainda não tem conta?' : 'Já tem uma conta?'}
                <button 
                  onClick={() => { setIsLogin(!isLogin); setName(''); setEmail(''); setPassword(''); }}
                  className="ml-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
                >
                  {isLogin ? 'Começar Agora' : 'Fazer Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
