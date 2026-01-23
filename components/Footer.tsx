export default function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--background)] py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[var(--muted)]">
            &copy; {new Date().getFullYear()} Little Beast M Training. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <a
              href="mailto:support@littlebeastmtraining.com"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
