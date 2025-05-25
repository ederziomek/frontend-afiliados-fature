"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Users, CalendarDays, Crown, Info, ExternalLink } from 'lucide-react'; // Added Info, ExternalLink
import { cn } from "@/lib/utils"; // Import cn utility
import Link from 'next/link'; // Import Link
import JackpotDisplay from './JackpotDisplay'; // Import the new JackpotDisplay component

// --- Placeholder Data Structures ---
type RankingPeriod = 'weekly' | 'monthly';

interface RankingEntry {
  rank: number;
  name: string;
  value: number | string; // Could be count or days
  isCurrentUser?: boolean;
}

interface RankingData {
  directIndications: {
    weekly: RankingEntry[];
    monthly: RankingEntry[];
  };
  indirectIndications: {
    weekly: RankingEntry[];
    monthly: RankingEntry[];
  };
  dailySequence: {
    weekly: RankingEntry[];
    monthly: RankingEntry[];
  };
}

interface UserPosition {
  directIndications: { weekly: number | null; monthly: number | null };
  indirectIndications: { weekly: number | null; monthly: number | null };
  dailySequence: { weekly: number | null; monthly: number | null };
}

// Added structure for Jackpot Prizes
interface JackpotPrizes {
  directIndications: { weekly: number; monthly: number };
  indirectIndications: { weekly: number; monthly: number };
  dailySequence: { weekly: number; monthly: number };
}

// --- Placeholder Data ---
const placeholderRankingData: RankingData = {
  directIndications: {
    weekly: [
      { rank: 1, name: 'Ana Silva', value: 15 },
      { rank: 2, name: 'Carlos Souza', value: 12 },
      { rank: 3, name: 'Jéssica Miranda', value: 11, isCurrentUser: true }, // Example Current User
      { rank: 4, name: 'Bruno Costa', value: 10 },
      { rank: 5, name: 'Fernanda Lima', value: 9 },
      { rank: 6, name: 'Ricardo Alves', value: 8 },
      { rank: 7, name: 'Mariana Dias', value: 7 },
      { rank: 8, name: 'Lucas Martins', value: 6 },
      { rank: 9, name: 'Patrícia Rocha', value: 5 },
      { rank: 10, name: 'Gabriel Santos', value: 4 },
    ],
    monthly: [
      { rank: 1, name: 'Ana Silva', value: 55 },
      { rank: 2, name: 'Carlos Souza', value: 48 },
      { rank: 3, name: 'Bruno Costa', value: 42 },
      { rank: 4, name: 'Jéssica Miranda', value: 39, isCurrentUser: true },
      { rank: 5, name: 'Fernanda Lima', value: 35 },
      { rank: 6, name: 'Ricardo Alves', value: 33 },
      { rank: 7, name: 'Mariana Dias', value: 30 },
      { rank: 8, name: 'Lucas Martins', value: 28 },
      { rank: 9, name: 'Patrícia Rocha', value: 25 },
      { rank: 10, name: 'Gabriel Santos', value: 22 },
    ],
  },
  indirectIndications: { // Placeholder - Similar structure
    weekly: [
        { rank: 1, name: 'Equipe Sol', value: 50 },
        { rank: 2, name: 'Time Lua', value: 45 },
        { rank: 3, name: 'Jéssica Miranda', value: 40, isCurrentUser: true },
        { rank: 4, name: 'Grupo Estrela', value: 38 },
        { rank: 5, name: 'Rede Cometa', value: 35 },
        { rank: 6, name: 'Bonde Trovão', value: 32 },
        { rank: 7, name: 'Esquadrão Raio', value: 30 },
        { rank: 8, name: 'Clã Fênix', value: 28 },
        { rank: 9, name: 'Aliança Dragão', value: 25 },
        { rank: 10, name: 'Liga Centauro', value: 22 },
    ],
    monthly: [
        { rank: 1, name: 'Equipe Sol', value: 200 },
        { rank: 2, name: 'Time Lua', value: 180 },
        { rank: 3, name: 'Grupo Estrela', value: 160 },
        { rank: 4, name: 'Jéssica Miranda', value: 150, isCurrentUser: true },
        { rank: 5, name: 'Rede Cometa', value: 140 },
        { rank: 6, name: 'Bonde Trovão', value: 130 },
        { rank: 7, name: 'Esquadrão Raio', value: 120 },
        { rank: 8, name: 'Clã Fênix', value: 110 },
        { rank: 9, name: 'Aliança Dragão', value: 100 },
        { rank: 10, name: 'Liga Centauro', value: 90 },
    ],
  },
  dailySequence: { // Placeholder - Similar structure
    weekly: [
        { rank: 1, name: 'Perseverante 1', value: '7 dias' },
        { rank: 2, name: 'Constante 2', value: '7 dias' },
        { rank: 3, name: 'Jéssica Miranda', value: '6 dias', isCurrentUser: true },
        { rank: 4, name: 'Focado 4', value: '6 dias' },
        { rank: 5, name: 'Regular 5', value: '5 dias' },
        { rank: 6, name: 'Assíduo 6', value: '5 dias' },
        { rank: 7, name: 'Presente 7', value: '4 dias' },
        { rank: 8, name: 'Diário 8', value: '4 dias' },
        { rank: 9, name: 'Rotineiro 9', value: '3 dias' },
        { rank: 10, name: 'Frequente 10', value: '3 dias' },
    ],
    monthly: [
        { rank: 1, name: 'Perseverante 1', value: '30 dias' },
        { rank: 2, name: 'Constante 2', value: '28 dias' },
        { rank: 3, name: 'Focado 4', value: '27 dias' },
        { rank: 4, name: 'Jéssica Miranda', value: '25 dias', isCurrentUser: true },
        { rank: 5, name: 'Regular 5', value: '24 dias' },
        { rank: 6, name: 'Assíduo 6', value: '22 dias' },
        { rank: 7, name: 'Presente 7', value: '21 dias' },
        { rank: 8, name: 'Diário 8', value: '20 dias' },
        { rank: 9, name: 'Rotineiro 9', value: '19 dias' },
        { rank: 10, name: 'Frequente 10', value: '18 dias' },
    ],
  },
};

const placeholderUserPosition: UserPosition = {
  directIndications: { weekly: 3, monthly: 4 },
  indirectIndications: { weekly: 3, monthly: 4 },
  dailySequence: { weekly: 3, monthly: 4 },
};

// Placeholder for Jackpot Prizes
const placeholderJackpotPrizes: JackpotPrizes = {
  directIndications: { weekly: 500.00, monthly: 1000.00 },
  indirectIndications: { weekly: 250.00, monthly: 500.00 },
  dailySequence: { weekly: 150.00, monthly: 300.00 },
};

// --- Ranking Component ---
type RankingType = 'directIndications' | 'indirectIndications' | 'dailySequence';

const RankingSection = () => {
  const [selectedRanking, setSelectedRanking] = useState<RankingType>('directIndications');
  const [selectedPeriod, setSelectedPeriod] = useState<RankingPeriod>('weekly');

  const rankingDetails = {
    directIndications: { title: 'Indicações Diretas Válidas', icon: Trophy, unit: 'indicações' },
    indirectIndications: { title: 'Indicações Indiretas (Construtor)', icon: Users, unit: 'indicações' },
    dailySequence: { title: 'Maior Sequência Diária', icon: CalendarDays, unit: '' },
  };

  const currentRankingData = placeholderRankingData[selectedRanking][selectedPeriod];
  const currentUserPosition = placeholderUserPosition[selectedRanking][selectedPeriod];
  const currentJackpotPrize = placeholderJackpotPrizes[selectedRanking][selectedPeriod]; // Get current jackpot
  const CurrentIcon = rankingDetails[selectedRanking].icon;

  return (
    <Card className="bg-card border-border text-white overflow-hidden"> {/* Added overflow-hidden */}
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <CardTitle className="flex items-center">
            <CurrentIcon size={24} className="mr-2 text-primary" />
            Rankings
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <Select value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as RankingPeriod)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-border border-border text-white focus:ring-primary">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-white">
                <SelectItem value="weekly" className="hover:bg-border focus:bg-border">Semanal</SelectItem>
                <SelectItem value="monthly" className="hover:bg-border focus:bg-border">Mensal</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/rankings" legacyBehavior>
                <a className="text-sm text-primary hover:underline flex items-center whitespace-nowrap">
                    Ver Detalhes <ExternalLink size={14} className="ml-1" />
                </a>
            </Link>
          </div>
        </div>

        {/* Jackpot Display - Replaced simple text with JackpotDisplay component */}
        <div className={cn(
            "p-4 rounded-lg text-center mb-6", // Increased mb-6
            "bg-gradient-to-br from-black via-gray-900 to-black", // Dark background
            "border border-yellow-600/50 shadow-xl shadow-yellow-500/20" // Border and shadow
        )}>
            <p className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">
                Prêmio Total {selectedPeriod === 'weekly' ? 'Semanal' : 'Mensal'}
            </p>
            {/* Use JackpotDisplay component */}
            <JackpotDisplay value={currentJackpotPrize} key={`${selectedRanking}-${selectedPeriod}`} /> 
            <p className="text-xs text-yellow-400/70 mt-2">({rankingDetails[selectedRanking].title})</p>
        </div>

        <CardDescription className="text-text-secondary pt-2">Veja sua posição e os Top 10 afiliados.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedRanking} onValueChange={(value) => setSelectedRanking(value as RankingType)} className="w-full">
          <TabsList className="flex flex-wrap justify-center sm:justify-start gap-2 bg-transparent p-0 mb-4">
            <TabsTrigger
              value="directIndications"
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md border border-border bg-border/50 text-text-secondary data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:border-primary",
                "hover:bg-border/70 transition-colors"
              )}
            >
              Ind. Diretas
            </TabsTrigger>
            <TabsTrigger
              value="indirectIndications"
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md border border-border bg-border/50 text-text-secondary data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:border-primary",
                "hover:bg-border/70 transition-colors"
              )}
            >
              Ind. Indiretas
            </TabsTrigger>
            <TabsTrigger
              value="dailySequence"
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md border border-border bg-border/50 text-text-secondary data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:border-primary",
                "hover:bg-border/70 transition-colors"
              )}
            >
              Sequência
            </TabsTrigger>
          </TabsList>

          {(["directIndications", "indirectIndications", "dailySequence"] as RankingType[]).map(rankingType => (
            <TabsContent key={rankingType} value={rankingType}>
              <div className="space-y-4">
                <div className="bg-border/30 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
                  <div className="text-center sm:text-left">
                    <span className="text-text-secondary">Sua Posição: </span>
                    <span className="font-bold text-lg text-primary">{currentUserPosition ? `${currentUserPosition}º` : 'Fora do Top 10'}</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-text-secondary uppercase">
                      <tr>
                        <th className="px-4 py-2">Pos.</th>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2 text-right">{rankingDetails[rankingType].unit ? rankingDetails[rankingType].title : 'Valor'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRankingData.length === 0 && (
                        <tr><td colSpan={3} className="text-center py-4 text-text-secondary">Nenhum dado disponível.</td></tr>
                      )}
                      {currentRankingData.map((entry) => (
                        <tr key={entry.rank} className={`border-b border-border/50 ${entry.isCurrentUser ? 'bg-primary/10 font-semibold' : 'hover:bg-border/30'}`}>
                          <td className={`px-4 py-2 text-center w-12 ${entry.rank <= 3 ? 'text-yellow-400' : ''}`}>
                            {entry.rank === 1 ? <Crown size={16} className="inline-block text-yellow-400"/> : `${entry.rank}º`}
                          </td>
                          <td className="px-4 py-2">{entry.name}</td>
                          <td className="px-4 py-2 text-right">
                            {entry.value} {entry.rank <=3 && rankingDetails[rankingType].unit ? <span className='text-xs text-gray-400'>{rankingDetails[rankingType].unit}</span> : rankingDetails[rankingType].unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RankingSection;

