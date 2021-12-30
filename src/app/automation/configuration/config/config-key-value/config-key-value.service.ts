import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { environment } from 'src/environments/environment';
import ConfigKeyValueModel from '../models/config-key-value-model';
import { ConfigType } from '../models/config-type';
import CreateConfigKeyValueModel from './models/create-config-key-value-model';

@Injectable({
  providedIn: 'root',
})
export class ConfigKeyValueService {
  constructor(private readonly http: HttpClient) {}

  getConfigKeyValue(environmentId: string): Observable<ConfigKeyValueModel[]> {
    return this.http.get<ConfigKeyValueModel[]>(
      environment.canaApiUrl + `/api/configs/${environmentId}/keyValues`
    );
  }

  public createConfigKeyValue(
    configType: ConfigType,
    configId: string,
    createConfigKeyValueModel: CreateConfigKeyValueModel
  ): Observable<ResultModel> {
    return this.http.post<ResultModel>(
      environment.canaApiUrl +
        `/api/configs/${configType}/${configId}/keyValues`,
      createConfigKeyValueModel
    );
  }
}
