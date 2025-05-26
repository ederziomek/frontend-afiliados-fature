import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, CalendarDays, Crown, Info, ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from 'next/link';
import JackpotDisplay from './JackpotDisplay';
import Image from 'next/image';

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

// --- Placeholder Data (Aumentado) ---
const placeholderRankingData: RankingData = {
  directIndications: {
    weekly: [
      { rank: 1, name: 'Ana Silva', value: 28 },
      { rank: 2, name: 'Carlos Souza', value: 25 },
      { rank: 3, name: 'Jéssica Miranda', value: 21, isCurrentUser: true }, // Example Current User
      { rank: 4, name: 'Bruno Costa', value: 19 },
      { rank: 5, name: 'Fernanda Lima', value: 17 },
      { rank: 6, name: 'Ricardo Alves', value: 15 },
      { rank: 7, name: 'Mariana Dias', value: 14 },
      { rank: 8, name: 'Lucas Martins', value: 12 },
      { rank: 9, name: 'Patrícia Rocha', value: 10 },
      { rank: 10, name: 'Gabriel Santos', value: 8 },
    ],
    monthly: [
      { rank: 1, name: 'Ana Silva', value: 95 },
      { rank: 2, name: 'Carlos Souza', value: 88 },
      { rank: 3, name: 'Bruno Costa', value: 82 },
      { rank: 4, name: 'Jéssica Miranda', value: 79, isCurrentUser: true },
      { rank: 5, name: 'Fernanda Lima', value: 75 },
      { rank: 6, name: 'Ricardo Alves', value: 73 },
      { rank: 7, name: 'Mariana Dias', value: 70 },
      { rank: 8, name: 'Lucas Martins', value: 68 },
      { rank: 9, name: 'Patrícia Rocha', value: 65 },
      { rank: 10, name: 'Gabriel Santos', value: 62 },
    ],
  },
  indirectIndications: { // Dados aumentados
    weekly: [
        { rank: 1, name: 'Equipe Sol', value: 80 },
        { rank: 2, name: 'Time Lua', value: 75 },
        { rank: 3, name: 'Jéssica Miranda', value: 70, isCurrentUser: true },
        { rank: 4, name: 'Grupo Estrela', value: 68 },
        { rank: 5, name: 'Rede Cometa', value: 65 },
        { rank: 6, name: 'Bonde Trovão', value: 62 },
        { rank: 7, name: 'Esquadrão Raio', value: 60 },
        { rank: 8, name: 'Clã Fênix', value: 58 },
        { rank: 9, name: 'Aliança Dragão', value: 55 },
        { rank: 10, name: 'Liga Centauro', value: 52 },
    ],
    monthly: [
        { rank: 1, name: 'Equipe Sol', value: 350 },
        { rank: 2, name: 'Time Lua', value: 330 },
        { rank: 3, name: 'Grupo Estrela', value: 310 },
        { rank: 4, name: 'Jéssica Miranda', value: 300, isCurrentUser: true },
        { rank: 5, name: 'Rede Cometa', value: 290 },
        { rank: 6, name: 'Bonde Trovão', value: 280 },
        { rank: 7, name: 'Esquadrão Raio', value: 270 },
        { rank: 8, name: 'Clã Fênix', value: 260 },
        { rank: 9, name: 'Aliança Dragão', value: 250 },
        { rank: 10, name: 'Liga Centauro', value: 240 },
    ],
  },
  dailySequence: { // Dados aumentados
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

// Placeholder for Jackpot Prizes (Aumentado)
const placeholderJackpotPrizes: JackpotPrizes = {
  directIndications: { weekly: 1500.00, monthly: 3000.00 },
  indirectIndications: { weekly: 750.00, monthly: 1500.00 },
  dailySequence: { weekly: 500.00, monthly: 1000.00 },
};

// --- Ranking Component ---
type RankingType = 'directIndications' | 'indirectIndications' | 'dailySequence';

const RankingSection = () => {
  const [selectedRanking, setSelectedRanking] = useState<RankingType>('directIndications');
  const [selectedPeriod, setSelectedPeriod] = useState<RankingPeriod>('weekly');

  const rankingDetails = {
    directIndications: { title: 'Indicações Diretas Válidas', icon: Image, unit: 'indicações' },
    indirectIndications: { title: 'Indicações Indiretas (Construtor)', icon: Users, unit: 'indicações' },
    dailySequence: { title: 'Maior Sequência Diária', icon: CalendarDays, unit: '' },
  };

  const currentRankingData = placeholderRankingData[selectedRanking][selectedPeriod];
  const currentUserPosition = placeholderUserPosition[selectedRanking][selectedPeriod];
  const currentJackpotPrize = placeholderJackpotPrizes[selectedRanking][selectedPeriod]; // Get current jackpot
  const CurrentIcon = rankingDetails[selectedRanking].icon;

  // Função para renderizar o ícone de troféu baseado na posição
  const renderTrophyIcon = (rank: number) => {
    if (rank === 1) {
      return <Image src="/icons/trophy_1.png" width={20} height={20} alt="1º Lugar" className="inline-block" />;
    } else if (rank === 2) {
      return <Image src="/icons/trophy_2.png" width={20} height={20} alt="2º Lugar" className="inline-block" />;
    } else if (rank === 3) {
      return <Image src="/icons/trophy_3.png" width={20} height={20} alt="3º Lugar" className="inline-block" />;
    } else {
      return `${rank}º`;
    }
  };

  return (
    <Card className="bg-card border-border text-white overflow-hidden border-2 border-primary/30">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <CardTitle className="flex items-center">
            <Image src="/icons/trophy_1.png" width={24} height={24} alt="Troféu" className="mr-2" />
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

        {/* Jackpot Display - Alterado para usar cores ciano em vez de amarelo */}
        <div className={cn(
            "p-4 rounded-lg text-center mb-6",
            "bg-gradient-to-br from-black via-gray-900 to-black",
            "border border-primary/50 shadow-xl shadow-primary/20" // Alterado para ciano
        )}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2"> {/* Alterado para ciano */}
                Prêmio Total {selectedPeriod === 'weekly' ? 'Semanal' : 'Mensal'}
            </p>
            {/* Use JackpotDisplay component - será atualizado para usar cores ciano */}
            <JackpotDisplay value={currentJackpotPrize} key={`${selectedRanking}-${selectedPeriod}`} /> 
            <p className="text-xs text-primary/70 mt-2">({rankingDetails[selectedRanking].title})</p> {/* Alterado para ciano */}
        </div>

        <CardDescription className="text-text-secondary pt-2">Veja sua posição e os Top 10 afiliados.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedRanking} onValueChange={(value) => setSelectedRanking(value as RankingType)} className="w-full">
          <TabsList className="flex flex-wrap justify-center sm:justify-start gap-2 bg-transparent p-0 mb-4">
            <TabsTrigger
              value="directIndications"
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md border",
                selectedRanking === "directIndications" 
                  ? "bg-primary text-white border-primary" // Botão selecionado: fundo ciano, texto branco
                  : "border-border bg-border/50 text-text-secondary hover:bg-border/70 transition-colors"
              )}
            >
              Ind. Diretas
            </TabsTrigger>
            <TabsTrigger
              value="indirectIndications"
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md border",
                selectedRanking === "indirectIndications" 
                  ? "bg-primary text-white border-primary" // Botão selecionado: fundo ciano, texto branco
                  : "border-border bg-border/50 text-text-secondary hover:bg-border/70 transition-colors"
              )}
            >
              Ind. Indiretas
            </TabsTrigger>
            <TabsTrigger
              value="dailySequence"
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 rounded-md border",
                selectedRanking === "dailySequence" 
                  ? "bg-primary text-white border-primary" // Botão selecionado: fundo ciano, texto branco
                  : "border-border bg-border/50 text-text-secondary hover:bg-border/70 transition-colors"
              )}
            >
              Sequência
            </TabsTrigger>
          </TabsList>

          {(["directIndications", "indirectIndications", "dailySequence"] as RankingType[]).map(rankingType => (
            <TabsContent key={rankingType} value={rankingType}>
              <div className="space-y-4">
                <div className="bg-border/30 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2 text-sm border-2 border-primary/30">
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
                          <td className={`px-4 py-2 text-center w-12 ${entry.rank <= 3 ? 'text-primary' : ''}`}>
                            {renderTrophyIcon(entry.rank)}
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
