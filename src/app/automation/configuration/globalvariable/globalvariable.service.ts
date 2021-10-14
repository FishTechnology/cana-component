import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGlobalVariable } from './models/CreateGlobalVariableModel';
import { GlobalVariableModel } from './models/GlobalVariableModel';
import { ResultModel } from '../../../../app/commons/models/ResultModel';

@Injectable({
  providedIn: 'root',
})
export class GlobalvariableService {
  constructor(private http: HttpClient) {}

  getGlobalVariable(userId: number): Observable<GlobalVariableModel[]> {
    const url = '';
    return this.http.get<GlobalVariableModel[]>(url);
  }

  createGlobalVariable(
    createGlobalVariable: CreateGlobalVariable
  ): Observable<ResultModel> {
    const url = '';
    return this.http.post<ResultModel>(url, createGlobalVariable);
  }
}
