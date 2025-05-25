import React from 'react';
import MateriaisProntos from '@/components/divulgacao/materiais_prontos';
import SocialShare from '@/components/divulgacao/social_share';

const DivulgacaoPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-white">Divulgação</h1>

      {/* Materiais Prontos Section */}
      <MateriaisProntos />

      {/* Social Share Section */}
      <SocialShare />

    </div>
  );
};

export default DivulgacaoPage;

