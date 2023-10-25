import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(name: string, file: File) {
    console.log(file);
    
    let imgSize = 200000
    let fileSize = file.size
    if(fileSize <= imgSize){
    const formData = new FormData();
    formData.append('file', file);
   console.log(formData);
   
    return this.http.post(this.url + `api/Attachment/uploadFormFile`, formData);
  }else{
    return this.http.post(this.url + `api/Attachment/uploadFormFile`, {});
  }
  }
}
