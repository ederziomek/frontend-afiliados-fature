'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListaAfiliados } from "@/components/minha-rede/lista_afiliados";

// Dados de exemplo para resumo
interface ResumoNivel {
  nivel: number;
  indicacoes: number;
  indicacoesValidas: number;
  comissoes: number;
}

interface ResumoTotal {
  indicacoes: number;
  indicacoesValidas: number;
  comissoes: number;
  resumosPorNivel: ResumoNivel[];
}

// Dados de exemplo para afiliados
interface Afiliado {
  id: string;
  nome: string;
  nivel: number;
  indicacoesValidas: number;
  valorDepositado: number;
  comissao: number;
}

// Dados mockados para demonstração
const dadosResumo: ResumoTotal = {
  indicacoes: 247,
  indicacoesValidas: 183,
  comissoes: 5490.00,
  resumosPorNivel: [
    { nivel: 1, indicacoes: 98, indicacoesValidas: 76, comissoes: 3040.00 },
    { nivel: 2, indicacoes: 67, indicacoesValidas: 52, comissoes: 1300.00 },
    { nivel: 3, indicacoes: 45, indicacoesValidas: 32, comissoes: 640.00 },
    { nivel: 4, indicacoes: 24, indicacoesValidas: 16, comissoes: 320.00 },
    { nivel: 5, indicacoes: 13, indicacoesValidas: 7, comissoes: 190.00 }
  ]
};

// Dados mockados de afiliados
const dadosAfiliados: Afiliado[] = [
  { id: "#AF12345", nome: "João Silva", nivel: 1, indicacoesValidas: 12, valorDepositado: 2400.00, comissao: 480.00 },
  { id: "#AF12346", nome: "Maria Oliveira", nivel: 1, indicacoesValidas: 18, valorDepositado: 3600.00, comissao: 720.00 },
  { id: "#AF12347", nome: "Carlos Santos", nivel: 2, indicacoesValidas: 8, valorDepositado: 1600.00, comissao: 320.00 },
  { id: "#AF12348", nome: "Ana Pereira", nivel: 1, indicacoesValidas: 15, valorDepositado: 3000.00, comissao: 600.00 },
  { id: "#AF12349", nome: "Pedro Almeida", nivel: 3, indicacoesValidas: 5, valorDepositado: 1000.00, comissao: 200.00 },
  { id: "#AF12350", nome: "Juliana Costa", nivel: 2, indicacoesValidas: 10, valorDepositado: 2000.00, comissao: 400.00 },
  { id: "#AF12351", nome: "Marcos Souza", nivel: 4, indicacoesValidas: 7, valorDepositado: 1400.00, comissao: 280.00 },
  { id: "#AF12352", nome: "Fernanda Lima", nivel: 1, indicacoesValidas: 14, valorDepositado: 2800.00, comissao: 560.00 },
  { id: "#AF12353", nome: "Ricardo Gomes", nivel: 5, indicacoesValidas: 6, valorDepositado: 1200.00, comissao: 240.00 },
  { id: "#AF12354", nome: "Camila Ferreira", nivel: 3, indicacoesValidas: 9, valorDepositado: 1800.00, comissao: 360.00 },
  { id: "#AF12355", nome: "Roberto Dias", nivel: 2, indicacoesValidas: 11, valorDepositado: 2200.00, comissao: 440.00 },
  { id: "#AF12356", nome: "Luciana Martins", nivel: 1, indicacoesValidas: 16, valorDepositado: 3200.00, comissao: 640.00 },
  { id: "#AF12357", nome: "Felipe Cardoso", nivel: 3, indicacoesValidas: 4, valorDepositado: 800.00, comissao: 160.00 },
  { id: "#AF12358", nome: "Mariana Costa", nivel: 2, indicacoesValidas: 9, valorDepositado: 1800.00, comissao: 360.00 },
  { id: "#AF12359", nome: "Eduardo Nunes", nivel: 1, indicacoesValidas: 13, valorDepositado: 2600.00, comissao: 520.00 },
  { id: "#AF12360", nome: "Patrícia Lopes", nivel: 4, indicacoesValidas: 5, valorDepositado: 1000.00, comissao: 200.00 },
  { id: "#AF12361", nome: "Gabriel Mendes", nivel: 2, indicacoesValidas: 7, valorDepositado: 1400.00, comissao: 280.00 },
  { id: "#AF12362", nome: "Isabela Rocha", nivel: 1, indicacoesValidas: 19, valorDepositado: 3800.00, comissao: 760.00 },
  { id: "#AF12363", nome: "Thiago Alves", nivel: 3, indicacoesValidas: 6, valorDepositado: 1200.00, comissao: 240.00 },
  { id: "#AF12364", nome: "Carla Ribeiro", nivel: 5, indicacoesValidas: 3, valorDepositado: 600.00, comissao: 120.00 }
];

export default function MinhaRedePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Minha Rede</h1>
      
      {/* Seção de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Card Total */}
        <Card className="lg:col-span-2 border-primary/30 border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex justify-between items-center">
              Minha Rede - Total
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Indicações</p>
                <p className="text-lg font-bold">{dadosResumo.indicacoes}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Ind. Válidas</p>
                <p className="text-lg font-bold">{dadosResumo.indicacoesValidas}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Comissões</p>
                <p className="text-lg font-bold text-green-500">R$ {dadosResumo.comissoes.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Cards de Nível */}
        {dadosResumo.resumosPorNivel.map((resumo) => (
          <Card key={resumo.nivel} className="border-primary/30 border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nível {resumo.nivel}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Indicações</span>
                  <span className="font-medium">{resumo.indicacoes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ind. Válidas</span>
                  <span className="font-medium">{resumo.indicacoesValidas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Comissões</span>
                  <span className="font-medium text-green-500">R$ {resumo.comissoes.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Seção de Lista de Afiliados */}
      <Card className="border-primary/30 border-2">
        <CardContent className="pt-6">
          <ListaAfiliados afiliados={dadosAfiliados} />
        </CardContent>
      </Card>
    </div>
  );
}
