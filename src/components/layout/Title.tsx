import React, { useEffect } from 'react';

const Title: React.FC<{ children: string }> = ({ children: pageTitle }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Covid tracker - ${pageTitle}`;
    return () => {
      document.title = prevTitle;
    };
  });

  return <h3>{pageTitle}</h3>;
};

export default Title;
