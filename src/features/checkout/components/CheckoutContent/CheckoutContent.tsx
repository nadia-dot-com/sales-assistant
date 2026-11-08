"use client";

import { Flex } from "@chakra-ui/react";
import type { Address } from "@commercetools/platform-sdk";
import { notFound } from "next/navigation";
import { useState } from "react";
import type { SessionUser } from "@/features/auth/types/auth.types";
import { useCartContext } from "@/features/cart/context/CartContext";
import { styles } from "@/features/checkout/components/CheckoutContent/CheckoutContent.styles";
import { CheckoutError } from "@/features/checkout/components/CheckoutError/CheckoutError";
import { CheckoutSteps } from "@/features/checkout/components/CheckoutSteps/CheckoutSteps";
import { CheckoutSuccess } from "@/features/checkout/components/CheckoutSuccess/CheckoutSuccess";
import { OrderStatus } from "@/features/checkout/types/orderStatus.types";
import type { CheckoutType } from "@/sanity/types/checkout.types";

const TAG = "CheckoutContent";

interface CheckoutContentProps {
  user: SessionUser;
  addressVersion: number;
  initialAddress: Address | undefined;
  checkoutContent: CheckoutType;
}

export function CheckoutContent({
  user,
  addressVersion,
  initialAddress,
  checkoutContent,
}: CheckoutContentProps) {
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.Idle);
  const { cartItems } = useCartContext();

  if (cartItems.length === 0 && status === OrderStatus.Idle) {
    notFound();
  }

  return (
    <Flex {...styles.content} data-testid={TAG}>
      {status !== OrderStatus.Idle ? (
        status === OrderStatus.Success ? (
          <CheckoutSuccess animation={checkoutContent.checkoutSuccess} />
        ) : (
          <CheckoutError animation={checkoutContent.checkoutError} />
        )
      ) : (
        <CheckoutSteps
          user={user}
          addressVersion={addressVersion}
          initialAddress={initialAddress}
          onOrderComplete={setStatus}
        />
      )}
    </Flex>
  );
}
