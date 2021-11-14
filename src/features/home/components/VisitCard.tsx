import { differenceInSeconds } from 'date-fns';
import { Button } from 'primereact/button';
import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from 'react-use';
import { Visit } from '../../../api/dto/Visit';
import Card from '../../../components/common/Card';
import { formatCountdown } from '../../../utils/date';
import { isNull, isNullOrUndefined, NullOr } from '../../../utils/types';
import FinishVisitDialog, {
  FinishVisitDialogMethods,
} from '../../visit/FinishVisitDialog';
import { Skeleton } from 'primereact/skeleton';

interface VisitCardProps {
  visit: Visit;
}

const VisitCard: React.FC<VisitCardProps> = ({ visit }) => {
  const [time, setTime] = useState<NullOr<Date>>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const finishVisitDialogRef = useRef<FinishVisitDialogMethods>(null);

  useEffect(() => {
    if (isNullOrUndefined(time)) {
      setTime(new Date(Date.parse(visit.visitDate)));
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

  const {
    place: {
      address: { city, addressLine },
    },
    guests,
  } = visit;

  const guestList = guests
    .map(
      (guest) =>
        `${guest.personDetails.firstName} ${guest.personDetails.lastName}`
    )
    .join(',');

  return (
    <div className="xl:col-6 lg:col-6 md:col-12 sm:col-12 xs:col-12">
      <Card className="text-center">
        <h3>Current visit at {visit.place.name}</h3>
        <h6 className="mt-1">
          <i className="pi pi-map-marker mr-1"></i>
          {city} {addressLine}
        </h6>
        <h1>
          {formatCountdown(elapsed) ?? (
            <div className="flex flex-row align-items-center justify-content-center">
              <Skeleton width="180px" height="42px" />
            </div>
          )}
        </h1>
        <p>Guests: {guestList}</p>
        <Button
          label="Finish visit"
          onClick={() =>
            finishVisitDialogRef.current?.open(visit.id.toString())
          }
          loading={elapsed <= 1}
        />
      </Card>
      <FinishVisitDialog ref={finishVisitDialogRef} />
    </div>
  );
};

export default VisitCard;
