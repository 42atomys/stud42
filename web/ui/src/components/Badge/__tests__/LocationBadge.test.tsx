import { LocationBadge } from '@components/Badge';
import { render } from '@testing-library/react';

const validLocation = {
  beginAt: '2022-10-25T00:00:00Z',
  endAt: null,
  identifier: 'paul-f1Ar1s1',
  campus: {
    country: 'France',
    name: 'Paris',
  },
};

describe('snapshots', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-12-25T00:00:00Z'));
  });
  it('renders LocationBadge unchanged', () => {
    const { container } = render(<LocationBadge location={null} />);
    expect(container).toMatchSnapshot();
  });

  it('renders LocationBadge with offline location unchanged', () => {
    const { container } = render(
      <LocationBadge location={{ endAt: '2022-10-25T00:00:00Z' }} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders LocationBadge with online location unchanged', () => {
    const { container } = render(<LocationBadge location={validLocation} />);
    expect(container).toMatchSnapshot();
  });
});

describe('contexts', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-12-25T00:00:00Z'));
  });
  it('renders offline location', async () => {
    const { findByTestId } = render(
      <LocationBadge location={{ endAt: '2022-10-25T00:00:00Z' }} />,
    );
    const container = await findByTestId('badge');

    expect(container.firstChild).toHaveClass('bg-slate-500');
    expect(container.childNodes).toHaveLength(2);

    const tooltip = await findByTestId('tooltip');
    expect(tooltip).toHaveTextContent('October 25, 2022 00:00');
  });

  it('renders offline location without location information', async () => {
    const { findByTestId } = render(<LocationBadge location={null} />);
    const container = await findByTestId('badge');

    expect(container.firstChild).toHaveClass('bg-slate-500');
    expect(container.childNodes).toHaveLength(2);
    expect(container).toHaveTextContent('offline');
  });

  it('renders online location', async () => {
    const { findByTestId, findByTitle } = render(
      <LocationBadge location={validLocation} />,
    );
    const container = await findByTestId('badge');

    expect(container.firstChild).toHaveClass('bg-emerald-500');
    expect(container.childNodes).toHaveLength(3);
    expect(container).toHaveTextContent(validLocation.identifier);

    const icon = await findByTitle('Paris');
    expect(icon).toBeTruthy();
    expect(icon).toHaveProperty(
      'src',
      'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1eb-1f1f7.svg',
    );
    expect(icon).toHaveProperty('alt', '🇫🇷');

    const link = await findByTestId('location-badge-link');
    expect(link.getAttribute('href')).toContain(
      `/clusters/paris/paul-f1A?identifier=${validLocation.identifier}`,
    );
  });
});
