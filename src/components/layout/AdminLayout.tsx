import React, { PropsWithChildren } from 'react';
import BaseLayout, { BaseLayoutProps } from './BaseLayout';
import RoleGuard from '../guard/RoleGuard';
import { RoleType } from '../../api/dto/User';
import { Redirect } from 'react-router-dom';

interface AdminLayoutProps extends BaseLayoutProps {}

const AdminLayout: React.FC<PropsWithChildren<AdminLayoutProps>> = ({
  children,
  ...props
}) => {
  return (
    <RoleGuard type={RoleType.ROLE_ADMIN} fallback={<Redirect to="/" />}>
      <BaseLayout {...props}>{children}</BaseLayout>
    </RoleGuard>
  );
};

export default AdminLayout;
