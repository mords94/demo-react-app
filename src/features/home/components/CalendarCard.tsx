import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Card from '../../../components/common/Card';
import { useAppSelector } from '../../../store/hooks';

const CalendarCard = () => {
  const { visits } = useAppSelector((state) => state.visit);

  const events = useMemo(
    () =>
      visits.map((visit) => ({
        start: visit.visitDate,
        end: visit.finishDate ?? undefined,
        id: visit.id.toString(),
        title: visit.place.name,
      })),
    [visits]
  );

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
          eventMouseEnter={(props) => alert('alert')}
          plugins={[dayGridPlugin]}
        />
      </Card>
    </div>
  );
};

export default CalendarCard;
