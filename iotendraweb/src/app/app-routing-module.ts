import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { HomeComponent } from './features/dashboard/home.component';
import { SensorsComponent } from './features/sensors/sensors.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/login', component: AuthComponent },
  { path: 'auth/register', component: AuthComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
