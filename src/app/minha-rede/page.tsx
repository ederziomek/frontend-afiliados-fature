"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserPlus, DollarSign, Search, ArrowRight, GitBranch, BarChartHorizontal, CalendarDays, CheckCircle, Award } from 'lucide-react'; // Added Award
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator'; // Import Separator

// --- Placeholder Data (Includes Category/Level) ---
// NOTE: Actual data fetching needs to provide category and level for affiliates
const networkData = {
  overview: {
    total: 8,
    active: 5,
    level2: 3,
    commissions: 470.00,
  },
  referrals: [
    { id: 1, name: 'Maria Santos', level: 1, subReferrals: 3, commission: 150.00, initials: 'MS', dailySequence: 5, category: 'Profissional', categoryLevel: 2 }, // Added category/level
    { id: 2, name: 'Pedro Lima', level: 1, subReferrals: 1, commission: 80.00, initials: 'PL', dailySequence: 2, category: 'Regular', categoryLevel: 8 }, // Added category/level
    { id: 3, name: 'Ana Costa', level: 1, subReferrals: 0, commission: 50.00, initials: 'AC', dailySequence: 7, category: 'Iniciante', categoryLevel: 5 }, // Added category/level
    { id: 4, name: 'Roberto Silva', level: 2, via: 'Maria Santos', commission: 30.00, initials: 'RS', category: 'Iniciante', categoryLevel: 3 }, // Added category/level
    { id: 5, name: 'Luciana Martins', level: 1, subReferrals: 0, commission: 0.00, initials: 'LM', dailySequence: 0, category: 'Jogador', categoryLevel: 1 }, // Added category/level
    { id: 6, name: 'Carlos Pereira', level: 3, via: 'Roberto Silva', commission: 10.00, initials: 'CP', category: 'Jogador', categoryLevel: 1 }, // Added category/level
    { id: 7, name: 'Juliana Alves', level: 1, subReferrals: 2, commission: 120.00, initials: 'JA', dailySequence: 3, category: 'Regular', categoryLevel: 5 }, // Added category/level
    { id: 8, name: 'Fernando Dias', level: 2, via: 'Juliana Alves', commission: 40.00, initials: 'FD', category: 'Iniciante', categoryLevel: 1 }, // Added category/level
  ],
  performance: [
    { level: 1, count: 5, revenue: 400.00 },
    { level: 2, count: 2, revenue: 70.00 },
    { level: 3, count: 1, revenue: 10.00 },
    { level: 4, count: 0, revenue: 0.00 },
    { level: 5, count: 0, revenue: 0.00 },
  ]
};
// --- End Placeholder Data ---

// Define type for levelColors with index signature
interface LevelColors {
  [key: number]: string; // Allows number keys
}

const levelColors: LevelColors = {
  1: 'bg-cyan-500 border-cyan-500 text-cyan-50',
  2: 'bg-yellow-500 border-yellow-500 text-yellow-50',
  3: 'bg-green-500 border-green-500 text-green-50',
  4: 'bg-orange-500 border-orange-500 text-orange-50',
  5: 'bg-purple-500 border-purple-500 text-purple-50',
};

const MinhaRedePage = () => {
  const [selectedLevel, setSelectedLevel] = useState(0); // Default to Level 0 (Todos)
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [periodFilter, setPeriodFilter] = useState<string>("this_month");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handlePeriodChange = (value: string) => {
    setPeriodFilter(value);
    if (value !== "custom") {
      setDateRange(undefined);
    }
    // TODO: Add logic here to fetch data based on the selected period
    console.log("Fetching data for period:", value, dateRange);
  };

  // Filtering logic
  const filteredReferrals = networkData.referrals.filter(ref => {
    const levelMatch = selectedLevel === 0 || ref.level === selectedLevel;
    const nameMatch = searchTerm === "" || ref.name.toLowerCase().includes(searchTerm.toLowerCase());
    // TODO: Add date filtering based on dateRange/periodFilter
    return levelMatch && nameMatch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Minha Rede</h1>

      {/* Gerencie Sua Rede Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users size={20} className="mr-2 text-primary" />
            Gerencie Sua Rede
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Acompanhe o desempenho dos seus indicados diretos e indiretos. Quanto maior sua rede, maiores são seus ganhos!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* --- Unified Card for Visão Geral and Meus Indicados --- */}
      <Card className="bg-card border-border">
        {/* Visão Geral Section */}
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <span className="flex items-center">
              <BarChartHorizontal size={20} className="mr-2 text-primary" />
              Visão Geral
            </span>
            {/* Filters remain the same */}
            <div className="flex items-center space-x-2">
              <Select value={periodFilter} onValueChange={handlePeriodChange}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue placeholder="Selecionar Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                  <SelectItem value="this_week">Esta Semana</SelectItem>
                  <SelectItem value="this_month">Este Mês</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
              {periodFilter === "custom" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[240px] h-8 justify-start text-left font-normal text-xs"
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>{format(dateRange.from, "dd/MM/yy", { locale: ptBR })} - {format(dateRange.to, "dd/MM/yy", { locale: ptBR })}</>
                        ) : (
                          format(dateRange.from, "dd/MM/yy", { locale: ptBR })
                        )
                      ) : (
                        <span>Selecione as datas</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Overview Cards - Data should be updated based on filter */}
          <div className="bg-background p-4 rounded-lg shadow text-center border border-border">
            <Users size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-white">{networkData.overview.total}</p>
            <p className="text-sm text-text-secondary">Total de Indicados</p>
          </div>
          <div className="bg-background p-4 rounded-lg shadow text-center border border-border">
            <UserCheck size={24} className="mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-white">{networkData.overview.active}</p>
            <p className="text-sm text-text-secondary">Indicados Ativos</p>
          </div>
          <div className="bg-background p-4 rounded-lg shadow text-center border border-border">
            <UserPlus size={24} className="mx-auto mb-2 text-blue-400" />
            <p className="text-2xl font-bold text-white">{networkData.overview.level2}</p>
            <p className="text-sm text-text-secondary">Indicados Nível 2+</p>
          </div>
          <div className="bg-background p-4 rounded-lg shadow text-center border border-border">
            <DollarSign size={24} className="mx-auto mb-2 text-yellow-400" />
            <p className="text-2xl font-bold text-white">R$ {networkData.overview.commissions.toFixed(2).replace(".", ",")}</p>
            <p className="text-sm text-text-secondary">Comissões da Rede</p>
          </div>
        </CardContent>

        {/* Separator between sections */}
        <Separator className="my-4 bg-border" />

        {/* Meus Indicados Section */}
        {/* Removed CardHeader wrapper, kept content */}
        <div className="px-6"> {/* Added padding to match CardHeader/CardContent */}
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-white">
              <Users size={20} className="mr-2 text-primary" />
              Meus Indicados
            </CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
            {/* Level Filters */}
            <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 sm:pb-0">
              <Button variant={selectedLevel === 0 ? "default" : "outline"} size="sm" onClick={() => setSelectedLevel(0)}>Todos</Button>
              <Button variant={selectedLevel === 1 ? "default" : "outline"} size="sm" onClick={() => setSelectedLevel(1)} className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 data-[state=active]:bg-cyan-500 data-[state=active]:text-cyan-50">Nível 1</Button>
              <Button variant={selectedLevel === 2 ? "default" : "outline"} size="sm" onClick={() => setSelectedLevel(2)} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 data-[state=active]:bg-yellow-500 data-[state=active]:text-yellow-50">Nível 2</Button>
              <Button variant={selectedLevel === 3 ? "default" : "outline"} size="sm" onClick={() => setSelectedLevel(3)} className="border-green-500 text-green-500 hover:bg-green-500/10 data-[state=active]:bg-green-500 data-[state=active]:text-green-50">Nível 3</Button>
              <Button variant={selectedLevel === 4 ? "default" : "outline"} size="sm" onClick={() => setSelectedLevel(4)} className="border-orange-500 text-orange-500 hover:bg-orange-500/10 data-[state=active]:bg-orange-500 data-[state=active]:text-orange-50">Nível 4</Button>
              <Button variant={selectedLevel === 5 ? "default" : "outline"} size="sm" onClick={() => setSelectedLevel(5)} className="border-purple-500 text-purple-500 hover:bg-purple-500/10 data-[state=active]:bg-purple-500 data-[state=active]:text-purple-50">Nível 5</Button>
            </div>
            {/* Search Input */}
            <div className="relative w-full sm:w-auto sm:max-w-xs">
              <Input
                type="search"
                placeholder="Buscar por nome..."
                className="pl-8 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            </div>
          </div>
        </div>
        <CardContent className="space-y-4 pt-4"> {/* Added top padding */} 
          {filteredReferrals.length > 0 ? filteredReferrals.map((ref) => (
            <div key={ref.id} className="flex items-center justify-between bg-background p-3 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <Avatar>
                  {/* Now correctly typed due to index signature in LevelColors */}
                  <AvatarFallback className={`${levelColors[ref.level] || 'bg-gray-500 border-gray-500 text-gray-50'}`}>{ref.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">{ref.name}</p>
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-text-secondary mt-1">
                    {/* Now correctly typed due to index signature in LevelColors */}
                    <Badge variant="outline" className={`border ${levelColors[ref.level]?.split(' ')[1] || 'border-gray-500'} ${levelColors[ref.level]?.split(' ')[2] || 'text-gray-500'}`}>Nível {ref.level}</Badge>
                    {/* --- Display Category (Level) --- */}
                    {ref.category && (
                      <span className="flex items-center">
                        <Award size={12} className="mr-0.5 text-yellow-400"/>
                        {ref.category} (Lvl {ref.categoryLevel})
                      </span>
                    )}
                    {/* --- End Display Category (Level) --- */}
                    {ref.level === 1 && <span>{ref.subReferrals} indicados</span>}
                    {ref.level > 1 && <span>Via {ref.via}</span>}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-sm font-semibold text-green-500">R$ {ref.commission.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          )) : (
            <p className="text-center text-text-secondary py-4">Nenhum indicado encontrado para os filtros selecionados.</p>
          )}
          {/* TODO: Add pagination controls if needed */}
        </CardContent>
      </Card>
      {/* --- End of Unified Card --- */}

      {/* Sequência Diária Nível 1 Section (Remains separate) */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <CheckCircle size={20} className="mr-2 text-primary" />
            Sequência Diária (Nível 1)
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Acompanhe a sequência diária dos seus indicados diretos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* List 5 affiliates by default, add load more */}
          {networkData.referrals.filter(r => r.level === 1).slice(0, 5).map(ref => (
            <div key={ref.id} className="flex items-center justify-between bg-background p-2 rounded border border-border">
              <span className="text-sm text-white">{ref.name}</span>
              <span className={`text-sm font-semibold ${(ref.dailySequence ?? 0) > 0 ? 'text-primary' : 'text-text-secondary'}`}>{ref.dailySequence ?? 0} dias</span>
            </div>
          ))}
          {networkData.referrals.filter(r => r.level === 1).length > 5 && (
            <Button variant="outline" size="sm" className="w-full mt-2">Carregar Mais</Button>
          )}
           {networkData.referrals.filter(r => r.level === 1).length === 0 && (
            <p className="text-center text-text-secondary py-4">Nenhum indicado nível 1 encontrado.</p>
          )}
        </CardContent>
      </Card>

      {/* Árvore de Indicados (Remains separate) */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <GitBranch size={20} className="mr-2 text-primary" />
            Árvore de Indicados
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Visualize a estrutura completa da sua rede.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Tree View */}
          <div className="text-center text-text-secondary py-8">
            <GitBranch size={48} className="mx-auto mb-4 text-primary opacity-50" />
            <p>Visualização em árvore da rede em breve.</p>
            {/* Example Link (Optional) */}
            {/* <Button variant="link" className="mt-2 text-primary">Ver detalhes</Button> */}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default MinhaRedePage;

