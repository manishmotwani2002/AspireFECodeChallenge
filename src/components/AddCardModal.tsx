
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (name: string) => void;
}

export const AddCardModal = ({ isOpen, onClose, onAddCard }: AddCardModalProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddCard(name);
      setName("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Cardholder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Add Card
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
