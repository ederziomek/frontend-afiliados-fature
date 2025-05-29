'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Info, ChevronDown, ChevronUp, Search, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

// Interfaces para tipagem
interface NivelCardProps {
  titulo: string;
  indicacoes: number;
  indValidas: number;
  comissoes: string;
}

interface AfiliadoData {
  id: string;
  nome: string;
  nivel: number;
  indValidas: number;
  valorDepositado: string;
  comissao: string;
}

interface ListaAfiliadosProps {
  data: AfiliadoData[];
}

interface ResumoNivel {
  indicacoes: number;
  indValidas: number;
  comissoes: string;
}

interface ResumoData {
  total: ResumoNivel;
  nivel1: ResumoNivel;
  nivel2: ResumoNivel;
  nivel3: ResumoNivel;
  nivel4: ResumoNivel;
  nivel5: ResumoNivel;
}

// Componente para o card de resumo por nível
const NivelCard: React.FC<NivelCardProps> = ({ titulo, indicacoes, indValidas, comissoes }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border-2 border-primary/30">
      <h2 className="text-lg font-medium mb-3">{titulo}</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Indicações</span>
          <span className="font-medium">{indicacoes}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Ind. Válidas</span>
          <span className="font-medium">{indValidas}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Comissões</span>
          <span className="font-medium text-success">R$ {comissoes}</span>
        </div>
      </div>
    </div>
  );
};

// Componente principal da lista de afiliados
const ListaAfiliados: React.FC<ListaAfiliadosProps> = ({ data }) => {
  const [mostrarNiveis, setMostrarNiveis] = useState<boolean>(false);
  const [nivelFiltro, setNivelFiltro] = useState<string>('total');
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [itensPorPagina, setItensPorPagina] = useState<number>(10);
  const [dadosFiltrados, setDadosFiltrados] = useState<AfiliadoData[]>([]);
  const [ordenacao, setOrdenacao] = useState<{ campo: string; direcao: 'asc' | 'desc' }>({ 
    campo: 'comissao', 
    direcao: 'desc' 
  });

  // Dados de resumo
  const resumo: ResumoData = {
    total: {
      indicacoes: 247,
      indValidas: 183,
      comissoes: '5.490,00'
    },
    nivel1: {
      indicacoes: 98,
      indValidas: 76,
      comissoes: '3.040,00'
    },
    nivel2: {
      indicacoes: 67,
      indValidas: 52,
      comissoes: '1.300,00'
    },
    nivel3: {
      indicacoes: 45,
      indValidas: 32,
      comissoes: '640,00'
    },
    nivel4: {
      indicacoes: 24,
      indValidas: 16,
      comissoes: '320,00'
    },
    nivel5: {
      indicacoes: 13,
      indValidas: 7,
      comissoes: '190,00'
    }
  };

  // Efeito para filtrar e ordenar os dados
  useEffect(() => {
    let resultado = [...data];
    
    // Aplicar filtro de nível
    if (nivelFiltro !== 'total') {
      const nivel = parseInt(nivelFiltro.replace('nivel', ''));
      resultado = resultado.filter(item => item.nivel === nivel);
    }
    
    // Aplicar busca
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      resultado = resultado.filter(
        item => item.id.toLowerCase().includes(termo) || 
               item.nome.toLowerCase().includes(termo)
      );
    }
    
    // Aplicar ordenação
    resultado.sort((a, b) => {
      let valorA = a[ordenacao.campo as keyof AfiliadoData];
      let valorB = b[ordenacao.campo as keyof AfiliadoData];
      
      // Converter para número se for valor monetário
      if (typeof valorA === 'string' && valorA.includes('R$')) {
        valorA = parseFloat(valorA.replace('R$', '').replace('.', '').replace(',', '.')) as any;
      }
      if (typeof valorB === 'string' && valorB.includes('R$')) {
        valorB = parseFloat(valorB.replace('R$', '').replace('.', '').replace(',', '.')) as any;
      }
      
      if (ordenacao.direcao === 'asc') {
        return valorA > valorB ? 1 : -1;
      } else {
        return valorA < valorB ? 1 : -1;
      }
    });
    
    setDadosFiltrados(resultado);
  }, [data, nivelFiltro, termoBusca, ordenacao]);

  // Função para alternar ordenação
  const alternarOrdenacao = (campo: string): void => {
    if (ordenacao.campo === campo) {
      setOrdenacao({
        campo,
        direcao: ordenacao.direcao === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setOrdenacao({
        campo,
        direcao: 'desc'
      });
    }
  };

  // Calcular dados paginados
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const dadosPaginados = dadosFiltrados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção de Resumo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Minha Rede</h1>
        
        {/* Card Total */}
        <div className="border-2 border-primary/30 bg-gray-800 rounded-lg p-4 mb-4 transition-all hover:translate-y-[-2px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Minha Rede - Total</h2>
            <Info className="text-primary" size={20} />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Indicações</p>
              <p className="text-lg font-bold">{resumo.total.indicacoes}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Ind. Válidas</p>
              <p className="text-lg font-bold">{resumo.total.indValidas}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Comissões</p>
              <p className="text-lg font-bold text-success">R$ {resumo.total.comissoes}</p>
            </div>
          </div>
          
          {/* Botão para exibir/ocultar informações por nível */}
          <button 
            onClick={() => setMostrarNiveis(!mostrarNiveis)}
            className="w-full py-2 px-4 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors flex items-center justify-center"
          >
            <span>{mostrarNiveis ? 'Ocultar informações por nível' : 'Exibir informações por nível'}</span>
            {mostrarNiveis ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
          </button>
        </div>
        
        {/* Cards de Nível */}
        {mostrarNiveis && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <NivelCard 
              titulo="Nível 1" 
              indicacoes={resumo.nivel1.indicacoes} 
              indValidas={resumo.nivel1.indValidas} 
              comissoes={resumo.nivel1.comissoes} 
            />
            <NivelCard 
              titulo="Nível 2" 
              indicacoes={resumo.nivel2.indicacoes} 
              indValidas={resumo.nivel2.indValidas} 
              comissoes={resumo.nivel2.comissoes} 
            />
            <NivelCard 
              titulo="Nível 3" 
              indicacoes={resumo.nivel3.indicacoes} 
              indValidas={resumo.nivel3.indValidas} 
              comissoes={resumo.nivel3.comissoes} 
            />
            <NivelCard 
              titulo="Nível 4" 
              indicacoes={resumo.nivel4.indicacoes} 
              indValidas={resumo.nivel4.indValidas} 
              comissoes={resumo.nivel4.comissoes} 
            />
            <NivelCard 
              titulo="Nível 5" 
              indicacoes={resumo.nivel5.indicacoes} 
              indValidas={resumo.nivel5.indValidas} 
              comissoes={resumo.nivel5.comissoes} 
            />
          </div>
        )}
      </div>
      
      {/* Seção de Lista de Afiliados */}
      <div className="border-2 border-primary/30 bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <Users className="text-primary mr-2" size={24} />
            <h2 className="text-xl font-medium">Lista de Afiliados</h2>
          </div>
          
          {/* Seletor de Nível (Dropdown) */}
          <div className="w-full md:w-auto">
            <select 
              className="w-full md:w-auto bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary"
              value={nivelFiltro}
              onChange={(e) => setNivelFiltro(e.target.value)}
            >
              <option value="total">Todos os Níveis</option>
              <option value="nivel1">Nível 1</option>
              <option value="nivel2">Nível 2</option>
              <option value="nivel3">Nível 3</option>
              <option value="nivel4">Nível 4</option>
              <option value="nivel5">Nível 5</option>
            </select>
          </div>
        </div>
        
        {/* Campo de Pesquisa */}
        <div className="relative w-full mb-6">
          <input 
            type="text" 
            placeholder="Buscar por ID ou nome" 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 pr-10 text-sm focus:outline-none focus:border-primary"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary rounded-lg p-2">
            <Search className="text-darker" size={16} />
          </div>
        </div>
        
        <div className="text-sm text-gray-400 mb-4">
          Exibindo <span className="font-medium text-white">{dadosPaginados.length}</span> de <span className="font-medium text-white">{dadosFiltrados.length}</span> afiliados
        </div>
        
        {/* Tabela Desktop */}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center justify-center w-full"
                    onClick={() => alternarOrdenacao('id')}
                  >
                    ID Afiliado
                    <span className="ml-1">
                      {ordenacao.campo === 'id' ? (
                        ordenacao.direcao === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center justify-center w-full"
                    onClick={() => alternarOrdenacao('nome')}
                  >
                    Nome Afiliado
                    <span className="ml-1">
                      {ordenacao.campo === 'nome' ? (
                        ordenacao.direcao === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center justify-center w-full"
                    onClick={() => alternarOrdenacao('nivel')}
                  >
                    Nível
                    <span className="ml-1">
                      {ordenacao.campo === 'nivel' ? (
                        ordenacao.direcao === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center justify-center w-full"
                    onClick={() => alternarOrdenacao('indValidas')}
                  >
                    Ind. Válidas
                    <span className="ml-1">
                      {ordenacao.campo === 'indValidas' ? (
                        ordenacao.direcao === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center justify-center w-full"
                    onClick={() => alternarOrdenacao('valorDepositado')}
                  >
                    Valor Depositado
                    <span className="ml-1">
                      {ordenacao.campo === 'valorDepositado' ? (
                        ordenacao.direcao === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center justify-center w-full"
                    onClick={() => alternarOrdenacao('comissao')}
                  >
                    Comissão
                    <span className="ml-1 text-primary">
                      {ordenacao.campo === 'comissao' ? (
                        ordenacao.direcao === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {dadosPaginados.map((afiliado, index) => (
                <tr 
                  key={afiliado.id} 
                  className={`${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-900/50'} border-b border-gray-800 hover:bg-primary/10`}
                >
                  <td className="py-4 text-sm text-center border-r border-gray-800/50">{afiliado.id}</td>
                  <td className="py-4 text-sm text-center border-r border-gray-800/50">{afiliado.nome}</td>
                  <td className="py-4 text-sm text-center border-r border-gray-800/50">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                      Nível {afiliado.nivel}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-center border-r border-gray-800/50">{afiliado.indValidas}</td>
                  <td className="py-4 text-sm text-center border-r border-gray-800/50">{afiliado.valorDepositado}</td>
                  <td className="py-4 text-sm text-center text-success">{afiliado.comissao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Cards Mobile */}
        <div className="md:hidden space-y-4">
          {dadosPaginados.map((afiliado) => (
            <div key={afiliado.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              {/* Primeira linha: Nome e Comissão */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-base">{afiliado.nome}</h3>
                <p className="text-success text-xl font-semibold">{afiliado.comissao}</p>
              </div>
              
              {/* Segunda linha: ID, Nível e Indicações */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="text-gray-400">{afiliado.id}</span>
                  <span className="mx-2 text-gray-600">|</span>
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                    Nível {afiliado.nivel}
                  </span>
                </div>
                <span className="text-gray-400">{afiliado.indValidas} indicações válidas</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Paginação */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-1">
            <button 
              className={`w-10 h-10 flex items-center justify-center rounded-full ${paginaAtual > 1 ? 'bg-gray-800 text-white cursor-pointer' : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'}`}
              onClick={() => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1)}
              disabled={paginaAtual <= 1}
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: Math.min(totalPaginas, 3) }).map((_, i) => {
              // Lógica para mostrar páginas ao redor da página atual
              let pageNum;
              if (totalPaginas <= 3) {
                pageNum = i + 1;
              } else if (paginaAtual <= 2) {
                pageNum = i + 1;
              } else if (paginaAtual >= totalPaginas - 1) {
                pageNum = totalPaginas - 2 + i;
              } else {
                pageNum = paginaAtual - 1 + i;
              }
              
              return (
                <button 
                  key={pageNum}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${pageNum === paginaAtual ? 'bg-primary text-darker font-medium' : 'bg-gray-800 text-white'}`}
                  onClick={() => setPaginaAtual(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className={`w-10 h-10 flex items-center justify-center rounded-full ${paginaAtual < totalPaginas ? 'bg-gray-800 text-white cursor-pointer' : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'}`}
              onClick={() => paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1)}
              disabled={paginaAtual >= totalPaginas}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Seletor de itens por página */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Itens por página:</span>
            <select 
              className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
              value={itensPorPagina}
              onChange={(e) => {
                setItensPorPagina(Number(e.target.value));
                setPaginaAtual(1); // Reset para primeira página ao mudar itens por página
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaAfiliados;
