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
