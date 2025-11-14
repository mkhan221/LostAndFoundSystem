import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // add Router
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
    // Load items
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

    // Check if a user is logged in
    const userStr = localStorage.getItem('currentUser');
    if (userStr) this.currentUser = JSON.parse(userStr);
  }

  signOut(): void
  {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    // Optionally navigate to home page or refresh
    this.router.navigate(['/']);
  }
}
