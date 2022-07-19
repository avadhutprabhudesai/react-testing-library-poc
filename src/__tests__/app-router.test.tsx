import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'src/components/AppRouter';
import { render as rtlRender, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

/**
 * - AppRouter renders
 * - when window.history has current state as / then Home component is rendered
 * - About component is rendered when user clicks on the About link
 * - NoMatch component is rendered when no matching route is found
 */

function render(ui: ReactElement, { route = '/', ...options } = {}) {
  window.history.pushState({}, '', route);
  function wrapper({ children }: { children: ReactElement }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  return {
    ...rtlRender(ui, { wrapper, ...options }),
  };
}

describe('Testing react-router', () => {
  test('should render the AppRouter component', () => {
    render(<AppRouter />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });
  test('AppRouter should have a Home  and About links', () => {
    render(<AppRouter />);
    const links = screen.getAllByRole(/link/i);
    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
  });
  test('When user clicks on the Home link, Home component is rendered on the page', async () => {
    render(<AppRouter />);
    const user = userEvent.setup();

    await user.click(screen.getAllByRole(/link/i)[0]);

    const heading = await screen.findByRole(/heading/i);
    expect(heading).toHaveTextContent(/home/i);
  });
  test('When user clicks on the About link, About component is rendered on the page', async () => {
    render(<AppRouter />, { route: '/about' });

    const heading = await screen.findByRole(/heading/i);
    expect(heading).toHaveTextContent(/about/i);
  });
  test('When user navigates to the url that does not exist, NoMatch component is rendered on the page', async () => {
    render(<AppRouter />, { route: '/bad-route' });

    const heading = await screen.findByRole(/heading/i);
    expect(heading).toHaveTextContent(/nomatch/i);
  });
});
