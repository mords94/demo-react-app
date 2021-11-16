import React from 'react';
import Card from '../../components/common/Card';
import { BaseLayout } from '../../components/layout';
import PlaceList from './components/PlaceList';

interface PlacesProps {}
const Places: React.FC<PlacesProps> = () => {
  return (
    <BaseLayout title="Places">
      <Card>
        <PlaceList rows={10} create update />
      </Card>
    </BaseLayout>
  );
};

export default Places;
