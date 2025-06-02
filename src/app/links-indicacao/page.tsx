"use client";

import React, { useState } from 'react';
import { Link2, Plus, Copy, QrCode, BarChart3, Download, Trash2, ExternalLink, Eye } from 'lucide-react';

interface CustomLink {
  id: string;
  name: string;
  url: string;
  clicks: number;
  conversions: number;
  revenue: number;
  isActive: boolean;
  createdAt: string;
  lastClicked: string;
  qrCodeUrl: string;
}

interface LinkAnalytics {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  averageConversionRate: number;
  topPerformingLinks: string[];
  clicksByDay: { date: string; clicks: number }[];
}

const LinksIndicacaoPage: React.FC = () => {
  const [links, setLinks] = useState<CustomLink[]>([
    {
      id: '1',
      name: 'Promoção Black Friday',
      url: 'https://upbet.com/ref/user123_promocao-black-friday',
      clicks: 1250,
      conversions: 89,
      revenue: 44500,
      isActive: true,
      createdAt: '2025-05-15',
      lastClicked: '2025-06-02T10:30:00Z',
      qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    },
    {
      id: '2',
      name: 'Campanha Redes Sociais',
      url: 'https://upbet.com/ref/user123_campanha-redes-sociais',
      clicks: 890,
      conversions: 43,
      revenue: 21500,
      isActive: true,
      createdAt: '2025-05-20',
      lastClicked: '2025-06-02T09:15:00Z',
      qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    }
  ]);

  const [analytics] = useState<LinkAnalytics>({
    totalClicks: 2140,
    totalConversions: 132,
    totalRevenue: 66000,
    averageConversionRate: 6.17,
    topPerformingLinks: [],
    clicksByDay: [
      { date: '2025-05-28', clicks: 45 },
      { date: '2025-05-29', clicks: 67 },
      { date: '2025-05-30', clicks: 89 },
      { date: '2025-05-31', clicks: 123 },
      { date: '2025-06-01', clicks: 156 },
      { date: '2025-06-02', clicks: 98 },
    ],
  });

  const [isCreating, setIsCreating] = useState(false);
  const [newLink, setNewLink] = useState({
    name: '',
    customSlug: '',
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 30);
  };

  const generateQRCode = (url: string) => {
    // Simulação de geração de QR Code
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  };

  const createLink = () => {
    if (!newLink.name || !newLink.customSlug) return;

    const link: CustomLink = {
      id: Date.now().toString(),
      name: newLink.name,
      url: `https://upbet.com/ref/user123_${newLink.customSlug}`,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      lastClicked: '',
      qrCodeUrl: generateQRCode(`https://upbet.com/ref/user123_${newLink.customSlug}`),
    };

    setLinks([...links, link]);
    setNewLink({ name: '', customSlug: '' });
    setIsCreating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aqui você pode adicionar uma notificação de sucesso
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Link2 className="mr-3 text-[rgb(18,201,185)]" size={32} />
              🔗 Links de Indicação
            </h1>
            <p className="text-text-secondary mt-2">
              Crie e gerencie seus links personalizados de indicação
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-[rgb(18,201,185)] text-white px-6 py-3 rounded-lg hover:bg-[rgb(16,181,166)] transition-colors flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Criar Novo Link
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[rgb(18,201,185)]">{analytics.totalClicks}</div>
                <div className="text-sm text-text-secondary">Total de Cliques</div>
              </div>
              <BarChart3 className="text-[rgb(18,201,185)]" size={24} />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">{analytics.totalConversions}</div>
                <div className="text-sm text-text-secondary">Conversões</div>
              </div>
              <Eye className="text-green-400" size={24} />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">{formatCurrency(analytics.totalRevenue)}</div>
                <div className="text-sm text-text-secondary">Receita Total</div>
              </div>
              <Download className="text-yellow-400" size={24} />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{analytics.averageConversionRate}%</div>
                <div className="text-sm text-text-secondary">Taxa de Conversão</div>
              </div>
              <BarChart3 className="text-white" size={24} />
            </div>
          </div>
        </div>

        {/* Links List */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-white">Meus Links de Indicação</h2>
          </div>
          <div className="p-6">
            {links.length === 0 ? (
              <div className="text-center py-12">
                <Link2 className="mx-auto text-text-secondary mb-4" size={48} />
                <h3 className="text-lg font-medium text-white mb-2">Nenhum link criado ainda</h3>
                <p className="text-text-secondary mb-4">Crie seu primeiro link personalizado para começar a rastrear suas indicações</p>
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-[rgb(18,201,185)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(16,181,166)] transition-colors"
                >
                  Criar Primeiro Link
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map(link => (
                  <div key={link.id} className="bg-background p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${link.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <div>
                          <h3 className="font-semibold text-white">{link.name}</h3>
                          <p className="text-sm text-text-secondary">{link.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(link.url)}
                          className="p-2 bg-[rgb(18,201,185)] text-white rounded hover:bg-[rgb(16,181,166)] transition-colors"
                          title="Copiar Link"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => window.open(link.url, '_blank')}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          title="Abrir Link"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          title="Excluir Link"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <div className="text-text-secondary">Cliques</div>
                        <div className="text-white font-medium">{link.clicks}</div>
                      </div>
                      <div>
                        <div className="text-text-secondary">Conversões</div>
                        <div className="text-white font-medium">{link.conversions}</div>
                      </div>
                      <div>
                        <div className="text-text-secondary">Receita</div>
                        <div className="text-white font-medium">{formatCurrency(link.revenue)}</div>
                      </div>
                      <div>
                        <div className="text-text-secondary">Taxa</div>
                        <div className="text-white font-medium">
                          {link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : 0}%
                        </div>
                      </div>
                      <div>
                        <div className="text-text-secondary">Último Clique</div>
                        <div className="text-white font-medium">{formatDate(link.lastClicked)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal de Criação */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-white mb-4">Criar Novo Link de Indicação</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Nome do Link
                  </label>
                  <input
                    type="text"
                    value={newLink.name}
                    onChange={(e) => {
                      setNewLink({ 
                        ...newLink, 
                        name: e.target.value,
                        customSlug: generateSlug(e.target.value)
                      });
                    }}
                    placeholder="Ex: Promoção Black Friday"
                    className="w-full px-3 py-2 bg-background text-white rounded border border-border focus:border-[rgb(18,201,185)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Slug Personalizado
                  </label>
                  <input
                    type="text"
                    value={newLink.customSlug}
                    onChange={(e) => setNewLink({ ...newLink, customSlug: e.target.value })}
                    placeholder="promocao-black-friday"
                    className="w-full px-3 py-2 bg-background text-white rounded border border-border focus:border-[rgb(18,201,185)] focus:outline-none"
                  />
                  <p className="text-xs text-text-secondary mt-1">
                    Link final: https://upbet.com/ref/user123_{newLink.customSlug}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreating(false)}
                  className="flex-1 px-4 py-2 bg-background text-white rounded border border-border hover:bg-border transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={createLink}
                  disabled={!newLink.name || !newLink.customSlug}
                  className="flex-1 px-4 py-2 bg-[rgb(18,201,185)] text-white rounded hover:bg-[rgb(16,181,166)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar Link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksIndicacaoPage;

