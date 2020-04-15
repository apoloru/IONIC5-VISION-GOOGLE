import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleCloudVisionService {

  constructor(public http: HttpClient) { }

  getLabels(base64Image) {
    const body = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'FACE_DETECTION'
            }
          ]
        }
      ]
    };
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body);
    }
}

