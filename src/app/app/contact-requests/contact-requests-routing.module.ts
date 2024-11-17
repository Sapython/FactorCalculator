import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactRequestsPage } from './contact-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ContactRequestsPage
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRequestsPageRoutingModule {}
