import { Youtube, Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Little Beast M Training. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://youtube.com/@littlebeastm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,107,53,0.8)]"
            >
              <Youtube size={24} />
            </a>
            <a
              href="https://instagram.com/littlebeastm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,107,53,0.8)]"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://t.me/+L6JWeG5YwglmNzY0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,107,53,0.8)]"
            >
              <Send size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
