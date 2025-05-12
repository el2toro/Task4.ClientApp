import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsPageComponent } from "./pages/about-us-page/about-us-page.component";
import { EmployeesPageComponent } from "./pages/employees-page/employees-page.component";

const routes: Routes = [
  { path: '', component: AboutUsPageComponent },
  { path: 'employees', component: EmployeesPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmployeeFeatureRoutingModule { }