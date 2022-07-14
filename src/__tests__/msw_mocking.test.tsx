import React from 'react';
import User from 'src/components/Users';
import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: {
              title: 'Mr',
              first: 'John',
              last: 'Doe',
            },
            gender: 'Male',
            email: 'abc@gmail.com',
          },
        ],
      })
    );
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

describe('Testing http with jest.mock', () => {
  it('should render the user', async () => {
    const user = userEvent.setup();
    render(<User />);

    const quantityInput = screen.getByLabelText(/enter quantity/i);
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toHaveDisplayValue('0');

    await user.click(screen.getByRole('button'));

    await user.type(quantityInput, '1');
    await user.click(screen.getByRole('button'));

    const gender = await screen.findByText(/male/i);
    expect(gender).toBeInTheDocument();
  });
});
