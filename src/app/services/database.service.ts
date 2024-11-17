import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { DataProvider } from '../data-provider.service';
import { Reading } from '../structure/types.structure';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  contactRequests:any[] = []
  constructor(private fs:Firestore,private dataProvider:DataProvider) { }

  addReading(data:Reading){
    return addDoc(collection(this.fs,'users/'+this.dataProvider.userData.uid+'/readings'),data)
  }

  getReading(data:Reading){
    return getDoc(doc(this.fs,'users/'+this.dataProvider.userData.uid+'/readings/'+data.id))
  }

  getPreviousReading(date:string){
    return getDocs(query(collection(this.fs,'users/'+this.dataProvider.userData.uid+'/readings'),where('dateId','==',date)))
  }

  getAllReadings(){
    return getDocs(query(collection(this.fs,'users/'+this.dataProvider.userData.uid+'/readings'),orderBy('date','desc')))
  }

  deleteReading(data:Reading){
    return getDoc(doc(this.fs,'users/'+this.dataProvider.userData.uid+'/readings/'+data.id))
  }

  updateReading(data:Reading){
    return updateDoc(doc(this.fs,'users/'+this.dataProvider.userData.uid+'/readings/'+data.id),data)
  }

  getBookings(){
    return collectionData(query(collection(this.fs,'bookings'),orderBy('date','desc')),{idField:'id'})
  }

  getContactRequests(){
    return collectionData(query(collection(this.fs,'contactRequests')),{idField:'id'})
  }
}
