"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Info, Award } from 'lucide-react'; // Removed CalendarCheck, CheckCircle, Gift
import SequenceCard from '@/components/dashboard/sequence_card'; // Import the updated SequenceCard
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import Table components

// Placeholder data - replace with actual data fetching
const sequenceDetails = {
  rules: [
    'Faça pelo menos 1 indicação validada por dia para manter sua sequência.',
    'A sequência é reiniciada se você falhar um dia.',
    'Recompensas diárias são creditadas automaticamente ao completar o requisito do dia.',
    'O bônus por completar a sequência de 7 dias é creditado ao final do 7º dia consecutivo.',
  ],
  rewardsTable: [
    { days: 3, reward: 30.00 },
    { days: 7, reward: 70.00 },
    { days: 14, reward: 150.00 },
    { days: 30, reward: 500.00 },
    { days: 60, reward: 1000.00 },
    { days: 90, reward: 1500.00 },
    { days: 120, reward: 2200.00 },
    { days: 180, reward: 4000.00 },
    { days: 365, reward: 10000.00 },
  ],
  alreadyReceived: 30.00, // Example value
};

const SequenciaDiariaPage = () => {

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white flex items-center">
        {/* TODO: Replace with 3D Fire Icon */}
        <span className="mr-3 text-3xl">🔥</span> {/* Placeholder Emoji */}
        Sequência Diária
      </h1>

      {/* Use the updated SequenceCard component */}
      <SequenceCard />

      {/* Rules Card (remains the same) */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Info size={20} className="mr-2 text-primary" />
            Como Funciona
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary">
            {sequenceDetails.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* New Rewards Table Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Award size={20} className="mr-2 text-yellow-400" />
            Premiações de Sequências
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-white">Dias Consecutivos</TableHead>
                <TableHead className="text-right text-white">Recompensa Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sequenceDetails.rewardsTable.map((item) => (
                <TableRow key={item.days} className="border-border">
                  <TableCell className="font-medium text-text-secondary">{item.days} dias</TableCell>
                  <TableCell className="text-right font-semibold text-green-500">R$ {item.reward.toFixed(2).replace('.', ',')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-text-secondary">
            <span className="font-semibold">Importante:</span> os valores das recompensas são cumulativos. Ex: ao completar 7 dias, você recebe R$ 40,00 adicionais (totalizando R$ 70,00).
          </p>
          <p className="text-sm font-medium text-text-secondary">
            Valor já recebido nesta sequência: <span className="font-semibold text-green-500">R$ {sequenceDetails.alreadyReceived.toFixed(2).replace('.', ',')}</span>
          </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default SequenciaDiariaPage;

