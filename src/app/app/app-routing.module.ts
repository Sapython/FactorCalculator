import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppPage } from './app.page';

const routes: Routes = [
  {
    path: '',
    component: AppPage,
    children:[
      {
        path: 'bookings',
        loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule)
      },
      {
        path: 'contact-requests',
        loadChildren: () => import('./contact-requests/contact-requests.module').then( m => m.ContactRequestsPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPageRoutingModule {}
