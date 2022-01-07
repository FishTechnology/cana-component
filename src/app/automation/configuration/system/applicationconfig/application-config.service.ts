import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { environment } from 'src/environments/environment';
import { ApplicationConfigModel } from './models/application-config-model';
import { CreateApplicationConfigModel } from './models/create-application-config-model';
import { UpdateApplicationConfigModel } from './models/update-application-config-model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigService {
  constructor(private httpClient: HttpClient) {}

  updateApplicationConfig(
    updateApplicationConfigModel: UpdateApplicationConfigModel,
    applicationId: string,
    applicationConfigId: string
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl +
        '/api/applications/' +
        applicationId +
        '/applicationConfigs' +
        applicationConfigId,
      updateApplicationConfigModel
    );
  }

  createApplicationConfig(
    createApplicationConfig: CreateApplicationConfigModel,
    applicationId: string
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + '/api/applications/' + applicationId,
      createApplicationConfig
    );
  }

  getApplicationByUserId(userId: string): Observable<ApplicationConfigModel[]> {
    return this.httpClient.get<ApplicationConfigModel[]>(
      environment.canaApiUrl + '/api/applications?userId=' + userId
    );
  }

  deleteApplication(applicationId: string): Observable<ErrorMessageModel[]> {
    return this.httpClient.delete<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/applications/' + applicationId
    );
  }

  getApplicationById(
    applicationId: bigint
  ): Observable<ApplicationConfigModel> {
    return this.httpClient.get<ApplicationConfigModel>(
      environment.canaApiUrl + '/api/applications/' + applicationId
    );
  }
}
