import TooltipDefault, { Tooltip } from '@components/Tooltip';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

it('snapshot: renders Tooltip unchanged', () => {
  const { container } = render(
    <TooltipDefault text="tooltip-test">Test</TooltipDefault>
  );
  expect(container).toMatchSnapshot();
});

it('state: hover changes', async () => {
  render(<Tooltip text="test-tooltip">Test</Tooltip>);

  fireEvent.mouseEnter(screen.getByTestId('hover-target'));
  await waitFor(() => screen.getByTestId('tooltip'));

  expect(screen.getByTestId('tooltip')).toHaveClass('visible z-10');
  expect(screen.getByTestId('tooltip')).not.toHaveClass('invisible');

  fireEvent.mouseLeave(screen.getByTestId('hover-target'));
  await waitFor(() => screen.getByTestId('tooltip'));

  expect(screen.getByTestId('tooltip')).toHaveClass('invisible');
  expect(screen.getByTestId('tooltip')).not.toHaveClass('visible z-10');
});
