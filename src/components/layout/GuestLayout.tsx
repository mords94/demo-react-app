import React, { PropsWithChildren } from 'react';
import Title from './Title';

interface GuestLayoutProps {
  title: string;
  className?: string;
}

const GuestLayout: React.FC<PropsWithChildren<GuestLayoutProps>> = ({
  children,
  className,
  title,
}) => {
  return (
    <div className="grid justify-content-center p-4">
      <div className="col-12">
        <div className={className ?? 'card'}>
          <Title>{title}</Title>
          <main className="m-3 px-1 py-2">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
