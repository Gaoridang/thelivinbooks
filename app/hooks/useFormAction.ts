import { useCallback, useEffect } from "react";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";

type UseFormActionProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = UseFormProps<TFieldValues, TContext> & {
  state: ActionState | unknown;
  onSuccess?: () => void;
};

export const useFormAction = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>({
  state,
  onSuccess,
  ...props
}: UseFormActionProps) => {
  const form = useForm({ ...props });

  const handleSuccess = useCallback(() => {
    onSuccess?.();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!hasState(state)) return;
    form.clearErrors();

    switch (state.code) {
      case "INTERNAL_ERROR":
        console.error(state.err);
        break;
      case "VALIDATION_ERROR":
        const { fieldErrors } = state;
        for (const field in fieldErrors) {
          form.setError(field, {
            type: "manual",
            message: fieldErrors[field].join(", "),
          });
        }
        break;
      case "AUTH_ERROR":
        form.setError("email", { type: "manual", message: "" });
        form.setError("password", { type: "manual", message: state.message });
        break;
      case "EXISTS_ERROR":
        form.setError(state.key, { type: "manual", message: state.message });
        break;
      case "SUCCESS":
        handleSuccess();
        form.reset();
        break;
    }
  }, [form, handleSuccess, state]);

  return {
    ...form,
  };
};

// ActionState 타입인지 확인을 위한 Type Guard
const hasState = (state: ActionState | unknown): state is ActionState => {
  if (!state || typeof state !== "object") return false;

  return "code" in state;
};
