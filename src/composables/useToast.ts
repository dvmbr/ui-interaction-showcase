import { inject, type InjectionKey } from "vue";

export type ToastFn = (message: string) => void;

export const TOAST_KEY: InjectionKey<ToastFn> = Symbol("toast");

export function useToast() {
  const toast = inject(TOAST_KEY);

  const showToast: ToastFn = (message) => {
    toast?.(message);
  };

  return { showToast };
}
