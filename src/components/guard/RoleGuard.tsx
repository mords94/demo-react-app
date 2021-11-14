import React from 'react';
import { RoleType } from '../../api/dto/User';
import { useIsProfileLoading, useRole } from '../../hooks';
import { Spinner } from '../common';
import Card from '../common/Card';

interface RoleGuardProps {
  type: RoleType | RoleType[];
  fallback: any;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  type,
  fallback = null,
  children,
}) => {
  const loading = useIsProfileLoading();
  const role = useRole();
  const types = Array.isArray(type) ? type : [type];

  if (loading) {
    return (
      <Card>
        <Spinner />
      </Card>
    );
  }

  return types.includes(role) ? children : fallback;
};

export default RoleGuard;
