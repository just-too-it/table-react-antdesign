import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UsersState } from "./users.types";

const initialState: UsersState = {
  data: [],
  query: "",
  selectedUser: null,

  isDataValidate: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.data = [...state.data, action.payload];
    },
    editUser(state, action: PayloadAction<User>) {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
          // eslint-disable-next-line no-else-return
        } else {
          return item;
        }
      });
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },

    setDataValidate(state, action: PayloadAction<boolean>) {
      state.isDataValidate = action.payload;
    },
  },
});

export const { addUser, setQuery, setSelectedUser, setDataValidate, editUser } =
  usersSlice.actions;
export default usersSlice.reducer;
