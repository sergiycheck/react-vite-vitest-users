import React from 'react';
import Modal from '../shared/Modal';
import { EntityId } from '@reduxjs/toolkit';
import { UserItem } from './UserItem';
import { UserModalItem } from './UserModal/UserModalItem';
import './UserContainer.css';

export const UserContainer = ({ userNames }: { userNames: EntityId[] }) => {
  const [userNamesFetched, setUserNamesFetches] = React.useState<EntityId[]>();
  const [isAllUsersAreShown, setIsAllUsersAreShown] = React.useState(false);

  const [selectedUserId, setSelectedUserId] = React.useState<
    EntityId | undefined
  >(undefined);

  React.useEffect(() => {
    if (userNames && userNames.length > 3) {
      setUserNamesFetches(() => userNames.slice(0, 3));
      setIsAllUsersAreShown(() => false);
    } else {
      setUserNamesFetches(() => userNames.slice());
      setIsAllUsersAreShown(() => true);
    }
  }, [userNames]);

  return (
    <div className="user_items_container flex-gap-1">
      {userNamesFetched?.map((username) => (
        <UserItem
          username={username}
          key={username}
          setSelectedUserId={setSelectedUserId}
        />
      ))}

      <button
        className="view_btn"
        onClick={() => {
          if (!isAllUsersAreShown) {
            setUserNamesFetches(() => userNames.slice());
          } else {
            setUserNamesFetches(() => userNames.slice(0, 3));
          }
          setIsAllUsersAreShown(() => !isAllUsersAreShown);
        }}
      >
        {!isAllUsersAreShown ? 'View all' : 'Hide all'}
      </button>

      <Modal
        show={!!selectedUserId}
        showHeader={true}
        onClose={() => {
          setSelectedUserId(undefined);
        }}
      >
        {!!selectedUserId ? (
          <UserModalItem selectedUserId={selectedUserId} />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};
