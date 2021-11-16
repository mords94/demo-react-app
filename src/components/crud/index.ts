export { default as CreateOrUpdateDialog } from './CreateOrUpdateDialog';
export * from './CreateOrUpdateDialog';
export { default as List } from './List';
export { default as ServerList } from './ServerList';
export { default as ActionBody } from './ActionBody';

export interface CrudProps {
  rows?: number;
  create?: boolean;
  update?: boolean;
}
