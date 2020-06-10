import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartDashboardComponent } from './chart-dashboard/chart-dashboard.component';

const routes: Routes = [{
  path: '', component: ChartDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
