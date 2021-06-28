import * as React from 'react';

export const useRestoreScroll = (storeName) => {
  const scroll = React.useRef(0);
  const updateScroll = () => {
    scroll.current = window.scrollY;
  };

  React.useEffect(() => {
    document.addEventListener('scroll', updateScroll);
  }, []);

  React.useLayoutEffect(() => {
    const recoveryScroll = sessionStorage.getItem(storeName);
    if (recoveryScroll) {
      window.scrollTo({
        top: recoveryScroll
      });
      updateScroll();
    }
    return () => {
      removeEventListener('scroll', updateScroll);
      sessionStorage.setItem(storeName, scroll.current);
    };
  }, []);
};
