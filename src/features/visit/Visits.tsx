import Card from '../../components/common/Card';
import OwnerLayout from '../../components/layout/OwnerLayout';
import VisitList from './VisitList';

const Guests: React.FC = () => (
  <OwnerLayout title="Visits">
    <Card>
      <VisitList rows={10} />
    </Card>
  </OwnerLayout>
);

export default Guests;
