'use client';

import React from 'react';
import ListaAfiliados from '@/components/minha-rede/lista_afiliados';

// Interface para tipagem dos dados de afiliados
interface AfiliadoData {
  id: string;
  nome: string;
  nivel: number;
  indValidas: number;
  valorDepositado: string;
  comissao: string;
}

// Dados mockados para a lista de afiliados
const dadosAfiliados: AfiliadoData[] = [
  {
    id: '#AF12345',
    nome: 'João Silva',
    nivel: 1,
    indValidas: 12,
    valorDepositado: 'R$ 2.400,00',
    comissao: 'R$ 480,00'
  },
  {
    id: '#AF12346',
    nome: 'Maria Oliveira',
    nivel: 1,
    indValidas: 18,
    valorDepositado: 'R$ 3.600,00',
    comissao: 'R$ 720,00'
  },
  {
    id: '#AF12347',
    nome: 'Carlos Santos',
    nivel: 2,
    indValidas: 8,
    valorDepositado: 'R$ 1.600,00',
    comissao: 'R$ 320,00'
  },
  {
    id: '#AF12348',
    nome: 'Ana Pereira',
    nivel: 1,
    indValidas: 15,
    valorDepositado: 'R$ 3.000,00',
    comissao: 'R$ 600,00'
  },
  {
    id: '#AF12349',
    nome: 'Pedro Almeida',
    nivel: 3,
    indValidas: 5,
    valorDepositado: 'R$ 1.000,00',
    comissao: 'R$ 200,00'
  },
  {
    id: '#AF12350',
    nome: 'Juliana Costa',
    nivel: 2,
    indValidas: 10,
    valorDepositado: 'R$ 2.000,00',
    comissao: 'R$ 400,00'
  },
  {
    id: '#AF12351',
    nome: 'Marcos Souza',
    nivel: 4,
    indValidas: 7,
    valorDepositado: 'R$ 1.400,00',
    comissao: 'R$ 280,00'
  },
  {
    id: '#AF12352',
    nome: 'Fernanda Lima',
    nivel: 1,
    indValidas: 14,
    valorDepositado: 'R$ 2.800,00',
    comissao: 'R$ 560,00'
  },
  {
    id: '#AF12353',
    nome: 'Ricardo Gomes',
    nivel: 5,
    indValidas: 6,
    valorDepositado: 'R$ 1.200,00',
    comissao: 'R$ 240,00'
  },
  {
    id: '#AF12354',
    nome: 'Camila Ferreira',
    nivel: 3,
    indValidas: 9,
    valorDepositado: 'R$ 1.800,00',
    comissao: 'R$ 360,00'
  },
  // Adicionar mais dados para testar paginação
  {
    id: '#AF12355',
    nome: 'Roberto Silva',
    nivel: 2,
    indValidas: 11,
    valorDepositado: 'R$ 2.200,00',
    comissao: 'R$ 440,00'
  },
  {
    id: '#AF12356',
    nome: 'Luciana Martins',
    nivel: 1,
    indValidas: 16,
    valorDepositado: 'R$ 3.200,00',
    comissao: 'R$ 640,00'
  }
];

export default function MinhaRede() {
  return (
    <div className="min-h-screen bg-dark">
      <ListaAfiliados data={dadosAfiliados} />
    </div>
  );
}
