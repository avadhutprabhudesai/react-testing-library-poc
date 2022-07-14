import React from 'react';
import { httpGetUser } from '../api/http';
import User from 'src/components/Users';
import { render, screen, waitFor } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('../api/http');

const mockHttpGetUser = httpGetUser as jest.Mock<Promise<[User]>>;

describe('Testing http with jest.mock', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should render the user', async () => {
    const user = userEvent.setup();
    const mockUserReturn: [User] = [
      {
        name: {
          title: 'Mr',
          first: 'John',
          last: 'Doe',
        },
        gender: 'Male',
        email: 'abc@gmail.com',
      },
    ];
    mockHttpGetUser.mockImplementation((qty: number) => {
      expect(qty).toEqual(expect.any(Number));
      return Promise.resolve(mockUserReturn);
    });
    render(<User />);

    const quantityInput = screen.getByLabelText(/enter quantity/i);
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toHaveDisplayValue('0');

    await user.click(screen.getByRole('button'));

    waitFor(() => {
      expect(mockHttpGetUser).toHaveBeenCalledTimes(1);
      expect(mockHttpGetUser).toBeCalledWith(0);
    });

    await user.type(quantityInput, '1');
    await user.click(screen.getByRole('button'));
    waitFor(() => {
      expect(mockHttpGetUser).toHaveBeenCalledTimes(2);
      expect(mockHttpGetUser).toBeCalledWith(1);
    });

    const gender = await screen.findByText(/male/i);
    expect(gender).toBeInTheDocument();
  });
});
