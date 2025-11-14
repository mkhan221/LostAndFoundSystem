// src/app/services/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User
{
  userid?: number;
  firstname: string;
  lastname: string;
  usertype: 'Student' | 'Staff' | 'Admin';
  email: string;
  password: string;
  phonenumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService
{
  private apiUrl = 'http://localhost:3000/users'; // adjust API URL

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]>
  {
    return this.http.get<User[]>(this.apiUrl);
  }

  login(email: string, password: string): Observable<User | null>
  {
    return this.getAll().pipe(
      map(users =>
      {
        console.table(users);
        const user = users.find(u => u.email === email && u.password === password);
        return user ?? null;
      })
    );
  }

  // src/app/services/items.service.ts
  claim(itemId: number, userId: number): Observable<any>
  {
    // Call UserItems API to mark as found / associate user
    const url = `http://localhost:3000/useritems/${itemId}`;
    const body = { isfound: true, claimedbyuserid: userId };
    return this.http.put(url, body);
  }

}
