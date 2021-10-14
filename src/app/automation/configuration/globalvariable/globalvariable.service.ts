import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGlobalVariableModel } from './models/CreateGlobalVariableModel';
import { GlobalVariableModel } from './models/GlobalVariableModel';
import { ResultModel } from '../../../../app/commons/models/ResultModel';
import { ErrorMessage } from 'src/app/commons/models/ErrorMessage';
import { UpdateGlobalVariableModel } from './models/UpdateGlobalVariableModel';

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
    createGlobalVariable: CreateGlobalVariableModel
  ): Observable<ResultModel> {
    const url = '';
    return this.http.post<ResultModel>(url, createGlobalVariable);
  }

  deleteGlobalVariable(
    globalVariableId: number,
    userId: number
  ): Observable<ErrorMessage[]> {
    const url = '';
    return this.http.delete<ErrorMessage[]>(url);
  }

  updateGlobalVariable(
    globalVariableId: number,
    updateGlobalVariable: UpdateGlobalVariableModel
  ): Observable<ErrorMessage[]> {
    const url = '';
    return this.http.put<ErrorMessage[]>(url, updateGlobalVariable);
  }
}
