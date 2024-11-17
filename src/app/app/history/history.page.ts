import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  bookings:Booking[] = []
  constructor(private databaseService:DatabaseService) { }

  ngOnInit() {
    this.databaseService.getBookings().subscribe((res:any[])=>{
      this.bookings = res
      if (this.bookings.length==0){
        this.bookings = [
          {
            id:'1',
            date:Timestamp.now(),
            persons:[
              {
                name:'John Doe',
                type:'adult',
                age:25,
                gender:'male',
              },
              {
                name:'John Doe',
                type:'adult',
                age:25,
                gender:'male',
              },
              {
                name:'John Doe',
                type:'child',
                age:25,
                gender:'male',
              }
            ],
            room:{
              id:'1',
              image:'',
              name:'Single Room',
              price:1000,
              description:'A single room',
              type:'single'
            },
            details:{
              name:'John Doe',
              phone:'1234567890',
              email:'',
              address:''
            },
            checkInDate:Timestamp.now(),
            checkOutDate:Timestamp.now(),
            billing:{
              subTotal:1000,
              tax:18,
              grandTotal:1180
            }
          },
        ]
      }
    })
  }

}

export type Booking = {
  id:string,
  date:Timestamp,
  persons:Person[],
  room:Room,
  details:BasicDetails;
  checkInDate:Timestamp,
  checkOutDate: Timestamp,
  billing:Billing;
}
export type Billing = {
  subTotal:number,
  tax:number,
  grandTotal:number
}
export type BasicDetails = {
  name:string,
  phone:string,
  email:string,
  address:string;
  message?:string;
}
export type Person = {
  name:string,
  type:'adult'|'child',
  age:number,
  gender:'male'|'female'
}
export type Room = {
  id:string,
  image:string,
  name:string,
  price:number,
  description:string
  type:'single'|'double'
}