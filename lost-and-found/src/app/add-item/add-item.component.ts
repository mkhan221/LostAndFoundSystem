import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent
{

  form = { description: '', category: '' };
  selectedFile: File | null = null;

  constructor(private itemsService: ItemsService, private router: Router) { }

  onFileSelected(event: any)
  {
    this.selectedFile = event.target.files[0] || null;
  }

  submitItem()
  {
    const formData = new FormData();
    formData.append("description", this.form.description);
    formData.append("category", this.form.category);
    formData.append("status", "Lost");
    if (this.selectedFile)
      formData.append("image", this.selectedFile);

    this.itemsService.create(formData).subscribe(() =>
    {
      this.router.navigate(['/']); // return to home
    });
  }
}
