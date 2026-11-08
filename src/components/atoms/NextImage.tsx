import { Image as ChakraImage } from "@chakra-ui/react";
import Image, { type ImageProps } from "next/image";

export function NextImage({ ...props }: ImageProps) {
  return (
    <ChakraImage asChild>
      <Image {...props} />
    </ChakraImage>
  );
}
