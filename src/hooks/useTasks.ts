import React, { createContext, useContext, useMemo, useState } from 'react';
import { Task, Quadrant, TaskArea } from '../types/task';

// MVP: estado em memória, compartilhado via Context. Quando o backend
// (Supabase/Firebase) for definido, o provider passa a sincronizar com ele
// em vez de guardar tudo só em memória local.

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `task-${Date.now()}-${idCounter}`;
}

interface TasksContextValue {
  tasks: Task[];
  addTask: (title: string, quadrant: Quadrant, area?: TaskArea, description?: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  stats: {
    completedThisWeekCount: number;
    points: number;
    streakDays: number;
    level: number;
  };
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(
    title: string,
    quadrant: Quadrant,
    area: TaskArea = 'personal',
    description?: string,
  ) {
    const task: Task = {
      id: nextId(),
      title,
      description,
      quadrant,
      area,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : undefined,
            }
          : t,
      ),
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // Gamificação básica: pontos = tarefas concluídas, com peso maior pra
  // quadrante "urgente+importante" (mais valor por resolver o que importa).
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const completedThisWeek = tasks.filter(
      (t) => t.completed && t.completedAt && new Date(t.completedAt) >= weekAgo,
    );

    const pointsFor = (t: Task) => (t.quadrant === 'urgent-important' ? 15 : 10);
    const points = completedThisWeek.reduce((sum, t) => sum + pointsFor(t), 0);

    const daysActive = new Set(
      completedThisWeek.map((t) => (t.completedAt as string).slice(0, 10)),
    ).size;

    const level = Math.floor(points / 100) + 1;

    return {
      completedThisWeekCount: completedThisWeek.length,
      points,
      streakDays: daysActive,
      level,
    };
  }, [tasks]);

  const value: TasksContextValue = { tasks, addTask, toggleTask, removeTask, stats };

  return React.createElement(TasksContext.Provider, { value }, children);
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return ctx;
}
