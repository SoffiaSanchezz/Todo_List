import type { Observable } from "rxjs"
import type { LoginCredentials, User } from "../usecases/login.usecase"

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Observable<User>
  abstract logout(): Observable<void>
  abstract getCurrentUser(): Observable<User | null>
}
