import { Component, OnInit } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController, ToastController } from '@ionic/angular';
import { DataProvider } from '../data-provider.service';
import { DatabaseService } from '../services/database.service';
import { Reading } from '../structure/types.structure';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage implements OnInit {
  modalOpen: boolean = false;
  storage = getStorage()
  kWhImage:string = ''
  kVahImage:string = ''
  constructor(private loadingCtrl:LoadingController,private toastController: ToastController,private databaseService:DatabaseService,public dataProvider:DataProvider) { }
  appPages = [
    {
      url:'dashboard',
      icon:'home',
      title:'Dashboard'
    },
  ]
  ngOnInit() {
  }

  calculationForm:FormGroup = new FormGroup({
    kiloWattHours: new FormControl('',Validators.required),
    kiloVoltAmpHour: new FormControl('',Validators.required),
  });

  async submitReadings(){
    if(this.calculationForm.valid){
      try {
        const loader = await this.loadingCtrl.create({
          message:'Adding ...'
        })
        loader.present()
        // get yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let prevReses = await this.databaseService.getPreviousReading(yesterday.toLocaleString())
        if(prevReses.docs.length>0){
          let previousReadingRes = prevReses.docs[0].data() as Reading
          let finalVolAmpHour = Number(this.calculationForm.value.kiloVoltAmpHour) - Number(previousReadingRes.kiloVoltAmpHour)
          let finalkiloWattHour = Number(this.calculationForm.value.kiloWattHours) - Number(previousReadingRes.kiloWattHours)
          let powerFactor = (finalkiloWattHour/finalVolAmpHour).toFixed(2)
          let data:Reading = {
            date: new Date(),
            kiloVoltAmpHour: this.calculationForm.value.kiloVoltAmpHour,
            dateId: new Date().toLocaleString(),
            kiloWattHours: this.calculationForm.value.kiloWattHours,
            powerFactor: powerFactor,
            kiloVoltAmpHourImage: this.kVahImage,
            kiloWattHoursImage: this.kWhImage
          }
          let dataRes = await this.databaseService.addReading(data)
          this.toastController.create({
            message:"Reading is added"
          })
        } else {
          let data:Reading = {
            date: new Date(),
            kiloVoltAmpHour: this.calculationForm.value.kiloVoltAmpHour,
            dateId: new Date().toLocaleString(),
            kiloWattHours: this.calculationForm.value.kiloWattHours,
            powerFactor:(Number(this.calculationForm.value.kiloWattHours)/Number(this.calculationForm.value.kiloVoltAmpHour)).toFixed(2),
            kiloVoltAmpHourImage: this.kVahImage,
            kiloWattHoursImage: this.kWhImage
          }
          let dataRes = await this.databaseService.addReading(data)
          this.toastController.create({
            message:"Reading is added."
          })
        }
        loader.dismiss()
        this.modalOpen=false;
      } catch (error:any) {
        console.error(error)
        this.toastController.create({
          message:error,
          duration:2000
        })
      }
    } else {
      // console.error("Please fill all fields")
      alert("Please fill all details")
    }
  }

  async takeKiloVoltPhoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    const fileLoading = await this.loadingCtrl.create({
      message: 'Uploading ...'
    })
    fileLoading.present()
    console.log(image)
    if (image.webPath){
      let response = await fetch(image.webPath);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      let file = new File([data], (new Date()).toLocaleString()+".jpg", metadata);
      console.log(file)
      this.kVahImage = await this.upload('images/'+this.dataProvider.userData.uid+'/KVAhImages/'+file.name,file)
      fileLoading.dismiss()
      const cotrl = await this.toastController.create({
        message:"Image uploaded",
        duration:2000
      })
      cotrl.present()
    } else {
      const cotrl = await this.toastController.create({
        message:"Something went wrong",
        duration:2000
      })
      cotrl.present()
      fileLoading.dismiss()
    }
  }

  async takeKiloWattPhoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    console.log(image)
    const fileLoading = await this.loadingCtrl.create({
      message: 'Uploading ...'
    })
    fileLoading.present()
    if (image.webPath){
      let response = await fetch(image.webPath);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      let file = new File([data], (new Date()).toLocaleString()+".jpg", metadata);
      console.log(file)
      this.kWhImage = await this.upload('images/'+this.dataProvider.userData.uid+'/KwhImages/',file)
      fileLoading.dismiss()
      const cotrl = await this.toastController.create({
        message:"Image uploaded",
        duration:2000
      })
      cotrl.present()
    } else {
      const cotrl = await this.toastController.create({
        message:"Something went wrong",
        duration:2000
      })
      cotrl.present()
      fileLoading.dismiss()
    }
  }

  async upload(
    path: string,
    file: File | ArrayBuffer | Blob | Uint8Array
  ): Promise<any> {
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      return false;
    }
  }
}
