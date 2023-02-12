import React from 'react';
import { render, screen } from '@testing-library/react';
import { store } from '../src/store/store';
import { upsertManyUsers } from '../src/store/reducers/users';
import { TestProvider } from './test-helpers';
import { UserItem } from '../src/components/Users/UserItem';
import { act } from 'react-dom/test-utils';
import { UserModalItem } from '../src/components/Users/UserModal/UserModalItem';

describe('renders different user items', () => {
  const usersToUpsert = [
    {
      nickname: 'test_user_nick',
      email: 'test_user_email@gmail.com',
      phone: '+123345',
      position: 'test position',
      name: 'user test name',
      photo: '1.jpg',
    },
  ];

  beforeEach(() => {
    act(() => {
      store.dispatch(upsertManyUsers(usersToUpsert));
    });
  });

  afterEach(() => {
    act(() => {
      store.dispatch({ type: 'RESET_STATE' });
    });
  });

  it('renders user item', async () => {
    const [user] = usersToUpsert;

    render(
      <TestProvider>
        <UserItem username={user.nickname} setSelectedUserId={() => {}} />
      </TestProvider>
    );

    expect(screen.getByTestId('user_img')).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it('renders modal user item', async () => {
    const [user] = usersToUpsert;

    render(
      <TestProvider>
        <UserModalItem selectedUserId={user.nickname} />
      </TestProvider>
    );

    expect(screen.getByTestId('user_modal_img')).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.position)).toBeInTheDocument();
    expect(screen.getByText(user.phone)).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });
});
