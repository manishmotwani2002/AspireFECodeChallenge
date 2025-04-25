
import { Card as CardType } from "@/types/card";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  onFreeze: (id: string) => void;
}

export const Card = ({ card, onFreeze }: CardProps) => {
  return (
    <div 
      className={cn(
        "relative w-full max-w-[400px] aspect-[1.586/1] rounded-xl p-6 transition-all duration-300",
        "bg-aspire-green text-white",
        card.isFrozen && "opacity-60"
      )}
    >
      <div className="absolute top-6 right-6">
        <img src="" alt="Aspire Logo" className="h-8" />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold">{card.name}</h2>
      </div>
      
      <div className="mt-8">
        <div className="flex gap-4 text-xl tracking-wider">
          {card.number.split(' ').map((group, idx) => (
            <span key={idx}>{group}</span>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex gap-8">
        <div>
          <p className="text-sm opacity-80">Thru: {card.expiryDate}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">CVV: ***</p>
        </div>
      </div>
      
      <div className="absolute bottom-6 right-6">
        <img src="/visa.png" alt="Visa" className="h-6" />
      </div>
    </div>
  );
};
