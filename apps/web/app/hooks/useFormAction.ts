import { useCallback, useEffect } from 'react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { BaseActionReturnType } from '../types/actionTypes';

// ActionState 타입인지 확인을 위한 Type Guard
const hasState = (
  state: BaseActionReturnType<any> | unknown,
): state is BaseActionReturnType<any> => {
  if (!state || typeof state !== 'object') return false;

  return 'status' in state;
};

type UseFormActionProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = UseFormProps<TFieldValues, TContext> & {
  state: BaseActionReturnType<TFieldValues> | unknown;
  onSuccess?: () => void;
};

export const useFormAction = <TFieldValues extends FieldValues = FieldValues, TContext = any>({
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

    console.log(state.status);

    switch (state.status) {
      case 'INTERNAL_ERROR':
        console.error(state.error);
        break;
      case 'VALIDATION_ERROR':
        const { fieldErrors } = state;
        for (const field in fieldErrors) {
          if (!fieldErrors.hasOwnProperty(field)) continue;
          form.setError(field, {
            message: fieldErrors[field][0],
          });
        }
        break;
      case 'SUCCESS':
        handleSuccess();
        form.reset();
        break;
    }
  }, [form, handleSuccess, state]);

  return {
    ...form,
  };
};
