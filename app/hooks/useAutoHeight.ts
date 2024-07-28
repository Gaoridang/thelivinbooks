import { RefObject, useEffect, useState } from "react";

export const useAutoHeight = (ref: RefObject<HTMLDivElement>) => {
  const [height, setHeight] = useState();

  useEffect(() => {
    if (!ref.current) return;

    const initialHeight = ref.current.scrollHeight;
    ref.current.style.height = `${height}px`;
  }, [ref, height]);
};
