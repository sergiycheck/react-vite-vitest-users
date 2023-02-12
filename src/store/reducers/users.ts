import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

export type User = {
  phone: string;
  name: string;
  nickname: string;
  email: string;
  position: string;
  photo: string;
};

const userAdapter = createEntityAdapter<User>({
  selectId: (entity) => entity.nickname,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = userAdapter.getInitialState({});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    upsertManyUsers(state, action: PayloadAction<User[]>) {
      userAdapter.upsertMany(state, action.payload);
    },
  },
});

export const { upsertManyUsers } = usersSlice.actions;

const selectSelf = (state: RootState) => state.users;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = userAdapter.getSelectors((state: RootState) => selectSelf(state));

export default usersSlice.reducer;
