import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputText, InputTextProps } from 'primereact/inputtext';
import ErrorMessage from './ErrorMessage';
import classNames from 'classnames';
import { UseControllerProps } from 'react-hook-form';

type FieldProps<TInputProps> = UseControllerProps &
  TInputProps & {
    label?: string;
    component?: React.ComponentType<any>;
  };

type DefaultInputProps = Omit<InputTextProps, 'onChange' | 'onBlur' | 'value'>;
// type UsedInputTextProps = Pick<InputTextProps, 'onChange' | 'onBlur' | 'value'>;

const Field = <TInputProps extends Record<string, any> = DefaultInputProps>({
  name,
  label,
  component: Component = InputText,
  ...rest
}: FieldProps<TInputProps>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({
        field: { ref, onChange, ...inputProps },
        fieldState: { invalid, error },
      }) => (
        <div className="p-field mt-2">
          {label && (
            <label htmlFor={name} className="p-text-bold block mb-1">
              {label}
            </label>
          )}
          <Component
            {...rest}
            {...inputProps}
            onChange={(e: any) => {
              onChange(e.target.value ?? e.value ?? e);
            }}
            className={classNames({ 'p-invalid': invalid })}
          />
          {error?.message && <ErrorMessage message={error?.message} />}
        </div>
      )}
    />
  );
};

export default Field;
