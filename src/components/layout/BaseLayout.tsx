import React, { PropsWithChildren, useMemo } from 'react';
import Title from './Title';
import ToastContainer from '../../context/ToastContainer';
import Menu from './menu/Menu';
import {
  useIsGuest,
  useIsProfileLoading,
  useProfile,
  useRole,
} from '../../hooks';
import { Spinner } from '../common';
import Card from '../common/Card';
import { SideMenu } from './menu';

export interface BaseLayoutProps {
  title: string;
  className?: string;
}

const BaseLayout: React.FC<PropsWithChildren<BaseLayoutProps>> = ({
  children,
  className,
  title,
}) => {
  const loading = useIsProfileLoading();
  const isGuest = useIsGuest();
  const user = useProfile();
  const content = useMemo(() => {
    if (loading && !user.isPresent()) {
      return (
        <Card>
          <Spinner />
        </Card>
      );
    }

    return children;
  }, [children, loading, user]);

  return (
    <>
      <ToastContainer />
      <Menu />
      <div className="grid justify-content-center p-4">
        {!isGuest && (
          <div className="lg:col-3 md:col-12 sm:col-12 xs:col-12">
            <SideMenu />
          </div>
        )}
        <div
          className={`lg:col-${
            isGuest ? '12' : '9'
          }  md:col-12 sm:col-12 xs:col-12 xl:col-${isGuest ? '12' : '9'}`}
        >
          <div className={className}>
            <Card>
              <Title>{title}</Title>
            </Card>
            {content}
          </div>
        </div>
      </div>

      <footer></footer>
    </>
  );
};

export default BaseLayout;
