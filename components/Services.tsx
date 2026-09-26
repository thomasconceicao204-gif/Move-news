
import React, { useState, useEffect } from 'react';

interface ServicesProps {
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
}

interface Testimonial {
  id: string;
  user: string;
  comment: string;
  rating: number;
}

interface Service {
  id: string;
  title: string;
  provider: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  testimonials: Testimonial[];
}

const Services: React.FC<ServicesProps> = ({ notify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = ['Todos', 'Favoritos', 'Design', 'Marketing', 'Legal', 'Tech', 'Consultoria'];

  const mockServices: Service[] = [
    { 
      id: 'registo-iapi', 
      title: 'Registo de Marca Profissional (IAPI Angola)', 
      provider: 'Legal Move Consultoria', 
      category: 'Legal', 
      price: '$120 (Incl. Taxas)', 
      rating: 4.9, 
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
      description: 'Cuidamos de todo o processo burocrático de registo da sua marca no Instituto Angolano da Propriedade Industrial. Evite que outros usem o seu nome e garanta a exclusividade do seu negócio em todo o território nacional.',
      testimonials: [
        { id: 't1', user: 'Mauro Tech', comment: 'Processo rápido e transparente. Recomendo!', rating: 5 },
        { id: 't2', user: 'Sandra M.', comment: 'Tiraram todas as minhas dúvidas sobre o IAPI.', rating: 5 }
      ]
    },
    { 
      id: 'social-ads-ao', 
      title: 'Gestão de Tráfego Pago (Meta & Google Angola)', 
      provider: 'Nexus Digital AO', 
      category: 'Marketing', 
      price: '$80/campanha', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800',
      description: 'Configuramos as suas campanhas de anúncios para atingir o público certo em Luanda, Benguela, Huambo e mais. Focamos no retorno sobre o investimento (ROI) para que cada dólar gasto se transforme em vendas reais.',
      testimonials: [
        { id: 't3', user: 'Loja Chic', comment: 'Minhas vendas no WhatsApp triplicaram!', rating: 5 }
      ]
    },
    { 
      id: 'brand-identity', 
      title: 'Identidade Visual para Startups Africanas', 
      provider: 'Studio Criativo Kilamba', 
      category: 'Design', 
      price: '$50', 
      rating: 5.0, 
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
      description: 'Logotipo, paleta de cores, tipografia e manual da marca. Criamos designs modernos que respeitam a cultura local mas com apelo internacional.',
      testimonials: [
        { id: 't4', user: 'App Kwanza', comment: 'Ficou muito profissional. O design é de outro nível.', rating: 5 }
      ]
    },
    { 
      id: 'agt-consult', 
      title: 'Formalização de Negócio (NIF e AGT)', 
      provider: 'Contabilistas do Futuro', 
      category: 'Legal', 
      price: '$45', 
      rating: 4.7, 
      image: 'https://images.unsplash.com/photo-1454165833767-027ffea7028c?auto=format&fit=crop&q=80&w=800',
      description: 'Auxiliamos jovens empreendedores a formalizar seus negócios perante a AGT. Consultoria sobre impostos, emissão de faturas e conformidade legal em Angola.',
      testimonials: [
        { id: 't5', user: 'Pedro K.', comment: 'Finalmente entendi como pagar meus impostos.', rating: 4 }
      ]
    },
    { 
      id: 'landing-page', 
      title: 'Landing Page de Alta Conversão em 48h', 
      provider: 'Coders Luanda', 
      category: 'Tech', 
      price: '$95', 
      rating: 4.9, 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      description: 'Páginas rápidas, otimizadas para mobile e com foco total em converter visitantes em clientes. Inclui integração com WhatsApp e formulários de email.',
      testimonials: [
        { id: 't6', user: 'Curso de Inglês X', comment: 'Site lindo e muito rápido no telemóvel.', rating: 5 }
      ]
    }
  ];

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favoriteIds);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavoriteIds(newFavorites);
  };

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = false;
    if (activeCategory === 'Todos') {
      matchesCategory = true;
    } else if (activeCategory === 'Favoritos') {
      matchesCategory = favoriteIds.has(service.id);
    } else {
      matchesCategory = service.category === activeCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  const handleHire = (e: React.MouseEvent) => {
    e.stopPropagation();
    notify("Iniciando Nova Move Secure Checkout. Aguarde...", "success");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Mercado de <span className="text-indigo-500">Soluções</span></h2>
          <p className="text-slate-400 text-sm mt-1">Conecte-se com os melhores talentos de Angola para escalar o seu negócio.</p>
          
          <div className="flex flex-col space-y-4 mt-6">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Ex: Registo de Marca, Logo, Landing Page..."
                className="block w-full pl-6 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeCategory === category
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                      : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 bg-slate-900/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div 
            key={service.id} 
            onClick={() => setSelectedService(service)}
            className="group glass rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all flex flex-col cursor-pointer relative bg-slate-900/10"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 text-white">
                ⭐ {service.rating}
              </div>
              <div className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                {service.category}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <h4 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">{service.title}</h4>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">{service.provider}</p>

              <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                <span className="text-sm font-black text-white">{service.price}</span>
                <span className="text-[10px] font-black text-indigo-400 uppercase">Saber Mais</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal Placeholder */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedService(null)}></div>
          <div className="relative glass w-full max-w-2xl rounded-[3rem] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border-white/10 shadow-2xl">
            <div className="aspect-video">
              <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{selectedService.description}</p>
              </div>
              
              <div className="flex items-center justify-between border-y border-white/5 py-6">
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Preço Estimado</p>
                   <p className="text-xl font-black text-white">{selectedService.price}</p>
                </div>
                <button 
                  onClick={handleHire}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-xs"
                >
                  Contratar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
