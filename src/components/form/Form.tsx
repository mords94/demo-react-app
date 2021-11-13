/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHTMLAttributes, DetailedHTMLProps, useCallback } from 'react';
import * as yup from 'yup';
import {
  SubmitHandler,
  useForm,
  FormProvider,
  DefaultValues,
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
}

function Form<TFormData extends Record<string, any> = Record<string, never>>({
  schema,
  children,
  onSubmit,
  defaultValues,
  resetOnSubmit = false,
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
          console.log('reset');
          event?.target.reset({});
          methods.reset();
        }, 100);
      }
    },
    [methods, onSubmit, resetOnSubmit]
  );

  return (
    <FormProvider {...methods}>
      <form {...formProps} onSubmit={methods.handleSubmit(onSubmitInternal)}>
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
