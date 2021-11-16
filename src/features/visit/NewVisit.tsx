import { Button } from 'primereact/button';
import React, { useCallback, useEffect, useState } from 'react';
import { Guest, userToGuest } from '../../api/dto/User';
import BaseLayout from '../../components/layout/BaseLayout';
import { useProfile } from '../../hooks/useProfile';
import { isNullOrUndefined, OptionalValue } from '../../utils/types';
import { toast } from '../toast/toastService';
import GuestForm from '../user/UserForm';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { cloneDeep } from 'lodash';
import { useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { loadCurrentVisit, saveVisit } from './visitSlice';
import { loadPlaces } from '../places/placeSlice';
import { Form, yup } from '../../components/form';
import Field from '../../components/form/Field';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { Place } from '../../api/dto/Place';
import { Redirect } from 'react-router';
import Card from '../../components/common/Card';
import { confirmDialog } from 'primereact/confirmdialog';

const NewVisit: React.FC = () => {
  const user = useProfile();
  const dispatch = useDispatch();

  const [guests, setGuests] = useState<Guest[]>(() =>
    user.isPresent() ? [] : []
  );

  const {
    visit: { loading, visit },
    place: { data: places, isListLoading: isPlacesLoading },
  } = useAppSelector((state) => ({ visit: state.visit, place: state.place }));

  const onSubmit = useCallback(
    ({ placeId }) => {
      if (guests.length === 1) {
        confirmDialog({
          message: 'You are the only one guest in the list.',
          header: 'Are you sure want to continue?',
          icon: 'pi pi-exclamation-triangle',
          accept: () =>
            dispatch(
              saveVisit({
                guests,
                place: places.find(({ id }: Place) => id === placeId) as Place,
              })
            ),
          reject: () => {},
        });
      } else {
        dispatch(
          saveVisit({
            guests,
            place: places.find(({ id }: Place) => id === placeId) as Place,
          })
        );
      }
    },
    [dispatch, guests, places]
  );

  const addGuest = useCallback(
    (guest: Guest) => {
      setGuests([...guests, cloneDeep(guest)]);
    },
    [guests]
  );

  const findGuestBy = useCallback(
    (
      key: keyof Guest['personDetails'],
      value: Guest['personDetails'][keyof Guest['personDetails']]
    ): OptionalValue<Guest> =>
      guests.find((g: Guest) => g.personDetails[key] === value),
    [guests]
  );

  useEffect(() => {
    dispatch(loadPlaces());
    dispatch(loadCurrentVisit());
  }, [dispatch]);

  useEffect(() => {
    if (user.isPresent()) {
      if (
        isNullOrUndefined(findGuestBy('email', user.get().personDetails.email))
      ) {
        addGuest(userToGuest(user.get()));
      }
    }
  }, [addGuest, findGuestBy, user]);

  const showGuestError = useCallback((value: string) => {
    toast.error(
      `This guest is already in the list ${value}`,
      'Guest registration error'
    );
  }, []);

  const handleSubmit = useCallback(
    (guest: Guest) => {
      const existingGuestWithEmail = findGuestBy(
        'email',
        guest.personDetails.email
      );

      const existingGuestWithPhone: OptionalValue<Guest> = findGuestBy(
        'phone',
        guest.personDetails.phone
      );

      if (existingGuestWithEmail) {
        showGuestError(existingGuestWithEmail.personDetails.email);
      } else if (existingGuestWithPhone) {
        showGuestError(existingGuestWithPhone.personDetails.phone);
      } else {
        addGuest(guest);
      }
    },
    [addGuest, findGuestBy, showGuestError]
  );

  const schema = {
    placeId: yup.string().oneOf(
      places.map(({ id }: Place) => id),
      'Selecting a place is mandatory'
    ),
  };

  if (visit.isPresent()) {
    return <Redirect to="/" />;
  }

  return (
    <BaseLayout title="New visit">
      <div className="grid">
        <div className="lg:col-3 md:col-12 sm:col-12 xs:col-12 xl:col-3 col-12">
          <Card>
            <GuestForm onSubmit={handleSubmit} resetOnSubmit>
              <Button
                type="submit"
                label="Add guest"
                className="my-4 flex:1"
                loading={loading || isPlacesLoading}
              />
            </GuestForm>
          </Card>
        </div>

        <div className="lg:col-9 md:col-12 sm:col-12 xs:col-12 xl:col-9 col-12">
          <Card>
            <DataTable
              value={guests}
              header="Registered guests"
              emptyMessage="There are no guests yet."
              responsiveLayout="stack"
            >
              <Column field="personDetails.firstName" />
              <Column field="personDetails.lastName" />
              <Column field="personDetails.email" />
              <Column field="personDetails.phone" />
            </DataTable>
          </Card>
          <div className="col-12">
            <Card className="my-4 flex flex-row">
              <Form schema={schema} onSubmit={onSubmit}>
                <div className="formgroup-inline">
                  <Field<DropdownProps>
                    name="placeId"
                    placeholder="Select a place"
                    options={places}
                    optionLabel="name"
                    optionValue="id"
                    component={Dropdown}
                    disabled={isPlacesLoading}
                    style={{ minWidth: 300 }}
                    filter
                  />
                  <div className="field">
                    <Button
                      type="submit"
                      label="Start visit"
                      className="mx-4 my-2"
                      disabled={!guests.length}
                      loading={loading || isPlacesLoading}
                    />
                  </div>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default NewVisit;
