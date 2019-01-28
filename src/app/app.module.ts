import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FairsComponent } from './components/fairs/fairs.component';
import { FairsComponent as AdminFairsComponent } from './components/admin/fairs/fairs.component';
import { FairComponent } from './fair/fair.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './profile/admin/admin/admin.component';
import { NewFairComponent } from './profile/admin/new-fair/new-fair.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OneComponent } from './components/steps/one/one.component';
import { TwoComponent } from './components/steps/two/two.component';
import { ThreeComponent } from './components/steps/three/three.component';
import { FourComponent } from './components/steps/four/four.component';
import { ImageUploadComponent } from './components/steps/image-upload/image-upload.component';
import { CompanyComponent } from './components/company/company.component';
import { ParticipationsComponent } from './components/company/participations/participations.component';
import { PermitComponent } from './components/company/permit/permit.component';
import { InsertJobComponent } from './components/company/jobs/insert-job/insert-job.component';
import { JobComponent } from './components/company/job/job.component';
import { FindCompanyComponent } from './components/student/find-company/find-company.component';
import { CardCompanyComponent } from './components/student/card-company/card-company.component';
import { JobOfferComponent } from './components/student/job-offer/job-offer.component';
import { FindJobComponent } from './components/student/find-job/find-job.component';
import { SingleJobComponent } from './components/student/single-job/single-job.component';
import { ApplicationComponent } from './components/student/application/application.component';
import { MyApplicationsComponent } from './components/student/my-applications/my-applications.component';
import { ViewJobComponent } from './components/company/view-job/view-job.component';
import { AcceptApplicationComponent } from './components/company/accept-application/accept-application.component';
import { RateApplicationComponent } from './components/student/rate-application/rate-application.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileOptionsComponent } from './components/profile/profile-options/profile-options.component';
import { SingleFairComponent } from './components/single-fair/single-fair.component';
import { FairShowComponent } from './components/fair-show/fair-show.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FairsComponent,
    FairComponent,
    HomeComponent,
    AdminComponent,
    NewFairComponent,
    NotFoundComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent,
    FourComponent,
    ImageUploadComponent,
    AdminFairsComponent,
    CompanyComponent,
    ParticipationsComponent,
    PermitComponent,
    InsertJobComponent,
    JobComponent,
    FindCompanyComponent,
    CardCompanyComponent,
    JobOfferComponent,
    FindJobComponent,
    SingleJobComponent,
    ApplicationComponent,
    MyApplicationsComponent,
    ViewJobComponent,
    AcceptApplicationComponent,
    RateApplicationComponent,
    RegisterComponent,
    ProfileOptionsComponent,
    SingleFairComponent,
    FairShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
