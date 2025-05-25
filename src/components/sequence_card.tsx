import React from 'react';
import { Calendar, Gift, Flame } from 'lucide-react'; // Using different icons for better context
import { Progress } from '@/components/ui/progress'; // Assuming Progress component exists

// Updated sequence data based on the text document
const sequenceData = {
  currentStreak: 2, // Example: User has a 2-day streak
  milestones: [
    { days: 3, reward: 30 },
    { days: 7, reward: 70 },
    { days: 14, reward: 150 },
    { days: 30, reward: 500 },
    { days: 60, reward: 1000 },
    { days: 90, reward: 1500 },
    { days: 120, reward: 2000 },
    { days: 180, reward: 3000 },
  ],
  // Example daily status (for visual representation like the image)
  dailyStatus: [
    { day: 'S', label: 'Ontem', reward: 15, completed: true },
    { day: 'T', label: 'Anteontem', reward: 10, completed: true },
    { day: 'Q', label: 'Hoje', reward: 20, completed: false, isToday: true }, // Mark today
    { day: 'Q', label: 'Amanhã', reward: 25, completed: false },
    { day: 'S', label: 'Sex', reward: 30, completed: false },
    { day: 'S', label: 'Sáb', reward: 35, completed: false },
    { day: 'D', label: 'Dom', reward: 50, completed: false },
  ]
};

const SequenceCard = () => {
    // Find the next milestone based on the current streak
    const nextMilestone = sequenceData.milestones.find(ms => ms.days > sequenceData.currentStreak);
    const progressPercent = nextMilestone ? (sequenceData.currentStreak / nextMilestone.days) * 100 : 100;
    const daysToNextMilestone = nextMilestone ? nextMilestone.days : sequenceData.milestones[sequenceData.milestones.length - 1]?.days || 0;

    return (
        <div className="bg-card p-4 rounded-lg shadow text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold flex items-center">
                    <Flame size={20} className="mr-2 text-primary" /> {/* Using Flame icon */}
                    Sequência Diária
                </h3>
                <div className="flex items-center text-sm text-primary">
                    <Calendar size={16} className="mr-1" />
                    Mantenha sua sequência
                    <span className="ml-4 flex items-center font-semibold">
                        <Flame size={16} className="mr-1" />
                        {sequenceData.currentStreak} dias
                    </span>
                </div>
            </div>

            {/* Daily Visualization (like the image) */}
            <div className="flex justify-between items-center mb-3 space-x-1">
                {sequenceData.dailyStatus.map((status, index) => (
                    <div key={index} className="text-center flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${status.completed ? 'bg-primary border-primary' : status.isToday ? 'border-primary' : 'border-border'} mb-1`}
                        >
                            <span className={`font-medium text-sm ${status.completed ? 'text-card' : 'text-text-secondary'}`}>{status.day}</span>
                        </div>
                        <span className="text-xs text-text-secondary mb-0.5">{status.label}</span>
                        {/* Displaying daily reward example from image, but actual rewards are milestone-based */}
                        <span className="text-xs font-semibold text-green-500">R${status.reward}</span>
                    </div>
                ))}
            </div>

            {/* Progress Bar and Milestone Info */}
            <Progress value={progressPercent} className="h-2 mb-2" />
            <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">
                    {sequenceData.currentStreak} de {daysToNextMilestone} dias
                </span>
                {nextMilestone && (
                    <span className="font-semibold flex items-center text-yellow-400">
                        <Gift size={16} className="mr-1" />
                        Bônus de R${nextMilestone.reward.toFixed(2).replace('.', ',')} ao completar
                    </span>
                )}
                {!nextMilestone && sequenceData.milestones.length > 0 && (
                     <span className="font-semibold text-green-400">Todas as sequências completas!</span>
                )}
            </div>
        </div>
    );
};

export default SequenceCard;

