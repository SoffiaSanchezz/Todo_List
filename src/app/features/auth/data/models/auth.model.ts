export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  // Potentially more user data from the API
}
