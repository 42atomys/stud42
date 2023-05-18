import { UserFlag } from '@graphql.d';
import { render } from '@testing-library/react';
import { FlagBadge } from '../FlagBadge';
import { flagData } from '../data';

describe('FlagBadge', () => {
  it('renders the flag icon', () => {
    const flag = UserFlag.BETA;
    const { container } = render(<FlagBadge flag={flag} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent(flagData[flag].name);
  });

  it('renders tooltip with name and description', () => {
    const flag = UserFlag.BETA;
    const { container } = render(<FlagBadge flag={flag} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent(
      flagData[flag].description as string
    );
  });

  it('renders tooltip with custom classes', async () => {
    const flag = UserFlag.BETA;
    const { findByTestId } = render(<FlagBadge flag={flag} />);
    const icon = await findByTestId(`flag-${flag}`);

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(flagData[flag].className as string);
  });

  const flags = Object.keys(flagData).filter(
    (flag) => !!flagData[flag as UserFlag].link
  ) as UserFlag[];
  flags.forEach((flag) => {
    it(`renders a link if data.link exists for ${flag}`, () => {
      const { container, getByRole } = render(<FlagBadge flag={flag} />);
      expect(container.firstChild).toBeInTheDocument();

      const linkElement = getByRole('link');
      expect(linkElement).toHaveAttribute(
        'href',
        flagData[flag].link?.().toString()
      );
    });
  });

  it('does not render a link if data.link is undefined', () => {
    const flag = UserFlag.BETA;
    const { container, getByRole } = render(<FlagBadge flag={flag} />);
    expect(container.firstChild).toBeInTheDocument();

    expect(() => getByRole('link')).toThrow();
  });
});
