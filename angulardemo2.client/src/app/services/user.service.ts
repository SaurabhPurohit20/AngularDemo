// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../admin/crud/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> { return this.http.get<User[]>('/api/get'); }

  addUser(user: User): Observable<User> { return this.http.post<User>('api/insert', user); }

  updateUser(user: User): Observable<User> { return this.http.put<User>('api/update', user); }

  deleteUser(id: number): Observable<User> { return this.http.delete<any>('api/delete/' + id); }
}
