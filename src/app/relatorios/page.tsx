"use client";

import React, { useState } from 'react';
import { SlidersHorizontal, Download, Award } from 'lucide-react'; // Added Award

// --- Placeholder Data (Includes Category/Level) ---
// NOTE: Actual data fetching needs to provide category and level for indicated users/affiliates
const reportData = [
  {
    id: 'r1',
    date: '02/05/2025',
    type: 'Indicação',
    level: 1,
    indicated: 'João S.',
    indicatedCategory: 'Jogador', // Added
    indicatedLevel: 1, // Added
    deposit: 'R$ 0,00',
    withdrawal: 'R$ 0,00',
    cpa: 'R$ 0,00',
    ngr: 'R$ 0,00',
    value: '---',
    status: 'Validada'
  },
  {
    id: 'r2',
    date: '01/05/2025',
    type: 'Comissão RevShare',
    level: 1,
    indicated: 'Maria L.',
    indicatedCategory: 'Iniciante', // Added
    indicatedLevel: 2, // Added
    deposit: 'R$ 50,00',
    withdrawal: 'R$ 10,00',
    cpa: 'R$ 0,00',
    ngr: 'R$ 15.75', // Example NGR
    value: '+ R$ 1.58', // Example RevShare (10% of NGR for Iniciante Level 2)
    status: 'Paga'
  },
  {
    id: 'r3',
    date: '01/05/2025',
    type: 'Comissão CPA',
    level: 1,
    indicated: 'Maria L.',
    indicatedCategory: 'Iniciante', // Added
    indicatedLevel: 2, // Added
    deposit: 'R$ 50,00',
    withdrawal: 'R$ 10,00',
    cpa: 'R$ 35,00', // Correct CPA Nivel 1 value
    ngr: 'R$ 0,00',
    value: '+ R$ 35,00',
    status: 'Paga'
  },
  {
    id: 'r4',
    date: '30/04/2025',
    type: 'Bônus Sequência',
    level: null,
    indicated: null,
    indicatedCategory: null,
    indicatedLevel: null,
    deposit: null,
    withdrawal: null,
    cpa: null,
    ngr: null,
    value: '+ R$ 15,00', // Example Day 3 bonus
    status: 'Paga'
  },
  {
    id: 'r5',
    date: '29/04/2025',
    type: 'Indicação',
    level: 1,
    indicated: 'Pedro A.',
    indicatedCategory: 'Jogador',
    indicatedLevel: 1,
    deposit: 'R$ 0,00',
    withdrawal: 'R$ 0,00',
    cpa: 'R$ 0,00',
    ngr: 'R$ 0,00',
    value: '---',
    status: 'Pendente'
  },
];
// --- End Placeholder Data ---

const RelatoriosPage = () => {
  const [isDetailedView, setIsDetailedView] = useState(false);
  // TODO: Add state for filters (date range, type, level, category) and pagination

  const simplifiedColumns = ['Data', 'Tipo', 'Valor', 'Status'];
  // Added 'Categoria (Level)' to detailed view
  const detailedColumns = ['Data', 'Tipo', 'Nível Rede', 'Indicado', 'Categoria (Level)', 'Depósito', 'Saque', 'CPA', 'NGR', 'Valor', 'Status'];

  const columns = isDetailedView ? detailedColumns : simplifiedColumns;

  // TODO: Implement filtering logic based on state
  const filteredData = reportData;

  // TODO: Implement pagination logic
  const paginatedData = filteredData;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Relatórios</h1>

      {/* Filters and Controls */}
      <div className="bg-card p-4 rounded-lg shadow flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Date Range Picker Placeholder */}
          <div>
            <label htmlFor="date-range" className="text-sm text-text-secondary mr-2">Período:</label>
            <input type="text" id="date-range" placeholder="dd/mm/aa - dd/mm/aa" className="bg-border p-2 rounded text-sm w-40 text-white focus:ring-primary focus:outline-none" />
          </div>
          {/* TODO: Add more filters (Tipo, Nível Rede, Categoria) */}
          {/* Example Type Filter */}
          {/* <div>
            <label htmlFor="filter-type" className="text-sm text-text-secondary mr-2">Tipo:</label>
            <select id="filter-type" className="bg-border p-2 rounded text-sm text-white focus:ring-primary focus:outline-none">
              <option value="all">Todos</option>
              <option value="indicacao">Indicação</option>
              <option value="cpa">Comissão CPA</option>
              <option value="revshare">Comissão RevShare</option>
              <option value="bonus">Bônus</option>
            </select>
          </div> */}
          <button className="bg-primary text-black px-4 py-2 rounded text-sm font-semibold hover:bg-primary/90">
            Aplicar Filtro
          </button>
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center text-sm text-primary hover:underline">
             <Download size={16} className="mr-1" />
             Exportar CSV
           </button>
           <label htmlFor="detailed-view-toggle" className="flex items-center cursor-pointer text-sm text-text-secondary">
             <span className="mr-2">Visão Detalhada</span>
             <div className="relative">
               <input
                 type="checkbox"
                 id="detailed-view-toggle"
                 className="sr-only"
                 checked={isDetailedView}
                 onChange={() => setIsDetailedView(!isDetailedView)}
               />
               <div className={`block w-10 h-5 rounded-full ${isDetailedView ? 'bg-primary' : 'bg-border'}`}></div>
               <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${isDetailedView ? 'transform translate-x-5' : ''}`}></div>
             </div>
           </label>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-card rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs text-text-secondary uppercase bg-border/50">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-6 py-3 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-text-secondary">
                  Nenhum registro encontrado para os filtros selecionados.
                </td>
              </tr>
            )}
            {paginatedData.map((row) => (
              <tr key={row.id} className="bg-card border-b border-border hover:bg-border/30">
                {/* Simplified View Columns */}
                {!isDetailedView && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${row.value.startsWith('+') ? 'text-positive' : row.value.startsWith('-') ? 'text-negative' : 'text-white'}`}>{row.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${row.status === 'Paga' || row.status === 'Validada' ? 'bg-green-900 text-green-300' : row.status === 'Pendente' ? 'bg-yellow-900 text-yellow-300' : 'bg-gray-700 text-gray-300'}`}>
                        {row.status}
                      </span>
                    </td>
                  </>
                )}
                {/* Detailed View Columns */}
                {isDetailedView && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{row.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{row.level ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.indicated ?? 'N/A'}</td>
                    {/* Display Category (Level) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.indicatedCategory ? (
                        <span className="flex items-center">
                          <Award size={14} className="mr-1 text-yellow-400 flex-shrink-0"/>
                          {row.indicatedCategory} (Lvl {row.indicatedLevel})
                        </span>
                      ) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.deposit ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.withdrawal ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.cpa ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.ngr ?? 'N/A'}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${row.value.startsWith('+') ? 'text-positive' : row.value.startsWith('-') ? 'text-negative' : 'text-white'}`}>{row.value}</td>
                     <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${row.status === 'Paga' || row.status === 'Validada' ? 'bg-green-900 text-green-300' : row.status === 'Pendente' ? 'bg-yellow-900 text-yellow-300' : 'bg-gray-700 text-gray-300'}`}>
                        {row.status}
                      </span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-center items-center text-sm text-text-secondary">
        {/* TODO: Replace with actual pagination component */}
        <span>Página 1 de 1</span>
        {/* <button className="ml-4 px-3 py-1 border border-border rounded hover:bg-border">Anterior</button>
        <button className="ml-2 px-3 py-1 border border-border rounded hover:bg-border">Próxima</button> */} 
      </div>
    </div>
  );
};

export default RelatoriosPage;

