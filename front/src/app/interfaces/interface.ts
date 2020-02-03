export interface IToken {
  token: string;
  expiresIn: number;
}

export interface IAccessRefreshTokens {
  accessToken?: IToken;
  refreshToken?: IToken;
  msg?: string;
  user?: IUser;
}

export interface ICity {
  _id: string;
  city_name: string;
  foundation_year: number;
  is_city_active: boolean;
}

export interface ICreateUserResponse {
  user: IUser;
  accessToken: IToken;
  refreshToken: IToken;
  msg: string;
}

export interface IError {
  msg?: string;
}

export interface IUser {
  _id?: string;
  name?: string;
  surname?: string;
  is_user_active?: boolean;
  fromCity?: string;
  login?: string;
  password?: string;
  password_repeat?: string;
}

export interface IRegisterUser {
  name: string;
  surname: string;
  city_id: string;
  login: string;
  password: string;
}
