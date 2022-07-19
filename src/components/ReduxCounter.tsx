import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ReduxCounter() {
  const count = useSelector((state: { count: number }) => state.count);

  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: 'increment' })}>Inc</button>
      <span aria-label="count">{count}</span>
      <button onClick={() => dispatch({ type: 'decrement' })}>Dec</button>
    </div>
  );
}
