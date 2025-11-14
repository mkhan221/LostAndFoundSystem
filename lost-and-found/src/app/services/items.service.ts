import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../models/Item';

@Injectable({ providedIn: 'root' })
export class ItemsService
{
  private api = 'http://localhost:3000/items';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]>
  {
    return this.http.get<Item[]>(this.api);
  }

  get(id: number): Observable<Item>
  {
    return this.http.get<Item>(`${this.api}/${id}`);
  }

  create(item: Item): Observable<any>
  {
    return this.http.post(this.api, item);
  }

  update(item: Item): Observable<any>
  {
    return this.http.put(this.api, item);
  }

  delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.api}/${id}`);
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
