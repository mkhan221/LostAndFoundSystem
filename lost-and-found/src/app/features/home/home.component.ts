import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../../models/Item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  items: Item[] = [];
  loading = true;
  currentUser: any = null;

  constructor(private itemsService: ItemsService, private router: Router) { }

  ngOnInit(): void
  {
    this.loadItems();

    // Check if a user is logged in
    const userStr = localStorage.getItem('currentUser');
    if (userStr) this.currentUser = JSON.parse(userStr);
  }

  loadItems(): void
  {
    this.loading = true;
    this.itemsService.getAll().subscribe({
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

  deleteItem(itemId: number): void
  {
    if (!this.currentUser || this.currentUser.usertype !== 'Admin') return;

    if (!confirm('Are you sure you want to delete this item?')) return;

    this.itemsService.delete(itemId).subscribe({
      next: () =>
      {
        // Remove item from list locally
        this.items = this.items.filter(i => i.itemid !== itemId);
      },
      error: (err) =>
      {
        console.error('Failed to delete item', err);
      }
    });
  }
}
