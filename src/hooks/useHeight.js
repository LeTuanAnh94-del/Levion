import { useEffect, useRef, useState } from "react";

export default function useHeight() {
  const [height, setHeight] = useState(0);

  const refHeight = useRef(null);

  useEffect(() => {
    setHeight(refHeight.current.clientHeight);
  }, []);
  
  return { height, refHeight };
}
