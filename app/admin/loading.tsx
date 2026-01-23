export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
        <p className="mt-4 text-[var(--muted)]">Loading...</p>
      </div>
    </div>
  );
}
