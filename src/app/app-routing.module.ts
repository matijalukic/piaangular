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
import {ParticipationsComponent} from './components/company/participations/participations.component';
import {CompanyGuard} from './guards/company.guard';
import {InsertJobComponent} from './components/company/jobs/insert-job/insert-job.component';
import {FindCompanyComponent} from './components/student/find-company/find-company.component';
import {FindJobComponent} from './components/student/find-job/find-job.component';
import {SingleJobComponent} from './components/student/single-job/single-job.component';
import {MyApplicationsComponent} from './components/student/my-applications/my-applications.component';
import {StudentGuard} from './guards/student.guard';
import {ViewJobComponent} from './components/company/view-job/view-job.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileOptionsComponent} from './components/profile/profile-options/profile-options.component';
import {FairShowComponent} from './components/fair-show/fair-show.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'fairs',  component: FairsComponent },
    { path: 'home',   component: HomeComponent},
    { path: 'company/:id', component: CompanyComponent, },
    { path: 'job/:id', component: SingleJobComponent, },
    { path: 'fair/:id', component: FairShowComponent, },
    { path: 'login',  component: LoginComponent, canActivate: [GuestGuard]},
    { path: 'register',  component: RegisterComponent, canActivate: [GuestGuard]},

    // User routes
    { path: 'panel', component: ProfileOptionsComponent, canActivate: [LoggedInGuard]},

    // Student routes
    { path: 'student/find/company', component: FindCompanyComponent, canActivate: [LoggedInGuard, StudentGuard]},
    { path: 'student/find/job', component: FindJobComponent, canActivate: [LoggedInGuard, StudentGuard]},
    { path: 'student/myapplications', component: MyApplicationsComponent, canActivate: [LoggedInGuard, StudentGuard]},

    // Company routes
    { path: 'panel/participations', component: ParticipationsComponent, canActivate: [LoggedInGuard, CompanyGuard]},
    { path: 'panel/insert/job', component: InsertJobComponent, canActivate: [LoggedInGuard, CompanyGuard]},
    { path: 'panel/view/job/:id', component: ViewJobComponent, canActivate: [LoggedInGuard, CompanyGuard]},

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
