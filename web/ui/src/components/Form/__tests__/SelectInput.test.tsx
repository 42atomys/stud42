import { fireEvent, render } from '@testing-library/react';
import SelectInput from '../SelectInput';

describe('SelectInput', () => {
  const objects = ['Object 1', 'Object 2', 'Object 3'];
  const selectedValue = objects[0];
  const onChange = jest.fn();

  it('renders the select input with the given objects', () => {
    const { getByText } = render(
      <SelectInput
        objects={objects}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    );
    const selectedObjectElement = getByText(selectedValue);
    expect(selectedObjectElement).toBeInTheDocument();
  });

  it('opens the options list when clicked', () => {
    const { getByText, getByRole } = render(
      <SelectInput
        objects={objects}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    );
    const selectButtonElement = getByRole('button');
    fireEvent.click(selectButtonElement);
    const optionsListElement = getByText(objects[1])
      .parentElement as HTMLElement;
    expect(optionsListElement).toBeInTheDocument();
  });

  it('calls the onChange callback with the selected object when clicked', () => {
    const { getByText, getByRole } = render(
      <SelectInput
        objects={objects}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    );
    const selectButtonElement = getByRole('button');
    fireEvent.click(selectButtonElement);
    const optionsListElement = getByText(objects[1])
      .parentElement as HTMLElement;
    fireEvent.click(optionsListElement);
    expect(onChange).toHaveBeenCalledWith(objects[1]);
  });
});
