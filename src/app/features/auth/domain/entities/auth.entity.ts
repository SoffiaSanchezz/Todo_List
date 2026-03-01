export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserEntity {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
