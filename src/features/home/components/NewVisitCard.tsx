import { Button } from 'primereact/button';
import { history } from '../../../store/root';
import Card from '../../../components/common/Card';

const NewVisitCard = () => {
  return (
    <div className="xl:col-6 lg:col-6 md:col-12 sm:col-12 xs:col-12">
      <Card className="text-center">
        <h3>Check-in to a place</h3>
        <Button
          label="Let's get started"
          onClick={() => history.push('/new-visit')}
          className="p-button"
        />
      </Card>
    </div>
  );
};

export default NewVisitCard;
