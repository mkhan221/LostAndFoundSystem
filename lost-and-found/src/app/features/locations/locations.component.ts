import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../../models/Location';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit
{
  locations: Location[] = [];
  newLocation: Partial<Location> = {};
  loading = true;
  currentUser: any = null;

  constructor(private locationsService: LocationsService) { }

  ngOnInit(): void
  {
    // Load current user
    const userStr = localStorage.getItem('currentUser');
    if (userStr) this.currentUser = JSON.parse(userStr);

    if (!this.isAdmin()) return;

    this.loadLocations();
  }

  isAdmin(): boolean
  {
    return this.currentUser?.usertype === 'Admin';
  }

  loadLocations(): void
  {
    this.loading = true;
    this.locationsService.getAll().subscribe({
      next: (data) =>
      {
        this.locations = data;
        this.loading = false;
      },
      error: (err) =>
      {
        console.error('Failed to load locations', err);
        this.loading = false;
      }
    });
  }

  addLocation(): void
  {
    if (!this.newLocation.buildingname) return;

    this.locationsService.create(this.newLocation as Location).subscribe({
      next: (res) =>
      {
        this.newLocation = {};
        this.loadLocations(); // refresh list
      },
      error: (err) => console.error('Failed to create location', err)
    });
  }

  updateLocation(location: Location): void
  {
    this.locationsService.update(location).subscribe({
      next: () => this.loadLocations(),
      error: (err) => console.error('Failed to update location', err)
    });
  }

  deleteLocation(locationId: number): void
  {
    if (!confirm('Are you sure you want to delete this location?')) return;

    this.locationsService.delete(locationId).subscribe({
      next: () => this.loadLocations(),
      error: (err) => console.error('Failed to delete location', err)
    });
  }
}
