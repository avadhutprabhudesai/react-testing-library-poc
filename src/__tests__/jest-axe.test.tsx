import React from 'react';
import FavouriteNumber from 'components/FavouriteNumber';
import { render } from 'test/test-utils';
import { axe } from 'jest-axe';
import Login from 'components/login';
import Users from 'src/components/Users';

it('should test FavouriteNumber component for a11y violations', async () => {
  const { container } = render(<FavouriteNumber />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
it('should test Login component for a11y violations', async () => {
  const { container } = render(<Login />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
it('should test Users component for a11y violations', async () => {
  const { container } = render(<Users />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
