import Card from '../../components/common/Card';
import OwnerLayout from '../../components/layout/OwnerLayout';
import GuestList from '../guest/components/GuestList';
import PlaceList from '../places/components/PlaceList';

const Dashboard = () => {
  return (
    <OwnerLayout title="Dashboard">
      <Card>
        <h2>Places</h2>
        <PlaceList />
      </Card>

      <Card>
        <h2>Guests</h2>
        <GuestList />
      </Card>
    </OwnerLayout>
  );
};

export default Dashboard;
