
"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Info, Award, TrendingDown, Target, Gift, Users, BarChartHorizontal, DollarSign, CalendarDays, CheckCircle, QrCode, FileType, Share2 } from 'lucide-react'; // Added more icons
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

