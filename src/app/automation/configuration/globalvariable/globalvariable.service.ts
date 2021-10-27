import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGlobalVariableModel } from './models/CreateGlobalVariableModel';
import { GlobalVariableModel } from './models/GlobalVariableModel';
import { ResultModel } from '../../../../app/commons/models/ResultModel';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';
import { UpdateGlobalVariableModel } from './models/UpdateGlobalVariableModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalvariableService {
  constructor(private http: HttpClient) {}

  getGlobalVariable(userId: string): Observable<GlobalVariableModel[]> {
    const url =
      environment.canaApiUrl + '/api/globalVariables?userId=' + userId;
    return this.http.get<GlobalVariableModel[]>(url);
  }

  createGlobalVariable(
    createGlobalVariable: CreateGlobalVariableModel
  ): Observable<ResultModel> {
    const url = environment.canaApiUrl + '/api/globalVariables';
    return this.http.post<ResultModel>(url, createGlobalVariable);
  }

  deleteGlobalVariable(
    globalVariableId: number,
    userId: string
  ): Observable<ErrorMessageModel[]> {
    const url =
      environment.canaApiUrl + '/api/globalVariables/' + globalVariableId;
    return this.http.delete<ErrorMessageModel[]>(url);
  }

  updateGlobalVariable(
    globalVariableId: number,
    updateGlobalVariable: UpdateGlobalVariableModel
  ): Observable<ErrorMessageModel[]> {
    const url =
      environment.canaApiUrl + '/api/globalVariables/' + globalVariableId;
    return this.http.put<ErrorMessageModel[]>(url, updateGlobalVariable);
  }

  getGlobalVariableById(
    globalVariableId: number
  ): Observable<GlobalVariableModel> {
    const url =
      environment.canaApiUrl + '/api/globalVariables/' + globalVariableId;
    return this.http.get<GlobalVariableModel>(url);
  }
}
