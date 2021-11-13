import { Field, Form, yup } from '../../components/form';
import { FormProps, SchemaType } from '../../components/form/Form';
import { DefaultValues } from 'react-hook-form';

interface ProfileData {
  personDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const profileDataDefault: ProfileData = {
  personDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
};

const profileSchema = {
  personDetails: yup.object().shape({
    email: yup
      .string()
      .email('Invalid e-mail address')
      .required('E-mail is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string().required('Phone name is required'),
  }),
};

interface UserFormProps<TUserFormData>
  extends Omit<FormProps<TUserFormData>, 'schema'> {
  defaultValues?: DefaultValues<TUserFormData & ProfileData>;
  schema?: FormProps<TUserFormData>['schema'];
}

function UserForm<
  TUserFormData extends Record<string, any> = Record<string, never>
>({
  onSubmit,
  defaultValues,
  schema = {} as SchemaType<TUserFormData>,
  children,
  resetOnSubmit,
}: UserFormProps<TUserFormData>): JSX.Element {
  return (
    <Form<TUserFormData & ProfileData>
      schema={{ ...profileSchema, ...schema }}
      onSubmit={onSubmit}
      defaultValues={
        { ...profileDataDefault, ...(defaultValues ?? {}) } as DefaultValues<
          TUserFormData & ProfileData
        >
      }
      className="p-fluid fluid"
      resetOnSubmit={resetOnSubmit}
    >
      <Field name="personDetails.firstName" label="First name*" />
      <Field name="personDetails.lastName" label="Last name*" />
      <Field name="personDetails.email" label="E-mail*" />
      <Field name="personDetails.phone" label="Phone*" />

      {children}
    </Form>
  );
}

export default UserForm;
