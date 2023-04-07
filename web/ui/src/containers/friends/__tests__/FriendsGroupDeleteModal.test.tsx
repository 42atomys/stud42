import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  DeleteFollowsGroupDocument,
  DeleteFollowsGroupMutation,
  FollowsGroup,
  FollowsGroupKind,
} from '@graphql.d';
import { render, screen, waitFor } from '@testing-library/react';
import { FriendsGroupDeleteModal } from '../FriendsGroupDeleteModal';

const group: FollowsGroup = {
  id: '1',
  name: 'Test Group',
  color: '#FF0000',
  kind: FollowsGroupKind.MANUAL,
  slug: 'test-group',
};

const mocks = [
  {
    request: {
      query: DeleteFollowsGroupDocument,
      variables: { id: group.id },
    },
    newData: () => ({
      data: {
        deleteFollowsGroup: true,
      } as DeleteFollowsGroupMutation,
      loading: false,
    }),
  },
] as MockedResponse[];

describe('FriendsGroupDeleteModal', () => {
  it('should delete the group and refetch the friends page', async () => {
    jest.mock('framer-motion');

    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <FriendsGroupDeleteModal {...group}>
          Delete Group
        </FriendsGroupDeleteModal>
      </MockedProvider>
    );
    expect(container.firstChild).not.toContain('friends-group-delete-modal');
    expect(container.firstChild).toHaveTextContent('Delete Group');

    // Open the modal
    await waitFor(() => {
      screen.getByTestId('modal-opener').click();
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    });

    // Click on the delete button
    await waitFor(
      () => {
        const button = screen.getByTestId('modal-action-1');
        button.click();
        // Check that the mutation was called with the correct variables
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveTextContent('Deleting...');
      },
      { timeout: 0 }
    );

    // Check that the modal is closed
    await waitFor(() => {
      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    });
  });
});
