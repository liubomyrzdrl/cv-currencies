import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../app/about/about.component';
import { MainComponent  } from '../app/main/main.component';
import { LocationComponent } from '../app/location/location.component';
import { EducationComponent } from '../app/education/education.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "about", component: AboutComponent },
  { path: "location", component: LocationComponent },
  { path: "education", component: EducationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
