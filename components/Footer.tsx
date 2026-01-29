import { Youtube, Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 md:py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-base md:text-lg text-muted-foreground">
            &copy; {new Date().getFullYear()} Little Beast M Training. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <a
              href="https://www.youtube.com/@littlebeastmtraining"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,107,53,0.8)] hover:scale-110"
            >
              <Youtube size={28} />
            </a>
            <a
              href="https://instagram.com/littlebeastm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,107,53,0.8)] hover:scale-110"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://t.me/+L6JWeG5YwglmNzY0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,107,53,0.8)] hover:scale-110"
            >
              <Send size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
