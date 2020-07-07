import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'user', component: ModalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
