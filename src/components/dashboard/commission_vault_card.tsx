"use client";

import React, { useState, useEffect } from 'react';
import { ExternalLink, Timer, Info, HelpCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
  const [showInfoModal, setShowInfoModal] = useState(false);

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

  // Verificar se o cofre está bloqueado (se há tempo restante)
  const isVaultLocked = Object.keys(timeLeft).length > 0;

  // --- Function to handle opening the vault (placeholder) --- 
  const handleOpenVault = () => {
    // Só permite abrir se não estiver bloqueado
    if (!isVaultLocked) {
      console.log("Abrir Cofre clicado! Mostrar vídeo com valor: R$", weeklyRevShare.toFixed(2));
      setShowVideoModal(true); // Example state change
    }
  };
  // --- End of handleOpenVault --- 

  // Info modal content
  const InfoModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-card border-2 border-primary/30 rounded-lg p-5 max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Image src="/icons/vault.png" width={24} height={24} alt="Cofre" className="mr-2" />
            Cofre de Comissões
          </h3>
          <button 
            onClick={() => setShowInfoModal(false)}
            className="text-gray-400 hover:text-white"
          >
            <ExternalLink size={18} />
          </button>
        </div>
        
        <div className="space-y-3 text-sm text-gray-300">
          <p>Toda semana você pode abrir o seu cofre de comissões e receber as comissões que os jogadores da sua rede geraram para você.</p>
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
        <div className="p-4 rounded-lg shadow text-white flex flex-col justify-between h-full" style={{ backgroundColor: 'rgb(34, 38, 45)' }}>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold flex items-center">
                        <Image src="/icons/vault.png" width={20} height={20} alt="Cofre" className="mr-2" />
                        Cofre de Comissões
                        <button 
                          onClick={() => setShowInfoModal(true)}
                          className="ml-1 text-primary hover:text-primary/80 transition-colors"
                        >
                          <HelpCircle size={16} />
                        </button>
                    </h3>
                    <Link href="/carteira" className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
                        <ExternalLink size={16} />
                    </Link>
                </div>
                <div className="text-center my-4">
                    <Image src="/icons/bau_icon.png" width={100} height={100} alt="Cofre" className="mx-auto" />
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
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 mt-2 cursor-not-allowed opacity-80"
              disabled={true}
            >
              <Lock size={16} className="mr-2" /> Abrir Cofre
            </Button>
        </div>
    );
  }

  return (
    <div className="p-4 rounded-lg shadow text-white flex flex-col justify-between h-full" style={{ backgroundColor: 'rgb(34, 38, 45)' }}>
      <div> {/* Wrapper for content before button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Image src="/icons/cofre.png" width={20} height={20} alt="Cofre" className="mr-2" />
            Cofre de Comissões
            <button 
              onClick={() => setShowInfoModal(true)}
              className="ml-1 text-primary hover:text-primary/80 transition-colors"
            >
              <HelpCircle size={16} />
            </button>
          </h3>
          <Link href="/carteira" className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
            <ExternalLink size={16} />
          </Link>
        </div>

        {/* Vault Image */}
        <div className="text-center my-4">
          <Image src="/icons/cofre.png" width={100} height={100} alt="Cofre" className="mx-auto" />
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
      </div>

      {/* Botão com estado bloqueado/desbloqueado */}
      {isVaultLocked ? (
        <Button 
          className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 mt-2 cursor-not-allowed opacity-80"
          disabled={true}
        >
          <Lock size={16} className="mr-2" /> Abrir Cofre
        </Button>
      ) : (
        <Button 
          className="w-full bg-primary hover:bg-primary/80 text-white mt-2"
          onClick={handleOpenVault}
        >
          Abrir Cofre
        </Button>
      )}

      {/* Render Video Modal if showVideoModal is true */}
      {showVideoModal && <VideoModal />}
      
      {/* Render Info Modal if showInfoModal is true */}
      {showInfoModal && <InfoModal />}
    </div>
  );
};

export default CommissionVaultCard;
