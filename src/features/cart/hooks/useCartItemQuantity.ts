"use client";

import type { NumberInputValueChangeDetails } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MIN_QUANTITY } from "@/config/constants";
import { useCartContext } from "@/features/cart/context/CartContext";
import { defineMaxStock } from "@/features/product/utils/defineMaxStock";

interface UseCartItemQuantityParams {
  lineItemId: string;
  quantity: number;
  isOnStock: boolean;
  lowStock: boolean;
}

export function useCartItemQuantity({
  lineItemId,
  quantity,
  isOnStock,
  lowStock,
}: UseCartItemQuantityParams) {
  const { updateQuantity, removeFromCart, isPending } = useCartContext();
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [draftQuantity, setDraftQuantity] = useState(quantity);

  useEffect(() => {
    if (!isPending) {
      setIsUpdatingQuantity(false);
      setIsRemoving(false);
      setDraftQuantity(quantity);
    }
  }, [isPending, quantity]);

  const maxStock = defineMaxStock(isOnStock, lowStock);
  const isAtMaxQuantity = quantity >= maxStock;

  const commitQuantity = (nextValue: number) => {
    const clampedQuantity = Math.min(
      Math.max(nextValue, MIN_QUANTITY),
      maxStock,
    );
    setDraftQuantity(clampedQuantity);
    setIsUpdatingQuantity(true);
    updateQuantity(lineItemId, clampedQuantity);
  };

  const handleQuantityChange = ({
    valueAsNumber,
  }: NumberInputValueChangeDetails) => {
    setDraftQuantity(valueAsNumber);
  };

  const handleCommitQuantity = ({
    valueAsNumber,
  }: NumberInputValueChangeDetails) => {
    commitQuantity(valueAsNumber);
  };

  const handleRemoveFromCart = () => {
    setIsRemoving(true);
    removeFromCart(lineItemId);
  };

  return {
    draftQuantity,
    isUpdatingQuantity,
    isRemoving,
    isAtMaxQuantity,
    handleQuantityChange,
    handleCommitQuantity,
    handleRemoveFromCart,
  };
}
