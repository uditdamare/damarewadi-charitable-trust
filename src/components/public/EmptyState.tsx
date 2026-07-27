export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 px-6 py-16 text-center text-black/60 dark:border-white/15 dark:text-white/60">
      {message}
    </div>
  );
}
