import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAddMedia } from '../models/media-upload.model';
import { ApiService } from './api.service'
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/core-response-model/response.model';

type uploadMedia = ResponseAddMedia | any;

@Injectable({
  providedIn: 'root'
})

export class MediaUploadService extends ApiService<uploadMedia> {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  uploadMedia(folderName: string, file:any): Observable<ApiResponse<uploadMedia>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.postMedia(`/media-upload/mediaFiles/${folderName}`, formData);
  }
}
