import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react'; // Using Check for the small indicator
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Placeholder data - replace with actual data fetching
const sequenceData = {
  currentStreak: 2, // Example: 2 days streak
  totalRewardFor7Days: 70.00, // Example reward
  // Mock data for weekly status - needs real data source
  weeklyStatus: [
    { dayAbbr: 'DOM', dayFull: 'Domingo', reward: 35, completed: true },
    { dayAbbr: 'SEG', dayFull: 'Segunda', reward: 37, completed: true },
    { dayAbbr: 'TER', dayFull: 'Terça',   reward: 39, completed: false, isToday: true }, // Example: Today is Tuesday
    { dayAbbr: 'QUA', dayFull: 'Quarta',  reward: 41, completed: false },
    { dayAbbr: 'QUI', dayFull: 'Quinta',  reward: 43, completed: false },
    { dayAbbr: 'SEX', dayFull: 'Sexta',   reward: 45, completed: false },
    { dayAbbr: 'SAB', dayFull: 'Sábado',  reward: 47, completed: false },
  ]
};

const SequenceCard = () => {
  const progressPercent = sequenceData.currentStreak >= 7 ? 100 : (sequenceData.currentStreak / 7) * 100;

  return (
    <Card className="bg-card border-border text-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          {/* TODO: Replace with 3D Fire Icon */}
          <span className="mr-2 text-2xl">🔥</span> {/* Placeholder Emoji */}
          Sequência Diária
        </CardTitle>
        {/* Reduced margin-bottom/padding-top if CardDescription had it */}
        <CardDescription className="text-text-secondary pt-1">Faça pelo menos 1 indicação por dia.</CardDescription>
      </CardHeader>
      {/* Adjusted spacing between elements inside CardContent if needed, e.g., space-y-3 */}
      <CardContent className="space-y-3">
        {/* Reduced margin-bottom on this paragraph if needed */}
        <p className="text-sm text-text-secondary mb-2"> {/* Reduced mb-* if applicable */}
          Você está em uma Indicação Diária de <span className="font-semibold text-primary">{sequenceData.currentStreak} dias</span>.
        </p>

        {/* New Weekly Calendar Visualization */}
        <div className="grid grid-cols-7 gap-1.5"> {/* Use gap-1 or gap-1.5 for tighter spacing */}
          {sequenceData.weeklyStatus.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Calendar Icon Square */}
              <div className={`w-full aspect-square rounded-md overflow-hidden border ${day.isToday ? 'border-primary' : 'border-border'} bg-card relative flex flex-col shadow`}>
                {/* Top Bar (Day Abbreviation) - Adapt color based on theme, using primary for now */}
                <div className="bg-primary text-center py-0.5">
                  <span className="text-xs font-bold text-primary-foreground">{day.dayAbbr}</span>
                </div>
                {/* Main Body (Reward Value) */}
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">R${day.reward}</span>
                </div>
                {/* Completion Checkmark (Bottom Right) */}
                {day.completed && (
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center border border-background">
                    <Check size={10} className="text-white" strokeWidth={3}/>
                  </div>
                )}
              </div>
              {/* Day Name Label */}
              <span className="text-xs text-text-secondary mt-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">{day.dayFull}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar - Keeping previous style for overall 7-day bonus */}
        <div className="relative w-full pt-2">
          <Progress value={progressPercent} className="h-4 rounded-md" />
        </div>
        <p className="text-sm font-semibold text-green-500 text-center">
          Bônus de R$ {sequenceData.totalRewardFor7Days.toFixed(2).replace('.', ',')} ao completar 7 dias!
        </p>

        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10" asChild>
          <Link href="/sequencia-diaria">
            Ver Premiações <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SequenceCard;

