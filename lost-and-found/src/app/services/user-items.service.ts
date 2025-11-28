// src/app/services/user-items.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserItem } from '../../models/UserItem';
import { UserItemDetails } from '../../models/UserItemDetails';

@Injectable({ providedIn: 'root' })
export class UserItemsService
{
  private api = 'http://localhost:3000/useritems';

  constructor(private http: HttpClient) { }

  // Get all user items with details (for listing on home page)
  getAll(): Observable<UserItemDetails[]>
  {
    return this.http.get<UserItemDetails[]>(this.api);
  }

  // Get a single user item with details by ID
  get(id: number): Observable<UserItemDetails>
  {
    return this.http.get<UserItemDetails>(`${this.api}/${id}`);
  }

  // Create a new user item (UserItem only)
  create(userItem: UserItem): Observable<any>
  {
    return this.http.post(this.api, userItem);
  }

  // Update an existing user item (UserItem only)
  update(userItem: UserItem): Observable<any>
  {
    if (!userItem.useritemid) throw new Error('useritemid is required for update');
    return this.http.put(`${this.api}/${userItem.useritemid}`, userItem);
  }

  // Delete a user item (by useritemid)
  delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.api}/${id}`);
  }

  /**
   * Mark an item as claimed by a user
   * @param userItemId ID of the user-item record
   * @param userId ID of the user claiming the item
   */
  claim(userItemId: number, userId: number): Observable<any>
  {
    const body = { isfound: true, claimedbyuserid: userId };
    return this.http.put(`${this.api}/${userItemId}`, body);
  }
}
