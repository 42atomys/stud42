import { Switch } from '@components/Form';
import { fireEvent, render } from '@testing-library/react';

describe('Switch', () => {
  it('renders the switch with defaultChecked value', () => {
    const { container } = render(
      <Switch name="test-switch" defaultValue={true} onChange={() => {}} />
    );
    const inputElement = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    expect(inputElement.checked).toBe(true);
  });

  it('calls the onChange callback with the new checked value when clicked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Switch name="test-switch" onChange={onChange} />
    );
    const buttonElement = container.firstChild as HTMLButtonElement;
    fireEvent.click(buttonElement);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('changes the checked value when clicked', () => {
    const { container } = render(
      <Switch name="test-switch" onChange={() => {}} />
    );
    const buttonElement = container.firstChild as HTMLButtonElement;
    fireEvent.click(buttonElement);
    const inputElement = container.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    expect(inputElement.checked).toBe(true);
  });

  it('applies color style when provided', () => {
    const color = 'red';
    const { container } = render(
      <Switch name="test-switch" color={color} onChange={() => {}} />
    );
    const buttonElement = container.firstChild as HTMLButtonElement;
    const spanElement = buttonElement.querySelector('span') as HTMLSpanElement;

    expect(buttonElement).not.toHaveStyle({ backgroundColor: color });
    expect(spanElement).toHaveStyle({ backgroundColor: color });

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveStyle({ backgroundColor: color });
    expect(spanElement).not.toHaveStyle({ backgroundColor: color });
  });
});
