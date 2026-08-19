# services

Aqui entra o cliente de backend quando o modelo de dados estiver definido
(candidatos: Supabase ou Firebase — ver ROADMAP.md). Por enquanto o app usa
apenas estado em memória (`src/hooks/useTasks.ts`), sem persistência real.

Quando conectar o backend:

- Criar `src/services/supabaseClient.ts` (ou `firebaseClient.ts`) com a
  inicialização do SDK e variáveis de ambiente via `expo-constants` / `.env`.
- Trocar o `useState` interno de `TasksProvider` por chamadas a esse client
  (fetch inicial + subscriptions/mutations), mantendo a mesma interface
  pública do hook (`tasks`, `addTask`, `toggleTask`, `removeTask`, `stats`)
  pra não precisar alterar as telas.
