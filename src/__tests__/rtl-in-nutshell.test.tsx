import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import Login from 'components/login';

describe('RTL using React and Jest ', () => {
  let container: HTMLDivElement, input: HTMLInputElement;
  beforeEach(() => {
    container = document.createElement('div');
    ReactDOM.render(<Login />, container);
    input = container.querySelector('input') as HTMLInputElement;
  });
  it('should render react component in a container div', () => {
    expect(input.type).toBe('text');
    expect(input.id).toBe('username');
  });
  it('should assert using jest-dom', () => {
    expect(input).toHaveAttribute('id', 'username');
  });
});

describe('RTL using custom render function', () => {
  function render(ui: ReactElement) {
    const container = document.createElement('div');
    ReactDOM.render(ui, container);

    return container;
  }

  it('should render a react component using custom render function', () => {
    const container = render(<Login />);
    const input = container.querySelector('input');
    const button = container.querySelector('button');

    expect(input).toHaveAttribute('id', 'username');
    expect(button).toHaveTextContent('Login');
  });
});
