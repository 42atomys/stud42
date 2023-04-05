import { fireEvent, render } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInput', () => {
  const onChange = jest.fn();

  it('renders the input with the given default value', () => {
    const defaultValue = 'Hello, world!';
    const { getByLabelText } = render(
      <TextInput
        defaultValue={defaultValue}
        label="Test Input"
        onChange={onChange}
      />
    );
    const inputElement = getByLabelText('Test Input') as HTMLInputElement;
    expect(inputElement.value).toBe(defaultValue);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls the onChange callback with the new value when the input is changed', () => {
    const { getByLabelText } = render(
      <TextInput label="Test Input 2" onChange={onChange} />
    );
    const inputElement = getByLabelText('Test Input 2') as HTMLInputElement;
    const newValue = 'New value';
    fireEvent.change(inputElement, { target: { value: newValue } });
    expect(onChange).toHaveBeenCalledWith(newValue);
  });
});
