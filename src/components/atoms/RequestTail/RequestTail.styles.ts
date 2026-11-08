import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  tail: {
    position: "absolute",
    zIndex: 0,
    right: "0px",
    bottom: "-11px",
    width: "18px",
    height: "18px",
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2097.73%2097%27%3E%3Cpath%20d%3D%27M30.44%2C0c6.69%2C34-4.28%2C66.25-30.44%2C97C51.64%2C65.62%2C96.86%2C33.92%2C97.73%2C0H30.44Z%27%20fill%3D%27%23eff1ff%27%20transform%3D%27translate%2897.73%2C%200%29%20scale%28-1%2C%201%29%27%2F%3E%3C%2Fsvg%3E")',
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
} as const satisfies GlobalStyleObject;
