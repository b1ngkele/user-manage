export interface IUser {
  name: string;
  status: UserStatus,
  age: number,
  address: string;
}

enum UserStatus {
  delete = 0,
  unDelete = 1,
}