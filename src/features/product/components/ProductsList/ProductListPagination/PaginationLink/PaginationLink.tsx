"use client";
import { Button, usePaginationContext } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/components/atoms/ButtonLink";
import { styles } from "@/features/product/components/ProductsList/ProductListPagination/PaginationLink/PaginationLink.styles";

interface PaginationLinkProps extends Omit<ButtonLinkProps, "href" | "page"> {
  page?: "prev" | "next" | number;
  onPageChange?: (page: number) => void;
}

export function PaginationLink({
  page,
  onPageChange,
  ...rest
}: PaginationLinkProps) {
  const pagination = usePaginationContext();
  const searchParams = useSearchParams();

  const pageValue =
    page === "prev"
      ? pagination.previousPage
      : page === "next"
        ? pagination.nextPage
        : page;

  const isDisabled = pageValue == null;
  const isActive = !isDisabled && pageValue === pagination.page;

  const buildPageHref = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    return `?${params.toString()}`;
  };

  if (onPageChange) {
    return (
      <Button
        {...styles.button}
        {...rest}
        disabled={isDisabled}
        aria-current={isActive ? "page" : undefined}
        onClick={() => !isDisabled && onPageChange(pageValue)}
      />
    );
  }

  return (
    <ButtonLink
      href={isDisabled ? "" : buildPageHref(pageValue)}
      disabled={isDisabled}
      aria-current={isActive ? "page" : undefined}
      {...styles.button}
      {...rest}
    />
  );
}
