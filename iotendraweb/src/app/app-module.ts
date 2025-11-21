import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthComponent } from './features/auth/auth.component';
import { HomeComponent } from './features/dashboard/home.component';
import { SensorsComponent } from './features/sensors/sensors.component';

@NgModule({
  declarations: [
    App,
    AuthComponent,
    HomeComponent,
    SensorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
