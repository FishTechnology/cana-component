import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationModel } from './models/ApplicationModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateApplicationModel } from './models/CreateApplicationModel';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { UpdateApplicationModel } from './models/UpdateApplicationModel';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private httpClient: HttpClient) {}

  updateApplication(
    updateApplicationModel: UpdateApplicationModel,
    applicationId: number
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/applications/' + applicationId,
      updateApplicationModel
    );
  }

  createApplication(
    createApplication: CreateApplicationModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + '/api/applications',
      createApplication
    );
  }

  getApplicationByUserId(userId: string): Observable<ApplicationModel[]> {
    return this.httpClient.get<ApplicationModel[]>(
      environment.canaApiUrl + '/api/applications?userId=' + userId
    );
  }

  deleteApplication(applicationId: string): Observable<ErrorMessageModel[]> {
    return this.httpClient.delete<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/applications/' + applicationId
    );
  }

  getApplicationById(applicationId: bigint): Observable<ApplicationModel> {
    return this.httpClient.get<ApplicationModel>(
      environment.canaApiUrl + '/api/applications/' + applicationId
    );
  }
}
