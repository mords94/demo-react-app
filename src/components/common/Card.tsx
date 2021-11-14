import React from 'react';
import classNames from 'classnames';

const Card: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={classNames('card', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
