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
    configId: string,
    configType: ConfigType
  ): Observable<ConfigModel> {
    return this.http.get<ConfigModel>(
      environment.canaApiUrl + `/api/configs/${configType}/${configId}`
    );
  }

  getConfigByUserId(
    userId: string,
    configType: ConfigType
  ): Observable<ConfigModel[]> {
    return this.http.get<ConfigModel[]>(
      environment.canaApiUrl + `/api/configs/${configType}?userId=${userId}`
    );
  }

  createConfig(
    configType: ConfigType,
    createConfigModel: CreateConfigModel
  ): Observable<ResultModel> {
    return this.http.post<ResultModel>(
      environment.canaApiUrl + `/api/configs/${configType}`,
      createConfigModel
    );
  }
}
