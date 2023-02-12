import { EntityId } from '@reduxjs/toolkit';
import { deployRepoName } from '../../consts';
import { useAppSelector } from '../../store/hooks';
import { selectUserById } from '../../store/reducers/users';

export const UserItem = ({
  username,
  setSelectedUserId,
}: {
  username: EntityId;
  setSelectedUserId: (id: EntityId) => void;
}) => {
  const user = useAppSelector((state) => selectUserById(state, username));
  return (
    <div className="user_item" data-testid="user_item">
      <div className="user_photo_bio flex-gap-1">
        <img
          data-testid="user_img"
          className="small_rounded_photo"
          src={
            import.meta.env.DEV
              ? `/foto/${user?.photo}`
              : `/${deployRepoName}/foto/${user?.photo}`
          }
          alt={`${user?.name}`}
        />

        <div>
          <p data-testid="user_name">{user?.name}</p>
          <span data-testid="user_email">{user?.email}</span>
        </div>
      </div>

      <div className="button_view">
        <button
          data-testid="view_user_item_btn"
          className="view_btn"
          onClick={() => {
            setSelectedUserId(username);
          }}
        >
          View
        </button>
      </div>
    </div>
  );
};
