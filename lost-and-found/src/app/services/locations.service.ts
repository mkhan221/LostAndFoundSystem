import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../../models/Location';

@Injectable({ providedIn: 'root' })
export class LocationsService
{
  private api = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) { }

  // Get all locations
  getAll(): Observable<Location[]>
  {
    return this.http.get<Location[]>(this.api);
  }

  // Get a single location by ID
  get(id: number): Observable<Location>
  {
    return this.http.get<Location>(`${this.api}/${id}`);
  }

  // Create a new location
  create(location: Location): Observable<{ locationId: number }>
  {
    return this.http.post<{ locationId: number }>(this.api, location);
  }

  // Update an existing location
  update(location: Location): Observable<any>
  {
    return this.http.put(this.api, location);
  }

  // Delete a location by ID
  delete(id: number): Observable<any>
  {
    return this.http.delete(`${this.api}/${id}`);
  }
}
