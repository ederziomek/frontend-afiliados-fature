"use client";

import React from 'react';
import {
  Star, // Current category/level
  TrendingUp, // Progress/Benefit
  Info, // Explanation
  Target, // Goal icon
  CheckCircle, // Max level icon
  Award, // Category Icon (Default)
  ChevronDown, // Accordion icon
  LucideIcon, // Import LucideIcon type
  ArrowUp, // Progress arrow
  DollarSign // CPA icon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from '@/components/ui/progress';
import { cn } from "@/lib/utils"; // Import cn utility for conditional classes

// --- Define Types for Levels and Categories ---
interface LevelDetail {
  level: number;
  indicationsNeeded: number;
  revShareNivel1: number;
}

interface CategoryStyle {
  bgClass: string; // Tailwind background class
  gradientStyle: React.CSSProperties; // Inline style for gradient
  textColor: string; // Text color class
  starColor: string; // Star color class
}

interface CategoryData {
  icon: LucideIcon;
  levels: LevelDetail[];
  style: CategoryStyle;
}

interface CategoriesAndLevelsData {
  [key: string]: CategoryData; // Index signature allowing string keys
  Jogador: CategoryData;
  Iniciante: CategoryData;
  Afiliado: CategoryData;
  Profissional: CategoryData;
  Expert: CategoryData;
  Mestre: CategoryData;
  Lenda: CategoryData;
}

// --- Structure representing Categories and Levels (Atualizada conforme documentação) ---
// Implementação completa com 7 categorias e estrutura de levels conforme nova documentação
const categoriesAndLevelsData: CategoriesAndLevelsData = {
  Jogador: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 0, revShareNivel1: 1 },
      { level: 2, indicationsNeeded: 5, revShareNivel1: 6 }
    ],
    style: {
      bgClass: 'bg-category-jogador-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #6E6B6B, #FFF6F6, #6E6B6B, #FFF6F6, #6E6B6B, #FFF6F6)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Iniciante: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 11, revShareNivel1: 6 },
      { level: 2, indicationsNeeded: 21, revShareNivel1: 12 }
    ],
    style: {
      bgClass: 'bg-category-iniciante-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #809996, #A9D8D2, white, #A9D8D2, #809996)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Afiliado: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 31, revShareNivel1: 12 },
      { level: 2, indicationsNeeded: 41, revShareNivel1: 13 },
      { level: 3, indicationsNeeded: 51, revShareNivel1: 14 },
      { level: 4, indicationsNeeded: 61, revShareNivel1: 15 },
      { level: 5, indicationsNeeded: 71, revShareNivel1: 16 },
      { level: 6, indicationsNeeded: 81, revShareNivel1: 17 },
      { level: 7, indicationsNeeded: 91, revShareNivel1: 18 }
    ],
    style: {
      bgClass: 'bg-category-regular-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #36756D, #82B9B4, #D0FFFC, #36756D)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Profissional: {
    icon: Award,
    levels: Array.from({ length: 30 }, (_, i) => ({
      level: i + 1,
      indicationsNeeded: 101 + (i * 30),
      revShareNivel1: Math.round((18 + (i * 0.2)) * 10) / 10
    })),
    style: {
      bgClass: 'bg-category-profissional-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #29A9A9, #43C3C1, #5EDED9)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Expert: {
    icon: Award,
    levels: Array.from({ length: 90 }, (_, i) => ({
      level: i + 1,
      indicationsNeeded: 1001 + (i * 100),
      revShareNivel1: Math.round((24 + (i * 0.07)) * 100) / 100
    })),
    style: {
      bgClass: 'bg-category-expert-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #003F39, #00796B, #9CBCB9, #00796B, #003F39)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Mestre: {
    icon: Award,
    levels: Array.from({ length: 90 }, (_, i) => ({
      level: i + 1,
      indicationsNeeded: 10001 + (i * 1000),
      revShareNivel1: Math.round((30 + (i * 0.07)) * 100) / 100
    })),
    style: {
      bgClass: 'bg-category-mestre-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #014E4E, #1AA5A5, #014E4E, #1AA5A5, #014E4E, #1AA5A5, #014E4E)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Lenda: {
    icon: Award,
    levels: Array.from({ length: 90 }, (_, i) => ({
      level: i + 1,
      indicationsNeeded: 100001 + (i * 10000),
      revShareNivel1: Math.round((36 + (i * 0.07)) * 100) / 100
    })),
    style: {
      bgClass: 'bg-category-lenda-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, black, #4A4646, black, #4A4646, black, #4A4646, black)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
};

// Placeholder for current affiliate data - replace with actual data fetching
const affiliateStatus = {
  currentIndications: 10030, // Atualizado para Mestre Level 1
  // These would typically come from the backend based on currentIndications
  currentCategoryName: 'Mestre',
  currentLevelNumber: 1,
};

// --- Helper function to find level details --- 
const findLevelDetails = (categoryName: string, levelNumber: number): LevelDetail | undefined => {
  // Now correctly typed due to index signature in CategoriesAndLevelsData
  return categoriesAndLevelsData[categoryName]?.levels.find(l => l.level === levelNumber);
};

// --- Helper function to find the next level (can be in the same or next category) ---
// Define a return type for clarity
interface NextLevelInfo {
  categoryName: string;
  levelNumber: number;
  details: LevelDetail;
  isMaxLevel: boolean;
}

const findNextLevel = (currentCategoryName: string, currentLevelNumber: number, currentIndications: number): NextLevelInfo | null => {
  // Now correctly typed due to index signature
  const currentCategoryLevels = categoriesAndLevelsData[currentCategoryName]?.levels;
  if (!currentCategoryLevels) return null;

  const currentLevelIndex = currentCategoryLevels.findIndex(l => l.level === currentLevelNumber);
  if (currentLevelIndex === -1) return null;

  // Check if already at max level overall (assuming Lenda Level 61)
  const lastCategoryName = Object.keys(categoriesAndLevelsData).pop() || '';
  const lastCategory = categoriesAndLevelsData[lastCategoryName];
  const maxLevelOverall = lastCategory?.levels[lastCategory.levels.length - 1];

  if (maxLevelOverall && currentCategoryName === lastCategoryName && currentLevelNumber === maxLevelOverall.level) {
      return { categoryName: lastCategoryName, levelNumber: maxLevelOverall.level, details: maxLevelOverall, isMaxLevel: true };
  }

  // Check if there's a next level within the current category
  if (currentLevelIndex < currentCategoryLevels.length - 1) {
    const nextLevelData = currentCategoryLevels[currentLevelIndex + 1];
    // Return this as the next level regardless of indications, the UI will show progress
    return { categoryName: currentCategoryName, levelNumber: nextLevelData.level, details: nextLevelData, isMaxLevel: false };
  }

  // If it's the last level of the current category, find the first level of the next category
  const categoryNames = Object.keys(categoriesAndLevelsData);
  const currentCategoryIndex = categoryNames.indexOf(currentCategoryName);

  if (currentCategoryIndex < categoryNames.length - 1) {
    const nextCategoryName = categoryNames[currentCategoryIndex + 1];
    // Now correctly typed due to index signature
    const nextCategoryLevels = categoriesAndLevelsData[nextCategoryName]?.levels;
    if (nextCategoryLevels && nextCategoryLevels.length > 0) {
      const firstLevelOfNextCategory = nextCategoryLevels[0];
      return { categoryName: nextCategoryName, levelNumber: firstLevelOfNextCategory.level, details: firstLevelOfNextCategory, isMaxLevel: false };
    }
  }

  // Fallback: If no next level found (should only happen if already at defined max level)
  if (maxLevelOverall) {
      return { categoryName: lastCategoryName, levelNumber: maxLevelOverall.level, details: maxLevelOverall, isMaxLevel: true };
  }

  return null; // Should not happen with proper data
};

// --- Function to render stars based on category (7 estrelas máximo) ---
const renderStars = (categoryName: string) => {
    const categoryData = categoriesAndLevelsData[categoryName];
    if (!categoryData) return null;

    // Determine number of stars (e.g., based on category index or a specific mapping)
    // For simplicity, let's use index + 1 (Jogador=1, Iniciante=2, ... Lenda=7)
    const categoryNames = Object.keys(categoriesAndLevelsData);
    const categoryIndex = categoryNames.indexOf(categoryName);
    const totalStars = 7; // Max stars alterado para 7
    const activeStars = categoryIndex + 1;

    return (
        <div className="flex items-center space-x-1">
            {[...Array(totalStars)].map((_, i) => (
                <Star
                    key={i}
                    size={12} // Adjust size as needed
                    className={cn(
                        'fill-current',
                        i < activeStars ? 'text-white' : categoryData.style.starColor // Active stars are white, inactive use category style
                    )}
                />
            ))}
        </div>
    );
};

// --- End Helper Functions ---

const CategoriaPage = () => {
  const currentLevelDetails = findLevelDetails(affiliateStatus.currentCategoryName, affiliateStatus.currentLevelNumber);
  const nextLevelInfo = findNextLevel(affiliateStatus.currentCategoryName, affiliateStatus.currentLevelNumber, affiliateStatus.currentIndications);

  const indicationsToNext = nextLevelInfo && !nextLevelInfo.isMaxLevel && nextLevelInfo.details
    ? Math.max(0, nextLevelInfo.details.indicationsNeeded - affiliateStatus.currentIndications) // Ensure non-negative
    : 0;

  // Dados do afiliado (copiados da página inicial)
  const affiliateData = {
    name: 'Eder Ziomek',
    category: 'Mestre',
    level: 1,
    currentIndications: 10030,
    nextLevelRequirement: 11000,
    nextLevelCategory: 'Mestre',
    nextLevel: 2,
  };

  const progressPercentage = 30; // 30 de 100 indicações para próximo level (30%)
  const currentCategoryStyle = categoriesAndLevelsData[affiliateData.category]?.style || categoriesAndLevelsData['Mestre'].style;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Minha Categoria</h1>

      {/* Card do Nome do Afiliado (copiado exatamente da página principal) */}
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
                30 de 100 Indicações Realizadas
              </span>
              <span className="text-sm text-green-500 font-bold">R$500,00</span>
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

      {/* Frame de CPA */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <DollarSign size={20} className="mr-2 text-primary" />
            Valores de CPA por Nível
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Valores de comissão por indicação validada em cada nível da sua rede.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'rgb(43, 48, 57)' }}>
              <div className="text-lg font-bold text-primary">Nível 1</div>
              <div className="text-xl font-bold text-white">R$ 35,00</div>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'rgb(43, 48, 57)' }}>
              <div className="text-lg font-bold text-primary">Nível 2</div>
              <div className="text-xl font-bold text-white">R$ 10,00</div>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'rgb(43, 48, 57)' }}>
              <div className="text-lg font-bold text-primary">Nível 3</div>
              <div className="text-xl font-bold text-white">R$ 5,00</div>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'rgb(43, 48, 57)' }}>
              <div className="text-lg font-bold text-primary">Nível 4</div>
              <div className="text-xl font-bold text-white">R$ 5,00</div>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'rgb(43, 48, 57)' }}>
              <div className="text-lg font-bold text-primary">Nível 5</div>
              <div className="text-xl font-bold text-white">R$ 5,00</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Categories & Levels List (Accordion) */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Target size={20} className="mr-2 text-primary" />
            Categorias e Levels
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Explore as categorias e veja como progredir para aumentar suas comissões.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0"> {/* Removed padding */}
            {/* Set defaultValue to expand the current category */}
            <Accordion type="single" collapsible className="w-full" defaultValue={affiliateStatus.currentCategoryName}>
                {Object.entries(categoriesAndLevelsData).map(([categoryName, categoryData]) => {
                    const isCurrentCategory = categoryName === affiliateStatus.currentCategoryName;
                    // const CategoryIcon = categoryData.icon; // Get the icon component - Not used in new design

                    return (
                        <AccordionItem value={categoryName} key={categoryName} className={cn(
                            "border-b-0 mb-0 rounded-none", // Remover border-2 para eliminar bordas coloridas
                            categoryData.style.bgClass // Apply category background color
                        )}>
                            <AccordionTrigger className="text-base font-medium hover:no-underline px-0 py-0 group data-[state=open]:pb-1">
                                <div className="flex flex-col w-full">
                                    {/* Top part with gradient and stars - Full width */}
                                    <div
                                        className="h-5 w-full mb-2 rounded-t-sm relative px-4 py-1"
                                        style={categoryData.style.gradientStyle}
                                    >
                                        <div className="pl-2 pt-0">
                                            {renderStars(categoryName)}
                                        </div>
                                        {/* Setinha posicionada dentro da barra de estrelas à direita */}
                                        <ChevronDown className={cn(
                                            "h-4 w-4 shrink-0 transition-transform duration-200 absolute right-2 top-0.5",
                                            "text-white",
                                            "group-data-[state=open]:rotate-180"
                                        )} />
                                    </div>
                                    {/* Bottom part with text only */}
                                    <div className="flex items-center justify-between w-full px-4">
                                        <span className={cn(
                                            "font-heading font-black italic text-xl",
                                            categoryData.style.textColor
                                        )}>
                                            {categoryName.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-text-secondary text-sm pt-2 pb-4 px-4 space-y-3 bg-inherit">
                                {/* Informações gerais da categoria */}
                                <div className="space-y-2">
                                  {(() => {
                                    const commissionInfo = (() => {
                                      switch (categoryName) {
                                        case 'Jogador':
                                          return {
                                            revShareRange: '1% até 6%',
                                            revShareNivel2_5: '1%',
                                            progressionInfo: 'Aumente sua comissão Nível 1 ao subir de Level'
                                          };
                                        case 'Iniciante':
                                          return {
                                            revShareRange: '6% até 12%',
                                            revShareNivel2_5: '2%',
                                            progressionInfo: 'Aumente sua comissão Nível 1 ao subir de Level'
                                          };
                                        case 'Afiliado':
                                          return {
                                            revShareRange: '12% até 18%',
                                            revShareNivel2_5: '3%',
                                            progressionInfo: 'Aumente sua comissão Nível 1 ao subir de Level'
                                          };
                                        case 'Profissional':
                                          return {
                                            revShareRange: '18% até 24%',
                                            revShareNivel2_5: '4%',
                                            progressionInfo: 'Aumente sua comissão Nível 1 ao subir de Level'
                                          };
                                        case 'Expert':
                                          return {
                                            revShareRange: '24% até 30%',
                                            revShareNivel2_5: '5%',
                                            progressionInfo: 'Aumente sua comissão Nível 1 ao subir de Level'
                                          };
                                        case 'Mestre':
                                          return {
                                            revShareRange: '30% até 36%',
                                            revShareNivel2_5: '6%',
                                            progressionInfo: 'Aumente sua comissão Nível 1 ao subir de Level'
                                          };
                                        case 'Lenda':
                                          return {
                                            revShareRange: '36% até 42%',
                                            revShareNivel2_5: '7%',
                                            progressionInfo: 'Aumente sua comissão Nível 1 ao subir de Level'
                                          };
                                        default:
                                          return {
                                            revShareRange: 'N/A',
                                            revShareNivel2_5: 'N/A',
                                            progressionInfo: 'N/A'
                                          };
                                      }
                                    })();

                                    return (
                                      <>
                                        <p className="flex items-center mb-2">
                                          <Info size={14} className="mr-2 text-primary flex-shrink-0"/>
                                          <span className="font-semibold text-white">Comissão Nível 1: </span>
                                          <span className="ml-1">{commissionInfo.revShareRange}</span>
                                        </p>
                                        <p className="flex items-center mb-2">
                                          <DollarSign size={14} className="mr-2 text-yellow-400 flex-shrink-0"/>
                                          <span className="font-semibold text-white">Comissão Nível 2-5: </span>
                                          <span className="ml-1">{commissionInfo.revShareNivel2_5}</span>
                                        </p>
                                        <p className="flex items-center">
                                          <TrendingUp size={14} className="mr-2 text-green-400 flex-shrink-0"/>
                                          <span>{commissionInfo.progressionInfo}</span>
                                        </p>
                                      </>
                                    );
                                  })()}
                                </div>

                                {/* Informações específicas se for a categoria atual */}
                                {isCurrentCategory && currentLevelDetails && nextLevelInfo && nextLevelInfo.details && (
                                    <div className="p-3 bg-border rounded-md space-y-2 mt-4">
                                        <p>
                                            <span className="font-semibold text-white">Seu Level Atual ({currentLevelDetails.level}): </span>
                                            <span>Comissão Nível 1: </span>
                                            <span className="text-primary font-medium">{currentLevelDetails.revShareNivel1}%</span>
                                        </p>
                                        {!nextLevelInfo.isMaxLevel ? (
                                            <p>
                                                <span className="font-semibold text-white">Próximo Level ({nextLevelInfo.levelNumber} - {nextLevelInfo.categoryName}): </span>
                                                <span>Comissão Nível 1: </span>
                                                <span className="text-primary font-medium">{nextLevelInfo.details.revShareNivel1}%</span>
                                            </p>
                                        ) : (
                                            <p className="flex items-center text-green-400">
                                                <CheckCircle size={14} className="mr-1"/> Você atingiu o Level máximo!
                                            </p>
                                        )}
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </CardContent>
      </Card>

    </div>
  );
};

export default CategoriaPage;

