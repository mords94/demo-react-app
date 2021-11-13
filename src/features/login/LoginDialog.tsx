import { Button } from 'primereact/button';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import Dialog, { DialogMethods } from '../../components/common/Dialog';
import { Field, Form } from '../../components/form';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signIn } from './loginSlice';

export interface LoginFormData {
  email: string;
  password: string;
}

const schema = {
  email: yup.string().email(),
  password: yup.string().required(),
};

const LoginDialog = React.forwardRef<DialogMethods, any>((props, ref) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.login);

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(signIn(data));
  };

  return (
    <Dialog {...props} ref={ref} id="login">
      <Form<LoginFormData>
        schema={schema}
        onSubmit={onSubmit}
        className="p-fluid"
      >
        <Field label="Email" name="email" />
        <Field label="Password" name="password" />

        <Button
          type="submit"
          label="Login"
          className="my-4"
          loading={loading}
        />
      </Form>
    </Dialog>
  );
});

export default LoginDialog;
