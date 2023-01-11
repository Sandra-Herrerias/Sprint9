import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersStored!: User[];

  private allusers$ = new Subject<User[]>();
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  constructor(private route: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));//estat inicial del BehaviorSubject
    this.user = this.userSubject.asObservable();////part public del Behabiour Subject que s'hi actualitza
    this.usersStored = [];
  }

  login(user: User) {
    this.usersStored = JSON.parse(localStorage.getItem('users')!);

    if (this.usersStored == null ||
      this.usersStored == undefined) {
      this.usersStored = [];
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);

    if (user.role){
      this.route.navigate(['/profile']);
    }
  }


  logout(): void {
    localStorage.removeItem("currentUser");
    this.userSubject.next(JSON.parse(null!));

    this.route.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });
  }

  register(user: User) {

    this.usersStored = JSON.parse(localStorage.getItem('users')!);
    if (this.usersStored == null ||
      this.usersStored == undefined) {
      this.usersStored = [];
    }
    this.usersStored.push(user);

    localStorage.setItem('users', JSON.stringify(this.usersStored));

    this.allusers$.next(this.usersStored);
    this.login(user);
  }

  getUsers$(): Observable<User[]> {
    return this.allusers$.asObservable();
  }

  getUsersStored(): User[] {
    this.usersStored = JSON.parse(localStorage.getItem('users')!);
    return this.usersStored;
  }

  public usuariData(): User | any {
    // return this.usuariSubject;
    return this.userSubject.value;
  }
}
