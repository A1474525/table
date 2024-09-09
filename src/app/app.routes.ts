import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./table/components/mock-table/mock-table.component').then(
      comp => comp.MockTableComponent
    )
  }
];