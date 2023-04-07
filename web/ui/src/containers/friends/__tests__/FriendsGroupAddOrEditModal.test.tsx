import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  CreateOrUpdateFollowsGroupDocument,
  CreateOrUpdateFollowsGroupMutation,
  FollowsGroup,
  FollowsGroupKind,
} from '@graphql.d';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { FriendsGroupAddOrEditModal } from '../FriendsGroupAddOrEditModal';

const defaultgroup: Omit<FollowsGroup, 'id'> = {
  name: 'Test Group',
  color: '#ff0000',
  kind: FollowsGroupKind.MANUAL,
  slug: 'test-group',
};

const updatedGroup: FollowsGroup = {
  id: '1',
  name: 'Updated Group',
  color: '#ff0002',
  kind: FollowsGroupKind.MANUAL,
  slug: 'updated-group',
};

const mocks = (isUpdate: boolean) =>
  [
    {
      request: {
        query: CreateOrUpdateFollowsGroupDocument,
        variables: {
          input: {
            id: isUpdate ? updatedGroup.id : undefined,
            name: isUpdate ? updatedGroup.name : defaultgroup.name,
            color: isUpdate ? updatedGroup.color : defaultgroup.color,
          },
        },
      },
      newData: () => ({
        data: {
          createOrUpdateFollowsGroup: isUpdate ? updatedGroup : defaultgroup,
        } as CreateOrUpdateFollowsGroupMutation,
        loading: false,
      }),
    },
  ] as MockedResponse<CreateOrUpdateFollowsGroupMutation>[];

describe('FriendsGroupAddOrEditModal', () => {
  afterEach(cleanup);
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should create a new group and refetch the friends page', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks(false)} addTypename={false}>
        <FriendsGroupAddOrEditModal>Add Group</FriendsGroupAddOrEditModal>
      </MockedProvider>
    );
    expect(container.firstChild).not.toContain('friends-group-add-edit-modal');
    expect(container.firstChild).toHaveTextContent('Add Group');

    // Open the modal
    await waitFor(() => {
      screen.getByTestId('modal-opener').click();
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    });

    // Fill out the form
    await waitFor(() => {
      const nameInput = document.getElementById(
        'group-name'
      ) as HTMLInputElement;
      const colorInput = document.getElementById(
        'group-color'
      ) as HTMLInputElement;

      fireEvent.change(colorInput, { target: { value: defaultgroup.color } });
      fireEvent.change(nameInput, { target: { value: defaultgroup.name } });
    });

    // Submit the form
    await waitFor(() => {
      const submitButton = screen.getByTestId(
        'modal-action-1'
      ) as HTMLButtonElement;
      submitButton.click();
      expect(submitButton).toHaveAttribute('disabled');
      expect(submitButton).toHaveTextContent('Creating...');
    });

    // Check that the modal is closed
    await waitFor(() => {
      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    });
  });

  it('should update an existing group and refetch the friends page', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks(true)} addTypename={false}>
        <FriendsGroupAddOrEditModal {...defaultgroup} id={updatedGroup.id}>
          Edit Group
        </FriendsGroupAddOrEditModal>
      </MockedProvider>
    );
    expect(container.firstChild).not.toContain('friends-group-add-edit-modal');
    expect(container.firstChild).toHaveTextContent('Edit Group');

    // Open the modal
    await waitFor(() => {
      screen.getByTestId('modal-opener').click();
      expect(document.querySelector('[role="dialog"]')).toBeInTheDocument();
    });

    // Fill out the form
    await waitFor(() => {
      const nameInput = document.getElementById(
        'group-name'
      ) as HTMLInputElement;
      const colorInput = document.getElementById(
        'group-color'
      ) as HTMLInputElement;

      fireEvent.change(colorInput, { target: { value: updatedGroup.color } });
      fireEvent.change(nameInput, { target: { value: updatedGroup.name } });
    });

    // Submit the form
    await waitFor(() => {
      const submitButton = screen.getByTestId(
        'modal-action-1'
      ) as HTMLButtonElement;
      submitButton.click();
      expect(submitButton).toHaveAttribute('disabled');
      expect(submitButton).toHaveTextContent('Updating...');
    });

    // Check that the modal is closed
    await waitFor(() => {
      expect(document.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    });
  });
});
