import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDataComponent } from './pages/view-data/view-data.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'view', component: ViewDataComponent },
      { path: "**", redirectTo: "view" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
