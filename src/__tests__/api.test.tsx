import FavouriteNumber from 'components/FavouriteNumber';
import React from 'react';
import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

describe('Testing React Testing Library API', () => {
  it('should render a component using custom render method', () => {
    render(<FavouriteNumber />);
    const input = screen.getByLabelText(/enter number/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'fav-number');

    const message = screen.queryByRole(/alert/i);
    expect(message).not.toBeInTheDocument();
  });

  it('should re-render component with new props and update the dom accordingly', async () => {
    const { rerender } = render(<FavouriteNumber />);
    const user = userEvent.setup();
    const input = screen.getByLabelText(/enter number/i);
    await user.type(input, '123');

    expect(input).toBeInTheDocument();
    expect(input).toHaveDisplayValue('123');

    expect(screen.queryByRole(/alert/i)).not.toBeInTheDocument();

    rerender(<FavouriteNumber max={200} />);
    expect(screen.queryByRole(/alert/i)).toBeInTheDocument();
  });

  it('should capture rendered component in a DocumentFragment', async () => {
    const { asFragment } = render(<FavouriteNumber min={1} max={200} />);
    const initialRender = asFragment();

    const user = userEvent.setup();
    const input = screen.getByLabelText(/enter number/i);
    await user.type(input, '200');

    expect(initialRender).toMatchDiffSnapshot(asFragment());
  });
});
