import { useState, useEffect } from 'react';

export function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const leftHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const rightHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', leftHandler);
    window.addEventListener('keyup', rightHandler);

    return () => {
      window.removeEventListener('keydown', leftHandler);
      window.removeEventListener('keyup', rightHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

// https://blog.whereisthemouse.com/create-a-list-component-with-keyboard-navigation-in-react
