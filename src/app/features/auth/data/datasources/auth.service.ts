import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequestModel, LoginResponseModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    // Simulate API call
    console.log('Simulating API login call with:', request);

    if (request.email === 'test@example.com' && request.password === 'password') {
      return of({
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        userId: '123',
        email: request.email,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
