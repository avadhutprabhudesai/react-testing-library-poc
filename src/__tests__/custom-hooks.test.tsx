import React from 'react';
import { act } from 'react-dom/test-utils';
import useCounter from 'src/hooks/use-counter';
import { render, renderHook } from 'test/test-utils';

/**
 * - custom hook returns a value
 * - custom hook accepts initial state and sets count value to it
 * - custom hook accepts step prop and changes count value accordingly
 * - create custom setup function to avoid repetition
 */

describe('Testing useCounter custom hook with custom setup', () => {
  function setup({ initialProps = {} } = {}) {
    const result: { current: CounterResult } = {
      current: {
        count: 0,
        increment: () => {
          return;
        },
        decrement: () => {
          return;
        },
      },
    };
    function Test(props: UseCounterProps) {
      result.current = useCounter(props);
      return null;
    }

    render(<Test {...initialProps} />);
    return result;
  }
  test('useCounter returns a value', () => {
    const { current } = setup();
    expect(current.count).toBe(0);
  });
  test('useCounter allows to increment the value', () => {
    const result = setup();
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });
  test('useCounter allows initialState customisation', () => {
    const result = setup({ initialProps: { initialState: 5 } });
    expect(result.current.count).toBe(5);
    act(() => result.current.increment());
    expect(result.current.count).toBe(6);
  });

  test('useCounter allows step customisation', () => {
    const result = setup({ initialProps: { step: 3 } });
    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    expect(result.current.count).toBe(3);
  });
});

describe('Testing useCounter custom hook with renderHook', () => {
  test('useCounter returns a value', () => {
    const { result } = renderHook(useCounter);
    expect(result.current.count).toBe(0);
  });
  test('useCounter allows to increment the value', () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });
  test('useCounter allows initialState customisation', () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialState: 5 },
    });
    expect(result.current.count).toBe(5);
    act(() => result.current.increment());
    expect(result.current.count).toBe(6);
  });

  test('useCounter allows step customisation', () => {
    const { result } = renderHook(useCounter, {
      initialProps: { step: 3 },
    });
    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    expect(result.current.count).toBe(3);
  });
});
