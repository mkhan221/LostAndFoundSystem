import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserItemsService } from '../../services/user-items.service'; // Updated service
import { UserItemDetails } from '../../../models/UserItemDetails';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  items: UserItemDetails[] = [];
  loading = true;
  currentUser: any = null;

  constructor(private userItemsService: UserItemsService, private router: Router) { }

  ngOnInit(): void
  {
    this.loadItems();

    // Check if a user is logged in
    const userStr = localStorage.getItem('currentUser');
    if (userStr) this.currentUser = JSON.parse(userStr);
  }

  isAdmin(): boolean
  {
    return this.currentUser?.usertype === 'Admin';
  }


  loadItems(): void
  {
    this.loading = true;
    this.userItemsService.getAll().subscribe({
      next: (data) =>
      {
        this.items = data;
        this.loading = false;
      },
      error: (err) =>
      {
        console.error('Error loading items', err);
        this.loading = false;
      }
    });
  }

  signOut(): void
  {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  deleteItem(userItemId: number): void
  {
    if (!this.currentUser || this.currentUser.usertype !== 'Admin') return;

    if (!confirm('Are you sure you want to delete this item?')) return;

    this.userItemsService.delete(userItemId).subscribe({
      next: () =>
      {
        // Remove item from list locally
        this.items = this.items.filter(i => i.useritemid !== userItemId);
      },
      error: (err) =>
      {
        console.error('Failed to delete item', err);
      }
    });
  }
}
