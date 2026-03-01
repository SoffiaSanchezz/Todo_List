import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import { AuthRepository } from "../../domain/repositories/auth.repository"
import type { LoginCredentials, User } from "../../domain/usecases/login.usecase"

@Injectable()
export class AuthRepositoryImpl extends AuthRepository {
  private currentUser: User | null = null

  login(credentials: LoginCredentials): Observable<User> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (credentials.email && credentials.password.length >= 6) {
          const user: User = {
            id: "1",
            email: credentials.email,
            name: "Demo User",
          }
          this.currentUser = user
          observer.next(user)
          observer.complete()
        } else {
          observer.error({ message: "Invalid email or password" })
        }
      }, 1000)
    })
  }

  logout(): Observable<void> {
    this.currentUser = null
    return of(void 0).pipe(delay(500))
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.currentUser)
  }
}
