
export interface VirtualCard {
  id: string;
  lastFour: string;
  balance: number;
  type: 'Visa' | 'Mastercard';
  expiry: string;
  status: 'active' | 'frozen';
}

export type ProductType = 'curso' | 'ebook';

export interface Product {
  id: string;
  title: string;
  author: string;
  type: ProductType;
  price: number;
  thumbnail: string;
  category: string;
  isPurchased: boolean;
  salesCount?: number;
  rating: number;
  youtubeId?: string;
  pages?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export enum AppSection {
  Dashboard = 'dashboard',
  Sales = 'sales',
  VirtualCards = 'cards',
  GlobalMarket = 'global-market',
  GlobalAccess = 'global-access',
  Education = 'education',
  Services = 'services',
  AICoach = 'ai-coach',
  Marketing = 'marketing',
  Income = 'income',
  Security = 'security',
  Hunter = 'hunter'
}

export interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Lead {
  id: string;
  platform: 'twitter' | 'instagram' | 'linkedin';
  username: string;
  content: string;
  category: 'Design' | 'Dev' | 'Marketing' | 'Copy' | 'Video';
  budget?: string;
  timeAgo: string;
  confidence: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  category: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  monthlyPace?: number;
  color?: string;
}
