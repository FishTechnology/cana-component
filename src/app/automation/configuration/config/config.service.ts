import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ConfigModel from './models/config-model';
import { environment } from 'src/environments/environment';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { CreateConfigModel } from './models/create-config-model';
import { ConfigType } from './models/config-type';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private readonly http: HttpClient) {}

  getConfigById(
    appId: string,
    configId: string,
    configType: ConfigType
  ): Observable<ConfigModel> {
    return this.http.get<ConfigModel>(
      environment.canaApiUrl +
        `/api/applications/${appId}/configs/${configType}/${configId}`
    );
  }

  getConfigByAppId(
    appId: string,
    configType: ConfigType,
    identifier?: string
  ): Observable<ConfigModel[]> {
    return this.http.get<ConfigModel[]>(
      environment.canaApiUrl +
        `/api/applications/${appId}/configs/${configType}`
    );
  }

  createConfig(
    appId: string,
    configType: ConfigType,
    createConfigModel: CreateConfigModel
  ): Observable<ResultModel> {
    return this.http.post<ResultModel>(
      environment.canaApiUrl +
        `/api/applications/${appId}/configs/${configType}`,
      createConfigModel
    );
  }
}
