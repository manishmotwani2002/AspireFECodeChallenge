
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { CreditCard, MessageSquare } from "lucide-react"
  
  export const CardDetailsAccordion = () => {
    const transactions = [
      {
        id: 1,
        merchant: "Hamleys",
        date: "20 May 2020",
        amount: "+ S$ 150",
        type: "Refund on debit card",
        icon: "shop",
        positive: true,
      },
      {
        id: 2,
        merchant: "Hamleys",
        date: "20 May 2020",
        amount: "- S$ 150",
        type: "Charged to debit card",
        icon: "flight",
        positive: false,
      },
      {
        id: 3,
        merchant: "Hamleys",
        date: "20 May 2020",
        amount: "- S$ 150",
        type: "Charged to debit card",
        icon: "megaphone",
        positive: false,
      },
      {
        id: 4,
        merchant: "Hamleys",
        date: "20 May 2020",
        amount: "- S$ 150",
        type: "Charged to debit card",
        icon: "shop",
        positive: false,
      },
    ];
  
    return (
      <div className="w-full max-w-[500px] bg-white rounded-lg">
        <Accordion type="single" collapsible className="w-full" defaultValue="recent-transactions">
          <AccordionItem value="card-details" className="border-none">
            <AccordionTrigger className="hover:no-underline p-4 bg-[#F5F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center text-[#325BAF]">
                  <CreditCard size={20} />
                </div>
                <span className="font-medium text-[#0C365A]">Card details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Card Number</span>
                  <span className="font-medium">4111 1111 1111 1111</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Expiry Date</span>
                  <span className="font-medium">12/25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">CVV</span>
                  <span className="font-medium">***</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="recent-transactions" className="border-none mt-4">
            <AccordionTrigger className="hover:no-underline p-4 bg-[#F5F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center text-[#325BAF]">
                  <MessageSquare size={20} />
                </div>
                <span className="font-medium text-[#0C365A]">Recent transactions</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-6">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 -mx-4 px-4 py-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.icon === 'flight' ? 'bg-[#E8FFF0]' :
                        transaction.icon === 'megaphone' ? 'bg-[#FFF0F0]' : 'bg-[#EDF3FF]'
                      }`}>
                        {transaction.icon === 'shop' && (
                          <img src="/lovable-uploads/e639e6b0-c5dc-40fe-a014-51a3836d7d05.png" alt="Shop" className="w-6 h-6" />
                        )}
                        {transaction.icon === 'flight' && (
                          <span className="text-2xl">✈️</span>
                        )}
                        {transaction.icon === 'megaphone' && (
                          <span className="text-2xl">📢</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.merchant}</h4>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-[#325BAF] flex items-center justify-center">
                            <CreditCard size={12} className="text-white" />
                          </div>
                          <span className="text-[#325BAF] text-sm">{transaction.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${transaction.positive ? 'text-[#01D167]' : ''}`}>
                        {transaction.amount}
                      </span>
                      <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-center py-4 text-[#01D167] hover:text-[#01D167]/90 transition-colors mt-4">
                View all card transactions
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };