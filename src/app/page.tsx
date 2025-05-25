"use client";

import React, { useState } from 'react';
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

const DashboardPage = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showValidationInfoModal, setShowValidationInfoModal] = useState(false);
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

  return (
    <div className="space-y-6">
      {/* Modal de QR Code */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-primary/30 overflow-hidden">
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
      {showValidationInfoModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full border border-primary/30 overflow-hidden">
            {/* Cabeçalho do modal */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Info className="mr-2 text-primary" size={20} />
                O que é uma Indicação Validada?
              </h3>
              <button 
                onClick={() => setShowValidationInfoModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Corpo do modal */}
            <div className="p-6">
              <p className="text-white mb-4">
                Uma indicação é considerada válida quando a pessoa que você indicou:
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-0.5">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <p className="text-gray-300">
                    Se registra pelo seu link, faz um depósito mínimo de R$30 e realiza pelo menos 10 apostas.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-0.5">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <p className="text-gray-300">
                    Se registra pelo seu link e gera pelo menos R$20 de comissão para a plataforma.
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 italic">
                Apenas indicações validadas geram comissões para você.
              </p>
              
              <button 
                onClick={() => setShowValidationInfoModal(false)}
                className="mt-6 w-full flex items-center justify-center bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Affiliate Info Frame --- */}
      <div className={cn(
          "bg-card p-4 rounded-lg shadow mb-6 overflow-hidden relative pb-6",
      )}>
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
        <div className="pt-6">
            {/* Name and Category/Level Section with Gradient */}
            <div className="p-3 rounded mb-3">
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
            <div className="flex justify-between items-center mt-3 mb-1 px-1">
              <span className="text-sm text-white flex items-center">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" /> 
                Próximo Level: +2 Indicações
              </span>
              <span className="text-sm text-green-500 font-bold">R$25,00</span>
            </div>

            {/* Progress Bar Section - Adjusted */}
            <div className="mt-4 relative h-5">
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
                Faça indicações, suba de Level e receba recompensas exclusivas!
            </p>
        </div>
      </div>
      {/* --- End of Affiliate Info Frame --- */}

      {/* Link de Indicação - Sem o efeito esfumaçado */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card p-5 rounded-lg shadow-lg w-full border-2 border-primary/30 relative overflow-hidden">
          <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
            <span className="mr-2 text-primary">
              <ArrowRight size={20} className="inline" />
            </span>
            Seu Link de Indicação
          </h3>
          
          <div className="flex items-center bg-border/80 p-3 rounded-md mb-3 border border-primary/30 backdrop-blur-sm">
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
              <Copy size={18} />
            </button>
            <button 
              className="ml-2 p-2 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white" 
              title="Mostrar QR Code"
              onClick={() => setShowQRModal(true)}
            >
              <QrCode size={18} />
            </button>
          </div>
          
          <p className="text-sm text-primary/80 flex items-center">
            <Info size={14} className="mr-1" /> 
            Copie e compartilhe seu link para ganhar comissões
          </p>
        </div>
      </div>
      
      {/* Novos Cards - Apenas 2 principais com ícones no canto superior direito */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card de Indicações - Combinando Total e Validadas */}
        <div className="bg-card p-5 rounded-lg shadow-lg border-2 border-primary/30 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <span className="mr-2 text-primary">
                <TrendingUp size={20} className="inline" />
              </span>
              Indicações
            </h3>
            <Link href="/minha-rede" className="p-2 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
              <ExternalLink size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Total de Indicações */}
            <div className="bg-border/50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Total de Indicações</p>
                  <p className="text-3xl font-bold text-white mt-1">{affiliateData.metrics.registrations}</p>
                  <p className="text-xs text-gray-400 mt-1">Pessoas que usaram seu link</p>
                </div>
              </div>
            </div>
            
            {/* Indicações Validadas */}
            <div className="bg-border/50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-400">Indicações Validadas</p>
                    <button 
                      onClick={() => setShowValidationInfoModal(true)}
                      className="ml-1 text-primary hover:text-primary/80 transition-colors"
                    >
                      <HelpCircle size={14} />
                    </button>
                  </div>
                  <p className="text-3xl font-bold text-white mt-1">{affiliateData.metrics.validatedIndications}</p>
                  <p className="text-xs text-gray-400 mt-1">Indicações que geram comissão</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Sua Rede */}
        <div className="bg-card p-5 rounded-lg shadow-lg border-2 border-primary/30 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <span className="mr-2 text-primary">
                <Users size={20} className="inline" />
              </span>
              Sua Rede
            </h3>
            <Link href="/relatorios" className="p-2 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
              <ExternalLink size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Valor Total Depositado */}
            <div className="bg-border/50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Total Depositado</p>
                  <p className="text-3xl font-bold text-white mt-1">R$ {affiliateData.metrics.totalDeposited.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs text-gray-400 mt-1">Valor depositado pela sua rede</p>
                </div>
              </div>
            </div>
            
            {/* Total de Comissões */}
            <div className="bg-border/50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">Total de Comissões</p>
                  <p className="text-3xl font-bold text-primary mt-1">R$ {affiliateData.metrics.commissions.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs text-gray-400 mt-1">Comissões geradas pela sua rede</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Sequence, Chests, Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

    </div>
  );
};

export default DashboardPage;
