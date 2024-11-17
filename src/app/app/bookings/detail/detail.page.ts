import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor() { }
  booking = {
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
  };
  ngOnInit() {
  }

}
