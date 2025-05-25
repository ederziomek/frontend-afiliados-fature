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
  LucideIcon // Import LucideIcon type
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Regular: CategoryData;
  Profissional: CategoryData;
  Elite: CategoryData;
  Expert: CategoryData;
  Mestre: CategoryData;
  Lenda: CategoryData;
}

// --- Structure representing Categories and Levels (Placeholder Data) ---
// NOTE: This is a simplified placeholder. The actual implementation needs the full 61 levels
// with their indication requirements and RevShare Nivel 1 percentages.
// Added style information based on tailwind.config.ts and reference images
const categoriesAndLevelsData: CategoriesAndLevelsData = {
  Jogador: {
    icon: Award, // Using Award icon as placeholder
    levels: [
      { level: 1, indicationsNeeded: 0, revShareNivel1: 5 },
      { level: 2, indicationsNeeded: 3, revShareNivel1: 6 },
      { level: 3, indicationsNeeded: 4, revShareNivel1: 7 }, // Last level of Jogador
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
      { level: 1, indicationsNeeded: 5, revShareNivel1: 10 }, // First level of Iniciante
      { level: 2, indicationsNeeded: 8, revShareNivel1: 11 },
      { level: 3, indicationsNeeded: 12, revShareNivel1: 12 },
      { level: 4, indicationsNeeded: 17, revShareNivel1: 13 },
      { level: 5, indicationsNeeded: 19, revShareNivel1: 14 }, // Last level of Iniciante
    ],
    style: {
      bgClass: 'bg-category-iniciante-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #809996, #A9D8D2, white, #A9D8D2, #809996)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Regular: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 20, revShareNivel1: 15 }, // First level of Regular
      { level: 2, indicationsNeeded: 25, revShareNivel1: 16 },
      // ... more levels ...
      { level: 10, indicationsNeeded: 49, revShareNivel1: 20 }, // Example last level
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
    levels: [
      { level: 1, indicationsNeeded: 50, revShareNivel1: 21 },
      // ... more levels ...
    ],
    style: {
      bgClass: 'bg-category-profissional-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #29A9A9, #43C3C1, #5EDED9)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Elite: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 100, revShareNivel1: 26 },
      // ... more levels ...
    ],
    style: {
      bgClass: 'bg-category-elite-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #008474, #00FFF0, #008474)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Expert: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 250, revShareNivel1: 31 },
      // ... more levels ...
    ],
    style: {
      bgClass: 'bg-category-expert-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #003F39, #00796B, #9CBCB9, #00796B, #003F39)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Mestre: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 500, revShareNivel1: 36 },
      // ... more levels ...
    ],
    style: {
      bgClass: 'bg-category-mestre-bg',
      gradientStyle: { backgroundImage: 'linear-gradient(to right, #014E4E, #1AA5A5, #014E4E, #1AA5A5, #014E4E, #1AA5A5, #014E4E)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
  Lenda: {
    icon: Award,
    levels: [
      { level: 1, indicationsNeeded: 1000, revShareNivel1: 41 },
      // ... Level 61 is the max ...
      { level: 61, indicationsNeeded: 9999, revShareNivel1: 70 }, // Example max level
    ],
    style: {
      bgClass: 'bg-category-lenda-bg', // Uses #2E3738
      gradientStyle: { backgroundImage: 'linear-gradient(to right, black, #4A4646, black, #4A4646, black, #4A4646, black)' },
      textColor: 'text-white',
      starColor: 'text-white opacity-30'
    }
  },
};

// Placeholder for current affiliate data - replace with actual data fetching
const affiliateStatus = {
  currentIndications: 11, // Example: Affiliate has 11 validated direct indications
  // These would typically come from the backend based on currentIndications
  currentCategoryName: 'Iniciante',
  currentLevelNumber: 2,
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

// --- Function to render stars based on category ---
const renderStars = (categoryName: string) => {
    const categoryData = categoriesAndLevelsData[categoryName];
    if (!categoryData) return null;

    // Determine number of stars (e.g., based on category index or a specific mapping)
    // For simplicity, let's use index + 1 (Jogador=1, Iniciante=2, ... Lenda=8)
    const categoryNames = Object.keys(categoriesAndLevelsData);
    const categoryIndex = categoryNames.indexOf(categoryName);
    const totalStars = 8; // Max stars for Lenda
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Minha Categoria</h1>

      {/* Current Level Info Card - Needs update to include Level */}
      {/* This section might be better placed in a header or dashboard component */}
      <Card className="bg-card border-border p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h2 className="text-lg font-semibold text-white flex items-center mb-2 sm:mb-0">
            {/* Icon can be dynamic based on category later */}
            <Award size={20} className="mr-2 text-primary" />
            Sua Posição Atual
          </h2>
          {currentLevelDetails ? (
            <div className="text-right">
              <Badge variant="default" className="text-sm font-medium">
                {affiliateStatus.currentCategoryName}
              </Badge>
              <p className="text-xs text-text-secondary mt-1">Level {affiliateStatus.currentLevelNumber}</p>
            </div>
          ) : (
            <Badge variant="destructive">Erro ao carregar</Badge>
          )}
        </div>
      </Card>

      {/* All Categories & Levels List (Accordion) */}
      <Card className="bg-card border-border overflow-hidden"> {/* Added overflow-hidden */}
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
                            "border-b-0 mb-0 rounded-none", // Remove bottom border, margin, rounding
                            categoryData.style.bgClass // Apply category background color
                        )}>
                            <AccordionTrigger className="text-base font-medium hover:no-underline px-4 py-3 group data-[state=open]:pb-1"> {/* Adjusted padding */}
                                <div className="flex flex-col w-full">
                                    {/* Top part with gradient and stars */}
                                    <div
                                        className="h-5 w-full mb-2 rounded-t-sm" // Height and margin matching SVG approx
                                        style={categoryData.style.gradientStyle}
                                    >
                                        <div className="pl-2 pt-1"> {/* Position stars */}
                                            {renderStars(categoryName)}
                                        </div>
                                    </div>
                                    {/* Bottom part with text and chevron */}
                                    <div className="flex items-center justify-between w-full">
                                        <span className={cn(
                                            "font-heading font-black italic text-xl", // Use Exo 2, bold (900), italic, adjust size
                                            categoryData.style.textColor
                                        )}>
                                            {categoryName.toUpperCase()} {/* Uppercase like reference */}
                                        </span>
                                        <ChevronDown className={cn(
                                            "h-5 w-5 shrink-0 transition-transform duration-200",
                                            categoryData.style.textColor,
                                            "group-data-[state=open]:rotate-180"
                                        )} />
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-text-secondary text-sm pt-2 pb-4 px-4 space-y-3 bg-inherit"> {/* Inherit background */}
                                <p className="flex items-center">
                                    <Info size={14} className="mr-1 text-primary flex-shrink-0"/>
                                    Subir de Level aumenta a sua comissão para indicações Nível 1.
                                </p>
                                {/* Show current/next level info only if this is the user's current category */}
                                {isCurrentCategory && currentLevelDetails && nextLevelInfo && nextLevelInfo.details && (
                                    <div className="p-3 bg-border rounded-md space-y-2">
                                        <p>
                                            <span className="font-semibold text-white">Seu Level Atual ({currentLevelDetails.level}):</span> Comissão Nível 1: <span className="text-primary font-medium">{currentLevelDetails.revShareNivel1}%</span>
                                        </p>
                                        {!nextLevelInfo.isMaxLevel ? (
                                            <>
                                                <p>
                                                    <span className="font-semibold text-white">Próximo Level ({nextLevelInfo.levelNumber} - {nextLevelInfo.categoryName}):</span> Comissão Nível 1: <span className="text-primary font-medium">{nextLevelInfo.details.revShareNivel1}%</span>
                                                </p>
                                                <p className="flex items-center">
                                                    <TrendingUp size={14} className="mr-1 text-green-400"/>
                                                    Requisito: {nextLevelInfo.details.indicationsNeeded} indicações validadas (faltam {indicationsToNext})
                                                </p>
                                            </>
                                        ) : (
                                            <p className="flex items-center text-green-400">
                                                <CheckCircle size={14} className="mr-1"/> Você atingiu o Level máximo!
                                            </p>
                                        )}
                                    </div>
                                )}
                                {/* Optional: Could add a brief list of levels within this category if needed */}
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

