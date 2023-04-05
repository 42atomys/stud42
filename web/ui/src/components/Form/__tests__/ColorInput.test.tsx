import { fireEvent, render } from '@testing-library/react';
import ColorInput from '../ColorInput';

describe('ColorInput', () => {
  const onChange = jest.fn();

  it('renders the color input with the given default value', () => {
    const defaultValue = '#ff0000';
    const { container } = render(
      <ColorInput
        defaultValue={defaultValue}
        label="Test Color Input"
        onChange={onChange}
      />
    );
    const labelElement = container.querySelector(
      'label>span'
    ) as HTMLSpanElement;
    const colorInputElement = container.querySelector('input[type="color"]');

    expect(labelElement).toHaveTextContent('Test Color Input');
    expect(colorInputElement).toHaveAttribute('value', defaultValue);
  });

  it('calls the onChange callback with the selected color when the value changes', () => {
    const { container } = render(
      <ColorInput label="Test Color Input" onChange={onChange} />
    );
    const colorInputElement = container.querySelector('input[type="color"]');

    const newColorValue = '#00ff00';
    expect(colorInputElement).toBeDefined();

    fireEvent.change(colorInputElement as Element, {
      target: { value: newColorValue },
    });
    expect(onChange).toHaveBeenCalledWith(newColorValue);
  });
});
