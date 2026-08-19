# Vidra — Roadmap & Visão do Produto

## A tese

A maioria dos apps de produtividade separa "trabalho" de "vida pessoal" em
compartimentos diferentes — ou pior, só organiza o trabalho e deixa o resto
solto na cabeça da pessoa. Isso contribui pra um ciclo comum: a pessoa se
esgota, tira férias pra "descansar", e volta pro mesmo caos porque nunca
existiu uma visão única e priorizada de tudo que precisa ser feito — reunião
de trabalho, comprar um presente, jogar vôlei, tudo misturado na cabeça sem
estrutura.

Vidra existe pra resolver isso: uma lista única de tarefas onde cabe
qualquer coisa da vida, organizada pela mesma lente de prioridade, com
feedback de progresso que mantém a pessoa engajada — não só uma ferramenta
de produtividade, mas um produto com angle de saúde mental / otimização de
vida / equilíbrio.

## MVP (v1) — o que lança primeiro

1. **Lista única de tarefas** — sem separação forçada entre "trabalho" e
   "pessoal". Captura rápida (título, descrição opcional, prazo opcional).
2. **Matriz de Eisenhower** — cada tarefa é classificada em um dos 4
   quadrantes (urgente/importante, importante/não-urgente,
   urgente/não-importante, nem um nem outro), com uma view dedicada pra
   visualizar os 4 quadrantes.
3. **Gamificação — recap semanal** — toda semana, o app mostra um resumo do
   que foi resolvido: pontos/XP, streak de dias ativos, e algum tipo de
   nível ou conquista. O objetivo é reforçar o senso de progresso e criar
   hábito de retorno ao app.
4. **Plataforma** — Android primeiro (Google Play), depois iOS (Apple),
   a partir da mesma base de código (React Native + Expo).
5. **Preço de entrada** — venda única de baixo valor (~€5) via loja, pra
   maximizar a base de usuários inicial.

## v2 — Insights de equilíbrio de vida (feature premium)

- Depois que o usuário acumula ~1 semana ou mais de dados de uso, o app
  passa a mostrar insights tipo "você tem trabalhado mais essa semana —
  risco de burnout subindo" ou proporção trabalho vs. pessoal ao longo do
  tempo.
- Essa feature **não aparece no primeiro dia** — não há dados suficientes
  pra ser útil, e isso é proposital: é o gancho de retenção que leva o
  usuário a manter o app instalado por semanas.
- É a base de um **modelo de assinatura**: o app base (tarefas + matriz +
  gamificação) é a compra única de baixo valor; os insights de equilíbrio
  de vida ficam atrás de uma assinatura premium, desbloqueada depois do
  período inicial de uso. Isso dá um motivo real e sentido pro usuário
  pagar recorrência — o produto literalmente fica mais útil com o tempo de
  uso acumulado.

## v3+ — Integrações externas

- Conectar fontes externas de dados (ex: extrato bancário, receitas de
  farmácia, calendário) pra enriquecer o quadro de vida do usuário
  automaticamente. Não é prioridade agora — só faz sentido depois que o
  core (tarefas + insights) já estiver validado com usuários reais.

## Stack técnica

- **Frontend mobile**: React Native + Expo, TypeScript. Um código só gera
  build pra Android e iOS.
- **Backend/dados**: a definir quando o modelo de dados de tarefas estiver
  fechado — candidatos: Supabase (Postgres + Auth + Storage) ou Firebase
  (Firestore + Auth), ambos gerenciados/escaláveis sem precisar reescrever
  infraestrutura conforme a base de usuários cresce.
- **Monetização**: compra única (app pago, ~€5) + assinatura premium para
  os insights de equilíbrio de vida (v2).

## Por que essa ordem

O MVP é deliberadamente pequeno: tarefas + priorização + gamificação já é
um produto completo e vendável sozinho, sem depender de features que só
fazem sentido com histórico de uso. Isso permite lançar rápido, validar se
as pessoas realmente pagam e usam, e só então investir na parte mais
sofisticada (insights, assinatura, integrações) com base em dados reais em
vez de suposições.
