import { Injectable } from "@angular/core"
import type { Observable } from "rxjs"// import type { AuthRepository } from "../repositories/auth.repository"
import { AuthRepository } from "../repositories/auth.repository"

export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name?: string
}

@Injectable()
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) { }

  execute(credentials: LoginCredentials): Observable<User> {
    return this.authRepository.login(credentials)
  }
}
