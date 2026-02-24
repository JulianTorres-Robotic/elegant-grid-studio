import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeuCardProps {
  children: ReactNode;
  className?: string;
  pressed?: boolean;
  onClick?: () => void;
}

const NeuCard = ({ children, className, pressed, onClick }: NeuCardProps) => (
  <div
    onClick={onClick}
    className={cn(
      "neu-card p-6",
      pressed && "neu-pressed",
      onClick && "cursor-pointer",
      className
    )}
  >
    {children}
  </div>
);

export default NeuCard;
