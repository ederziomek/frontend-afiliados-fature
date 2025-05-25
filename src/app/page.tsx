"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Copy, QrCode, Info, ArrowRight, Award, ExternalLink, LucideIcon, Star, ArrowUp, Printer, Share2, X, TrendingUp, UserCheck, DollarSign, HelpCircle, Users } from 'lucide-react'; // Added more icons
import { toast } from "@/hooks/use-toast";
import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import SequenceCard from '@/components/dashboard/sequence_card';
import ChestsCard from '@/components/dashboard/chests_card';
import CommissionVaultCard from '@/components/dashboard/commission_vault_card';
import RankingSection from '@/components/dashboard/RankingSection';
import { Progress } from '@/components/ui/progress';
import { cn } from "@/lib/utils";

// --- Category Styles and Data ---
interface CategoryStyle {
  bgClass: string;
  gradientStyle: React.CSSProperties;
  textColor: string;
}

interface CategoryData {
  icon: LucideIcon;
  style: CategoryStyle;
}

interface CategoriesStyleData {
  [key: string]: CategoryData;
  Jogador: CategoryData;
  Iniciante: CategoryData;
  Regular: CategoryData;
  Profissional: CategoryData;
  Elite: CategoryData;
  Expert: CategoryData;
  Mestre: CategoryData;
}

// Updated styles for 7 categories
const categoriesStyleData: CategoriesStyleData = {
  Jogador: {
    icon: Award,
    style: {
      bgClass: 'bg-category-jogador-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #6E6B6B, #FFF6F6, #6E6B6B, #FFF6F6, #6E6B6B)' },
      textColor: 'text-white',
    }
  },
  Iniciante: {
    icon: Award,
    style: {
      bgClass: 'bg-category-iniciante-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #809996, #A9D8D2, white, #A9D8D2, #809996)' },
      textColor: 'text-white',
    }
  },
  Regular: {
    icon: Award,
    style: {
      bgClass: 'bg-category-regular-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #36756D, #82B9B4, #D0FFFC, #36756D)' },
      textColor: 'text-white',
    }
  },
  Profissional: {
    icon: Award,
    style: {
      bgClass: 'bg-category-profissional-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #29A9A9, #43C3C1, #5EDED9)' },
      textColor: 'text-white',
    }
  },
  Elite: {
    icon: Award,
    style: {
      bgClass: 'bg-category-elite-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #008474, #00FFF0, #008474)' },
      textColor: 'text-white',
    }
  },
  Expert: {
    icon: Award,
    style: {
      bgClass: 'bg-category-expert-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #003F39, #00796B, #9CBCB9, #00796B, #003F39)' },
      textColor: 'text-white',
    }
  },
  Mestre: {
    icon: Award,
    style: {
      bgClass: 'bg-category-mestre-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #014E4E, #1AA5A5, #014E4E, #1AA5A5, #014E4E)' },
      textColor: 'text-white',
    }
  },
};

// --- Function to render stars using Lucide Star ---
const renderStars = (categoryName: string) => {
    const categoryNames = Object.keys(categoriesStyleData);
    const categoryIndex = categoryNames.indexOf(categoryName);
    
    let activeStars = 0;
    if (categoryName === 'Jogador') {
        activeStars = 1; 
    } else {
        activeStars = categoryIndex + 1; 
    }
    
    const totalStars = 8;

    return (
        <div className="flex items-center space-x-1">
            {[...Array(totalStars)].map((_, i) => (
                <Star
                    key={i}
                    size={12}
                    className={cn(
                        'fill-current',
                        categoryName === 'Jogador' ? 
                            (i < activeStars ? 'text-white' : 'text-white opacity-30') :
                            (i < activeStars ? 'text-white' : 'text-gray-500 opacity-50')
                    )}
                />
            ))}
        </div>
    );
};

// --- Static Data ---
const affiliateData = {
  name: 'Jéssica Miranda',
  category: 'Jogador',
  level: 3,
  currentIndications: 11,
  nextLevelRequirement: 19,
  nextLevelCategory: 'Jogador',
  nextLevel: 4,
  referralLink: 'http://short.up.bet.br/AAAABC',
  metrics: {
    registrations: 2,
    validatedIndications: 1,
    commissions: 15.75,
    totalDeposited: 150.00,
  },
  lastUpdate: '02/05/2025 22:40',
};

const progressPercentage = 60;
const indicationsNeeded = affiliateData.nextLevelRequirement - affiliateData.currentIndications;

// Tooltip component with X button and click outside to close
const Tooltip = ({ id, isOpen, onClose, children }: { id: string, isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id={id} 
      ref={tooltipRef}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-[#1A1F2B] rounded-lg shadow-xl max-w-md w-full border border-primary/30 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Info className="mr-2 text-primary" size={20} />
            {id === 'validationInfoModal' ? 'O que é uma Indicação Validada?' : 'Informação'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Small tooltip component
const SmallTooltip = ({ id, isOpen, onClose, children }: { id: string, isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id={id} 
      ref={tooltipRef}
      className="fixed z-[9999] bg-[#1A1F2B] text-white text-xs p-3 rounded shadow-lg border border-primary/30"
      style={{ 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '300px'
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 text-center">{children}</div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors ml-2"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showValidationInfoModal, setShowValidationInfoModal] = useState(false);
  const [showTooltips, setShowTooltips] = useState({
    indicationsTotal: false,
    indicationsValidated: false,
    totalDeposited: false,
    totalCommissions: false,
  });
  const currentCategoryStyle = categoriesStyleData[affiliateData.category]?.style || categoriesStyleData['Jogador'].style;

  // Define a luxurious gradient based on the category's main gradient
  const nameSectionGradientStyle = {
    ...currentCategoryStyle.gradientStyle,
    backgroundImage: currentCategoryStyle.gradientStyle.backgroundImage?.replace('linear-gradient(to right,', 'linear-gradient(to bottom right,'),
  };

  // Função para imprimir o QR Code
  const handlePrintQRCode = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${affiliateData.referralLink}</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              .qr-container { margin: 30px auto; }
              h2 { color: #333; }
              p { color: #666; margin-top: 20px; }
            </style>
          </head>
          <body>
            <h2>Seu Link de Indicação</h2>
            <div class="qr-container">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(affiliateData.referralLink)}" alt="QR Code" />
            </div>
            <p>${affiliateData.referralLink}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  // Função para compartilhar o link
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu Link de Indicação',
          text: 'Use meu link de indicação para se cadastrar!',
          url: affiliateData.referralLink,
        });
        toast({
          variant: "success",
          title: "Link compartilhado!",
          description: "O link foi compartilhado com sucesso.",
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(affiliateData.referralLink);
      toast({
        variant: "success",
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    }
  };

  // Função para alternar a exibição dos tooltips
  const toggleTooltip = (tooltipName: keyof typeof showTooltips) => {
    setShowTooltips(prev => {
      // Fechar todos os outros tooltips
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof typeof showTooltips] = false;
        return acc;
      }, {} as typeof showTooltips);
      
      // Alternar o tooltip atual
      newState[tooltipName] = !prev[tooltipName];
      return newState;
    });
  };

  return (
    <div className="space-y-4">
      {/* Modal de QR Code */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999] p-4">
          <div className="bg-[#1A1F2B] rounded-lg shadow-xl max-w-md w-full border border-primary/30 overflow-hidden">
            {/* Cabeçalho do modal */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <QrCode className="mr-2 text-primary" size={20} />
                QR Code do seu Link
              </h3>
              <button 
                onClick={() => setShowQRModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Corpo do modal */}
            <div className="p-6 flex flex-col items-center">
              <div className="bg-white p-4 rounded-md mb-4">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(affiliateData.referralLink)}`}
                  alt="QR Code do link de indicação"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-gray-300 mb-6 text-center">
                Escaneie este QR Code para acessar seu link de indicação
              </p>
              
              {/* Botões de ação */}
              <div className="flex space-x-3 w-full">
                <button 
                  onClick={handlePrintQRCode}
                  className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <Printer size={18} className="mr-2" />
                  Imprimir
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <Share2 size={18} className="mr-2" />
                  Compartilhar
                </button>
                <button 
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Informação sobre Indicações Validadas */}
      <Tooltip 
        id="validationInfoModal" 
        isOpen={showValidationInfoModal} 
        onClose={() => setShowValidationInfoModal(false)}
      >
        <div>
          <p className="text-white mb-4">
            Uma indicação é válida quando a pessoa que você indicou atende a <span className="text-primary">pelo menos uma</span> destas condições:
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-primary/20 p-2 rounded-full mr-3 mt-0.5 flex items-center justify-center w-8 h-8">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <p className="text-gray-300 flex-1">
                Registra-se pelo seu link, faz depósito de R$30 e realiza 10 apostas
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/20 p-2 rounded-full mr-3 mt-0.5 flex items-center justify-center w-8 h-8">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <p className="text-gray-300 flex-1">
                Registra-se pelo seu link e gera R$20 de comissão para a plataforma
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 italic mb-6">
            Apenas indicações validadas geram comissões para você.
          </p>
          
          <button 
            onClick={() => setShowValidationInfoModal(false)}
            className="w-full flex items-center justify-center bg-primary hover:bg-primary/80 text-white py-3 px-4 rounded-md transition-colors text-lg"
          >
            Entendi
          </button>
        </div>
      </Tooltip>

      {/* --- Affiliate Info Frame --- */}
      <div 
        className={cn(
          "bg-card p-4 rounded-lg shadow mb-4 overflow-hidden relative pb-6",
        )}
        style={{ position: 'relative', zIndex: 10 }}
      >
        {/* Pseudo-element for gradient border with rounded corners */}
        <div 
          className="absolute inset-0 rounded-lg z-0" 
          style={{
            padding: '1px',
            borderRadius: '0.5rem',
            background: currentCategoryStyle.gradientStyle.backgroundImage,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none'
          }}
        ></div>

        {/* Top Gradient Bar with Stars - Full Width, Rounded */}
        <div
            className="h-5 w-full mb-2 rounded-t-lg absolute top-0 left-0 right-0"
            style={currentCategoryStyle.gradientStyle}
        >
            <div className="pl-2 pt-1">
                {renderStars(affiliateData.category)}
            </div>
        </div>

        {/* Main Content - Added padding-top */}
        <div className="pt-6 relative z-10">
            {/* Name and Category/Level Section with Gradient */}
            <div className="p-3 rounded mb-2">
              <div className="flex items-start justify-between">
                <h2 className={cn(
                    "text-2xl font-heading font-black italic leading-tight",
                    currentCategoryStyle.textColor
                )}>
                  {affiliateData.name.toUpperCase()}
                </h2>
                <div className="text-right">
                  <span className={cn(
                      "text-sm font-heading font-bold italic",
                      currentCategoryStyle.textColor
                  )}>
                    {affiliateData.category.toUpperCase()}
                  </span>
                  <span className={cn(
                      "block text-sm font-heading font-bold italic",
                      currentCategoryStyle.textColor
                  )}>
                    Level {affiliateData.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Text above progress bar */}
            <div className="flex justify-between items-center mt-2 mb-1 px-1">
              <span className="text-sm text-white flex items-center">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" /> 
                Próximo Level: +2 Indicações
              </span>
              <span className="text-sm text-green-500 font-bold">R$25,00</span>
            </div>

            {/* Progress Bar Section - Adjusted */}
            <div className="mt-3 relative h-5">
                <Progress
                    value={progressPercentage}
                    className="w-full h-full bg-border"
                    indicatorStyle={currentCategoryStyle.gradientStyle}
                />
                <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-between px-2 text-white z-10" style={{ textShadow: '1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000' }}>
                        <span className="flex-1 text-left truncate pr-1">{`${affiliateData.category} (Lv ${affiliateData.level})`}</span>
                        <span className="flex-shrink-0 px-1">{`${progressPercentage.toFixed(0)}%`}</span>
                        <span className="flex-1 text-right truncate pl-1">{`${affiliateData.nextLevelCategory} (Lv ${affiliateData.nextLevel})`}</span>
                    </div>
                </div>
            </div>
            {/* Text below progress bar */}
            <p className="text-xs text-center mt-1 text-gray-400">
                Suba de Level e receba recompensas exclusivas!
            </p>
        </div>
      </div>
      {/* --- End of Affiliate Info Frame --- */}

      {/* Link de Indicação - Sem o efeito esfumaçado */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-lg w-full border-2 border-primary/30 relative overflow-hidden">
          <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
            <span className="mr-2 text-primary">
              <ArrowRight size={18} className="inline" />
            </span>
            Seu Link de Indicação
          </h3>
          
          <div className="flex items-center bg-border/80 p-2 rounded-md mb-2 border border-primary/30 backdrop-blur-sm">
            <input
              type="text"
              readOnly
              value={affiliateData.referralLink}
              className="bg-transparent text-sm text-white flex-grow focus:outline-none font-medium"
            />
            <button 
              className="p-2 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white" 
              title="Copiar Link"
              onClick={() => {
                navigator.clipboard.writeText(affiliateData.referralLink);
                toast({
                  variant: "success",
                  title: "Link copiado com sucesso!",
                  description: "O link de indicação foi copiado para a área de transferência.",
                });
              }}
            >
              <Copy size={16} />
            </button>
            <button 
              className="ml-2 p-2 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white" 
              title="Mostrar QR Code"
              onClick={() => setShowQRModal(true)}
            >
              <QrCode size={16} />
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <p className="text-xs text-primary text-center">
              Copie e compartilhe seu link para começar a faturar R$!
            </p>
          </div>
        </div>
      </div>
      
      {/* Card de Minha Rede (anteriormente Indicações) - Agora com layout modificado */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-lg border-2 border-primary/30 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="mr-2 text-primary">
                <Users size={18} className="inline" />
              </span>
              Minha Rede
            </h3>
            <Link href="/minha-rede" className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
              <ExternalLink size={16} />
            </Link>
          </div>
          
          {/* Grid de 2 colunas para Indicações e Indicações Validadas */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Indicações */}
            <div className="bg-border/50 p-3 rounded-lg relative">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-full">
                  <p className="text-xs text-gray-400 text-center">Indicações</p>
                  <button 
                    onClick={() => toggleTooltip('indicationsTotal')}
                    className="ml-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    <HelpCircle size={12} />
                  </button>
                </div>
                <p className="text-2xl font-bold text-white mt-1 text-center">{affiliateData.metrics.registrations}</p>
              </div>
            </div>
            
            {/* Indicações Validadas */}
            <div className="bg-border/50 p-3 rounded-lg relative">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-full">
                  <p className="text-xs text-gray-400 text-center">Indicações Validadas</p>
                  <button 
                    onClick={() => setShowValidationInfoModal(true)}
                    className="ml-1 text-primary hover:text-primary/80 transition-colors"
                  >
                    <HelpCircle size={12} />
                  </button>
                </div>
                <p className="text-2xl font-bold text-white mt-1 text-center">{affiliateData.metrics.validatedIndications}</p>
              </div>
            </div>
          </div>
          
          {/* Comissões em uma linha separada, ocupando toda a largura */}
          <div className="bg-border/50 p-3 rounded-lg relative">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center w-full">
                <p className="text-xs text-gray-400 text-center">Comissões</p>
                <button 
                  onClick={() => toggleTooltip('totalCommissions')}
                  className="ml-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <HelpCircle size={12} />
                </button>
              </div>
              <p className="text-2xl font-bold text-primary mt-1 text-center">R$ {affiliateData.metrics.commissions.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      {showTooltips.indicationsTotal && (
        <SmallTooltip 
          id="indicationsTotalTooltip" 
          isOpen={showTooltips.indicationsTotal} 
          onClose={() => toggleTooltip('indicationsTotal')}
        >
          Pessoas que usaram seu link
        </SmallTooltip>
      )}
      
      {showTooltips.indicationsValidated && (
        <SmallTooltip 
          id="indicationsValidatedTooltip" 
          isOpen={showTooltips.indicationsValidated} 
          onClose={() => toggleTooltip('indicationsValidated')}
        >
          Indicações que geram comissão
        </SmallTooltip>
      )}
      
      {showTooltips.totalDeposited && (
        <SmallTooltip 
          id="totalDepositedTooltip" 
          isOpen={showTooltips.totalDeposited} 
          onClose={() => toggleTooltip('totalDeposited')}
        >
          Valor depositado pela sua rede
        </SmallTooltip>
      )}
      
      {showTooltips.totalCommissions && (
        <SmallTooltip 
          id="totalCommissionsTooltip" 
          isOpen={showTooltips.totalCommissions} 
          onClose={() => toggleTooltip('totalCommissions')}
        >
          Comissões geradas pela sua rede
        </SmallTooltip>
      )}

      {/* Second Row: Sequence, Chests, Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SequenceCard />
        <ChestsCard />
        <CommissionVaultCard weeklyRevShare={123.45} />
      </div>

      {/* Third Row: Rankings */}
      <RankingSection />

      {/* Update Info */}
      <div className="bg-card p-3 rounded-lg shadow flex items-center text-sm text-text-secondary">
        <Info size={16} className="mr-2 text-primary flex-shrink-0" />
        <span>Os dados do painel podem levar até 1 hora para serem atualizados. Última atualização: {affiliateData.lastUpdate}</span>
      </div>

      {/* Estilo global para garantir que as notificações fiquem sempre na frente */}
      <style jsx global>{`
        /* Garantir que as notificações fiquem sempre na frente */
        .notification-panel {
          z-index: 99999 !important;
        }
        
        /* Ajuste para o modal de notificações */
        #NotificationsPanel {
          z-index: 99999 !important;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
