import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ReactElement } from 'react';

function Wrapper({ children }: { children: ReactElement }) {
  return <>{children}</>;
}

function render(ui: ReactElement, renderOptions?: Record<string, unknown>) {
  return rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

export * from '@testing-library/react';

export { render };
