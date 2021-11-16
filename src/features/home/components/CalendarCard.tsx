import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Card from '../../../components/common/Card';
import { useAppSelector } from '../../../store/hooks';
import { formatDate, Visit } from '../../../api/dto/Visit';
import { PersonDetails } from '../../../api/dto/User';
import { toast } from '../../toast/toastService';
import { serializePlace, serializePlaceRaw } from '../../../api/dto/Place';

const CalendarCard = () => {
  const { visits } = useAppSelector((state) => state.visit);

  const events = useMemo(
    () =>
      visits.map((visit: Visit) => ({
        start: visit.visitDate,
        end: visit.finishDate ?? undefined,
        id: visit?.id?.toString(),
        title: visit.place.name,
        extendedProps: {
          visit,
        },
      })),
    [visits]
  );

  const eventClick = ({ event }: any) => {
    const { visit }: { visit: Visit } = event.extendedProps;

    const guests = visit.guests
      .map(
        ({ personDetails: { firstName, lastName } }) =>
          `${firstName} ${lastName}`
      )
      .join('\n');

    toast.info(
      `${formatDate(visit.visitDate)} - ${formatDate(visit.finishDate)}` +
        ` | ` +
        guests,
      serializePlaceRaw(visit.place)
    );
  };

  return (
    <div className="xl:col-6 lg:col-6 md:col-12 sm:col-12 xs:col-12">
      <Card className="text-center">
        <FullCalendar
          events={events}
          headerToolbar={{
            right: 'today',
            center: 'title',
            left: 'prev,next',
          }}
          eventClick={eventClick}
          plugins={[dayGridPlugin]}
        />
      </Card>
    </div>
  );
};

export default CalendarCard;
