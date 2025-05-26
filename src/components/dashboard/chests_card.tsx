import React from 'react';
import Link from 'next/link';
import { ExternalLink, HelpCircle } from 'lucide-react'; // Added HelpCircle
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

// Placeholder data - replace with actual data fetching
const chestsData = {
  nextIndicationChest: {
    name: 'Indicar 10 amigos',
    current: 7,
    target: 10,
    reward: 100,
  },
  nextIndirectChest: {
    name: 'Ter 5 amigos fazendo indicação diária de 3 dias',
    current: 3,
    target: 5,
    reward: 50,
  },
};

const ChestsCard = () => {
  const indicationProgress = chestsData.nextIndicationChest.target > 0 ? (chestsData.nextIndicationChest.current / chestsData.nextIndicationChest.target) * 100 : 0;
  const indirectProgress = chestsData.nextIndirectChest.target > 0 ? (chestsData.nextIndirectChest.current / chestsData.nextIndirectChest.target) * 100 : 0;

  return (
    <Card className="bg-card border-border text-white border-2 border-primary/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-xl">
            {/* Substituído pelo novo ícone de baú */}
            <span className="mr-2 relative w-6 h-6">
              <Image src="/icons/bau_icon.png" alt="Baú" width={24} height={24} />
            </span>
            Baús
            <button className="ml-1 text-primary hover:text-primary/80 transition-colors">
              <HelpCircle size={16} />
            </button>
          </CardTitle>
          <Link href="/baus" className="p-1.5 bg-primary/20 hover:bg-primary/40 rounded-md transition-all duration-200 text-primary hover:text-white">
            <ExternalLink size={16} />
          </Link>
        </div>
        <CardDescription className="text-text-secondary pt-1">Complete desafios e ganhe recompensas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5"> {/* Increased spacing */}
        {/* Baú de Indicação */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center">
              {/* Substituído pelo novo ícone de baú */}
              <span className="mr-2 relative w-5 h-5">
                <Image src="/icons/bau_icon.png" alt="Baú" width={20} height={20} />
              </span>
              Baú de Indicações
            </span>
            <span className="text-sm font-semibold text-green-400">
              +R$100
            </span>
          </div>
          {/* Progress Bar (Thicker, 3D style needs more specific CSS/Tailwind) */}
          <div className="relative w-full">
            {/* TODO: Apply 3D style to progress bar */}
            <Progress value={indicationProgress} className="h-4 rounded-md bg-border" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white pointer-events-none" style={{ lineHeight: '1rem' }}>
              {Math.round(indicationProgress)}%
            </span>
          </div>
          <p className="text-xs text-text-secondary text-center pt-1">
            Faça indicações e fature!
          </p>
        </div>

        {/* Baú de Indicação Diária */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center">
              {/* Substituído pelo novo ícone de baú */}
              <span className="mr-2 relative w-5 h-5">
                <Image src="/icons/bau_icon.png" alt="Baú" width={20} height={20} />
              </span>
              Baú de Ind. diária
            </span>
            <span className="text-sm font-semibold text-green-400">
              +R$50
            </span>
          </div>
           {/* Progress Bar (Thicker, 3D style needs more specific CSS/Tailwind) */}
          <div className="relative w-full">
            {/* TODO: Apply 3D style to progress bar */}
            <Progress value={indirectProgress} className="h-4 rounded-md bg-border" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white pointer-events-none" style={{ lineHeight: '1rem' }}>
              {Math.round(indirectProgress)}%
            </span>
          </div>
          <p className="text-xs text-text-secondary text-center pt-1">
            Seus amigos fazem indicações diárias e você fatura!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChestsCard;
