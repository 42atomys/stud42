import { render } from '@testing-library/react'
import Tooltip from '@components/Tooltip'

it('renders homepage unchanged', () => {
  const { container } = render(<Tooltip text="tooltip-test">Test</Tooltip>)
  expect(container).toMatchSnapshot()
})