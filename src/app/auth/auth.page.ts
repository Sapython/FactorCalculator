import { Component, OnInit } from '@angular/core';
import { docData } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  mode:'login'|"signup"|"loading" = 'loading'
  constructor(private loadingCtrl:LoadingController,private auth:AuthService,private toastController: ToastController,private router:Router) { }
  loginForm:FormGroup = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
  ngOnInit() {
    this.auth.doneAuth.subscribe((res)=>{
      this.mode = 'login'
      if(res!=null){
        this.router.navigate(['../home/contact-requests'])
        console.log("Navigated")
      }
      console.log(res);
    })
  }

  async login(){
    if(this.loginForm.valid){
      const res = await this.loadingCtrl.create({
        message:'Logging in...'
      })
      res.present()
      const loginReq = await this.auth.login(this.loginForm.value.email,this.loginForm.value.password)
      if (loginReq[0]){
        const toast = await this.toastController.create({
          message: 'Logged In!',
          duration: 1500,
          position: 'bottom'
        });
        
        await toast.present();
        res.dismiss()
      } else {
        const toast = await this.toastController.create({
          message: loginReq[1],
          duration: 2000,
          position: 'bottom'
        });
        await toast.present();
        res.dismiss()
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill all the details!',
        duration: 1500,
        position: 'bottom'
      });
  
      await toast.present();
    }

  }

  async signup(){
    if(this.loginForm.valid){
      const res = await this.loadingCtrl.create({
        message:'Signing up...'
      })
      res.present()
      const loginReq = await this.auth.signup(this.loginForm.value.email,this.loginForm.value.password)
      if (loginReq[0]){
        const toast = await this.toastController.create({
          message: 'Logged In!',
          duration: 1500,
          position: 'bottom'
        });
        
        await toast.present();
        res.dismiss()
      } else {
        const toast = await this.toastController.create({
          message: loginReq[1],
          duration: 2000,
          position: 'bottom'
        });
        await toast.present();
        res.dismiss()
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill all the details!',
        duration: 1500,
        position: 'bottom'
      });
  
      await toast.present();
    }
  }

}
