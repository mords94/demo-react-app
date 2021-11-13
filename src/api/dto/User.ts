import { pick } from 'lodash';

export interface PersonDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export enum RoleType {
  ROLE_OWNER = 'ROLE_OWNER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_GUEST = 'ROLE_GUEST',
}

export interface Role {
  id: number;
  roleType: RoleType;
}

export interface User {
  id: number;
  personDetails: PersonDetails;
  role: Role;
}

export interface Guest extends Omit<User, 'role' | 'id'> {
  id?: number;
}

export const userToGuest = (user: User): Guest => pick(user, ['personDetails']);
