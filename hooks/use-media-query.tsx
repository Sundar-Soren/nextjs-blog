import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const isClient = typeof window === "object";

  const [matches, setMatches] = useState(
    isClient ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!isClient) {
      return; // Don't run the rest of the effect on the server
    }

    const mediaQueryList = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQueryList.matches);
    };

    updateMatches();

    mediaQueryList.addListener(updateMatches);

    return () => {
      mediaQueryList.removeListener(updateMatches);
    };
  }, [query, isClient]);

  return matches;
};

export default useMediaQuery;
