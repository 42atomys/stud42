import { Badge, BadgeColor } from '@components/Badge';
import { render } from '@testing-library/react';

describe('snapshots', () => {
  it('renders Badge unchanged', () => {
    const { container } = render(<Badge color="black" text="Testing" />);
    expect(container).toMatchSnapshot();
  });

  it('renders Badge with children unchanged', () => {
    const { container } = render(
      <Badge color="black">
        <i>Testing</i>
      </Badge>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders Badge with className unchanged', () => {
    const { container } = render(
      <Badge color="black" text="Testing" className="test" />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('color data', () => {
  [
    { color: 'purple', class: 'indigo', opacity: '500' },
    { color: 'fuchsia', class: 'fuchsia', opacity: '500' },
    { color: 'blue', class: 'cyan', opacity: '500' },
    { color: 'green', class: 'emerald', opacity: '500' },
    { color: 'yellow', class: 'yellow', opacity: '500' },
    { color: 'red', class: 'red', opacity: '500' },
    { color: 'orange', class: 'orange', opacity: '500' },
    { color: 'gray', class: 'slate', opacity: 500 },
    { color: 'white', class: 'gray', opacity: 200 },
    { color: 'black', class: 'gray', opacity: 900 },
  ].forEach(({ color, class: className, opacity }) => {
    it(`renders color data with ${color}`, () => {
      const { container } = render(
        <Badge color={color as BadgeColor} text="Testing" />,
      );
      expect(container.firstChild).toHaveClass(`bg-${className}-${opacity}/20`);
      expect(container.firstChild).toHaveClass(
        `border-${className}-${opacity}`,
      );
      expect(container.firstChild).toHaveClass(`text-${className}-700`);
      expect(container.firstChild).toHaveClass(`dark:text-${className}-300`);
      expect(container.firstChild).toHaveClass(
        `hover:bg-${className}-${opacity}/50`,
      );
    });
  });

  it('renders color data with transparent', () => {
    const { container } = render(<Badge color="transparent" text="Testing" />);
    expect(container.firstChild).toHaveClass('bg-transparent');
    expect(container.firstChild).toHaveClass('border-transparent');
  });
});

describe('children and text', () => {
  it('renders color data with text', () => {
    const { container } = render(<Badge color="transparent" text="Testing" />);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toContainHTML('Testing');
  });

  it('renders color data with children', () => {
    const { container } = render(
      <Badge color="transparent">
        <i>Testing</i>
      </Badge>,
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toContainHTML('<i>Testing</i>');
  });

  it('render color data with multiple children', () => {
    const { container } = render(
      <Badge color="transparent">
        <i>Testing 1</i>
        <b>Testing 2</b>
      </Badge>,
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toContainHTML(
      '<i>Testing 1</i><b>Testing 2</b>',
    );
  });
});
