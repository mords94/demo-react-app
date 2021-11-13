import { pick } from 'lodash';
import { Button } from 'primereact/button';
import React, { useCallback } from 'react';
import { Spinner } from '../../components/common';
import { GuestLayout } from '../../components/layout';
import { useProfile } from '../../hooks/useUser';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../login/loginSlice';
import UserForm from '../user/UserForm';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const onSave = useCallback(
    (profileData) => {
      dispatch(updateProfile(profileData));
    },
    [dispatch]
  );

  const { loading } = useAppSelector((state) => state.login);

  const user = useProfile();

  return (
    <GuestLayout title="Profile">
      <div className="lg:col-4 lg:col-offset-4 md:col-12 sm:col-12 xs:col-12">
        {!user.isPresent() && <Spinner />}
        {user.isPresent() && (
          <UserForm
            onSubmit={onSave}
            defaultValues={pick(user.get(), ['personDetails'])}
          >
            <Button
              type="submit"
              label="Save"
              className="my-4"
              loading={loading}
            />
          </UserForm>
        )}
      </div>
    </GuestLayout>
  );
};

export default Profile;
