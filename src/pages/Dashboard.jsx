import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Copy, Users, TrendingUp, Calendar } from 'lucide-react'

function Dashboard() {
  const [affiliateData] = useState({
    name: "João Silva",
    referralLink: "https://fature.com/ref/joao123",
    networkSize: 127,
    dailyReferrals: 8,
    totalEarnings: 2450.75,
    monthlyGoal: 5000
  })

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // Aqui você pode adicionar uma notificação de sucesso
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Acompanhe seu desempenho como afiliado</p>
      </div>

      {/* Grid dos 4 frames principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Frame 1: Nome do Afiliado */}
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-600" />
              Afiliado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-indigo-600">{affiliateData.name}</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Ativo
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Frame 2: Link de Indicação */}
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Copy className="h-5 w-5 mr-2 text-indigo-600" />
              Link de Indicação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm text-gray-600 truncate">{affiliateData.referralLink}</p>
              </div>
              <Button 
                onClick={() => copyToClipboard(affiliateData.referralLink)}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Frame 3: Sua Rede */}
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-600" />
              Sua Rede
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-indigo-600">{affiliateData.networkSize}</p>
              <p className="text-sm text-gray-600">Pessoas indicadas</p>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12 este mês
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frame 4: Indicação Diária */}
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
              Indicação Diária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-indigo-600">{affiliateData.dailyReferrals}</p>
              <p className="text-sm text-gray-600">Indicações hoje</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(affiliateData.dailyReferrals / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">Meta: 10 por dia</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de resumo de ganhos */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Resumo de Ganhos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Ganho</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {affiliateData.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Meta Mensal</p>
              <p className="text-2xl font-bold text-indigo-600">
                R$ {affiliateData.monthlyGoal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Progresso</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round((affiliateData.totalEarnings / affiliateData.monthlyGoal) * 100)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

