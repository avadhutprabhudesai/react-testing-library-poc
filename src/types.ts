/* eslint-disable @typescript-eslint/no-unused-vars */
type Name = {
  title: string;
  first: string;
  last: string;
};
type User = {
  name: Name;
  gender: string;
  email: string;
};

type UserResponse = {
  results: [User];
};

type Category = {
  id: number;
  title: string;
};

type UseCounterProps = {
  initialState?: number;
  step?: number;
};

type CounterResult = {
  count: number;
  increment: () => void;
  decrement: () => void;
};
