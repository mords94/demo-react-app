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
import { useProfile } from '../../hooks';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { visit } = useAppSelector((state) => state.visit);
  const user = useProfile();
  useEffect(() => {
    if (user.isPresent()) {
      dispatch(loadCurrentVisitList());
      dispatch(loadCurrentVisit());
    }
  }, [dispatch, user]);

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
