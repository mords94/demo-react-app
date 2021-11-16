import Card from '../../components/common/Card';
import OwnerLayout from '../../components/layout/OwnerLayout';
import GuestList from './components/GuestList';

const Guests: React.FC = () => (
  <OwnerLayout title="Guests">
    <Card>
      <GuestList rows={10} create update />
    </Card>
  </OwnerLayout>
);

export default Guests;
