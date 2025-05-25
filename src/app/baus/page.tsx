"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Box, Trophy, CalendarCheck, DollarSign, Info, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Placeholder data - replace with actual data fetching
const allChestsData = {
  inProgress: [
    {
      id: 'ind_10',
      type: 'Indicação',
      icon: Box,
      iconColor: 'text-cyan-400',
      indicatorColor: 'bg-cyan-400',
      name: 'Baú de Indicações',
      description: 'Indique 10 amigos validados.',
      current: 7,
      target: 10,
      reward: 100,
      unit: 'indicações',
    },
    {
      id: 'ind_ind_5',
      type: 'Indicação Indireta',
      icon: Trophy,
      iconColor: 'text-yellow-400',
      indicatorColor: 'bg-yellow-400',
      name: 'Baú de Ind. Indireta',
      description: 'Tenha 5 amigos (Nível 1) completando a sequência diária de 3 dias.',
      current: 3,
      target: 5,
      reward: 50,
      unit: 'amigos em sequência',
    },
    // Add more in-progress chests as needed
  ],
  available: [
    {
      id: 'seq_3',
      type: 'Sequência Diária',
      icon: CalendarCheck,
      iconColor: 'text-blue-400',
      indicatorColor: 'bg-blue-400',
      name: 'Baú de Sequência (3 Dias)',
      description: 'Complete a sequência diária de 3 dias.',
      target: 3,
      reward: 30,
      unit: 'dias de sequência',
    },
    {
      id: 'dep_50',
      type: 'Depósito',
      icon: DollarSign,
      iconColor: 'text-purple-400',
      indicatorColor: 'bg-purple-400',
      name: 'Baú de Depósito Inicial',
      description: 'Faça seu primeiro depósito acima de R$ 50.',
      target: 50,
      reward: 20,
      unit: 'R$ depositados',
    },
     {
      id: 'ind_25',
      type: 'Indicação',
      icon: Box,
      iconColor: 'text-cyan-400',
      indicatorColor: 'bg-cyan-400',
      name: 'Baú de Indicações II',
      description: 'Indique 25 amigos validados.',
      target: 25,
      reward: 250,
      unit: 'indicações',
    },
    // Add more available chests
  ],
  completed: [
    {
      id: 'ind_1',
      type: 'Indicação',
      icon: Box,
      iconColor: 'text-green-500',
      name: 'Baú de Primeira Indicação',
      description: 'Faça sua primeira indicação validada.',
      reward: 10,
      completedDate: '01/05/2025',
    },
    // Add more completed chests
  ],
  rules: [
    'Baús são recompensas únicas por atingir marcos específicos.',
    'O progresso é atualizado periodicamente (pode levar até 1 hora).',
    'Recompensas de baús concluídos são creditadas automaticamente na sua carteira.',
    'Novos baús podem ser adicionados ao sistema periodicamente.',
  ],
};

// Explicitly type props to avoid implicit 'any'
const ChestCard = ({ chest, status }: { chest: any, status: string }) => {
  const progress = status === 'inProgress' ? (chest.target > 0 ? (chest.current / chest.target) * 100 : 0) : (status === 'completed' ? 100 : 0);
  const Icon = chest.icon;

  return (
    <Card className="bg-background border-border text-white flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-1">
          <CardTitle className="text-base font-semibold flex items-center">
            <Icon size={18} className={`mr-2 ${chest.iconColor}`} />
            {chest.name}
          </CardTitle>
          <Badge variant="outline" className={`text-xs ${status === 'completed' ? 'border-green-500 text-green-500' : 'border-primary text-primary'}`}>
            {status === 'completed' ? 'Concluído' : chest.type}
          </Badge>
        </div>
        <CardDescription className="text-sm text-text-secondary pt-1">{chest.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        {status !== 'completed' && (
          <>
            <Progress value={progress} className="h-2 bg-border" />
            <p className="text-xs text-text-secondary text-right">
              {status === 'inProgress' ? `${chest.current} de ${chest.target} ${chest.unit}` : `Meta: ${chest.target} ${chest.unit}`}
            </p>
          </>
        )}
        {status === 'completed' && (
            <p className="text-xs text-green-500 flex items-center">
                <CheckCircle size={14} className="mr-1"/> Concluído em {chest.completedDate}
            </p>
        )}
      </CardContent>
      <div className="p-4 pt-2 mt-auto text-right">
        <span className="text-lg font-bold text-green-500">R$ {chest.reward.toFixed(2).replace('.', ',')}</span>
      </div>
    </Card>
  );
};

const BausPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white flex items-center">
        <Gift size={24} className="mr-3 text-primary" />
        Baús de Recompensas
      </h1>

      {/* Rules Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Info size={20} className="mr-2 text-primary" />
            Como Funcionam os Baús
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary">
            {allChestsData.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* In Progress Chests */}
      {allChestsData.inProgress.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Baús em Andamento</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allChestsData.inProgress.map((chest) => (
              <ChestCard key={chest.id} chest={chest} status="inProgress" />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Available Chests */}
      {allChestsData.available.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Baús Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allChestsData.available.map((chest) => (
              <ChestCard key={chest.id} chest={chest} status="available" />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Completed Chests */}
      {allChestsData.completed.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Baús Concluídos</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allChestsData.completed.map((chest) => (
              <ChestCard key={chest.id} chest={chest} status="completed" />
            ))}
          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default BausPage;

