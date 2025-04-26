import React, { useState } from "react";
import { Card as CardType } from "@/types/card";
import { Card } from "./Card";
import { Button } from "@/components/ui/button";
import { AddCardModal } from "./AddCardModal";
import { generateRandomCardNumber, generateRandomExpiry, generateRandomCVV } from "@/utils/cardUtils";
import { Plus, CircleDot } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from "@/lib/utils";
import { CardDetailsAccordion } from "./CardDetailsAccordion";

const STORAGE_KEY = 'aspire-cards';

const initialCards: CardType[] = [
  {
    id: "1",
    name: "Mark Henry",
    number: "4111 1111 1111 1111",
    expiryDate: "12/25",
    cvv: "123",
    isFrozen: false,
  },
  {
    id: "2",
    name: "John Smith",
    number: "4532 7153 2845 9126",
    expiryDate: "09/26",
    cvv: "456",
    isFrozen: false,
  },
  {
    id: "3",
    name: "Sarah Wilson",
    number: "4916 3821 4573 9164",
    expiryDate: "03/27",
    cvv: "789",
    isFrozen: false,
  },
  {
    id: "4",
    name: "Emily Brown",
    number: "4024 0071 5336 8275",
    expiryDate: "06/26",
    cvv: "321",
    isFrozen: true,
  }
];

export const CardsPage = () => {
  const [cards, setCards] = useState<CardType[]>(() => {
    const storedCards = localStorage.getItem(STORAGE_KEY);
    return storedCards ? JSON.parse(storedCards) : initialCards;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("my-cards");
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddCard = (name: string) => {
    const newCard: CardType = {
      id: Date.now().toString(),
      name,
      number: generateRandomCardNumber(),
      expiryDate: generateRandomExpiry(),
      cvv: generateRandomCVV(),
      isFrozen: false,
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
  };

  const handleFreeze = (id: string) => {
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, isFrozen: !card.isFrozen } : card
    );
    setCards(updatedCards);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
  };

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      setSelectedIndex(index);
    }
  };

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Header with Balance and New Card Button */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-gray-600 text-lg">Available balance</h2>
              <div className="flex items-center gap-2">
                <div className="bg-aspire-green/20 p-2 rounded">
                  <span className="text-aspire-green font-bold">S$</span>
                </div>
                <span className="text-4xl font-bold">3,000</span>
              </div>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0247FF] hover:bg-[#0247FF]/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New card
            </Button>
          </div>

          {/* Cards Sections */}
          <Tabs defaultValue="my-cards" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="border-b w-full justify-start h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="my-cards"
                className="border-b-2 border-transparent data-[state=active]:border-aspire-green data-[state=active]:text-black rounded-none px-4 py-2"
              >
                My debit cards
              </TabsTrigger>
              <TabsTrigger 
                value="company-cards"
                className="border-b-2 border-transparent data-[state=active]:border-aspire-green data-[state=active]:text-black rounded-none px-4 py-2 text-gray-400"
              >
                All company cards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-cards" className="mt-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {cards.length > 0 && (
                  <div className="space-y-4">
                    <Carousel className="w-full max-w-[400px]" ref={emblaRef}>
                      <CarouselContent>
                        {cards.map((card) => (
                          <CarouselItem key={card.id}>
                            <Card card={card} onFreeze={handleFreeze} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>

                    <div className="flex justify-center gap-2">
                      {cards.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => scrollTo(index)}
                          className="p-1"
                        >
                          <CircleDot 
                            size={16}
                            className={cn(
                              "text-gray-300 transition-colors",
                              selectedIndex === index && "text-aspire-green"
                            )}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="mt-8 bg-white rounded-xl p-6">
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                        {/* Freeze Card */}
                        <button
                          onClick={() => {
                            if (emblaApi) {
                              const currentIndex = emblaApi?.selectedScrollSnap();
                              const currentCard = cards[currentIndex];
                              if (currentCard) {
                                handleFreeze(currentCard.id);
                              }
                            }
                          }}
                          className="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-aspire-lightBlue"
                        >
                          <div className="w-12 h-12 bg-[#325BAF] rounded-full flex items-center justify-center mb-2">
                            <span className="text-white text-xl">❄️</span>
                          </div>
                          <span className="text-sm text-gray-600 text-center">
                            {cards[emblaApi?.selectedScrollSnap()]?.isFrozen ? 'UnFreeze Card' : 'Freeze card'}
                          </span>
                        </button>

                        {/* Set Spend Limit */}
                        <button className="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-aspire-lightBlue">
                          <div className="w-12 h-12 bg-[#325BAF] rounded-full flex items-center justify-center mb-2">
                            <span className="text-white text-xl">⚡</span>
                          </div>
                          <span className="text-sm text-gray-600 text-center">
                            Set spend limit
                          </span>
                        </button>

                        {/* Add to GPay */}
                        <button className="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-aspire-lightBlue">
                          <div className="w-12 h-12 bg-[#325BAF] rounded-full flex items-center justify-center mb-2">
                            <img src="/lovable-uploads/ea30f325-400d-4dc2-a974-fa16a762d86a.png" alt="GPay" className="w-6 h-6" />
                          </div>
                          <span className="text-sm text-gray-600 text-center">
                            Add to GPay
                          </span>
                        </button>

                        {/* Replace Card */}
                        <button className="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-aspire-lightBlue">
                          <div className="w-12 h-12 bg-[#325BAF] rounded-full flex items-center justify-center mb-2">
                            <span className="text-white text-xl">🔄</span>
                          </div>
                          <span className="text-sm text-gray-600 text-center">
                            Replace card
                          </span>
                        </button>

                        {/* Cancel Card */}
                        <button className="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-aspire-lightBlue">
                          <div className="w-12 h-12 bg-[#325BAF] rounded-full flex items-center justify-center mb-2">
                            <span className="text-white text-xl">🗑️</span>
                          </div>
                          <span className="text-sm text-gray-600 text-center">
                            Cancel card
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Details Accordion */}
                <CardDetailsAccordion />
              </div>
            </TabsContent>

            <TabsContent value="company-cards" className="mt-6">
              <div className="text-center text-gray-500 py-8">
                No company cards available
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <AddCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddCard={handleAddCard}
        />
      </div>
    </div>
  );
};