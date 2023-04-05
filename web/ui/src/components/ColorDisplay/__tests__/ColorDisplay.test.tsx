import { render } from '@testing-library/react';
import { ColorDisplay } from '../ColorDisplay';

describe('ColorDisplay', () => {
  it('renders the div with the given background color', () => {
    const color = '#ff0000';
    const { container } = render(<ColorDisplay color={color} />);
    const divElement = container.firstChild as HTMLDivElement;
    expect(divElement).toHaveStyle({
      backgroundColor: color,
      outlineColor: color,
    });
  });

  it('renders the div with transparent background color when color prop is not given', () => {
    const { container } = render(<ColorDisplay color={null} />);
    const divElement = container.firstChild as HTMLDivElement;
    expect(divElement).toHaveStyle({
      backgroundColor: 'transparent',
      outlineColor: '',
    });
  });

  it('renders the div with transparent background color when color prop is not a valid color', () => {
    const { container } = render(<ColorDisplay color={'invalid'} />);
    const divElement = container.firstChild as HTMLDivElement;
    expect(divElement.style.backgroundColor).toBe('');
  });
});
