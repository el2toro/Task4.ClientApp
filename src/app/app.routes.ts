import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        loadChildren: () => 
          import('./features/employee-feature/employee-feature.module').then((m) => m.EmployeeFeatureModule)
    }
];
