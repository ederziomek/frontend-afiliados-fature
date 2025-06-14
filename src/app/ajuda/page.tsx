
"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Info, Award, TrendingDown, Target, Gift, Users, BarChartHorizontal, DollarSign, CalendarDays, CheckCircle, QrCode, FileType, Share2, AlertTriangle, Clock, Percent } from 'lucide-react'; // Added more icons
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- Updated FAQ data based on v3.0 Documentation ---
const faqData = [
  // --- General & Onboarding ---
  {
    id: 'como-funciona',
    question: "Como funciona o sistema de afiliados Fature100x v3.0?",
    answer: "O Fature100x permite que você ganhe comissões indicando novos jogadores para a UPBET usando seu link exclusivo. As comissões são baseadas principalmente em Revenue Share (RevShare), uma porcentagem da receita gerada pelos seus indicados, definida pela sua Categoria e Level. Você também ganha por indicações indiretas (Nível 2+) e através de bônus como Sequência Diária, Baús e Rankings."
  },
  {
    id: 'validacao-cpa',
    question: "O que é uma 'Indicação Validada'?",
    answer: "Uma indicação é considerada 'validada' quando o novo jogador indicado por você se cadastra e realiza um primeiro depósito mínimo de R$ 30,00. Somente indicações validadas contam para subir de Level, progredir nos Baús de Indicação Direta e para a Sequência Diária."
  },
  // --- Categories & Levels ---
  {
    id: 'categorias-levels',
    question: "O que são Categorias e Levels?",
    answer: "As Categorias (Jogador, Iniciante, Regular, Profissional, etc.) definem sua porcentagem base de comissão RevShare. Dentro de cada Categoria, existem Levels (1 a 10). Você sobe de Level ao atingir metas de indicações diretas validadas. Subir de Level dentro de uma Categoria aumenta ligeiramente sua comissão e concede uma recompensa em dinheiro (R$ 5,00 por indicação necessária para o Level). Subir de Categoria aumenta significativamente sua comissão base. Acompanhe seu progresso no Painel."
  },
  {
    id: 'recompensa-level',
    question: "Como funciona a recompensa por subir de Level?",
    answer: "Ao atingir as indicações diretas validadas necessárias para o próximo Level, você recebe uma recompensa em dinheiro. O valor é calculado como R$ 5,00 multiplicado pelo número de indicações que faltavam para completar aquele Level. Ex: Se faltavam 10 indicações para o Level 4, você ganha R$ 50,00 ao atingi-lo."
  },
  // --- Commissions & Wallet ---
  {
    id: 'comissoes-revshare',
    question: "Como funcionam as Comissões (RevShare)?",
    answer: "Sua comissão RevShare é uma porcentagem da receita líquida (GGR) gerada pelos seus indicados diretos. A porcentagem exata depende da sua Categoria e Level. As comissões são calculadas e acumuladas no 'Cofre de Comissões', que abre semanalmente, creditando o valor na sua Carteira."
  },
  {
    id: 'cofre-comissoes',
    question: "O que é o Cofre de Comissões?",
    answer: "É onde suas comissões RevShare semanais são acumuladas. Ele abre toda segunda-feira à meia-noite, creditando o valor total na sua Carteira. O valor exato só é revelado na abertura. Subir de Categoria e Level aumenta a porcentagem de comissão que entra no cofre."
  },
  {
    id: 'saques',
    question: "Quando e como posso sacar minhas comissões?",
    answer: "Após a abertura do Cofre, o saldo vai para sua 'Carteira'. Você pode solicitar saques (geralmente semanais) via PIX ou transferir como crédito para sua conta de jogador na UPBET. O valor mínimo para saque PIX é R$ 50,00. Não há mínimo para transferência para a UPBET."
  },
  {
    id: 'limite-nf',
    question: "Qual o limite de saque PIX e a regra da Nota Fiscal (NF)?",
    answer: "Você pode sacar até R$ 2.000,00 por mês via PIX sem necessidade de Nota Fiscal. Para saques PIX acima deste valor mensal, é obrigatório ter um CNPJ (MEI ou outro) cadastrado e emitir uma Nota Fiscal de Serviço correspondente ao valor do saque. Você precisará cadastrar os dados da sua empresa e seguir o processo de envio/validação da NF na plataforma para liberar saques acima do limite."
  },
  // --- Bonuses & Rewards ---
  {
    id: 'sequencia-diaria',
    question: "O que é a Sequência Diária?",
    answer: "É um bônus por atividade contínua. Faça pelo menos 1 indicação validada por dia para manter sua sequência. Cada dia da sequência concede uma recompensa crescente. Além disso, atingir marcos de dias consecutivos (3, 7, 14, 30 dias, etc.) concede recompensas maiores e cumulativas. Falhar um dia reinicia a sequência. Acompanhe no Painel e na página 'Sequência Diária'."
  },
  {
    id: 'baus',
    question: "O que são os Baús?",
    answer: "São recompensas extras por atingir metas. \n1. **Baú de Indicação Direta:** Ganhos por atingir marcos de número total de indicados diretos validados (ex: 10, 25, 50 indicados). \n2. **Baú de Indicação Indireta (Construtor):** Ganhos baseados na atividade da sua rede (Nível 1), como ter X indicados completando a sequência diária de 3 dias. Veja seu progresso no Painel e detalhes na página 'Baús'."
  },
  {
    id: 'rankings',
    question: "O que são os Rankings?",
    answer: "São competições semanais e mensais que premiam os melhores afiliados em três categorias: Indicações Diretas Válidas, Indicações Indiretas Válidas (Construtor) e Maior Sequência Diária. Os Top 10 de cada ranking (semanal e mensal) são exibidos. Os rankings mensais distribuem prêmios em dinheiro (um percentual do pool total). Acompanhe sua posição e os prêmios estimados na seção 'Rankings' do Painel."
  },
  // --- Network & Promotion ---
  {
    id: 'minha-rede',
    question: "Como acompanho minha rede de indicados?",
    answer: "A página 'Minha Rede' mostra uma visão geral (total, ativos, Nível 2+, comissões) e uma lista detalhada dos seus indicados, incluindo Nível, Categoria/Level e comissões geradas. Você pode filtrar por nível e visualizar a estrutura em árvore da sua rede."
  },
  {
    id: 'divulgacao',
    question: "Como posso divulgar meu link?",
    answer: "Use seu link exclusivo ou QR Code disponíveis no Painel. Na página 'Divulgação', você encontra a Biblioteca de Materiais com banners, vídeos e textos (com filtros por tipo, tema, formato) e botões de compartilhamento rápido para redes sociais (WhatsApp, Facebook, X, Telegram, etc.)."
  },
  // --- Inactivity ---
  {
    id: 'inatividade',
    question: "O que acontece se eu ficar inativo?",
    answer: "Você é considerado inativo se passar 30 dias sem nenhuma indicação direta validada. A inatividade causa uma redução progressiva nas suas comissões RevShare (25% a cada 30 dias de inatividade, até 100%). Você receberá alertas antes de se tornar inativo e sobre as reduções. Veja seu status no Painel."
  },
  {
    id: 'reativacao',
    question: "Como posso reativar minhas comissões após ficar inativo?",
    answer: "Para reativar 100% das suas comissões RevShare, você precisa fazer um número específico de indicações diretas validadas (geralmente 10, mas confira no Painel). Seu progresso para a meta de reativação é exibido no card de Status de Atividade no Painel."
  },
  // --- Other ---
  {
    id: 'atualizacao-dados',
    question: "Por que os dados do painel não atualizam instantaneamente?",
    answer: "O processamento de dados, validações e cálculos de comissões pode levar algum tempo. As informações no painel são atualizadas periodicamente (geralmente a cada hora) e podem não refletir imediatamente as atividades mais recentes."
  }
];

// --- Glossary Data ---
const glossaryData = [
  { term: "Afiliado", definition: "Pessoa que se cadastra no programa Fature100x para indicar jogadores à UPBET e ganhar comissões." },
  { term: "Link de Indicação", definition: "Seu link exclusivo para compartilhar. Cadastros feitos através dele são atribuídos a você." },
  { term: "QR Code", definition: "Código escaneável que direciona para seu link de indicação." },
  { term: "Indicação Direta", definition: "Jogador que se cadastrou diretamente através do seu link (Nível 1 da sua rede)." },
  { term: "Indicação Indireta", definition: "Jogador que se cadastrou através do link de um dos seus indicados diretos (Nível 2 ou mais da sua rede)." },
  { term: "Indicação Validada", definition: "Indicação direta que cumpriu o requisito mínimo (cadastro + depósito inicial de R$ 30,00)." },
  { term: "CPA (Custo por Aquisição)", definition: "Modelo de comissão onde você recebe um valor fixo por cada indicação validada (menos comum na v3.0)." },
  { term: "RevShare (Revenue Share)", definition: "Modelo de comissão onde você recebe uma porcentagem da receita líquida (GGR) gerada pelos seus indicados. Principal modelo da v3.0." },
  { term: "GGR (Gross Gaming Revenue)", definition: "Receita bruta gerada pelos jogadores (apostas - prêmios pagos). Base para cálculo do RevShare." },
  { term: "Categoria", definition: "Nível principal do afiliado (Jogador, Iniciante, etc.), que define a porcentagem base de RevShare." },
  { term: "Level", definition: "Subnível dentro de uma Categoria (1 a 10), alcançado por indicações diretas validadas. Aumenta ligeiramente o RevShare e concede bônus." },
  { term: "Cofre de Comissões", definition: "Local onde as comissões RevShare são acumuladas semanalmente antes de serem creditadas na Carteira." },
  { term: "Carteira", definition: "Seu saldo disponível para saque ou transferência para a conta de jogador UPBET." },
  { term: "Sequência Diária", definition: "Bônus por fazer indicações validadas consecutivamente a cada dia." },
  { term: "Baú de Indicação Direta", definition: "Recompensa por atingir marcos de número total de indicações diretas validadas." },
  { term: "Baú de Indicação Indireta (Construtor)", definition: "Recompensa baseada na atividade da sua rede (Nível 1), como X indicados completando sequências." },
  { term: "Ranking", definition: "Competição semanal/mensal baseada em performance (Indicações Diretas, Indiretas, Sequência)." },
  { term: "Inatividade", definition: "Status do afiliado que passa 30 dias sem indicações diretas validadas, resultando em redução de comissão." },
  { term: "Reativação", definition: "Processo de fazer um número específico de indicações diretas validadas para restaurar 100% das comissões após inatividade." },
  { term: "Nota Fiscal (NF)", definition: "Documento fiscal exigido para saques PIX acima de R$ 2.000,00/mês." },
];

const AjudaPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [openGlossaryIndex, setOpenGlossaryIndex] = useState<number | null>(null);

  const toggleFaqAccordion = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleGlossaryAccordion = (index: number) => {
    setOpenGlossaryIndex(openGlossaryIndex === index ? null : index);
  };

  // Placeholder function for contacting support
  const handleContactSupport = () => {
    alert("Redirecionando para o suporte ao cliente...");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-white flex items-center">
        <HelpCircle size={24} className="mr-3 text-primary" />
        Ajuda, FAQ & Glossário
      </h1>

      {/* --- Inactivity Rules Section --- */}
      <Card className="bg-card border-border border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <AlertTriangle size={20} className="mr-2 text-orange-500" />
            Regras de Inatividade e Redução de Comissões
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Entenda como funciona o sistema de redução de comissões por inatividade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* How it works */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Como funciona a inatividade?</h3>
                <p className="text-sm text-text-secondary mb-3">
                  O período para considerar um afiliado inativo pode variar conforme sua categoria, 
                  mas geralmente é configurado entre 7 a 90 dias sem indicações validadas. 
                  Após esse período, suas comissões serão reduzidas progressivamente.
                </p>
                <div className="bg-orange-900/20 rounded-lg p-3 mt-3">
                  <p className="text-xs text-orange-300">
                    <strong>Nota:</strong> O período exato de inatividade é configurado pelos administradores 
                    e pode ser diferente para cada categoria de afiliado. Consulte seu painel para ver 
                    as regras específicas da sua categoria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reduction Schedule */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Percent size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-3">Cronograma de Reduções (Exemplo)</h3>
                <p className="text-xs text-gray-400 mb-3">
                  *Este é um exemplo baseado em configurações padrão. As regras específicas da sua categoria 
                  podem ser diferentes e são configuráveis pelos administradores.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-2 text-sm font-medium text-gray-400 mb-2 pb-2 border-b border-gray-700">
                    <span>Período de Inatividade</span>
                    <span className="text-right">Redução de Comissão</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-700/50">
                    <span className="text-text-secondary">Até período configurado</span>
                    <span className="text-green-500 font-medium">0% (Normal)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-700/50">
                    <span className="text-text-secondary">1º intervalo</span>
                    <span className="text-yellow-500 font-medium">-5%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-700/50">
                    <span className="text-text-secondary">2º intervalo</span>
                    <span className="text-yellow-600 font-medium">-10%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-700/50">
                    <span className="text-text-secondary">3º intervalo</span>
                    <span className="text-orange-500 font-medium">-20%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-700/50">
                    <span className="text-text-secondary">4º intervalo</span>
                    <span className="text-red-400 font-medium">-35%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-700/50">
                    <span className="text-text-secondary">5º intervalo</span>
                    <span className="text-red-500 font-medium">-50%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-700/50">
                    <span className="text-text-secondary">6º intervalo</span>
                    <span className="text-red-600 font-medium">-75%</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-text-secondary">Intervalo final</span>
                    <span className="text-red-700 font-medium">-100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reactivation System */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Target size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Sistema de Reativação de Comissões</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Afiliados inativos podem reativar suas comissões para 100% completando um desafio 
                  de reativação específico para sua categoria.
                </p>
                
                {/* Reactivation Requirements */}
                <div className="bg-green-900/20 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-medium text-green-300 mb-2">Requisitos por Categoria (Exemplo):</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Afiliados Iniciantes:</span>
                      <span className="text-green-400">2 indicações em 30 dias</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Afiliados Intermediários:</span>
                      <span className="text-green-400">3 indicações em 30 dias</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Afiliados Avançados:</span>
                      <span className="text-green-400">5 indicações em 45 dias</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Afiliados VIP:</span>
                      <span className="text-green-400">3 indicações em 30 dias</span>
                    </div>
                  </div>
                </div>

                {/* Reactivation Process */}
                <div className="bg-blue-900/20 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">Como Funciona o Processo:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• <strong className="text-white">Início:</strong> Afiliado inativo pode iniciar processo de reativação</li>
                    <li>• <strong className="text-white">Desafio:</strong> Completar número específico de indicações no prazo</li>
                    <li>• <strong className="text-white">Progresso:</strong> Acompanhe o progresso no painel principal</li>
                    <li>• <strong className="text-white">Reativação:</strong> Comissões voltam a 100% automaticamente</li>
                    <li>• <strong className="text-white">Tentativas:</strong> Número limitado de tentativas por categoria</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Informações Importantes</h3>
                <ul className="text-sm text-text-secondary space-y-2">
                  <li>• As reduções são aplicadas automaticamente nas suas comissões RevShare</li>
                  <li>• Você receberá notificações antes de se tornar inativo</li>
                  <li>• O período de inatividade é calculado a partir da sua última indicação validada</li>
                  <li>• As regras podem variar conforme sua categoria de afiliado</li>
                  <li>• Acompanhe seu status de atividade no painel principal</li>
                  <li>• Os períodos e valores de redução são configuráveis pelos administradores</li>
                  <li>• O sistema de reativação permite restaurar 100% das comissões</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- FAQ Section --- */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Perguntas Frequentes (FAQ)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {faqData.map((faq, index) => (
            <div key={faq.id || index} className="border-b border-border last:border-b-0">
              <button
                onClick={() => toggleFaqAccordion(index)}
                className="flex justify-between items-center w-full py-3 px-1 text-left focus:outline-none group"
                aria-expanded={openFaqIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <span className="text-base font-medium text-white group-hover:text-primary transition-colors">{faq.question}</span>
                {openFaqIndex === index ? (
                  <ChevronUp size={20} className="text-primary flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown size={20} className="text-text-secondary flex-shrink-0 ml-2" />
                )}
              </button>
              <div
                id={`faq-content-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="pb-3 pt-1 px-1 text-sm text-text-secondary prose prose-invert max-w-none">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* --- Glossary Section --- */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Glossário de Termos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {glossaryData.sort((a, b) => a.term.localeCompare(b.term)).map((item, index) => (
            <div key={item.term} className="border-b border-border last:border-b-0">
              <button
                onClick={() => toggleGlossaryAccordion(index)}
                className="flex justify-between items-center w-full py-3 px-1 text-left focus:outline-none group"
                aria-expanded={openGlossaryIndex === index}
                aria-controls={`glossary-content-${index}`}
              >
                <span className="text-base font-medium text-white group-hover:text-primary transition-colors">{item.term}</span>
                {openGlossaryIndex === index ? (
                  <ChevronUp size={20} className="text-primary flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown size={20} className="text-text-secondary flex-shrink-0 ml-2" />
                )}
              </button>
              <div
                id={`glossary-content-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openGlossaryIndex === index ? 'max-h-screen' : 'max-h-0'}`}
              >
                <div className="pb-3 pt-1 px-1 text-sm text-text-secondary prose prose-invert max-w-none">
                  <p>{item.definition}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* --- Contact Support Section --- */}
      <Card className="bg-card border-border">
          <CardContent className="pt-6 text-center">
              <p className="text-sm text-text-secondary mb-4">Não encontrou a resposta que procurava?</p>
              <Button onClick={handleContactSupport} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <MessageSquare size={18} className="mr-2" />
                  Falar com o Atendente
              </Button>
          </CardContent>
      </Card>
    </div>
  );
};

export default AjudaPage;

