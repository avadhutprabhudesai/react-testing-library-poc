import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReduxCounter from 'src/components/ReduxCounter';
import { render as rtlRender, screen } from 'test/test-utils';
import { reducer, store as appStore } from '../services/store';
import userEvent from '@testing-library/user-event';

/**
 * - render a redux connected component and interact with it
 * - check the behavior of the component when an initial state is passed to the redux store
 * - create a custom render function for redux connected components which facilitates wrapper, store and initialstate
 */
function render(ui: ReactElement, { store = appStore, ...options } = {}) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

describe.only('Testing redux connected component', () => {
  test('renders a redux connected component', () => {
    render(<ReduxCounter />);
    const buttons = screen.getAllByRole(/button/i);
    expect(buttons).toHaveLength(2);
  });
  test('user can increment the counter using increment button', async () => {
    const user = userEvent.setup();
    render(<ReduxCounter />);

    expect(screen.getByLabelText(/count/i)).toHaveTextContent('0');

    await user.click(screen.getByText(/inc/i));
    expect(screen.getByLabelText(/count/i)).toHaveTextContent('1');

    await user.click(screen.getByText(/dec/i));
    expect(screen.getByLabelText(/count/i)).toHaveTextContent('0');
  });
  test('store can accept initial state', async () => {
    const store = createStore(reducer, { count: 2 });
    render(<ReduxCounter />, { store });

    const user = userEvent.setup();
    await user.click(screen.getByText(/inc/i));

    expect(screen.getByLabelText(/count/i)).toHaveTextContent('3');
  });
});
