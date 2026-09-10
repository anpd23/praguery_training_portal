import { db } from "@/lib/offline/db";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { SyncQueueItem } from "@/types/academy";

export async function enqueue(kind: SyncQueueItem["kind"], payload: unknown) {
  const item: SyncQueueItem = {
    id: crypto.randomUUID(),
    kind,
    payload,
    createdAt: new Date().toISOString(),
  };
  await db.syncQueue.add(item);
  void flushSyncQueue();
  return item.id;
}

export async function flushSyncQueue() {
  if (!navigator.onLine) return { flushed: 0, remaining: await db.syncQueue.count() };
  const pending = await db.syncQueue.orderBy("createdAt").toArray();
  if (!isSupabaseConfigured()) {
    return { flushed: 0, remaining: pending.length, demo: true as const };
  }

  const supabase = createClient();
  if (!supabase) return { flushed: 0, remaining: pending.length };

  let flushed = 0;
  for (const item of pending) {
    try {
      await pushItem(supabase, item);
      await db.syncQueue.delete(item.id);
      flushed += 1;
    } catch (error) {
      await db.syncQueue.update(item.id, {
        lastError: error instanceof Error ? error.message : "Sync failed",
      });
      break;
    }
  }
  return { flushed, remaining: await db.syncQueue.count() };
}

async function pushItem(
  supabase: NonNullable<ReturnType<typeof createClient>>,
  item: SyncQueueItem,
) {
  const table =
    item.kind === "module_progress"
      ? "module_progress"
      : item.kind === "quiz_attempt"
        ? "quiz_attempts"
        : item.kind === "checklist_run"
          ? "checklist_runs"
          : item.kind === "certification"
            ? "certifications"
            : null;

  if (!table) return;
  const { error } = await supabase.from(table).upsert(item.payload as Record<string, unknown>);
  if (error) throw error;
}

export async function pendingCount() {
  return db.syncQueue.count();
}
