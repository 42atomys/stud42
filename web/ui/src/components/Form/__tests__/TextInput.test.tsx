import { fireEvent, render, waitFor } from '@testing-library/react';
import TextInput from '../TextInput';

const defaultValue = 'Hello, world!';
const updatedValue = 'Hello, you!';

describe('TextInput', () => {
  const onChange = jest.fn();

  it('renders the input with the given default value', async () => {
    render(
      <TextInput
        type="text"
        name="test-input"
        label="Test Input"
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
    const inputElement = document.getElementById(
      'test-input'
    ) as HTMLInputElement;

    // Check that the input is rendered
    await waitFor(() => {
      expect(inputElement.value).toBe(defaultValue);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('calls the onChange callback with the new value when the input is changed', async () => {
    render(
      <TextInput
        type="text"
        name="test-input"
        label="Test Input"
        onChange={onChange}
      />
    );
    const inputElement = document.getElementById(
      'test-input'
    ) as HTMLInputElement;

    // Check that the color input is rendered
    expect(inputElement).toBeDefined();

    // Fill out the form
    await waitFor(() => {
      fireEvent.change(inputElement, { target: { value: updatedValue } });
      expect(onChange).toHaveBeenCalledWith(updatedValue);
    });
  });
});
