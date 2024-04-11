export interface ILoginResponse {
  success: boolean;
  href: string | null;
  errors: string[] | null;
}

export interface ICurrentUserResponse {
  success: boolean;
  id: number | null;
  name: string | null;
}

export interface IUser {
  id: number | null;
  name: string | null;
}
