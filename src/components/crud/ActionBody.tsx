import { Button } from 'primereact/button';
import React from 'react';

interface ActionBodyProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionBody: React.FC<ActionBodyProps> = ({ onEdit, onDelete }) => {
  return (
    <>
      {onEdit && (
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={onEdit}
        />
      )}

      {onDelete && (
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-mr-2"
          onClick={onDelete}
        />
      )}
    </>
  );
};

export default ActionBody;
