import { computed, ref, type Ref } from "vue";

export type CardState = "default" | "error" | "warning" | "success";

type UseInteractiveCardParams = {
  state: Ref<CardState>;
  showToast?: (msg: string) => void;
};

export function useInteractiveCard({
  state,
  showToast,
}: UseInteractiveCardParams) {
  const variantClass = computed(() => {
    switch (state.value) {
      case "error":
        return "border-error text-error";
      case "warning":
        return "border-warning text-warning";
      case "success":
        return "border-success text-success";
      default:
        return "border-border text-text-main";
    }
  });

  const descriptionClass = computed(() => {
    return state.value === "default" ? "text-text-muted" : "";
  });

  const descriptionText = computed(() => {
    switch (state.value) {
      case "error":
        return "Something went wrong.";
      case "warning":
        return "Needs attention.";
      case "success":
        return "Action completed successfully.";
      default:
        return "Hover or focus to see interaction feedback.";
    }
  });

  const actionLabel = computed(() => {
    switch (state.value) {
      case "error":
        return "Retry";
      case "warning":
        return "Review";
      case "success":
        return "Done";
      default:
        return "Action";
    }
  });

  const actionButtonClass = computed(() => {
    switch (state.value) {
      case "error":
        return "border-error/40 hover:border-error/70";
      case "warning":
        return "border-warning/40 hover:border-warning/70";
      case "success":
        return "border-success/40 hover:border-success/70";
      default:
        return "border-border hover:border-secondary/60";
    }
  });

  /* 
  - Pressed feedback for the action button
  - Pointer events ensure consistent behavior across mouse/touch
  */
  const isPressed = ref(false);

  function onDown() {
    isPressed.value = true;
  }

  function onUp() {
    isPressed.value = false;
  }

  function onActionClick() {
    switch (state.value) {
      case "error":
        showToast?.("Retry triggered.");
        break;
      case "warning":
        showToast?.("Review opened.");
        break;
      case "success":
        showToast?.("Done.");
        break;
      default:
        showToast?.("Action triggered.");
        break;
    }
  }

  const isLoading = ref(false);

  // after
  async function runAction() {
    isLoading.value = true;

    try {
      // TODO: replace with real API call
      // await api.runAction(state.value)
      await new Promise<void>((resolve) => window.setTimeout(resolve, 800));

      onActionClick(); // success feedback
    } catch (e) {
      showToast?.("Action failed.");
    } finally {
      isLoading.value = false;
      onUp();
    }
  }

  return {
    variantClass,
    descriptionClass,
    descriptionText,
    actionLabel,
    actionButtonClass,
    isPressed,
    isLoading,
    onDown,
    onUp,
    runAction,
  };
}
