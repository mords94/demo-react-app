import React, { useEffect, useState } from 'react';
import GuestLayout from '../../components/layout/GuestLayout';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { loadCurrentVisit } from '../visit/visitSlice';
import { useInterval } from 'react-use';
import { isNull } from 'lodash';
import { isNullOrUndefined, NullOr } from '../../utils/types';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { formatCountdown } from '../../utils/date';

const Home: React.FC = () => {
  const { push } = useHistory();
  const dispatch = useAppDispatch();

  const [time, setTime] = useState<NullOr<Date>>(null);
  const [elapsed, setElapsed] = useState<number>(0);

  const { visit } = useAppSelector((state) => state.visit);

  useEffect(() => {
    dispatch(loadCurrentVisit());
  }, [dispatch]);

  useEffect(() => {
    if (isNullOrUndefined(time) && visit.isPresent()) {
      setTime(new Date(Date.parse(visit.get().visitDate)));
    }
  }, [time, visit]);

  useInterval(() => {
    if (!isNull(time)) {
      const diffInSeconds = differenceInSeconds(
        new Date().getTime(),
        time.getTime()
      );

      setElapsed(diffInSeconds);
    }
  }, 1000);

  return (
    <GuestLayout title="Welcome to covid tracker" className="">
      <div className="grid">
        {visit.isPresent() && (
          <div className="xl:col-6 lg:col-6 md:col-12 sm:col-12 xs:col-12">
            <div className="card text-center">
              <h4>Current visit at {visit.get().place.name}</h4>
              <h6 className="mt-1">
                <i className="pi pi-map-marker mr-1"></i>
                {visit.get().place.address.city}{' '}
                {visit.get().place.address.addressLine}
              </h6>
              <h1>{formatCountdown(elapsed)}</h1>
              <Button
                label="Finish visit"
                onClick={() => alert('FINISH HIM')}
              />
            </div>
          </div>
        )}
        <div className="xl:col-6 lg:col-6 md:col-12 sm:col-12 xs:col-12">
          <div className="card">
            <Button label="New visit" onClick={() => push('/new-visit')} />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Home;
