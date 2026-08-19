export type Quadrant =
  | 'urgent-important' // Fazer agora
  | 'important-not-urgent' // Planejar
  | 'urgent-not-important' // Delegar
  | 'neither'; // Eliminar

export interface Task {
  id: string;
  title: string;
  description?: string;
  quadrant: Quadrant;
  completed: boolean;
  createdAt: string; // ISO date
  completedAt?: string; // ISO date
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
