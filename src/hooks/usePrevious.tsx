import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;