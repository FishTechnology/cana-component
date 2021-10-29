import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentVariableModel } from './models/EnvironmentVariableModel';
import { environment } from 'src/environments/environment';
import { CreateEnvVariableModel } from './models/CreateEnvVariableModel';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';
import { UpdateEnvVariableModel } from './models/UpdateEnvVariableModel';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentVariableService {
  constructor(private httpClient: HttpClient) {}

  getEnvVariablesByEnvId(
    environmentId: number
  ): Observable<EnvironmentVariableModel[]> {
    const url =
      environment.canaApiUrl +
      '/api/environments/' +
      environmentId +
      '/envVariables';
    return this.httpClient.get<EnvironmentVariableModel[]>(url);
  }

  getEnvVariablesById(
    environmentId: number,
    envVariableId: number
  ): Observable<EnvironmentVariableModel> {
    const url =
      environment.canaApiUrl +
      '/api/environments/' +
      environmentId +
      '/envVariables/' +
      envVariableId;
    return this.httpClient.get<EnvironmentVariableModel>(url);
  }

  createEnvVariable(
    environmentId: number,
    createEnvVariableModel: CreateEnvVariableModel
  ): Observable<ResultModel> {
    const url =
      environment.canaApiUrl +
      '/api/environments/' +
      environmentId +
      '/envVariables';
    return this.httpClient.post<ResultModel>(url, createEnvVariableModel);
  }

  updateEnvVariable(
    environmentId: number,
    envVariableId: number,
    updateEnvVariableModel: UpdateEnvVariableModel
  ) {
    const url =
      environment.canaApiUrl +
      '/api/environments/' +
      environmentId +
      '/envVariables/' +
      envVariableId;
    return this.httpClient.put<ErrorMessageModel[]>(
      url,
      updateEnvVariableModel
    );
  }

  deleteEnvVariable(
    environmentId: number,
    envVariableId: number,
    userid: string
  ) {
    const url =
      environment.canaApiUrl +
      '/api/environments/' +
      environmentId +
      '/envVariables/' +
      envVariableId +
      '?userid=' +
      userid;

    return this.httpClient.delete<ErrorMessageModel[]>(url);
  }
}
