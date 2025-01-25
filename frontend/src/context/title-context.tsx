import React, { createContext, useState, useContext } from 'react';

const TitleContext = createContext<{
  title: string;
  setTitle: (title: string) => void;
}>({
  title: '',
  setTitle: () => {},
});

export const TitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitle = () => useContext(TitleContext);
