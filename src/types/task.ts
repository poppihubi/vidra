// Mesmos 4 quadrantes de sempre, com outra roupagem: em vez de falar de
// "prioridade", o Painel de Energia fala de onde o combustível do dia está
// indo. Usado só pela EnergyDashboardScreen — a Matriz "clássica" continua
// usando QUADRANT_LABELS.
export const ENERGY_ZONE_LABELS: Record
  Quadrant,
  { emoji: string; title: string; description: string }
> = {
  'important-not-urgent': {
    emoji: '⚡',
    title: 'Zona de Poder',
    description: 'O que constrói o seu futuro — negócio, treino, evolução pessoal.',
  },
  'urgent-important': {
    emoji: '🎯',
    title: 'Modo Foco',
    description: 'Os incêndios de agora. Resolve e libera espaço na mente.',
  },
  'urgent-not-important': {
    emoji: '⏳',
    title: 'Zona de Distração',
    description: 'Tarefas chatas que roubam tempo. Resolve rápido, sem enrolação.',
  },
  neither: {
    emoji: '🗑',
    title: 'Lixeira do Dia',
    description: 'Só rouba tempo e energia. Deslize pra remover.',
  },
};