import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Wallet, TrendingUp, Download, Calendar, DollarSign, Clock, CheckCircle } from 'lucide-react'

function CofreComissoes() {
  const [balance] = useState({
    available: 2450.75,
    pending: 380.50,
    total: 2831.25,
    minimumWithdraw: 100
  })

  const [commissions] = useState([
    { date: "2025-06-01", type: "Indicação Direta", amount: 125.00, status: "Aprovada" },
    { date: "2025-05-31", type: "Comissão de Rede", amount: 45.50, status: "Aprovada" },
    { date: "2025-05-30", type: "Bônus Mensal", amount: 200.00, status: "Aprovada" },
    { date: "2025-05-29", type: "Indicação Direta", amount: 125.00, status: "Pendente" },
    { date: "2025-05-28", type: "Comissão de Rede", amount: 35.25, status: "Aprovada" }
  ])

  const [withdrawals] = useState([
    { date: "2025-05-25", amount: 500.00, status: "Concluído", method: "PIX" },
    { date: "2025-05-15", amount: 300.00, status: "Concluído", method: "Transferência" },
    { date: "2025-05-05", amount: 250.00, status: "Concluído", method: "PIX" }
  ])

  const [monthlyStats] = useState({
    thisMonth: 1250.75,
    lastMonth: 980.50,
    growth: 27.6
  })

  const requestWithdraw = () => {
    // Lógica para solicitar saque
    console.log("Solicitando saque")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovada':
      case 'Concluído':
        return 'bg-green-100 text-green-800'
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cofre de Comissões</h2>
        <p className="text-gray-600">Acompanhe suas comissões e gerencie seus saques</p>
      </div>

      {/* Cards de Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-green-600" />
              Saldo Disponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              R$ {balance.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-600 mt-1">Pronto para saque</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-yellow-600" />
              Saldo Pendente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">
              R$ {balance.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-600 mt-1">Em análise</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              Total Acumulado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              R$ {balance.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-600 mt-1">Histórico total</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              Este Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">
              R$ {monthlyStats.thisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center text-green-600 text-sm mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{monthlyStats.growth}% vs mês anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Saque */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Solicitar Saque</h3>
                <p className="text-green-100">
                  Valor mínimo: R$ {balance.minimumWithdraw.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Button 
                onClick={requestWithdraw}
                disabled={balance.available < balance.minimumWithdraw}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Sacar Agora
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para Histórico */}
      <Tabs defaultValue="commissions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="commissions">Histórico de Comissões</TabsTrigger>
          <TabsTrigger value="withdrawals">Histórico de Saques</TabsTrigger>
        </TabsList>

        <TabsContent value="commissions">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Comissões Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissions.map((commission, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{commission.type}</p>
                        <p className="text-sm text-gray-600">{commission.date}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      <div>
                        <p className="font-bold text-green-600">
                          R$ {commission.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <Badge className={getStatusColor(commission.status)}>
                        {commission.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Saques Realizados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {withdrawals.map((withdrawal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Download className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{withdrawal.method}</p>
                        <p className="text-sm text-gray-600">{withdrawal.date}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      <div>
                        <p className="font-bold text-blue-600">
                          R$ {withdrawal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <Badge className={getStatusColor(withdrawal.status)}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {withdrawal.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CofreComissoes

