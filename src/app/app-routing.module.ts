import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FairsComponent } from './components/admin/fairs/fairs.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './profile/admin/admin/admin.component';
import {NewFairComponent} from './profile/admin/new-fair/new-fair.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoggedInGuard} from './guards/logged-in.guard';
import {AdminGuard} from './guards/admin.guard';
import {GuestGuard} from './guards/guest.guard';
import {CompanyComponent} from './components/company/company.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'fairs',  component: FairsComponent },
  { path: 'home',   component: HomeComponent},
    { path: 'company/:id', component: CompanyComponent, },
  { path: 'login',  component: LoginComponent, canActivate: [GuestGuard]},
  // Admin routes
  { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuard, AdminGuard]  },
  { path: 'admin/newfair', component: NewFairComponent, canActivate: [LoggedInGuard, AdminGuard] },
  { path: 'admin/fairs', component: FairsComponent, canActivate: [LoggedInGuard, AdminGuard] },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
