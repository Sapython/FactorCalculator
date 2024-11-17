import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { actionSheetController } from '@ionic/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  booking:any;
  constructor(private routeSnapshot:ActivatedRoute,private databaseService:DatabaseService) {
    routeSnapshot.params.subscribe((res:any)=>{
      console.log(res);
      // booking =res;
      if(res.id){
        this.booking = this.databaseService.contactRequests.find((booking)=> booking.id == res.id)
      }
    })
  }
  ngOnInit() {
  }

}
