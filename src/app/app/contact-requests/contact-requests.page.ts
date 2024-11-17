import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-contact-requests',
  templateUrl: './contact-requests.page.html',
  styleUrls: ['./contact-requests.page.scss'],
})
export class ContactRequestsPage implements OnInit {

  constructor(public databaseService:DatabaseService) { }
  ngOnInit() {
    this.databaseService.getContactRequests().subscribe((res)=>{
      this.databaseService.contactRequests = res;
    })
  }

}
