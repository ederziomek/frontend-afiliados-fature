import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Target, Award } from 'lucide-react'

function Ranking() {
  const [userPosition] = useState({
    monthly: 8,
    weekly: 5,
    allTime: 12
  })

  const [monthlyRanking] = useState([
    { position: 1, name: "Maria Santos", referrals: 156, earnings: 7800.00, badge: "crown" },
    { position: 2, name: "João Silva", referrals: 142, earnings: 7100.00, badge: "gold" },
    { position: 3, name: "Ana Costa", referrals: 138, earnings: 6900.00, badge: "silver" },
    { position: 4, name: "Pedro Lima", referrals: 125, earnings: 6250.00, badge: "bronze" },
    { position: 5, name: "Carla Mendes", referrals: 118, earnings: 5900.00, badge: "bronze" },
    { position: 6, name: "Roberto Alves", referrals: 112, earnings: 5600.00, badge: "bronze" },
    { position: 7, name: "Lucia Ferreira", referrals: 108, earnings: 5400.00, badge: "bronze" },
    { position: 8, name: "Você", referrals: 98, earnings: 4900.00, badge: "bronze", isUser: true },
    { position: 9, name: "Carlos Souza", referrals: 95, earnings: 4750.00, badge: "bronze" },
    { position: 10, name: "Fernanda Dias", referrals: 89, earnings: 4450.00, badge: "bronze" }
  ])

  const [weeklyRanking] = useState([
    { position: 1, name: "Ana Costa", referrals: 28, earnings: 1400.00, badge: "crown" },
    { position: 2, name: "Pedro Lima", referrals: 25, earnings: 1250.00, badge: "gold" },
    { position: 3, name: "Maria Santos", referrals: 23, earnings: 1150.00, badge: "silver" },
    { position: 4, name: "João Silva", referrals: 21, earnings: 1050.00, badge: "bronze" },
    { position: 5, name: "Você", referrals: 18, earnings: 900.00, badge: "bronze", isUser: true }
  ])

  const [achievements] = useState([
    { name: "Primeiro Passo", description: "Primeira indicação realizada", completed: true, icon: Star },
    { name: "Rede Crescente", description: "10 indicações em um mês", completed: true, icon: Users },
    { name: "Meta Batida", description: "Atingir meta mensal", completed: true, icon: Target },
    { name: "Top 10", description: "Entrar no top 10 mensal", completed: true, icon: Trophy },
    { name: "Especialista", description: "50 indicações totais", completed: false, icon: Award, progress: 78 }
  ])

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'crown':
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 'gold':
        return <Medal className="h-5 w-5 text-yellow-500" />
      case 'silver':
        return <Medal className="h-5 w-5 text-gray-400" />
      case 'bronze':
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <Star className="h-5 w-5 text-gray-400" />
    }
  }

  const getPositionColor = (position) => {
    if (position === 1) return "text-yellow-500"
    if (position === 2) return "text-gray-400"
    if (position === 3) return "text-amber-600"
    return "text-gray-600"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ranking de Afiliados</h2>
        <p className="text-gray-600">Compete com outros afiliados e suba no ranking</p>
      </div>

      {/* Suas Posições */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-orange-600" />
              Ranking Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">#{userPosition.monthly}</p>
              <p className="text-sm text-gray-600">Sua posição</p>
              <div className="flex items-center justify-center text-green-600 text-sm mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +3 posições
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Star className="h-5 w-5 mr-2 text-orange-600" />
              Ranking Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">#{userPosition.weekly}</p>
              <p className="text-sm text-gray-600">Sua posição</p>
              <div className="flex items-center justify-center text-green-600 text-sm mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2 posições
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Award className="h-5 w-5 mr-2 text-orange-600" />
              Ranking Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600 mb-2">#{userPosition.allTime}</p>
              <p className="text-sm text-gray-600">Sua posição</p>
              <div className="flex items-center justify-center text-green-600 text-sm mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5 posições
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para Rankings */}
      <Tabs defaultValue="monthly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">Ranking Mensal</TabsTrigger>
          <TabsTrigger value="weekly">Ranking Semanal</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Top Afiliados do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyRanking.map((affiliate) => (
                  <div 
                    key={affiliate.position} 
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      affiliate.isUser 
                        ? 'bg-orange-50 border-2 border-orange-200 shadow-md' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        affiliate.position <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        <span className="font-bold text-sm">{affiliate.position}</span>
                      </div>
                      <div className="flex items-center">
                        {getBadgeIcon(affiliate.badge)}
                        <div className="ml-3">
                          <p className={`font-medium ${affiliate.isUser ? 'text-orange-700' : 'text-gray-900'}`}>
                            {affiliate.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {affiliate.referrals} indicações
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${affiliate.isUser ? 'text-orange-600' : 'text-green-600'}`}>
                        R$ {affiliate.earnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-gray-600">Ganhos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Top Afiliados da Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyRanking.map((affiliate) => (
                  <div 
                    key={affiliate.position} 
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      affiliate.isUser 
                        ? 'bg-orange-50 border-2 border-orange-200 shadow-md' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        affiliate.position <= 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        <span className="font-bold text-sm">{affiliate.position}</span>
                      </div>
                      <div className="flex items-center">
                        {getBadgeIcon(affiliate.badge)}
                        <div className="ml-3">
                          <p className={`font-medium ${affiliate.isUser ? 'text-orange-700' : 'text-gray-900'}`}>
                            {affiliate.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {affiliate.referrals} indicações
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${affiliate.isUser ? 'text-orange-600' : 'text-green-600'}`}>
                        R$ {affiliate.earnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-gray-600">Ganhos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Conquistas */}
      <Card className="bg-white shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
            <Award className="h-5 w-5 mr-2 text-orange-600" />
            Suas Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    achievement.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg mr-3 ${
                      achievement.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-5 w-5 ${
                        achievement.completed ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        achievement.completed ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        {achievement.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  {achievement.completed ? (
                    <Badge className="bg-green-100 text-green-800">
                      Concluída
                    </Badge>
                  ) : (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-medium">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Ranking

