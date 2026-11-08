import { useEffect, useRef, useState } from "react";

interface UseMicrophonePermissionCallbacks {
  onGranted?: () => void;
  onDenied?: () => void;
}

export function useMicrophonePermission({
  onGranted,
  onDenied,
}: UseMicrophonePermissionCallbacks = {}) {
  const [permissionStatus, setPermissionStatus] = useState<PermissionState>();
  const [isLoading, setIsLoading] = useState(true);

  const onGrantedRef = useRef(onGranted);
  const onDeniedRef = useRef(onDenied);
  onGrantedRef.current = onGranted;
  onDeniedRef.current = onDenied;

  useEffect(() => {
    navigator.permissions
      .query({ name: "microphone" as PermissionName })
      .then((permission) => {
        setPermissionStatus(permission.state);
        setIsLoading(false);

        permission.onchange = function () {
          setPermissionStatus(this.state);

          switch (this.state) {
            case "granted":
              onGrantedRef.current?.();
              break;
            case "denied":
              onDeniedRef.current?.();
              break;
          }
        };
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return { permissionStatus, isLoading };
}
