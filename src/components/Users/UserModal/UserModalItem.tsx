import { EntityId } from '@reduxjs/toolkit';
import { deployRepoName } from '../../../consts';
import { useAppSelector } from '../../../store/hooks';
import { selectUserById } from '../../../store/reducers/users';
import styles from './UserModalItem.module.css';

export const UserModalItem = ({
  selectedUserId,
}: {
  selectedUserId: EntityId;
}) => {
  const user = useAppSelector((state) => selectUserById(state, selectedUserId));

  return (
    <div
      className={styles.user_modal_item_container}
      data-testid="user_modal_item"
    >
      <div className={`${styles.user_photo_bio} flex-gap-1`}>
        <img
          data-testid="user_modal_img"
          className={styles.medium_rounded_photo}
          src={
            import.meta.env.DEV
              ? `/foto/${user?.photo}`
              : `/${deployRepoName}/foto/${user?.photo}`
          }
          alt={`${user?.name}`}
        />

        <div className={styles.user_bio}>
          <h3 data-testid="user_modal_name">{user?.name}</h3>
          <span className={styles.text_gray} data-testid="user_modal_position">
            {user?.position}
          </span>
        </div>
      </div>

      <div className={styles.user_description}>
        <div className={styles.info_container}>
          <div className={styles.info}>
            <h3>Phone</h3>
            <p data-testid="user_modal_phone">{user?.phone}</p>
          </div>
        </div>
        <div className={styles.info_container}>
          <div className={styles.info}>
            <h3>URL</h3>
            <p>
              <a
                href="https://example.com"
                target="_blank"
                data-testid="user_modal_url"
              >
                https://example.com
              </a>
            </p>
          </div>
        </div>
        <div className={styles.info_container}>
          <div className={styles.info}>
            <h3>Email</h3>
            <p data-testid="user_modal_email">{user?.email}</p>
          </div>
        </div>

        <button
          className={styles.view_btn}
          data-testid="user_modal_send_msg_btn"
        >
          Send message
        </button>
      </div>
    </div>
  );
};
