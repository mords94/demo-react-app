import classNames from 'classnames';
import { Button, ButtonProps } from 'primereact/button';
import React from 'react';
import { Variant } from '../../types/style';

interface RoundedButtonProps extends Omit<ButtonProps, 'ref'> {
  variant?: Variant;
  raised?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  variant,
  raised,
  ...props
}) => {
  const className = variant ? `p-button-${variant}` : '';

  return (
    <Button
      {...props}
      className={classNames([
        'p-button-raised p-button-rounded',
        { className, 'p-button-outlined': !raised },
      ])}
    />
  );
};

export default RoundedButton;
