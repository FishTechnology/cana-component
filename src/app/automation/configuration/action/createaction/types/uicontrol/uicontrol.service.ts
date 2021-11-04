import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { CreateActionModel } from './models/CreateActionModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UiControlService {
  constructor(private httpClient: HttpClient) {}

  createUiAction(
    testCaseId: number,
    createActionModel: CreateActionModel
  ): Observable<ResultModel> {
    const url =
      environment.canaApiUrl + `/api/testCases/${testCaseId}/actions/uiControl`;
    return this.httpClient.post<ResultModel>(url, createActionModel);
  }
}
