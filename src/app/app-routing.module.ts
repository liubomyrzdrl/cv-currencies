import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../app/about/about.component';
import { LocationComponent } from '../app/location/location.component';
import { EducationComponent } from '../app/education/education.component';

const routes: Routes = [
  { path: "about", component: AboutComponent },
  { path: "location", component: AboutComponent },
  { path: "education", component: EducationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
