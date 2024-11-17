import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, doc, getDoc } from '@firebase/firestore';
import { Subject, Subscription } from 'rxjs';
import { DataProvider } from '../data-provider.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  docSubscription:Subscription = Subscription.EMPTY
  doneAuth:Subject<any> = new Subject();
  constructor(private auth:Auth,private fs:Firestore,private dataProvider:DataProvider) {
    authState(this.auth).subscribe((user)=>{
      if (user){
        this.dataProvider.isLoggedIn = true        
        console.log("user",user)
        docData(doc(this.fs,'users/'+user.uid)).subscribe((data)=>{
          this.doneAuth.next(user)
          this.dataProvider.userData = data
        })
      } else {
        this.doneAuth.next(user)
        this.dataProvider.isLoggedIn = false
      }
    })
  }

  async login(email:string, password:string){
    //send a request to login server
    try {
      let auth = await signInWithEmailAndPassword(this.auth,email, password)
      console.log("auth",auth)
      var res:any = await getDoc(doc(this.fs,'users/'+auth.user.uid))
      if(!res.exists()){
        res = await setDoc(doc(this.fs,'users/'+auth.user.uid),{
          email:auth.user.email,
          uid:auth.user.uid,
          registerDate: new Date()
        })
      }
      return [true,res,auth]
    } catch (error) {
      return [false,error]
    }
  }

  async signup(email:string, password:string){
    //send a request to login server
    try {
      let auth = await createUserWithEmailAndPassword(this.auth,email, password)
      console.log("auth",auth)
      var res:any = await getDoc(doc(this.fs,'users/'+auth.user.uid))
      if(!res.exists()){
        res = await setDoc(doc(this.fs,'users/'+auth.user.uid),{
          email:auth.user.email,
          uid:auth.user.uid,
          registerDate: new Date()
        })
        this.dataProvider.userData = {
          email:auth.user.email,
          uid:auth.user.uid,
          registerDate: new Date()
        }
      }
      return [true,res,auth]
    } catch (error) {
      return [false,error]
    }
  }
}

