import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Check, Flame, Gift, Clock, HelpCircle, AlertTriangle } from 'lucide-react'; // Added Clock, HelpCircle, AlertTriangle
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
    { dayAbbr: 'QUI', dayFull: '', reward: 50, completed: false, isSpecial: true }, // Special day with higher reward
    { dayAbbr: 'SEX', dayFull: '', reward: 35, completed: false },
    { dayAbbr: 'SAB', dayFull: '', reward: 100, completed: false, isSpecial: true }, // Special day with higher reward
  ]
};

const SequenceCard = () => {
  // Calculate total potential reward
  const totalPotentialReward = sequenceData.weeklyStatus.reduce((sum, day) => sum + day.reward, 0);
  
  // Calculate earned reward so far
  const earnedReward = sequenceData.weeklyStatus
    .filter(day => day.completed)
    .reduce((sum, day) => sum + day.reward, 0);

  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Calculate time left until midnight
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const difference = midnight.getTime() - now.getTime();
      
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Info modal content
  const InfoModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-card border-2 border-primary/30 rounded-lg p-5 max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Flame size={20} className="text-primary mr-2" />
            Indicação Diária
          </h3>
          <button 
            onClick={() => setShowInfoModal(false)}
            className="text-gray-400 hover:text-white"
          >
            <ExternalLink size={18} />
          </button>
        </div>
        
        <div className="space-y-3 text-sm text-gray-300">
          <p>Faça pelo menos 1 indicação valida por dia para garantir uma indicação diária.</p>
          <p>A Indicação diária é reiniciada se você falhar um dia.</p>
          <p>Recompensas diárias são creditadas automaticamente a sua carteira ao completar uma indicação diária.</p>
          <p>As indicações diárias alteram o dia, todos os dias a 00:00 horário de Brasília.</p>
        </div>
        
        <button 
          onClick={() => setShowInfoModal(false)}
          className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
        >
          Entendi
        </button>
      </div>
    </div>
  );

  return (
    <Card className="bg-card border-border text-white border-2 border-primary/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-xl">
            <span className="mr-2 text-2xl">🔥</span>
            Indicação Diária
            <button 
              onClick={() => setShowInfoModal(true)}
              className="ml-1 text-primary hover:text-primary/80 transition-colors"
            >
              <HelpCircle size={16} />
            </button>
          </CardTitle>
          <Link href="/sequencia-diaria" className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
            <ExternalLink size={16} />
          </Link>
        </div>
        <CardDescription className="text-text-secondary pt-1">Faça pelo menos 1 indicação por dia.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Streak Info with Flame Animation */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent p-2 rounded-md">
          <div className="flex items-center">
            <div className="relative mr-2">
              <Flame size={24} className="text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold">
                {sequenceData.currentStreak}
              </div>
            </div>
            <p className="text-sm">
              <span className="font-semibold text-primary">{sequenceData.currentStreak} dias</span> de indicações consecutivas
            </p>
          </div>
          <div className="text-xs font-semibold text-green-400">
            +R$70
          </div>
        </div>

        {/* Countdown Timer - Com degradê no fundo do elemento inteiro */}
        <div className="flex items-center justify-center p-2 rounded-md bg-gradient-to-r from-primary/30 to-transparent">
          <Clock size={16} className="text-primary mr-2 animate-pulse" />
          <p className="text-sm text-primary">
            <span className="font-bold">{timeLeft}</span> para completar a indicação de hoje
          </p>
        </div>

        {/* Weekly Calendar - Enhanced Version */}
        <div className="grid grid-cols-7 gap-1.5">
          {sequenceData.weeklyStatus.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Calendar Card with Enhanced Design */}
              <div 
                className={`
                  w-full rounded-md overflow-hidden border-2 relative flex flex-col shadow min-w-[40px]
                  ${day.isToday ? 'border-primary shadow-primary/30 shadow-lg scale-110 z-10' : 
                    day.completed ? 'border-green-500/50' : 
                    'border-border'}
                  ${day.completed ? 'bg-gradient-to-b from-green-900/30 to-card' : 
                    day.isToday ? 'bg-gradient-to-b from-primary/30 to-card' : 
                    'bg-card'}
                  transition-all duration-300
                `}
              >
                {/* Day Header */}
                <div className={`
                  text-center py-1.5
                  ${day.isToday ? 'bg-primary' : 
                    day.completed ? 'bg-green-600' : 
                    'bg-primary/50'}
                `}>
                  <span className="text-xs font-bold text-primary-foreground">{day.dayAbbr}</span>
                </div>
                
                {/* Reward Value */}
                <div className="py-1.5 flex items-center justify-center relative">
                  <span className={`
                    text-xs font-semibold
                    ${day.isToday ? 'text-primary' : 
                      day.completed ? 'text-green-400' : 
                      day.dayAbbr === 'QUI' || day.dayAbbr === 'SAB' ? 'text-primary font-bold' : 
                      day.dayAbbr === 'QUA' || day.dayAbbr === 'SEX' ? 'text-white' : 'text-green-400'}
                  `}>
                    R${day.reward}
                  </span>
                </div>
                
                {/* Completion Status */}
                {day.completed && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-bl-md flex items-center justify-center">
                    <Check size={10} className="text-white" strokeWidth={3}/>
                  </div>
                )}
                
                {/* Today Indicator */}
                {day.isToday && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Weekly Reward Summary */}
        <div className="bg-gradient-to-r from-primary/20 to-transparent p-3 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <Gift size={18} className="text-green-400 mr-2" />
            <span className="text-sm">Recompensa total</span>
          </div>
          <div className="text-sm font-bold text-green-400">
            R$340
          </div>
        </div>
      </CardContent>

      {/* Info Modal */}
      {showInfoModal && <InfoModal />}
    </Card>
  );
};

export default SequenceCard;
