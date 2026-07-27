export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
      {message}
    </div>
  );
}
