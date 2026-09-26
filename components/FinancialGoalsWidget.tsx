import React, { useState, useEffect } from 'react';
import { FinancialGoal } from '../types';

interface FinancialGoalsWidgetProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
  availableBalance?: number;
}

const DEFAULT_GOALS: FinancialGoal[] = [
  {
    id: 'goal-1',
    title: 'Fundo de Emergência Empresarial',
    category: 'Reserva & Segurança',
    icon: '🛡️',
    targetAmount: 1000,
    currentAmount: 850,
    deadline: 'Fim deste mês',
    color: 'from-emerald-500 to-teal-400'
  },
  {
    id: 'goal-2',
    title: 'Equipamentos & Setup de Criação',
    category: 'Infraestrutura',
    icon: '💻',
    targetAmount: 800,
    currentAmount: 520,
    deadline: 'Fim deste mês',
    color: 'from-indigo-500 to-blue-400'
  },
  {
    id: 'goal-3',
    title: 'Reserva para Tráfego Pago & Anúncios',
    category: 'Marketing & Vendas',
    icon: '📢',
    targetAmount: 400,
    currentAmount: 320,
    deadline: 'Fim deste mês',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'goal-4',
    title: 'Estoque para Dropshipping Local',
    category: 'Inventário',
    icon: '📦',
    targetAmount: 300,
    currentAmount: 185,
    deadline: 'Fim deste mês',
    color: 'from-amber-500 to-orange-400'
  }
];

export const FinancialGoalsWidget: React.FC<FinancialGoalsWidgetProps> = ({ 
  notify, 
  availableBalance = 4607.69 
}) => {
  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    const saved = localStorage.getItem('nova_financial_goals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved financial goals', e);
      }
    }
    return DEFAULT_GOALS;
  });

  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedGoalForDeposit, setSelectedGoalForDeposit] = useState<FinancialGoal | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('50');

  // New Goal Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Reserva & Segurança');
  const [newTarget, setNewTarget] = useState('');
  const [newCurrent, setNewCurrent] = useState('0');
  const [newIcon, setNewIcon] = useState('🎯');

  // Save to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('nova_financial_goals', JSON.stringify(goals));
  }, [goals]);

  // Aggregate calculations
  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const totalSaved = goals.reduce((acc, g) => acc + Math.min(g.currentAmount, g.targetAmount), 0);
  const totalRemaining = Math.max(0, totalTarget - totalSaved);
  const overallPercentage = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

  const completedGoalsCount = goals.filter(g => g.currentAmount >= g.targetAmount).length;
  const inProgressGoalsCount = goals.length - completedGoalsCount;

  // Filtered goals
  const filteredGoals = goals.filter(g => {
    const isCompleted = g.currentAmount >= g.targetAmount;
    if (filter === 'completed') return isCompleted;
    if (filter === 'in_progress') return !isCompleted;
    return true;
  });

  // Handle deposit
  const handleMakeDeposit = () => {
    const amountNum = parseFloat(depositAmount);
    if (!amountNum || amountNum <= 0) {
      notify('Por favor, insira um valor válido de aporte.', 'error');
      return;
    }

    if (!selectedGoalForDeposit) {
      notify('Selecione a meta que deseja apoiar.', 'error');
      return;
    }

    const updatedGoals = goals.map(g => {
      if (g.id === selectedGoalForDeposit.id) {
        const newAmount = g.currentAmount + amountNum;
        const reachedTarget = newAmount >= g.targetAmount && g.currentAmount < g.targetAmount;
        if (reachedTarget) {
          notify(`🎉 Parabéns! Você atingiu 100% da meta "${g.title}"!`, 'success');
        } else {
          notify(`Sucesso! Adicionou $${amountNum.toFixed(2)} à meta "${g.title}".`, 'success');
        }
        return {
          ...g,
          currentAmount: newAmount
        };
      }
      return g;
    });

    setGoals(updatedGoals);
    setShowDepositModal(false);
    setSelectedGoalForDeposit(null);
    setDepositAmount('50');
  };

  // Handle new goal creation
  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNum = parseFloat(newTarget);
    const currentNum = parseFloat(newCurrent) || 0;

    if (!newTitle.trim()) {
      notify('Indique o nome da meta de economia.', 'error');
      return;
    }

    if (!targetNum || targetNum <= 0) {
      notify('Indique um valor alvo válido maior que zero.', 'error');
      return;
    }

    const newGoalItem: FinancialGoal = {
      id: `goal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      icon: newIcon || '🎯',
      targetAmount: targetNum,
      currentAmount: currentNum,
      deadline: 'Fim deste mês',
      color: 'from-indigo-500 to-purple-500'
    };

    setGoals(prev => [newGoalItem, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
    setNewTarget('');
    setNewCurrent('0');
    setNewIcon('🎯');
    notify(`Meta "${newGoalItem.title}" adicionada com sucesso!`, 'success');
  };

  // Quick goal deletion
  const handleDeleteGoal = (id: string, title: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    notify(`Meta "${title}" removida.`, 'info');
  };

  // Circular SVG progress math
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercentage / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Top Banner / Widget Header */}
      <div className="glass rounded-[2.5rem] p-6 md:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 shadow-2xl">
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎯</span>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Metas Financeiras do Mês
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-medium">
              Acompanhamento visual em tempo real do seu plano de poupança e reservas empresariais.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (goals.length > 0) {
                  setSelectedGoalForDeposit(goals[0]);
                  setShowDepositModal(true);
                } else {
                  setShowAddModal(true);
                }
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Aportar Economia</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white/10 hover:bg-white/15 text-white font-bold px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all border border-white/10 active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Nova Meta</span>
            </button>
          </div>
        </div>

        {/* Global Progress Overview Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          {/* Circular Visual Gauge */}
          <div className="lg:col-span-4 flex items-center justify-center p-4 bg-slate-950/40 rounded-3xl border border-white/5">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                {/* Track */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-slate-800"
                />
                {/* Progress Bar */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="text-emerald-400 transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white tracking-tight">
                  {overallPercentage}%
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Alcançado
                </span>
              </div>
            </div>

            <div className="ml-5 space-y-1">
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Progresso Geral</p>
              <p className="text-lg font-black text-white">
                ${totalSaved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                de ${totalTarget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} planeados
              </p>
            </div>
          </div>

          {/* Key Metrics Trio - Emphasizing Remaining Amount (O que falta) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Economizado */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Economizado</span>
                <span className="text-emerald-400 text-sm font-bold">✓</span>
              </div>
              <p className="text-2xl font-black text-emerald-400">
                ${totalSaved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                <span>{overallPercentage}% da meta mensal</span>
              </div>
            </div>

            {/* Falta para Atingir - Highlighted prominently */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20 relative group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">Falta para Atingir</span>
                <span className="text-amber-400 text-xs font-bold px-1.5 py-0.5 rounded bg-amber-400/20">
                  {Math.max(0, 100 - overallPercentage)}%
                </span>
              </div>
              <p className="text-2xl font-black text-white">
                ${totalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="mt-1 text-[11px] text-amber-200/80 font-medium">
                {totalRemaining === 0 ? '🎉 Parabéns! Meta 100% atingida!' : `Apenas $${totalRemaining.toFixed(2)} restantes`}
              </div>
            </div>

            {/* Ritmo / Status */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status das Metas</span>
                <span className="text-indigo-400 text-xs font-bold">📅 Mensal</span>
              </div>
              <p className="text-2xl font-black text-white">
                {completedGoalsCount} <span className="text-xs text-slate-400 font-normal">de</span> {goals.length}
              </p>
              <div className="mt-1 text-[11px] text-slate-400 font-medium">
                {inProgressGoalsCount > 0 ? `${inProgressGoalsCount} metas em andamento` : 'Todas as metas concluídas!'}
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar with Segments */}
        <div className="mt-6 pt-5 border-t border-white/5 relative z-10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">Distribuição do Plano Mensal</span>
            <span className="font-bold text-amber-300">
              {totalRemaining > 0 
                ? `Faltam $${totalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} para fechar o mês!`
                : 'Objetivo de economia 100% concluído!'}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5 flex">
            {goals.map((g, idx) => {
              const segmentPercent = totalTarget > 0 ? (g.currentAmount / totalTarget) * 100 : 0;
              const bgColors = [
                'bg-emerald-500',
                'bg-indigo-500',
                'bg-purple-500',
                'bg-amber-500',
                'bg-sky-500'
              ];
              const colorClass = bgColors[idx % bgColors.length];

              if (segmentPercent <= 0) return null;
              return (
                <div
                  key={g.id}
                  style={{ width: `${Math.min(segmentPercent, 100)}%` }}
                  title={`${g.title}: $${g.currentAmount.toFixed(2)}`}
                  className={`h-full ${colorClass} transition-all duration-700 first:rounded-l-full last:rounded-r-full hover:brightness-125`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Goal Filter Tabs & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-2xl border border-white/5 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todas as Metas ({goals.length})
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'in_progress'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Em Progresso ({inProgressGoalsCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === 'completed'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Concluídas ({completedGoalsCount})
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Saldo disponível para poupança: <strong className="text-white">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></span>
        </div>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGoals.map((goal) => {
          const goalPercentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const remainingAmount = Math.max(0, goal.targetAmount - goal.currentAmount);
          const isComplete = goal.currentAmount >= goal.targetAmount;

          return (
            <div
              key={goal.id}
              className={`glass p-6 rounded-[2rem] border transition-all duration-300 relative group flex flex-col justify-between ${
                isComplete 
                  ? 'border-emerald-500/30 bg-emerald-950/10' 
                  : 'border-white/5 hover:border-white/20 bg-slate-900/60'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner">
                      {goal.icon}
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {goal.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{goal.category}</span>
                        <span>·</span>
                        <span>{goal.deadline || 'Este mês'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDeleteGoal(goal.id, goal.title)}
                      className="text-slate-600 hover:text-rose-400 transition-colors p-1.5 rounded-lg opacity-0 group-hover:opacity-100"
                      title="Remover meta"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Values & Missing amount highlight */}
                <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Guardado</span>
                    <p className="text-base font-black text-white">
                      ${goal.currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <span className="text-[10px] text-slate-400">Meta: ${goal.targetAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="text-right border-l border-white/5 pl-3">
                    <span className="text-[10px] uppercase font-bold text-amber-400/90">Falta para Atingir</span>
                    <p className={`text-base font-black ${remainingAmount === 0 ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {remainingAmount === 0 ? '$0.00' : `$${remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </p>
                    <span className={`text-[10px] font-bold ${isComplete ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {isComplete ? '100% Concluído 🎉' : `${goalPercentage}% completo`}
                    </span>
                  </div>
                </div>

                {/* Progress Bar with dynamic fill */}
                <div className="space-y-1.5 my-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[11px] font-bold text-slate-400">
                      {isComplete ? 'Meta atingida!' : `Progresso`}
                    </span>
                    <span className="text-xs font-black text-white">{goalPercentage}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      style={{ width: `${goalPercentage}%` }}
                      className={`h-full rounded-full transition-all duration-700 ${
                        isComplete
                          ? 'bg-emerald-500'
                          : goalPercentage > 70
                          ? 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                          : 'bg-gradient-to-r from-indigo-500 to-indigo-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {remainingAmount > 0 
                    ? `Falta ${100 - goalPercentage}% do objetivo` 
                    : 'Pronto para uso ou reinvestimento'}
                </span>

                <button
                  onClick={() => {
                    setSelectedGoalForDeposit(goal);
                    setShowDepositModal(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    isComplete
                      ? 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>{isComplete ? 'Guardar Mais' : 'Aportar'}</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredGoals.length === 0 && (
          <div className="col-span-full glass p-10 rounded-[2rem] text-center border border-white/5">
            <span className="text-4xl mb-3 block">🎯</span>
            <h4 className="text-lg font-bold text-white mb-1">Nenhuma meta encontrada</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              {filter === 'completed'
                ? 'Você ainda não concluiu nenhuma meta este mês. Continue aportando!'
                : 'Defina novos objetivos financeiros para acelerar o crescimento do seu negócio.'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all"
            >
              Criar Primeira Meta
            </button>
          </div>
        )}
      </div>

      {/* Deposit / Contribution Modal */}
      {showDepositModal && selectedGoalForDeposit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            onClick={() => {
              setShowDepositModal(false);
              setSelectedGoalForDeposit(null);
            }}
          />
          <div className="relative glass w-full max-w-md rounded-[2.5rem] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border-white/10 shadow-2xl">
            <div className="p-6 md:p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{selectedGoalForDeposit.icon}</span>
                  <span>Aportar Economia</span>
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Adicionar valor à meta <strong className="text-white">"{selectedGoalForDeposit.title}"</strong>
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDepositModal(false);
                  setSelectedGoalForDeposit(null);
                }}
                className="text-slate-500 hover:text-white p-2 rounded-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Current Goal Status Highlight */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Atual: <strong className="text-white">${selectedGoalForDeposit.currentAmount.toFixed(2)}</strong></span>
                  <span>Alvo: <strong className="text-white">${selectedGoalForDeposit.targetAmount.toFixed(2)}</strong></span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-amber-400 font-bold">
                    Faltam para atingir:
                  </span>
                  <span className="text-amber-400 font-black">
                    ${Math.max(0, selectedGoalForDeposit.targetAmount - selectedGoalForDeposit.currentAmount).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Amount input */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Valor a Guardar ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-4 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>
              </div>

              {/* Quick preset chips */}
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                  Atalhos Rápidos
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {['20', '50', '100', '250'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDepositAmount(val)}
                      className={`py-2 rounded-xl text-xs font-black transition-all border ${
                        depositAmount === val
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      +${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target goal selector if they want to switch */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                  Destino da Economia
                </label>
                <select
                  value={selectedGoalForDeposit.id}
                  onChange={(e) => {
                    const found = goals.find(g => g.id === e.target.value);
                    if (found) setSelectedGoalForDeposit(found);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {goals.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.icon} {g.title} (Faltam ${Math.max(0, g.targetAmount - g.currentAmount).toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-slate-900/50 border-t border-white/5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDepositModal(false);
                  setSelectedGoalForDeposit(null);
                }}
                className="w-1/3 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleMakeDeposit}
                className="w-2/3 py-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                Confirmar Aporte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative glass w-full max-w-lg rounded-[2.5rem] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border-white/10 shadow-2xl">
            <div className="p-6 md:p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">Criar Nova Meta de Economia</h3>
                <p className="text-slate-400 text-xs mt-1">Defina seus objetivos para manter o foco e disciplina financeira.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-500 hover:text-white p-2 rounded-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGoal}>
              <div className="p-6 md:p-8 space-y-4 max-h-[65vh] overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Nome da Meta
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Novo Smartphone para Produção de Conteúdo"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Category & Icon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Categoria
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Reserva & Segurança">Reserva & Segurança</option>
                      <option value="Infraestrutura & Setup">Infraestrutura & Setup</option>
                      <option value="Marketing & Tráfego">Marketing & Tráfego</option>
                      <option value="Inventário & Produtos">Inventário & Produtos</option>
                      <option value="Educação & Mentorias">Educação & Mentorias</option>
                      <option value="Expansão Pessoal">Expansão Pessoal</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Ícone Representativo
                    </label>
                    <div className="flex gap-2">
                      {['🎯', '🛡️', '💻', '📢', '📦', '🚀', '💰'].map(icon => (
                        <button
                          type="button"
                          key={icon}
                          onClick={() => setNewIcon(icon)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-all ${
                            newIcon === icon
                              ? 'bg-indigo-600 border-indigo-400 scale-105'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Target Amount and Initial Saved */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Meta Alvo ($ USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        required
                        placeholder="Ex: 500.00"
                        value={newTarget}
                        onChange={(e) => setNewTarget(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-9 pr-4 py-3.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Já Guardado ($ USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={newCurrent}
                        onChange={(e) => setNewCurrent(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-9 pr-4 py-3.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculation Preview if values provided */}
                {parseFloat(newTarget) > 0 && (
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-slate-300">
                    <p className="font-bold text-white mb-1">Pré-visualização do Plano:</p>
                    <div className="flex justify-between">
                      <span>Falta para atingir:</span>
                      <strong className="text-amber-300">
                        ${Math.max(0, (parseFloat(newTarget) || 0) - (parseFloat(newCurrent) || 0)).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 bg-slate-900/50 border-t border-white/5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/3 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                >
                  Salvar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialGoalsWidget;
