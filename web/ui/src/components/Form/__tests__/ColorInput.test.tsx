import { ColorInput } from '@components/Form';
import { fireEvent, render, waitFor } from '@testing-library/react';

const defaultValue = '#ff0000';
const updatedValue = '#00ff00';

describe('ColorInput', () => {
  const onChange = jest.fn();

  it('renders the color input with the given default value', () => {
    const { container } = render(
      <ColorInput
        defaultValue={defaultValue}
        name="test-color-input"
        label="Test Color Input"
        onChange={onChange}
      />
    );
    const labelElement = container.querySelector(
      'label>span'
    ) as HTMLSpanElement;
    const colorInputElement = document.getElementById(
      'test-color-input'
    ) as HTMLInputElement;

    expect(labelElement).toHaveTextContent('Test Color Input');
    expect(colorInputElement).toHaveAttribute('value', defaultValue);
  });

  it('calls the onChange callback with the selected color when the value changes', async () => {
    render(
      <ColorInput
        name="test-color-input"
        label="Test Color Input"
        onChange={onChange}
      />
    );
    const colorInputElement = document.getElementById(
      'test-color-input'
    ) as HTMLInputElement;

    // Check that the color input is rendered
    expect(colorInputElement).toBeDefined();

    // Fill out the form
    await waitFor(() => {
      fireEvent.change(colorInputElement as Element, {
        target: { value: updatedValue },
      });
      expect(onChange).toHaveBeenCalledWith(updatedValue);
    });
  });
});
