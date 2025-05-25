"use client";

import React, { useState } from 'react';
import { Clock, ArrowRight, Info, ListChecks, Building, Check } from 'lucide-react'; // Added Info, ListChecks, Building, Check

// --- Define Types for Rules ---
interface WithdrawalRule {
  id: string;
  name: string;
  description: string;
  rules: string;
  feePercent: number;
  limit: number | null;
  limitType: 'monthly' | 'transaction' | null;
  frequency: 'weekly' | 'daily' | null;
  requiresNF: boolean;
}

interface WithdrawalRules {
  [key: string]: WithdrawalRule; // Index signature allowing string keys
  transfer_upbet: WithdrawalRule;
  pix_sem_nf: WithdrawalRule;
  pix_com_nf: WithdrawalRule;
}

// --- Confirmed Withdrawal Rules & CNAEs ---
const confirmedWithdrawalRules: WithdrawalRules = {
  transfer_upbet: {
    id: 'transfer_upbet',
    name: 'Crédito na Plataforma UPBET',
    description: 'Transferir como saldo para sua conta UPBET.',
    rules: 'Disponível a qualquer momento.', // Simplified based on pasted_content.txt
    feePercent: 0,
    limit: null,
    limitType: null, // 'monthly', 'transaction', etc.
    frequency: null, // 'weekly', 'daily', etc.
    requiresNF: false,
  },
  pix_sem_nf: {
    id: 'pix_sem_nf',
    name: 'PIX sem Nota Fiscal',
    description: 'Saque via PIX (CPF/Chave Aleatória).',
    rules: 'Disponível 1x por semana.',
    feePercent: 23.25,
    limit: 2000.00,
    limitType: 'monthly',
    frequency: 'weekly',
    requiresNF: false,
  },
  pix_com_nf: {
    id: 'pix_com_nf',
    name: 'PIX com Nota Fiscal',
    description: 'Saque via PIX (CNPJ). Requer CNAE válido.',
    rules: 'Disponível 1x por semana.',
    feePercent: 14,
    limit: null,
    limitType: null,
    frequency: 'weekly',
    requiresNF: true,
  },
};

const acceptedCNAEs = [
  { code: '7311-4/00', description: 'Agências de publicidade' },
  { code: '7312-2/00', description: 'Direção de marketing e consultoria em propaganda' },
  { code: '7319-0/03', description: 'Promoção de vendas' },
  { code: '7319-0/04', description: 'Marketing direto' },
  { code: '7319-0/02', description: 'Promotor(a) de Vendas Independente (MEI)' },
];
// --- End Confirmed Rules ---

// Placeholder data - replace with actual data fetching and logic
const walletData = {
  availableBalance: 350.00,
  // TODO: Fetch actual transaction history
  transactions: [
    { id: 't1', type: 'CPA - Indicação Direta', date: 'Hoje, 14:35', amount: 35.00, status: 'completed' }, // Updated CPA value
    { id: 't2', type: 'Saque PIX s/ NF', date: 'Ontem, 10:15', amount: -153.50, status: 'completed' }, // Example amount after 23.25% fee
    { id: 't3', type: 'Crédito Plataforma UPBET', date: '27/04/2025, 09:00', amount: -100.00, status: 'completed' },
    { id: 't4', type: 'RevShare Nível 1', date: '26/04/2025, 18:30', amount: 15.75, status: 'completed' },
    { id: 't5', type: 'Bônus Sequência Dia 3', date: '25/04/2025, 08:00', amount: 15.00, status: 'completed' },
  ],
  paymentOptions: Object.values(confirmedWithdrawalRules), // Use confirmed rules
  // TODO: Add affiliate's category/level if needed for display
  affiliateCategory: 'Iniciante',
  affiliateLevel: 3,
};

const CarteiraPage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>(''); // Amount to withdraw/transfer
  const [showHistory, setShowHistory] = useState(false); // Toggle for full history view
  const [showCNAECheck, setShowCNAECheck] = useState(false); // Step for NF withdrawal
  const [cnaeConfirmed, setCnaeConfirmed] = useState(false); // If user confirmed CNAE

  // Now correctly typed due to index signature in WithdrawalRules
  const selectedOption: WithdrawalRule | null = selectedOptionId ? confirmedWithdrawalRules[selectedOptionId] : null;

  const handleOptionChange = (optionId: string) => {
    setSelectedOptionId(optionId);
    setAmount(''); // Reset amount when changing option
    setShowCNAECheck(false); // Reset CNAE check step
    setCnaeConfirmed(false);

    // If NF option is selected, show CNAE check first
    if (optionId === 'pix_com_nf') {
      setShowCNAECheck(true);
    } else {
        // Optionally pre-fill amount based on selection or balance
        // const option = confirmedWithdrawalRules[optionId];
        // if (option) {
        //     const maxPossible = walletData.availableBalance;
        //     const limitedAmount = option.limitType === 'transaction' && option.limit ? Math.min(maxPossible, option.limit) : maxPossible;
        //     setAmount(limitedAmount.toFixed(2).replace('.', ',')); // Auto-fill example
        // }
    }
  };

  const handleCNAEConfirm = () => {
      // In a real app, this might involve checking the user's registered CNPJ/CNAE via backend
      // For now, we assume the user confirms they meet the criteria
      setCnaeConfirmed(true);
      setShowCNAECheck(false);
      // Optionally pre-fill amount now
  };

  const calculateFinalAmount = (option: WithdrawalRule | null, inputAmount: number): number => {
    if (!option || inputAmount <= 0) return 0;

    // Apply percentage fee
    let finalAmount = inputAmount * (1 - option.feePercent / 100);

    // Note: Monthly/Weekly limits need backend validation during the actual withdrawal process.
    // We can apply transaction limits here if they exist.
    // if (option.limitType === 'transaction' && option.limit) {
    //     finalAmount = Math.min(finalAmount, option.limit);
    // }

    return finalAmount > 0 ? finalAmount : 0;
  };

  const currentAmount = parseFloat(amount.replace('.', '').replace(',', '.')) || 0; // Handle both dot and comma input
  const finalCalculatedAmount = calculateFinalAmount(selectedOption, currentAmount);

  // Placeholder for handling confirmation
  const handleConfirm = () => {
    if (!selectedOption || currentAmount <= 0) {
      alert('Selecione uma opção e insira um valor válido.');
      return;
    }
    if (currentAmount > walletData.availableBalance) {
        alert('Valor solicitado excede o saldo disponível.');
        return;
    }
    // Specific check for NF option
    if (selectedOption.id === 'pix_com_nf' && !cnaeConfirmed) {
        alert('Por favor, confirme que seu CNAE está na lista de aceitos antes de prosseguir.');
        setShowCNAECheck(true); // Re-show CNAE check
        return;
    }

    // TODO: Add actual backend call here to process withdrawal/transfer
    // This call should validate limits (monthly/weekly) and process the transaction.
    console.log('Confirming:', { selectedOptionId, amount: currentAmount, finalAmount: finalCalculatedAmount });
    alert(`Movimentação de R$ ${currentAmount.toFixed(2).replace('.', ',')} para ${selectedOption.name} solicitada.`);

    // Reset state after confirmation
    setSelectedOptionId(null);
    setAmount('');
    setShowCNAECheck(false);
    setCnaeConfirmed(false);
  };

  // Format rules for display
  const formatRules = (option: WithdrawalRule) => {
      if (!option) return '';
      let ruleString = option.rules;
      if (option.feePercent > 0) ruleString += ` (-${option.feePercent.toString().replace('.', ',')}%)`;
      if (option.limitType === 'monthly' && option.limit) ruleString += ` (Limite: R$ ${option.limit.toFixed(2).replace('.', ',')}/mês)`;
      // Add minimum withdrawal amount for PIX
      if (option.id.startsWith('pix_')) ruleString += ` (Mínimo: R$ 50,00)`;
      // Add other limit types if needed
      if (option.frequency === 'weekly') ruleString += ` (1x/semana)`;
      return ruleString;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Minha Carteira</h1>

      {/* Balance */}
      <div className="bg-card p-6 rounded-lg shadow text-center">
        <p className="text-sm text-text-secondary mb-1">Saldo Disponível</p>
        <p className="text-4xl font-bold text-primary mb-4">R$ {walletData.availableBalance.toFixed(2).replace('.', ',')}</p>
        {/* Display Category/Level if needed */}
        {/* <p className="text-xs text-text-secondary">Categoria: {walletData.affiliateCategory} (Level {walletData.affiliateLevel})</p> */}
      </div>

      {/* CNAE Check Step (for NF Withdrawals) */}
      {showCNAECheck && selectedOptionId === 'pix_com_nf' && (
        <div className="bg-card p-4 rounded-lg shadow border border-yellow-500">
          <h3 className="text-lg font-semibold text-yellow-500 mb-3 flex items-center">
            <ListChecks size={20} className="mr-2"/> Verificação de CNAE (Saque com NF)
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Para realizar saques com Nota Fiscal para um CNPJ, sua empresa precisa ter um dos seguintes CNAEs (principal ou secundário):
          </p>
          <ul className="list-none space-y-1 text-sm text-white mb-4">
            {acceptedCNAEs.map(cnae => (
              <li key={cnae.code}><span className="font-mono bg-border px-1 rounded">{cnae.code}</span> - {cnae.description}</li>
            ))}
          </ul>
          <p className="text-xs text-text-secondary mb-4">
            Certifique-se de que seu CNPJ cadastrado atende a este requisito antes de prosseguir.
          </p>
          <button
            onClick={handleCNAEConfirm}
            className="w-full bg-yellow-500 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-yellow-600 flex items-center justify-center"
          >
            <Check size={16} className="mr-1"/> Entendi e meu CNAE é válido
          </button>
        </div>
      )}

      {/* Payment Options - Only show if CNAE step is not active or option doesn't require it */}
      {(!showCNAECheck || selectedOptionId !== 'pix_com_nf') && (
        <div className="bg-card p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-white mb-4">Opções de Saque / Transferência</h3>
          <div className="space-y-3">
            {walletData.paymentOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedOptionId === option.id ? 'border-primary bg-border/50' : 'border-border hover:bg-border/30'}`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentOption"
                    value={option.id}
                    checked={selectedOptionId === option.id}
                    onChange={() => handleOptionChange(option.id)}
                    className="mr-4 accent-primary focus:ring-primary h-4 w-4 flex-shrink-0 mt-1 self-start"
                  />
                  <div>
                    <p className={`font-semibold ${selectedOptionId === option.id ? 'text-white' : 'text-text-secondary'}`}>{option.name}</p>
                    <p className="text-xs text-text-secondary">{option.description}</p>
                    <p className="text-xs text-gray-500 flex items-center flex-wrap">
                      <Info size={12} className="mr-1 flex-shrink-0"/>
                      {formatRules(option)}
                    </p>
                  </div>
                </div>
                {/* Display Max Value only if applicable? Maybe confusing. Removing for now. */}
                {/* <span className={`font-semibold text-lg ${selectedOptionId === option.id ? 'text-primary' : 'text-white'}`}>
                  R$ {displayValue.toFixed(2).replace('.', ',')}
                  <span className="text-xs block text-right text-text-secondary">(Valor Máx.)</span>
                </span> */}
              </label>
            ))}
          </div>

          {/* Amount Input and Confirmation - Only show if an option is selected AND (it's not NF OR CNAE is confirmed) */}
          {selectedOption && (selectedOption.id !== 'pix_com_nf' || cnaeConfirmed) && (
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 border-t border-border pt-4">
                <div className="flex-grow w-full sm:w-auto">
                    <label htmlFor="amount" className="text-sm text-text-secondary mb-1 block">Valor a movimentar:</label>
                    <input
                        type="text"
                        id="amount"
                        placeholder="0,00"
                        value={amount}
                        onChange={(e) => {
                            let value = e.target.value.replace(/[^0-9,]/g, '');
                            const parts = value.split(',');
                            if (parts.length > 2) { // Prevent multiple commas
                                value = parts[0] + ',' + parts.slice(1).join('');
                            }
                            if (parts[1] && parts[1].length > 2) { // Limit decimal places
                                value = parts[0] + ',' + parts[1].substring(0, 2);
                            }
                            setAmount(value);
                        }}
                        className="bg-border p-2 rounded text-lg w-full focus:outline-none focus:ring-1 focus:ring-primary text-white"
                    />
                    {selectedOption && currentAmount > 0 && (
                        <p className="text-xs text-text-secondary mt-1">
                            Valor final após taxas: <span className="font-medium text-white">R$ {finalCalculatedAmount.toFixed(2).replace('.', ',')}</span>
                        </p>
                    )}
                </div>
                <button
                    onClick={handleConfirm}
                    disabled={!selectedOption || currentAmount <= 0 || currentAmount > walletData.availableBalance}
                    className="w-full sm:w-auto bg-primary text-black px-6 py-3 rounded text-base font-semibold hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-0 self-end flex-shrink-0"
                >
                    Confirmar
                </button>
            </div>
          )}
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-card p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">Histórico Recente</h3>
          <button onClick={() => setShowHistory(true)} className="text-sm text-primary hover:underline flex items-center">
            Ver tudo <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
        <div className="space-y-2">
          {walletData.transactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className="flex justify-between items-center text-sm border-b border-border pb-1 last:border-b-0">
              <div>
                <p className="text-white">{tx.type}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
              <span className={`${tx.amount >= 0 ? 'text-positive' : 'text-negative'} font-medium`}>
                {tx.amount >= 0 ? '+' : ''} R$ {Math.abs(tx.amount).toFixed(2).replace('.', ',')}
              </span>
            </div>
          ))}
          {walletData.transactions.length === 0 && (
             <p className="text-sm text-text-secondary text-center py-4">Nenhuma transação recente.</p>
          )}
        </div>
      </div>

      {/* Full History Modal (Placeholder - Styling needs refinement) */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[80vh] flex flex-col border border-border shadow-lg">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
                 <h2 className="text-xl font-semibold text-white">Histórico Completo</h2>
                 <button onClick={() => setShowHistory(false)} className="text-text-secondary hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-2 overflow-y-auto flex-grow pr-2">
                 {walletData.transactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center text-sm border-b border-border pb-1 last:border-b-0">
                        <div>
                            <p className="text-white">{tx.type}</p>
                            <p className="text-xs text-gray-500">{tx.date}</p>
                        </div>
                        <span className={`${tx.amount >= 0 ? 'text-positive' : 'text-negative'} font-medium`}>
                          {tx.amount >= 0 ? '+' : ''} R$ {Math.abs(tx.amount).toFixed(2).replace('.', ',')}
                        </span>
                    </div>
                 ))}
                 {walletData.transactions.length === 0 && (
                    <p className="text-sm text-text-secondary text-center py-4">Nenhuma transação encontrada.</p>
                 )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CarteiraPage;

