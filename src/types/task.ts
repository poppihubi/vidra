export type Quadrant =
  | 'urgent-important' // Fazer agora
  | 'important-not-urgent' // Planejar
  | 'urgent-not-important' // Delegar
  | 'neither'; // Eliminar

// Área da vida: o Vidra junta trabalho e vida pessoal no mesmo lugar.
export type TaskArea = 'work' | 'personal';

export interface Task {
  id: string;
  title: string;
  description?: string;
  quadrant: Quadrant;
  area?: TaskArea; // tarefas antigas não têm; contam como 'personal'
  completed: boolean;
  createdAt: string; // ISO date
  completedAt?: string; // ISO date
}

export const AREA_LABELS: Record<TaskArea, string> = {
  work: 'Trabalho',
  personal: 'Vida pessoal',
};

export function areaOf(task: Task): TaskArea {
  return task.area ?? 'personal';
}

export const QUADRANT_LABELS: Record<Quadrant, { title: string; hint: string }> = {
  'urgent-important': { title: 'Urgente + Importante', hint: 'Fazer agora' },
  'important-not-urgent': { title: 'Importante, não urgente', hint: 'Planejar' },
  'urgent-not-important': { title: 'Urgente, não importante', hint: 'Delegar' },
  neither: { title: 'Nem urgente, nem importante', hint: 'Eliminar' },
};

export const QUADRANT_ORDER: Quadrant[] = [
  'urgent-important',
  'important-not-urgent',
  'urgent-not-important',
  'neither',
];

// Mesmos 4 quadrantes de sempre, com outra roupagem: em vez de falar de
// "prioridade", o Painel de Energia fala de onde o combustível do dia está
// indo. Usado só pela EnergyDashboardScreen — a Matriz "clássica" continua
// usando QUADRANT_LABELS.
export const ENERGY_ZONE_LABELS: Record<Quadrant, { emoji: string; title: string; description: string }> = {
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
