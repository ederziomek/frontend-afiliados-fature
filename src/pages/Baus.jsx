import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Gift, Star, Crown, Gem, Clock } from 'lucide-react'

function Baus() {
  const [chests] = useState([
    {
      id: 1,
      name: "Baú Bronze",
      type: "bronze",
      icon: Gift,
      reward: "R$ 50 - R$ 100",
      probability: 85,
      requirement: "5 indicações",
      available: true,
      progress: 100,
      color: "bg-amber-600"
    },
    {
      id: 2,
      name: "Baú Prata",
      type: "silver",
      icon: Star,
      reward: "R$ 100 - R$ 250",
      probability: 70,
      requirement: "15 indicações",
      available: true,
      progress: 100,
      color: "bg-gray-400"
    },
    {
      id: 3,
      name: "Baú Ouro",
      type: "gold",
      icon: Crown,
      reward: "R$ 250 - R$ 500",
      probability: 50,
      requirement: "30 indicações",
      available: false,
      progress: 67,
      color: "bg-yellow-500"
    },
    {
      id: 4,
      name: "Baú Diamante",
      type: "diamond",
      icon: Gem,
      reward: "R$ 500 - R$ 1.000",
      probability: 25,
      requirement: "50 indicações",
      available: false,
      progress: 40,
      color: "bg-blue-500"
    }
  ])

  const [recentRewards] = useState([
    { date: "2025-06-01", chest: "Baú Bronze", reward: "R$ 75,00" },
    { date: "2025-05-30", chest: "Baú Prata", reward: "R$ 180,00" },
    { date: "2025-05-28", chest: "Baú Bronze", reward: "R$ 95,00" }
  ])

  const openChest = (chestId) => {
    // Lógica para abrir baú
    console.log(`Abrindo baú ${chestId}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Baús de Recompensas</h2>
        <p className="text-gray-600">Abra baús e ganhe recompensas incríveis baseadas nas suas indicações</p>
      </div>

      {/* Grid de Baús */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {chests.map((chest) => {
          const IconComponent = chest.icon
          return (
            <Card key={chest.id} className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${chest.available ? 'ring-2 ring-purple-200' : 'opacity-75'}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${chest.color} mr-3`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    {chest.name}
                  </div>
                  {chest.available && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Disponível
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recompensa</p>
                  <p className="font-semibold text-purple-600">{chest.reward}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Requisito</p>
                  <p className="text-sm font-medium">{chest.requirement}</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-medium">{chest.progress}%</span>
                  </div>
                  <Progress value={chest.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Chance de sucesso</span>
                  <span className="font-medium text-green-600">{chest.probability}%</span>
                </div>

                <Button 
                  onClick={() => openChest(chest.id)}
                  disabled={!chest.available}
                  className={`w-full ${chest.available ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300'}`}
                >
                  {chest.available ? 'Abrir Baú' : 'Bloqueado'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Histórico de Recompensas */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Histórico de Recompensas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Gift className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{reward.chest}</p>
                    <p className="text-sm text-gray-600">{reward.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{reward.reward}</p>
                  <p className="text-sm text-gray-600">Recompensa</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-1">24</p>
            <p className="text-sm text-gray-600">Baús Abertos</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600 mb-1">R$ 1.850</p>
            <p className="text-sm text-gray-600">Total em Recompensas</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600 mb-1">Ouro</p>
            <p className="text-sm text-gray-600">Próximo Baú</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Baus

