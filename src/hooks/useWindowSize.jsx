import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    // Clean Up functions
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Returning hooks values
  return windowSize;
};

export default useWindowSize;
