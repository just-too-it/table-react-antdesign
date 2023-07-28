export interface User {
  id: any;
  name: string;
  age: number;
  birthday: string;
  profession: string;
}

export interface UsersState {
  data: User[];
  query: string;
  selectedUser: User | null;

  isDataValidate: boolean;
}
