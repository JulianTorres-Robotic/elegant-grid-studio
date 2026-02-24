import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { X } from "lucide-react";

interface GlassOverlayProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  className?: string;
  title?: string;
}

const GlassOverlay = ({ children, open, onClose, side = "left", className, title }: GlassOverlayProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20" onClick={onClose} />

      {/* Panel */}
      <div
        className={cn(
          "relative glass-strong rounded-r-2xl w-80 max-w-[85vw] h-full flex flex-col overflow-y-auto",
          side === "left" ? "animate-slide-in-left" : "ml-auto animate-slide-in-right rounded-l-2xl rounded-r-none",
          className
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-border/30">
          {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
          <button
            onClick={onClose}
            className="neu-card-sm p-2 rounded-xl hover:neu-pressed transition-shadow ml-auto"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};

export default GlassOverlay;
