'use client';

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from "lucide-react";

// Tipos
interface Afiliado {
  id: string;
  nome: string;
  nivel: number;
  indicacoesValidas: number;
  valorDepositado: number;
  comissao: number;
}

interface ListaAfiliadosProps {
  afiliados: Afiliado[];
}

export function ListaAfiliados({ afiliados }: ListaAfiliadosProps) {
  // Estados
  const [filtroNivel, setFiltroNivel] = useState<string>("total");
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");
  const [itensPorPagina, setItensPorPagina] = useState<number>(10);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [ordenacao, setOrdenacao] = useState<{coluna: string, direcao: 'asc' | 'desc'}>({
    coluna: 'comissao',
    direcao: 'desc'
  });

  // Filtragem de afiliados
  const afiliadosFiltrados = afiliados
    .filter(afiliado => {
      // Filtro por nível
      if (filtroNivel !== "total" && afiliado.nivel !== parseInt(filtroNivel.replace("nivel", ""))) {
        return false;
      }
      
      // Filtro por pesquisa (ID ou nome)
      if (termoPesquisa && !afiliado.id.toLowerCase().includes(termoPesquisa.toLowerCase()) && 
          !afiliado.nome.toLowerCase().includes(termoPesquisa.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Ordenação
      const coluna = ordenacao.coluna as keyof Afiliado;
      const fatorOrdenacao = ordenacao.direcao === 'asc' ? 1 : -1;
      
      if (a[coluna] < b[coluna]) return -1 * fatorOrdenacao;
      if (a[coluna] > b[coluna]) return 1 * fatorOrdenacao;
      return 0;
    });

  // Paginação
  const totalPaginas = Math.ceil(afiliadosFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const afiliadosPaginados = afiliadosFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);

  // Função para alternar ordenação
  const alternarOrdenacao = (coluna: string) => {
    if (ordenacao.coluna === coluna) {
      setOrdenacao({
        coluna,
        direcao: ordenacao.direcao === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setOrdenacao({
        coluna,
        direcao: 'desc'
      });
    }
  };

  // Cores para os níveis
  const coresNiveis: Record<number, string> = {
    1: "bg-primary/20 text-primary",
    2: "bg-primary/20 text-primary",
    3: "bg-primary/20 text-primary",
    4: "bg-primary/20 text-primary",
    5: "bg-primary/20 text-primary"
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho com pesquisa e filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-medium">Lista de Afiliados</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Campo de Pesquisa */}
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Buscar por ID ou nome"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="pl-8 pr-4 py-2 w-full"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          
          {/* Filtro de Níveis */}
          <Select value={filtroNivel} onValueChange={setFiltroNivel}>
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Filtrar por nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="total">Total</SelectItem>
              <SelectItem value="nivel1">Nível 1</SelectItem>
              <SelectItem value="nivel2">Nível 2</SelectItem>
              <SelectItem value="nivel3">Nível 3</SelectItem>
              <SelectItem value="nivel4">Nível 4</SelectItem>
              <SelectItem value="nivel5">Nível 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Exibindo <span className="font-medium">{afiliadosPaginados.length}</span> de <span className="font-medium">{afiliadosFiltrados.length}</span> afiliados
      </div>
      
      {/* Tabela Desktop */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => alternarOrdenacao('id')}
                  className="flex items-center justify-center"
                >
                  ID Afiliado
                  <ArrowUpDown size={14} className="ml-1" />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => alternarOrdenacao('nome')}
                  className="flex items-center justify-center"
                >
                  Nome Afiliado
                  <ArrowUpDown size={14} className="ml-1" />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => alternarOrdenacao('nivel')}
                  className="flex items-center justify-center"
                >
                  Nível
                  <ArrowUpDown size={14} className="ml-1" />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => alternarOrdenacao('indicacoesValidas')}
                  className="flex items-center justify-center"
                >
                  Ind. Válidas
                  <ArrowUpDown size={14} className="ml-1" />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => alternarOrdenacao('valorDepositado')}
                  className="flex items-center justify-center"
                >
                  Valor Depositado
                  <ArrowUpDown size={14} className="ml-1" />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => alternarOrdenacao('comissao')}
                  className={`flex items-center justify-center ${ordenacao.coluna === 'comissao' ? 'text-primary' : ''}`}
                >
                  Comissão
                  <ArrowUpDown size={14} className="ml-1" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {afiliadosPaginados.length > 0 ? (
              afiliadosPaginados.map((afiliado, index) => (
                <TableRow key={afiliado.id} className={index % 2 === 0 ? 'bg-muted/5' : 'bg-background'}>
                  <TableCell className="text-center">{afiliado.id}</TableCell>
                  <TableCell className="text-center">{afiliado.nome}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`${coresNiveis[afiliado.nivel]}`}>
                      Nível {afiliado.nivel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{afiliado.indicacoesValidas}</TableCell>
                  <TableCell className="text-center">R$ {afiliado.valorDepositado.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell className="text-center text-green-500">R$ {afiliado.comissao.toFixed(2).replace('.', ',')}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Nenhum afiliado encontrado para os filtros selecionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Cards Mobile */}
      <div className="space-y-4 md:hidden">
        {afiliadosPaginados.length > 0 ? (
          afiliadosPaginados.map((afiliado) => (
            <div key={afiliado.id} className="border rounded-lg p-4 bg-card">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{afiliado.id}</span>
                <span className="text-green-500 font-medium">R$ {afiliado.comissao.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="mb-2">
                <div className="text-xs text-muted-foreground">Nome Afiliado</div>
                <div className="text-sm text-center">{afiliado.nome}</div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-muted-foreground">Nível</div>
                <div className="text-sm text-center">
                  <Badge variant="outline" className={`${coresNiveis[afiliado.nivel]}`}>
                    Nível {afiliado.nivel}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Ind. Válidas</div>
                  <div className="text-sm text-center">{afiliado.indicacoesValidas}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Valor Depositado</div>
                  <div className="text-sm text-center">R$ {afiliado.valorDepositado.toFixed(2).replace('.', ',')}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Nenhum afiliado encontrado para os filtros selecionados.
          </div>
        )}
      </div>
      
      {/* Paginação */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <div className="mb-4 md:mb-0">
          <Select value={itensPorPagina.toString()} onValueChange={(value) => {
            setItensPorPagina(parseInt(value));
            setPaginaAtual(1);
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Itens por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 por página</SelectItem>
              <SelectItem value="25">25 por página</SelectItem>
              <SelectItem value="50">50 por página</SelectItem>
              <SelectItem value="100">100 por página</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setPaginaAtual(1)} 
            disabled={paginaAtual === 1}
          >
            <ChevronsLeft size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))} 
            disabled={paginaAtual === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          
          <div className="px-4 py-2 border rounded-md text-sm">
            Página <span className="font-medium">{paginaAtual}</span> de <span className="font-medium">{totalPaginas || 1}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))} 
            disabled={paginaAtual === totalPaginas || totalPaginas === 0}
          >
            <ChevronRight size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setPaginaAtual(totalPaginas)} 
            disabled={paginaAtual === totalPaginas || totalPaginas === 0}
          >
            <ChevronsRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
