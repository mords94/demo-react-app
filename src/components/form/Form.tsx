import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormHTMLAttributes,
  DetailedHTMLProps,
  useCallback,
  useImperativeHandle,
} from 'react';
import * as yup from 'yup';
import {
  SubmitHandler,
  useForm,
  FormProvider,
  DefaultValues,
  UseFormSetValue,
} from 'react-hook-form';

export type SchemaType<T> = Record<keyof T, yup.AnySchema>;

type HTMLForm = Omit<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
>;

export interface FormProps<TFormData> extends HTMLForm {
  schema: SchemaType<TFormData>;
  onSubmit: SubmitHandler<TFormData>;
  defaultValues?: DefaultValues<TFormData>;
  resetOnSubmit?: boolean;
  formRef?: any;
}

export interface FormMethods<TFormData> {
  setValue: UseFormSetValue<TFormData>;
}

function Form<TFormData extends Record<string, any> = Record<string, never>>({
  schema,
  children,
  onSubmit,
  defaultValues,
  resetOnSubmit = false,
  formRef,
  ...formProps
}: FormProps<TFormData>): JSX.Element {
  const methods = useForm<TFormData>({
    resolver: yupResolver(yup.object().shape(schema)),
    defaultValues,
  });

  const onSubmitInternal = useCallback<SubmitHandler<TFormData>>(
    (data, event) => {
      onSubmit(data, event);

      if (resetOnSubmit) {
        setTimeout(() => {
          event?.target.reset({});
          methods.reset();
        }, 100);
      }
    },
    [methods, onSubmit, resetOnSubmit]
  );

  useImperativeHandle<FormMethods<TFormData>, FormMethods<TFormData>>(
    formRef,
    () => ({
      setValue: methods.setValue,
    }),
    [methods.setValue]
  );

  return (
    <FormProvider {...methods}>
      <form
        {...formProps}
        onSubmit={methods.handleSubmit(onSubmitInternal, (errors) =>
          console.error(errors)
        )}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
