export const a11yOnClick = (func: () => void) => {
  return {
    onClick: func,
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        func();
      }
    },
  };
};
