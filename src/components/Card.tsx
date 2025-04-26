
import { Card as CardType } from "@/types/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CardProps {
  card: CardType;
}

export const Card = ({ card }: CardProps) => {
  const [showCardNumber, setShowCardNumber] = useState(false);

  const maskCardNumber = (number: string) => {
    const groups = number.split(' ');
    return groups.map((group, index) => 
      index === groups.length - 1 ? group : '**** '
    ).join('');
  };

  const toggleCardNumber = () => {
    setShowCardNumber(!showCardNumber);
  };

  return (
    <div>
      <div 
        onClick={toggleCardNumber}
        className="mb-2 flex justify-end items-center gap-2 cursor-pointer text-aspire-green"
      >
        <span className="text-sm">
          {showCardNumber ? <div>Hide card number</div> : <div className="flex gap-1"> 
          <div>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        </div> 
        <div className="">Show card number</div></div>}
        </span>
      </div>
      <div 
        className={cn(
          "relative w-full aspect-[1.586/1] rounded-xl p-6 transition-all duration-300",
          "bg-aspire-green text-white",
          card.isFrozen && "opacity-60"
        )}
      >
        <div className="absolute top-6 right-6 p-2" style={{backgroundColor: 'white', borderRadius: '20px'}}>
          <img src="https://lsvp.com/wp-content/uploads/2023/03/Aspire.png" alt="Aspire Logo" className="h-8" />
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold">{card.name}</h2>
        </div>
        
        <div className="mt-8">
          <div className="flex gap-4 text-xl tracking-wider">
            {(showCardNumber ? card.number : maskCardNumber(card.number))
              .split(' ')
              .map((group, idx) => (
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
          <img src="https://i0.wp.com/americassbdc.org/wp-content/uploads/2021/05/Visa-logo-white.png" alt="Visa" className="h-6" />
        </div>
      </div>
    </div>
  );
};
