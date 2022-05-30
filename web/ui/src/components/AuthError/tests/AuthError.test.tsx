import { render } from '@testing-library/react';
import { AuthError } from '@components/AuthError';

it('snapshot: renders Tooltip unchanged', () => {
  const { container } = render(<AuthError error="default" />);
  expect(container).toMatchSnapshot();
});

it('render correct data when error is an ErrorType', async () => {
  const container = render(<AuthError error="callback" />);

  expect(container.getByText('Callback error')).toBeInTheDocument();
  expect(
    container.getByText('An error occured while processing the callback')
  ).toBeInTheDocument();
});

it('render correct data when error is not defined', async () => {
  const container = render(<AuthError error={null} />);

  expect(container.getByText('An error occured')).toBeInTheDocument();
  expect(
    container.getByText('An error occured, please try again later')
  ).toBeInTheDocument();
});

it('render correct data when error is not included', async () => {
  // @ts-ignore
  const container = render(<AuthError error="testvaluedontmatch" />);

  expect(container.getByText('An error occured')).toBeInTheDocument();
  expect(
    container.getByText('An error occured, please try again later')
  ).toBeInTheDocument();
});
