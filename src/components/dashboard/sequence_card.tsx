import React from 'react';
import Link from 'next/link';
import { ExternalLink, Check } from 'lucide-react'; // Changed from ArrowRight to ExternalLink
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Placeholder data - replace with actual data fetching
const sequenceData = {
  currentStreak: 2, // Example: 2 days streak
  // Mock data for weekly status - needs real data source
  weeklyStatus: [
    { dayAbbr: 'DOM', dayFull: '', reward: 35, completed: true },
    { dayAbbr: 'SEG', dayFull: '', reward: 35, completed: true },
    { dayAbbr: 'TER', dayFull: '', reward: 50, completed: false, isToday: true }, // Example: Today is Tuesday
    { dayAbbr: 'QUA', dayFull: '', reward: 35, completed: false },
    { dayAbbr: 'QUI', dayFull: '', reward: 50, completed: false },
    { dayAbbr: 'SEX', dayFull: '', reward: 35, completed: false },
    { dayAbbr: 'SAB', dayFull: '', reward: 100, completed: false },
  ]
};

const SequenceCard = () => {
  return (
    <Card className="bg-card border-border text-white border-2 border-primary/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            {/* TODO: Replace with 3D Fire Icon */}
            <span className="mr-2 text-2xl">🔥</span> {/* Placeholder Emoji */}
            Indicação Diária
          </CardTitle>
          <Link href="/sequencia-diaria" className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
            <ExternalLink size={16} />
          </Link>
        </div>
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
              <div className={`w-full rounded-md overflow-hidden border ${day.isToday ? 'border-primary' : 'border-border'} bg-card relative flex flex-col shadow min-w-[40px]`}>
                {/* Top Bar (Day Abbreviation) - Adapt color based on theme, using primary for now */}
                <div className="bg-primary text-center py-1.5">
                  <span className="text-xs font-bold text-primary-foreground">{day.dayAbbr}</span>
                </div>
                {/* Main Body (Reward Value) */}
                <div className="py-1.5 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">R${day.reward}</span>
                </div>
                {/* Completion Checkmark (Bottom Right) */}
                {day.completed && (
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center border border-background">
                    <Check size={10} className="text-white" strokeWidth={3}/>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SequenceCard;
