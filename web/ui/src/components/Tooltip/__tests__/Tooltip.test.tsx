import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Tooltip from '@components/Tooltip'

it('snapshot: renders Tooltip unchanged', () => {
  const { container } = render(<Tooltip text="tooltip-test">Test</Tooltip>)
  expect(container).toMatchSnapshot()
})

it('state: hover changes', async () => {
  render(<Tooltip text="test-tooltip">Test</Tooltip>);

  fireEvent.mouseEnter(screen.getByTestId('hover-target'));
  await waitFor(() => screen.getByTestId('tooltip'))
  
  expect(screen.getByTestId('tooltip')).toHaveClass("opacity-100 z-10 ml-4")
  expect(screen.getByTestId('tooltip')).not.toHaveClass("opacity-0 ml-1")


  fireEvent.mouseLeave(screen.getByTestId('hover-target'));
  await waitFor(() => screen.getByTestId('tooltip'))

  expect(screen.getByTestId('tooltip')).toHaveClass("opacity-0 ml-1")
  expect(screen.getByTestId('tooltip')).not.toHaveClass("opacity-100 z-10 ml-4")
})