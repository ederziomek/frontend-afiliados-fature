"use client";

import React from 'react';
import RankingSection from '@/components/dashboard/RankingSection';

const RankingPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Rankings</h1>
      
      <div className="text-sm text-text-secondary mb-4">
        <p>Acompanhe sua posição nos rankings e veja os Top 10 afiliados em diferentes categorias.</p>
      </div>

      {/* Ranking Section Component */}
      <RankingSection />
      
      {/* Additional Information */}
      <div className="bg-card p-4 rounded-lg shadow border-2 border-primary/30">
        <h3 className="text-lg font-semibold text-white mb-3">Como Funciona</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p><strong className="text-white">Indicações Diretas:</strong> Ranking baseado no número de indicações válidas que entraram diretamente pelo seu link.</p>
          <p><strong className="text-white">Indicações da Rede:</strong> Ranking baseado no total de indicações válidas de toda sua rede (níveis 2 a 5).</p>
          <p><strong className="text-white">Indicação Diária:</strong> Ranking baseado na maior sequência consecutiva de dias com pelo menos 1 indicação.</p>
        </div>
      </div>

      {/* Prizes Information */}
      <div className="bg-card p-4 rounded-lg shadow border-2 border-primary/30">
        <h3 className="text-lg font-semibold text-white mb-3">Prêmios</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>Os prêmios são distribuídos automaticamente toda segunda-feira para os vencedores dos rankings semanais.</p>
          <p>Para os rankings mensais, os prêmios são distribuídos no primeiro dia útil do mês seguinte.</p>
          <p className="text-primary font-semibold">Quanto maior sua posição, maior será sua parte do prêmio total!</p>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;

