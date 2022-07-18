import React from 'react';
import Feedback from 'components/Feedback';
import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';
import { httpGetCategories } from 'api/http';

/**
 * Form contains
 * - text input with label Feedback Title and small text
 * - select with label category and small text
 * - text area with label Feedback Detail and small text
 * - a submit button with text Add Feedback
 *
 */

jest.mock('../api/http');
const mockHttpGetCategories = httpGetCategories as jest.Mock<
  Promise<Category[]>
>;
const mockCategories = [
  {
    id: 1,
    title: 'Option 1',
  },
  {
    id: 2,
    title: 'Option 2',
  },
];

mockHttpGetCategories.mockImplementation(() => Promise.resolve(mockCategories));

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Testing feedback form UI structure', () => {
  test('There should be a form for accepting product feedback from user', async () => {
    render(<Feedback />);
    const feedbackForm = await screen.findByRole(/form/i);
    expect(feedbackForm).toBeInTheDocument();
  });

  test('Feedback form should have a text input with label "Feedback Title"', async () => {
    render(<Feedback />);
    const titleInput = (await screen.findByLabelText(
      /feedback title/i
    )) as HTMLInputElement;

    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe('');
  });
  test('Feedback title input field should have a description', async () => {
    render(<Feedback />);
    const feedbackDesc = await screen.findByText(
      /add a short, descriptive headline/i
    );

    expect(feedbackDesc).toBeInTheDocument();
  });

  test('Feedback form should have a dropdown with title "Category"', async () => {
    render(<Feedback />);
    const categories = await screen.findByLabelText(/Category/i);

    expect(categories).toBeInTheDocument();
    expect(categories).toBeInstanceOf(HTMLSelectElement);
  });
  test('Category dropdown should have a description', async () => {
    render(<Feedback />);
    const categoryDesc = await screen.findByText(
      /choose a category for your feedback/i
    );

    expect(categoryDesc).toBeInTheDocument();
  });
  test('Category dropdown should have 5 options', async () => {
    render(<Feedback />);

    await screen.findAllByText(/option/i);

    const options = await screen.findAllByRole(/option/i);

    expect(options).toHaveLength(3);
  });
  test('Category dropdown should have "Please select a category" as default option', async () => {
    render(<Feedback />);

    await screen.findAllByText(/option/i);

    const category = await screen.findByLabelText(/category/i);
    expect(category).toHaveDisplayValue(/please select a category/i);
  });

  test('Feedback form should have a textarea with title "Feedback Details"', async () => {
    render(<Feedback />);

    const details = await screen.findByLabelText(/feedback details/i);

    expect(details).toBeInTheDocument();
    expect(details).toBeInstanceOf(HTMLTextAreaElement);
  });
  test('Feedback Details should have a description', async () => {
    render(<Feedback />);
    const detailsDesc = await screen.findByText(
      /include any specific comments/i
    );

    expect(detailsDesc).toBeInTheDocument();
  });

  test('Feedback form should have a button with text "Add feedback"', async () => {
    render(<Feedback />);
    const addButton = (await screen.findByText(
      /add feedback/i
    )) as HTMLButtonElement;

    expect(addButton).toBeInstanceOf(HTMLButtonElement);
    expect(addButton.type).toBe('submit');
  });
  test('Feedback form should have a button with text "Cancel"', async () => {
    render(<Feedback />);
    const cancelButton = (await screen.findByText(
      /cancel/i
    )) as HTMLButtonElement;

    expect(cancelButton).toBeInstanceOf(HTMLButtonElement);
    expect(cancelButton.type).toBe('submit');
  });
});

describe('Testing feedback form behavior', () => {
  test('feedback input should have focus by default', async () => {
    render(<Feedback />);

    const input = await screen.findByLabelText(/feedback title/i);

    expect(input).toHaveFocus();
  });
  test('feedback input should receive focus after clicking on its label', async () => {
    render(<Feedback />);
    const user = userEvent.setup();

    const input = (await screen.findByLabelText(
      /feedback title/i
    )) as HTMLInputElement;
    input.blur();

    const title = await screen.findByLabelText(/feedback title/i);
    await user.click(title);

    expect(input).toHaveFocus();
  });
  test('user should be able to enter text in the input field', async () => {
    render(<Feedback />);
    const user = userEvent.setup();
    const input = (await screen.findByLabelText(
      /feedback title/i
    )) as HTMLInputElement;

    await user.type(input, 'UI should be accessible');

    expect(input).toHaveDisplayValue(/ui should be accessible/i);
  });
  test('feedback category should receive focus after clicking on its label', async () => {
    render(<Feedback />);
    const user = userEvent.setup();
    const category = await screen.findByLabelText(/category/i);

    await user.click(category);

    expect(category).toHaveFocus();
  });
  test('feedback details should receive focus after clicking on its label', async () => {
    render(<Feedback />);
    const user = userEvent.setup();
    const detailsLabel = await screen.findByText(/feedback details/i);

    await user.click(detailsLabel);
    const details = await screen.findByLabelText(/feedback details/i);

    expect(details).toHaveFocus();
  });
  test('user should be able to choose options from the select dropdown', async () => {
    render(<Feedback />);
    const user = userEvent.setup();
    const category = await screen.findByLabelText(/category/i);

    await screen.findAllByText(/option/i);

    await user.selectOptions(category, screen.getByText(/option 2/i));
    expect(category).toHaveValue('Option 2');
  });
  test('user should be able to enter text in the text area', async () => {
    render(<Feedback />);
    const user = userEvent.setup();

    const details = await screen.findByLabelText(/feedback details/i);

    await user.type(details, 'More screenreader support');

    expect(details).toHaveDisplayValue(/more screenreader support/i);
  });
});

describe('Testing feedback form validations', () => {
  test('An error message below title field is shown if a form is submitted with an empty title', async () => {
    render(<Feedback />);
    const addButton = await screen.findByText(/add feedback/i);

    const user = userEvent.setup();

    await user.click(addButton);

    const titleError = await screen.findByText(
      /please provide title for the feedback/i
    );

    expect(titleError).toBeInTheDocument();
  });
  test('An error message below category field is shown if a form is submitted with default option', async () => {
    render(<Feedback />);
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText(/title/i), 'Unit testing');
    const addButton = await screen.findByText(/add feedback/i);

    await user.click(addButton);

    const categoryError = await screen.findByText(
      /please select a category for the feedback/i
    );

    expect(categoryError).toBeInTheDocument();
  });
  test('An error message below details field is shown if a form is submitted with empty details', async () => {
    render(<Feedback />);
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText(/title/i), 'Unit testing');
    await user.selectOptions(
      await screen.findByLabelText(/category/i),
      'Option 2'
    );
    const addButton = await screen.findByText(/add feedback/i);

    await user.click(addButton);

    const detailsError = await screen.findByText(
      /please provide details for the feedback/i
    );

    expect(detailsError).toBeInTheDocument();
  });
});
