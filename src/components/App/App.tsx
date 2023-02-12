import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUsersIds, upsertManyUsers } from '../../store/reducers/users';
import { UserContainer } from '../Users/UserContainer';

import './App.css';
import jsonUsers from '../../assets/initData.json';

export function App() {
  const dispatch = useAppDispatch();
  const userNames = useAppSelector((store) => selectUsersIds(store));

  React.useEffect(() => {
    dispatch(upsertManyUsers(jsonUsers));
  }, []);

  return (
    <div className="App">
      <div className="container mx-auto p-1">
        <h2>Users demo app v1</h2>
      </div>
      <div className="container mx-auto p-1">
        <UserContainer userNames={userNames} />
      </div>
    </div>
  );
}
