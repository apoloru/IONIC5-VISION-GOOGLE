import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionService } from '../services/google-cloud-vision.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: any = [];
  constructor(private camera: Camera,
              private alertController: AlertController,
              private vision: GoogleCloudVisionService) {
  }

  saveResults(imageData, results) {
    console.log(imageData);
    console.log(results);
    this.items.push({ imageData, results});
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData).subscribe((result: any) => {
        this.saveResults(imageData, result.responses);
      }, err => {
        this.presentAlert('getLabels', err);
      });
    }, err => {
      this.presentAlert('Camera', err);
    });
  }


  async presentAlert(subHeader, message) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
