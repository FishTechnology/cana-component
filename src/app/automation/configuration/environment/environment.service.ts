import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { environment } from 'src/environments/environment';
import { EnvironmentModel } from './models/EnvironmentModel';
import { CreateEnvironmentModel } from './models/CreateEnvironmentModel';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';
import { DeleteEnvironmentModel } from './models/DeleteEnvironmentModel';
import { UpdateEnvironmentModel } from './models/UpdateEnvironmentModel';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor(private httpClient: HttpClient) {}

  getEnvironment(applicationId: string): Observable<EnvironmentModel[]> {
    return this.httpClient.get<EnvironmentModel[]>(
      environment.canaApiUrl + `/api/applications/${applicationId}/environments`
    );
  }

  getEnvironmentById(environmentId: string): Observable<EnvironmentModel> {
    return this.httpClient.get<EnvironmentModel>(
      environment.canaApiUrl + '/api/environments/' + environmentId
    );
  }

  createEnvironment(
    createEnvironment: CreateEnvironmentModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + '/api/environments',
      createEnvironment
    );
  }
  deleteEnvironments(
    deleteEnvironmentModel: DeleteEnvironmentModel
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/environments',
      deleteEnvironmentModel
    );
  }

  deleteEnvironment(environmentId: string): Observable<ErrorMessageModel[]> {
    return this.httpClient.delete<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/environments/' + environmentId
    );
  }

  updateEnvironment(
    updateEnvironmentModel: UpdateEnvironmentModel,
    environmentId: string
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/environments/' + environmentId,
      updateEnvironmentModel
    );
  }
}
