import { RootState } from "../../store";

export const selectUsers = (state: RootState) => state.users.data;

export const selectQuery = (state: RootState) => state.users.query;

export const selectUser = (state: RootState) => state.users.selectedUser;

export const selectIsDataValidate = (state: RootState) => state.users.isDataValidate;