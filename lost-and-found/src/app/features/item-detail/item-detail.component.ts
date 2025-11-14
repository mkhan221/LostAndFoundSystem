// src/app/features/item-detail/item-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../../models/Item';
import { UserItemsService } from '../../services/user-items.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit
{
  item: Item | null = null;
  loading = true;
  currentUser: any = null;
  claimMessage = '';

  constructor(
    private userItemsService: UserItemsService,
    private itemsService: ItemsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    // Load current user
    const userStr = localStorage.getItem('currentUser');
    if (userStr) this.currentUser = JSON.parse(userStr);

    // Load item by ID
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemsService.get(id).subscribe({
      next: (data) =>
      {
        this.item = data;
        this.loading = false;
      },
      error: (err) =>
      {
        console.error(err);
        this.loading = false;
      }
    });
  }

  claimItem(): void
  {
    if (!this.currentUser || !this.item) return;

    this.userItemsService.claim(this.item.itemid!, this.currentUser.userid).subscribe({
      next: () =>
      {
        this.claimMessage = 'Item successfully claimed!';
        if (this.item) this.item.status = 'Found';
      },
      error: (err) =>
      {
        console.error(err);
        this.claimMessage = 'Failed to claim item.';
      }
    });
  }
}
