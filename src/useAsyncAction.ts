import { useState, useCallback } from "react";

type UseAsyncActionConfig<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  keepLoadingOnSuccess?: boolean;
};
type MaybePromise<T> = T | Promise<T>;

export function useAsyncAction<T extends (...args: any[]) => MaybePromise<any>>(
  asyncAction: T,
  { onSuccess, onError, keepLoadingOnSuccess = false }: UseAsyncActionConfig<T>
) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      setIsLoading(true);
      if (isLoading) return;
      try {
        const result = await asyncAction(...args);
        if (onSuccess) onSuccess(result);
        if (!keepLoadingOnSuccess) setIsLoading(false);
        return result;
      } catch (error) {
        if (onError) onError(error);
        setIsLoading(false);
        throw error;
      }
    },
    [asyncAction, onSuccess, onError, keepLoadingOnSuccess, isLoading]
  );

  return { execute, isLoading };
}
