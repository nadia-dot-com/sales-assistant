import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export const useFiltersParams = (
  onChange?: (params: URLSearchParams) => void,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pending, setPending] = useState<string[]>([]);

  const paramsRef = useRef(searchParams.toString());

  useEffect(() => {
    paramsRef.current = searchParams.toString();
  }, [searchParams]);

  useEffect(() => {
    if (!isPending) {
      setPending([]);
    }
  }, [isPending]);

  const performMutation = (
    mutate: (params: URLSearchParams) => void,
    pendingKey?: string,
  ) => {
    if (pendingKey) {
      setPending((prev) => [...prev, pendingKey]);
    }
    startTransition(() => {
      const params = new URLSearchParams(paramsRef.current);
      mutate(params);
      params.set("page", "1");
      paramsRef.current = params.toString();
      onChange ? onChange(params) : router.push(`/search?${params}`);
    });
  };

  return { performMutation, pending };
};
