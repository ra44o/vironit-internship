export interface IUser {
  _id: string;
  name: string;
  surname: string;
  is_user_active: boolean;
  fromCity?: string;
  login: string;
}
