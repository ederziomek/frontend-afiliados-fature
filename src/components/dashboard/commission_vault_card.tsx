"use client";

import React, { useState, useEffect } from 'react';
import { Vault, Timer, Info, ArrowRight, PlayCircle } from 'lucide-react'; // Added PlayCircle
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Import Button component

// Placeholder data - replace with actual data fetching
const vaultData = {
  // Data related to category progress removed
};

// --- Define the type for the time left object --- 
interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
// --- End of TimeLeft type definition --- 

// Function to calculate time remaining until next Monday 00:00
const calculateTimeLeft = (): TimeLeft => { // Return type explicitly set
  const now = new Date();
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7)); // Find next Monday
  nextMonday.setHours(0, 0, 0, 0); // Set to midnight

  const difference = nextMonday.getTime() - now.getTime();

  let timeLeft: TimeLeft = {}; // Initialize with the correct type

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

// --- Updated Prop Type --- 
interface CommissionVaultCardProps {
  weeklyRevShare?: number; // Optional prop for the RevShare amount to display in the video/modal
}
// --- End of Prop Type --- 

const CommissionVaultCard: React.FC<CommissionVaultCardProps> = ({ weeklyRevShare = 0 }) => {
  const [hasMounted, setHasMounted] = useState(false);
  // --- Explicitly type the state --- 
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({}); // Initialize timeLeft as an empty object
  // State to control video/modal visibility (placeholder)
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Set initial timeLeft on client mount
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => { // Use setInterval for continuous update
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer); // Clear interval on unmount
  }, []); // Empty dependency array to run only on mount and unmount

  // Format time (Use nullish coalescing for safety)
  const formattedTime = Object.keys(timeLeft).length
    ? `${timeLeft.days ?? 0}d ${timeLeft.hours ?? 0}h ${timeLeft.minutes ?? 0}m ${timeLeft.seconds ?? 0}s`
    : <span>Aberto!</span>; // Changed text when timer finishes

  // --- Function to handle opening the vault (placeholder) --- 
  const handleOpenVault = () => {
    // TODO: Implement logic to show video modal
    // This might involve setting state, calling a modal component, etc.
    // For now, just log to console and potentially set state
    console.log("Abrir Cofre clicado! Mostrar vídeo com valor: R$", weeklyRevShare.toFixed(2));
    setShowVideoModal(true); // Example state change
    // Reset timer or handle post-opening state if needed
  };
  // --- End of handleOpenVault --- 

  // --- Placeholder Video Modal --- 
  const VideoModal = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#333' }}> {/* Added text color */}
        <h3>Vídeo da Abertura do Cofre</h3>
        <p>Valor da Comissão Semanal: R$ {weeklyRevShare.toFixed(2).replace('.', ',')}</p>
        {/* TODO: Embed actual video player here */}
        <div style={{ width: '300px', height: '200px', backgroundColor: '#ccc', margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          (Placeholder para Vídeo)
        </div>
        <button onClick={() => setShowVideoModal(false)} style={{ padding: '8px 15px', marginTop: '10px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Fechar</button> {/* Styled button */}
      </div>
    </div>
  );
  // --- End of Video Modal --- 

  if (!hasMounted) {
    // Render a placeholder or null during SSR and initial client render before useEffect runs
    return (
        <div className="bg-card p-4 rounded-lg shadow text-white flex flex-col justify-between h-full">
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Vault size={20} className="mr-2 text-yellow-400" />
                    Cofre de Comissões
                </h3>
                <div className="text-center my-4">
                    <span className="text-6xl">💰</span>
                </div>
                <div className="text-center mb-4">
                    <p className="text-sm text-text-secondary mb-1">Abre em:</p>
                    <div className="flex items-center justify-center space-x-1 text-primary">
                        <Timer size={18} className="mr-1"/>
                        <span className="text-xl font-bold">Carregando...</span>
                    </div>
                </div>
                <p className="text-xs text-center text-text-secondary mb-4 flex items-center justify-center">
                    <Info size={14} className="mr-1 text-primary"/>
                    Receba suas comissões RevShare semanais aqui!
                </p>
            </div>
            <Button 
                variant="outline" 
                className="mt-auto w-full border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={true}
            >
                <PlayCircle size={16} className="mr-2" />
                Abrir Cofre
            </Button>
        </div>
    );
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow text-white flex flex-col justify-between h-full">
      <div> {/* Wrapper for content before button */}
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Vault size={20} className="mr-2 text-yellow-400" />
          Cofre de Comissões
        </h3>

        {/* 3D Gold Vault Image Placeholder */}
        <div className="text-center my-4">
          <span className="text-6xl">💰</span> {/* Placeholder Emoji */}
        </div>

        {/* Timer */}
        <div className="text-center mb-4">
          <p className="text-sm text-text-secondary mb-1">Abre em:</p>
          <div className="flex items-center justify-center space-x-1 text-primary">
              <Timer size={18} className="mr-1"/>
              <span className="text-xl font-bold">{formattedTime}</span>
          </div>
        </div>

        {/* Info Text Updated */}
        <p className="text-xs text-center text-text-secondary mb-4 flex items-center justify-center">
          <Info size={14} className="mr-1 text-primary"/>
          Receba suas comissões RevShare semanais aqui!
        </p>

        {/* --- Category Progress Section REMOVED --- */}

      </div>

      {/* --- Button Updated to match "Ver todos os baús" style --- */}
      <Button 
        variant="outline" 
        className="mt-auto w-full border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed" // Applied matching styles and disabled state styles
        onClick={handleOpenVault}
        disabled={Object.keys(timeLeft).length > 0} // Disable button if timer is running
      >
        <PlayCircle size={16} className="mr-2" /> {/* Adjusted icon margin */}
        Abrir Cofre
      </Button>
      {/* --- End of Updated Button --- */}

      {/* Render Video Modal if showVideoModal is true */}
      {showVideoModal && <VideoModal />}
    </div>
  );
};

export default CommissionVaultCard;

