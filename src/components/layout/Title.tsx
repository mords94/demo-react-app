import React, { useEffect } from 'react';

const Title: React.FC<{ children: string }> = ({ children: pageTitle }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Covid tracker - ${pageTitle}`;
    return () => {
      document.title = prevTitle;
    };
  });

  return <h1>{pageTitle}</h1>;
};

export default Title;
