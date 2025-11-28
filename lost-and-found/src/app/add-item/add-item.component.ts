import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../services/items.service';
import { UserItemsService } from '../services/user-items.service';
import { LocationsService } from '../services/locations.service';
import { Location } from '../../models/Location';
import { UserItem } from '../../models/UserItem';

@Component({
  selector: 'add-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit
{
  form = { description: '', category: '', locationid: null as number | null };
  selectedFile: File | null = null;
  locations: Location[] = [];
  currentUser: any = null;
  loadingLocations = true;

  constructor(
    private itemsService: ItemsService,
    private userItemsService: UserItemsService,
    private locationsService: LocationsService,
    private router: Router
  ) { }

  ngOnInit(): void
  {
    // Load logged-in user
    const userStr = localStorage.getItem('currentUser');
    if (userStr) this.currentUser = JSON.parse(userStr);

    // Load locations
    this.loadLocations();
  }

  loadLocations(): void
  {
    this.loadingLocations = true;
    this.locationsService.getAll().subscribe({
      next: (data) =>
      {
        this.locations = data;
        this.loadingLocations = false;
      },
      error: (err) =>
      {
        console.error('Failed to load locations', err);
        this.loadingLocations = false;
      }
    });
  }

  onFileSelected(event: any)
  {
    this.selectedFile = event.target.files[0] || null;
  }

  submitItem()
  {
    if (!this.currentUser) return alert('You must be logged in to add an item.');

    // Step 1: Create the Item
    const formData = new FormData();
    formData.append('description', this.form.description);
    formData.append('category', this.form.category);
    formData.append('status', 'Lost');
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.itemsService.create(formData).subscribe({
      next: (createdItem: any) =>
      {
        console.table(createdItem);

        // Use correct property from backend
        const createdItemId = createdItem.itemId;
        if (!createdItemId) return console.error('No itemId returned from ItemsService');

        // Step 2: Create the UserItem
        const userItem: UserItem = {
          itemid: createdItemId,
          postedbyuserid: this.currentUser.userid,
          locationid: this.form.locationid,
          dateposted: new Date(),
          isfound: false
        };

        this.userItemsService.create(userItem).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => console.error('Failed to create user-item record', err)
        });
      },
      error: (err) => console.error('Failed to create item', err)
    });
  }

}
