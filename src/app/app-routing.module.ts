import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FoodStoreComponent} from './main-content/book-store/food-store.component';
import {LogInComponent} from './main-content/log-in/log-in.component';

const routes: Routes = [
  {path: '', component: LogInComponent},
  {path: 'dashboard', component: FoodStoreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
