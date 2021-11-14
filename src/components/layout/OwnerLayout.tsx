import React, { PropsWithChildren } from 'react';
import BaseLayout, { BaseLayoutProps } from './BaseLayout';
import RoleGuard from '../guard/RoleGuard';
import { RoleType } from '../../api/dto/User';
import { Redirect } from 'react-router-dom';

interface OwnerLayoutProps extends BaseLayoutProps {}

const OwnerLayout: React.FC<PropsWithChildren<OwnerLayoutProps>> = ({
  children,
  ...props
}) => {
  return (
    <RoleGuard
      type={[RoleType.ROLE_OWNER, RoleType.ROLE_ADMIN]}
      fallback={<Redirect to="/" />}
    >
      <BaseLayout {...props}>{children}</BaseLayout>
    </RoleGuard>
  );
};

export default OwnerLayout;
