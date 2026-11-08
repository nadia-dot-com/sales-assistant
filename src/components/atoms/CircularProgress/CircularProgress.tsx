import { Flex } from "@chakra-ui/react";
import type { CSSProperties } from "react";
import { styles } from "@/components/atoms/CircularProgress/CircularProgress.styles";

const TAG = "CircularProgress";

interface CircularProgressProps {
  score: number;
}

export function CircularProgress({ score }: CircularProgressProps) {
  return (
    <Flex
      {...styles.root}
      style={{ "--progress": score } as CSSProperties}
      aria-label={`Match score: ${score}%`}
      data-testid={TAG}
    >
      <Flex {...styles.center}>{score}%</Flex>
    </Flex>
  );
}
