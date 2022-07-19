import { useState } from 'react';

export default function useCounter({
  initialState = 0,
  step = 1,
}: UseCounterProps = {}) {
  const [count, setCount] = useState(initialState);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  return { count, increment, decrement };
}
