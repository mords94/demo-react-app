import React, { useEffect } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  loadCurrentVisit,
  loadData as loadCurrentVisitList,
} from '../visit/visitSlice';
import VisitCard from './components/VisitCard';
import NewVisitCard from './components/NewVisitCard';
import CalendarCard from './components/CalendarCard';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { visit } = useAppSelector((state) => state.visit);

  useEffect(() => {
    dispatch(loadCurrentVisit());
    dispatch(loadCurrentVisitList());
  }, [dispatch]);

  return (
    <BaseLayout title="Welcome to covid tracker" className="">
      <div className="grid">
        {visit.isPresent() && <VisitCard visit={visit.get()} />}
        {!visit.isPresent() && <NewVisitCard />}
        <CalendarCard />
      </div>
    </BaseLayout>
  );
};

export default Home;
