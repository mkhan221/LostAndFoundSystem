import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserItemsService } from '../../services/user-items.service';
import { UserItemDetails } from '../../../models/UserItemDetails';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit
{
  item: UserItemDetails | null = null;
  loading = true;
  currentUser: any = null;
  claimMessage = '';

  constructor(
    private userItemsService: UserItemsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    // Load current user
    const userStr = localStorage.getItem('currentUser');
    if (userStr) this.currentUser = JSON.parse(userStr);

    // Load item by ID
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userItemsService.get(id).subscribe({
      next: (data) =>
      {
        this.item = data;
        this.loading = false;
      },
      error: (err) =>
      {
        console.error('Failed to load item', err);
        this.loading = false;
      }
    });
  }

  claimItem(): void
  {
    if (!this.currentUser || !this.item) return;

    // Only update relevant fields
    const updatePayload = { ...this.item, isfound: true };

    this.userItemsService.update(updatePayload).subscribe({
      next: () =>
      {
        this.claimMessage = 'Item successfully claimed!';
        if (this.item) this.item.isfound = true;
      },
      error: (err) =>
      {
        console.error(err);
        this.claimMessage = 'Failed to claim item.';
      }
    });
  }
}
