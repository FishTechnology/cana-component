import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/ResultModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private httpClient: HttpClient) {}

  // async readFile(file: File): Promise<string | ArrayBuffer> {
  //   return new Promise<string | ArrayBuffer>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       return resolve((e.target as FileReader).result);
  //     };
  //     reader.onerror = (e) => {
  //       console.error(`FileReader failed on file ${file.name}.`);
  //       return reject(null);
  //     };
  //     if (!file) {
  //       console.error('No file to read.');
  //       return reject(null);
  //     }
  //     reader.readAsDataURL(file);
  //   });
  // }

  uploadFile(formData: FormData) {
    const url = environment.canaApiUrl + '/api/fileUpload';
    return this.httpClient.post<ResultModel>(url, formData);
  }
}
