import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') this.isLoggedInSubject.next(true);
  }

  checkLogin() {
    if (this.isLoggedIn$) this.router.navigate(['/home'])
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSubject.next(true);

    this.router.navigate(['/home'])
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);

    this.router.navigate(['/login'])
  }
}
//import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
//export class AuthService {
//  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
//  isLoggedIn$ = this.isLoggedInSubject.asObservable();

//  login() {
//    // Simulate login logic
//    this.isLoggedInSubject.next(true);
//    console.log(this.isLoggedIn$)
//  }

//  logout() {
//    // Simulate logout logic
//    this.isLoggedInSubject.next(false);
//    console.log(this.isLoggedIn$)
//  }

//  isLoggedIn() {
//    console.log(this.isLoggedIn$)
//    return this.isLoggedIn$;
//  }
//}
