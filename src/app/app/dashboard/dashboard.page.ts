import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataProvider } from 'src/app/data-provider.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  max:number = 2
  current:number = 0.3
  readings:any[] = []
  
  constructor(private dataProvider:DataProvider,private databaseService:DatabaseService,private popoverController:PopoverController) { }

  ngOnInit() {
    this.databaseService.getAllReadings().then(res=>{
      res.forEach(doc=>{
        this.readings.push(doc.data())
      })
    })
  }

  async refresh(event:any){
    this.readings = []
    this.databaseService.getAllReadings().then(res=>{
      res.forEach(doc=>{
        this.readings.push(doc.data())
      })
      event.target.complete()
    })
  }

  async seeImage(link:string){
    const popOver = await this.popoverController.create({
      component:ImageLightboxComponent,
      componentProps:{
        image:link,
      },
      cssClass:'image-lightbox'
    })
    popOver.present()
  }
}
