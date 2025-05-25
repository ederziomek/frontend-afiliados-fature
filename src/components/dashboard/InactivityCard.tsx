import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Target, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// --- Placeholder Data (Replace with actual user status) ---
interface InactivityStatus {
  isActive: boolean; // True if user is active, false if inactive
  daysInactive?: number; // Number of days inactive (if inactive)
  reductionPercent?: number; // Current commission reduction percentage (if inactive)
  reactivationGoal?: number; // Number of valid indications needed to reactivate
  indicationsMade?: number; // Indications made towards reactivation goal (if inactive)
  daysUntilReduction?: number; // Days left until next reduction step (if inactive and reduction not maxed)
  daysUntilInactive?: number; // Days left until becoming inactive (if active but close)
}

const placeholderStatus: InactivityStatus = {
  // Scenario 1: Active User (Close to Inactive)
  // isActive: true,
  // daysUntilInactive: 5,

  // Scenario 2: Inactive User (Reduction Applied)
  isActive: false,
  daysInactive: 15,
  reductionPercent: 25,
  reactivationGoal: 10,
  indicationsMade: 3,
  daysUntilReduction: 15, // Days until next 25% reduction

  // Scenario 3: Inactive User (Max Reduction)
  // isActive: false,
  // daysInactive: 40,
  // reductionPercent: 100,
  // reactivationGoal: 10,
  // indicationsMade: 1,
};
// --- End Placeholder Data ---

const InactivityCard = () => {
  const status = placeholderStatus; // Use placeholder data

  if (status.isActive && status.daysUntilInactive === undefined) {
    // User is active and not close to inactivity - don't show the card
    // return null; // Or return a minimal 'Active' status if desired
    return (
        <Card className="bg-card border-border text-white">
            <CardHeader>
                <CardTitle className="flex items-center">
                <AlertTriangle size={20} className="mr-2 text-green-500" />
                Status de Atividade
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-green-400">Você está ativo! Continue indicando para manter seus benefícios.</p>
            </CardContent>
        </Card>
    );
  }

  const reactivationProgress = status.indicationsMade !== undefined && status.reactivationGoal !== undefined
    ? (status.indicationsMade / status.reactivationGoal) * 100
    : 0;

  return (
    <Card className={`bg-card border-border text-white ${status.isActive ? 'border-yellow-500/50' : 'border-red-500/50'}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle size={20} className={`mr-2 ${status.isActive ? 'text-yellow-500' : 'text-red-500'}`} />
          Status de Atividade
        </CardTitle>
        <CardDescription className="text-text-secondary">
          {status.isActive
            ? `Atenção! Você ficará inativo em ${status.daysUntilInactive} dias se não fizer indicações válidas.`
            : `Você está inativo há ${status.daysInactive} dias.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!status.isActive && (
          <>
            {/* Reduction Info */}
            {status.reductionPercent !== undefined && status.reductionPercent > 0 && (
              <div className="flex items-center justify-between p-3 bg-red-900/30 rounded-lg">
                <div className="flex items-center">
                  <TrendingDown size={18} className="mr-2 text-red-400" />
                  <span className="text-sm text-red-400">Redução de Comissão:</span>
                </div>
                <span className="text-lg font-semibold text-red-400">{status.reductionPercent}%</span>
              </div>
            )}
            {status.daysUntilReduction !== undefined && status.reductionPercent !== 100 && (
                 <p className="text-xs text-yellow-500 text-center">Próxima redução em {status.daysUntilReduction} dias.</p>
            )}

            {/* Reactivation Goal */}
            {status.reactivationGoal !== undefined && (
              <div className="mt-4">
                <p className="text-sm text-text-secondary mb-1 text-center">Faça <span className="font-semibold text-primary">{status.reactivationGoal}</span> indicações válidas para reativar 100% das comissões.</p>
                <Progress value={reactivationProgress} className="h-3 bg-border [&>div]:bg-primary" />
                <p className="text-xs text-text-secondary text-center mt-1">Progresso: {status.indicationsMade || 0}/{status.reactivationGoal}</p>
              </div>
            )}
          </>
        )}
        {status.isActive && status.daysUntilInactive !== undefined && (
             <p className="text-sm text-yellow-500">Faça pelo menos 1 indicação validada para evitar a inatividade.</p>
        )}

        {/* Link to Rules/Help */}
        <Button variant="outline" size="sm" className="w-full border-text-secondary/50 text-text-secondary hover:border-primary hover:text-primary hover:bg-primary/10" asChild>
          <Link href="/ajuda#inatividade">
            Entenda as Regras de Inatividade
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default InactivityCard;

