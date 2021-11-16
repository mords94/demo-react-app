import React from 'react';
import { Button, ButtonProps } from 'primereact/button';

const CreateButton: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      icon="pi pi-plus"
      label={label}
      className="p-button p-button-success p-mr-2 m-2"
      onClick={onClick}
    />
  );
};

export default CreateButton;
