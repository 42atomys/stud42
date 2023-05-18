import { AccountProvider } from '@graphql.d';
import { render } from '@testing-library/react';
import { ThridPartyBadge, ThridPartyUnkwownError } from '../ThridPartyBadge';
import { thridPartyData } from '../data';

describe('ThridPartyBadge component', () => {
  const props = {
    provider: AccountProvider.DISCORD,
    username: 'atom',
    providerAccountId: '123456',
  };

  const providers = Object.keys(thridPartyData).filter(
    (provider) => !!thridPartyData[provider as AccountProvider].link
  ) as AccountProvider[];

  providers.forEach((provider) => {
    it(`renders a link if data.link exists for ${provider}`, () => {
      const { container, getByRole } = render(
        <ThridPartyBadge {...props} provider={provider} />
      );
      expect(container.firstChild).toBeInTheDocument();

      const linkElement = getByRole('link');
      expect(linkElement).toHaveAttribute(
        'href',
        thridPartyData[provider].link?.(props.username).toString()
      );
    });
  });

  it('renders a tooltip with the correct icon', () => {
    const { getByTestId } = render(<ThridPartyBadge {...props} />);
    const icon = getByTestId(`thrid-party-${props.provider}`);
    const tooltip = getByTestId('tooltip');

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(thridPartyData[props.provider].name);

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(
      thridPartyData[props.provider].className as string
    );
  });

  it('throw an error if the provider is unknown', () => {
    const unknownProvider = 'unknown' as AccountProvider;
    expect(() =>
      render(<ThridPartyBadge {...props} provider={unknownProvider} />)
    ).toThrowError(ThridPartyUnkwownError);
  });
});
