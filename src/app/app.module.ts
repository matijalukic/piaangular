import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FairsComponent } from './components/fairs/fairs.component';
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
    ImageUploadComponent
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
