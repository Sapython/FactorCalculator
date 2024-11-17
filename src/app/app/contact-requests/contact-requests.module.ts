import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactRequestsPageRoutingModule } from './contact-requests-routing.module';

import { ContactRequestsPage } from './contact-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactRequestsPageRoutingModule
  ],
  declarations: [ContactRequestsPage]
})
export class ContactRequestsPageModule {}
