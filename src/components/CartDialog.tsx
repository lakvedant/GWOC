"use client";

import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { CartSlider } from './CartSlider';

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="sr-only">Shopping Cart</DialogTitle>
        <CartSlider onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}