import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ItemsService } from './services/items.service';
import { provideHttpClient } from '@angular/common/http';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { ItemDetailComponent } from './features/item-detail/item-detail.component';
import { AddItemComponent } from './add-item/add-item.component';
import { LocationsComponent } from './features/locations/locations.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        providers: [ItemsService, provideHttpClient()]

    },
    { path: 'sign-in', component: SignInComponent },
    { path: 'item/:id', component: ItemDetailComponent },
    { path: 'add-item', component: AddItemComponent },
    { path: 'locations', component: LocationsComponent }
];
