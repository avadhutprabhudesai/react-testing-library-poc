import { createStore } from 'redux';

const initialState = {
  count: 0,
};
export const reducer = (state = initialState, action: { type: string }) => {
  if (action.type === 'increment') {
    return {
      ...state,
      count: state.count + 1,
    };
  }
  if (action.type === 'decrement') {
    return {
      ...state,
      count: state.count - 1,
    };
  }
  return state;
};

export const store = createStore(reducer, initialState);
