import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../app/about/about.component';
import { LocationComponent } from '../app/location/location.component';
import { EducationComponent } from '../app/education/education.component';
import { CurrenciesComponent } from '../app/currencies/currencies.component';
import { Page404Component } from '../app/page404/page404.component';

const routes: Routes = [
  { path: "", component: AboutComponent },
  { path: "curencies", component: CurrenciesComponent },
  { path: "location", component: LocationComponent },
  { path: "education", component: EducationComponent },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
