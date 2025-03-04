import { useCallback, useState } from "react";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);

  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);

  // Function to manually set the translation (to center on a specific node)
  const recenterTree = (x, y) => {
    setTranslate({ x, y });
  };

  return [translate, containerRef, recenterTree]; // Return recenterTree function
};
